"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { 
  Package, 
  Users, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  Activity 
} from "lucide-react";

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({
    archives: 0,
    craftsmen: 0,
    events: 0,
    publications: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);

      // Fetch counts simultaneously for maximum performance
      // 'head: true' means it ONLY asks for the count, not the actual data rows
      const [archivesRes, craftsmenRes, eventsRes, pubRes] = await Promise.all([
        supabase.from("archives").select("*", { count: "exact", head: true }),
        supabase.from("craftsmen").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("publications").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        archives: archivesRes.count || 0,
        craftsmen: craftsmenRes.count || 0,
        events: eventsRes.count || 0,
        publications: pubRes.count || 0,
      });

      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { 
      title: "Total Archives", 
      count: stats.archives, 
      icon: Package, 
      color: "text-blue-600", 
      bgColor: "bg-blue-100",
      link: "/admin/archives" 
    },
    { 
      title: "Craftsmen Profiles", 
      count: stats.craftsmen, 
      icon: Users, 
      color: "text-green-600", 
      bgColor: "bg-green-100",
      link: "/admin/craftsmen" 
    },
    { 
      title: "Events/Initiatives", 
      count: stats.events, 
      icon: Calendar, 
      color: "text-orange-600", 
      bgColor: "bg-orange-100",
      link: "/admin/events" 
    },
    { 
      title: "Publications", 
      count: stats.publications, 
      icon: BookOpen, 
      color: "text-purple-600", 
      bgColor: "bg-purple-100",
      link: "/admin/publications" 
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back to the Lab Desain Budaya management panel.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    card.count
                  )}
                </p>
              </div>

              <Link 
                href={card.link}
                className="mt-6 flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors group"
              >
                Manage Records 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quick Actions / System Status */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Activity className="w-5 h-5 text-gray-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">System Status</h2>
        </div>
        <div className="text-sm text-gray-600 space-y-2">
          <p className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Supabase Database: <strong className="ml-1 text-gray-900">Connected</strong>
          </p>
          <p className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Media Storage Bucket: <strong className="ml-1 text-gray-900">Active</strong>
          </p>
        </div>
      </div> */}
    </div>
  );
}