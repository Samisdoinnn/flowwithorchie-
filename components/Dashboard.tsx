import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';
import { MOCK_WORKFLOW_RUNS } from '../constants';
import { CheckCircle, AlertCircle, Clock, Activity, Server, Shield, Zap } from 'lucide-react';

const data = [
  { name: 'Mon', success: 4230, failed: 12 },
  { name: 'Tue', success: 3450, failed: 8 },
  { name: 'Wed', success: 5100, failed: 25 },
  { name: 'Thu', success: 4800, failed: 18 },
  { name: 'Fri', success: 6200, failed: 32 },
  { name: 'Sat', success: 2100, failed: 4 },
  { name: 'Sun', success: 1800, failed: 2 },
];

const latencyData = [
  { name: '00:00', p50: 120, p95: 240 },
  { name: '04:00', p50: 110, p95: 130 },
  { name: '08:00', p50: 350, p95: 900 },
  { name: '12:00', p50: 180, p95: 300 },
  { name: '16:00', p50: 220, p95: 450 },
  { name: '20:00', p50: 140, p95: 200 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 bg-slate-900 p-8 overflow-y-auto h-full font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-display">System Overview</h1>
            <p className="text-slate-400 text-sm mt-1">Production Environment • us-east-1</p>
          </div>
          <div className="flex items-center space-x-4">
             <div className="text-right hidden sm:block">
               <div className="text-xs text-slate-400 font-mono">Last updated</div>
               <div className="text-sm text-white font-mono">10:42:25 UTC</div>
             </div>
             <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded border border-slate-700 text-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
              <span className="text-emerald-400 font-medium font-mono text-xs uppercase tracking-wider">Healthy</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Global Success Rate', value: '99.95%', sub: '+0.01%', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/20' },
            { label: 'Active Workers', value: '1,024', sub: '32 autoscale pending', icon: Server, color: 'text-blue-400', border: 'border-blue-500/20' },
            { label: 'P95 Latency', value: '342ms', sub: '-12ms vs 1h ago', icon: Zap, color: 'text-amber-400', border: 'border-amber-500/20' },
            { label: 'Error Budget', value: '84%', sub: 'Burning slowly', icon: Activity, color: 'text-purple-400', border: 'border-purple-500/20' },
          ].map((stat, i) => (
            <div key={i} className={`bg-slate-800 p-6 rounded-lg border ${stat.border} relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                 <stat.icon className="w-16 h-16" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-white font-mono tracking-tight mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-wider">Throughput (Req/sec)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '4px', border: '1px solid #334155', color: '#f1f5f9', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                    cursor={{ fill: '#334155', opacity: 0.4 }}
                  />
                  <Bar dataKey="success" fill="#3b82f6" radius={[2, 2, 0, 0]} stackId="a" />
                  <Bar dataKey="failed" fill="#ef4444" radius={[2, 2, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-wider">Latency Distribution (ms)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={latencyData}>
                  <defs>
                    <linearGradient id="colorMs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '4px', border: '1px solid #334155', color: '#f1f5f9', fontSize: '12px', fontFamily: 'JetBrains Mono' }} />
                  <Area type="monotone" dataKey="p95" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorMs)" />
                  <Area type="monotone" dataKey="p50" stroke="#3b82f6" strokeWidth={2} fillOpacity={0} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Runs List */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Live Executions</h3>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium font-mono">[VIEW_ALL]</button>
          </div>
          <div className="divide-y divide-slate-700">
            {MOCK_WORKFLOW_RUNS.map((run) => (
              <div key={run.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.3)] ${
                    run.status === 'completed' ? 'bg-emerald-500' : 
                    run.status === 'running' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-slate-200">{run.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{run.id}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex flex-col items-end w-24">
                    <span className="text-xs text-slate-500 uppercase font-bold">Duration</span>
                    <span className="text-sm text-slate-300 font-mono">{run.duration}</span>
                  </div>
                  <div className="flex flex-col items-end w-24">
                    <span className="text-xs text-slate-500 uppercase font-bold">P95</span>
                    <span className="text-sm text-slate-300 font-mono">{run.p95}</span>
                  </div>
                  <div className="flex flex-col items-end w-32">
                     <span className="text-xs text-slate-500 uppercase font-bold">Started</span>
                     <span className="text-sm text-slate-400">{run.startTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};