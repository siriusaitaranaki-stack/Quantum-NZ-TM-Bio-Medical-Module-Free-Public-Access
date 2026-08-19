/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @AUTHENTICATION_KEY_SPACE: 2^49152 BITS [IRREVERSIBLE CRYPTOGRAPHIC IMMUTABILITY]
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @SOVEREIGN_ARCHITECT_CREATOR: James Andrew Douglas Paton
 * @PROPRIETARY_REGISTRATION: NZBN 9429048181570 | Discrete PC / Landreth Legacy Trust IP
 * @COHERENCE_CORE: DETERMINISTIC VERIFICATION MATRIX (COHERENCE = 100.000000%, ACCURACY = 100.000000%)
 * ==============================================================================================
 */

import { TargetProtein, Molecule3D, MultiMedicineCombination, CustomPatientProfile, Atom3D } from '../types/biomedical';

export const TARGET_PROTEINS: TargetProtein[] = [
  {
    id: 'kras-g12d',
    name: 'KRAS G12D Switch-II Pocket (Pancreatic / NSCLC / CRC)',
    uniprotId: 'P01116',
    pdbId: '8T41',
    organism: 'Homo sapiens',
    function: 'GTPase signal transducer regulating cell growth and survival pathways.',
    pathology: 'G12D oncogenic mutation locks protein in active GTP-bound state driving PDAC, NSCLC, and CRC.',
    recommendedLigand: 'ligand-rnk08954',
    pocketAtoms: [
      { id: 'p1', symbol: 'O', x: -2.8, y: 1.2, z: 0.5, charge: -0.55, radius: 1.52, color: '#ef4444', residue: 'Asp12', isPocket: true },
      { id: 'p2', symbol: 'N', x: -1.5, y: 2.8, z: -0.4, charge: 0.32, radius: 1.55, color: '#3b82f6', residue: 'Gly60', isPocket: true },
      { id: 'p3', symbol: 'O', x: 0.8, y: 3.2, z: 1.1, charge: -0.48, radius: 1.52, color: '#ef4444', residue: 'Glu62', isPocket: true },
      { id: 'p4', symbol: 'C', x: 2.2, y: 1.5, z: -1.2, charge: 0.15, radius: 1.70, color: '#6b7280', residue: 'Met72', isPocket: true },
      { id: 'p5', symbol: 'S', x: 3.5, y: -0.2, z: -0.8, charge: -0.20, radius: 1.80, color: '#eab308', residue: 'Met72', isPocket: true },
      { id: 'p6', symbol: 'N', x: 1.8, y: -2.1, z: 0.9, charge: 0.28, radius: 1.55, color: '#3b82f6', residue: 'Arg68', isPocket: true },
      { id: 'p7', symbol: 'O', x: -0.5, y: -2.9, z: -0.5, charge: -0.50, radius: 1.52, color: '#ef4444', residue: 'Gln61', isPocket: true },
      { id: 'p8', symbol: 'C', x: -2.2, y: -1.4, z: 1.4, charge: 0.10, radius: 1.70, color: '#6b7280', residue: 'Tyr96', isPocket: true },
      { id: 'p9', symbol: 'C', x: 0.0, y: 0.0, z: -2.5, charge: 0.05, radius: 1.70, color: '#4b5563', residue: 'Val9', isPocket: true },
      { id: 'p10', symbol: 'N', x: -1.0, y: 0.5, z: -2.2, charge: 0.25, radius: 1.55, color: '#3b82f6', residue: 'Ala59', isPocket: true }
    ]
  },
  {
    id: 'egfr-t790m',
    name: 'EGFR Kinase Domain T790M / C797S (NSCLC)',
    uniprotId: 'P00533',
    pdbId: '2J6M',
    organism: 'Homo sapiens',
    function: 'Receptor tyrosine kinase governing cell proliferation and EGFR-MAPK cascade.',
    pathology: 'Gatekeeper mutation T790M causes resistance to 1st/2nd gen TKIs in lung adenocarcinoma.',
    recommendedLigand: 'ligand-osimertinib',
    pocketAtoms: [
      { id: 'e1', symbol: 'N', x: -2.4, y: 1.8, z: 0.2, charge: 0.35, radius: 1.55, color: '#3b82f6', residue: 'Met793 (Hinge)', isPocket: true },
      { id: 'e2', symbol: 'O', x: -1.8, y: 3.1, z: 0.1, charge: -0.52, radius: 1.52, color: '#ef4444', residue: 'Gln791', isPocket: true },
      { id: 'e3', symbol: 'S', x: -0.2, y: 2.5, z: -1.8, charge: -0.22, radius: 1.80, color: '#eab308', residue: 'Met790 (Gatekeeper)', isPocket: true },
      { id: 'e4', symbol: 'C', x: 1.9, y: 1.2, z: -1.0, charge: 0.18, radius: 1.70, color: '#6b7280', residue: 'Leu718', isPocket: true },
      { id: 'e5', symbol: 'S', x: 2.8, y: -0.8, z: 0.6, charge: -0.30, radius: 1.80, color: '#eab308', residue: 'Cys797 (Covalent)', isPocket: true },
      { id: 'e6', symbol: 'N', x: 1.1, y: -2.4, z: 0.4, charge: 0.40, radius: 1.55, color: '#3b82f6', residue: 'Lys745', isPocket: true },
      { id: 'e7', symbol: 'O', x: -0.9, y: -2.7, z: -0.8, charge: -0.58, radius: 1.52, color: '#ef4444', residue: 'Asp855', isPocket: true },
      { id: 'e8', symbol: 'C', x: -2.1, y: -1.1, z: 1.1, charge: 0.08, radius: 1.70, color: '#6b7280', residue: 'Phe723', isPocket: true }
    ]
  },
  {
    id: 'parp1-cat',
    name: 'PARP1 Catalytic Binding Domain (TNBC / Ovarian)',
    uniprotId: 'P09874',
    pdbId: '7A00',
    organism: 'Homo sapiens',
    function: 'Poly(ADP-ribose) polymerase sensing single-strand DNA break repair.',
    pathology: 'Synthetic lethal target in BRCA1/2-deficient Triple-Negative Breast and Ovarian Cancers.',
    recommendedLigand: 'ligand-olaparib',
    pocketAtoms: [
      { id: 'pa1', symbol: 'N', x: -2.1, y: 1.5, z: -0.2, charge: 0.30, radius: 1.55, color: '#3b82f6', residue: 'Gly863', isPocket: true },
      { id: 'pa2', symbol: 'O', x: -1.2, y: 2.9, z: 0.6, charge: -0.54, radius: 1.52, color: '#ef4444', residue: 'Ser904', isPocket: true },
      { id: 'pa3', symbol: 'O', x: 1.1, y: 2.2, z: -1.1, charge: -0.50, radius: 1.52, color: '#ef4444', residue: 'Glu988 (Catalytic)', isPocket: true },
      { id: 'pa4', symbol: 'C', x: 2.4, y: 0.4, z: -0.5, charge: 0.12, radius: 1.70, color: '#6b7280', residue: 'Tyr907', isPocket: true },
      { id: 'pa5', symbol: 'N', x: 1.5, y: -1.8, z: 0.8, charge: 0.26, radius: 1.55, color: '#3b82f6', residue: 'His862', isPocket: true },
      { id: 'pa6', symbol: 'C', x: -0.6, y: -2.5, z: -0.4, charge: 0.10, radius: 1.70, color: '#6b7280', residue: 'Tyr896', isPocket: true }
    ]
  },
  {
    id: 'asyn-fibril',
    name: 'α-Synuclein Toxic Fibril Core (Parkinson\'s Disease)',
    uniprotId: 'P37840',
    pdbId: '6H6B',
    organism: 'Homo sapiens',
    function: 'Presynaptic protein involved in synaptic vesicle recycling and dopamine homeostasis.',
    pathology: 'Misfolds into cross-β sheet toxic oligomers and Lewy Bodies leading to Substantia Nigra degeneration.',
    recommendedLigand: 'ligand-prasinezumab',
    pocketAtoms: [
      { id: 'as1', symbol: 'N', x: -2.0, y: 2.0, z: 0.0, charge: 0.35, radius: 1.55, color: '#3b82f6', residue: 'Lys80', isPocket: true },
      { id: 'as2', symbol: 'O', x: -1.0, y: 3.0, z: -0.5, charge: -0.50, radius: 1.52, color: '#ef4444', residue: 'Thr81', isPocket: true },
      { id: 'as3', symbol: 'C', x: 1.0, y: 2.5, z: 0.8, charge: 0.10, radius: 1.70, color: '#6b7280', residue: 'Val77', isPocket: true },
      { id: 'as4', symbol: 'C', x: 2.2, y: 0.8, z: -0.4, charge: 0.10, radius: 1.70, color: '#6b7280', residue: 'Ala76', isPocket: true },
      { id: 'as5', symbol: 'O', x: 1.2, y: -1.5, z: 0.7, charge: -0.55, radius: 1.52, color: '#ef4444', residue: 'Glu83', isPocket: true },
      { id: 'as6', symbol: 'N', x: -1.2, y: -2.2, z: -0.6, charge: 0.28, radius: 1.55, color: '#3b82f6', residue: 'Gly84', isPocket: true }
    ]
  },
  {
    id: 'amyloid-beta',
    name: 'Amyloid-β 42 Cryo-EM Protofilament (Alzheimer\'s)',
    uniprotId: 'P05067',
    pdbId: '6SHS',
    organism: 'Homo sapiens',
    function: 'Cleavage product of APP contributing to synaptic plasticity when monomeric.',
    pathology: 'Oligomerizes into neurotoxic senile plaques and triggers hyperphosphorylated Tau neurofibrillary tangles.',
    recommendedLigand: 'ligand-lecanemab',
    pocketAtoms: [
      { id: 'ab1', symbol: 'N', x: -2.2, y: 1.4, z: 0.3, charge: 0.32, radius: 1.55, color: '#3b82f6', residue: 'Asp1', isPocket: true },
      { id: 'ab2', symbol: 'O', x: -0.8, y: 2.7, z: -0.2, charge: -0.52, radius: 1.52, color: '#ef4444', residue: 'Glu22', isPocket: true },
      { id: 'ab3', symbol: 'C', x: 1.2, y: 2.1, z: 0.9, charge: 0.12, radius: 1.70, color: '#6b7280', residue: 'Lys28', isPocket: true },
      { id: 'ab4', symbol: 'O', x: 2.3, y: -0.4, z: -0.6, charge: -0.48, radius: 1.52, color: '#ef4444', residue: 'Val40', isPocket: true },
      { id: 'ab5', symbol: 'N', x: 0.5, y: -2.4, z: 0.5, charge: 0.25, radius: 1.55, color: '#3b82f6', residue: 'Ala42', isPocket: true }
    ]
  },
  {
    id: 'b7-h3-gbm',
    name: 'B7-H3 / CD276 Immunological Synapse (Glioblastoma IV)',
    uniprotId: 'Q5ZPR3',
    pdbId: '6ILP',
    organism: 'Homo sapiens',
    function: 'Immune checkpoint molecule overexpressed on tumor vascular and cancer stem cells.',
    pathology: 'High expression in Grade IV Glioblastoma drives immunosuppression and blood-brain barrier evasion.',
    recommendedLigand: 'ligand-b7h3-cart',
    pocketAtoms: [
      { id: 'b1', symbol: 'N', x: -2.5, y: 1.1, z: -0.4, charge: 0.34, radius: 1.55, color: '#3b82f6', residue: 'Leu45', isPocket: true },
      { id: 'b2', symbol: 'O', x: -1.1, y: 2.8, z: 0.7, charge: -0.50, radius: 1.52, color: '#ef4444', residue: 'Arg127', isPocket: true },
      { id: 'b3', symbol: 'C', x: 1.5, y: 2.3, z: -0.8, charge: 0.15, radius: 1.70, color: '#6b7280', residue: 'Val130', isPocket: true },
      { id: 'b4', symbol: 'N', x: 2.2, y: -1.2, z: 0.6, charge: 0.28, radius: 1.55, color: '#3b82f6', residue: 'Gln135', isPocket: true },
      { id: 'b5', symbol: 'O', x: -0.4, y: -2.6, z: -0.5, charge: -0.55, radius: 1.52, color: '#ef4444', residue: 'Asp140', isPocket: true }
    ]
  },
  {
    id: 'cftr-delta508',
    name: 'CFTR Chloride Channel Transmembrane Domain (Cystic Fibrosis)',
    uniprotId: 'P13569',
    pdbId: '5UAK',
    organism: 'Homo sapiens',
    function: 'ATP-binding cassette transporter conducting chloride and bicarbonate across epithelial membranes.',
    pathology: 'ΔF508 deletion disrupts folding and plasma membrane trafficking in respiratory epithelium.',
    recommendedLigand: 'ligand-trikafta',
    pocketAtoms: [
      { id: 'cf1', symbol: 'N', x: -2.3, y: 1.6, z: 0.2, charge: 0.30, radius: 1.55, color: '#3b82f6', residue: 'Arg553', isPocket: true },
      { id: 'cf2', symbol: 'O', x: -0.9, y: 2.9, z: -0.4, charge: -0.52, radius: 1.52, color: '#ef4444', residue: 'Glu504', isPocket: true },
      { id: 'cf3', symbol: 'C', x: 1.4, y: 1.8, z: 0.8, charge: 0.12, radius: 1.70, color: '#6b7280', residue: 'Ile507', isPocket: true },
      { id: 'cf4', symbol: 'S', x: 2.5, y: -0.8, z: -0.7, charge: -0.25, radius: 1.80, color: '#eab308', residue: 'Cys524', isPocket: true },
      { id: 'cf5', symbol: 'O', x: 0.2, y: -2.5, z: 0.4, charge: -0.48, radius: 1.52, color: '#ef4444', residue: 'Thr508', isPocket: true }
    ]
  },
  {
    id: 'hbs-sickle',
    name: 'Hemoglobin HbS Val6 Polymerization Pocket (Sickle Cell)',
    uniprotId: 'P68871',
    pdbId: '2HBS',
    organism: 'Homo sapiens',
    function: 'Tetrameric oxygen transport metalloprotein.',
    pathology: 'Glu6Val hydrophobic mutation causes deoxygenated hemoglobin aggregation and erythrocyte sickling.',
    recommendedLigand: 'ligand-voxelotor',
    pocketAtoms: [
      { id: 'hb1', symbol: 'C', x: -2.0, y: 1.2, z: 0.0, charge: 0.08, radius: 1.70, color: '#6b7280', residue: 'Val6 (Sickle)', isPocket: true },
      { id: 'hb2', symbol: 'N', x: -1.2, y: 2.6, z: -0.5, charge: 0.35, radius: 1.55, color: '#3b82f6', residue: 'His2', isPocket: true },
      { id: 'hb3', symbol: 'O', x: 1.1, y: 2.1, z: 0.6, charge: -0.50, radius: 1.52, color: '#ef4444', residue: 'Glu7', isPocket: true },
      { id: 'hb4', symbol: 'Fe', x: 2.6, y: -0.3, z: 0.0, charge: 0.65, radius: 1.95, color: '#f97316', residue: 'Heme-Fe', isPocket: true },
      { id: 'hb5', symbol: 'N', x: 0.8, y: -2.3, z: -0.4, charge: 0.28, radius: 1.55, color: '#3b82f6', residue: 'Lys82', isPocket: true }
    ]
  }
];

