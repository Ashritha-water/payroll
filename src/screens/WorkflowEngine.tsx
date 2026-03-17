'use client'
import React, { useState } from 'react'
import Components from '../components'
import { GitBranch, Clock, CheckCircle, AlertCircle, ChevronRight, Plus, Play, Pause, Settings, Users, ArrowRight, Filter } from 'lucide-react'

const workflowTypes = [
  {
    id: 'leave', name: 'Leave Application', module: 'Leave Management', activeCount: 142,
    stages: ['Employee Applies', 'Supervisor Review', 'HR Verification', 'HOD Approval', 'Auto-Credit'],
    sla: 2, avgTime: 1.4, breached: 3, color: '#10B981',
  },
  {
    id: 'payroll', name: 'Monthly Payroll Run', module: 'Payroll', activeCount: 1,
    stages: ['Input Finalization', 'Calculation Engine', 'DDO Review', 'Treasury Upload', 'Bank Credit'],
    sla: 5, avgTime: 4.2, breached: 0, color: '#3B82F6',
  },
  {
    id: 'travel', name: 'TA/DA Claim', module: 'Claims & Travel', activeCount: 38,
    stages: ['Employee Submit', 'Controlling Officer', 'Accounts Review', 'DDO Sanction', 'Payment'],
    sla: 15, avgTime: 11.8, breached: 6, color: '#E69B30',
  },
  {
    id: 'medical', name: 'Medical Reimbursement', module: 'Medical Claims', activeCount: 24,
    stages: ['Claim Submission', 'Docs Verification', 'Medical Officer', 'HOD Approval', 'Payment'],
    sla: 30, avgTime: 22.4, breached: 2, color: '#8B5CF6',
  },
  {
    id: 'promo', name: 'Promotion / DPC', module: 'Promotion & Transfer', activeCount: 12,
    stages: ['Vacancy Notification', 'DPC Constitution', 'Seniority Review', 'Govt. Order', 'Posting'],
    sla: 90, avgTime: 68, breached: 4, color: '#E35A4A',
  },
  {
    id: 'disc', name: 'Disciplinary Proceedings', module: 'Disciplinary', activeCount: 8,
    stages: ['Charge Sheet', 'Show Cause', 'Enquiry Officer', 'Report Submission', 'Penalty Order'],
    sla: 180, avgTime: 142, breached: 2, color: '#F97316',
  },
  {
    id: 'recruit', name: 'Recruitment Onboarding', module: 'Recruitment', activeCount: 5,
    stages: ['Vacancy Post', 'Applications', 'Shortlisting', 'Interview', 'Offer & Join'],
    sla: 60, avgTime: 48, breached: 0, color: '#06B6D4',
  },
]

const activeInstances = [
  { id: 'WF-2026-4291', workflow: 'Leave Application', employee: 'T. Lakshmi Devi', stage: 'HOD Approval', daysElapsed: 1, slaDays: 2, status: 'on_track', zone: 'Kukatpally' },
  { id: 'WF-2026-4288', workflow: 'TA/DA Claim', employee: 'M. Suresh Kumar', stage: 'Accounts Review', daysElapsed: 14, slaDays: 15, status: 'at_risk', zone: 'Secunderabad' },
  { id: 'WF-2026-4280', workflow: 'Medical Reimbursement', employee: 'B. Sravanthi', stage: 'Medical Officer', daysElapsed: 12, slaDays: 30, status: 'on_track', zone: 'LB Nagar' },
  { id: 'WF-2026-4271', workflow: 'TA/DA Claim', employee: 'K. Venugopal', stage: 'DDO Sanction', daysElapsed: 18, slaDays: 15, status: 'breached', zone: 'Charminar' },
  { id: 'WF-2026-4265', workflow: 'Disciplinary Proceedings', employee: 'P. Anjaneyulu', stage: 'Enquiry Officer', daysElapsed: 160, slaDays: 180, status: 'at_risk', zone: 'Malkajgiri' },
  { id: 'WF-2026-4242', workflow: 'Promotion / DPC', employee: 'S. Padmavathi (Group)', stage: 'DPC Constitution', daysElapsed: 92, slaDays: 90, status: 'breached', zone: 'All Zones' },
]

