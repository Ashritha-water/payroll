'use client'
import React, { useState, useRef, useEffect } from 'react'
import Components from '../components'
import { Brain, Send, Zap, CheckCircle, Clock, AlertCircle, FileText, RefreshCw, ChevronRight, BarChart3, Sparkles, Bot, User, Settings, Play, Pause, List } from 'lucide-react'

type MessageRole = 'user' | 'agent'
interface Message {
  role: MessageRole
  text: string
  timestamp: string
  actions?: { label: string; status: 'done' | 'running' | 'pending' }[]
  tools?: string[]
}

const initialMessages: Message[] = [
  {
    role: 'agent',
    text: "Namaste! I'm **ARIA** — Automated HR Intelligence Agent for GHMC HRMS. I can autonomously execute HR workflows, answer policy queries, generate reports, process approval queues, send WhatsApp notifications, and more. What would you like me to do today?",
    timestamp: '09:00 AM',
    tools: ['payroll-engine', 'policy-db', 'notification-engine'],
  },
  {
    role: 'user',
    text: 'Show me all employees with pending income tax declarations and send them WhatsApp reminders.',
    timestamp: '09:01 AM',
  },
  {
    role: 'agent',
    text: 'Understood. I\'m executing a multi-step workflow: querying the income tax module, filtering employees with pending declarations, and dispatching WhatsApp messages via the notification engine.',
    timestamp: '09:01 AM',
    actions: [
      { label: 'Query IT Declaration Module — flagged 284 employees', status: 'done' },
      { label: 'Filter: Pending declarations as on 16-Mar-2026', status: 'done' },
      { label: 'Compose personalized WhatsApp message (TS Language)', status: 'done' },
      { label: 'Dispatch via GHMC WhatsApp Business API — 284 messages sent', status: 'done' },
    ],
    tools: ['it-module', 'whatsapp-api'],
  },
  {
    role: 'user',
    text: 'Generate a payroll anomaly report for February 2026 and flag any irregularities.',
    timestamp: '09:03 AM',
  },
  {
    role: 'agent',
    text: 'Running ML anomaly detection on Feb 2026 payroll data across all 29,340 employees. Found 3 anomalies requiring your attention.',
    timestamp: '09:03 AM',
    actions: [
      { label: 'Load payroll dataset — 29,340 records', status: 'done' },
      { label: 'Run Z-score anomaly detection on salary components', status: 'done' },
      { label: 'Flag: EMP4512 — Basic pay 340% above grade ceiling', status: 'done' },
      { label: 'Flag: EMP8821 — Duplicate HRA claim (₹18,400)', status: 'done' },
      { label: 'Flag: EMP2290 — NPA drawn despite transfer order', status: 'done' },
      { label: 'Generate PDF anomaly report — sent to Commissioner inbox', status: 'done' },
    ],
    tools: ['payroll-engine', 'ml-anomaly', 'pdf-generator'],
  },
]

const agentCapabilities = [
  { icon: FileText, label: 'Report Generation', desc: 'Generate any MIS/statutory report on demand', color: '#3B82F6' },
  { icon: Zap, label: 'Workflow Trigger', desc: 'Initiate, approve or escalate any HR process', color: '#8B5CF6' },
  { icon: Brain, label: 'Policy Q&A', desc: 'Answer any HR policy or rule query with citations', color: '#10B981' },
  { icon: BarChart3, label: 'Anomaly Detection', desc: 'Run ML scans on payroll, attendance, claims', color: '#E35A4A' },
  { icon: Send, label: 'WhatsApp/SMS/Email', desc: 'Send targeted notifications to employees', color: '#E69B30' },
  { icon: RefreshCw, label: 'Bulk Operations', desc: 'Execute bulk payroll runs, leave encashment, etc.', color: '#06B6D4' },
]

const suggestedPrompts = [
  'Who retires in the next 60 days? Generate their benefit orders.',
  'Identify employees with negative leave balance across all zones.',
  'Run payroll for March 2026 — Serilingampally Zone.',
  'Draft an office memo for IT declaration deadline extension.',
  'List all disciplinary cases pending more than 6 months.',
  'Send attendance alert to all absentees via WhatsApp.',
]

const taskLog = [
  { id: 'T-2026-0841', task: 'IT Declaration Reminders — 284 employees', status: 'completed', time: '09:01 AM', duration: '4.2s' },
  { id: 'T-2026-0840', task: 'Feb 2026 Payroll Anomaly Detection Report', status: 'completed', time: '09:03 AM', duration: '6.8s' },
  { id: 'T-2026-0839', task: 'GPF Interest Computation — FY 2024-25 finalization', status: 'completed', time: '08:42 AM', duration: '11.4s' },
  { id: 'T-2026-0838', task: 'Attendance Regularization Bulk Approval — 12 cases', status: 'completed', time: '08:30 AM', duration: '2.1s' },
  { id: 'T-2026-0837', task: 'Zone-wise Headcount Report — Zone 8 report generation', status: 'running', time: '09:06 AM', duration: '—' },
]

