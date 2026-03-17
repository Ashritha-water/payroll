'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Download, AlertTriangle, Clock, CheckCircle, Plus, Calendar, FileText, ChevronDown } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts'

const casesByForum = [
  { name: 'High Court TS', value: 124, color: '#1A3555' },
  { name: 'CAT Hyderabad', value: 89, color: '#E69B30' },
  { name: 'Supreme Court', value: 12, color: '#DC2626' },
  { name: 'Labour Court', value: 34, color: '#4CAF50' },
  { name: 'Tribunal/Others', value: 28, color: '#8B5CF6' },
]

const monthlyFiling = [
  { month: 'Oct', filed: 8, disposed: 5 }, { month: 'Nov', filed: 12, disposed: 7 },
  { month: 'Dec', filed: 6, disposed: 9 }, { month: 'Jan', filed: 11, disposed: 4 },
  { month: 'Feb', filed: 9, disposed: 8 }, { month: 'Mar', filed: 7, disposed: 6 },
]

const cases = [
  { caseNo: 'WP 4521/2024', forum: 'High Court TS', type: 'Writ Petition', petitioner: 'Mohammed Irfan S.', subject: 'Seniority-based promotion denial — Senior Clerk to Office Superintendent', zo: 'Adv. K. Ramana', nextHearing: '22 Mar 2026', status: 'Stay Granted', priority: 'High', filed: '14 Aug 2024' },
  { caseNo: 'OA 312/2025', forum: 'CAT Hyderabad', type: 'Original Application', petitioner: 'P. Nagamani & 12 others', subject: 'Transfer order challenge — Health Dept to Sanitation', zo: 'Adv. S. Prasad', nextHearing: '28 Mar 2026', status: 'Notice Issued', priority: 'Medium', filed: '03 Feb 2025' },
  { caseNo: 'SLP 1892/2025', forum: 'Supreme Court', type: 'Special Leave Petition', petitioner: 'GHMC (Appellant)', subject: 'GHMC challenge to HC order on GPF interest rate (FY 2019-24)', zo: 'Sr. Adv. K.K. Venugopal', nextHearing: '15 Apr 2026', status: 'Pending Admission', priority: 'Critical', filed: '20 Nov 2025' },
  { caseNo: 'ID 45/2024', forum: 'Labour Court', type: 'Industrial Dispute', petitioner: 'GHMC Daily Wage Workers Union', subject: 'Minimum wages revision for daily wage sanitation workers', zo: 'Adv. R. Narayana', nextHearing: '05 Apr 2026', status: 'Mediation', priority: 'High', filed: '11 Jun 2024' },
  { caseNo: 'WP 7823/2025', forum: 'High Court TS', type: 'Writ Petition', petitioner: 'K. Suresh Kumar (Legal Heir)', subject: 'DCRG payment delay — Death in Service case (Feb 2026)', zo: 'Adv. P. Reddy', nextHearing: '19 Mar 2026', status: 'Contempt Notice', priority: 'Critical', filed: '01 Mar 2026' },
  { caseNo: 'OA 567/2023', forum: 'CAT Hyderabad', type: 'Original Application', petitioner: 'G. Venkatesh & 8 others', subject: 'Regularization of service for temporary employees (10+ years)', zo: 'Adv. S. Prasad', nextHearing: '02 Apr 2026', status: 'Arguments Heard', priority: 'High', filed: '18 Apr 2023' },
  { caseNo: 'WP 2341/2026', forum: 'High Court TS', type: 'Writ Petition', petitioner: 'B. Ravi Kumar', subject: 'Disciplinary proceedings — procedural irregularity challenge', zo: 'Adv. N. Sharma', nextHearing: '24 Mar 2026', status: 'Notice Issued', priority: 'Medium', filed: '10 Feb 2026' },
]

