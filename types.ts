export interface YoniState {
  id: number;
  name: string;
  description: string;
}

export interface Domain {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  states: YoniState[];
}

export interface DiagnosticResult {
  stateId: number;
  analysis: string;
  recommendation: string;
}

export enum ViewMode {
  GRID = 'GRID',
  DIAGNOSTIC = 'DIAGNOSTIC',
  DETAILS = 'DETAILS'
}
