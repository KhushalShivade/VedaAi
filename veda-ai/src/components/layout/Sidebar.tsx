"use client";

import Link from "next/link";
import { LayoutDashboard, Users, FileText, Wrench, Library, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/home", icon: LayoutDashboard },
    { name: "My Groups", href: "/groups", icon: Users },
    { name: "Assignments", href: "/", icon: FileText },
    { name: "AI Teacher's Toolkit", href: "/toolkit", icon: Wrench },
  ];

  const isToolkit = pathname?.startsWith('/toolkit');

  return (
    <div className="hidden md:flex flex-col w-[304px] h-[756px] bg-[#FFFFFF] fixed left-[12px] top-[12px] rounded-[16px] justify-between p-[24px] shrink-0 shadow-[0px_32px_48px_0px_rgba(0,0,0,0.2),0px_16px_48px_0px_rgba(0,0,0,0.12)] z-20">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 px-2 mb-6 cursor-pointer" onClick={() => router.push('/')}>
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 drop-shadow-sm select-none"
          >
            <defs>
              {/* Premium gradient from glowing orange to deep burgundy-brown */}
              <linearGradient id="logo-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="45%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#450A0A" />
              </linearGradient>
              {/* Subtle 3D shadow for the overlapping ribbon look */}
              <filter id="logo-ribbon-shadow" x="-20%" y="-20%" width="150%" height="150%">
                <feDropShadow dx="-1.5" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.3" />
              </filter>
            </defs>
            
            {/* Rounded square container */}
            <rect width="100" height="100" rx="26" fill="url(#logo-bg-grad)" />
            
            {/* Stylized 'V' letter */}
            {/* Background wing */}
            <path 
              d="M52 74 L80 26 H62 L46 60 L52 74 Z" 
              fill="#E5E7EB" 
              opacity="0.85" 
            />
            {/* Foreground overlapping wing with 3D shadow */}
            <path 
              d="M20 26 H42 L52 74 H34 L20 26 Z" 
              fill="#FFFFFF" 
              filter="url(#logo-ribbon-shadow)" 
            />
          </svg>
          <span className="font-bold text-xl tracking-tight text-gray-900">VedaAi</span>
        </div>

      <button 
        className="w-[251px] h-[42px] mb-6 mx-auto text-white flex items-center justify-center gap-[10px] rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] font-bold text-xs tracking-tight outline-none"
        style={{
          backgroundImage: "linear-gradient(#272727, #272727), linear-gradient(to bottom, #FF7950, #C0350A)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          border: "4px solid transparent",
          boxShadow: "0px 32px 48px rgba(255, 255, 255, 0.2), 0px 16px 48px rgba(255, 255, 255, 0.12)"
        }}
        onClick={() => router.push(isToolkit ? '/toolkit' : '/create')}
      >
        <Sparkles className="w-3.5 h-3.5 text-white" /> {isToolkit ? "AI Teacher's Toolkit" : "Create Assignment"}
      </button>

      <nav className="flex flex-col gap-1 flex-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.name === "Assignments" && (pathname === '/create' || pathname === '/output'));
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                isActive ? 'bg-gray-100 text-black font-semibold' : 'text-gray-500 hover:text-black hover:bg-gray-100 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm">{link.name}</span>
              </div>
            </Link>
          );
        })}
        
        <Link href="/library" className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
          pathname === '/library' ? 'bg-gray-100 text-black font-semibold' : 'text-gray-500 hover:text-black hover:bg-gray-100 font-medium'
        }`}>
          <div className="flex items-center gap-3">
            <Library className="w-5 h-5" />
            <span className="text-sm">My Library</span>
          </div>
        </Link>
      </nav>
      </div>

      <div className="flex flex-col gap-2 pt-4 border-t">
        <Link href="/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          pathname === '/settings' ? 'bg-gray-100 text-black font-medium' : 'text-gray-500 hover:text-black hover:bg-gray-100 font-medium'
        }`}>
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mt-2 select-none">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm">
            <img src="/monkey_avatar.png" alt="School Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-800 leading-tight">Delhi Public School</span>
            <span className="text-xs text-gray-500 mt-0.5">Bokaro Steel City</span>
          </div>
        </div>
      </div>
    </div>
  );
}
