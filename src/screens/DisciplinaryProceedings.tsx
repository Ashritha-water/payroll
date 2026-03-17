'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Shield, AlertCircle, CheckCircle, Clock, Search, Download, Filter, FileText, User, ChevronRight, Eye, Edit3 } from 'lucide-react'
import { Link } from '@/lib'

const cases = [
  { caseNo: 'GHMC/DISC/2025/041', name: 'P. Suresh Babu', empId: 'GHMC-008123', designation: 'Revenue Inspector', zone: 'Secunderabad', chargeDate: '15-Nov-2025', charge: 'Unauthorized absence for more than 8 days without permission', stage: 'Enquiry in Progress', enquiryOfficer: 'Dy. Commr. S. Raju', nextDate: '20-Mar-2026', severity: 'major' },
  { caseNo: 'GHMC/DISC/2025/038', name: 'T. Nagaraju', empId: 'GHMC-012340', designation: 'Junior Asst.', zone: 'LB Nagar', chargeDate: '02-Oct-2025', charge: 'Submission of false medical certificates on 4 occasions', stage: 'Charge Sheet Issued', enquiryOfficer: 'Not Appointed', nextDate: '25-Mar-2026', severity: 'major' },
  { caseNo: 'GHMC/DISC/2025/031', name: 'V. Krishnaveni', empId: 'GHMC-019812', designation: 'Senior Clerk', zone: 'Khairatabad', chargeDate: '10-Aug-2025', charge: 'Insubordination and misconduct towards senior officer', stage: 'Report Submitted', enquiryOfficer: 'Asst. Commr. K. Prasad', nextDate: '18-Mar-2026', severity: 'minor' },
  { caseNo: 'GHMC/DISC/2024/112', name: 'M. Srinath Reddy', empId: 'GHMC-005671', designation: 'Health Inspector', zone: 'Malkajgiri', chargeDate: '14-Apr-2024', charge: 'Corruption — accepting bribe from food vendor', stage: 'Penalty Order Issued', enquiryOfficer: 'Commr. Office', nextDate: '—', severity: 'corruption' },
  { caseNo: 'GHMC/DISC/2024/098', name: 'B. Ramu', empId: 'GHMC-022341', designation: 'Sanitary Worker', zone: 'Uppal', chargeDate: '12-Feb-2024', charge: 'Habitual late attendance and absenteeism', stage: 'Appeal Pending', enquiryOfficer: 'Dy. Commr. L. Naidu', nextDate: '28-Mar-2026', severity: 'minor' },
  { caseNo: 'GHMC/DISC/2023/087', name: 'S. Padmakar', empId: 'GHMC-031245', designation: 'Town Planning Asst.', zone: 'Kukatpally', chargeDate: '05-Nov-2023', charge: 'Dereliction of duty — approving unauthorized construction', stage: 'Closed — Censure Awarded', enquiryOfficer: 'Completed', nextDate: '—', severity: 'closed' },
]

const stageColor: Record<string, { bg: string; text: string }> = {
  'Charge Sheet Issued': { bg: 'bg-amber-50', text: 'text-amber-700' },
  'Enquiry in Progress': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Report Submitted': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Penalty Order Issued': { bg: 'bg-red-50', text: 'text-red-600' },
  'Appeal Pending': { bg: 'bg-orange-50', text: 'text-orange-700' },
  'Closed — Censure Awarded': { bg: 'bg-green-50', text: 'text-green-700' },
}

const severityColor: Record<string, { dot: string; label: string }> = {
  major: { dot: 'bg-red-500', label: 'Major Penalty' },
  minor: { dot: 'bg-amber-400', label: 'Minor Penalty' },
  corruption: { dot: 'bg-red-800', label: 'Corruption' },
  closed: { dot: 'bg-gray-300', label: 'Closed' },
}

const penaltyTypes = [
  { penalty: 'Censure', count: 12, color: '#E69B30' },
  { penalty: 'Withholding Increment', count: 8, color: '#E35A4A' },
  { penalty: 'Recovery of Losses', count: 3, color: '#8B5CF6' },
  { penalty: 'Reduction in Rank', count: 2, color: '#EF4444' },
  { penalty: 'Compulsory Retirement', count: 1, color: '#1A3555' },
  { penalty: 'Dismissal', count: 1, color: '#111827' },
]

const vigilanceClearance = [
  { name: 'K. Venkateswara Rao', empId: 'GHMC-004892', designation: 'Executive Engineer', appliedFor: 'Promotion — SE', date: '10-Mar-2026', status: 'clear' },
  { name: 'R. Annapurna Devi', empId: 'GHMC-007891', designation: 'Town Planning Officer', appliedFor: 'NOC for Deputation', date: '08-Mar-2026', status: 'clear' },
  { name: 'T. Nagaraju', empId: 'GHMC-012340', designation: 'Junior Assistant', appliedFor: 'Promotion — Senior Asst.', date: '05-Mar-2026', status: 'hold' },
]

