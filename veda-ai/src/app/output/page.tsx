"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { AssignmentOutput } from "@/components/output/AssignmentOutput";

export default function OutputPage() {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-[328px] h-full w-full relative">
        <Navbar title="Create New" showBack={true} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto pb-20">
            <AssignmentOutput />
          </div>
        </main>
      </div>
    </div>
  );
}
