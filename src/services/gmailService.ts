/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GMAIL API INTEGRATION SERVICE (CLIENT-SIDE OAUTH BEARER TOKEN)
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

export interface GmailMessageHeader {
  name: string;
  value: string;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
  labels?: string[];
}

export interface GmailUserProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  body: string;
  isHtml?: boolean;
  cc?: string;
}

/**
 * Base64 URL Safe Encoder for RFC 2822 standard email strings
 */
function base64UrlEncode(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Fetch authenticated Gmail user profile
 */
export async function getGmailProfile(accessToken: string): Promise<GmailUserProfile> {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to fetch Gmail profile: ${res.statusText}`);
  }
  return res.json();
}

/**
 * List messages with optional search query (e.g. "is:unread", "subject:cancer", "label:INBOX")
 */
export async function listGmailMessages(
  accessToken: string,
  query: string = '',
  maxResults: number = 15
): Promise<GmailMessageSummary[]> {
  const url = new URL('https://gmail.googleapis.com/gmail/v1/users/me/messages');
  if (query) url.searchParams.set('q', query);
  url.searchParams.set('maxResults', maxResults.toString());

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to fetch messages: ${res.statusText}`);
  }

  const data = await res.json();
  if (!data.messages || !Array.isArray(data.messages)) {
    return [];
  }

  // Fetch header metadata for previewing messages
  const messageDetails = await Promise.all(
    data.messages.slice(0, maxResults).map(async (msg: { id: string; threadId: string }) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!detailRes.ok) return { id: msg.id, threadId: msg.threadId, snippet: '' };
        const detail = await detailRes.json();
        const headers: GmailMessageHeader[] = detail.payload?.headers || [];
        const subject = headers.find((h) => h.name.toLowerCase() === 'subject')?.value || 'No Subject';
        const from = headers.find((h) => h.name.toLowerCase() === 'from')?.value || 'Unknown Sender';
        const to = headers.find((h) => h.name.toLowerCase() === 'to')?.value || '';
        const date = headers.find((h) => h.name.toLowerCase() === 'date')?.value || '';

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: detail.snippet || '',
          subject,
          from,
          to,
          date,
          labels: detail.labelIds || []
        };
      } catch {
        return { id: msg.id, threadId: msg.threadId, snippet: '' };
      }
    })
  );

  return messageDetails;
}

/**
 * Send an email directly via Gmail API using RFC 2822 formatting
 */
export async function sendGmailMessage(
  accessToken: string,
  payload: SendEmailPayload
): Promise<{ id: string; threadId: string }> {
  const contentType = payload.isHtml ? 'text/html; charset="UTF-8"' : 'text/plain; charset="UTF-8"';
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(payload.subject)))}?=`;

  const emailLines = [
    `To: ${payload.to}`,
    ...(payload.cc ? [`Cc: ${payload.cc}`] : []),
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    `Content-Type: ${contentType}`,
    'X-Mailer: Sovereign-Biomedical-Research-Engine/1.0 (PCT/NZ2025/000001)',
    '',
    payload.body
  ];

  const rawEmail = emailLines.join('\r\n');
  const encodedRaw = base64UrlEncode(rawEmail);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: encodedRaw })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to send email: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Create a Gmail draft
 */
export async function createGmailDraft(
  accessToken: string,
  payload: SendEmailPayload
): Promise<{ id: string; message: { id: string; threadId: string } }> {
  const contentType = payload.isHtml ? 'text/html; charset="UTF-8"' : 'text/plain; charset="UTF-8"';
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(payload.subject)))}?=`;

  const emailLines = [
    `To: ${payload.to}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    `Content-Type: ${contentType}`,
    'X-Mailer: Sovereign-Biomedical-Research-Engine/1.0',
    '',
    payload.body
  ];

  const rawEmail = emailLines.join('\r\n');
  const encodedRaw = base64UrlEncode(rawEmail);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: { raw: encodedRaw }
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Failed to create draft: ${res.statusText}`);
  }

  return res.json();
}
