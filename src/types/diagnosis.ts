export type DiagnosisState = 'initial' | 'connecting' | 'processing' | 'streaming' | 'results' | 'error';

export interface DiagnosisSession {
  code: string;
  src: string;
  racText: string;
  timestamp: string;
  completed: boolean;
  converted: boolean;
}

export interface DiagnosisResult {
  analysis: string;
}
