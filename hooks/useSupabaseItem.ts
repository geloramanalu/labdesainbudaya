'use client'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseItem<T>(table: string, id: string | null) {
  return useQuery({
    queryKey: [table, id],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
      if (error) throw new Error(error.message)
      return data as T
    },
    enabled: !!id,
  })
}