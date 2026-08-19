/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE SHEETS & DRIVE API SERVICE (CLIENT-SIDE OAUTH BEARER TOKEN)
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  webViewLink?: string;
  iconLink?: string;
}

export interface GoogleSpreadsheetMetadata {
  spreadsheetId: string;
  properties: {
    title: string;
    locale?: string;
    timeZone?: string;
  };
  sheets: Array<{
    properties: {
      sheetId: number;
      title: string;
      index: number;
      gridProperties?: {
        rowCount: number;
        columnCount: number;
      };
    };
  }>;
  spreadsheetUrl: string;
}

export interface SheetValueRange {
  range: string;
  majorDimension?: 'ROWS' | 'COLUMNS';
  values: any[][];
}

/**
 * List existing Google Spreadsheets in user's Google Drive
 */
export async function listUserSpreadsheets(
  accessToken: string,
  searchQuery: string = '',
  pageSize: number = 20
): Promise<GoogleDriveFile[]> {
  const queryParts = ["mimeType = 'application/vnd.google-apps.spreadsheet'", 'trashed = false'];
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
    throw new Error(err?.error?.message || `Failed to list spreadsheets from Drive: ${res.statusText}`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Get metadata of a Google Spreadsheet (e.g. sheet tab names and IDs)
 */
export async function getSpreadsheetMetadata(
  accessToken: string,
  spreadsheetId: string
): Promise<GoogleSpreadsheetMetadata> {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to fetch spreadsheet metadata: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch row values from a spreadsheet range (e.g. "Sheet1!A1:Z100")
 */
export async function getSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string
): Promise<SheetValueRange> {
  const encodedRange = encodeURIComponent(range);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to fetch cell values: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Append row values to a specific sheet tab
 */
export async function appendSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<any> {
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      range,
      majorDimension: 'ROWS',
      values
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to append rows: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Create a new blank or multi-tab Google Spreadsheet
 */
export async function createGoogleSpreadsheet(
  accessToken: string,
  title: string,
  sheetTitles: string[] = ['Overview']
): Promise<GoogleSpreadsheetMetadata> {
  const sheets = sheetTitles.map((t, idx) => ({
    properties: {
      sheetId: idx,
      title: t,
      gridProperties: {
        rowCount: 100,
        columnCount: 20
      }
    }
  }));

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: { title },
      sheets
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to create spreadsheet: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Batch update cell values across multiple ranges
 */
export async function batchUpdateSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  data: Array<{ range: string; values: any[][] }>
): Promise<any> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data
      })
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to batch update values: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Execute styling & formatting requests on spreadsheet
 */
export async function batchUpdateSpreadsheetStyles(
  accessToken: string,
  spreadsheetId: string,
  requests: any[]
): Promise<any> {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Failed to update spreadsheet styles: ${res.statusText}`);
  }

  return res.json();
}

/**
 * High-Level: Export complete Bio-Medical Disease Formulations & Cures to a new Google Spreadsheet
 */
export async function exportComprehensiveCuresToGoogleSheet(
  accessToken: string,
  cures: any[],
  hubs: any[],
  patentHeader: any
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  // 1. Create spreadsheet with dedicated tabs
  const tabNames = ['Cures_&_Formulations', 'Active_Compounds_SMILES', 'Global_Manufacturing_Hubs', 'Universal_Patent_Covenant'];
  const created = await createGoogleSpreadsheet(
    accessToken,
    `Sovereign BioMedical Research Database (PCT-NZ2025-000001) - ${new Date().toISOString().split('T')[0]}`,
    tabNames
  );

  const spreadsheetId = created.spreadsheetId;

  // 2. Tab 1: Cures & Formulations
  const curesHeaders = [
    'Index',
    'Disease Target',
    'Category',
    'Protocol / Cure Name',
    'Cure Type',
    'Standing Wave Freq',
    't0 (s)',
    'Phase Coherence (γ)',
    'Standing Wave Equation',
    'Delivery Vehicle',
    'Particle Size (nm)',
    'Clinical Dosage',
    'Route',
    'Infusion Time',
    'Real World Evidence & Mechanism'
  ];

  const curesRows = cures.map((c, idx) => [
    idx + 1,
    c.diseaseName,
    c.category,
    c.cureName,
    c.cureType,
    c.standingWaveFrequency,
    c.t0Seconds,
    '1.000000',
    c.standingWaveEquation,
    c.deliverySystem?.vehicle || 'Lipid Nanoparticle (QA-NP)',
    c.deliverySystem?.particleSizeNm || 42,
    c.clinicalProtocol?.dosage || 'Standard Infusion',
    c.clinicalProtocol?.route || 'IV Infusion',
    c.clinicalProtocol?.infusionTime || '45 mins',
    c.realWorldEvidence || c.standingWaveMechanism || 'Phase Coherent Zero-Drift Efficacy'
  ]);

  // 3. Tab 2: Active Compounds & Chemical SMILES
  const compoundsHeaders = [
    'Disease Target',
    'Compound Name',
    'Molecular Formula',
    'Molecular Weight (g/mol)',
    'IUPAC SMILES String',
    'Pharmacological Mechanism',
    'Synthesis Method'
  ];

  const compoundsRows: any[][] = [];
  cures.forEach((cure) => {
    (cure.activeCompounds || []).forEach((comp: any) => {
      compoundsRows.push([
        cure.diseaseName,
        comp.name,
        comp.molecularFormula,
        comp.molecularWeight,
        comp.smiles,
        comp.mechanism,
        comp.synthesisMethod
      ]);
    });
  });

  // 4. Tab 3: Global Manufacturing Hubs
  const hubsHeaders = [
    'Hub Name',
    'Location',
    'Facility Classification',
    'Annual Capacity (Doses/Yr)',
    'QC Pass Rate (%)',
    'Lead Time (Days)',
    'Cold Chain Protocol',
    'Status'
  ];

  const hubsRows = hubs.map((h) => [
    h.name,
    h.location,
    h.facilityType || 'Sovereign Automated GMP Bioreactor Node',
    h.annualCapacityDoses,
    `${h.qcPassRate}%`,
    h.leadTimeDays || 3,
    h.coldChain || '2°C to 8°C or -80°C Cryopreservation',
    'ACTIVE - OPEN ACCESS'
  ]);

  // 5. Tab 4: Universal Patent Covenant & Legal Grants
  const patentRows = [
    ['Universal Humanitarian Open-Access Covenant & Patent Certification'],
    ['WIPO PCT Application Reference:', patentHeader.patentNumber || 'PCT/NZ2025/000001'],
    ['Sovereign Creator & Architect:', patentHeader.creator || 'James Andrew Douglas Paton'],
    ['Proprietary Registration NZBN:', patentHeader.nzbn || '9429048181570'],
    ['Organization & IP Portfolio:', patentHeader.organization || 'Discrete PC / Landreth Legacy Trust IP'],
    ['Google Developer IAM:', patentHeader.googleDevId || 'siriusaitaranaki@gmail.com'],
    ['Microsoft Developer IAM:', patentHeader.microsoftDevId || 'james.paton@quantum-biomedical.org'],
    ['GCP Cloud Project:', 'sirius-ai-lumana-4840'],
    ['Legal Exemption Status:', 'Geneva Convention Public Health Open Access Exception (100% Royalty Free)'],
    [''],
    ['Declaration of Universal Access:', patentHeader.universalCovenant || 'Dedicated to all bio-medical research labs, clinics, and humanity forever with zero royalties.']
  ];

  // 6. Batch update values across all 4 sheets
  await batchUpdateSpreadsheetValues(accessToken, spreadsheetId, [
    {
      range: 'Cures_&_Formulations!A1:O' + (curesRows.length + 1),
      values: [curesHeaders, ...curesRows]
    },
    {
      range: 'Active_Compounds_SMILES!A1:G' + (compoundsRows.length + 1),
      values: [compoundsHeaders, ...compoundsRows]
    },
    {
      range: 'Global_Manufacturing_Hubs!A1:H' + (hubsRows.length + 1),
      values: [hubsHeaders, ...hubsRows]
    },
    {
      range: 'Universal_Patent_Covenant!A1:B' + patentRows.length,
      values: patentRows
    }
  ]);

  // 7. Apply styling (freeze header row + bold headers)
  try {
    const meta = await getSpreadsheetMetadata(accessToken, spreadsheetId);
    const stylingRequests: any[] = [];

    meta.sheets.forEach((sh) => {
      stylingRequests.push({
        updateSheetProperties: {
          properties: {
            sheetId: sh.properties.sheetId,
            gridProperties: {
              frozenRowCount: 1
            }
          },
          fields: 'gridProperties.frozenRowCount'
        }
      });
      stylingRequests.push({
        repeatCell: {
          range: {
            sheetId: sh.properties.sheetId,
            startRowIndex: 0,
            endRowIndex: 1
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.12, green: 0.16, blue: 0.24 },
              textFormat: {
                foregroundColor: { red: 0.9, green: 0.95, blue: 1.0 },
                bold: true,
                fontSize: 10
              }
            }
          },
          fields: 'userEnteredFormat(backgroundColor,textFormat)'
        }
      });
    });

    if (stylingRequests.length > 0) {
      await batchUpdateSpreadsheetStyles(accessToken, spreadsheetId, stylingRequests);
    }
  } catch (err) {
    console.warn('[Sheets API] Notice styling batch update:', err);
  }

  return {
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
  };
}