const hearingsThisWeek = [
  { date: '19 Mar (Mon)', caseNo: 'WP 7823/2025', forum: 'HC', time: '10:30 AM', priority: 'Critical' },
  { date: '22 Mar (Thu)', caseNo: 'WP 4521/2024', forum: 'HC', time: '11:00 AM', priority: 'High' },
  { date: '24 Mar (Sat)', caseNo: 'WP 2341/2026', forum: 'HC', time: '10:00 AM', priority: 'Medium' },
]

const stayOrders = [
  { caseNo: 'WP 4521/2024', subject: 'Stay on promotion order — Sr. Clerk batch', grantedOn: '20 Aug 2024', implication: 'Cannot implement 12 promotions', compliance: 'Complied', expires: 'Until disposal' },
  { caseNo: 'WP 3892/2024', subject: 'Stay on transfer orders — Engineering Dept', grantedOn: '05 Dec 2024', implication: '6 transfer orders stayed', compliance: 'Complied', expires: 'Until disposal' },
  { caseNo: 'WP 1234/2025', subject: 'Stay on DPC proceedings for Zone Office', grantedOn: '14 Mar 2025', implication: 'DPC halted — 3 vacancies pending', compliance: 'Complied', expires: 'Until disposal' },
]

const chartConfig = {
  filed: { label: 'Filed', color: '#1A3555' },
  disposed: { label: 'Disposed', color: '#4CAF50' },
}

const priorityConfig: Record<string, { bg: string; text: string }> = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700' },
  High: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Medium: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Low: { bg: 'bg-gray-100', text: 'text-gray-600' },
}

const statusConfig: Record<string, { bg: string; text: string }> = {
  'Stay Granted': { bg: 'bg-red-50', text: 'text-red-700' },
  'Notice Issued': { bg: 'bg-amber-50', text: 'text-amber-700' },
  'Pending Admission': { bg: 'bg-gray-100', text: 'text-gray-600' },
  'Mediation': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Contempt Notice': { bg: 'bg-red-100', text: 'text-red-800' },
  'Arguments Heard': { bg: 'bg-purple-50', text: 'text-purple-700' },
}

