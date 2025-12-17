export enum Screen {
  ADMIN = 'ADMIN',         
  LANDING = 'LANDING',     
  RETURNING = 'RETURNING', 
  NEW_INPUT = 'NEW_INPUT', 
  EXPLANATION = 'EXPLANATION', 
  HISTORY = 'HISTORY',     
}

export interface HistoryEvent {
  id: string;
  keychain_id: string; // Added to match DB
  timestamp: number;
  from_name: string | null; // Changed to snake_case to match SQL usually
  to_name: string;
  prompt_key: string;     
  prompt_text: string;    
  next_prompt_key?: string; 
  next_prompt_text?: string;
}

export interface Prompt {
  key: string;
  text: string;
}

export interface GlobalStore {
  [keyId: string]: HistoryEvent[];
}