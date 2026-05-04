"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace("/admin/login");
      } else {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          router.replace("/admin/login");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Lab Admin</h1>
          <p className="text-xs text-gray-500 mt-1">v1.0.0 MVP</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* UPDATED LINKS HERE */}
          <Link 
            href="/admin" 
            className={`block px-4 py-2 rounded-md transition-colors ${pathname === '/admin' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Dashboard Overview
          </Link>
          <Link 
            href="/admin/archives" 
            className={`block px-4 py-2 rounded-md transition-colors ${pathname?.includes('/admin/archives') ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Manage Archives
          </Link>
          <Link 
            href="/admin/craftsmen" 
            className={`block px-4 py-2 rounded-md transition-colors ${pathname?.includes('/admin/craftsmen') ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Manage Craftsmen
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium text-sm"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}