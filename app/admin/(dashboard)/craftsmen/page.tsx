"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UniversalAdminForm } from "@/components/admin/UniversalAdminForm";
import toast from "react-hot-toast";
import { Edit, Trash2, Plus, ArrowLeft, User } from "lucide-react";

export default function CraftsmenPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: result, error } = await supabase
      .from("craftsmen")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load craftsmen: " + error.message);
    } else {
      setData(result || []);
    }
    setIsLoading(false);
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this craftsman profile?")) return;
    const { error } = await supabase.from("craftsmen").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile deleted successfully");
      fetchData();
    }
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setEditingRecord(null);
    fetchData();
  };

  if (isFormVisible) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => setIsFormVisible(false)} 
          className="flex items-center text-sm text-gray-600 mb-6 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Craftsmen List
        </button>
        
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {editingRecord ? "Edit Craftsman Profile" : "Add New Craftsman"}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Fill in the details below. This will appear on the public profiles directory.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <UniversalAdminForm
            tableName="craftsmen"
            initialData={editingRecord}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Craftsmen Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage profiles of local artisans and creators.</p>
        </div>
        <button 
          onClick={() => { setEditingRecord(null); setIsFormVisible(true); }} 
          className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Craftsman
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Craftsman Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location/Address</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">No craftsmen profiles found.</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 truncate max-w-xs">
                        {item.address || <span className="italic text-gray-400">Not specified</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                      <button 
                        onClick={() => { setEditingRecord(item); setIsFormVisible(true); }} 
                        className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 inline" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="text-red-600 hover:text-red-900 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 inline" />
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
  );
}