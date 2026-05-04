"use client";

export default function DashboardHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome to the Lab Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Archives</h3>
          <p className="text-gray-600 text-sm mb-4">Manage the living archive of rattan crafts and design developments.</p>
          <a href="/admin/dashboard/archives" className="text-blue-600 hover:underline text-sm font-medium">Go to Archives →</a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Craftsmen</h3>
          <p className="text-gray-600 text-sm mb-4">Manage the profiles and contact information of the village artisans.</p>
          <a href="/admin/dashboard/craftsmen" className="text-blue-600 hover:underline text-sm font-medium">Go to Craftsmen →</a>
        </div>
      </div>
    </div>
  );
}