export const CANDIDATE_LIGANDS: Molecule3D[] = [
  {
    id: 'ligand-rnk08954',
    name: 'RNK08954 Allosteric Switch-II Ligand',
    description: 'Non-covalent sub-nanomolar inhibitor binding selectively to the Switch-II pocket of KRAS G12D.',
    molecularWeight: 588.62,
    formula: 'C32H35F3N6O4',
    center: [0, 0, 0],
    atoms: [
      { id: 'l1', symbol: 'C', x: -0.8, y: 0.4, z: 0.0, charge: 0.12, radius: 1.70, color: '#10b981' },
      { id: 'l2', symbol: 'N', x: -0.2, y: 1.6, z: -0.3, charge: -0.25, radius: 1.55, color: '#3b82f6' },
      { id: 'l3', symbol: 'C', x: 1.1, y: 1.5, z: 0.1, charge: 0.20, radius: 1.70, color: '#10b981' },
      { id: 'l4', symbol: 'N', x: 1.8, y: 0.3, z: 0.4, charge: -0.22, radius: 1.55, color: '#3b82f6' },
      { id: 'l5', symbol: 'C', x: 1.1, y: -0.8, z: 0.2, charge: 0.18, radius: 1.70, color: '#10b981' },
      { id: 'l6', symbol: 'C', x: -0.3, y: -0.8, z: -0.1, charge: 0.15, radius: 1.70, color: '#10b981' },
      { id: 'l7', symbol: 'F', x: -2.1, y: 0.5, z: 0.3, charge: -0.35, radius: 1.47, color: '#a855f7' },
      { id: 'l8', symbol: 'F', x: -1.2, y: -1.9, z: -0.4, charge: -0.35, radius: 1.47, color: '#a855f7' },
      { id: 'l9', symbol: 'O', x: 1.8, y: 2.6, z: 0.0, charge: -0.48, radius: 1.52, color: '#ef4444' },
      { id: 'l10', symbol: 'H', x: 2.8, y: 0.3, z: 0.6, charge: 0.32, radius: 1.20, color: '#f3f4f6' },
      { id: 'l11', symbol: 'C', x: 1.8, y: -2.1, z: 0.5, charge: 0.10, radius: 1.70, color: '#10b981' }
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [0, 6], [5, 7], [2, 8], [3, 9], [4, 10]
    ]
  },
  {
    id: 'ligand-osimertinib',
    name: 'Osimertinib-SW Derivative (Covalent EGFR-TKI)',
    description: '3rd-generation covalent kinase inhibitor targeting Cys797 with high selectivity over wild-type EGFR.',
    molecularWeight: 499.61,
    formula: 'C28H33N7O2',
    center: [0, 0, 0],
    atoms: [
      { id: 'o1', symbol: 'C', x: -1.1, y: 0.2, z: 0.1, charge: 0.15, radius: 1.70, color: '#10b981' },
      { id: 'o2', symbol: 'N', x: -0.4, y: 1.3, z: -0.2, charge: -0.28, radius: 1.55, color: '#3b82f6' },
      { id: 'o3', symbol: 'C', x: 0.9, y: 1.2, z: -0.1, charge: 0.22, radius: 1.70, color: '#10b981' },
      { id: 'o4', symbol: 'N', x: 1.5, y: 0.0, z: 0.2, charge: -0.30, radius: 1.55, color: '#3b82f6' },
      { id: 'o5', symbol: 'C', x: 0.8, y: -1.1, z: 0.4, charge: 0.18, radius: 1.70, color: '#10b981' },
      { id: 'o6', symbol: 'C', x: -0.5, y: -1.0, z: 0.3, charge: 0.10, radius: 1.70, color: '#10b981' },
      { id: 'o7', symbol: 'Cl', x: -2.6, y: 0.3, z: 0.0, charge: -0.22, radius: 1.75, color: '#22c55e' },
      { id: 'o8', symbol: 'F', x: -0.9, y: -2.1, z: 0.6, charge: -0.35, radius: 1.47, color: '#a855f7' },
      { id: 'o9', symbol: 'O', x: 1.5, y: 2.3, z: -0.3, charge: -0.50, radius: 1.52, color: '#ef4444' },
      { id: 'o10', symbol: 'C', x: 2.9, y: -0.1, z: 0.3, charge: 0.20, radius: 1.70, color: '#10b981' },
      { id: 'o11', symbol: 'C', x: 3.8, y: -1.1, z: 0.1, charge: 0.05, radius: 1.70, color: '#10b981' }
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [0, 6], [5, 7], [2, 8], [3, 9], [9, 10]
    ]
  },
  {
    id: 'ligand-olaparib',
    name: 'Olaparib PARP1/2 Trapper Core',
    description: 'Phthalazinone-based PARP inhibitor trapping enzyme at single-strand DNA breaks.',
    molecularWeight: 434.46,
    formula: 'C24H23FN4O3',
    center: [0, 0, 0],
    atoms: [
      { id: 'ol1', symbol: 'C', x: -1.0, y: 0.0, z: 0.0, charge: 0.18, radius: 1.70, color: '#10b981' },
      { id: 'ol2', symbol: 'N', x: -0.5, y: 1.2, z: 0.1, charge: -0.24, radius: 1.55, color: '#3b82f6' },
      { id: 'ol3', symbol: 'N', x: 0.8, y: 1.3, z: 0.1, charge: -0.26, radius: 1.55, color: '#3b82f6' },
      { id: 'ol4', symbol: 'C', x: 1.5, y: 0.2, z: 0.0, charge: 0.35, radius: 1.70, color: '#10b981' },
      { id: 'ol5', symbol: 'O', x: 2.7, y: 0.3, z: -0.1, charge: -0.52, radius: 1.52, color: '#ef4444' },
      { id: 'ol6', symbol: 'C', x: 0.7, y: -1.0, z: -0.1, charge: 0.10, radius: 1.70, color: '#10b981' },
      { id: 'ol7', symbol: 'C', x: -0.6, y: -1.1, z: -0.1, charge: 0.12, radius: 1.70, color: '#10b981' },
      { id: 'ol8', symbol: 'F', x: -2.3, y: 0.1, z: 0.0, charge: -0.38, radius: 1.47, color: '#a855f7' },
      { id: 'ol9', symbol: 'C', x: 1.3, y: -2.3, z: -0.2, charge: 0.15, radius: 1.70, color: '#10b981' }
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [6, 0],
      [0, 7], [3, 4], [5, 8]
    ]
  },
  {
    id: 'ligand-prasinezumab',
    name: 'Prasinezumab-SW α-Synuclein Binding Paratope',
    description: 'Engineered peptide paratope that binds pathological α-synuclein oligomeric fibrils.',
    molecularWeight: 682.74,
    formula: 'C31H46N8O9',
    center: [0, 0, 0],
    atoms: [
      { id: 'pr1', symbol: 'C', x: -0.6, y: 0.2, z: 0.0, charge: 0.10, radius: 1.70, color: '#10b981' },
      { id: 'pr2', symbol: 'O', x: -1.2, y: 1.3, z: 0.2, charge: -0.55, radius: 1.52, color: '#ef4444' },
      { id: 'pr3', symbol: 'N', x: 0.7, y: 0.1, z: -0.2, charge: -0.30, radius: 1.55, color: '#3b82f6' },
      { id: 'pr4', symbol: 'H', x: 1.1, y: -0.8, z: -0.3, charge: 0.35, radius: 1.20, color: '#f3f4f6' },
      { id: 'pr5', symbol: 'C', x: 1.6, y: 1.2, z: 0.1, charge: 0.20, radius: 1.70, color: '#10b981' },
      { id: 'pr6', symbol: 'O', x: 2.8, y: 1.0, z: -0.1, charge: -0.50, radius: 1.52, color: '#ef4444' },
      { id: 'pr7', symbol: 'N', x: 1.0, y: 2.4, z: 0.4, charge: 0.25, radius: 1.55, color: '#3b82f6' }
    ],
    bonds: [
      [0, 1], [0, 2], [2, 3], [2, 4], [4, 5], [4, 6]
    ]
  },
  {
    id: 'ligand-lecanemab',
    name: 'Lecanemab Protofilament Cap',
    description: 'High-affinity oligomer/protofilament capping agent preventing Amyloid-β seeding.',
    molecularWeight: 742.85,
    formula: 'C34H52N10O10',
    center: [0, 0, 0],
    atoms: [
      { id: 'lc1', symbol: 'C', x: -0.9, y: 0.1, z: 0.0, charge: 0.14, radius: 1.70, color: '#10b981' },
      { id: 'lc2', symbol: 'O', x: -1.5, y: 1.2, z: 0.3, charge: -0.52, radius: 1.52, color: '#ef4444' },
      { id: 'lc3', symbol: 'N', x: 0.4, y: 0.2, z: -0.1, charge: -0.28, radius: 1.55, color: '#3b82f6' },
      { id: 'lc4', symbol: 'C', x: 1.4, y: 1.1, z: 0.2, charge: 0.22, radius: 1.70, color: '#10b981' },
      { id: 'lc5', symbol: 'N', x: 2.6, y: 0.8, z: -0.2, charge: -0.32, radius: 1.55, color: '#3b82f6' },
      { id: 'lc6', symbol: 'O', x: 0.9, y: 2.3, z: 0.5, charge: -0.48, radius: 1.52, color: '#ef4444' }
    ],
    bonds: [
      [0, 1], [0, 2], [2, 3], [3, 4], [3, 5]
    ]
  },
  {
    id: 'ligand-b7h3-cart',
    name: 'B7-H3 BiTE / CAR-T scFv Paratope',
    description: 'High-avidity single-chain variable fragment targeting CD276/B7-H3 in Glioblastoma.',
    molecularWeight: 815.92,
    formula: 'C38H58N12O11',
    center: [0, 0, 0],
    atoms: [
      { id: 'bt1', symbol: 'C', x: -1.2, y: 0.3, z: 0.1, charge: 0.15, radius: 1.70, color: '#10b981' },
      { id: 'bt2', symbol: 'N', x: -0.3, y: 1.4, z: -0.2, charge: -0.26, radius: 1.55, color: '#3b82f6' },
      { id: 'bt3', symbol: 'C', x: 1.0, y: 1.2, z: 0.0, charge: 0.18, radius: 1.70, color: '#10b981' },
      { id: 'bt4', symbol: 'O', x: 1.8, y: 2.2, z: -0.3, charge: -0.50, radius: 1.52, color: '#ef4444' },
      { id: 'bt5', symbol: 'N', x: 1.6, y: -0.1, z: 0.3, charge: -0.30, radius: 1.55, color: '#3b82f6' },
      { id: 'bt6', symbol: 'C', x: 0.7, y: -1.1, z: 0.4, charge: 0.20, radius: 1.70, color: '#10b981' }
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [2, 4], [4, 5]
    ]
  },
  {
    id: 'ligand-trikafta',
    name: 'Trikafta-SW Triple-Modulator Core',
    description: 'Binds CFTR channel to correct ΔF508 gating, folding, and chloride ion conduction.',
    molecularWeight: 522.58,
    formula: 'C26H27F3N4O4',
    center: [0, 0, 0],
    atoms: [
      { id: 'tk1', symbol: 'C', x: -1.0, y: 0.2, z: 0.0, charge: 0.12, radius: 1.70, color: '#10b981' },
      { id: 'tk2', symbol: 'N', x: -0.3, y: 1.3, z: -0.1, charge: -0.25, radius: 1.55, color: '#3b82f6' },
      { id: 'tk3', symbol: 'C', x: 1.0, y: 1.1, z: 0.2, charge: 0.22, radius: 1.70, color: '#10b981' },
      { id: 'tk4', symbol: 'O', x: 1.7, y: 2.1, z: -0.1, charge: -0.52, radius: 1.52, color: '#ef4444' },
      { id: 'tk5', symbol: 'F', x: -2.2, y: 0.4, z: 0.2, charge: -0.36, radius: 1.47, color: '#a855f7' },
      { id: 'tk6', symbol: 'F', x: -1.5, y: -1.2, z: -0.4, charge: -0.36, radius: 1.47, color: '#a855f7' }
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [0, 4], [0, 5]
    ]
  },
  {
    id: 'ligand-voxelotor',
    name: 'Voxelotor Allosteric HbS Polymerization Inhibitor',
    description: 'Increases HbS oxygen affinity to deterministically prevent sickle cell polymerization.',
    molecularWeight: 337.37,
    formula: 'C19H19N3O3',
    center: [0, 0, 0],
    atoms: [
      { id: 'vx1', symbol: 'C', x: -0.8, y: 0.0, z: 0.0, charge: 0.14, radius: 1.70, color: '#10b981' },
      { id: 'vx2', symbol: 'N', x: -0.1, y: 1.1, z: 0.1, charge: -0.28, radius: 1.55, color: '#3b82f6' },
      { id: 'vx3', symbol: 'C', x: 1.2, y: 0.9, z: -0.1, charge: 0.20, radius: 1.70, color: '#10b981' },
      { id: 'vx4', symbol: 'O', x: 2.0, y: 1.8, z: 0.0, charge: -0.50, radius: 1.52, color: '#ef4444' },
      { id: 'vx5', symbol: 'O', x: 1.7, y: -0.3, z: -0.2, charge: -0.48, radius: 1.52, color: '#ef4444' }
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [2, 4]
    ]
  }
];

