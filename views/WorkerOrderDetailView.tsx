import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  HardHat, 
  Maximize2, 
  History,
  PlusCircle
} from 'lucide-react';
import { Task } from '../types';
import { ImageModal } from '../components/ImageModal';

interface WorkerOrderDetailViewProps {
  task: Task;
  onBack: () => void;
  onRegisterProgress?: () => void;
  onCloseVisit?: () => void;
}

export const WorkerOrderDetailView: React.FC<WorkerOrderDetailViewProps> = ({ task, onBack, onRegisterProgress }) => {
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
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
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
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-bold border border-orange-500/30 flex items-center gap-1.5 uppercase">
            Pendiente
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-8">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="space-y-4">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Título</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">{task.title}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4">
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
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción del Requerimiento</h3>
            <p className="text-[15px] leading-relaxed text-slate-700">
              {task.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Foto Original de Reporte</h3>
            <div className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200" onClick={() => openModal(task.foto_original, "Captura Inicial")}>
              <img 
                alt="Foto Original" 
                className="w-full h-full object-cover" 
                src={task.foto_original}
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-active:opacity-100 transition-opacity">
                <Maximize2 className="text-white" size={32} />
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Historial de Avances</h3>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
              {task.task_history && task.task_history.length > 0 ? (
                <div className="w-full text-left space-y-4">
                  {task.task_history.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="relative pl-12 pb-6 cursor-pointer group"
                      onClick={() => openModal(item.history_image, item.comentario)}
                    >
                      {index < (task.task_history?.length || 0) - 1 && (
                        <div className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-slate-100"></div>
                      )}
                      <div className="absolute left-0 top-1 h-10 w-10 rounded-lg overflow-hidden border border-slate-200 shadow-sm group-hover:border-emerald-500 transition-colors">
                        <img src={item.history_image} className="w-full h-full object-cover" alt="Historial" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-bold text-emerald-500 uppercase">Hito</p>
                          <p className="text-[9px] text-slate-400">{formatFecha(item.fecha)}</p>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{item.comentario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <History className="text-slate-300" size={32} />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">Sin avances registrados</h4>
                  <p className="text-xs text-slate-500 mb-8 max-w-[200px] mx-auto leading-relaxed">
                    Aún no se han documentado intervenciones para esta orden técnica.
                  </p>
                </>
              )}
              
              <div className="w-full max-w-[260px] space-y-3 mt-4">
                <button 
                  onClick={onRegisterProgress}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <PlusCircle size={20} />
                  Registrar Avance
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ImageModal isOpen={modalConfig.isOpen} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} imageUrl={modalConfig.url} title={modalConfig.title} />
    </div>
  );
};