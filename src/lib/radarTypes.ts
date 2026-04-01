export interface Prospect {
  organisation: string;
  secteur: string;
  departement: string;
  region: string;
  taille: string;
  anneeBilan: number;
  historique: string;
  nbBilans: number;
  scope1: number;
  scope2: number;
  scope3: number;
  totalEmissions: number;
  planTransition: "Oui" | "Non";
  score: 1 | 2 | 3;
  signalLegal: string;
  interlocuteur: string;
  angleCommercial: string;
  siren: string;
  codeNaf: string;
  segment: "ETI" | "GG";
}

export type ScoreFilter = "all" | "1" | "2" | "3";
export type RegionFilter = "all" | string;
export type SegmentFilter = "all" | "ETI" | "GG";
