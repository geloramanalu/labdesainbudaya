"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Adjust this path if your client is elsewhere
import toast from 'react-hot-toast';

export default function NewArchivePage() {
  const router = useRouter();
  
  // form State
  const [title, setTitle] = useState('');
  const [creators, setCreators] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  // Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!title || !file) {
      toast.error('Title and an Image are required!');
      return;
    }

    const toastId = toast.loading('Uploading and saving...');
    setIsSubmitting(true);

    try {
      // 1. Upload the Image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `archives/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('labdesainbudaya-media') // Ensure this bucket exists in your Supabase project
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get the Public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('labdesainbudaya-media')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      // 3. Insert the Text Data + Image URL into the Database
      const { error: insertError } = await supabase
        .from('archives')
        .insert([
          { 
            title, 
            creators, 
            description, 
            image_url: imageUrl 
          }
        ]);

      if (insertError) throw insertError;

      // Success!
      toast.success('Archive added successfully!', { id: toastId });
      router.push('/admin/archives'); // Redirect back to the table view
      
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Archive</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Anyaman Bambu Tradisional"
          />
        </div>

        {/* Creators/Authors Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Creators / Researchers</label>
          <input 
            type="text" 
            value={creators}
            onChange={(e) => setCreators(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., KKN Team 2023"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image *</label>
          <input 
            type="file" 
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="mt-1 text-xs text-gray-500">Max file size: 2MB</p>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Archive'}
        </button>
      </form>
    </div>
  );
}