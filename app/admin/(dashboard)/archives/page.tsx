"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from 'react-hot-toast'

type Archive = {
  id: string;
  title: string;
  created_at: string;
};

const handleDelete = async (id: string) => {
  // Always confirm before a destructive action
  if (!window.confirm('Are you sure you want to delete this archive?')) return;

  const toastId = toast.loading('Deleting...');

  try {
    const { error } = await supabase
      .from('archives')
      .delete()
      .eq('id', id);

    if (error) throw error;

    toast.success('Archive deleted successfully', { id: toastId });
    // TODO: Trigger a state update or router.refresh() here to remove the item from the UI
    
  } catch (error: any) {
    toast.error(error.message || 'Failed to delete', { id: toastId });
  }
}

export default function ArchivesPage() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    setIsLoading(true);
    // Fetch everything from the 'archives' table, newest first
    const { data, error } = await supabase
      .from("archives")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching archives:", error);
    } else {
      setArchives(data || []);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Archives</h2>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
          + Add New Archive
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 animate-pulse">Loading database...</div>
        ) : archives.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No archives found in the database.</p>
            <p className="text-sm text-gray-400">Click the button above to add your first entry.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {archives.map((archive) => (
                <tr key={archive.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {archive.title || "Untitled"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(archive.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}