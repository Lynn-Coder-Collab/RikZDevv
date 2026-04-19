export default function AdminSystemPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-display font-medium text-white mb-2 tracking-tight">System Configuration</h2>
        <p className="text-gray-400">Global environment variables and system settings.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-[400px] flex flex-col items-center justify-center text-gray-500 font-mono text-sm border-dashed">
        System Settings Interface
      </div>
    </div>
  );
}
