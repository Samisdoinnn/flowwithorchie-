import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Mail, Webhook, ScanText, BrainCircuit, MessageSquare, Database, CheckCircle, AlertCircle, Loader2, Check, RefreshCw, Clock } from 'lucide-react';
import { NodeType } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Mail,
  Webhook,
  ScanText,
  BrainCircuit,
  MessageSquare,
  Database,
  CheckCircle,
};

const CustomNode = ({ data, selected }: NodeProps) => {
  const Icon = iconMap[data.icon] || Webhook;

  // Technical color palette based on node type
  let accentColor = 'border-slate-300';
  let badgeColor = 'bg-slate-100 text-slate-600';
  let iconBg = 'bg-slate-100';
  let iconColor = 'text-slate-600';

  switch (data.type) {
    case NodeType.TRIGGER:
      accentColor = 'border-blue-400';
      badgeColor = 'bg-blue-100 text-blue-700';
      iconBg = 'bg-blue-50';
      iconColor = 'text-blue-600';
      break;
    case NodeType.AI_WORKER:
      accentColor = 'border-purple-400';
      badgeColor = 'bg-purple-100 text-purple-700';
      iconBg = 'bg-purple-50';
      iconColor = 'text-purple-600';
      break;
    case NodeType.ACTION:
      accentColor = 'border-emerald-400';
      badgeColor = 'bg-emerald-100 text-emerald-700';
      iconBg = 'bg-emerald-50';
      iconColor = 'text-emerald-600';
      break;
    case NodeType.CONDITION:
      accentColor = 'border-amber-400';
      badgeColor = 'bg-amber-100 text-amber-700';
      iconBg = 'bg-amber-50';
      iconColor = 'text-amber-600';
      break;
  }

  if (selected) {
    accentColor = 'border-indigo-500 ring-2 ring-indigo-500/20';
  }

  return (
    <div className={`min-w-[280px] bg-white rounded-md border shadow-sm transition-all duration-200 ${accentColor}`}>
      {/* Input Handle */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-slate-800 !w-2 !h-2 !border-2 !border-white" 
      />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-start justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${iconBg}`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-800 font-display tracking-tight">{data.label}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">{data.type}</div>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center">
          {data.status === 'running' && (
            <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded border border-blue-100">
              <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
              <span className="text-[10px] font-mono font-medium text-blue-700">RUNNING</span>
            </div>
          )}
          {data.status === 'success' && (
            <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-mono font-medium text-emerald-700">DONE</span>
            </div>
          )}
          {data.status === 'error' && (
             <div className="flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded border border-red-100">
              <AlertCircle className="w-3 h-3 text-red-600" />
              <span className="text-[10px] font-mono font-medium text-red-700">FAIL</span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {data.description}
        </p>
        
        {/* Technical Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="bg-slate-50 p-2 rounded border border-slate-100">
             <div className="text-[9px] text-slate-400 uppercase font-bold mb-0.5">Task Queue</div>
             <div className="text-[10px] font-mono text-slate-700 truncate">{data.taskQueue || 'default'}</div>
          </div>
          
          <div className="bg-slate-50 p-2 rounded border border-slate-100">
             <div className="text-[9px] text-slate-400 uppercase font-bold mb-0.5">Avg Duration</div>
             <div className="text-[10px] font-mono text-slate-700">{data.avgDuration || '-'}</div>
          </div>

          {data.maxAttempts && (
             <div className="col-span-2 flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] text-slate-500 font-medium">Retry Policy</span>
                </div>
                <div className="text-[10px] font-mono text-slate-700">
                   {data.attempts || 0}/{data.maxAttempts}
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Output Handle */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-slate-800 !w-2 !h-2 !border-2 !border-white" 
      />
    </div>
  );
};

export default memo(CustomNode);