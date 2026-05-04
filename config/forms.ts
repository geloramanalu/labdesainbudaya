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
  ],
  events: [
    { name: 'title', label: 'Event Title', type: 'text', required: true },
    // { name: 'type', label: 'Event Type (e.g., Workshop, Exhibition)', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'description_id', label: 'Description (Indonesian)', type: 'textarea', required: true },
    { name: 'description_en', label: 'Description (English)', type: 'textarea', required: true },
  ],
  publications: [
    { name: 'title', label: 'Publication Title', type: 'text', required: true },
    { 
      name: 'type', 
      label: 'Publication Type', 
      type: 'select', //dropdown type
      required: true,
      options: [     
        { label: 'Article', value: 'Article' },
        { label: 'Journal', value: 'Journal' },
        { label: 'Book', value: 'Book' },
        { label: 'Others', value: 'Others' }
      ]
    },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'url', label: 'External Link (URL)', type: 'url', required: true },
  ]
};
