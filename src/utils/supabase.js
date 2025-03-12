// import { createClient } from '@supabase/supabase-js';

// // Supabase client setup
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// // Initialize Supabase client
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Function to get user profile data
// export async function getUserProfile(userId) {
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();

//   if (error) {
//     console.error('Error fetching user profile:', error);
//     return null;
//   }

//   return data;
// }

// // Function to update user profile
// export async function updateUserProfile(userId, updates) {
//   const { data, error } = await supabase
//     .from('profiles')
//     .update(updates)
//     .eq('id', userId);

//   if (error) {
//     console.error('Error updating user profile:', error);
//     return null;
//   }

//   return data;
// }

// // Function to upload a file to Supabase storage
// export async function uploadFile(bucket, path, file) {
//   const { data, error } = await supabase.storage
//     .from(bucket)
//     .upload(path, file, {
//       cacheControl: '3600',
//       upsert: true
//     });

//   if (error) {
//     console.error('Error uploading file:', error);
//     return null;
//   }

//   // Get public URL for the uploaded file
//   const { data: urlData } = supabase.storage
//     .from(bucket)
//     .getPublicUrl(data.path);

//   return urlData.publicUrl;
// }

// // Example function to get games with filtering
// export async function getGames({ category, search, limit = 12, page = 1 }) {
//   let query = supabase
//     .from('games')
//     .select('*, categories(*)');

//   // Apply filters
//   if (category && category !== 'all') {
//     query = query.eq('categories.slug', category);
//   }

//   if (search) {
//     query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
//   }

//   // Apply pagination
//   const from = (page - 1) * limit;
//   const to = from + limit - 1;
  
//   const { data, error, count } = await query
//     .range(from, to)
//     .order('name')
//     .throwOnError();

//   if (error) {
//     console.error('Error fetching games:', error);
//     return { games: [], total: 0 };
//   }

//   return { 
//     games: data || [], 
//     total: count || 0
//   };
// }