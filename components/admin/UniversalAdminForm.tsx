import { FORM_SCHEMAS } from "@/config/forms";
import { useState } from "react";
import toast from "react-hot-toast";
import { generateUniqueSlug } from "@/util/slugify";
import { supabase } from "@/lib/supabaseClient";

export interface UniversalFormProps {
  tableName: keyof typeof FORM_SCHEMAS; 
  initialData?: any;
  onSuccess: () => void;
}

export function UniversalAdminForm({ tableName, initialData, onSuccess, ...otherProps }: UniversalFormProps) {
  const schema = FORM_SCHEMAS[tableName]; 
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    if (!initialData) return {};
    
    const formattedData = { ...initialData };
    // convert arrays back to comma-separated strings for the UI inputs
    const jsonbFields = ['material_rotan', 'alat_produksi'];
    jsonbFields.forEach(field => {
      if (Array.isArray(formattedData[field])) {
        formattedData[field] = formattedData[field].join(', ');
      }
    });
    return formattedData;
  });


  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error('File is too large! Please select an image under 2MB.');
        e.target.value = ''; 
        setFile(null);
        return;
      }
    }
    setFile(selectedFile);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- 1. FORM VALIDATION: Check required text fields based on Schema ---
    for (const field of schema) {
      if (field.required) {
        const value = formData[field.name];
        if (!value || String(value).trim() === '') {
          toast.error(`${field.label} is required!`);
          return;
        }
      }
    }

    // --- 2. FORM VALIDATION: Check required Image ---
    if (!file && !initialData?.image_url) {
      toast.error('An image upload is required!');
      return;
    }

    if (file) {
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size exceeds 2MB limit. Please replace the image.');
        return;
      }
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Uploading and saving...');

    try {
      // --- 1. SLUG LOGIC (New) ---
      let finalSlug = initialData?.slug;

      // Only generate a NEW slug if it's a new entry OR the title has changed
      const titleChanged = formData.title && formData.title !== initialData?.title;
      
      if (!initialData || titleChanged) {
        toast.loading('Generating unique URL...', { id: toastId });
        finalSlug = await generateUniqueSlug(formData.title, tableName);
      }

      // --- 2. STORAGE LOGIC: Upload image ---
      let imageUrl = initialData?.image_url || null;
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${tableName}-${Date.now()}.${fileExt}`;
        const filePath = `${tableName}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('labdesainbudaya-media')
          .upload(filePath, file);

        if (uploadError) throw new Error(`Upload Failed: ${uploadError.message}`);

        const { data: publicUrlData } = supabase.storage
          .from('labdesainbudaya-media')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // --- 3. PREPARE PAYLOAD ---
      const processedData = { ...formData };

      //  Convert specific comma-separated fields into arrays
      // You can add any other JSONB column names to this list in the future
      const jsonbFields = ['material_rotan', 'alat_produksi'];

      jsonbFields.forEach((field) => {
        if (processedData[field] && typeof processedData[field] === 'string') {
          processedData[field] = processedData[field]
            .split(',')
            .map((item: string) => item.trim()) // Remove extra spaces
            .filter((item: string) => item !== ''); // Remove empty items (e.g. if they type "Bambu, , Kayu")
        }
      });

      const dbPayload = {
        ...processedData,
        image_url: imageUrl,
        slug: finalSlug // Explicitly inject the hidden/pregenerated slug
      };

      // --- 4. DATABASE ACTION ---
      if (initialData?.id) {
        const { error } = await supabase
          .from(tableName)
          .update(dbPayload)
          .eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert([dbPayload]);
        if (error) throw error;
      }

      toast.success('Archive saved successfully!', { id: toastId });
      onSuccess();
      
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4" noValidate> 
      {/* Note: noValidate turns off the default browser tooltips so our custom toasts handle it smoothly */}
      
      {schema.map((field: any) => (
        <div key={field.name}>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {/* Add Red Asterisk and Note if required */}
            {field.required && (
              <>
                <span className="text-red-500 ml-1 font-bold">*</span>
                <span className="text-xs text-gray-400 font-normal ml-2 italic">(Required)</span>
              </>
            )}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea 
              className={`mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                field.required && !formData[field.name] ? 'border-gray-300 hover:border-gray-400' : 'border-gray-300'
              }`}
              rows={3}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              value={formData[field.name] || ''}
            />
          ) : (
            <input 
              type={field.type}
              className={`mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                field.required && !formData[field.name] ? 'border-gray-300 hover:border-gray-400' : 'border-gray-300'
              }`}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              value={formData[field.name] || ''}
            />
          )}
        </div>
      ))}
      
      {/* File input */}
      <div className="pt-2 border-t border-gray-100">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
          Upload Image 
          <span className="text-red-500 ml-1 font-bold">*</span>
          <span className="text-xs text-gray-400 font-normal ml-2 italic">(Required)</span>
        </label>
        
        <input 
          type="file" 
          accept="image/*"
          required 
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 cursor-pointer"
        />
        <p className="mt-1 text-xs text-gray-500">Max file size: 2MB. Recommended format: JPG, PNG.</p>
        
        {initialData?.image_url && !file && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={initialData.image_url} alt="Current" className="w-10 h-10 object-cover rounded shadow-sm" />
              <span className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-xs">
                {initialData.image_url.split('/').pop()}
              </span>
            </div>
            <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded">Current Image</span>
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full py-2.5 px-4 rounded-md text-white font-semibold transition-all shadow-sm mt-6 ${
          isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow'
        }`}
      >
        {isSubmitting ? 'Validating & Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}