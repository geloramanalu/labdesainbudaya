"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UniversalAdminForm } from "@/components/admin/UniversalAdminForm";
import toast from "react-hot-toast";
import { Edit, Trash2, Plus, ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

export default function PublicationsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: result, error } = await supabase.from("publications").select("*").order("created_at", { ascending: false });
    if (error) toast.error("Failed to load publications.");
    else setData(result || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this publication?")) return;
    const { error } = await supabase.from("publications").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchData(); }
  };

  if (isFormVisible) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => setIsFormVisible(false)} className="flex items-center text-sm text-gray-600 mb-6 hover:text-black">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Publications
        </button>
        <h1 className="text-2xl font-bold mb-6">{editingRecord ? "Edit Publication" : "Add New Publication"}</h1>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <UniversalAdminForm tableName="publications" initialData={editingRecord} onSuccess={() => { setIsFormVisible(false); setEditingRecord(null); fetchData(); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Publications</h1>
          <p className="text-sm text-gray-500">Manage journals, books, and articles.</p>
        </div>
        <button onClick={() => { setEditingRecord(null); setIsFormVisible(true); }} className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Publication
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title & Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-400">Loading...</td></tr> : 
             data.length === 0 ? <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-400">No records found.</td></tr> : 
             data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center">
                  <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                     {item.image_url ? <img src={item.image_url} className="h-full w-full rounded object-cover" alt=""/> : <BookOpen className="w-5 h-5 text-gray-400"/>}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-blue-600 flex items-center mt-1">
                      {item.type_id}
                      {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="ml-2 hover:underline flex items-center"><ExternalLink className="w-3 h-3 mr-1"/> Link</a>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => { setEditingRecord(item); setIsFormVisible(true); }} className="text-blue-600"><Edit className="w-5 h-5 inline" /></button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600"><Trash2 className="w-5 h-5 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}