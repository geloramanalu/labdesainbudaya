"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

export default function NewArchivePage() {
  const router = useRouter();
  
  // Form State matching the database schema
  const [title, setTitle] = useState('');
  const [creators, setCreators] = useState('');
  const [descriptionId, setDescriptionId] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
      
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error('File is too large! Please select an image under 2MB.');
        // reset the visual input and the state
        e.target.value = ''; 
        setFile(null);
        return;
      }
    }
    
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validation: Required Fields
    if (!title || !file) {
      toast.error('Title and an Image are required!');
      return;
    }

    // file size validation
    if (file) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size exceeds 2MB limit. Please replace the image.');
        setIsSubmitting(false); 
        return;
      }
    }

    // const toastId = toast.loading(isEditMode ? 'Updating...' : 'Creating...');
    // setIsSubmitting(true);

    const toastId = toast.loading('Uploading and saving...');
    setIsSubmitting(true);

    try {
      
      const fileExt = file.name.split('.').pop();
      const fileName = `archive-${Date.now()}.${fileExt}`;
      const filePath = `archives/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('labdesainbudaya-media') // Your exact bucket name
        .upload(filePath, file);

      if (uploadError) throw new Error(`Upload Failed: ${uploadError.message}`);

      const { data: publicUrlData } = supabase.storage
        .from('labdesainbudaya-media')
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') 
        .replace(/(^-|-$)+/g, '');   

      const { error: insertError } = await supabase
        .from('archives')
        .insert([
          { 
            title: title,
            slug: generatedSlug,
            creators: creators, 
            description_id: descriptionId, 
            description_en: descriptionEn,
            image_url: imageUrl 
            // type_anyaman, material_rotan, etc. will just be left null for now
          }
        ]);

      if (insertError) {
         // if the slug is already taken, Supabase throws code '23505'
         if (insertError.code === '23505') {
            throw new Error('An archive with this title already exists. Please use a different title.');
         }
         throw new Error(`Database Error: ${insertError.message}`);
      }

      toast.success('Archive added successfully!', { id: toastId });
      router.push('/admin/archives');
      
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
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Kursi Bambu Tradisional"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700">Description (Indonesian)</label>
          <textarea 
            rows={3}
            value={descriptionId}
            onChange={(e) => setDescriptionId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description (English)</label>
          <textarea 
            rows={3}
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

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
          <p className="mt-1 text-xs text-gray-500">Max file size: 2MB.</p>
        </div>

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