import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MarkerType,
  Panel,
} from 'reactflow';
import { INITIAL_NODES, INITIAL_EDGES, MOCK_COLLABORATORS, MOCK_LOGS } from '../constants';
import CustomNode from './CustomNode';
import { Collaborator, AppNode } from '../types';
import { MousePointer2, Play, Save, Share2, Terminal, Activity, Layers, X, Maximize2 } from 'lucide-react';

const nodeTypes = {
  custom: CustomNode,
};

// Simulated CRDT Cursor Component
const Cursor = ({ x, y, color, name }: { x: number; y: number; color: string; name: string }) => (
  <div
    className="absolute pointer-events-none z-50 transition-all duration-200 ease-out flex flex-col items-start"
    style={{ transform: `translate(${x}px, ${y}px)` }}
  >
    <MousePointer2 className="w-4 h-4 stroke-[3px] stroke-white drop-shadow-md" style={{ color, fill: color }} />
    <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full ml-3 -mt-1 shadow-sm uppercase tracking-wide" style={{ backgroundColor: color }}>
      {name}
    </span>
  </div>
);

const EditorContent: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'logs' | 'trace' | 'state'>('logs');

  // Simulate collaborator movement (CRDT effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators((prev) =>
        prev.map((c) => ({
          ...c,
          x: c.x + (Math.random() - 0.5) * 80,
          y: c.y + (Math.random() - 0.5) * 80,
        }))
      );
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      const dataStr = event.dataTransfer.getData('application/reactflow-data');
      
      if (!type || !dataStr) return;
      
      const data = JSON.parse(dataStr);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: AppNode = {
        id: `node_${Math.random().toString(36).substr(2, 9)}`,
        type,
        position,
        data: { ...data, status: 'idle', taskQueue: 'default-worker' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="flex-1 relative bg-slate-50" ref={reactFlowWrapper}>
        {collaborators.map((c) => (
          <Cursor key={c.id} {...c} />
        ))}
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
          }}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="!border-slate-200 !shadow-sm !bg-white !m-4" />
          
          <Panel position="top-right" className="flex space-x-3 m-4">
            <div className="flex items-center bg-white rounded-lg shadow-sm border border-slate-200 p-1">
               <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <div className="w-px h-4 bg-slate-200 mx-1"></div>
              <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 text-sm font-medium transition-colors">
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>

            <button className="flex items-center space-x-2 bg-indigo-600 px-4 py-2 rounded-lg shadow-lg shadow-indigo-200 text-white hover:bg-indigo-700 text-sm font-bold transition-all active:scale-95">
              <Play className="w-4 h-4 fill-white" />
              <span>Deploy Workflow</span>
            </button>
          </Panel>
        </ReactFlow>
      </div>

      {/* Observability Panel */}
      <div className={`bg-white border-t border-slate-200 transition-all duration-300 ease-in-out flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 ${isPanelOpen ? 'h-72' : 'h-10'}`}>
        <div className="flex items-center justify-between px-4 h-10 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => { setIsPanelOpen(true); setActiveTab('logs'); }}
              className={`flex items-center space-x-2 px-3 py-1 text-xs font-bold uppercase tracking-wider h-10 border-b-2 transition-colors ${activeTab === 'logs' && isPanelOpen ? 'border-indigo-500 text-indigo-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              <Terminal className="w-3 h-3" />
              <span>Live Logs</span>
            </button>
            <button 
              onClick={() => { setIsPanelOpen(true); setActiveTab('trace'); }}
              className={`flex items-center space-x-2 px-3 py-1 text-xs font-bold uppercase tracking-wider h-10 border-b-2 transition-colors ${activeTab === 'trace' && isPanelOpen ? 'border-indigo-500 text-indigo-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              <Activity className="w-3 h-3" />
              <span>Trace View</span>
            </button>
            <button 
              onClick={() => { setIsPanelOpen(true); setActiveTab('state'); }}
              className={`flex items-center space-x-2 px-3 py-1 text-xs font-bold uppercase tracking-wider h-10 border-b-2 transition-colors ${activeTab === 'state' && isPanelOpen ? 'border-indigo-500 text-indigo-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              <Layers className="w-3 h-3" />
              <span>Workflow State</span>
            </button>
          </div>
          <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="text-slate-400 hover:text-slate-600">
            {isPanelOpen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {isPanelOpen && (
          <div className="flex-1 overflow-auto p-0 font-mono text-sm bg-slate-900 text-slate-300">
             {activeTab === 'logs' && (
               <div className="divide-y divide-slate-800">
                  {MOCK_LOGS.map((log) => (
                    <div key={log.id} className="flex items-start space-x-4 px-4 py-2 hover:bg-white/5">
                       <span className="text-slate-500 w-24 shrink-0">{log.timestamp}</span>
                       <span className={`w-12 shrink-0 font-bold ${log.level === 'INFO' ? 'text-blue-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-red-400'}`}>{log.level}</span>
                       <span className="text-purple-400 w-32 shrink-0">[{log.component}]</span>
                       <span className="text-slate-300">{log.message}</span>
                       {log.traceId && <span className="text-slate-600 ml-auto text-xs">trace_id={log.traceId}</span>}
                    </div>
                  ))}
                  <div className="px-4 py-2 text-slate-500 italic animate-pulse">Waiting for new events...</div>
               </div>
             )}
             
             {activeTab === 'trace' && (
               <div className="p-6">
                 <div className="flex items-center mb-4">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                   <span className="text-white font-bold">Trace: 8a23f9</span>
                   <span className="ml-4 text-slate-500">Total Duration: 1.4s</span>
                 </div>
                 {/* Trace Visualization Mock */}
                 <div className="space-y-2">
                   <div className="relative h-8 bg-slate-800 rounded overflow-hidden flex items-center px-2">
                     <div className="absolute top-0 left-0 h-full bg-blue-600/30 w-[100%] border-l-2 border-blue-500"></div>
                     <span className="relative z-10 text-xs text-blue-200">WorkflowExecution (Main)</span>
                     <span className="relative z-10 ml-auto text-xs text-slate-400">1.4s</span>
                   </div>
                   <div className="relative h-8 bg-slate-800 rounded overflow-hidden flex items-center px-2 ml-4">
                     <div className="absolute top-0 left-0 h-full bg-purple-600/30 w-[40%] border-l-2 border-purple-500"></div>
                     <span className="relative z-10 text-xs text-purple-200">Activity: TextractOCR</span>
                     <span className="relative z-10 ml-auto text-xs text-slate-400">450ms</span>
                   </div>
                   <div className="relative h-8 bg-slate-800 rounded overflow-hidden flex items-center px-2 ml-4">
                     <div className="absolute top-0 left-[42%] h-full bg-emerald-600/30 w-[30%] border-l-2 border-emerald-500"></div>
                     <span className="relative z-10 text-xs text-emerald-200">Activity: ExpenseClassifier</span>
                     <span className="relative z-10 ml-auto text-xs text-slate-400">320ms</span>
                   </div>
                 </div>
               </div>
             )}

            {activeTab === 'state' && (
              <div className="p-4">
                <pre className="text-xs text-amber-100 bg-slate-800/50 p-4 rounded border border-slate-700">
{JSON.stringify({
  "workflowId": "wf-1025-b",
  "runId": "a7293-8392-1921",
  "status": "RUNNING",
  "historyLength": 14,
  "pendingActivities": [
    {
      "activityType": "LLMGenerate",
      "state": "SCHEDULED",
      "attempt": 1
    }
  ],
  "signals": {
    "human_approval": "WAITING"
  }
}, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const WorkflowEditor = () => (
  <ReactFlowProvider>
    <EditorContent />
  </ReactFlowProvider>
);