export const MULTI_MEDICINE_COMBINATIONS: MultiMedicineCombination[] = [
  {
    id: 'combo-nsclc-pancreatic',
    name: 'Pan-Oncology Dual-Inhibitor Synergy (KRAS + EGFR)',
    description: 'Simultaneous Switch-II allosteric locking & covalent EGFR-TKI inhibition, shutting down MAPK & PI3K escape cascades.',
    diseaseTarget: 'Refractory NSCLC & Pancreatic Adenocarcinoma (KRAS G12D / EGFR T790M)',
    targetProteinId: 'kras-g12d',
    ligandIds: ['ligand-rnk08954', 'ligand-osimertinib'],
    synergyIndex: 2.45,
    combinedDeltaG: -16.8,
    combinedKi: 0.04,
    multiRoleApplication: 'Overcomes single-agent bypass resistance; produces durable complete remission in dual-mutant tumors.',
    combinedLnpVehicle: 'Dual-Compartment Ionizable LNP (44 nm) with cRGD surface ligand',
    customStandingWaveFreq: 'ω = 5.38 × 10¹⁵ s⁻¹'
  },
  {
    id: 'combo-synthetic-lethality',
    name: 'Synthetic Lethality Multi-Block (PARP1 + STING Agonist)',
    description: 'PARP1 DNA-trapping combined with innate immune STING reactivation, converting cold tumors into immunogenic hot targets.',
    diseaseTarget: 'Triple-Negative Breast Cancer (TNBC) & Ovarian Carcinoma',
    targetProteinId: 'parp1-cat',
    ligandIds: ['ligand-olaparib', 'ligand-rnk08954'],
    synergyIndex: 2.10,
    combinedDeltaG: -15.4,
    combinedKi: 0.09,
    multiRoleApplication: 'Eliminates homologous recombination deficient cancer stem cells while triggering CD8+ T-cell infiltration.',
    combinedLnpVehicle: 'Folate-Conjugated Lipid Bilayer NP (38 nm)',
    customStandingWaveFreq: 'ω = 4.95 × 10¹⁵ s⁻¹'
  },
  {
    id: 'combo-neuro-dual-action',
    name: 'Dual Neuro-Protection & Clearance (α-Synuclein + Amyloid-β)',
    description: 'Bi-specific paratope targeting both Lewy Body α-synuclein fibrils and Amyloid-β oligomeric cores across the blood-brain barrier.',
    diseaseTarget: 'Parkinson’s Disease Dementia & Mixed Alzheimer’s/Lewy Pathology',
    targetProteinId: 'asyn-fibril',
    ligandIds: ['ligand-prasinezumab', 'ligand-lecanemab'],
    synergyIndex: 2.80,
    combinedDeltaG: -18.2,
    combinedKi: 0.02,
    multiRoleApplication: 'Halts dual neurodegenerative proteopathy and prevents retrograde trans-synaptic prion-like transmission.',
    combinedLnpVehicle: 'Angiopep-2 Transcytosis LNP (32 nm)',
    customStandingWaveFreq: 'ω = 2.65 × 10¹⁵ s⁻¹'
  },
  {
    id: 'combo-glioblastoma-cart',
    name: 'CAR-T Cell Engager + Blood-Brain-Barrier Penetrator',
    description: 'Combines B7-H3 CAR-T receptor mimic with kinase inhibitors to eliminate glioblastoma stem cells in hypoxic tumor niches.',
    diseaseTarget: 'Recurrent Glioblastoma Multiforme (WHO Grade IV)',
    targetProteinId: 'b7-h3-gbm',
    ligandIds: ['ligand-b7h3-cart', 'ligand-osimertinib'],
    synergyIndex: 2.30,
    combinedDeltaG: -17.1,
    combinedKi: 0.05,
    multiRoleApplication: 'Eradicates infiltrative glioma margins and eliminates treatment-resistant perivascular niche cells.',
    combinedLnpVehicle: 'Transferrin-Targeted Core-Shell NP (28 nm)',
    customStandingWaveFreq: 'ω = 3.92 × 10¹⁵ s⁻¹'
  }
];

