/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE CHAT API SERVICE (CLIENT-SIDE OAUTH BEARER TOKEN)
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

export interface GoogleChatSpace {
  name: string; // e.g. "spaces/AAAAAAAAAAA"
  displayName?: string;
  spaceType?: 'SPACE' | 'GROUP_CHAT' | 'DIRECT_MESSAGE';
  spaceDetails?: {
    description?: string;
    guidelines?: string;
  };
  spaceHistoryState?: string;
}

export interface GoogleChatMessage {
  name?: string;
  sender?: {
    name?: string;
    displayName?: string;
    avatarUrl?: string;
    type?: string;
  };
  text?: string;
  cardsV2?: Array<{
    cardId?: string;
    card?: {
      header?: {
        title: string;
        subtitle?: string;
        imageUrl?: string;
        imageType?: string;
      };
      sections?: Array<{
        header?: string;
        widgets?: Array<{
          textParagraph?: { text: string };
          decoratedText?: {
            topLabel?: string;
            text: string;
            bottomLabel?: string;
            icon?: { knownIcon: string };
          };
          buttonList?: {
            buttons: Array<{
              text: string;
              onClick?: {
                openLink?: { url: string };
              };
            }>;
          };
        }>;
      }>;
    };
  }>;
  createTime?: string;
  thread?: {
    name?: string;
  };
}

/**
 * List all accessible Google Chat spaces
 */
export async function listGoogleChatSpaces(
  accessToken: string,
  pageSize: number = 20
): Promise<GoogleChatSpace[]> {
  const res = await fetch(`https://chat.googleapis.com/v1/spaces?pageSize=${pageSize}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to list Google Chat spaces: ${res.statusText}`);
  }

  const data = await res.json();
  return data.spaces || [];
}

/**
 * Create a new collaborative Google Chat Space
 */
export async function createGoogleChatSpace(
  accessToken: string,
  displayName: string,
  description?: string
): Promise<GoogleChatSpace> {
  const res = await fetch('https://chat.googleapis.com/v1/spaces', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      spaceType: 'SPACE',
      displayName: displayName,
      spaceDetails: {
        description: description || 'Sovereign Biomedical Collaborative Open Science Space'
      }
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to create Google Chat space: ${res.statusText}`);
  }

  return res.json();
}

/**
 * List messages in a specific Google Chat space
 */
export async function listGoogleChatMessages(
  accessToken: string,
  spaceName: string,
  pageSize: number = 25
): Promise<GoogleChatMessage[]> {
  // spaceName is like "spaces/AAAAAAAAAAA"
  const res = await fetch(`https://chat.googleapis.com/v1/${spaceName}/messages?pageSize=${pageSize}&orderBy=createTime desc`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to list Chat messages: ${res.statusText}`);
  }

  const data = await res.json();
  const msgs = (data.messages || []) as GoogleChatMessage[];
  // Return in chronological order
  return msgs.reverse();
}

/**
 * Post a plain text or formatted message to a Google Chat Space
 */
export async function sendGoogleChatMessage(
  accessToken: string,
  spaceName: string,
  text: string
): Promise<GoogleChatMessage> {
  const res = await fetch(`https://chat.googleapis.com/v1/${spaceName}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to send Google Chat message: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Post a rich CardV2 Clinical Trial Breakthrough Notification to Google Chat
 */
export async function sendClinicalAlertCardToGoogleChat(
  accessToken: string,
  spaceName: string,
  payload: {
    diseaseName: string;
    cureName: string;
    standingWaveFrequency: string;
    confidence: number;
    authorName: string;
    notes?: string;
  }
): Promise<GoogleChatMessage> {
  const cardPayload = {
    text: `🧬 *Biomedical Research Breakthrough Alert:* ${payload.diseaseName} (${payload.cureName})`,
    cardsV2: [
      {
        cardId: `cure-alert-${Date.now()}`,
        card: {
          header: {
            title: `Sovereign Protocol: ${payload.diseaseName}`,
            subtitle: `Verified Cure: ${payload.cureName} • Patent: WIPO PCT/NZ2025/000001`,
            imageType: 'CIRCLE'
          },
          sections: [
            {
              header: 'Target Bioresonance & Quantum Metrics',
              widgets: [
                {
                  decoratedText: {
                    topLabel: 'Standing Wave Frequency',
                    text: `*${payload.standingWaveFrequency}*`,
                    bottomLabel: 'Harmonic Phase Coherence γ = 1.000000'
                  }
                },
                {
                  decoratedText: {
                    topLabel: 'Verification Confidence',
                    text: `*${payload.confidence}% Deterministic*`,
                    bottomLabel: 'Zero-Drift Molecular Resonance Match'
                  }
                },
                {
                  textParagraph: {
                    text: payload.notes || 'Universal humanitarian open-access formulation verified across international peer-review nodes.'
                  }
                },
                {
                  buttonList: {
                    buttons: [
                      {
                        text: 'Open Biomedical Workspace',
                        onClick: {
                          openLink: {
                            url: 'https://ais-pre-b44e5upzltj3xyirjlbaku-11147607435.asia-southeast1.run.app'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  };

  const res = await fetch(`https://chat.googleapis.com/v1/${spaceName}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cardPayload)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to post Card to Google Chat: ${res.statusText}`);
  }

  return res.json();
}
