
import React, { useState } from 'react';
import { X, FileText, Camera, ImagePlus, FileEdit, Trash2 } from 'lucide-react';

interface RequestCorrectionViewProps {
  onBack: () => void;
  onSubmit: () => void;
}

export const RequestCorrectionView: React.FC<RequestCorrectionViewProps> = ({ onBack, onSubmit }) => {
  const [reason, setReason] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const maxChars = 500;

  const handleOpenCamera = () => {
    // Simulación de captura de imagen
    const mockImage = "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1000&auto=format&fit=crop";
    setImage(mockImage);
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f7f8] font-sans h-screen overflow-hidden text-[#0f1729]">
      {/* Header */}
      <header className="flex-none bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 z-30 transition-colors">
        <button 
          onClick={onBack}
          className="text-[#0f1729] flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
        >
          <X size={24} />
        </button>
        <h2 className="text-[#0f1729] text-lg font-bold leading-tight tracking-tight flex-1 text-center mx-2">Solicitar Corrección</h2>
        <div className="flex w-10 items-center justify-end shrink-0"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32 w-full max-w-lg mx-auto">
        
        {/* Detalles Section */}
        <section className="px-4 pt-6 pb-6">
          <h3 className="text-[#0f1729] text-lg font-bold leading-tight px-1 pb-4 flex items-center gap-2">
            <FileText className="text-[#0f1729]/80" size={20} />
            Detalles
          </h3>
          <div className="relative">
            <label className="block text-[#0f1729] text-sm font-medium leading-normal pb-2 ml-1">Motivo de la corrección</label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white text-[#0f1729] focus:border-[#0f1729] focus:ring-1 focus:ring-[#0f1729] p-4 text-base shadow-sm min-h-[160px] resize-none placeholder:text-[#5d6a89]/60 outline-none transition-all" 
              placeholder="Escriba los detalles o motivos por los cuales se solicita la corrección..."
              maxLength={maxChars}
            ></textarea>
            <div className="flex justify-end items-center mt-2 px-1">
              <span className="text-xs font-medium text-[#5d6a89]">{reason.length}/{maxChars}</span>
            </div>
          </div>
        </section>

        {/* Evidencia Visual Section (Opcional) */}
        <section className="p-4">
          <h3 className="text-[#0f1729] text-lg font-bold leading-tight px-1 pb-4 flex items-center gap-2">
            <Camera className="text-[#0f1729]/80" size={20} />
            Evidencia Visual
          </h3>
          <div className="flex flex-col">
            {image ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm group">
                <img src={image} className="w-full h-full object-cover" alt="Evidencia seleccionada" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                     onClick={handleRemoveImage}
                     className="bg-red-500 text-white p-3 rounded-full shadow-lg active:scale-90 transition-transform"
                   >
                     <Trash2 size={24} />
                   </button>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">Imagen Lista</span>
                </div>
              </div>
            ) : (
              <div 
                onClick={handleOpenCamera}
                className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-[#d5d9e2] bg-white px-6 py-10 transition-all hover:border-[#0f1729] cursor-pointer active:bg-gray-50"
              >
                <div className="size-14 rounded-full bg-[#eaecf1] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ImagePlus className="text-[#0f1729]" size={28} />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-[#0f1729] text-base font-bold leading-tight">Foto (Opcional)</p>
                  <p className="text-[#5d6a89] text-xs font-normal">JPG, PNG • Máx 20MB</p>
                </div>
                <button className="mt-2 flex items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-[#0f1729]/5 text-[#0f1729] text-sm font-bold leading-normal transition-colors group-hover:bg-[#0f1729] group-hover:text-white pointer-events-none">
                  Abrir Cámara
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-40 max-w-md mx-auto">
        <div className="p-4">
          <button 
            onClick={onSubmit}
            disabled={reason.length === 0}
            className={`w-full h-14 font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2.5 text-base transition-all active:scale-[0.98] group ${
              reason.length > 0 
                ? 'bg-[#8B5CF6] text-white shadow-[#8B5CF6]/20' 
                : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
            }`}
          >
            <FileEdit size={20} className={reason.length > 0 ? "group-hover:scale-110 transition-transform" : ""} />
            Solicitar Corrección
          </button>
        </div>
      </div>
    </div>
  );
};
