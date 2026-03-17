'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Users, Search, Download, Filter, CheckCircle, Clock, AlertCircle, FileText, Plus, ChevronRight, User, Briefcase, Mail } from 'lucide-react'
import { Link } from '@/lib'

const vacancies = [
  { post: 'Assistant Engineer (Civil)', dept: 'Engineering', total: 45, filled: 0, reserved: { OC: 18, BC_A: 9, BC_B: 5, BC_C: 2, BC_D: 5, SC: 4, ST: 2 }, payScale: '₹47,000 — ₹1,25,000', notification: 'GHMC/REC/2025/015', status: 'Recruitment Open', closingDate: '30-Mar-2026' },
  { post: 'Junior Health Inspector', dept: 'Health', total: 120, filled: 0, reserved: { OC: 48, BC_A: 24, BC_B: 14, BC_C: 6, BC_D: 14, SC: 9, ST: 5 }, payScale: '₹26,600 — ₹77,300', notification: 'GHMC/REC/2025/016', status: 'Applications Under Review', closingDate: '15-Feb-2026' },
  { post: 'Revenue Inspector', dept: 'Revenue', total: 60, filled: 0, reserved: { OC: 24, BC_A: 12, BC_B: 7, BC_C: 3, BC_D: 7, SC: 5, ST: 2 }, payScale: '₹35,120 — ₹87,130', notification: 'GHMC/REC/2025/012', status: 'Selection In Progress', closingDate: '31-Jan-2026' },
  { post: 'Town Planning Assistant', dept: 'Town Planning', total: 28, filled: 0, reserved: { OC: 11, BC_A: 6, BC_B: 3, BC_C: 1, BC_D: 3, SC: 3, ST: 1 }, payScale: '₹47,000 — ₹1,25,000', notification: 'GHMC/REC/2024/098', status: 'Offer Letters Issued', closingDate: '15-Dec-2024' },
  { post: 'Sanitary Worker / Ward Boy', dept: 'Sanitation', total: 380, filled: 0, reserved: { OC: 114, BC_A: 76, BC_B: 57, BC_C: 19, BC_D: 57, SC: 38, ST: 19 }, payScale: '₹21,230 — ₹63,010', notification: 'GHMC/REC/2025/019', status: 'Recruitment Open', closingDate: '30-Apr-2026' },
]

const pipeline = [
  { stage: 'Applications Received', count: 18420, color: '#1A3555' },
  { stage: 'Shortlisted', count: 3840, color: '#3B82F6' },
  { stage: 'Written Test', count: 2160, color: '#E69B30' },
  { stage: 'Skill Test / Interview', count: 840, color: '#8B5CF6' },
  { stage: 'Document Verification', count: 320, color: '#10B981' },
  { stage: 'Offer Issued', count: 168, color: '#22C55E' },
]

const onboardees = [
  { name: 'Priya Sharma K.', empId: 'GHMC-NEW-001', post: 'Assistant Engineer (Civil)', joiningDate: '01-Apr-2026', zone: 'Serilingampally', docVerification: 95, tasksCompleted: 8, totalTasks: 12, status: 'In Progress' },
  { name: 'Ravi Teja M.', empId: 'GHMC-NEW-002', post: 'Junior Health Inspector', joiningDate: '01-Apr-2026', zone: 'Secunderabad', docVerification: 80, tasksCompleted: 5, totalTasks: 12, status: 'Pending Documents' },
  { name: 'Sunitha Bai R.', empId: 'GHMC-NEW-003', post: 'Revenue Inspector', joiningDate: '15-Mar-2026', zone: 'LB Nagar', docVerification: 100, tasksCompleted: 12, totalTasks: 12, status: 'Completed' },
  { name: 'Kiran Kumar P.', empId: 'GHMC-NEW-004', post: 'Town Planning Asst.', joiningDate: '15-Mar-2026', zone: 'Kukatpally', docVerification: 100, tasksCompleted: 11, totalTasks: 12, status: 'Near Complete' },
]

const onboardingChecklist = [
  { task: 'Appointment Order Issued', category: 'Documents', done: true },
  { task: 'Employee ID & HRMS Account Created', category: 'IT Setup', done: true },
  { task: 'Service Book Initialized', category: 'Service Records', done: true },
  { task: 'GPF Account Opened', category: 'Finance', done: true },
  { task: 'NPS Registration', category: 'Finance', done: true },
  { task: 'Salary Account — Bank Mandate Form', category: 'Finance', done: true },
  { task: 'Biometric Enrollment', category: 'IT Setup', done: true },
  { task: 'PAN & Aadhaar Linking', category: 'Tax', done: true },
  { task: 'Photo & Signature Upload', category: 'Documents', done: false },
  { task: 'Caste Certificate Verification', category: 'Documents', done: false },
  { task: 'Character Certificate Submission', category: 'Documents', done: false },
  { task: 'Medical Fitness Certificate', category: 'Health', done: false },
]

