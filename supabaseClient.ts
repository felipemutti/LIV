// This is a mock client to prevent the application from crashing
// due to the presence of Supabase-related files.
// This version of the app uses mock data and does not connect to Supabase.
const mockSupabase = {
    auth: {
        resetPasswordForEmail: () => new Promise(res => res({ error: { message: 'Feature not available.' }})),
        updateUser: () => new Promise(res => res({ error: { message: 'Feature not available.' }})),
        signOut: () => new Promise(res => res({})),
    }
};

export const supabase = mockSupabase;
// in supabaseClient.ts
const supabaseUrl = 'YOUR_SUPABASE_URL'; https://zeciiytbgeqwroouygvs.supabase.co  
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplY2lpeXRiZ2Vxd3Jvb3V5Z3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4OTgzMDAsImV4cCI6MjA3NDQ3NDMwMH0.iO4MLzDXZmPp27Nd0PJ058cUyXIB9_hhQOvv6TgcurQ
-- Create the profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name character varying NOT NULL,
  email character varying NOT NULL,
  cpf character varying NOT NULL,
  rg character varying NOT NULL,
  profession character varying NOT NULL,
  "maritalStatus" character varying NOT NULL,
  address character varying NOT NULL,
  status character varying NOT NULL DEFAULT 'Pending'::character varying,
  "isAdmin" boolean NOT NULL DEFAULT false,
  signature character varying NOT NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles."
ON public.profiles FOR SELECT
USING (
  (SELECT "isAdmin" FROM public.profiles WHERE id = auth.uid()) = true
);

-- Allow users to update their own profile (optional, if needed)
CREATE POLICY "Users can update own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Allow admins to update all profiles
CREATE POLICY "Admins can update any profile."
ON public.profiles FOR UPDATE
USING (
  (SELECT "isAdmin" FROM public.profiles WHERE id = auth.uid()) = true
);

-- RLS for inserts
CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);
