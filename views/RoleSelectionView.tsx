
import React from 'react';
import { UserRole } from '../types';
import { CircleUserRound, UserRoundCog, HardHat, ChevronRight, Lock } from 'lucide-react';

interface RoleSelectionViewProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectionView: React.FC<RoleSelectionViewProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="relative bg-slate-900 pt-16 pb-14 rounded-b-[2.5rem] shadow-lg overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 flex flex-col items-center justify-center px-6">
          <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-inner">
            <CircleUserRound className="text-white" size={40} />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight text-center">Visitas Técnicas</h1>
          <p className="text-white/70 text-sm font-medium mt-1">Gestión de Construcción</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 -mt-8 z-20 w-full max-w-[420px] mx-auto pb-12">
        <div className="w-full bg-white rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-slate-900 text-2xl font-bold tracking-tight">Selecciona tu Perfil</h2>
            <p className="text-slate-500 text-sm mt-2 px-4">Elige tu rol para acceder a las funciones correspondientes</p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => onSelectRole(UserRole.MANAGER)}
              className="flex w-full items-center justify-between rounded-xl bg-slate-900 hover:bg-slate-800 text-white p-4 h-16 shadow-md shadow-slate-900/10 active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-4">
                <UserRoundCog className="text-white/90" size={28} />
                <span className="font-semibold text-lg">Gerencial</span>
              </div>
              <ChevronRight className="text-white/50 group-hover:translate-x-1 transition-transform" size={24} />
            </button>

            <button 
              onClick={() => onSelectRole(UserRole.WORKER)}
              className="flex w-full items-center justify-between rounded-xl bg-slate-900 hover:bg-slate-800 text-white p-4 h-16 shadow-md shadow-slate-900/10 active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-4">
                <HardHat className="text-white/90" size={28} />
                <span className="font-semibold text-lg">Operacional</span>
              </div>
              <ChevronRight className="text-white/50 group-hover:translate-x-1 transition-transform" size={24} />
            </button>
          </div>
        </div>

        <footer className="mt-auto pt-10 flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide uppercase">
            <Lock size={14} />
            <span>Conexión Segura</span>
          </div>
        </footer>
      </main>
    </div>
  );
};
