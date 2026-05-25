"use client";

import { Bell, ArrowLeft, LayoutGrid, Sparkles, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NavbarProps {
  title?: string;
  showBack?: boolean;
}

export function Navbar({ title = "Assignment", showBack = true }: NavbarProps) {
  const router = useRouter();
  
  return (
    <header className="sticky top-[12px] z-30 w-full max-w-[1100px] h-[56px] mx-auto flex items-center justify-between pl-6 pr-3 bg-white/75 backdrop-blur-md rounded-[16px] border border-gray-200/50 shadow-[0px_4px_16px_rgba(0,0,0,0.02)] select-none">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden w-8 h-8 rounded-full">
          <Menu className="w-4 h-4 text-gray-700" />
        </Button>
        
        {showBack && (
          <button 
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-black transition-all shadow-sm" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        
        <div className="flex items-center gap-2 text-gray-400 ml-1">
          {title === 'Create New' || title === 'Create Assignment' ? (
            <Sparkles className="w-4 h-4 text-gray-400" />
          ) : (
            <LayoutGrid className="w-4 h-4 text-gray-400" />
          )}
          <h1 className="font-semibold text-sm text-gray-600 tracking-tight">{title === 'Create New' ? 'Assignment' : title}</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-50 text-gray-600 hover:text-black transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#E65F2B] rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 bg-white hover:bg-gray-50 border border-gray-100 rounded-full transition-all shadow-sm">
          <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden shrink-0">
            <Image src="/monkey_avatar.png" alt="Profile" width={28} height={28} className="w-full h-full object-cover" unoptimized />
          </div>
          <span className="text-xs font-semibold hidden md:block text-gray-700">John Doe</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
        </div>
      </div>
    </header>
  );
}
