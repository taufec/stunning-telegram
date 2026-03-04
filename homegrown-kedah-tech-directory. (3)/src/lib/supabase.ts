import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://imovhhvytocoahhpabey.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb3ZoaHZ5dG9jb2FoaHBhYmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MTk1MDYsImV4cCI6MjA4ODA5NTUwNn0.ydhsnxEPvJhYngmX2UxY29I7OlPCMWr7bUjQEHQqyw4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
