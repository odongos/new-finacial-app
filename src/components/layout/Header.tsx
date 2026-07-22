import React, { useEffect, useState } from 'react';
import { Menu, Bell, Search, Sun, Moon, Upload } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
  title: string;
}

export function Header({ setSidebarOpen, title }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const theme = localStorage.getItem('financeTheme') || 'light';
    if (theme === 'dark' || (!localStorage.getItem('financeTheme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('financeTheme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('financeTheme', 'dark');
      setIsDark(true);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.transactions) {
          localStorage.setItem('financeTransactions', JSON.stringify(data.transactions));
        }
        if (data.project) {
          localStorage.setItem('financeProject', JSON.stringify(data.project));
        }
        if (data.exchangeRates) {
          localStorage.setItem('financeExchangeRates', JSON.stringify(data.exchangeRates));
        }
        if (data.baseCurrency) {
          localStorage.setItem('financeBaseCurrency', data.baseCurrency);
        }
        // Force reload to apply imported data
        window.location.reload();
      } catch (err) {
        console.error('Failed to parse file', err);
        alert('Invalid JSON file format. Please check the file and try again.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-10">
      <div className="flex-1 max-w-md flex items-center gap-4">
        <button
          type="button"
          className="text-zinc-500 hover:text-zinc-300 lg:hidden focus:outline-none rounded-md p-1"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative w-full hidden md:block">
          <input
            type="text"
            placeholder="Press / to search system..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 px-10 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600 transition-all"
          />
          <Search className="w-4 h-4 absolute left-4 top-2.5 text-zinc-600" />
        </div>
        <h1 className="text-xl font-semibold text-zinc-100 capitalize md:hidden">{title}</h1>
      </div>

      <div className="flex items-center space-x-6">
        <label 
          className="relative p-2 text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors cursor-pointer"
          title="Import Data"
        >
          <Upload className="h-5 w-5" />
          <input type="file" accept=".json" className="hidden" onChange={handleImport} />
        </label>

        <button 
          onClick={toggleTheme}
          className="relative p-2 text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <button className="relative p-2 text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors hidden sm:block" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-emerald-500" />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-zinc-100 font-medium">Administrator</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">VisualTech</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-serif">
            VT
          </div>
        </div>
      </div>
    </header>
  );
}
