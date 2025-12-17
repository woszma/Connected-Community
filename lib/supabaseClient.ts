import { createClient } from '@supabase/supabase-js';

// Vite uses import.meta.env.VITE_...
const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials are missing. Networking features will fail safely.\n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
  );
}

// 使用 Fallback 防止 createClient 因為空字串而直接讓 App 崩潰 (White Screen)
// 這樣即使沒有設定 API Key，畫面仍然可以顯示，只是讀不到資料
const url = SUPABASE_URL || 'https://placeholder.supabase.co';
const key = SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(url, key);