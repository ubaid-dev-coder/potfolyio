import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Strict URL validator ensuring protocol is http or https and not a dummy placeholder
function isValidHttpUrl(stringUrl: string): boolean {
  if (!stringUrl || stringUrl.length === 0) return false;
  if (stringUrl.includes('placeholder') || stringUrl.includes('your-project')) return false;
  
  try {
    const url = new URL(stringUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = (): boolean => {
  return (
    isValidHttpUrl(rawUrl) &&
    Boolean(rawKey) &&
    rawKey.length > 20 &&
    !rawKey.includes('placeholder') &&
    !rawKey.includes('your-anon-key')
  );
};

function initializeClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    return createClient(rawUrl, rawKey);
  } catch (error) {
    console.warn('Supabase client initialization skipped due to invalid configuration:', error);
    return null;
  }
}

export const supabase: SupabaseClient | null = initializeClient();
