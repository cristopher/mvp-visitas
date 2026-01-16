
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  HardHat, 
  Maximize2, 
  History
} from 'lucide-react';
import { ImageModal } from '../components/ImageModal';
import { Task } from '../types';

interface WorkerOrderDetailFinishedViewProps {
  task: Task;
  onBack: () => void;
}

export const WorkerOrderDetailFinishedView: React.FC<WorkerOrderDetailFinishedViewProps> = ({ task, onBack }) => {
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
            <button onClick={onBack} className="text-white hover:bg-white/10 p-1 rounded-full"><ChevronLeft size={24} /></button>
            <h2 className="text-white text-lg font-bold tracking-tight">Detalle de Orden</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 uppercase">Terminada</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-8">
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 leading-tight mb-4 uppercase text-[10px] tracking-widest text-slate-400">Información General</h3>
            <p className="text-base font-bold text-slate-900 mb-4">{task.title}</p>
            <div className="grid grid-cols-2 gap-4">
               <div><p className="text-[10px] font-bold text-slate-400 uppercase">Obra</p><p className="text-sm font-bold text-slate-900">{task.project}</p></div>
               <div className="text-right"><p className="text-[10px] font-bold text-slate-400 uppercase">Fecha Cierre</p><p className="text-sm font-bold text-slate-900">{task.date}</p></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-8">Historial de Avances</h3>
            <div className="space-y-0">
              {task.task_history && task.task_history.length > 0 ? (
                task.task_history.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="relative pl-14 pb-10 cursor-pointer group p-2 rounded-xl -ml-2 transition-colors active:bg-slate-50" 
                    onClick={() => openModal(item.history_image, item.comentario)}
                  >
                    {index < (task.task_history?.length || 0) - 1 && (
                      <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-slate-200"></div>
                    )}
                    <div className="absolute left-0 top-2 h-11 w-11 rounded-lg bg-slate-100 overflow-hidden border-2 border-white shadow-sm z-10 group-hover:border-emerald-500">
                      <img src={item.history_image} className="w-full h-full object-cover" alt={`Hito ${item.id}`} />
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-[11px] font-bold text-emerald-500 uppercase">Hito Completado</p>
                      <p className="text-[10px] text-slate-400">{formatFecha(item.fecha)}</p>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{item.comentario}</p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-6 text-slate-400">
                  <History size={32} className="opacity-20 mb-2" />
                  <p className="text-xs font-medium">Sin registros históricos</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-3">FOTO ORIGINAL DE REPORTE</h3>
            <div className="relative group aspect-video rounded-xl overflow-hidden cursor-pointer mb-4" onClick={() => openModal(task.foto_original, "Captura Inicial")}>
              <img src={task.foto_original} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="text-white" size={32} /></div>
            </div>

            <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-3 text-emerald-600">FOTO ORIGINAL DEL CIERRE</h3>
            <div className="relative group aspect-video rounded-xl overflow-hidden cursor-pointer" onClick={() => openModal(task.evidencia_final, "Evidencia de Cierre Final")}>
              <img src={task.evidencia_final} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 className="text-white" size={32} /></div>
            </div>
          </div>
        </div>
      </main>

      <ImageModal isOpen={modalConfig.isOpen} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} imageUrl={modalConfig.url} title={modalConfig.title} />
    </div>
  );
};
