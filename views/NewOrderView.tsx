import React from 'react';
import { X, Camera, ImagePlus, Building2, ChevronDown, FileText, CheckCircle, User } from 'lucide-react';

interface NewOrderViewProps {
  onBack: () => void;
}

export const NewOrderView: React.FC<NewOrderViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans h-screen overflow-hidden">
      {/* Header */}
      <header className="flex-none bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200 z-30">
        <button 
          onClick={onBack}
          className="text-slate-900 flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 transition-colors active:scale-95"
        >
          <X size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center mx-2">
          Nueva Orden de Visita
        </h2>
        <div className="flex w-10 items-center justify-end shrink-0"></div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32 w-full max-w-lg mx-auto">
        
        {/* Title Section */}
        <section className="px-4 pt-6">
          <div className="mb-5">
            <label className="block text-slate-900 text-sm font-medium leading-normal pb-2 ml-1">Título</label>
            <input 
              className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 h-14 px-4 text-base shadow-sm placeholder:text-slate-400 outline-none transition-all" 
              placeholder="Ej. Inspección de cimientos" 
              type="text"
            />
          </div>
        </section>

        {/* Visual Evidence Section */}
        <section className="p-4">
          <h3 className="text-slate-900 text-lg font-bold leading-tight px-1 pb-3 flex items-center gap-2">
            <Camera className="text-slate-900/80" size={20} />
            Evidencia Visual
          </h3>
          <div className="flex flex-col">
            <div className="group relative flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-white px-6 py-10 transition-all hover:border-slate-900 cursor-pointer active:bg-slate-50">
              <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ImagePlus className="text-slate-900" size={28} />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-slate-900 text-base font-bold leading-tight">Foto (Obligatoria)</p>
                <p className="text-slate-400 text-xs font-normal">JPG, PNG • Máx 20MB</p>
              </div>
              <button className="mt-2 flex items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-slate-900/10 text-slate-900 text-sm font-bold leading-normal transition-colors group-hover:bg-slate-900 group-hover:text-white">
                Abrir Cámara
              </button>
            </div>
          </div>
        </section>

        {/* Work Info Section */}
        <section className="px-4">
          <h3 className="text-slate-900 text-lg font-bold leading-tight px-1 pb-3 pt-2 flex items-center gap-2">
            <Building2 className="text-slate-900/80" size={20} />
            Información de Obra
          </h3>
          
          <div className="mb-5">
            <label className="block text-slate-900 text-sm font-medium leading-normal pb-2 ml-1">Obra</label>
            <div className="relative">
              <select className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 h-14 pl-4 pr-10 text-base shadow-sm appearance-none cursor-pointer outline-none">
                <option disabled defaultValue="">Seleccione la obra...</option>
                <option value="1">Residencial Vista Verde - Bloque A</option>
                <option value="2">Shopping Metropolitano - Expansión</option>
                <option value="3">Centro Logístico CD-04</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-slate-900 text-sm font-medium leading-normal pb-2 ml-1">Usuario Asignado</label>
            <div className="relative">
              <select className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 h-14 pl-4 pr-10 text-base shadow-sm appearance-none cursor-pointer outline-none">
                <option disabled defaultValue="">Seleccione el usuario...</option>
                <option value="1">Juan Pérez - Capataz</option>
                <option value="2">María Rodríguez - Supervisora</option>
                <option value="3">Carlos López - Operario</option>
                <option value="4">Ana García - Ingeniera</option>
                <option value="5">Luis Torres - Arquitecto</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="px-4 pb-6">
          <h3 className="text-slate-900 text-lg font-bold leading-tight px-1 pb-3 pt-2 flex items-center gap-2">
            <FileText className="text-slate-900/80" size={20} />
            Detalles
          </h3>
          <div className="relative">
            <label className="block text-slate-900 text-sm font-medium leading-normal pb-2 ml-1">Descripción (Mín. 50 caracteres)</label>
            <textarea 
              className="w-full rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 p-4 text-base shadow-sm min-h-[160px] resize-none placeholder:text-slate-400 outline-none" 
              placeholder="Escriba los detalles de la visita técnica..."
            ></textarea>
            <div className="flex justify-between items-center mt-2 px-1">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-red-500">Mínimo 50 caracteres</span>
              </div>
              <span className="text-xs font-medium text-slate-400">0/500</span>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-40 max-w-md mx-auto">
        <div className="p-4">
          <button 
            onClick={onBack}
            className="w-full h-14 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-900/25 flex items-center justify-center gap-2 text-base transition-all hover:bg-slate-800 active:scale-[0.98] group"
          >
            <CheckCircle className="group-hover:scale-110 transition-transform" size={20} />
            Guardar Visita
          </button>
        </div>
      </div>
    </div>
  );
};