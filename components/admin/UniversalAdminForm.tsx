import { FORM_SCHEMAS } from "@/config/forms";
import { useState
    
 } from "react";
interface UniversalFormProps {
  type: keyof typeof FORM_SCHEMAS;
  initialData?: any;
  onSuccess: () => void;
}

export function UniversalAdminForm({ type, initialData, onSuccess }: UniversalFormProps) {
  const schema = FORM_SCHEMAS[type];
  const [formData, setFormData] = useState<Record<string, any>>(initialData || {});
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Logic to upload image to 'labdesainbudaya-media' bucket
    // 2. Logic to insert/update into Supabase table based on 'type'
    // 3. onSuccess() and close modal
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {schema.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-bold mb-1">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea 
              className="w-full border p-2 rounded"
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              value={formData[field.name] || ''}
            />
          ) : (
            <input 
              type={field.type}
              className="w-full border p-2 rounded"
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              value={formData[field.name] || ''}
            />
          )}
        </div>
      ))}
      {/* Universal File Input */}
      <div>
        <label className="block text-sm font-bold mb-1">Image Upload</label>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <button className="bg-blue-600 text-white p-2 rounded w-full">Save Changes</button>
    </form>
  );
}