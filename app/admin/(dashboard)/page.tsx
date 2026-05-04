"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UniversalAdminForm } from "@/components/admin/UniversalAdminForm";
import Link from "next/link";
import toast from "react-hot-toast";
import { 
  Package, Users, Calendar, BookOpen, 
  ArrowRight, Edit, Trash2, User, Clock 
} from "lucide-react";

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState({ archives: 0, craftsmen: 0, events: 0, publications: 0 });
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal/Form State
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [activeTable, setActiveTable] = useState<any>("archives");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Counts (head: true only returns the count metadata)
      const [arcRes, crfRes, eveRes, pubRes] = await Promise.all([
        supabase.from("archives").select("*", { count: "exact", head: true }),
        supabase.from("craftsmen").select("*", { count: "exact", head: true }),
        supabase.from("events").select("*", { count: "exact", head: true }),
        supabase.from("publications").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        archives: arcRes.count || 0,
        craftsmen: crfRes.count || 0,
        events: eveRes.count || 0,
        publications: pubRes.count || 0,
      });

      // 2. Fetch Latest 3 items from each table to build the feed
      const [arcData, crfData, eveData, pubData] = await Promise.all([
        supabase.from("archives").select("id, title, image_url, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("craftsmen").select("id, name, image_url, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("events").select("id, title, image_url, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("publications").select("id, title, image_url, created_at").order("created_at", { ascending: false }).limit(3),
      ]);

      // 3. Normalize data (Name vs Title) and Merge
      const merged = [
        ...(arcData.data || []).map(i => ({ ...i, type: 'archives', displayTitle: i.title })),
        ...(crfData.data || []).map(i => ({ ...i, type: 'craftsmen', displayTitle: i.name })),
        ...(eveData.data || []).map(i => ({ ...i, type: 'events', displayTitle: i.title })),
        ...(pubData.data || []).map(i => ({ ...i, type: 'publications', displayTitle: i.title })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setRecentItems(merged.slice(0, 10));
    } catch (err) {
      console.error(err);
      toast.error("Failed to refresh dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (item: any) => {
    setActiveTable(item.type);
    setEditingItem(item); // Note: In a real app, you'd fetch the FULL row by ID here
    setIsFormVisible(true);
  };

  const handleDelete = async (item: any) => {
    if (!window.confirm(`Are you sure you want to delete this ${item.type} entry?`)) return;
    const { error } = await supabase.from(item.type).delete().eq("id", item.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Entry deleted successfully");
      fetchData();
    }
  };

  const statCards = [
    { title: "Archives", count: stats.archives, icon: Package, color: "text-blue-600", bg: "bg-blue-50", link: "/admin/archives" },
    { title: "Craftsmen", count: stats.craftsmen, icon: Users, color: "text-green-600", bg: "bg-green-50", link: "/admin/craftsmen" },
    { title: "Events", count: stats.events, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50", link: "/admin/events" },
    { title: "Publications", count: stats.publications, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50", link: "/admin/publications" },
  ];

  if (isFormVisible) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => setIsFormVisible(false)} className="flex items-center text-sm text-gray-600 mb-6 hover:text-black">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Overview
        </button>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <UniversalAdminForm
            tableName={activeTable}
            initialData={editingItem}
            onSuccess={() => { setIsFormVisible(false); fetchData(); }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* 1. Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time status of Lab Desain Budaya asset</p>
        </div>
        <div className="text-xs text-gray-400 flex items-center bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          <Clock className="w-3 h-3 mr-1" /> Last sync: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* 2. Stats Grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className={`p-3 w-fit rounded-lg ${card.bg} mb-4`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {isLoading ? <span className="inline-block w-12 h-8 bg-gray-100 animate-pulse rounded"></span> : card.count}
            </p>
            <Link href={card.link} className="mt-4 flex items-center text-xs font-bold text-gray-400 hover:text-black transition-colors group">
              VIEW ALL <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>


      <div className="space-y-4">
        {/* <h2 className="text-lg font-bold flex items-center">
          Recent Activity Feed <span className="ml-2 text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Top 10 Across All Tables</span>
        </h2> */}
        
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th> */}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">Loading activity feed...</td></tr>
                ) : recentItems.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No recent activity found.</td></tr>
                ) : (
                  recentItems.map((item) => (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center overflow-hidden border border-gray-200 text-gray-400">
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{item.displayTitle}</div>
                            {/* <div className="text-[10px] text-gray-400 uppercase">ID: {item.id}</div> */}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.type === 'archives' ? 'bg-blue-100 text-blue-700' :
                          item.type === 'craftsmen' ? 'bg-green-100 text-green-700' :
                          item.type === 'events' ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-3 text-sm">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 transition-colors">
                          <Edit className="w-4 h-4 inline" />
                        </button>
                        <button onClick={() => handleDelete(item)} className="text-red-600 hover:text-red-900 transition-colors">
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}