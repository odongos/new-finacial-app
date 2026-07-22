import React from 'react';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  ArrowRightLeft,
  Briefcase,
  Target,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'goals', label: 'Goals & Budget', icon: Target },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentTab, setCurrentTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar navigation"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-zinc-200 rounded-sm flex items-center justify-center">
                <span className="text-zinc-950 font-bold text-xs">VT</span>
              </div>
              <h1 className="text-xl font-serif italic text-zinc-100 tracking-tight">VisualTech</h1>
            </div>
            <button 
              className="lg:hidden p-2 -mr-2 text-zinc-500 hover:text-zinc-300 rounded-md focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4 ml-2">Management</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm transition-colors focus:outline-none group",
                  currentTab === item.id 
                    ? "bg-zinc-800 text-zinc-100 border border-zinc-700/50 font-medium" 
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                )}
                aria-current={currentTab === item.id ? "page" : undefined}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", currentTab !== item.id && "text-zinc-600 group-hover:text-zinc-400")} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <div className="bg-zinc-800/30 p-5 rounded-xl border border-zinc-800">
            <button className="w-full flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
