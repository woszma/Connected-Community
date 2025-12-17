/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Accessing import.meta.env directly allows Vite to inject the environment variables during build.
// Using (import.meta as any).env prevents this injection, causing a runtime error in the browser.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials are missing. Networking features will fail safely.\n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
  );
}

// Fallback to prevent invalid URL errors in Supabase client if keys are missing
const url = SUPABASE_URL || 'https://placeholder.supabase.co';
const key = SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(url, key);