export default function CourtCases() {
  const [tab, setTab] = useState<'register' | 'hearings' | 'stays' | 'contempt' | 'analytics'>('register')
  const [search, setSearch] = useState('')
  const [forumFilter, setForumFilter] = useState('All Forums')

  const filtered = cases.filter(c =>
    (c.caseNo.toLowerCase().includes(search.toLowerCase()) || c.petitioner.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase())) &&
    (forumFilter === 'All Forums' || c.forum === forumFilter)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Court Cases" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Quick Nav */}
        <div className="flex gap-2 mb-4">
          {[
            { label: 'Disciplinary', to: '/DisciplinaryProceedings' },
            { label: 'Court Cases', to: '/CourtCases', active: true },
            { label: 'GO Repository', to: '/GORepository' },
            { label: 'Roster Mgmt', to: '/RosterManagement' },
            { label: 'Health & Safety', to: '/HealthSafety' },
          ].map(link => (
            <a key={link.label} href={`#${link.to}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >{link.label}</a>
          ))}
        </div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Court Cases & Litigation</h1>
            <p className="text-sm text-gray-500 mt-0.5">HR-related judicial proceedings · GHMC · 287 active cases across all forums</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Download size={13} /> Export Register
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={15} /> Register Case
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-6 gap-3 mb-5">
          {[
            { label: 'Total Active Cases', value: '287', color: '#1A3555' },
            { label: 'High Court TS', value: '124', color: '#1A3555' },
            { label: 'CAT Hyderabad', value: '89', color: '#D97706' },
            { label: 'Supreme Court', value: '12', color: '#DC2626' },
            { label: 'Stay Orders Active', value: '18', color: '#DC2626' },
            { label: 'Contempt Notices', value: '3', color: '#7C3AED' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-gray-400 mt-1 leading-tight">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'register', label: 'Case Register' },
            { key: 'hearings', label: 'Hearing Calendar' },
            { key: 'stays', label: 'Stay Orders' },
            { key: 'contempt', label: 'Contempt Notices' },
            { key: 'analytics', label: 'Analytics' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'register' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search case no., party name, subject..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none" />
              </div>
              <div className="relative">
                <select value={forumFilter} onChange={e => setForumFilter(e.target.value)} className="appearance-none px-4 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                  {['All Forums', 'High Court TS', 'CAT Hyderabad', 'Supreme Court', 'Labour Court', 'Tribunal/Others'].map(f => <option key={f}>{f}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none px-4 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                  {['All Priorities', 'Critical', 'High', 'Medium', 'Low'].map(p => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {filtered.map((c, i) => {
                const pc = priorityConfig[c.priority] || priorityConfig.Low
                const sc = statusConfig[c.status] || { bg: 'bg-gray-100', text: 'text-gray-600' }
                return (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap mb-1">
                          <span className="text-sm font-black text-blue-700">{c.caseNo}</span>
                          <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{c.forum}</span>
                          <span className="text-xs font-semibold text-gray-400">{c.type}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>{c.priority}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{c.status}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">{c.subject}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span><span className="font-semibold text-gray-600">Petitioner:</span> {c.petitioner}</span>
                          <span><span className="font-semibold text-gray-600">GHMC's Advocate:</span> {c.zo}</span>
                          <span><span className="font-semibold text-gray-600">Filed:</span> {c.filed}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400 mb-1">Next Hearing</p>
                        <p className="text-sm font-black text-gray-900">{c.nextHearing}</p>
                        <div className="flex gap-2 mt-2">
                          <button className="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">View</button>
                          <button className="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing {filtered.length} of 287 cases</p>
            </div>
          </div>
        )}

        {tab === 'hearings' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Upcoming Hearings — March–April 2026</h2>
                <span className="text-xs font-bold px-2 py-1 bg-red-50 text-red-600 rounded-full">3 this week</span>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { date: '19 Mar 2026', day: 'Thursday', caseNo: 'WP 7823/2025', forum: 'High Court TS (Div Bench)', subject: 'DCRG payment delay — Death in Service', time: '10:30 AM', court: 'Court No. 38', advocate: 'Adv. P. Reddy', priority: 'Critical', action: 'Compliance affidavit to be filed' },
                  { date: '22 Mar 2026', day: 'Monday', caseNo: 'WP 4521/2024', forum: 'High Court TS', subject: 'Seniority-based promotion denial', time: '11:00 AM', court: 'Court No. 12', advocate: 'Adv. K. Ramana', priority: 'High', action: 'Counter affidavit ready' },
                  { date: '24 Mar 2026', day: 'Wednesday', caseNo: 'WP 2341/2026', forum: 'High Court TS', subject: 'Disciplinary proceedings challenge', time: '10:00 AM', court: 'Court No. 22', advocate: 'Adv. N. Sharma', priority: 'Medium', action: 'First appearance' },
                  { date: '28 Mar 2026', day: 'Monday', caseNo: 'OA 312/2025', forum: 'CAT Hyderabad', subject: 'Transfer order challenge — 13 petitioners', time: '02:30 PM', court: 'Bench 2', advocate: 'Adv. S. Prasad', priority: 'Medium', action: 'Await GHMC counter' },
                  { date: '02 Apr 2026', day: 'Thursday', caseNo: 'OA 567/2023', forum: 'CAT Hyderabad', subject: 'Regularization of temporary employees', time: '11:30 AM', court: 'Bench 1', advocate: 'Adv. S. Prasad', priority: 'High', action: 'Final arguments' },
                  { date: '05 Apr 2026', day: 'Monday', caseNo: 'ID 45/2024', forum: 'Labour Court', subject: 'Daily wage workers minimum wages dispute', time: '10:00 AM', court: 'Labour Court III', advocate: 'Adv. R. Narayana', priority: 'High', action: 'Mediation session 3' },
                ].map((h, i) => {
                  const pc = priorityConfig[h.priority]
                  return (
                    <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="text-center w-16 flex-shrink-0">
                          <p className="text-xs text-gray-400">{h.day.slice(0, 3)}</p>
                          <p className="text-lg font-black text-gray-900">{h.date.split(' ')[0]}</p>
                          <p className="text-xs text-gray-400">{h.date.split(' ').slice(1).join(' ')}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-black text-blue-700">{h.caseNo}</span>
                            <span className="text-xs font-semibold text-gray-400">{h.forum}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>{h.priority}</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-800 mb-1">{h.subject}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{h.time} · {h.court}</span>
                            <span>{h.advocate}</span>
                            <span className="text-amber-600 font-semibold">Action: {h.action}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Hearing Stats — Mar 2026</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Scheduled Hearings', value: 24, color: '#1A3555' },
                    { label: 'Attended (Advocate)', value: 18, color: '#15803D' },
                    { label: 'Adjourned', value: 4, color: '#D97706' },
                    { label: 'Orders Received', value: 2, color: '#7C3AED' },
                    { label: 'Upcoming (Next 7 days)', value: 3, color: '#DC2626' },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-xs text-gray-600">{s.label}</span>
                      <span className="text-sm font-black" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-bold text-red-800 mb-2">⚠️ Urgent Action Required</p>
                <div className="space-y-2">
                  {[
                    'WP 7823/2025: Compliance affidavit due before 19 Mar — DCRG payment proof required',
                    'WP 7823/2025: Contempt notice — Commissioner personal appearance may be required',
                  ].map((a, i) => (
                    <p key={i} className="text-xs text-red-700">{a}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'stays' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800">18 Active Stay Orders — HR Actions Blocked</p>
                <p className="text-xs text-amber-700 mt-0.5">These court orders restrain GHMC from implementing HR decisions. Any violation invites contempt of court proceedings.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Active Stay Orders — Critical</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Case No.', 'Stay Subject', 'Granted On', 'HR Implication', 'Compliance Status', 'Valid Till', 'Action'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stayOrders.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-black text-blue-700">{s.caseNo}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 max-w-xs">{s.subject}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{s.grantedOn}</td>
                      <td className="px-4 py-3 text-xs text-red-600 font-semibold">{s.implication}</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{s.compliance}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{s.expires}</td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View Order</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'contempt' && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm font-bold text-red-800 mb-1">⚠️ 3 Active Contempt Notices — Immediate Action Required</p>
              <p className="text-xs text-red-700">Non-compliance with court orders can result in personal prosecution of the Commissioner/Officers. Ensure compliance within stipulated time.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
              {[
                {
                  caseNo: 'WP 7823/2025', court: 'High Court of Telangana', division: 'Division Bench', issued: '10 Mar 2026',
                  subject: 'Contempt for non-payment of DCRG (Death-cum-Retirement Gratuity) to K. Suresh Kumar\'s family despite 3 court orders',
                  respondents: 'Commissioner GHMC + CFO GHMC', dueDate: '19 Mar 2026', daysLeft: 3,
                  action: 'Issue treasury bill immediately. File compliance affidavit before next date.',
                  advocate: 'Adv. P. Reddy (GHMC) · Sr. Adv. T. Suresh (Petitioner)'
                },
                {
                  caseNo: 'WP 6234/2024', court: 'High Court of Telangana', division: 'Single Bench', issued: '02 Feb 2026',
                  subject: 'Contempt for implementing transfer order despite interim stay granted on 15 Jan 2025',
                  respondents: 'Zonal Commissioner, Kukatpally Zone', dueDate: '05 Apr 2026', daysLeft: 20,
                  action: 'Recall transfer order immediately. File explanation for non-compliance.',
                  advocate: 'Adv. K. Ramana (GHMC)'
                },
                {
                  caseNo: 'OA 234/2023', court: 'Central Administrative Tribunal', division: 'Principal Bench HYD', issued: '15 Feb 2026',
                  subject: 'Contempt for delay in implementing CAT order on pay fixation (order dt. 12 Aug 2023)',
                  respondents: 'SR Departments + Accounts Officer', dueDate: '28 Mar 2026', daysLeft: 12,
                  action: 'Complete pay fixation and arrear payment. File compliance report.',
                  advocate: 'Adv. S. Prasad (GHMC)'
                },
              ].map((c, i) => (
                <div key={i} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-base font-black text-red-700">{c.caseNo}</span>
                        <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded-full">Contempt</span>
                        <span className="text-xs text-gray-400">{c.court} · {c.division}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{c.subject}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-400">Compliance Due</p>
                      <p className="text-sm font-black text-red-700">{c.dueDate}</p>
                      <p className={`text-xs font-bold ${c.daysLeft <= 7 ? 'text-red-600' : 'text-amber-600'}`}>{c.daysLeft} days left</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2.5 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-0.5">Respondents (GHMC)</p>
                      <p className="text-xs font-semibold text-gray-800">{c.respondents}</p>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-0.5">Advocates</p>
                      <p className="text-xs font-semibold text-gray-800">{c.advocate}</p>
                    </div>
                  </div>
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg mb-3">
                    <p className="text-xs font-bold text-amber-800">Action Required: {c.action}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer hover:opacity-90" style={{ backgroundColor: '#DC2626' }}>Mark Complied</button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">View Court Order</button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Notify Dept. Head</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Cases by Forum</h2>
              <div className="flex items-center gap-6">
                <PieChart width={160} height={160}>
                  <Pie data={casesByForum} cx={76} cy={76} innerRadius={40} outerRadius={72} dataKey="value" strokeWidth={0}>
                    {casesByForum.map((f, i) => <Cell key={i} fill={f.color} />)}
                  </Pie>
                </PieChart>
                <div className="space-y-2">
                  {casesByForum.map((f) => (
                    <div key={f.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: f.color }} />
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-xs text-gray-600">{f.name}</span>
                        <span className="text-sm font-black text-gray-800">{f.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Filing vs Disposal — FY 2025-26</h2>
              <ChartContainer config={chartConfig} className="h-44">
                <BarChart data={monthlyFiling} barSize={18}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="filed" fill="#1A3555" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="disposed" fill="#4CAF50" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Cases by Subject Category</h2>
              <div className="space-y-2">
                {[
                  { cat: 'Promotion / Seniority disputes', count: 78, pct: 27 },
                  { cat: 'Transfer order challenges', count: 64, pct: 22 },
                  { cat: 'Regularization / Permanency', count: 45, pct: 16 },
                  { cat: 'Pay fixation / Arrears', count: 38, pct: 13 },
                  { cat: 'Disciplinary proceeding challenges', count: 32, pct: 11 },
                  { cat: 'Terminal benefits (DCRG/Pension)', count: 18, pct: 6 },
                  { cat: 'Others', count: 12, pct: 4 },
                ].map((c) => (
                  <div key={c.cat} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-52 flex-shrink-0">{c.cat}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${c.pct}%`, backgroundColor: '#1A3555' }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-6 text-right">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Case Outcomes — Last 3 Years</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'GHMC Won', value: '38%', count: 89, color: '#15803D' },
                  { label: 'GHMC Lost', value: '22%', count: 52, color: '#DC2626' },
                  { label: 'Settled/Withdrawn', value: '18%', count: 42, color: '#D97706' },
                  { label: 'Pending/Sub-judice', value: '22%', count: 51, color: '#64748B' },
                ].map((o) => (
                  <div key={o.label} className="p-3 bg-gray-50 rounded-xl text-center">
                    <p className="text-2xl font-black" style={{ color: o.color }}>{o.value}</p>
                    <p className="text-xs font-bold text-gray-700">{o.label}</p>
                    <p className="text-xs text-gray-400">{o.count} cases</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
