import React from 'react';
import { NODE_PALETTE } from '../constants';
import { GripVertical, Plus, Search } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-data', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-72 border-r border-slate-200 bg-slate-50/50 flex flex-col h-full backdrop-blur-sm">
      <div className="p-4 border-b border-slate-200 bg-white">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Component Library</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search components..." 
            className="w-full pl-9 pr-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Group triggers */}
        <div>
          <div className="px-2 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Triggers & Events</div>
          <div className="space-y-2">
            {NODE_PALETTE.filter(n => n.type === 'trigger').map((node, idx) => (
              <DraggableItem key={idx} node={node} onDragStart={onDragStart} />
            ))}
          </div>
        </div>

        {/* Group AI Workers */}
        <div>
           <div className="px-2 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Compute</div>
           <div className="space-y-2">
            {NODE_PALETTE.filter(n => n.type === 'ai_worker').map((node, idx) => (
              <DraggableItem key={idx} node={node} onDragStart={onDragStart} />
            ))}
          </div>
        </div>

        {/* Group Actions */}
        <div>
           <div className="px-2 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actions & IO</div>
           <div className="space-y-2">
            {NODE_PALETTE.filter(n => n.type !== 'trigger' && n.type !== 'ai_worker').map((node, idx) => (
              <DraggableItem key={idx} node={node} onDragStart={onDragStart} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Connectors</div>
          <button className="text-indigo-600 hover:text-indigo-700"><Plus className="w-4 h-4" /></button>
        </div>
        <div className="flex flex-wrap gap-2">
           <ConnectorBadge label="Gmail" color="bg-red-50 text-red-700 border-red-200" />
           <ConnectorBadge label="Slack" color="bg-emerald-50 text-emerald-700 border-emerald-200" />
           <ConnectorBadge label="HubSpot" color="bg-orange-50 text-orange-700 border-orange-200" />
           <ConnectorBadge label="Stripe" color="bg-indigo-50 text-indigo-700 border-indigo-200" />
        </div>
      </div>
    </div>
  );
};

interface DraggableItemProps {
  node: any;
  onDragStart: (event: React.DragEvent, nodeType: string, nodeData: any) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ node, onDragStart }) => (
  <div
    className="group flex items-center p-2.5 bg-white border border-slate-200 rounded-md cursor-grab shadow-sm hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
    onDragStart={(event) => onDragStart(event, 'custom', node)}
    draggable
  >
    <GripVertical className="w-4 h-4 text-slate-300 mr-2 group-hover:text-slate-400" />
    <div className="overflow-hidden">
      <div className="text-sm font-medium text-slate-700 truncate">{node.label}</div>
      <div className="text-[10px] text-slate-400 truncate">{node.description}</div>
    </div>
  </div>
);

const ConnectorBadge: React.FC<{ label: string, color: string }> = ({ label, color }) => (
  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${color}`}>
    {label}
  </div>
);