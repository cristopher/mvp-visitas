import React from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  HardHat, 
  Camera, 
  Maximize2, 
  Check, 
  Clock, 
  MoreHorizontal, 
  ClipboardCheck 
} from 'lucide-react';

interface OrderDetailViewProps {
  onBack: () => void;
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Título</p>
              <h3 className="text-base font-bold text-slate-900 leading-tight">INSPECCIÓN ESTRUCTURAL DE CIMENTACIÓN - SECTOR B</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-slate-50">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Obra</p>
                <p className="text-sm font-bold text-slate-900">Torre Alpha Residencial</p>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Solicitante</p>
                <p className="text-sm font-semibold text-slate-700">Arq. Marcos V.</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha de Solicitud</p>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                  <Calendar size={14} />
                  24 Oct, 2023
                </div>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asignado</p>
                <div className="flex items-center justify-end gap-1 text-sm font-medium text-slate-600">
                  <HardHat size={14} />
                  Ing. Salas
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Descripción del Requerimiento</h3>
            <p className="text-[15px] leading-relaxed text-slate-700">
              Se requiere inspección estructural urgente en la zona de cimentación del sector B. Se han detectado posibles fisuras tras el último vaciado de concreto y es necesario validar la integridad antes de continuar con el nivel superior.
            </p>
          </div>

          {/* Photo Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Foto Original de Reporte</h3>
            <div className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                alt="Foto Original" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-active:opacity-100 transition-opacity">
                <Maximize2 className="text-white" size={32} />
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-900/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                <Camera size={12} />
                Captura Inicial
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">Historial de Avances</h3>
            <div className="space-y-0">
              
              {/* Timeline Item 1 */}
              <div className="relative pl-8 pb-8">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200"></div>
                
                <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center z-10">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-emerald-500 uppercase">Visita Iniciada</p>
                    <p className="text-[10px] text-slate-400">25 Oct • 09:15 AM</p>
                  </div>
                  <p className="text-sm text-slate-600">Personal en sitio. Se inicia la limpieza de la superficie para una mejor visualización de las fisuras reportadas.</p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 pb-8">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200"></div>

                <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center z-10">
                  <Clock size={14} className="text-white" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] font-bold text-blue-500 uppercase">En Evaluación</p>
                    <p className="text-[10px] text-slate-400">25 Oct • 14:30 PM</p>
                  </div>
                  <p className="text-sm text-slate-600">Se están realizando pruebas de esclerometría en 4 puntos estratégicos del eje 4-C.</p>
                </div>
              </div>

              {/* Timeline Item 3 (Last) */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center z-10">
                  <MoreHorizontal size={14} className="text-slate-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Próximo Paso</p>
                  <p className="text-sm text-slate-400 italic">Generación de informe técnico y cierre de visita.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Empty State / Evidence Placeholder */}
          <div className="bg-slate-50/50 rounded-2xl p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-2">
            <ClipboardCheck className="text-slate-300" size={40} />
            <p className="text-xs font-medium text-slate-400 px-4">La evidencia final de cierre aparecerá aquí una vez que la orden sea marcada como "Terminada".</p>
          </div>

        </div>
      </main>
    </div>
  );
};
