"use client";

import { useAssignmentStore } from "@/store/useAssignmentStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Filter, MoreVertical, SearchX, FileQuestion, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AssignmentsPage() {
  const { assignments, deleteAssignment, setEmpty, fillMock } = useAssignmentStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col md:ml-[328px] h-full w-full relative">
        <Navbar title="Assignments" showBack={false} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
          <div className="max-w-[1100px] mx-auto h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full border-[3px] border-green-100/50 outline outline-1 outline-green-200"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
                </div>
                <p className="text-sm text-gray-500 ml-6">Manage and create assignments for your classes.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={assignments.length === 0 ? fillMock : setEmpty} className="text-xs text-gray-400 hover:text-black border-dashed rounded-full px-4">
                  Toggle Empty State
                </Button>
              </div>
            </div>

            {assignments.length > 0 && (
              <div className="flex items-center justify-between gap-4 mb-6 w-full select-none">
                {/* Filter By Button */}
                <button className="flex items-center gap-2 px-4 h-11 bg-white hover:bg-gray-50 border border-gray-100 rounded-full text-xs font-semibold text-gray-500 transition-all shadow-sm">
                  <Filter className="w-3.5 h-3.5 text-gray-400" /> Filter By
                </button>
                
                {/* Search Assignment Input Pill (380x44) */}
                <div className="w-full max-w-[380px] h-11 flex items-center gap-2 px-4 bg-white border border-gray-100 rounded-full shadow-sm">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search Assignment" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs text-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            {assignments.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="w-48 h-48 mb-6 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-50 rounded-full opacity-50"></div>
                  <FileQuestion className="w-24 h-24 text-gray-300 relative z-10" />
                  <div className="absolute bottom-4 right-4 bg-red-100 rounded-full p-2 z-20">
                    <SearchX className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No assignments yet</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  Create your first assignment to start collecting and grading student submissions. 
                  You can set up rubrics, define marking criteria, and let AI assist with grading.
                </p>
                <Button className="bg-[#1C1C1E] hover:bg-black text-white rounded-full px-6 py-6" onClick={() => router.push('/create')}>
                  + Create Your First Assignment
                </Button>
              </div>
            ) : filteredAssignments.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-20">
                <div className="w-24 h-24 mb-4 relative flex items-center justify-center">
                  <SearchX className="w-12 h-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No assignments found</h3>
                <p className="text-gray-500 text-sm">We couldn&apos;t find anything matching &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-24">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border-gray-100 rounded-[24px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.01)] bg-white relative">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-lg text-gray-900">{assignment.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 text-gray-400 hover:text-black flex items-center justify-center rounded-full hover:bg-gray-50 outline-none transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuItem className="cursor-pointer py-2">View Assignment</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 cursor-pointer py-2 focus:text-red-500" onClick={() => deleteAssignment(assignment.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium">
                      <span>Assignment on: {assignment.assignedOn}</span>
                      <span>Due: {assignment.due}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Elegant Bottom Gradient Fade */}
        {assignments.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent pointer-events-none z-10"></div>
        )}
        
        {/* Floating Action Button (FAB) at Bottom Center */}
        {assignments.length > 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <Button 
              className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-6 shadow-[0px_16px_32px_rgba(0,0,0,0.2)] flex items-center gap-2 font-semibold transition-transform hover:scale-105 active:scale-95 h-12"
              onClick={() => router.push('/create')}
            >
              <Plus className="w-4 h-4" /> Create Assignment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
