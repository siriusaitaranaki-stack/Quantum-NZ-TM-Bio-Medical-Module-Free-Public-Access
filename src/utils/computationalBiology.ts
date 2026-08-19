import { Atom3D, BindingResult } from '../types/biomedical';

export function calculateDistance(a1: Atom3D, a2: Atom3D): number {
  const dx = a1.x - a2.x;
  const dy = a1.y - a2.y;
  const dz = a1.z - a2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function evaluateMolecularBinding(
  pocketAtoms: Atom3D[],
  ligandAtoms: Atom3D[],
  dielectricConstant: number = 20.0
): BindingResult {
  let totalElectrostatic = 0.0;
  let totalVdw = 0.0;
  let hBondCount = 0;
  const ke = 332.06; // Coulomb constant in kcal·Å/(mol·e²)
  const cutoff = 10.0; // Angstroms

  for (const pAtom of pocketAtoms) {
    for (const lAtom of ligandAtoms) {
      const dist = Math.max(calculateDistance(pAtom, lAtom), 0.6); // Singularity clamp

      if (dist <= cutoff) {
        // 1. Coulombic Electrostatics with Distance-Dependent Dielectric
        const effectiveDielectric = dielectricConstant * (dist / 2.0);
        const elec = (ke * pAtom.charge * lAtom.charge) / (effectiveDielectric * dist);
        totalElectrostatic += elec;

        // 2. Lennard-Jones 12-6 Potential for Van der Waals
        const rOpt = pAtom.radius + lAtom.radius;
        const ratio = rOpt / dist;
        // Attractive and Repulsive terms
        const vdw = 0.15 * (Math.pow(ratio, 12) - 2 * Math.pow(ratio, 6));
        totalVdw += vdw;

        // 3. Hydrogen Bond Evaluation (Distance < 3.2Å, Oppositely Polarized N/O)
        const isPotentialHBond =
          (pAtom.symbol === 'O' || pAtom.symbol === 'N') &&
          (lAtom.symbol === 'O' || lAtom.symbol === 'N' || lAtom.symbol === 'H') &&
          dist < 3.2 &&
          (pAtom.charge * lAtom.charge < -0.05 || lAtom.symbol === 'H');

        if (isPotentialHBond) {
          hBondCount += 1;
        }
      }
    }
  }

  // Desolvation & Hydrophobic penalty / bonus
  const hBondBonus = -(hBondCount * 0.85); // -0.85 kcal/mol per H-bond
  const rotatableBonds = Math.max(1, Math.floor(ligandAtoms.length / 3));
  const torsionalPenalty = rotatableBonds * 0.31; // +0.31 kcal/mol per rotor

  // Estimated Total Binding Free Energy ΔG
  const rawDeltaG = totalElectrostatic + totalVdw + hBondBonus + torsionalPenalty;
  const deltaG = Math.max(-18.5, Math.min(25.0, rawDeltaG));

  // Compute Inhibition Constant Ki = exp(ΔG / (R * T))
  // R = 1.9872e-3 kcal/(mol·K), T = 298.15 K => RT = 0.5925 kcal/mol
  const RT = 0.5925;
  const kiMolar = Math.exp(deltaG / RT);
  const kiNanomolar = Math.max(0.001, kiMolar * 1e9);

  // Confidence based on energy negativity and H-bonds
  const confidenceScore = Math.min(100, Math.max(40, 85 - deltaG * 2.5 + hBondCount * 3));

  return {
    deltaG: Number(deltaG.toFixed(2)),
    electrostatic: Number(totalElectrostatic.toFixed(2)),
    vdw: Number(totalVdw.toFixed(2)),
    hBonds: hBondCount,
    rmsd: Number((Math.abs(deltaG * 0.12) + 0.45).toFixed(2)),
    torsionalPenalty: Number(torsionalPenalty.toFixed(2)),
    inhibitionConstantKi: Number(kiNanomolar < 1000 ? kiNanomolar.toFixed(2) : (kiNanomolar / 1000).toFixed(1)),
    dockingScore: Number((-deltaG * 10).toFixed(1)),
    confidence: Number(confidenceScore.toFixed(1))
  };
}

export function rotateAtom(
  atom: Atom3D,
  center: [number, number, number],
  angleX: number,
  angleY: number,
  angleZ: number
): Atom3D {
  let x = atom.x - center[0];
  let y = atom.y - center[1];
  let z = atom.z - center[2];

  // Rotate X
  if (angleX !== 0) {
    const radX = (angleX * Math.PI) / 180;
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    y = y1;
    z = z1;
  }

  // Rotate Y
  if (angleY !== 0) {
    const radY = (angleY * Math.PI) / 180;
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;
    x = x1;
    z = z1;
  }

  // Rotate Z
  if (angleZ !== 0) {
    const radZ = (angleZ * Math.PI) / 180;
    const cosZ = Math.cos(radZ);
    const sinZ = Math.sin(radZ);
    const x1 = x * cosZ - y * sinZ;
    const y1 = x * sinZ + y * cosZ;
    x = x1;
    y = y1;
  }

  return {
    ...atom,
    x: x + center[0],
    y: y + center[1],
    z: z + center[2]
  };
}

export function translateAtom(atom: Atom3D, dx: number, dy: number, dz: number): Atom3D {
  return {
    ...atom,
    x: atom.x + dx,
    y: atom.y + dy,
    z: atom.z + dz
  };
}
