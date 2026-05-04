import { supabase } from "@/lib/supabaseClient";
export const generateUniqueSlug = async (title: string, tableName: string) => {
  // 1. Basic cleaning: lowercase, remove special characters, replace spaces with dashes
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric except spaces and dashes
    .replace(/\s+/g, '-')         // Replace spaces with dashes
    .replace(/-+/g, '-');         // Replace multiple dashes with single dash

  // 2. Check if this slug already exists in the specific table
  const { data } = await supabase
    .from(tableName)
    .select('slug')
    .eq('slug', baseSlug)
    .single();

  // 3. If no duplicate found, return base slug
  if (!data) return baseSlug;

  // 4. If duplicate found, append a short random suffix
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${randomSuffix}`;
};