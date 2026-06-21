'use client'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseList<T>(table: string) {
  return useQuery({
    queryKey: [table], 
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select('*')
      if (error) throw new Error(error.message)
      return data as T[]
    }
  })
}