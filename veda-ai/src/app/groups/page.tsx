import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "My Groups - VedaAI",
};

export default function GroupsPage() {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-[328px] h-full w-full relative">
        <Navbar title="My Groups" showBack={false} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">My Groups</h2>
            <p className="text-gray-500">Manage your student groups and classes here.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
