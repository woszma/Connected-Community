import { createClient } from '@supabase/supabase-js';

// 安全地取得環境變數
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    return import.meta.env?.[key];
  } catch (e) {
    return undefined;
  }
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// 檢查是否設定了有效的 Supabase 變數
export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey
);

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase 環境變數未設定 (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)。請檢查 .env 檔案。');
}

// 建立 Client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);