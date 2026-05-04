import { supabase } from "@/lib/supabaseClient";

export const generateUniqueSlug = async (title: string = "", tableName: string) => {
  // fallback for empty inputs
  if (!title) return `entry-${Math.random().toString(36).substring(2, 8)}`;

  // cleaning
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const { data, error } = await supabase
    .from(tableName)
    .select('slug')
    .eq('slug', baseSlug)
    .maybeSingle(); 

  if (error) {
    console.error("Slug check error:", error);
  }

  if (!data) return baseSlug;

  // 5. if data exists, append a random suffix
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomSuffix}`;
};