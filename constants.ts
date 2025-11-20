import { WorkflowStats, Collaborator, NodeType, LogEntry } from './types';

export const MOCK_WORKFLOW_RUNS: WorkflowStats[] = [
  { id: 'wf-1024-a', name: 'Invoice Processing', status: 'completed', duration: '2.4s', startTime: '2 min ago', p95: '240ms' },
  { id: 'wf-1025-b', name: 'Lead Enrichment', status: 'running', duration: '12s', startTime: 'Just now', p95: '1.2s' },
  { id: 'wf-1023-x', name: 'Invoice Processing', status: 'failed', duration: '1.1s', startTime: '5 min ago', p95: '210ms' },
  { id: 'wf-1022-c', name: 'Support Ticket Triage', status: 'completed', duration: '4.5s', startTime: '1 hour ago', p95: '320ms' },
  { id: 'wf-1021-d', name: 'Slack Digest', status: 'completed', duration: '8.2s', startTime: '2 hours ago', p95: '890ms' },
];

export const INITIAL_NODES = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 50 },
    data: { 
      label: 'Gmail Attachment', 
      description: 'Listen for PDF invoices',
      icon: 'Mail', 
      status: 'success',
      type: NodeType.TRIGGER,
      taskQueue: 'ingestion-queue',
      avgDuration: '45ms'
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 240 },
    data: { 
      label: 'Textract OCR', 
      description: 'Extract tables & forms',
      icon: 'ScanText', 
      status: 'success',
      type: NodeType.AI_WORKER,
      taskQueue: 'gpu-worker-pool',
      attempts: 1,
      maxAttempts: 3,
      avgDuration: '1.2s'
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 250, y: 450 },
    data: { 
      label: 'Expense Classifier', 
      description: 'LLM Categorization',
      icon: 'BrainCircuit', 
      status: 'running',
      type: NodeType.AI_WORKER,
      taskQueue: 'llm-tpu-v4',
      attempts: 2,
      maxAttempts: 5,
      lastHeartbeat: 'Just now',
      avgDuration: '850ms'
    },
  },
];

export const INITIAL_EDGES = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
];

export const MOCK_COLLABORATORS: Collaborator[] = [
  { id: 'c1', name: 'Sarah (Architect)', color: '#f43f5e', x: 400, y: 100 },
  { id: 'c2', name: 'Devin (SRE)', color: '#3b82f6', x: 100, y: 300 },
];

export const NODE_PALETTE = [
  { type: NodeType.TRIGGER, label: 'Gmail Source', icon: 'Mail', description: 'Polling trigger' },
  { type: NodeType.TRIGGER, label: 'Webhook Ingress', icon: 'Webhook', description: 'HTTP POST listener' },
  { type: NodeType.AI_WORKER, label: 'AWS Textract', icon: 'ScanText', description: 'Async OCR job' },
  { type: NodeType.AI_WORKER, label: 'LLM Transform', icon: 'BrainCircuit', description: 'Entity extraction' },
  { type: NodeType.ACTION, label: 'Slack Notify', icon: 'MessageSquare', description: 'Block Kit message' },
  { type: NodeType.ACTION, label: 'Postgres Write', icon: 'Database', description: 'Upsert record' },
  { type: NodeType.CONDITION, label: 'Human Approval', icon: 'CheckCircle', description: 'Temporal signal wait' },
];

export const MOCK_LOGS: LogEntry[] = [
  { id: 'l1', timestamp: '10:42:23.452', level: 'INFO', component: 'WorkflowWorker', message: 'Started workflow execution wf-1025-b', traceId: '8a23f9' },
  { id: 'l2', timestamp: '10:42:23.550', level: 'INFO', component: 'ActivityTask', message: 'Scheduled Activity: TextractOCR', traceId: '8a23f9' },
  { id: 'l3', timestamp: '10:42:24.800', level: 'INFO', component: 'ActivityTask', message: 'Completed Activity: TextractOCR (Duration: 1250ms)', traceId: '8a23f9' },
  { id: 'l4', timestamp: '10:42:24.850', level: 'INFO', component: 'ActivityTask', message: 'Scheduled Activity: ExpenseClassifier', traceId: '8a23f9' },
  { id: 'l5', timestamp: '10:42:25.100', level: 'WARN', component: 'LLMService', message: 'Rate limit approaching for model: gpt-4-turbo', traceId: '8a23f9' },
];