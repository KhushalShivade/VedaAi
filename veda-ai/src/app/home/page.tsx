import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Home - VedaAI",
};

export default function HomePage() {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-[328px] h-full w-full relative">
        <Navbar title="Home" showBack={false} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Home</h2>
            <p className="text-gray-500">Welcome to your VedaAI Dashboard.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
