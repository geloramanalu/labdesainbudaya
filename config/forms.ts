// todo: add for other schema
export const FORM_SCHEMAS = {
  craftsmen: [
    { name: 'name', label: 'Craftsman Name', type: 'text', required: true },
    // { name: 'slug', label: 'URL Slug (e.g., mbah-jo-trangsan)', type: 'text', required: false },
    { name: 'address', label: 'Address / Village', type: 'text', required: false },
    { name: 'description_id', label: 'Description (Indonesian)', type: 'textarea', required: true },
    { name: 'description_en', label: 'Description (English)', type: 'textarea', required: true },
  ],
  archives: [
    { name: 'title', label: 'Archive Title', type: 'text', required: true },
    // { name: 'slug', label: 'URL Slug (e.g., anyaman-kursi-bambu)', type: 'text', required: false },
    { name: 'type_anyaman', label: 'Type of Anyaman', type: 'text', required: false },
    { name: 'material_rotan', label: 'Materials (Comma separated)', type: 'array', required: false }, 
    { name: 'alat_produksi', label: 'Production Tools (Comma separated)', type: 'array', required: false }, 
    { name: 'pengembangan_desain', label: 'Design Development', type: 'text', required: false },
    { name: 'creators', label: 'Creators / Researchers', type: 'text', required: true },
    { name: 'description_id', label: 'Description (Indonesian)', type: 'textarea', required: true },
    { name: 'description_en', label: 'Description (English)', type: 'textarea', required: true },
  ]
};