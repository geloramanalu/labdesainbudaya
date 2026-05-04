// todo: add for other schema
export const FORM_SCHEMAS = {
  craftsmen: [
    { name: 'name', label: 'Craftsman Name', type: 'text', required: true },
    { name: 'slug', label: 'URL Slug (e.g., mbah-jo-trangsan)', type: 'text', required: true },
    { name: 'address', label: 'Address / Village', type: 'text' },
    { name: 'description_id', label: 'Description (Indonesian)', type: 'textarea' },
    { name: 'description_en', label: 'Description (English)', type: 'textarea' },
  ],
  archives: [
    { name: 'title', label: 'Archive Title', type: 'text', required: true },
    { name: 'slug', label: 'URL Slug (e.g., anyaman-kursi-bambu)', type: 'text', required: true },
    { name: 'type_anyaman', label: 'Type of Anyaman', type: 'text' },
    { name: 'material_rotan', label: 'Materials (Comma separated)', type: 'array' }, 
    { name: 'alat_produksi', label: 'Production Tools (Comma separated)', type: 'array' }, 
    { name: 'pengembangan_desain', label: 'Design Development', type: 'text' },
    { name: 'creators', label: 'Creators / Researchers', type: 'text' },
    { name: 'description_id', label: 'Description (Indonesian)', type: 'textarea' },
    { name: 'description_en', label: 'Description (English)', type: 'textarea' },
  ]
};