
import React from 'react';
import { TaskStatus } from '../types';
import { CheckCircle2, Clock, Loader2, Eye } from 'lucide-react';

interface BadgeProps {
  status: TaskStatus;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
          <CheckCircle2 size={12} strokeWidth={3} />
          Finalizado
        </span>
      );
    case TaskStatus.IN_PROGRESS:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
          <Loader2 size={12} strokeWidth={3} className="animate-spin" />
          En Progreso
        </span>
      );
    case TaskStatus.IN_REVIEW:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-600 border border-violet-100">
          <Eye size={12} strokeWidth={3} />
          En Revisión
        </span>
      );
    case TaskStatus.PENDING:
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
          <Clock size={12} strokeWidth={3} />
          Pendiente
        </span>
      );
  }
};
