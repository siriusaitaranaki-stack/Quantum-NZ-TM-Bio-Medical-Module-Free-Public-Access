/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE MEET API SERVICE (CLIENT-SIDE OAUTH BEARER TOKEN)
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

export interface GoogleMeetSpaceConfig {
  accessType?: 'OPEN' | 'TRUSTED' | 'RESTRICTED';
  entryPointAccess?: 'ALL' | 'CREATOR_APP_ONLY';
}

export interface GoogleMeetSpace {
  name: string; // "spaces/XXXXXXXXXX"
  meetingUri: string; // "https://meet.google.com/abc-defg-hij"
  meetingCode: string; // "abc-defg-hij"
  config?: GoogleMeetSpaceConfig;
  activeConference?: {
    conferenceRecord?: string;
  };
}

export interface GoogleMeetConferenceRecord {
  name: string; // "conferenceRecords/XXXXXXXXXX"
  startTime?: string;
  endTime?: string;
  expireTime?: string;
  space?: string;
}

export interface MedicalConsultationMeetingRequest {
  diseaseName: string;
  cureName: string;
  agendaTopic: string;
  targetFrequency: string;
  consultationType: 'emergency_oncology' | 'peer_review' | 'bioreactor_scaling' | 'ethics_irb' | 'multi_center_trial';
  hostResearcher: string;
  participatingInstitutions?: string[];
  accessType?: 'OPEN' | 'TRUSTED' | 'RESTRICTED';
}

/**
 * Create a new Google Meet virtual space for clinical peer-review or case consultation
 */
export async function createGoogleMeetSpace(
  accessToken: string,
  config?: GoogleMeetSpaceConfig
): Promise<GoogleMeetSpace> {
  const payload = {
    config: {
      accessType: config?.accessType || 'OPEN',
      entryPointAccess: config?.entryPointAccess || 'ALL'
    }
  };

  const res = await fetch('https://meet.googleapis.com/v2/spaces', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to create Google Meet space: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Retrieve details for an existing Google Meet space
 */
export async function getGoogleMeetSpace(
  accessToken: string,
  spaceName: string
): Promise<GoogleMeetSpace> {
  const cleanName = spaceName.startsWith('spaces/') ? spaceName : `spaces/${spaceName}`;
  const res = await fetch(`https://meet.googleapis.com/v2/${cleanName}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to get Google Meet space: ${res.statusText}`);
  }

  return res.json();
}

/**
 * List recent Google Meet conference records
 */
export async function listConferenceRecords(
  accessToken: string,
  pageSize: number = 10
): Promise<GoogleMeetConferenceRecord[]> {
  try {
    const res = await fetch(`https://meet.googleapis.com/v2/conferenceRecords?pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      // Conference records might require specific permissions or might be empty
      return [];
    }

    const data = await res.json();
    return data.conferenceRecords || [];
  } catch (e) {
    console.warn('[Google Meet API] listConferenceRecords notice:', e);
    return [];
  }
}
