import React, { useState } from 'react';
import { Hammer, Eye, EyeOff, Lock } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('demo@demo.com');
  const [password, setPassword] = useState('demo@demo.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
        onLogin();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header with Pattern */}
      <header className="relative bg-slate-900 pt-16 pb-14 rounded-b-[2.5rem] shadow-lg overflow-hidden shrink-0">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-inner">
            <Hammer className="text-white" size={32} />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight text-center">Visitas Técnicas</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Gestión de Construcción</p>
        </div>
      </header>

      {/* Main Form Card */}
      <main className="flex-1 flex flex-col items-center px-4 -mt-8 z-20 w-full max-w-[480px] mx-auto pb-8">
        <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
          <h2 className="text-slate-900 text-2xl font-bold text-center pb-2">Inicio de Sesión</h2>
          <p className="text-slate-500 text-sm text-center pb-8">Accede a tu panel de proyectos para gestionar las visitas en obra.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-semibold pb-2">Correo Electrónico</span>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400"
                placeholder="nombre@empresa.com"
                required
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-semibold pb-2">Contraseña</span>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400 pr-12"
                  placeholder="Introduce tu contraseña"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end mt-3">
                <a href="#" className="text-sm font-medium text-slate-900 hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
            </label>

            <button 
              type="submit"
              className="mt-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all"
            >
              Entrar
            </button>
          </form>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-slate-500">
            ¿Necesitas ayuda para entrar? <a href="#" className="font-semibold text-slate-900 hover:underline">Soporte Técnico</a>
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Lock size={12} />
            <span>Conexión Segura</span>
          </div>
        </div>
      </main>
    </div>
  );
};