const flowStages = [
  'Complaint Received', 'Preliminary Enquiry', 'Charge Sheet', 'Enquiry Officer Appointed', 'Departmental Enquiry', 'Report to Authority', 'Penalty Order', 'Appeal / Revision',
]

export default function DisciplinaryProceedings() {
  const [tab, setTab] = useState<'register' | 'vigilance' | 'statistics' | 'flow'>('register')
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Disciplinary Proceedings" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Quick Module Nav */}
        <div className="flex gap-2 mb-5">
          {[
            { label: 'Employee Profile', to: '/EmployeeProfile' },
            { label: 'Service Book', to: '/ServiceBook' },
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Promotion & Transfer', to: '/PromotionTransfer' },
            { label: 'Disciplinary', to: '/DisciplinaryProceedings', active: true },
            { label: 'Retirement', to: '/RetirementPipeline' },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Disciplinary Proceedings</h1>
            <p className="text-sm text-gray-500 mt-0.5">GHMC Conduct, CCA & Appeal Management</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export Register
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <FileText size={14} /> Initiate Proceeding
            </button>
          </div>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-5 gap-4 mb-5">
          {[
            { label: 'Active Cases', value: '27', sub: 'FY 2025-26', color: '#E35A4A', bg: 'bg-red-50' },
            { label: 'Charge Sheets Issued', value: '14', sub: 'Pending enquiry', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Enquiry in Progress', value: '8', sub: 'Across zones', color: '#3B82F6', bg: 'bg-blue-50' },
            { label: 'Penalty Orders', value: '27', sub: 'This FY', color: '#8B5CF6', bg: 'bg-purple-50' },
            { label: 'Vigilance Clear (Pending)', value: '3', sub: 'Requests pending', color: '#10B981', bg: 'bg-green-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-8 h-8 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <Shield size={15} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'register', label: 'Case Register' },
            { key: 'vigilance', label: 'Vigilance Clearance' },
            { key: 'statistics', label: 'Penalty Statistics' },
            { key: 'flow', label: 'Proceedings Flow' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'register' && (
          <div className="grid grid-cols-3 gap-4">
            <div className={`${selectedCase ? 'col-span-2' : 'col-span-3'} bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden`}>
              <div className="p-4 border-b border-gray-100 flex gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search case or employee..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Filter size={13} /> Filter</button>
              </div>
              <div className="divide-y divide-gray-50">
                {cases.map(c => {
                  const sc = severityColor[c.severity]
                  const stc = stageColor[c.stage]
                  return (
                    <div key={c.caseNo} className={`px-4 py-3 cursor-pointer hover:bg-blue-50/30 transition-colors ${selectedCase?.caseNo === c.caseNo ? 'bg-blue-50' : ''}`} onClick={() => setSelectedCase(selectedCase?.caseNo === c.caseNo ? null : c)}>
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <div className={`w-2.5 h-2.5 rounded-full ${sc.dot}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{c.name} <span className="text-xs text-gray-400 font-normal">· {c.empId}</span></p>
                              <p className="text-xs text-gray-500">{c.designation} · {c.zone} Zone</p>
                            </div>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${stc.bg} ${stc.text}`}>{c.stage}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1.5 line-clamp-1">{c.charge}</p>
                          <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-400">
                            <span>{c.caseNo}</span>
                            <span>Filed: {c.chargeDate}</span>
                            {c.nextDate !== '—' && <span className="text-blue-600 font-medium">Next: {c.nextDate}</span>}
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {selectedCase && (
              <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-900 text-sm">Case Details</h3>
                  <button onClick={() => setSelectedCase(null)} className="text-gray-400 text-xs cursor-pointer hover:text-gray-600">Close</button>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-gray-400 font-semibold mb-0.5 uppercase tracking-wide">Case Number</p>
                    <p className="font-bold text-gray-900">{selectedCase.caseNo}</p>
                  </div>
                  <div className={`p-3 rounded-xl flex items-center gap-2 ${stageColor[selectedCase.stage].bg}`}>
                    <div className="flex-1">
                      <p className={`font-bold ${stageColor[selectedCase.stage].text}`}>{selectedCase.stage}</p>
                      <p className="text-gray-500 mt-0.5">Current Stage</p>
                    </div>
                  </div>
                  {[
                    ['Employee', selectedCase.name],
                    ['Designation', selectedCase.designation],
                    ['Zone', selectedCase.zone],
                    ['Charge Date', selectedCase.chargeDate],
                    ['Enquiry Officer', selectedCase.enquiryOfficer],
                    ['Next Hearing', selectedCase.nextDate],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between items-start border-b border-gray-50 pb-2 last:border-0">
                      <span className="text-gray-400 font-medium">{l}</span>
                      <span className="font-semibold text-gray-800 text-right max-w-32">{v}</span>
                    </div>
                  ))}
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <p className="text-gray-400 font-semibold mb-0.5 uppercase tracking-wide">Charge</p>
                    <p className="text-amber-800 font-medium leading-relaxed">{selectedCase.charge}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-2 rounded-lg text-white text-xs font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Update Stage</button>
                    <button className="flex-1 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 cursor-pointer hover:bg-gray-50">View Files</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'vigilance' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Vigilance Clearance Requests</h2>
                <p className="text-xs text-gray-400 mt-0.5">Pending requests for promotion, deputation, and passport NOC</p>
              </div>
              <div className="divide-y divide-gray-50">
                {vigilanceClearance.map(v => (
                  <div key={v.empId} className="px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                      {v.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{v.name}</p>
                      <p className="text-xs text-gray-400">{v.designation} · {v.empId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Purpose</p>
                      <p className="text-sm font-semibold text-gray-800">{v.appliedFor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Requested</p>
                      <p className="text-sm text-gray-700">{v.date}</p>
                    </div>
                    <div>
                      {v.status === 'clear' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full"><CheckCircle size={12} /> Clear</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full"><AlertCircle size={12} /> On Hold</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {v.status === 'clear' ? (
                        <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Issue Certificate</button>
                      ) : (
                        <button className="text-xs px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-semibold cursor-pointer">Case Pending</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'statistics' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Penalty Type Distribution (Last 3 Years)</h2>
              <div className="space-y-3">
                {penaltyTypes.map(p => (
                  <div key={p.penalty} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 w-48 flex-shrink-0">{p.penalty}</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-lg relative overflow-hidden">
                      <div className="h-6 rounded-lg flex items-center justify-end pr-2" style={{ width: `${(p.count / 12) * 100}%`, backgroundColor: p.color }}>
                        <span className="text-xs font-bold text-white">{p.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Zone-wise Cases</h2>
                <div className="space-y-2">
                  {[
                    { zone: 'Serilingampally', cases: 6 },
                    { zone: 'Secunderabad', cases: 5 },
                    { zone: 'Charminar', cases: 4 },
                    { zone: 'Kukatpally', cases: 4 },
                    { zone: 'LB Nagar', cases: 4 },
                    { zone: 'Khairatabad', cases: 3 },
                    { zone: 'Malkajgiri', cases: 3 },
                    { zone: 'Uppal', cases: 2 },
                  ].map(z => (
                    <div key={z.zone} className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600 w-36 flex-shrink-0">{z.zone}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full" style={{ width: `${(z.cases / 6) * 100}%`, backgroundColor: '#1A3555' }} />
                      </div>
                      <span className="font-bold text-gray-800 w-4">{z.cases}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-800 text-sm">Time Limit Alert</p>
                  <p className="text-xs text-amber-700 mt-0.5">3 cases have exceeded the 12-month statutory time limit for departmental enquiry completion. Immediate action required per AP CCA Rules.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'flow' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-1">Departmental Proceedings — Process Flow</h2>
            <p className="text-xs text-gray-400 mb-8">As per GHMC Service Rules & AP CCA Rules 1991</p>
            <div className="flex items-start gap-0 overflow-x-auto pb-4">
              {flowStages.map((stage, i) => (
                <div key={stage} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black ${i < 5 ? 'text-white' : 'text-gray-400 bg-gray-100 border-2 border-gray-200'}`} style={i < 5 ? { backgroundColor: '#1A3555' } : {}}>
                      {i + 1}
                    </div>
                    <p className="text-xs font-semibold text-center mt-2 text-gray-700 w-24 leading-tight">{stage}</p>
                  </div>
                  {i < flowStages.length - 1 && (
                    <div className={`w-16 h-0.5 mb-6 flex-shrink-0 ${i < 4 ? 'bg-blue-900' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { title: 'Minor Penalty Proceedings', steps: ['Issue Show Cause Notice', 'Receive Written Explanation', 'Personal Hearing (Optional)', 'Issue Penalty Order'], color: '#E69B30' },
                { title: 'Major Penalty Proceedings', steps: ['Frame Charge Sheet', 'Receive Written Defense', 'Appoint Enquiry Officer', 'Conduct Enquiry', 'Pass Penalty Order', 'Appeal to Appellate Authority'], color: '#E35A4A' },
                { title: 'Timelines (Statutory Limits)', steps: ['Investigation: 3 months', 'Charge Sheet to Defense: 30 days', 'Enquiry completion: 6 months', 'Penalty Order: Within 30 days', 'Appeal Decision: 6 months'], color: '#1A3555' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-xl" style={{ backgroundColor: `${item.color}10`, borderLeft: `3px solid ${item.color}` }}>
                  <p className="text-sm font-bold mb-2" style={{ color: item.color }}>{item.title}</p>
                  <div className="space-y-1.5">
                    {item.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-xs font-bold flex-shrink-0" style={{ color: item.color }}>{i + 1}.</span>
                        <span className="text-xs text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
