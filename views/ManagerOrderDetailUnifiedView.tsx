
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Calendar, 
  User,
  Maximize2, 
  CheckCircle2,
  Camera,
  History,
  Clock,
  AlertCircle,
  ClipboardCheck,
  SquarePen,
  ImageOff
} from 'lucide-react';
import { ImageModal } from '../components/ImageModal';
import { Task, TaskStatus } from '../types';

interface ManagerOrderDetailUnifiedViewProps {
  task: Task;
  onBack: () => void;
  onRequestCorrection?: () => void;
}

const HISTORY_ITEMS_PER_PAGE = 10;

export const ManagerOrderDetailUnifiedView: React.FC<ManagerOrderDetailUnifiedViewProps> = ({ task, onBack, onRequestCorrection }) => {
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);

  // Reset pagination when task changes
  useEffect(() => {
    setCurrentHistoryPage(1);
  }, [task.id]);

  const openModal = (url: string | undefined, title: string) => {
    if (!url) return;
    setModalConfig({ isOpen: true, url, title });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const formatFecha = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const dayMonth = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
      const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
      return `${dayMonth} • ${time}`;
    } catch {
      return isoString;
    }
  };

  const history = useMemo(() => task.task_history || [], [task.task_history]);
  const totalHistoryPages = Math.ceil(history.length / HISTORY_ITEMS_PER_PAGE);

  const paginatedHistory = useMemo(() => {
    const startIndex = (currentHistoryPage - 1) * HISTORY_ITEMS_PER_PAGE;
    return history.slice(startIndex, startIndex + HISTORY_ITEMS_PER_PAGE);
  }, [history, currentHistoryPage]);

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return { 
          label: 'Terminada', 
          headerColor: 'bg-[#064e3b]/40', 
          borderColor: 'border-emerald-500/30', 
          dotColor: 'bg-emerald-500', 
          textColor: 'text-emerald-400',
          bgHeader: 'bg-[#0b1424]' 
        };
      case TaskStatus.IN_PROGRESS:
        return { 
          label: 'En Proceso', 
          headerColor: 'bg-blue-500/20', 
          borderColor: 'border-blue-500/30', 
          dotColor: 'bg-blue-500', 
          textColor: 'text-blue-400',
          bgHeader: 'bg-slate-900' 
        };
      case TaskStatus.IN_REVIEW:
        return { 
          label: 'En Revisión', 
          headerColor: 'bg-violet-500/20', 
          borderColor: 'border-violet-500/30', 
          dotColor: 'bg-violet-500', 
          textColor: 'text-violet-400',
          bgHeader: 'bg-slate-900' 
        };
      case TaskStatus.PENDING:
      default:
        return { 
          label: 'Pendiente', 
          headerColor: 'bg-slate-700/50', 
          borderColor: 'border-slate-500/30', 
          dotColor: 'bg-slate-400', 
          textColor: 'text-slate-300',
          bgHeader: 'bg-slate-900' 
        };
    }
  };

  const statusCfg = getStatusConfig(task.status);
  const isFinished = task.status === TaskStatus.COMPLETED;
  const isReviewing = task.status === TaskStatus.IN_REVIEW;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Dinámico */}
      <header className={`${statusCfg.bgHeader} pt-12 pb-4 px-6 shadow-lg z-20 shrink-0 sticky top-0 flex items-center justify-between transition-colors duration-500`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors">
            <ChevronLeft size={26} />
          </button>
          <h2 className="text-white text-lg font-bold tracking-tight">Detalle de Orden</h2>
        </div>
        <div className={`flex items-center gap-2 ${statusCfg.headerColor} border ${statusCfg.borderColor} px-3 py-1 rounded-full transition-all`}>
           <span className={`h-2 w-2 ${statusCfg.dotColor} rounded-full ${task.status !== TaskStatus.PENDING ? 'animate-pulse' : ''}`}></span>
           <span className={`${statusCfg.textColor} text-[10px] font-black uppercase tracking-widest`}>{statusCfg.label}</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 pb-12">
          
          {/* Card 1: Datos de la visita */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Título</p>
              <h3 className="text-lg font-black text-slate-900 leading-tight uppercase">{task.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-y-6">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Obra</p>
                <p className="text-base font-bold text-slate-900">{task.project}</p>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Solicitante</p>
                <p className="text-base font-bold text-slate-900">{task.solicitante}</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Solicitud</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                  <Calendar size={16} className="text-slate-400" />
                  {task.date}
                </div>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asignado</p>
                <div className="flex items-center justify-end gap-1.5 text-sm font-semibold text-slate-600">
                  <User size={16} className="text-slate-400" />
                  {task.assignee || 'Sin Asignar'}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Descripción del Requerimiento */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Descripción del Requerimiento</h3>
            <p className="text-[15px] leading-relaxed text-slate-700 font-medium">
              {task.description}
            </p>
          </div>

          {/* Card 3: Foto Original de Reporte */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Foto Original de Reporte</h3>
            <div 
              className="relative group aspect-video rounded-2xl overflow-hidden cursor-pointer bg-slate-50 border border-slate-100"
              onClick={() => openModal(task.foto_original, "Captura Inicial de Reporte")}
            >
              <img src={task.foto_original} className="w-full h-full object-cover" alt="Reporte Inicial" />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Maximize2 className="text-white" size={32} />
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Camera size={14} className="text-white/80" />
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">Captura Inicial</span>
              </div>
            </div>
          </div>

          {/* Card 4: Historial de Avances con Paginación */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Historial de Avances</h3>
              <div className="bg-slate-50 border border-slate-100 px-2.5 py-1 rounded text-[9px] font-black text-slate-400 uppercase tracking-tight">
                {history.length} Hitos
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {paginatedHistory.length > 0 ? (
                paginatedHistory.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-5 flex gap-4 items-start active:bg-slate-50 transition-colors group ${item.history_image ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={() => item.history_image && openModal(item.history_image, item.comentario)}
                  >
                    <div className="shrink-0 w-14 h-14 rounded-xl border-2 border-slate-100 group-hover:border-[#3b82f6] overflow-hidden shadow-sm relative transition-colors bg-slate-50 flex items-center justify-center">
                       {item.history_image ? (
                         <img src={item.history_image} className="w-full h-full object-cover" alt="Avance" />
                       ) : (
                         <ImageOff size={20} className="text-slate-300" />
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-black text-[#3b82f6] uppercase tracking-wider">Avance Tecnico</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{formatFecha(item.fecha)}</span>
                      </div>
                      <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                        {item.comentario}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center px-6">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      {task.status === TaskStatus.PENDING ? (
                        <Clock size={28} className="text-slate-300" />
                      ) : (
                        <AlertCircle size={28} className="text-slate-300" />
                      )}
                   </div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                     {task.status === TaskStatus.PENDING ? 'Sin historial registrado' : 'Sin avances documentados'}
                   </p>
                   <p className="text-[10px] text-slate-400 mt-1">Aún no se han reportado intervenciones técnicas.</p>
                </div>
              )}
            </div>

            {/* Pagination Controls for History */}
            {history.length > HISTORY_ITEMS_PER_PAGE && (
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  Página {currentHistoryPage} de {totalHistoryPages}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentHistoryPage(prev => Math.max(1, prev - 1))}
                    disabled={currentHistoryPage === 1}
                    className={`p-2 rounded-lg border transition-all ${
                      currentHistoryPage === 1 
                        ? 'bg-transparent border-slate-100 text-slate-200 cursor-not-allowed' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-90'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setCurrentHistoryPage(prev => Math.min(totalHistoryPages, prev + 1))}
                    disabled={currentHistoryPage === totalHistoryPages}
                    className={`p-2 rounded-lg border transition-all ${
                      currentHistoryPage === totalHistoryPages 
                        ? 'bg-transparent border-slate-100 text-slate-200 cursor-not-allowed' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-90'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Secciones de Cierre - Solo si está FINALIZADO */}
          {isFinished && (
            <>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Descripción del Cierre</h3>
                <p className="text-[15px] leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
                  {task.descripcion_final || 'No se proporcionó una descripción de cierre.'}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-in slide-in-from-bottom-6 duration-700">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Foto Original del Cierre</h3>
                <div 
                  className="relative group aspect-video rounded-2xl overflow-hidden cursor-pointer bg-slate-50 border border-slate-100"
                  onClick={() => openModal(task.evidencia_final, "Evidencia de Cierre Finalizada")}
                >
                  <img src={task.evidencia_final} className="w-full h-full object-cover" alt="Cierre Final" />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Maximize2 className="text-white" size={32} />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#10b981]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <CheckCircle2 size={14} className="text-white" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">Evidencia Final</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Acciones de Revisión - Solo si está EN REVISIÓN */}
          {isReviewing && (
            <div className="flex flex-col gap-3 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <button 
                onClick={onBack}
                className="w-full h-14 bg-[#0b1424] text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <ClipboardCheck size={22} />
                <span className="text-base">Cerrar Visita</span>
              </button>
              
              <button 
                onClick={onRequestCorrection}
                className="w-full h-14 bg-[#6d28d9] text-white font-bold rounded-2xl shadow-xl shadow-violet-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <SquarePen size={20} />
                <span className="text-base">Solicitar Corrección</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <ImageModal isOpen={modalConfig.isOpen} onClose={closeModal} imageUrl={modalConfig.url} title={modalConfig.title} />
    </div>
  );
};
