
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  HardHat, 
  Maximize2, 
  Camera,
  Plus,
  ClipboardCheck,
  History
} from 'lucide-react';
import { ImageModal } from '../components/ImageModal';
import { Task } from '../types';

interface WorkerOrderDetailInProgressViewProps {
  task: Task;
  onBack: () => void;
  onRegisterProgress: () => void;
  onCloseVisit: () => void;
}

export const WorkerOrderDetailInProgressView: React.FC<WorkerOrderDetailInProgressViewProps> = ({ 
  task,
  onBack, 
  onRegisterProgress, 
  onCloseVisit 
}) => {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, url: '', title: '' });

  const openModal = (url: string, title: string) => {
    setModalConfig({ isOpen: true, url, title });
  };

  const formatFecha = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) + ' • ' + 
             date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-slate-900 pt-12 pb-4 px-4 shadow-lg z-20 shrink-0 sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="text-white hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-white text-lg font-bold tracking-tight">Detalle de Orden</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1.5 uppercase">
            <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
            En Proceso
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Título</p>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{task.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-slate-50">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Obra</p>
                <p className="text-sm font-bold text-slate-900">{task.project}</p>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Solicitante</p>
                <p className="text-sm font-semibold text-slate-700">Arq. Marcos V.</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha de Solicitud</p>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                  <Calendar size={14} />
                  {task.date}
                </div>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asignado</p>
                <div className="flex items-center justify-end gap-1 text-sm font-medium text-slate-600">
                  <HardHat size={14} />
                  {task.assignee || 'Sin asignar'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción del Requerimiento</h3>
            <p className="text-[15px] leading-relaxed text-slate-700">
              {task.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Foto Original de Reporte</h3>
            <div 
              className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer"
              onClick={() => openModal(task.foto_original, "Evidencia Inicial")}
            >
              <img 
                alt="Foto Original" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src={task.foto_original}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="text-white" size={32} />
              </div>
              <div className="absolute bottom-3 left-3 bg-slate-900/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                <Camera size={12} />
                Captura Inicial
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Historial de Avances</h3>
              <button 
                onClick={onRegisterProgress}
                className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-transform active:scale-95 shadow-sm hover:bg-emerald-600"
              >
                <Plus size={14} strokeWidth={3} />
                Registrar Avance
              </button>
            </div>

            <div className="space-y-0">
              {task.task_history && task.task_history.length > 0 ? (
                task.task_history.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative pl-14 pb-10 cursor-pointer group active:bg-slate-50 rounded-xl -ml-2 p-2 transition-colors"
                    onClick={() => openModal(item.history_image, item.comentario)}
                  >
                    {index < (task.task_history?.length || 0) - 1 && (
                      <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-slate-200"></div>
                    )}
                    <div className="absolute left-0 top-2 h-11 w-11 rounded-lg bg-slate-100 overflow-hidden border-2 border-white shadow-sm group-hover:border-emerald-500 transition-colors z-10">
                      <img src={item.history_image} className="w-full h-full object-cover" alt={`Avance ${item.id}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <p className="text-[11px] font-bold text-emerald-500 uppercase">Avance Registrado</p>
                        <p className="text-[10px] text-slate-400">{formatFecha(item.fecha)}</p>
                      </div>
                      <p className="text-sm text-slate-600">{item.comentario}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-6 text-slate-400">
                  <History size={32} className="opacity-20 mb-2" />
                  <p className="text-xs font-medium">No hay historial registrado</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="pb-8">
            <button 
              onClick={onCloseVisit}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:bg-slate-800"
            >
              <ClipboardCheck size={20} />
              Cerrar Visita
            </button>
          </div>
        </div>
      </main>

      <ImageModal 
        isOpen={modalConfig.isOpen} 
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} 
        imageUrl={modalConfig.url}
        title={modalConfig.title}
      />
    </div>
  );
};
