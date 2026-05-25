import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "My Library - VedaAI",
};

export default function LibraryPage() {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-[328px] h-full w-full relative">
        <Navbar title="My Library" showBack={false} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My Library</h2>
            <p className="text-gray-500">Access your saved materials and resources.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
