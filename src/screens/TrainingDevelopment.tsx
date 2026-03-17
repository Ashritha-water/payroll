'use client'
import React, { useState } from 'react'
import Components from '../components'
import { BookOpen, Users, Award, Calendar, CheckCircle, Clock, AlertCircle, Download, Filter, Search, TrendingUp, Star, PlusCircle } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

const upcomingTrainings = [
  { id: 'TR-2026-041', title: 'e-Governance & Digital Initiatives', category: 'IT & Digital', startDate: 'Mar 20, 2026', duration: '3 Days', venue: 'HMDA Training Hall, Khairatabad', seats: 40, enrolled: 38, mode: 'Classroom', mandatory: true },
  { id: 'TR-2026-042', title: 'RTI Act — Implementation & Compliance', category: 'Legal & Compliance', startDate: 'Mar 22, 2026', duration: '1 Day', venue: 'GHMC HQ, Conference Room 2', seats: 60, enrolled: 52, mode: 'Classroom', mandatory: true },
  { id: 'TR-2026-043', title: 'GIS Mapping for Urban Administration', category: 'Technical', startDate: 'Mar 25, 2026', duration: '5 Days', venue: 'NRSC Hyderabad', seats: 25, enrolled: 19, mode: 'Classroom', mandatory: false },
  { id: 'TR-2026-044', title: 'Financial Management & Budget Preparation', category: 'Finance', startDate: 'Apr 02, 2026', duration: '2 Days', venue: 'TSLA, Jubilee Hills', seats: 30, enrolled: 28, mode: 'Classroom', mandatory: true },
  { id: 'TR-2026-045', title: 'Leadership & Change Management', category: 'Soft Skills', startDate: 'Apr 07, 2026', duration: '3 Days', venue: 'Hyatt Hyderabad (External)', seats: 20, enrolled: 12, mode: 'Residential', mandatory: false },
  { id: 'TR-2026-046', title: 'HRMS System Usage — Module Training', category: 'IT & Digital', startDate: 'Apr 14, 2026', duration: '1 Day', venue: 'Virtual (Teams)', seats: 200, enrolled: 145, mode: 'Online', mandatory: true },
]

const nominations = [
  { empId: 'GHMC-001234', name: 'Srinivas Reddy K.', designation: 'Deputy Commissioner', training: 'Leadership & Change Management', date: 'Apr 07, 2026', status: 'approved', approvedBy: 'Commr. Office' },
  { empId: 'GHMC-002456', name: 'Lakshmi Devi P.', designation: 'Assistant Engineer', training: 'GIS Mapping for Urban Administration', date: 'Mar 25, 2026', status: 'approved', approvedBy: 'CE Civil' },
  { empId: 'GHMC-003789', name: 'Mohammed Irfan S.', designation: 'Senior Clerk', training: 'RTI Act — Implementation', date: 'Mar 22, 2026', status: 'pending', approvedBy: '' },
  { empId: 'GHMC-005678', name: 'Ramesh Kumar G.', designation: 'Revenue Inspector', training: 'e-Governance & Digital Initiatives', date: 'Mar 20, 2026', status: 'pending', approvedBy: '' },
  { empId: 'GHMC-006890', name: 'Anitha Kumari V.', designation: 'Revenue Inspector', training: 'HRMS System Usage', date: 'Apr 14, 2026', status: 'approved', approvedBy: 'Zone DC' },
  { empId: 'GHMC-007345', name: 'Venkat Narayana B.', designation: 'Superintendent Engineer', training: 'Financial Management', date: 'Apr 02, 2026', status: 'rejected', approvedBy: 'Already Attended-2024' },
]

const completionData = [
  { dept: 'Engineering', completed: 87, target: 100 },
  { dept: 'Revenue', completed: 74, target: 100 },
  { dept: 'Town Planning', completed: 68, target: 100 },
  { dept: 'Health', completed: 91, target: 100 },
  { dept: 'Finance', completed: 82, target: 100 },
  { dept: 'Admin', completed: 78, target: 100 },
]

const skillRadar = [
  { skill: 'Digital Literacy', score: 72 },
  { skill: 'Legal Awareness', score: 68 },
  { skill: 'Leadership', score: 55 },
  { skill: 'Finance Mgmt', score: 63 },
  { skill: 'Communication', score: 79 },
  { skill: 'Technical Skills', score: 70 },
]

const mandatory = [
  { training: 'Anti-Corruption & Vigilance', deadline: 'Mar 31, 2026', completed: 18420, total: 29340, pct: 63 },
  { training: 'Fire Safety & Emergency Response', deadline: 'Apr 15, 2026', completed: 24100, total: 29340, pct: 82 },
  { training: 'RTI Act Awareness', deadline: 'Mar 31, 2026', completed: 12300, total: 29340, pct: 42 },
  { training: 'e-Governance HRMS', deadline: 'Apr 30, 2026', completed: 9840, total: 29340, pct: 34 },
  { training: 'POSH — Sexual Harassment Prevention', deadline: 'Mar 31, 2026', completed: 26100, total: 29340, pct: 89 },
]

