
import { Task, TaskStatus } from './types';

export const MOCK_STATS = {
  total: 128,
  completed: 82,
  open: 46,
  efficiency: 64,
  inProgress: 12,
  pending: 24,
  inReview: 10,
};

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'INSPECCIÓN DE CIMENTACIÓN',
    project: 'PORTAL K',
    date: '24 Oct',
    time: '10:30 AM',
    description: 'Inspección de cimentación requerida para el sector B según nuevas normativas sísmicas. Resultados de compactación pendientes.',
    solicitante: 'Arq. Marcos V.',
    assignee: 'PABLO PEREZ',
    status: TaskStatus.IN_PROGRESS,
    duration: '2d 15h',
    foto_original: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    // Added required descripcion_final property
    descripcion_final: '',
    task_history: [
      {
        id: 101,
        fecha: '2023-10-25T09:15:00Z',
        comentario: 'Personal en sitio. Limpieza de superficie para visualización de fisuras.',
        history_image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 102,
        fecha: '2023-10-25T14:30:00Z',
        comentario: 'Pruebas de esclerometría en 4 puntos estratégicos del eje 4-C.',
        history_image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '2',
    title: 'REVISIÓN DE CABLEADO',
    project: 'PORTAL K',
    date: '23 Oct',
    time: '02:15 PM',
    description: 'Revisión de cableado eléctrico completada. Todos los circuitos probados y certificados.',
    solicitante: 'Ing. Roberto S.',
    assignee: 'JUAN PEREZ',
    status: TaskStatus.COMPLETED,
    duration: '4h 45m',
    foto_original: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000&auto=format&fit=crop',
    // Added required descripcion_final property
    descripcion_final: 'Se validaron todas las conexiones según el plano eléctrico v2. Certificación emitida.',
    task_history: [
      {
        id: 201,
        fecha: '2023-10-23T10:00:00Z',
        comentario: 'Inicio de cableado en bandejas principales.',
        history_image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: 202,
        fecha: '2023-10-23T14:00:00Z',
        comentario: 'Cierre de circuitos y pruebas de continuidad finalizadas.',
        history_image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: '3',
    title: 'INSTALACIÓN ELÉCTRICA - PISO 2',
    project: 'PORTAL K',
    date: '25 Oct',
    description: 'Revisión de conexiones eléctricas en el sector norte, asegurando la correcta polaridad en todos los puntos de red.',
    solicitante: 'Arq. Lucía M.',
    assignee: 'ANA GARCIA',
    status: TaskStatus.PENDING,
    foto_original: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    // Added required descripcion_final property
    descripcion_final: '',
    task_history: []
  },
  {
    id: '4',
    title: 'AUDITORÍA DE SEGURIDAD',
    project: 'PORTAL K',
    date: '26 Oct',
    description: 'Validación final de protocolos de seguridad en andamiaje antes de la visita del inspector externo.',
    solicitante: 'Prevencionista Soto',
    assignee: 'ANA GARCIA',
    status: TaskStatus.IN_REVIEW,
    duration: '1d 0h',
    foto_original: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop',
    evidencia_final: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1000&auto=format&fit=crop',
    // Added required descripcion_final property
    descripcion_final: '',
    task_history: [
      {
        id: 401,
        fecha: '2023-10-26T08:00:00Z',
        comentario: 'Revisión de arneses y puntos de anclaje en torre norte.',
        history_image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=600&auto=format&fit=crop'
      }
    ]
  }
];
