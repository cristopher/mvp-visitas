import React, { useState } from 'react';
import { RefreshCw, WifiOff, FileText, ChevronRight } from 'lucide-react';
import { MOCK_TASKS } from '../constants';
import { TaskStatus } from '../types';
import { BottomNav } from '../components/BottomNav';

interface WorkerDashboardProps {
  onTaskClick?: (taskId: string) => void;
}

type TabType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ onTaskClick }) => {
  const [activeTab, setActiveTab] = useState<TabType>('PENDING');

  // Filter tasks based on active tab
  const filteredTasks = MOCK_TASKS.filter(task => {
    if (activeTab === 'PENDING') return task.status === TaskStatus.PENDING;
    if (activeTab === 'IN_PROGRESS') return task.status === TaskStatus.IN_PROGRESS;
    if (activeTab === 'COMPLETED') return task.status === TaskStatus.COMPLETED;
    return false;
  });

  // Calculate counts for badges
  const pendingCount = MOCK_TASKS.filter(t => t.status === TaskStatus.PENDING).length;
  const inProgressCount = MOCK_TASKS.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
  const completedCount = MOCK_TASKS.filter(t => t.status === TaskStatus.COMPLETED).length;

  const getTabStyle = (tab: TabType) => {
    return activeTab === tab 
      ? "bg-slate-900 text-white shadow-sm"
      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50";
  };

  const getTitle = () => {
    if (activeTab === 'PENDING') return 'Tareas Pendientes';
    if (activeTab === 'IN_PROGRESS') return 'Tareas en Proceso';
    return 'Tareas Terminadas';
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
       <header className="bg-slate-900 px-4 py-6 sticky top-0 z-50 shadow-md">
          <div className="flex items-center justify-between">
              <h1 className="text-white text-xl font-bold leading-tight tracking-tight flex-1">{getTitle()}</h1>
              <div className="flex items-center gap-4">
                  <button className="flex items-center justify-center text-white/80 hover:text-white transition-colors">
                      <RefreshCw size={24} />
                  </button>
              </div>
          </div>
       </header>

       {/* Offline Banner */}
       <div className="bg-amber-100 border-b border-amber-200">
          <div className="flex items-center justify-center gap-2 py-2 px-4 text-amber-800">
              <WifiOff size={16} />
              <p className="text-xs font-semibold">Modo Offline - Sincronización pendiente</p>
          </div>
       </div>

       <main className="flex-1 flex flex-col p-4 gap-6 pb-24">
          {/* Quick Stats */}
          <section className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              <div 
                onClick={() => setActiveTab('PENDING')}
                className={`flex-1 min-w-[100px] flex flex-col gap-1 rounded-xl p-3 border shadow-sm relative overflow-hidden group cursor-pointer transition-all ${activeTab === 'PENDING' ? 'bg-orange-50 border-orange-200 ring-1 ring-orange-200' : 'bg-white border-slate-200'}`}
              >
                  <div className="absolute right-0 top-0 w-16 h-16 bg-orange-100/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide z-10">Pendientes</p>
                  <p className="text-orange-600 text-2xl font-bold leading-none z-10">{pendingCount}</p>
              </div>
              <div 
                onClick={() => setActiveTab('IN_PROGRESS')}
                className={`flex-1 min-w-[100px] flex flex-col gap-1 rounded-xl p-3 border shadow-sm relative overflow-hidden group cursor-pointer transition-all ${activeTab === 'IN_PROGRESS' ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'bg-white border-slate-200'}`}
              >
                  <div className="absolute right-0 top-0 w-16 h-16 bg-blue-100/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide z-10">En Proceso</p>
                  <p className="text-blue-600 text-2xl font-bold leading-none z-10">{inProgressCount}</p>
              </div>
              <div 
                onClick={() => setActiveTab('COMPLETED')}
                className={`flex-1 min-w-[100px] flex flex-col gap-1 rounded-xl p-3 border shadow-sm relative overflow-hidden group cursor-pointer transition-all ${activeTab === 'COMPLETED' ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200' : 'bg-white border-slate-200'}`}
              >
                  <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-100/50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wide z-10">Terminado</p>
                  <p className="text-emerald-600 text-2xl font-bold leading-none z-10">{completedCount}</p>
              </div>
          </section>

          {/* Tabs */}
          <section className="flex gap-2 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('PENDING')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 active:scale-95 transition-all ${getTabStyle('PENDING')}`}
              >
                  <p className="text-sm font-medium">Pendientes</p>
              </button>
              <button 
                onClick={() => setActiveTab('IN_PROGRESS')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 active:scale-95 transition-all ${getTabStyle('IN_PROGRESS')}`}
              >
                  <p className="text-sm font-medium">En Proceso</p>
              </button>
              <button 
                onClick={() => setActiveTab('COMPLETED')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 active:scale-95 transition-all ${getTabStyle('COMPLETED')}`}
              >
                  <p className="text-sm font-medium">Terminado</p>
              </button>
          </section>

          {/* List */}
          <section className="flex flex-col gap-3">
              {filteredTasks.map((task) => {
                  const isClickable = true;
                  
                  return (
                    <div 
                        key={task.id} 
                        onClick={() => isClickable && onTaskClick && onTaskClick(task.id)}
                        className={`group relative flex items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-200 transition-all touch-manipulation ${isClickable ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'}`}
                    >
                        <div className="flex flex-col gap-1 overflow-hidden">
                            <h3 className="text-base font-bold text-slate-900 leading-tight">{task.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{task.project}</p>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                                <span className="font-semibold text-slate-600">Detalle:</span> {task.description}
                            </p>
                        </div>
                        {isClickable && <ChevronRight className="text-slate-300 self-center shrink-0" size={20} />}
                    </div>
                  );
              })}
              {filteredTasks.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                    <FileText size={40} className="mx-auto mb-2 opacity-20" />
                    <p>No tienes tareas en esta sección</p>
                </div>
              )}
          </section>
       </main>

       {/* Fix: removed non-existent hideConfig prop and updated activeTab to match BottomNav expected values */}
       <BottomNav activeTab="dashboard" onTabChange={() => {}} />
    </div>
  );
};