export default function AgenticAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'tasks' | 'settings'>('chat')
  const [agentMode, setAgentMode] = useState<'supervised' | 'autonomous'>('supervised')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || isProcessing) return
    const userMsg: Message = { role: 'user', text: input, timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsProcessing(true)
    setTimeout(() => {
      const agentReply: Message = {
        role: 'agent',
        text: 'I\'m processing your request. Executing the required workflow steps across relevant GHMC HRMS modules...',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Parsing request & identifying relevant modules', status: 'done' },
          { label: 'Executing data retrieval & processing', status: 'done' },
          { label: 'Generating output / triggering workflow', status: 'done' },
        ],
        tools: ['core-engine', 'data-layer'],
      }
      setMessages(prev => [...prev, agentReply])
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="AI Analytics" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles size={22} style={{ color: '#8B5CF6' }} /> ARIA — Agentic HR Intelligence
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">Autonomous AI Agent · GHMC HRMS · GPT-4o powered · Real-time execution</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-gray-600">Mode:</span>
              <button onClick={() => setAgentMode('supervised')} className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${agentMode === 'supervised' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Supervised</button>
              <button onClick={() => setAgentMode('autonomous')} className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${agentMode === 'autonomous' ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>Autonomous</button>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#F3F0FF' }}>
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-bold text-purple-700">ARIA Online</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Main Chat + Task panel */}
          <div className="col-span-3 flex flex-col gap-4">

            {/* Tab bar */}
            <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit">
              {[{ key: 'chat', label: 'AI Chat', Icon: Bot }, { key: 'tasks', label: 'Task Log', Icon: List }, { key: 'settings', label: 'Agent Config', Icon: Settings }].map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${activeTab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={activeTab === t.key ? { backgroundColor: '#1A3555' } : {}}>
                  <t.Icon size={13} /> {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'chat' && (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col" style={{ height: '480px' }}>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'agent' && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                            <Brain size={14} className="text-white" />
                          </div>
                        )}
                        <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                          <div className={`rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'text-white rounded-tr-sm' : 'bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100'}`} style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #1A3555, #2563EB)' } : {}}>
                            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            {msg.tools && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {msg.tools.map(t => (
                                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">{t}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          {msg.actions && (
                            <div className="mt-2 space-y-1.5 w-full">
                              {msg.actions.map((a, j) => (
                                <div key={j} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                                  {a.status === 'done' ? <CheckCircle size={12} className="text-green-500 flex-shrink-0" /> : a.status === 'running' ? <Clock size={12} className="text-amber-500 flex-shrink-0 animate-spin" /> : <Clock size={12} className="text-gray-300 flex-shrink-0" />}
                                  <p className="text-xs text-gray-600">{a.label}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-gray-300 mt-1">{msg.timestamp}</p>
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black" style={{ backgroundColor: '#1A3555' }}>
                            SA
                          </div>
                        )}
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                          <Brain size={14} className="text-white" />
                        </div>
                        <div className="bg-gray-50 rounded-2xl rounded-tl-sm border border-gray-100 px-4 py-3">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="border-t border-gray-100 p-3">
                    <div className="flex gap-2">
                      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask ARIA anything or give it a task to execute..." className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-100" />
                      <button onClick={sendMessage} disabled={isProcessing} className="px-4 py-2.5 rounded-xl text-white cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all" style={{ background: isProcessing ? '#9CA3AF' : 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                        <Send size={14} /> Send
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Suggested Tasks</p>
                  <div className="grid grid-cols-3 gap-2">
                    {suggestedPrompts.map(p => (
                      <button key={p} onClick={() => setInput(p)} className="text-left px-3 py-2.5 bg-gray-50 rounded-xl text-xs text-gray-600 hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition-colors border border-transparent hover:border-purple-100 font-medium">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'tasks' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Agent Task Execution Log</h2>
                  <p className="text-xs text-gray-400">All tasks executed by ARIA today — 16 Mar 2026</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {taskLog.map(t => (
                    <div key={t.id} className="px-4 py-3.5 flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.status === 'completed' ? 'bg-green-500' : 'bg-amber-400 animate-pulse'}`} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{t.task}</p>
                        <p className="text-xs text-gray-400">{t.id} · {t.time}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{t.status === 'completed' ? 'Completed' : 'Running'}</span>
                        <p className="text-xs text-gray-400 mt-1">{t.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Agent Configuration</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Auto-approve leave requests below 2 days (Supervisors)', enabled: true },
                    { label: 'Send WhatsApp alerts for payroll anomalies automatically', enabled: true },
                    { label: 'Auto-generate monthly payroll register on 1st of each month', enabled: false },
                    { label: 'Escalate unresolved disciplinary cases after 30 days', enabled: true },
                    { label: 'Send IT declaration reminders 7 days before deadline', enabled: true },
                    { label: 'Auto-draft retirement orders 90 days before superannuation', enabled: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                      <p className="text-sm text-gray-700">{s.label}</p>
                      <div className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative ${s.enabled ? 'bg-purple-600' : 'bg-gray-200'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${s.enabled ? 'left-5' : 'left-1'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                  <Brain size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-sm">ARIA v2.1</p>
                  <p className="text-xs text-purple-600">GPT-4o · Fine-tuned on GHMC policy</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Queries Resolved', value: '1,842', color: '#8B5CF6' },
                  { label: 'Tasks Executed', value: '284', color: '#10B981' },
                  { label: 'Notifications Sent', value: '3,120', color: '#E69B30' },
                  { label: 'Avg Response Time', value: '1.8s', color: '#3B82F6' },
                ].map(s => (
                  <div key={s.label} className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                    <span className="text-gray-400">{s.label}</span>
                    <span className="font-black" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <p className="font-bold text-gray-900 text-sm mb-3">Agent Capabilities</p>
              <div className="space-y-2">
                {agentCapabilities.map(c => (
                  <div key={c.label} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c.color}15` }}>
                      <c.icon size={13} style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{c.label}</p>
                      <p className="text-xs text-gray-400 leading-tight">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-4 text-white">
              <Sparkles size={18} className="mb-2" />
              <p className="font-black text-sm mb-1">Future: ARIA v3.0</p>
              <p className="text-xs opacity-80">Multi-agent orchestration, voice commands via WhatsApp, predictive hiring recommendations, and autonomous payroll certification.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
