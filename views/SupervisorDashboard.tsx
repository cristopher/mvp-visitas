import React from 'react';
import { RefreshCw, Filter, X, ChevronDown, Calendar, Timer, Loader2 } from 'lucide-react';
import { MOCK_TASKS } from '../constants';
import { Badge } from '../components/Badge';
import { BottomNav } from '../components/BottomNav';

interface SupervisorDashboardProps {
  onAddClick?: () => void;
  onTaskClick?: (taskId: string) => void;
}

export const SupervisorDashboard: React.FC<SupervisorDashboardProps> = ({ onAddClick, onTaskClick }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-slate-900 pt-12 pb-4 px-4 shadow-md z-20 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-lg font-bold leading-tight">Visitas Técnicas</h2>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 transition-all">
             <div className="relative flex items-center justify-center">
                <RefreshCw size={18} className="text-white" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 border border-slate-900"></span>
                </span>
             </div>
             <span className="text-white text-sm font-semibold hidden sm:block">Sincronizar</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 shrink-0">
          <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar items-center">
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm text-slate-600">
              <Filter size={18} />
            </button>
            <div className="h-6 w-px bg-slate-300 mx-1 shrink-0"></div>
            <button className="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-900 text-white pl-3 pr-2 shadow-sm border border-transparent">
              <p className="text-xs font-medium whitespace-nowrap">Estado: Abierto</p>
              <X size={14} />
            </button>
            <button className="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-slate-200 pl-3 pr-2 shadow-sm">
              <p className="text-slate-700 text-xs font-medium whitespace-nowrap">Proyecto</p>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            <button className="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-slate-200 pl-3 pr-2 shadow-sm">
              <p className="text-slate-700 text-xs font-medium whitespace-nowrap">Fecha</p>
              <Calendar size={14} className="text-slate-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3">
          <div className="flex justify-between items-end mb-2 px-1">
             <p className="text-sm font-semibold text-slate-500">Mostrando {MOCK_TASKS.length} visitas</p>
             <button className="text-xs font-medium text-blue-600 hover:underline">Ordenar por Fecha</button>
          </div>

          {MOCK_TASKS.slice(0, 3).map((task) => (
            <div 
              key={task.id} 
              onClick={() => onTaskClick && onTaskClick(task.id)}
              className="group relative flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 active:scale-[0.99] transition-transform duration-200 cursor-pointer"
            >
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-slate-900 text-sm font-bold leading-tight">{task.title}</h3>
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">{task.project}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-900 tabular-nums">{task.date}</span>
                    <span className="block text-[10px] text-slate-400">{task.time}</span>
                  </div>
               </div>
               
               <div>
                  <p className="text-slate-600 text-sm leading-snug line-clamp-2">{task.description}</p>
                  {task.assignee && (
                      <p className="text-[10px] text-slate-400 mt-2 uppercase font-semibold">ASIGNADO A: {task.assignee}</p>
                  )}
               </div>

               <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                     {task.duration && (
                        <div className="flex items-center gap-1 text-slate-500">
                            <Timer size={14} />
                            <span className="text-xs font-medium tabular-nums">{task.duration}</span>
                        </div>
                     )}
                  </div>
                  <Badge status={task.status} />
               </div>
            </div>
          ))}

          <div className="py-4 flex justify-center items-center gap-2 text-slate-400">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-medium">Cargando visitas anteriores...</span>
          </div>
        </div>
      </main>

      <BottomNav 
        activeTab="dashboard" 
        onTabChange={(tab) => {
          if (tab === 'add' && onAddClick) {
            onAddClick();
          }
        }} 
        showAddButton 
      />
    </div>
  );
};