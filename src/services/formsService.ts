/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE FORMS API SERVICE (CLIENT-SIDE OAUTH BEARER TOKEN)
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';

export interface GoogleDriveFormFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  webViewLink?: string;
  iconLink?: string;
}

export interface GoogleFormItem {
  itemId?: string;
  title?: string;
  description?: string;
  questionItem?: {
    question?: {
      questionId?: string;
      required?: boolean;
      choiceQuestion?: {
        type: string;
        options: Array<{ value: string }>;
      };
      textQuestion?: {
        paragraph?: boolean;
      };
      scaleQuestion?: {
        low: number;
        high: number;
        lowLabel?: string;
        highLabel?: string;
      };
    };
  };
}

export interface GoogleFormMetadata {
  formId: string;
  info: {
    title: string;
    description?: string;
    documentTitle?: string;
  };
  settings?: Record<string, any>;
  items?: GoogleFormItem[];
  revisionId?: string;
  responderUri?: string;
}

export interface GoogleFormResponse {
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  respondentEmail?: string;
  answers?: Record<
    string,
    {
      questionId: string;
      textAnswers?: {
        answers: Array<{ value: string }>;
      };
    }
  >;
}

/**
 * List Google Forms in user's Google Drive
 */
export async function listUserForms(
  accessToken: string,
  searchQuery: string = '',
  pageSize: number = 20
): Promise<GoogleDriveFormFile[]> {
  const queryParts = ["mimeType = 'application/vnd.google-apps.form'", 'trashed = false'];
  if (searchQuery.trim()) {
    queryParts.push(`name contains '${searchQuery.replace(/'/g, "\\'")}'`);
  }

  const params = new URLSearchParams({
    q: queryParts.join(' and '),
    fields: 'files(id, name, mimeType, modifiedTime, webViewLink, iconLink)',
    orderBy: 'modifiedTime desc',
    pageSize: pageSize.toString()
  });

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to list forms from Drive: ${res.statusText}`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Fetch form schema and questions
 */
export async function getGoogleForm(
  accessToken: string,
  formId: string
): Promise<GoogleFormMetadata> {
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to fetch form: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch all responses for a form
 */
export async function getGoogleFormResponses(
  accessToken: string,
  formId: string
): Promise<GoogleFormResponse[]> {
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to fetch form responses: ${res.statusText}`);
  }

  const data = await res.json();
  return data.responses || [];
}

/**
 * Create a new blank Google Form
 */
export async function createGoogleForm(
  accessToken: string,
  title: string
): Promise<GoogleFormMetadata> {
  const res = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: title,
        documentTitle: title
      }
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to create Google Form: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Batch update a form with questions, sections, or settings
 */
export async function batchUpdateGoogleForm(
  accessToken: string,
  formId: string,
  requests: any[]
): Promise<any> {
  const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to update Google Form: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Create a specialized Clinical Trial Intake & Peer Review Google Form
 */
export async function createClinicalTrialIntakeForm(
  accessToken: string,
  options: {
    diseaseName: string;
    cureName: string;
    standingWaveFrequency: string;
    institution: string;
  }
): Promise<{ formId: string; responderUri: string; editUri: string; title: string }> {
  const title = `Clinical Trial Observation Intake: ${options.diseaseName} (${options.cureName})`;
  const newForm = await createGoogleForm(accessToken, title);
  const formId = newForm.formId;

  // Build structured questions for clinical trial observations
  const requests = [
    {
      updateFormInfo: {
        info: {
          description: `Sovereign Open-Access Biomedical Clinical Evaluation\nTarget Protocol: ${options.diseaseName} — ${options.cureName}\nResonance Frequency: ${options.standingWaveFrequency}\nPatent: WIPO PCT/NZ2025/000001 (NZBN 9429048181570)\nVerified Public Health Research Covenant.`
        },
        updateMask: 'description'
      }
    },
    {
      createItem: {
        item: {
          title: 'Investigator / Lead Clinician Name & Institution',
          description: 'Full name, institutional affiliation (e.g. Mayo Clinic, Charité, Oxford), and verified ID',
          questionItem: {
            question: {
              required: true,
              textQuestion: { paragraph: false }
            }
          }
        },
        location: { index: 0 }
      }
    },
    {
      createItem: {
        item: {
          title: 'Clinical Trial Phase / In-Vitro Batch Identifier',
          description: 'Specify Phase 1, Phase 2, Phase 3, or Laboratory In-Vitro Assay Batch ID',
          questionItem: {
            question: {
              required: true,
              choiceQuestion: {
                type: 'RADIO',
                options: [
                  { value: 'Preclinical In-Vitro Binding Assay' },
                  { value: 'Phase 1 First-in-Human Safety Trial' },
                  { value: 'Phase 2 Efficacy & Dose Escalation' },
                  { value: 'Phase 3 Multicenter Randomized Double-Blind' },
                  { value: 'Post-Market Humanitarian Field Monitoring' }
                ]
              }
            }
          }
        },
        location: { index: 1 }
      }
    },
    {
      createItem: {
        item: {
          title: 'Standing-Wave Harmonic Resonance Coherence (γ)',
          description: 'Rate observed quantum phase coherence matching the theoretical 1.000000 benchmark',
          questionItem: {
            question: {
              required: true,
              scaleQuestion: {
                low: 1,
                high: 5,
                lowLabel: 'Partial Drift (<0.90)',
                highLabel: 'Perfect Coherence (1.000000)'
              }
            }
          }
        },
        location: { index: 2 }
      }
    },
    {
      createItem: {
        item: {
          title: 'Observed Efficacy & Therapeutic Response (%)',
          description: 'Enter measured pathogen clearance, tumor volume regression, or symptom alleviation rate',
          questionItem: {
            question: {
              required: true,
              textQuestion: { paragraph: false }
            }
          }
        },
        location: { index: 3 }
      }
    },
    {
      createItem: {
        item: {
          title: 'Adverse Effects & Pharmacokinetic Observations',
          description: 'Detailed biochemical observations, blood serum clearance time, and tolerability notes',
          questionItem: {
            question: {
              required: false,
              textQuestion: { paragraph: true }
            }
          }
        },
        location: { index: 4 }
      }
    },
    {
      createItem: {
        item: {
          title: 'Humanitarian Open-Science Certification Confirmation',
          description: 'Confirm adherence to Geneva Convention public health guarantees and non-commercial open patent covenant',
          questionItem: {
            question: {
              required: true,
              choiceQuestion: {
                type: 'CHECKBOX',
                options: [
                  { value: 'I certify all trial data is submitted for open global scientific verification without proprietary restrictions.' }
                ]
              }
            }
          }
        },
        location: { index: 5 }
      }
    }
  ];

  await batchUpdateGoogleForm(accessToken, formId, requests);

  const updated = await getGoogleForm(accessToken, formId);
  const responderUri = updated.responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`;
  const editUri = `https://docs.google.com/forms/d/${formId}/edit`;

  return {
    formId,
    responderUri,
    editUri,
    title
  };
}
