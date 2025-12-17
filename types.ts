export enum Screen {
  LANDING = 'LANDING',     // P0
  RETURNING = 'RETURNING', // P1
  NEW_INPUT = 'NEW_INPUT', // P2
  EXPLANATION = 'EXPLANATION', // P3
  HISTORY = 'HISTORY',     // P4
}

export interface HistoryEvent {
  id: string;
  timestamp: number;
  fromName: string | null;
  toName: string;
  promptKey: string;     // The instruction given to the person who GAVE it (fromName)
  promptText: string;    // The text version
  nextPromptKey?: string; // The instruction given to the CURRENT receiver (toName) for the next person
  nextPromptText?: string;
}

export interface Prompt {
  key: string;
  text: string;
}

export interface KeychainData {
  id: string;
  events: HistoryEvent[];
}