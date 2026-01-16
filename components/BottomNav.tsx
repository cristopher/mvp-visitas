
import React from 'react';
import { LayoutDashboard, Settings, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  showAddButton?: boolean; // Keep prop for compatibility but update UI for Manager
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center h-16 justify-around">
        
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-slate-900' : 'text-slate-400'}`}
        >
          <LayoutDashboard size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Panel</span>
        </button>

        <button 
          onClick={() => onTabChange('config')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'config' ? 'text-slate-900' : 'text-slate-400'}`}
        >
          <Settings size={24} strokeWidth={activeTab === 'config' ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Config</span>
        </button>

        <button 
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'}`}
        >
          <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Perfil</span>
        </button>

      </div>
    </nav>
  );
};
