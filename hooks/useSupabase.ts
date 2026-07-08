'use client';

import { useState, useEffect } from 'react';
import { supabaseClient } from '../lib/supabase-browser';
import { PostgrestError } from '@supabase/supabase-js';

type SupabaseQuery = ReturnType<ReturnType<typeof supabaseClient.from>['select']>;

export function useSupabaseList<T>(
  tableName: string,
  options?: {
    select?: string;
    order?: { column: string; ascending?: boolean };
    filter?: (query: SupabaseQuery) => SupabaseQuery;
  }
) {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const selectOpt = options?.select;
  const orderCol = options?.order?.column;
  const orderAsc = options?.order?.ascending;
  const filterFn = options?.filter;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        let query = supabaseClient.from(tableName).select(selectOpt || '*');

        if (orderCol) {
          query = query.order(orderCol, { ascending: orderAsc !== false });
        }

        if (filterFn) {
          query = filterFn(query as unknown as SupabaseQuery) as typeof query;
        }

        const { data: resData, error: resError } = await query;

        if (isMounted) {
          if (resError) {
            setError(resError);
            setData(null);
          } else {
            setData(resData as T[]);
            setError(null);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err as PostgrestError);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [tableName, selectOpt, orderCol, orderAsc, filterFn]);

  return { data, error, loading };
}

export function useSupabaseItem<T>(tableName: string, id: string | number) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id === undefined || id === null || id === '') {
      setData(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const { data: resData, error: resError } = await supabaseClient
          .from(tableName)
          .select('*')
          .eq('id', id)
          .single();

        if (isMounted) {
          if (resError) {
            setError(resError);
            setData(null);
          } else {
            setData(resData as T);
            setError(null);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err as PostgrestError);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [tableName, id]);

  return { data, error, loading };
}
