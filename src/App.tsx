import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardOverview } from './components/dashboard/DashboardOverview';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-400 font-sans overflow-hidden">
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          setSidebarOpen={setSidebarOpen} 
          title={currentTab.replace('-', ' ')} 
        />
        
        <section className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
          <div className="mx-auto w-full">
            {currentTab === 'dashboard' && <DashboardOverview />}
            {currentTab === 'transactions' && (
              <div className="flex h-full items-center justify-center text-slate-500 flex-col gap-4 py-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                <p>Transactions view is under construction</p>
              </div>
            )}
            {currentTab === 'projects' && (
              <div className="flex h-full items-center justify-center text-slate-500 flex-col gap-4 py-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <p>Projects view is under construction</p>
              </div>
            )}
            {currentTab === 'goals' && (
              <div className="flex h-full items-center justify-center text-slate-500 flex-col gap-4 py-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                <p>Goals view is under construction</p>
              </div>
            )}
            {currentTab === 'reports' && (
              <div className="flex h-full items-center justify-center text-slate-500 flex-col gap-4 py-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                <p>Reports view is under construction</p>
              </div>
            )}
            {currentTab === 'settings' && (
              <div className="flex h-full items-center justify-center text-slate-500 flex-col gap-4 py-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                <p>Settings view is under construction</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