const escalationRules = [
  { trigger: 'Leave pending > SLA', action: 'Auto-email to HOD + HR Head', active: true },
  { trigger: 'TA/DA pending > 20 days', action: 'WhatsApp alert to DDO + Zone Commissioner', active: true },
  { trigger: 'Medical claim pending > 45 days', action: 'Escalate to Commissioner office', active: true },
  { trigger: 'Disciplinary case > 6 months', action: 'Flag in AI Dashboard + compliance alert', active: false },
  { trigger: 'Payroll input not submitted by 20th', action: 'SMS to all Zone Finance Officers', active: true },
]

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  on_track: { label: 'On Track', bg: 'bg-green-50', text: 'text-green-700' },
  at_risk: { label: 'At Risk', bg: 'bg-amber-50', text: 'text-amber-700' },
  breached: { label: 'SLA Breached', bg: 'bg-red-50', text: 'text-red-700' },
}

export default function WorkflowEngine() {
  const [activeTab, setActiveTab] = useState<'overview' | 'instances' | 'escalations' | 'builder'>('overview')
  const [selectedWF, setSelectedWF] = useState<typeof workflowTypes[0] | null>(workflowTypes[0])

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Administration" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workflow Engine</h1>
            <p className="text-sm text-gray-500 mt-0.5">HR process flows · SLA tracking · Escalation rules · 7 active workflow types</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setActiveTab('builder')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={14} /> New Workflow
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Active Instances', value: '230', sub: 'Across all workflow types', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'SLA Breached', value: '12', sub: 'Require immediate action', color: '#E35A4A', bg: 'bg-red-50' },
            { label: 'At Risk (Near SLA)', value: '28', sub: 'Within 20% of deadline', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Completed Today', value: '64', sub: 'All workflow types', color: '#10B981', bg: 'bg-green-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <GitBranch size={17} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[{ key: 'overview', label: 'Workflow Types' }, { key: 'instances', label: 'Active Instances' }, { key: 'escalations', label: 'Escalation Rules' }, { key: 'builder', label: 'Workflow Builder' }].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${activeTab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={activeTab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              {workflowTypes.map(wf => (
                <div key={wf.id} onClick={() => setSelectedWF(wf)} className={`bg-white rounded-xl shadow-sm border p-4 cursor-pointer transition-all hover:shadow-md ${selectedWF?.id === wf.id ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${wf.color}15` }}>
                      <GitBranch size={15} style={{ color: wf.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{wf.name}</p>
                      <p className="text-xs text-gray-400">{wf.module}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black" style={{ color: wf.color }}>{wf.activeCount}</p>
                      <p className="text-xs text-gray-400">active</p>
                    </div>
                  </div>
                  {wf.breached > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                      <AlertCircle size={11} /> {wf.breached} SLA breached
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-2">
              {selectedWF && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-black text-gray-900">{selectedWF.name}</h2>
                      <p className="text-xs text-gray-400">{selectedWF.module} · SLA: {selectedWF.sla} working days</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-right px-3 py-2 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-400">Avg Completion</p>
                        <p className="text-sm font-black text-gray-800">{selectedWF.avgTime} days</p>
                      </div>
                      <div className="text-right px-3 py-2 bg-red-50 rounded-xl">
                        <p className="text-xs text-gray-400">Breached</p>
                        <p className="text-sm font-black text-red-600">{selectedWF.breached}</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual pipeline */}
                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Process Flow</p>
                    <div className="flex items-center gap-0">
                      {selectedWF.stages.map((stage, i) => (
                        <React.Fragment key={stage}>
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ backgroundColor: i <= 2 ? selectedWF.color : '#E5E7EB', color: i <= 2 ? 'white' : '#9CA3AF' }}>
                              {i <= 2 ? <CheckCircle size={14} /> : <span>{i + 1}</span>}
                            </div>
                            <p className="text-xs text-gray-600 text-center mt-1.5 max-w-20 leading-tight">{stage}</p>
                          </div>
                          {i < selectedWF.stages.length - 1 && (
                            <div className="flex-1 h-0.5 mx-1 mb-5" style={{ backgroundColor: i < 2 ? selectedWF.color : '#E5E7EB' }} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Stage Bottleneck Analysis</p>
                      {selectedWF.stages.map((stage, i) => {
                        const pct = [45, 25, 15, 10, 5][i] || 5
                        return (
                          <div key={stage} className="mb-2.5">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">{stage}</span>
                              <span className="font-bold text-gray-800">{pct}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: selectedWF.color }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">SLA Performance</p>
                      <div className="relative w-28 h-28 mx-auto">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                          <circle cx="50" cy="50" r="38" fill="none" stroke={selectedWF.color} strokeWidth="10"
                            strokeDasharray={`${(selectedWF.avgTime / selectedWF.sla) * 238} 238`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <p className="text-lg font-black text-gray-900">{Math.round((selectedWF.avgTime / selectedWF.sla) * 100)}%</p>
                          <p className="text-xs text-gray-400">SLA Used</p>
                        </div>
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-1">{selectedWF.avgTime} / {selectedWF.sla} days avg</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'instances' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Active Workflow Instances</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
                <Filter size={11} /> Filter
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {activeInstances.map(inst => {
                const sc = statusConfig[inst.status]
                const pct = Math.min((inst.daysElapsed / inst.slaDays) * 100, 100)
                const barColor = inst.status === 'breached' ? '#E35A4A' : inst.status === 'at_risk' ? '#E69B30' : '#10B981'
                return (
                  <div key={inst.id} className="px-4 py-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-gray-900 text-sm">{inst.employee}</p>
                          <span className="text-xs text-gray-400">{inst.id}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500 mb-2">
                          <span className="font-medium text-gray-700">{inst.workflow}</span>
                          <span>Stage: <strong className="text-gray-800">{inst.stage}</strong></span>
                          <span>Zone: {inst.zone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full">
                            <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                          </div>
                          <span className="text-xs font-bold text-gray-700 w-24 text-right">{inst.daysElapsed}/{inst.slaDays} days</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {inst.status === 'breached' && (
                          <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer bg-red-500">Escalate</button>
                        )}
                        <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">View</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'escalations' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Escalation Rules</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                <Plus size={12} /> Add Rule
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {escalationRules.map((rule, i) => (
                <div key={i} className="px-4 py-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${rule.active ? 'bg-green-50' : 'bg-gray-100'}`}>
                    <AlertCircle size={16} style={{ color: rule.active ? '#10B981' : '#9CA3AF' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{rule.trigger}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5"><ArrowRight size={10} /> {rule.action}</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full cursor-pointer relative transition-colors ${rule.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${rule.active ? 'left-5' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Workflow Builder</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Workflow Name</label>
                  <input type="text" placeholder="e.g. GPF Advance Request" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Module</label>
                  <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
                    <option>Payroll</option><option>Leave Management</option><option>Claims & Travel</option>
                    <option>Terminal Benefits</option><option>Disciplinary</option><option>Recruitment</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">SLA (Working Days)</label>
                  <input type="number" placeholder="e.g. 7" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Notification Channel</label>
                  <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
                    <option>WhatsApp + Email</option><option>Email only</option><option>SMS only</option><option>All channels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Escalation After</label>
                  <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
                    <option>SLA breach</option><option>80% of SLA</option><option>Custom rule</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Approval Stages (drag to reorder)</label>
                <div className="space-y-2">
                  {['Stage 1: Employee Initiates', 'Stage 2: Direct Supervisor', 'Stage 3: HR Department', 'Stage 4: Final Authority'].map((stage, i) => (
                    <div key={stage} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 border-dashed cursor-move">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: '#1A3555' }}>{i + 1}</div>
                      <input defaultValue={stage} className="flex-1 bg-transparent text-sm text-gray-700 outline-none" />
                      <Settings size={13} className="text-gray-400 cursor-pointer" />
                    </div>
                  ))}
                  <button className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 cursor-pointer hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-1.5">
                    <Plus size={13} /> Add Stage
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                  <Play size={13} /> Activate Workflow
                </button>
                <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Save Draft</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
