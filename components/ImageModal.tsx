
import React, { useEffect, useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Move, Minus, Plus } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, title }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Reset al cerrar o abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      resetView();
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Lógica de Clamping: Restringe el movimiento para no salir de los bordes
  const clampPosition = (x: number, y: number, newScale: number) => {
    if (!imgRef.current || !containerRef.current) return { x, y };

    const cWidth = containerRef.current.clientWidth;
    const cHeight = containerRef.current.clientHeight;
    
    // Obtenemos el tamaño real de la imagen dentro del object-contain
    const imgAspect = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
    const containerAspect = cWidth / cHeight;
    
    let renderWidth, renderHeight;
    if (imgAspect > containerAspect) {
      renderWidth = cWidth;
      renderHeight = cWidth / imgAspect;
    } else {
      renderHeight = cHeight;
      renderWidth = cHeight * imgAspect;
    }

    const scaledWidth = renderWidth * newScale;
    const scaledHeight = renderHeight * newScale;

    // Calculamos el máximo desplazamiento permitido (mitad del exceso de tamaño)
    const maxX = Math.max(0, (scaledWidth - cWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - cHeight) / 2);

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y))
    };
  };

  const handleZoomIn = () => {
    const newScale = Math.min(scale + 0.5, 5);
    setScale(newScale);
    // Re-clamp al hacer zoom
    const clamped = clampPosition(position.x, position.y, newScale);
    setPosition(clamped);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.5, 1);
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    } else {
      const clamped = clampPosition(position.x, position.y, newScale);
      setPosition(clamped);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale === 1) return;
    setIsDragging(true);
    startPos.current = {
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale === 1) return;
    const rawX = e.touches[0].clientX - startPos.current.x;
    const rawY = e.touches[0].clientY - startPos.current.y;
    
    const clamped = clampPosition(rawX, rawY, scale);
    setPosition(clamped);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col bg-[#050810] animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Header Fijo */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[120] pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
           <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.1em]">Vista de Inspección</p>
        </div>
        <button 
          onClick={onClose}
          className="text-white/80 hover:text-white bg-white/10 p-2.5 rounded-full transition-all active:scale-90 pointer-events-auto"
        >
          <X size={26} />
        </button>
      </div>

      {/* Contenedor de Imagen */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden flex items-center justify-center touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="transition-transform duration-100 ease-out will-change-transform"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <img 
            ref={imgRef}
            src={imageUrl} 
            alt={title || "Vista ampliada"} 
            className="max-w-screen max-h-screen object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Indicador de Movimiento Central */}
        {scale > 1 && !isDragging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-full border border-white/5 animate-pulse">
                <Move size={48} className="text-white/40" />
            </div>
          </div>
        )}
      </div>

      {/* Footer Sticky */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[110] flex flex-col pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradiente de fondo profundo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/95 to-transparent h-full"></div>

        {/* Info y Reset */}
        <div className="relative px-6 pt-16 pb-4">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <h3 className="text-white text-xl font-bold truncate drop-shadow-md leading-tight">
                {title || "Detalle de Inspección..."}
              </h3>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 bg-[#0a1424] border border-white/10 rounded-lg p-1.5 pr-3">
                   <div className="bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-black text-emerald-400">ZOOM</div>
                   <span className="text-white text-[11px] font-bold tracking-tight">
                    {Math.round(scale * 100)}%
                   </span>
                </div>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.15em]">
                  Gesto activo para mover
                </p>
              </div>
            </div>

            {/* Botón Reset Circular */}
            <button 
              onClick={resetView}
              className={`p-4 bg-white/5 text-white/70 rounded-full border border-white/10 active:scale-90 transition-all pointer-events-auto backdrop-blur-md mb-2 ${scale > 1 ? 'opacity-100' : 'opacity-0 scale-75 pointer-events-none'}`}
            >
              <RotateCcw size={22} />
            </button>
          </div>
        </div>

        {/* Barra de Acciones Estilo Mockup */}
        <div className="relative px-4 pb-10 pt-2 flex gap-3">
          {/* Botón Cerrar Izquierdo */}
          <button 
            onClick={onClose}
            className="flex-1 h-16 bg-white/5 text-white border border-white/20 font-bold rounded-[1.25rem] active:scale-95 transition-all flex items-center justify-center text-base pointer-events-auto"
          >
            Cerrar
          </button>

          {/* Grupo de Control Zoom */}
          <div className="flex-[1.8] flex gap-2 pointer-events-auto">
            <button 
              onClick={handleZoomOut}
              disabled={scale === 1}
              className="flex-1 h-16 bg-slate-900/80 disabled:opacity-20 text-white font-bold rounded-[1.25rem] border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Minus size={20} className="text-white/60" />
              Reducir
            </button>
            <button 
              onClick={handleZoomIn}
              className="flex-1 h-16 bg-[#059669] text-white font-bold rounded-[1.25rem] shadow-lg shadow-emerald-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Ampliar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
