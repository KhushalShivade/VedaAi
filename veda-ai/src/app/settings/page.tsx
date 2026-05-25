import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Settings - VedaAI",
};

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-[328px] h-full w-full relative">
        <Navbar title="Settings" showBack={false} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings</h2>
            <p className="text-gray-500">Configure your VedaAI preferences and account details.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
