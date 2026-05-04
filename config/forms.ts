// todo: add for other schema
export const FORM_SCHEMAS = {
  archives: [
    { name: 'name', label: 'Item Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'material', label: 'Material', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
  events: [
    { name: 'title', label: 'Event Title', type: 'text', required: true },
    { name: 'date', label: 'Event Date', type: 'date' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'description', label: 'Details', type: 'textarea' },
  ],
  
};