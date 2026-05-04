import { supabase } from "@/lib/supabaseClient";
export const generateUniqueSlug = async (title: string, tableName: string) => {
  // 1. Basic cleaning
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // 2. Check if this slug exists using .maybeSingle()
  // This will NOT throw an error if the slug is missing (0 rows)
  const { data, error } = await supabase
    .from(tableName)
    .select('slug')
    .eq('slug', baseSlug)
    .maybeSingle(); 

  // If there's an actual database error (not just 'not found'), log it
  if (error) {
    console.error("Slug check error:", error);
  }

  // 3. If data is null, the slug is unique!
  if (!data) return baseSlug;

  // 4. If data exists, append the random suffix
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomSuffix}`;
};