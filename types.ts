import { Node, Edge } from 'reactflow';

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  EDITOR = 'EDITOR',
}

export enum NodeType {
  TRIGGER = 'trigger',
  ACTION = 'action',
  AI_WORKER = 'ai_worker',
  CONDITION = 'condition',
}

export interface WorkflowStats {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  duration: string;
  startTime: string;
  p95: string;
}

export interface Collaborator {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  component: string;
  message: string;
  traceId?: string;
}

export interface CustomNodeData {
  label: string;
  description?: string;
  icon?: string;
  status?: 'idle' | 'running' | 'success' | 'error' | 'retrying';
  config?: Record<string, any>;
  // Technical details
  taskQueue?: string;
  attempts?: number;
  maxAttempts?: number;
  lastHeartbeat?: string;
  avgDuration?: string;
}

export type AppNode = Node<CustomNodeData>;