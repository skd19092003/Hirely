
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
//sending the access token to the supabase client to see if user is authenticated to access or not
const supabaseClient = async(supabaseAccessToken)=>{
const supabase = createClient(supabaseUrl, supabaseKey, {
    //clerk ke liye supabaseaccesstoken headers mai diya jata hai
    global: {
        headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
        // Add an Authorization header with the Clerk access token.
        // This lets Supabase know which user is making the request (for Row Level Security).
        },
    },
});

return supabase;
}

export default supabaseClient
        


// What is this and why is it used?
// Purpose:
// This file exports a function that creates a Supabase client configured for the currently authenticated Clerk user.
// Why:
// When using Clerk for authentication and Supabase for your database, you need to send the user's access token to Supabase. This allows Supabase to enforce Row Level Security (RLS) and know which user is making requests.
// How to use:
// Call supabaseClient(clerkAccessToken) to get a Supabase client that sends the correct Authorization header for the current use