const chartConfig = {
  completed: { label: 'Completed (%)', color: '#1A3555' },
  score: { label: 'Score', color: '#E69B30' },
}

const statusStyle: Record<string, string> = {
  approved: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  rejected: 'bg-red-50 text-red-600',
}

const modeStyle: Record<string, string> = {
  Classroom: 'bg-blue-50 text-blue-700',
  Online: 'bg-purple-50 text-purple-700',
  Residential: 'bg-amber-50 text-amber-700',
}

export default function TrainingDevelopment() {
  const [tab, setTab] = useState<'calendar' | 'nominations' | 'mandatory' | 'skills'>('calendar')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Training" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Quick Nav */}
        <div className="flex gap-2 mb-4">
          {[
            { label: 'ACR / Performance', to: '/ACRPerformance' },
            { label: 'Training & Development', to: '/TrainingDevelopment', active: true },
            { label: 'Salary Revision', to: '/SalaryRevision' },
            { label: 'Service Book', to: '/ServiceBook' },
            { label: 'Employee Profile', to: '/EmployeeProfile' },
          ].map(link => (
            <a key={link.label} href={`#${link.to}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >{link.label}</a>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Training & Development</h1>
            <p className="text-sm text-gray-500 mt-0.5">GHMC Employee Training Calendar · FY 2025-26</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <PlusCircle size={14} /> Schedule Training
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Trainings Scheduled', value: '46', sub: 'FY 2025-26', color: '#1A3555', bg: 'bg-blue-50', icon: Calendar },
            { label: 'Employees Trained', value: '14,820', sub: 'This FY', color: '#10B981', bg: 'bg-green-50', icon: CheckCircle },
            { label: 'Training Hours', value: '1,24,680', sub: 'Total hours logged', color: '#E69B30', bg: 'bg-amber-50', icon: Clock },
            { label: 'Avg. Satisfaction', value: '4.2 / 5', sub: 'Post-training feedback', color: '#8B5CF6', bg: 'bg-purple-50', icon: Star },
          ].map((k) => (
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
            { key: 'calendar', label: 'Training Calendar' },
            { key: 'nominations', label: 'Nominations' },
            { key: 'mandatory', label: 'Mandatory Training' },
            { key: 'skills', label: 'Skill Analytics' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'calendar' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3 items-center">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search training..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Filter size={13} /> Filter</button>
              <div className="flex gap-2 ml-auto">
                {['IT & Digital', 'Technical', 'Finance', 'Legal & Compliance', 'Soft Skills'].map(cat => (
                  <span key={cat} className="text-xs text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full cursor-pointer hover:bg-gray-50">{cat}</span>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {upcomingTrainings.map(t => (
                <div key={t.id} className="px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1A355510' }}>
                    <BookOpen size={18} style={{ color: '#1A3555' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-gray-900 text-sm truncate">{t.title}</p>
                      {t.mandatory && <span className="text-xs bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded flex-shrink-0">Mandatory</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className={`font-semibold px-2 py-0.5 rounded-full ${modeStyle[t.mode]}`}>{t.mode}</span>
                      <span>{t.venue}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 font-medium">Start Date</p>
                    <p className="text-sm font-bold text-gray-800">{t.startDate}</p>
                    <p className="text-xs text-gray-400">{t.duration}</p>
                  </div>
                  <div className="text-center w-28">
                    <p className="text-xs text-gray-400 font-medium">Enrollment</p>
                    <p className="text-sm font-black text-gray-900">{t.enrolled}<span className="text-gray-400 font-normal">/{t.seats}</span></p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                      <div className="h-1.5 rounded-full" style={{ width: `${(t.enrolled / t.seats) * 100}%`, backgroundColor: t.enrolled >= t.seats * 0.9 ? '#E35A4A' : '#10B981' }} />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50">Nominees</button>
                    <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Nominate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'nominations' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Pending & Recent Nominations</h2>
              <span className="text-xs text-amber-700 bg-amber-50 font-bold px-2.5 py-1 rounded-full">2 Awaiting Approval</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Employee', 'Training Program', 'Training Date', 'Status', 'Remarks', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {nominations.map(n => (
                  <tr key={n.empId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900 text-sm">{n.name}</p>
                      <p className="text-xs text-gray-400">{n.designation} · {n.empId}</p>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 max-w-xs">
                      <p className="truncate">{n.training}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{n.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${statusStyle[n.status]}`}>{n.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{n.approvedBy || '—'}</td>
                    <td className="px-4 py-3">
                      {n.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button className="text-xs px-2.5 py-1 bg-green-500 text-white rounded-lg font-semibold cursor-pointer">Approve</button>
                          <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">Reject</button>
                        </div>
                      ) : (
                        <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'mandatory' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-1">Mandatory Training Compliance — FY 2025-26</h2>
              <p className="text-xs text-gray-400 mb-5">All 29,340 GHMC employees must complete the following trainings by the given deadline.</p>
              <div className="space-y-4">
                {mandatory.map(m => (
                  <div key={m.training} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: m.pct >= 80 ? '#D1FAE5' : m.pct >= 60 ? '#FEF3C7' : '#FEE2E2' }}>
                      {m.pct >= 80 ? <CheckCircle size={16} className="text-green-600" /> : m.pct >= 60 ? <Clock size={16} className="text-amber-600" /> : <AlertCircle size={16} className="text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <p className="text-sm font-bold text-gray-900">{m.training}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">Deadline: <strong className="text-gray-700">{m.deadline}</strong></span>
                          <span className="text-sm font-black" style={{ color: m.pct >= 80 ? '#10B981' : m.pct >= 60 ? '#E69B30' : '#E35A4A' }}>{m.pct}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full">
                        <div className="h-2.5 rounded-full transition-all" style={{ width: `${m.pct}%`, backgroundColor: m.pct >= 80 ? '#10B981' : m.pct >= 60 ? '#E69B30' : '#E35A4A' }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{m.completed.toLocaleString()} of {m.total.toLocaleString()} employees completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="font-bold text-red-800 text-sm mb-1 flex items-center gap-2"><AlertCircle size={15} /> Non-Compliance Alert</p>
                <p className="text-xs text-red-700">RTI Act Awareness training has only 42% completion with deadline on Mar 31, 2026. <strong>17,040 employees</strong> yet to complete. Recommend bulk scheduling.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-bold text-green-800 text-sm mb-1 flex items-center gap-2"><CheckCircle size={15} /> POSH Training Status</p>
                <p className="text-xs text-green-700">POSH training compliance stands at 89% (26,100 employees). Remaining 3,240 employees are scheduled in ongoing batches for March 2026.</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'skills' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Department-wise Training Completion (%)</h2>
                <ChartContainer config={chartConfig} className="h-56">
                  <BarChart data={completionData} barSize={28} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="dept" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} width={90} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="completed" fill="#1A3555" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Training Effectiveness — Category-wise (FY 2025-26)</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { cat: 'IT & Digital', trained: 8420, hours: 42100, feedback: 4.4 },
                    { cat: 'Technical', trained: 3210, hours: 32100, feedback: 4.1 },
                    { cat: 'Legal & Compliance', trained: 12400, hours: 24800, feedback: 3.9 },
                    { cat: 'Finance', trained: 2840, hours: 11360, feedback: 4.3 },
                    { cat: 'Soft Skills', trained: 1560, hours: 7800, feedback: 4.6 },
                    { cat: 'Safety', trained: 18200, hours: 36400, feedback: 4.2 },
                  ].map(c => (
                    <div key={c.cat} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold text-gray-700 mb-2">{c.cat}</p>
                      <p className="text-lg font-black text-gray-900">{c.trained.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">employees trained</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-amber-600">{c.feedback}</span>
                        <span className="text-xs text-gray-400">avg rating</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-1">Avg Workforce Skill Scores</h2>
                <p className="text-xs text-gray-400 mb-3">Based on post-training assessments</p>
                <div className="flex justify-center">
                  <RadarChart width={200} height={180} data={skillRadar}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#9CA3AF', fontSize: 9 }} />
                    <Radar name="Score" dataKey="score" stroke="#1A3555" fill="#1A3555" fillOpacity={0.25} strokeWidth={2} />
                  </RadarChart>
                </div>
                <div className="space-y-2 mt-2">
                  {skillRadar.map(s => (
                    <div key={s.skill} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 w-28 flex-shrink-0">{s.skill}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                        <div className="h-1.5 rounded-full" style={{ width: `${s.score}%`, backgroundColor: '#1A3555' }} />
                      </div>
                      <span className="font-bold text-gray-700 w-8 text-right">{s.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Top Training Vendors</h2>
                <div className="space-y-3">
                  {[
                    { name: 'TSLA (TS Leadership Academy)', programs: 12, rating: 4.5 },
                    { name: 'NIRD&PR, Hyderabad', programs: 8, rating: 4.3 },
                    { name: 'NIC Training Division', programs: 6, rating: 4.4 },
                    { name: 'IGNOU (Online Modules)', programs: 5, rating: 3.9 },
                  ].map(v => (
                    <div key={v.name} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{v.name}</p>
                        <p className="text-xs text-gray-400">{v.programs} programs</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-gray-700">{v.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
