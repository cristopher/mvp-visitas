
import React, { useState, useMemo } from 'react';
import { UserRole, TaskStatus } from './types';
import { MOCK_TASKS } from './constants';
import { LoginView } from './views/LoginView';
import { RoleSelectionView } from './views/RoleSelectionView';
import { ManagerDashboard } from './views/ManagerDashboard';
import { WorkerDashboard } from './views/WorkerDashboard';
import { NewOrderView } from './views/NewOrderView';
import { WorkerOrderDetailView } from './views/WorkerOrderDetailView';
import { WorkerProgressView } from './views/WorkerProgressView';
import { WorkerCloseVisitView } from './views/WorkerCloseVisitView';
import { WorkerOrderDetailInProgressView } from './views/WorkerOrderDetailInProgressView';
import { WorkerOrderDetailFinishedView } from './views/WorkerOrderDetailFinishedView';
import { ManagerOrderDetailUnifiedView } from './views/ManagerOrderDetailUnifiedView';
import { RequestCorrectionView } from './views/RequestCorrectionView';

type ViewState = 'LOGIN' | 'ROLE_SELECT' | 'DASHBOARD' | 'NEW_ORDER' | 'WORKER_ORDER_DETAIL' | 'WORKER_PROGRESS' | 'WORKER_CLOSE_VISIT' | 'WORKER_ORDER_DETAIL_IN_PROGRESS' | 'MANAGER_ORDER_DETAIL' | 'WORKER_ORDER_DETAIL_FINISHED' | 'REQUEST_CORRECTION';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [previousView, setPreviousView] = useState<ViewState | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = useMemo(() => 
    MOCK_TASKS.find(t => t.id === selectedTaskId), 
    [selectedTaskId]
  );

  const handleLogin = () => {
    setView('ROLE_SELECT');
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('DASHBOARD');
  };

  const handleTaskClick = (taskId: string) => {
    const task = MOCK_TASKS.find(t => t.id === taskId);
    setSelectedTaskId(taskId);

    if (role === UserRole.MANAGER) {
      setView('MANAGER_ORDER_DETAIL');
    } else if (role === UserRole.WORKER) {
      if (task?.status === TaskStatus.IN_PROGRESS || task?.status === TaskStatus.IN_REVIEW) {
        setView('WORKER_ORDER_DETAIL_IN_PROGRESS');
      } else if (task?.status === TaskStatus.COMPLETED) {
        setView('WORKER_ORDER_DETAIL_FINISHED');
      } else {
        setView('WORKER_ORDER_DETAIL');
      }
    }
  };

  const handleBackToDashboard = () => {
    setView('DASHBOARD');
    setSelectedTaskId(null);
  };

  const handleBackToManagerOrderDetail = () => {
    setView('MANAGER_ORDER_DETAIL');
  };

  const handleBackToWorkerOrderDetail = () => {
    setView('WORKER_ORDER_DETAIL');
  };
  
  const handleBackToWorkerOrderDetailInProgress = () => {
    setView('WORKER_ORDER_DETAIL_IN_PROGRESS');
  };

  const handleAddNewOrder = () => {
    setView('NEW_ORDER');
  };

  const handleRegisterProgress = () => {
    setPreviousView(view);
    setView('WORKER_PROGRESS');
  };

  const handleRegisterProgressSubmit = () => {
    setView('WORKER_ORDER_DETAIL_IN_PROGRESS');
  };

  const handleCloseVisit = () => {
    setPreviousView(view);
    setView('WORKER_CLOSE_VISIT');
  };

  const handleConfirmCloseVisit = () => {
    setView('WORKER_ORDER_DETAIL_FINISHED');
  };

  const handleRequestCorrection = () => {
    setView('REQUEST_CORRECTION');
  };

  const renderDashboard = () => {
    switch (role) {
      case UserRole.MANAGER:
        return <ManagerDashboard onTaskClick={handleTaskClick} onAddClick={handleAddNewOrder} />;
      case UserRole.WORKER:
        return <WorkerDashboard onTaskClick={handleTaskClick} />;
      default:
        return <LoginView onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans mx-auto max-w-md w-full shadow-2xl overflow-hidden relative">
      {view === 'LOGIN' && <LoginView onLogin={handleLogin} />}
      {view === 'ROLE_SELECT' && <RoleSelectionView onSelectRole={handleRoleSelect} />}
      {view === 'DASHBOARD' && renderDashboard()}
      {view === 'NEW_ORDER' && <NewOrderView onBack={handleBackToDashboard} />}
      {view === 'WORKER_ORDER_DETAIL' && selectedTask && <WorkerOrderDetailView task={selectedTask} onBack={handleBackToDashboard} onRegisterProgress={handleRegisterProgress} onCloseVisit={handleCloseVisit} />}
      {view === 'WORKER_PROGRESS' && <WorkerProgressView onBack={previousView === 'WORKER_ORDER_DETAIL_IN_PROGRESS' ? handleBackToWorkerOrderDetailInProgress : handleBackToWorkerOrderDetail} onSubmit={handleRegisterProgressSubmit} />}
      {view === 'WORKER_CLOSE_VISIT' && <WorkerCloseVisitView onBack={previousView === 'WORKER_ORDER_DETAIL_IN_PROGRESS' ? handleBackToWorkerOrderDetailInProgress : handleBackToWorkerOrderDetail} onConfirmClose={handleConfirmCloseVisit} />}
      {view === 'WORKER_ORDER_DETAIL_IN_PROGRESS' && selectedTask && <WorkerOrderDetailInProgressView task={selectedTask} onBack={handleBackToDashboard} onRegisterProgress={handleRegisterProgress} onCloseVisit={handleCloseVisit} />}
      {view === 'WORKER_ORDER_DETAIL_FINISHED' && selectedTask && <WorkerOrderDetailFinishedView task={selectedTask} onBack={handleBackToDashboard} />}
      {view === 'MANAGER_ORDER_DETAIL' && selectedTask && <ManagerOrderDetailUnifiedView task={selectedTask} onBack={handleBackToDashboard} onRequestCorrection={handleRequestCorrection} />}
      {view === 'REQUEST_CORRECTION' && <RequestCorrectionView onBack={handleBackToManagerOrderDetail} onSubmit={handleBackToDashboard} />}
    </div>
  );
};

export default App;
