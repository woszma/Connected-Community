import { createClient } from '@supabase/supabase-js';

// FIX: In Vite, environment variables must be accessed directly (e.g. import.meta.env.VITE_KEY)
// for them to be statically replaced during the build process.
// Dynamic access (like import.meta.env[key]) will result in 'undefined' in production builds.

const getEnvVar = (key: string, value: string | undefined) => {
  if (!value) {
    return undefined;
  }
  return value;
};

// Access directly so Vite can bundle the values from your Secrets/Env
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Check if configured
export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey
);

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase Config Missing. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file or Codespaces Secrets.'
  );
}

// Initialize Client
// We provide fallback strings to prevent immediate crash on load, 
// but queries will be blocked by the isSupabaseConfigured check in App.tsx
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);