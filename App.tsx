import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { WorkflowEditor } from './components/WorkflowEditor';
import { Dashboard } from './components/Dashboard';
import { ViewState } from './types';
import { Layout, Activity, Settings, Bell, Sparkles, Code2, Box } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.EDITOR);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-30 shrink-0 relative shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2.5">
            <div className="bg-slate-900 p-1.5 rounded">
              <Code2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
               <span className="font-bold text-lg tracking-tight text-slate-900 font-display leading-none block">FlowOrchestrator</span>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Platform</span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => setView(ViewState.EDITOR)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all border border-transparent ${
                view === ViewState.EDITOR ? 'bg-slate-100 text-slate-900 border-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>Designer</span>
            </button>
            <button 
              onClick={() => setView(ViewState.DASHBOARD)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all border border-transparent ${
                view === ViewState.DASHBOARD ? 'bg-slate-100 text-slate-900 border-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Observability</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-5">
           <div className="hidden lg:flex items-center space-x-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span className="text-xs font-medium text-slate-600">Production</span>
           </div>

           <div className="h-4 w-px bg-slate-200"></div>

           <div className="flex items-center space-x-4">
             <div className="relative group">
               <Bell className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </div>
             <Settings className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
             <div className="w-8 h-8 rounded bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-xs font-bold border border-slate-200 shadow-sm cursor-pointer hover:shadow transition-all">
               JD
             </div>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative z-0">
        {view === ViewState.EDITOR ? (
          <>
            <Sidebar />
            <WorkflowEditor />
          </>
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
};

export default App;