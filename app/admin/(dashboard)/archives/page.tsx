"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { UniversalAdminForm } from "@/components/admin/UniversalAdminForm";
import toast from "react-hot-toast";
import { Edit, Trash2, Plus, ArrowLeft } from "lucide-react"; // Assuming you use lucide-react for icons

export default function ArchivesPage() {
  const [archives, setArchives] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State to manage the view (Table vs Form) and the record being edited
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  // 1. Read View: Fetch data from Supabase
  const fetchArchives = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("archives")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load archives: " + error.message);
      console.error("Supabase fetch error:", error);
    } else {
      setArchives(data || []);
    }
    setIsLoading(false);
  };

  // Fetch on initial mount
  useEffect(() => {
    fetchArchives();
  }, []);

  // 2. Edit Integration: Set record and show form
  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setIsFormVisible(true);
  };

  // Open form for a new entry
  const handleAddNew = () => {
    setEditingRecord(null);
    setIsFormVisible(true);
  };

  // 3. Delete Functionality: Safety check + Delete + Refresh
  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this archive? This action cannot be undone.");
    if (!isConfirmed) return;

    const { error } = await supabase
      .from("archives")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete record: " + error.message);
    } else {
      toast.success("Archive deleted successfully.");
      fetchArchives(); // 4. Data Refresh
    }
  };

  // 4. Data Refresh: Callback for UniversalAdminForm
  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setEditingRecord(null);
    fetchArchives(); // Refresh the table to show the new/updated data
  };

  // --- RENDER FORM VIEW ---
  if (isFormVisible) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <button 
          onClick={() => setIsFormVisible(false)}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Archives
        </button>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {editingRecord ? "Edit Archive" : "Create New Archive"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {editingRecord ? "Update the details of the selected archive." : "Fill in the details to add a new archive to the database."}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <UniversalAdminForm
            tableName="archives"
            initialData={editingRecord}
            onSuccess={handleFormSuccess}
          />
        </div>
      </div>
    );
  }

  // --- RENDER TABLE VIEW ---
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Archives Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage crafting listings, materials, and history.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Archive
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image & Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Loading archives...
                  </td>
                </tr>
              ) : archives.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No archives found. Click "Add New Archive" to get started.
                  </td>
                </tr>
              ) : (
                archives.map((archive) => (
                  <tr key={archive.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {archive.image_url ? (
                          <img className="h-10 w-10 rounded object-cover mr-4" src={archive.image_url} alt="" />
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-200 mr-4 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                        <div className="text-sm font-medium text-gray-900">{archive.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {archive.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(archive.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => handleEdit(archive)}
                          className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(archive.id)}
                          className="text-red-600 hover:text-red-900 transition-colors p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
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