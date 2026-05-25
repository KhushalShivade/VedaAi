"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { CreateAssignmentForm } from "@/components/create/CreateAssignmentForm";

export default function CreateAssignmentPage() {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-[328px] h-full w-full relative">
        <Navbar title="Create Assignment" showBack={true} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1103px] mx-auto pb-20">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full border-[3px] border-green-100/50 outline outline-1 outline-green-200"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Create Assignment</h2>
                </div>
                <p className="text-sm text-gray-500 ml-6">Set up a new assignment for your students</p>
              </div>
            </div>
            
            <div className="flex gap-3 mb-8 w-full">
              <div className="h-1 flex-1 bg-gray-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
            </div>

            <CreateAssignmentForm />
          </div>
        </main>
      </div>
    </div>
  );
}
