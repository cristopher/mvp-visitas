
import React, { useState, useMemo, useEffect } from 'react';
import { 
  RefreshCw, 
  ChevronDown, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Building2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MOCK_TASKS } from '../constants';
import { BottomNav } from '../components/BottomNav';
import { TaskStatus } from '../types';

const COLORS = ['#10B981', '#F97316', '#3B82F6', '#8B5CF6']; // Emerald, Orange, Blue, Violet
const ITEMS_PER_PAGE = 10;

interface ManagerDashboardProps {
  onTaskClick?: (taskId: string) => void;
  onAddClick?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onTaskClick, onAddClick }) => {
  const [projectFilter, setProjectFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [dateFilter, setDateFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Obtener obras únicas de MOCK_TASKS
  const availableProjects = useMemo(() => {
    const projects = MOCK_TASKS.map(task => task.project);
    return Array.from(new Set(projects)).sort();
  }, []);

  // Obtener fechas únicas de MOCK_TASKS
  const availableDates = useMemo(() => {
    const dates = MOCK_TASKS.map(task => task.date);
    return Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));
  }, []);

  // Derivar estadísticas globales de MOCK_TASKS
  const stats = useMemo(() => {
    const total = MOCK_TASKS.length;
    const completed = MOCK_TASKS.filter(t => t.status === TaskStatus.COMPLETED).length;
    const pending = MOCK_TASKS.filter(t => t.status === TaskStatus.PENDING).length;
    const inProgress = MOCK_TASKS.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
    const inReview = MOCK_TASKS.filter(t => t.status === TaskStatus.IN_REVIEW).length;
    
    // Abiertas = Pendientes + En Proceso + En Revisión
    const open = pending + inProgress + inReview;
    const efficiency = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      inProgress,
      inReview,
      open,
      efficiency
    };
  }, []);

  const chartData = useMemo(() => [
    { name: 'Terminadas', value: stats.completed },
    { name: 'Pendientes', value: stats.pending },
    { name: 'En Proceso', value: stats.inProgress },
    { name: 'En Revisión', value: stats.inReview },
  ], [stats]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [projectFilter, statusFilter, dateFilter]);

  const filteredTasks = useMemo(() => {
    return MOCK_TASKS.filter(task => {
      const matchesProject = projectFilter === 'ALL' || task.project === projectFilter;
      const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
      const matchesDate = dateFilter === 'ALL' || task.date === dateFilter;
      return matchesProject && matchesStatus && matchesDate;
    });
  }, [projectFilter, statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTasks, currentPage]);

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
    <div className="flex flex-col min-h-screen bg-slate-100 overflow-hidden text-slate-900">
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
          <button className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-white/10 transition-all active:scale-95">
            <RefreshCw size={16} className="text-white" />
            <div className="text-left">
                <span className="block text-white text-[10px] font-bold uppercase leading-none">Sincronizar</span>
                <span className="block text-white text-[10px] font-bold uppercase leading-none mt-0.5">Ahora</span>
            </div>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Filters Bar Dynamized */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-3 shadow-sm">
          <div className="flex gap-3 overflow-x-auto no-scrollbar items-center">
            {/* Project Select Filter */}
            <div className="relative shrink-0">
              <select 
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="appearance-none h-10 pl-4 pr-10 rounded-xl bg-[#0b1424] text-white text-[11px] font-bold uppercase tracking-wider border-none outline-none focus:ring-2 focus:ring-slate-400 min-w-[120px]"
              >
                <option value="ALL">TODAS LAS OBRAS</option>
                {availableProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/50">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Status Select Filter */}
            <div className="relative shrink-0">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`appearance-none h-10 pl-4 pr-10 rounded-xl border text-[11px] font-bold uppercase tracking-wider outline-none focus:ring-2 transition-all ${
                  statusFilter === 'ALL' 
                    ? 'bg-white border-slate-200 text-slate-600 focus:ring-slate-100' 
                    : 'bg-slate-100 border-slate-300 text-slate-900 focus:ring-slate-200'
                }`}
              >
                <option value="ALL">ESTADO: TODOS</option>
                <option value={TaskStatus.PENDING}>PENDIENTE</option>
                <option value={TaskStatus.IN_PROGRESS}>EN PROGRESO</option>
                <option value={TaskStatus.IN_REVIEW}>EN REVISIÓN</option>
                <option value={TaskStatus.COMPLETED}>FINALIZADO</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Date Select Filter */}
            <div className="relative shrink-0">
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className={`appearance-none h-10 pl-8 pr-10 rounded-xl border text-[11px] font-bold uppercase tracking-wider outline-none focus:ring-2 transition-all ${
                  dateFilter === 'ALL' 
                    ? 'bg-white border-slate-200 text-slate-600 focus:ring-slate-100' 
                    : 'bg-slate-100 border-slate-300 text-slate-900 focus:ring-slate-200'
                }`}
              >
                <option value="ALL">FECHA: TODAS</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-slate-400">
                <Calendar size={14} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">TOTAL</p>
              <p className="text-2xl font-bold text-slate-900 leading-none">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">TERMINADO</p>
              <p className="text-2xl font-bold text-emerald-500 leading-none">{stats.completed}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">ABIERTAS</p>
              <p className="text-2xl font-bold text-orange-500 leading-none">{stats.open}</p>
            </div>
          </div>

          {/* Productivity Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Productividad Global</h3>
            <div className="flex items-center justify-between">
              <div className="h-40 w-40 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-2xl font-black text-slate-900 leading-none">{stats.efficiency}%</span>
                     <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">EFICACIA</span>
                  </div>
              </div>

              <div className="flex-1 pl-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">Terminadas</span>
                    <p className="text-xs font-bold text-slate-900">{stats.completed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">Pendientes</span>
                    <p className="text-xs font-bold text-slate-900">{stats.pending}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">En Proceso</span>
                    <p className="text-xs font-bold text-slate-900">{stats.inProgress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium">En Revisión</span>
                    <p className="text-xs font-bold text-slate-900">{stats.inReview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Status Bars */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Estado Operativo</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">Pendientes</span>
                  <span className="text-slate-900 text-xs font-bold">{stats.pending}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full">
                  <div 
                    className="bg-orange-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 text-xs font-bold uppercase tracking-wider">En Proceso</span>
                  <span className="text-slate-900 text-xs font-bold">{stats.inProgress}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-violet-500 text-xs font-bold uppercase tracking-wider">En Revisión</span>
                  <span className="text-slate-900 text-xs font-bold">{stats.inReview}</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full">
                  <div 
                    className="bg-violet-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${stats.total > 0 ? (stats.inReview / stats.total) * 100 : 0}%` }}
                  ></div>
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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
             <div className="p-6 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-slate-900">Detalle de Solicitudes</h3>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-2">
                    <Building2 size={12} className="text-slate-400" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {projectFilter === 'ALL' ? 'Todas las obras' : projectFilter}
                    </p>
                    <span className="text-slate-200">•</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {statusFilter === 'ALL' ? 'Todos los estados' : statusFilter.replace('_', ' ')}
                    </p>
                    <span className="text-slate-200">•</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {dateFilter === 'ALL' ? 'Cualquier fecha' : dateFilter}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                  {filteredTasks.length} Registros
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-y border-slate-50 bg-slate-50/30">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">OBRA / TÍTULO</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">FECHA</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">ASIGNADO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {paginatedTasks.map((task) => (
                      <tr key={task.id} className="active:bg-slate-50 transition-colors cursor-pointer group" onClick={() => onTaskClick?.(task.id)}>
                        <td className="px-6 py-5">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#0b1424] transition-colors">{task.project}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase truncate max-w-[120px]">{task.title}</p>
                        </td>
                        <td className="px-4 py-5 text-center">
                           <p className="text-xs font-bold text-slate-700">{task.date}</p>
                           <div className="flex items-center justify-center gap-1 text-slate-400 mt-1">
                             <Clock size={12} />
                             <span className="text-[10px] font-bold">{task.duration || "---"}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 flex flex-col items-center justify-center gap-2">
                           <p className="text-[10px] font-bold text-slate-900 uppercase truncate max-w-[80px]">{task.assignee || "SIN ASIGNAR"}</p>
                           {getStatusBadge(task.status)}
                        </td>
                      </tr>
                    ))}
                    {paginatedTasks.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center">
                          <AlertCircle size={32} className="text-slate-200 mx-auto mb-2" />
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No se encontraron registros</p>
                          <p className="text-[10px] text-slate-400 mt-1">Intente ajustar los filtros aplicados.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
             </div>

             {/* Pagination Controls */}
             {filteredTasks.length > ITEMS_PER_PAGE && (
               <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                   Página {currentPage} de {totalPages}
                 </div>
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                     disabled={currentPage === 1}
                     className={`p-2 rounded-lg border transition-all ${
                       currentPage === 1 
                         ? 'bg-transparent border-slate-100 text-slate-200 cursor-not-allowed' 
                         : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-90'
                     }`}
                   >
                     <ChevronLeft size={18} />
                   </button>
                   <button 
                     onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                     disabled={currentPage === totalPages}
                     className={`p-2 rounded-lg border transition-all ${
                       currentPage === totalPages 
                         ? 'bg-transparent border-slate-100 text-slate-200 cursor-not-allowed' 
                         : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-90'
                     }`}
                   >
                     <ChevronRight size={18} />
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      </main>

      <BottomNav activeTab="dashboard" onTabChange={(tab) => {}} />
    </div>
  );
};
