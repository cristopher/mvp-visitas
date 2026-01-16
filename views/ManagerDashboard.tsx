
import React, { useState, useMemo } from 'react';
import { RefreshCw, Filter, ChevronDown, Calendar, CheckCircle2, Clock, Loader2, X, AlertCircle, Plus, User, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MOCK_STATS, MOCK_TASKS } from '../constants';
import { BottomNav } from '../components/BottomNav';
import { TaskStatus } from '../types';

const COLORS = ['#10B981', '#F97316', '#3B82F6', '#8B5CF6']; // Emerald, Orange, Blue, Violet
const CHART_DATA = [
  { name: 'Terminadas', value: MOCK_STATS.completed },
  { name: 'Pendientes', value: MOCK_STATS.pending },
  { name: 'En Proceso', value: MOCK_STATS.inProgress },
  { name: 'En Revisión', value: MOCK_STATS.inReview },
];

interface ManagerDashboardProps {
  onTaskClick?: (taskId: string) => void;
  onAddClick?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onTaskClick, onAddClick }) => {
  const [projectFilter, setProjectFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [openFilter, setOpenFilter] = useState<'PROJECT' | 'STATUS' | null>(null);

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesProject = projectFilter === 'ALL' || task.project === projectFilter;
    const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
    return matchesProject && matchesStatus;
  });

  const handleResetFilters = () => {
    setProjectFilter('ALL');
    setStatusFilter('ALL');
    setOpenFilter(null);
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold">
            <CheckCircle2 size={12} />
            Finalizado
          </div>
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold">
            <RefreshCw size={12} className="animate-spin" />
            En Progreso
          </div>
        );
      case TaskStatus.IN_REVIEW:
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100 text-[10px] font-bold">
            <Eye size={12} />
            En Revisión
          </div>
        );
      case TaskStatus.PENDING:
        return (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 text-[10px] font-bold">
            <div className="w-2 h-2 rounded-full bg-orange-600"></div>
            Pendiente
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 overflow-hidden" onClick={() => setOpenFilter(null)}>
      {/* Header */}
      <header className="bg-[#0b1424] pt-12 pb-6 px-6 z-20 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-1 bg-white/20 rounded-full mb-1 sm:hidden"></div>
             <div>
                <h2 className="text-white text-xl font-bold leading-tight">Panel Global de Gerencia</h2>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">VISITAS TÉCNICAS • EJECUTIVO</p>
             </div>
          </div>
          <button className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-white/10 transition-all">
            <RefreshCw size={16} className="text-white" />
            <div className="text-left">
                <span className="block text-white text-[10px] font-bold uppercase leading-none">Sincronizar</span>
                <span className="block text-white text-[10px] font-bold uppercase leading-none mt-0.5">Ahora</span>
            </div>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Filters Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-3">
          <div className="flex gap-3 overflow-x-auto no-scrollbar items-center">
            <button 
              onClick={(e) => { e.stopPropagation(); handleResetFilters(); }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500"
            >
              <Filter size={20} />
            </button>
            <button className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#0b1424] text-white px-4 text-xs font-bold">
              OBRA <ChevronDown size={14} />
            </button>
            <button className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600">
              ESTADO <ChevronDown size={14} />
            </button>
            <button className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-600">
              FECHA <Calendar size={14} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">TOTAL</p>
              <p className="text-2xl font-bold text-slate-900 leading-none">{MOCK_STATS.total}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">TERMINADO</p>
              <p className="text-2xl font-bold text-emerald-500 leading-none">{MOCK_STATS.completed}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">ABIERTAS</p>
              <p className="text-2xl font-bold text-orange-500 leading-none">{MOCK_STATS.open}</p>
            </div>
          </div>

          {/* Productivity Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Productividad Global</h3>
            <div className="flex items-center justify-between">
              <div className="h-40 w-40 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={CHART_DATA}
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {CHART_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-2xl font-black text-slate-900 leading-none">{MOCK_STATS.efficiency}%</span>
                     <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">EFICACIA</span>
                  </div>
              </div>

              <div className="flex-1 pl-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">Terminadas</span>
                    <p className="text-xs font-bold text-slate-900">{MOCK_STATS.completed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">Pendientes</span>
                    <p className="text-xs font-bold text-slate-900">{MOCK_STATS.pending}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">En Proceso</span>
                    <p className="text-xs font-bold text-slate-900">{MOCK_STATS.inProgress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">En Revisión</span>
                    <p className="text-xs font-bold text-slate-900">{MOCK_STATS.inReview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Estado Operativo</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 text-xs font-bold">Pendientes</span>
                  <span className="text-slate-900 text-xs font-bold">{MOCK_STATS.pending}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full">
                  <div className="bg-orange-500 h-full w-[60%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 text-xs font-bold">En Proceso</span>
                  <span className="text-slate-900 text-xs font-bold">{MOCK_STATS.inProgress}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full">
                  <div className="bg-blue-500 h-full w-[35%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-violet-500 text-xs font-bold">En Revisión</span>
                  <span className="text-slate-900 text-xs font-bold">{MOCK_STATS.inReview}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full">
                  <div className="bg-violet-500 h-full w-[25%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Visit Button */}
          <button 
            onClick={onAddClick}
            className="w-full py-4 bg-[#10b981] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            <Plus size={20} strokeWidth={3} />
            Agregar Visita
          </button>
          
          {/* Detailed Request List */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
             <div className="p-6 flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Detalle de Solicitudes</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Todas las obras • Todos</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                  {filteredTasks.length} Registros
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-y border-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">OBRA / TÍTULO</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">FECHA</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">ASIGNADO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="active:bg-slate-50 transition-colors cursor-pointer" onClick={() => onTaskClick?.(task.id)}>
                        <td className="px-6 py-5">
                          <p className="text-xs font-bold text-slate-900">{task.project}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase truncate max-w-[120px]">{task.title}</p>
                        </td>
                        <td className="px-4 py-5 text-center">
                           <p className="text-xs font-bold text-slate-700">{task.date}</p>
                           <div className="flex items-center justify-center gap-1 text-slate-400 mt-1">
                             <Clock size={12} />
                             <span className="text-[10px] font-bold">{task.duration || "2d 15h"}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 flex flex-col items-center justify-center gap-2">
                           <p className="text-[10px] font-bold text-slate-900 uppercase">{task.assignee || "SIN ASIGNAR"}</p>
                           {getStatusBadge(task.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="dashboard" onTabChange={(tab) => {}} />
    </div>
  );
};