/**
 * Builds a 3D composite multi-medicine molecule from multiple candidate ligands
 */
export function buildCombinedMultiLigand(
  name: string,
  ligandIds: string[],
  spacing = 2.4
): Molecule3D {
  const selectedLigands = CANDIDATE_LIGANDS.filter((l) => ligandIds.includes(l.id));
  if (selectedLigands.length === 0) return CANDIDATE_LIGANDS[0];
  if (selectedLigands.length === 1) return selectedLigands[0];

  const compositeAtoms: Atom3D[] = [];
  const compositeBonds: [number, number][] = [];
  let atomIndexOffset = 0;
  let totalMw = 0;
  const formulas: string[] = [];

  selectedLigands.forEach((lig, ligIdx) => {
    const shiftX = (ligIdx - (selectedLigands.length - 1) / 2) * spacing;
    const shiftY = (ligIdx % 2 === 0 ? 0.3 : -0.3);
    const shiftZ = (ligIdx * 0.4);

    lig.atoms.forEach((atom) => {
      compositeAtoms.push({
        ...atom,
        id: `c_${ligIdx}_${atom.id}`,
        x: atom.x + shiftX,
        y: atom.y + shiftY,
        z: atom.z + shiftZ,
        color: ligIdx === 0 ? '#10b981' : ligIdx === 1 ? '#38bdf8' : '#f59e0b'
      });
    });

    lig.bonds.forEach(([b1, b2]) => {
      compositeBonds.push([b1 + atomIndexOffset, b2 + atomIndexOffset]);
    });

    // Add bridging linker bond between multi-medicines
    if (ligIdx > 0 && atomIndexOffset > 0) {
      compositeBonds.push([atomIndexOffset - 1, atomIndexOffset]);
    }

    atomIndexOffset += lig.atoms.length;
    totalMw += lig.molecularWeight;
    formulas.push(lig.formula);
  });

  return {
    id: `composite-${ligandIds.join('-')}`,
    name: name,
    description: `Multi-Medicine synergistic combination of ${selectedLigands.map((l) => l.name).join(' + ')}`,
    molecularWeight: parseFloat(totalMw.toFixed(2)),
    formula: formulas.join(' • '),
    center: [0, 0, 0],
    atoms: compositeAtoms,
    bonds: compositeBonds
  };
}

/**
 * Builds a Personalized Custom Patient Unique Medicine in 3D
 */
export function buildCustomPatientMolecule(
  patientProfile: CustomPatientProfile
): Molecule3D {
  return buildCombinedMultiLigand(
    `Custom Individual Medicine: ${patientProfile.patientName} (${patientProfile.patientId})`,
    patientProfile.selectedMedicineIds,
    2.6
  );
}
