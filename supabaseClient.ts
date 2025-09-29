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