const statusStyle: Record<string, { bg: string; text: string }> = {
  'Recruitment Open': { bg: 'bg-green-50', text: 'text-green-700' },
  'Applications Under Review': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Selection In Progress': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Offer Letters Issued': { bg: 'bg-amber-50', text: 'text-amber-700' },
}

export default function RecruitmentOnboarding() {
  const [tab, setTab] = useState<'vacancies' | 'pipeline' | 'onboarding' | 'checklist'>('vacancies')
  const [selectedOnboardee, setSelectedOnboardee] = useState(onboardees[0])

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Recruitment" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruitment & Onboarding</h1>
            <p className="text-sm text-gray-500 mt-0.5">GHMC Vacancy Management, Recruitment Drives & New Joinee Onboarding</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={14} /> Add Vacancy
            </button>
          </div>
        </div>

        {/* Quick Module Nav */}
        <div className="flex gap-2 mb-5">
          {[
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Promotion & Transfer', to: '/PromotionTransfer' },
            { label: 'Roster Management', to: '/RosterManagement' },
            { label: 'Recruitment', to: '/RecruitmentOnboarding', active: true },
            { label: 'Disciplinary', to: '/DisciplinaryProceedings' },
            { label: 'Retirement Pipeline', to: '/RetirementPipeline' },
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

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Total Vacancies', value: '633', sub: 'Active recruitment drives', color: '#1A3555', bg: 'bg-blue-50', icon: Briefcase },
            { label: 'Applications', value: '18,420', sub: 'Across all drives', color: '#8B5CF6', bg: 'bg-purple-50', icon: FileText },
            { label: 'Offers Issued', value: '168', sub: 'Pending joining', color: '#E69B30', bg: 'bg-amber-50', icon: Mail },
            { label: 'New Joiners (Mar 2026)', value: '42', sub: 'Onboarding in progress', color: '#10B981', bg: 'bg-green-50', icon: Users },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <k.icon size={17} style={{ color: k.color }} />
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
            { key: 'vacancies', label: 'Vacancy Register' },
            { key: 'pipeline', label: 'Applicant Pipeline' },
            { key: 'onboarding', label: 'Onboarding Tracker' },
            { key: 'checklist', label: 'Onboarding Checklist' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'vacancies' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search post or department..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Filter size={13} />Filter</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Post / Notification', 'Department', 'Vacancies', 'Reservation (OC/BC/SC/ST)', 'Pay Scale', 'Closing Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vacancies.map(v => {
                  const ss = statusStyle[v.status] || { bg: 'bg-gray-50', text: 'text-gray-600' }
                  return (
                    <tr key={v.notification} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-gray-900 text-sm">{v.post}</p>
                        <p className="text-xs text-blue-600 font-medium">{v.notification}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.dept}</td>
                      <td className="px-4 py-3">
                        <span className="text-2xl font-black text-gray-900">{v.total}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(v.reserved).map(([cat, count]) => (
                            <span key={cat} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">{cat.replace('_', '-')}:{count}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 font-medium">{v.payScale}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.closingDate}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ss.bg} ${ss.text}`}>{v.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50">View</button>
                          <button className="text-xs px-2.5 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Manage</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'pipeline' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-1">Applicant Recruitment Funnel</h2>
              <p className="text-xs text-gray-400 mb-5">Junior Health Inspector Drive — GHMC/REC/2025/016</p>
              <div className="flex gap-4 justify-center">
                {pipeline.map((p, i) => (
                  <div key={p.stage} className="flex flex-col items-center">
                    <div className="w-24 rounded-t-xl flex items-center justify-center text-white font-black text-lg" style={{ height: `${(p.count / 18420) * 180 + 40}px`, backgroundColor: p.color, opacity: 1 - i * 0.06 }}>
                      {p.count.toLocaleString()}
                    </div>
                    <div className="w-24 h-0 border-l-[48px] border-r-[48px] border-t-[12px] border-l-transparent border-r-transparent" style={{ borderTopColor: p.color, opacity: 1 - i * 0.06 }} />
                    <p className="text-xs text-center text-gray-600 font-semibold mt-2 w-24">{p.stage}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Shortlisting Ratio', value: '1 in 4.8', sub: '20.8% shortlisted', note: 'Applications → Shortlisted' },
                { label: 'Written Test Pass Rate', value: '56.2%', sub: '2,160 cleared', note: 'Shortlisted → Written Test' },
                { label: 'Final Offer Rate', value: '0.91%', sub: '168 of 18,420', note: 'Overall selection rate' },
              ].map(m => (
                <div key={m.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 font-semibold mb-1">{m.note}</p>
                  <p className="text-2xl font-black text-gray-900">{m.value}</p>
                  <p className="text-xs font-semibold text-gray-700 mt-0.5">{m.label}</p>
                  <p className="text-xs text-gray-400">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'onboarding' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              {onboardees.map(o => (
                <div key={o.empId} onClick={() => setSelectedOnboardee(o)} className={`bg-white rounded-xl shadow-sm border p-4 cursor-pointer transition-colors ${selectedOnboardee.empId === o.empId ? 'border-blue-300 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{o.name}</p>
                      <p className="text-xs text-gray-400">{o.post}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${o.status === 'Completed' ? 'bg-green-50 text-green-700' : o.status === 'Pending Documents' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>{o.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${(o.tasksCompleted / o.totalTasks) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{o.tasksCompleted}/{o.totalTasks}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{selectedOnboardee.name}</h3>
                  <p className="text-xs text-gray-400">{selectedOnboardee.post} · {selectedOnboardee.zone} Zone</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Joining Date</p>
                  <p className="font-bold text-gray-900">{selectedOnboardee.joiningDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Doc Verification', value: `${selectedOnboardee.docVerification}%`, color: selectedOnboardee.docVerification === 100 ? '#10B981' : '#E69B30' },
                  { label: 'Tasks Done', value: `${selectedOnboardee.tasksCompleted}/${selectedOnboardee.totalTasks}`, color: '#1A3555' },
                  { label: 'Status', value: selectedOnboardee.status, color: selectedOnboardee.status === 'Completed' ? '#10B981' : '#E69B30' },
                ].map(m => (
                  <div key={m.label} className="p-3 bg-gray-50 rounded-xl text-center">
                    <p className="text-lg font-black" style={{ color: m.color }}>{m.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Onboarding Task Checklist</h4>
              <div className="space-y-2">
                {onboardingChecklist.map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${item.done ? 'bg-green-50' : 'bg-amber-50'}`}>
                    {item.done ? <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> : <Clock size={16} className="text-amber-500 flex-shrink-0" />}
                    <span className={`text-sm font-medium flex-1 ${item.done ? 'text-green-800' : 'text-amber-800'}`}>{item.task}</span>
                    <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full font-medium">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'checklist' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-1">Standard Onboarding Checklist</h2>
              <p className="text-xs text-gray-400 mb-4">Mandatory tasks for all GHMC new joiners</p>
              <div className="space-y-2">
                {[
                  { day: 'Day 1', tasks: ['Issue Appointment Order', 'Create Employee ID & HRMS Login', 'Biometric Enrollment', 'Photo & Signature Upload'] },
                  { day: 'Week 1', tasks: ['GPF Account Opening', 'NPS PRAN Registration', 'Bank Mandate Form', 'Service Book Initialization', 'PAN & Aadhaar Linking'] },
                  { day: 'Month 1', tasks: ['Caste/Category Certificate Verification', 'Character Certificate Submission', 'Medical Fitness Certificate', 'Property Statement (Appendix-A)', 'Departmental Induction Training', 'Zone/Circle Posting Order'] },
                ].map(period => (
                  <div key={period.day} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="px-3 py-2 text-xs font-black uppercase tracking-wide text-white" style={{ backgroundColor: '#1A3555' }}>{period.day}</div>
                    <div className="divide-y divide-gray-50">
                      {period.tasks.map(t => (
                        <div key={t} className="flex items-center gap-2 px-3 py-2">
                          <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Documents Required</h2>
                <div className="space-y-2">
                  {[
                    { doc: 'Appointment Order (Original)', mandatory: true },
                    { doc: 'Educational Certificates (Degree, Marksheets)', mandatory: true },
                    { doc: 'Caste / Category Certificate', mandatory: true },
                    { doc: 'Aadhaar Card (Original + Copy)', mandatory: true },
                    { doc: 'PAN Card', mandatory: true },
                    { doc: 'Date of Birth Certificate / SSLC', mandatory: true },
                    { doc: '3 Passport Size Photographs', mandatory: true },
                    { doc: 'Character Certificate from Previous Employer', mandatory: true },
                    { doc: 'Medical Fitness Certificate (Form 16)', mandatory: true },
                    { doc: 'Property Statement (Appendix-A)', mandatory: true },
                    { doc: 'NOC from Previous Employer (if applicable)', mandatory: false },
                    { doc: 'Disability Certificate (if applicable)', mandatory: false },
                  ].map(d => (
                    <div key={d.doc} className="flex items-center gap-2 text-sm">
                      <FileText size={13} className={d.mandatory ? 'text-red-500' : 'text-gray-400'} />
                      <span className="text-gray-700 flex-1">{d.doc}</span>
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${d.mandatory ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{d.mandatory ? 'Mandatory' : 'If applicable'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-blue-800 text-sm">Pending Offers Expiry Alert</p>
                  <p className="text-xs text-blue-700 mt-0.5">12 candidates who received offer letters for JHI posts have not yet submitted joining reports. Offers expire on 31-Mar-2026. Please follow up.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
