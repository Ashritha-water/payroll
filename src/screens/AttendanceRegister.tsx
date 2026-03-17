'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Filter, Download, ChevronDown, CheckCircle, XCircle, Clock, RefreshCw, AlertTriangle } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts'

const attendanceData = [
  { empId: 'GHMC-001234', name: 'Srinivas Reddy K.', designation: 'Deputy Commissioner', zone: 'Charminar', inTime: '09:08', outTime: '18:45', hours: 9.6, status: 'P', late: false, ot: 0.7 },
  { empId: 'GHMC-002456', name: 'Lakshmi Devi P.', designation: 'Assistant Engineer', zone: 'Charminar', inTime: '09:34', outTime: '18:15', hours: 8.7, status: 'P', late: true, ot: 0 },
  { empId: 'GHMC-003789', name: 'Mohammed Irfan S.', designation: 'Senior Clerk', zone: 'Charminar', inTime: '—', outTime: '—', hours: 0, status: 'A', late: false, ot: 0 },
  { empId: 'GHMC-004012', name: 'Padma Rani T.', designation: 'Town Planning Officer', zone: 'Charminar', inTime: '09:12', outTime: '17:02', hours: 7.8, status: 'OD', late: false, ot: 0 },
  { empId: 'GHMC-005678', name: 'Ramesh Kumar G.', designation: 'Sanitary Worker', zone: 'Charminar', inTime: '07:02', outTime: '15:18', hours: 8.3, status: 'P', late: false, ot: 0 },
  { empId: 'GHMC-006890', name: 'Anitha Kumari V.', designation: 'Revenue Inspector', zone: 'Charminar', inTime: '09:02', outTime: '17:05', hours: 8.1, status: 'P', late: false, ot: 0 },
  { empId: 'GHMC-007345', name: 'Venkat Narayana B.', designation: 'Superintendent Engineer', zone: 'Charminar', inTime: '—', outTime: '—', hours: 0, status: 'L', late: false, ot: 0 },
  { empId: 'GHMC-008901', name: 'Swathi Priya M.', designation: 'Data Entry Operator', zone: 'Charminar', inTime: '10:12', outTime: '18:08', hours: 7.9, status: 'P', late: true, ot: 0 },
  { empId: 'GHMC-009123', name: 'Bhaskar Rao K.', designation: 'Junior Engineer', zone: 'Charminar', inTime: '09:00', outTime: '17:00', hours: 8.0, status: 'P', late: false, ot: 0 },
  { empId: 'GHMC-010456', name: 'Sunitha Nair R.', designation: 'Health Officer', zone: 'Charminar', inTime: '09:15', outTime: '18:30', hours: 9.25, status: 'P', late: false, ot: 1.5 },
]

const weeklyTrend = [
  { day: 'Mon', present: 27200, absent: 1350, leave: 790 },
  { day: 'Tue', present: 27485, absent: 1245, leave: 892 },
  { day: 'Wed', present: 26890, absent: 1680, leave: 770 },
  { day: 'Thu', present: 27100, absent: 1450, leave: 790 },
  { day: 'Fri', present: 26400, absent: 1840, leave: 900 },
  { day: 'Sat', present: 12800, absent: 0, leave: 0 },
]

const absenteeismTrend = [
  { month: 'Oct', rate: 4.2 }, { month: 'Nov', rate: 4.8 }, { month: 'Dec', rate: 5.6 },
  { month: 'Jan', rate: 4.1 }, { month: 'Feb', rate: 4.5 }, { month: 'Mar', rate: 4.2 },
]

const zoneStats = [
  { zone: 'Serilingampally', present: 2920, total: 3100, late: 45, absent: 96, leave: 84, od: 28 },
  { zone: 'Secunderabad', present: 2790, total: 2950, late: 62, absent: 89, leave: 71, od: 45 },
  { zone: 'Charminar', present: 2680, total: 2840, late: 78, absent: 96, leave: 64, od: 32 },
  { zone: 'Kukatpally', present: 2640, total: 2780, late: 41, absent: 82, leave: 58, od: 22 },
  { zone: 'Khairatabad', present: 2510, total: 2650, late: 55, absent: 82, leave: 58, od: 19 },
  { zone: 'LB Nagar', present: 2430, total: 2560, late: 49, absent: 78, leave: 52, od: 16 },
  { zone: 'Malkajgiri', present: 2260, total: 2380, late: 36, absent: 72, leave: 48, od: 14 },
  { zone: 'Uppal', present: 1990, total: 2100, late: 28, absent: 64, leave: 46, od: 12 },
]

const chartConfig = {
  present: { label: 'Present', color: '#4CAF50' },
  absent: { label: 'Absent', color: '#E35A4A' },
  leave: { label: 'On Leave', color: '#E69B30' },
  rate: { label: 'Absenteeism %', color: '#E35A4A' },
}

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  P: { label: 'Present', bg: 'bg-green-50', text: 'text-green-700' },
  A: { label: 'Absent', bg: 'bg-red-50', text: 'text-red-600' },
  L: { label: 'On Leave', bg: 'bg-amber-50', text: 'text-amber-700' },
  OD: { label: 'On Duty', bg: 'bg-blue-50', text: 'text-blue-700' },
  WO: { label: 'Week Off', bg: 'bg-gray-100', text: 'text-gray-500' },
  H: { label: 'Holiday', bg: 'bg-purple-50', text: 'text-purple-700' },
}

const zones = ['All Zones', 'Charminar Zone', 'Kukatpally Zone', 'Secunderabad Zone', 'LB Nagar Zone', 'Malkajgiri Zone', 'Uppal Zone', 'Serilingampally Zone', 'Khairatabad Zone']
const designations = ['All Designations', 'Deputy Commissioner', 'Assistant Engineer', 'Senior Clerk', 'Junior Engineer', 'Revenue Inspector', 'Sanitary Worker', 'Health Officer']

export default function AttendanceRegister() {
  const [tab, setTab] = useState<'register' | 'analytics' | 'regularization' | 'shifts'>('register')
  const [zone, setZone] = useState('All Zones')
  const [designation, setDesignation] = useState('All Designations')
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('2026-03-16')

  const filtered = attendanceData.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.empId.toLowerCase().includes(search.toLowerCase())) &&
    (zone === 'All Zones' || e.zone === zone.replace(' Zone', ''))
  )

  const stats = { present: filtered.filter(e => e.status === 'P').length, absent: filtered.filter(e => e.status === 'A').length, leave: filtered.filter(e => e.status === 'L').length, od: filtered.filter(e => e.status === 'OD').length, late: filtered.filter(e => e.late).length }

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Attendance" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Register</h1>
            <p className="text-sm text-gray-500 mt-0.5">Daily register — 16 March 2026 | All Zones | 29,340 employees</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 font-medium">
              <RefreshCw size={14} /> Sync Biometric
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {[
            { label: 'Present', value: '27,485', color: '#4CAF50', pct: '93.7%' },
            { label: 'Absent', value: '1,245', color: '#E35A4A', pct: '4.2%' },
            { label: 'On Leave', value: '892', color: '#E69B30', pct: '3.0%' },
            { label: 'On Duty / Tour', value: '378', color: '#3B82F6', pct: '1.3%' },
            { label: 'Late Arrivals', value: '1,128', color: '#8B5CF6', pct: '4.1% of present' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.pct}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'register', label: 'Daily Register' },
            { key: 'analytics', label: 'Analytics' },
            { key: 'regularization', label: 'Regularization' },
            { key: 'shifts', label: 'Zone Summary' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'register' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none" />
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="relative">
                <select value={zone} onChange={e => setZone(e.target.value)} className="appearance-none px-4 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                  {zones.map(z => <option key={z}>{z}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select value={designation} onChange={e => setDesignation(e.target.value)} className="appearance-none px-4 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                  {designations.map(d => <option key={d}>{d}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="flex gap-1">
                {['All', 'P', 'A', 'L', 'OD', 'Late'].map(f => (
                  <button key={f} className={`px-2.5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${f === 'All' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 px-4 py-2 bg-gray-50/60 border-b border-gray-100 text-xs">
              <span className="text-green-600 font-bold">✓ Present: {stats.present}</span>
              <span className="text-red-600 font-bold">✗ Absent: {stats.absent}</span>
              <span className="text-amber-600 font-bold">⊘ Leave: {stats.leave}</span>
              <span className="text-blue-600 font-bold">OD: {stats.od}</span>
              <span className="text-purple-600 font-bold">Late: {stats.late}</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Emp ID', 'Name', 'Designation', 'Zone', 'In Time', 'Out Time', 'Hours', 'OT (hrs)', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => {
                  const s = statusConfig[e.status]
                  return (
                    <tr key={e.empId} className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-blue-600">{e.empId}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                            {e.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{e.name}</p>
                            {e.late && <p className="text-xs text-amber-600 font-semibold">Late Arrival</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{e.designation}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{e.zone}</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${e.inTime === '—' ? 'text-gray-300' : e.late ? 'text-amber-600' : 'text-gray-800'}`}>{e.inTime}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${e.outTime === '—' ? 'text-gray-300' : 'text-gray-800'}`}>{e.outTime}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-semibold ${e.hours >= 8 ? 'text-green-600' : e.hours === 0 ? 'text-gray-300' : 'text-amber-600'}`}>{e.hours > 0 ? `${e.hours}h` : '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-semibold ${e.ot > 0 ? 'text-purple-600' : 'text-gray-300'}`}>{e.ot > 0 ? `+${e.ot}h` : '—'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        {(e.status === 'A' || e.late) && (
                          <button className="text-xs px-2 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">Regularize</button>
                        )}
                        {e.status === 'P' && !e.late && (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-500">Showing {filtered.length} records (sample) of 2,840 in Charminar Zone</p>
              <div className="flex gap-2">
                {[1, 2, 3, '...', 284].map((p, i) => (
                  <button key={i} className={`w-8 h-8 rounded-lg text-sm cursor-pointer transition-colors ${p === 1 ? 'text-white' : 'text-gray-600 hover:bg-gray-100'}`} style={p === 1 ? { backgroundColor: '#1A3555' } : {}}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Week-wise Attendance (Current Week)</h2>
              <ChartContainer config={chartConfig} className="h-52">
                <BarChart data={weeklyTrend} barSize={20}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="present" fill="#4CAF50" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="absent" fill="#E35A4A" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="leave" fill="#E69B30" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Absenteeism Trend (%)</h2>
              <ChartContainer config={chartConfig} className="h-52">
                <LineChart data={absenteeismTrend}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis domain={[3, 7]} hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="rate" stroke="#E35A4A" strokeWidth={2.5} dot={{ fill: '#E35A4A', r: 4 }} />
                </LineChart>
              </ChartContainer>
            </div>
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Repeated Absenteeism Report — March 2026</h2>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Emp ID', 'Name', 'Zone', 'Designation', 'Absences (Mar)', 'Pattern', 'Action Required'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: 'GHMC-045321', name: 'T. Srinivasa', zone: 'Uppal', des: 'Sanitary Worker', count: 8, pattern: 'Monday/Friday', action: 'Show Cause' },
                    { id: 'GHMC-022890', name: 'B. Ravi Kumar', zone: 'Malkajgiri', des: 'Senior Clerk', count: 6, pattern: 'Random', action: 'Warning Letter' },
                    { id: 'GHMC-031456', name: 'P. Nagamani', zone: 'Charminar', des: 'Revenue Inspector', count: 5, pattern: 'Monday/Friday', action: 'Warning Letter' },
                    { id: 'GHMC-018234', name: 'G. Venkatesh', zone: 'LB Nagar', des: 'Sanitary Worker', count: 5, pattern: 'Random', action: 'Counseling' },
                  ].map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-blue-600">{r.id}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{r.zone}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{r.des}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-black text-red-600">{r.count} days</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.pattern.includes('Monday') ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>{r.pattern}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.action === 'Show Cause' ? 'bg-red-50 text-red-700' : r.action === 'Warning Letter' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>{r.action}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'regularization' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Pending Regularization Requests</h2>
                <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-full">8 pending</span>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { emp: 'Mohammed Irfan S.', empId: 'GHMC-003789', date: '16 Mar 2026', reason: 'Biometric failure — medical appointment', type: 'Absent', requestedBy: 'Self', time: '2 hrs ago' },
                  { emp: 'Lakshmi Devi P.', empId: 'GHMC-002456', date: '15 Mar 2026', reason: 'Late — vehicle breakdown', type: 'Late Arrival', requestedBy: 'Self', time: '1 day ago' },
                  { emp: 'Swathi Priya M.', empId: 'GHMC-008901', date: '16 Mar 2026', reason: 'Late — medical emergency in family', type: 'Late Arrival', requestedBy: 'Self', time: '3 hrs ago' },
                  { emp: 'Ramesh Kumar G.', empId: 'GHMC-005678', date: '14 Mar 2026', reason: 'OD not marked — ward inspection (unrecorded)', type: 'Absent', requestedBy: 'Supervisor', time: '2 days ago' },
                ].map((r, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                          {r.emp.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{r.emp}</span>
                            <span className="text-xs text-gray-400">{r.empId}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.type === 'Absent' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>{r.type}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5"><span className="font-semibold">Date:</span> {r.date}</p>
                          <p className="text-xs text-gray-500 mt-0.5">Reason: {r.reason}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Requested by: {r.requestedBy} · {r.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold cursor-pointer hover:bg-green-600">Approve</button>
                        <button className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold cursor-pointer hover:bg-red-50">Reject</button>
                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold cursor-pointer hover:bg-gray-50">Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Regularization Policy</h2>
                <div className="space-y-2 text-xs text-gray-600">
                  {[
                    ['Late Arrival', 'Max 2 per month allowed without deduction. Beyond 2: 0.5 CL per late.'],
                    ['Absent Regularization', 'Must be requested within 3 working days with documentary proof.'],
                    ['Biometric Failure', 'Supervisor counter-signature required. Max 2 per month.'],
                    ['OD Not Recorded', 'Must attach approved tour programme or OD order.'],
                    ['Half Day', 'Out before 2 PM = Half Day. 0.5 CL or HPL applicable.'],
                  ].map(([k, v]) => (
                    <div key={k as string} className="p-2.5 bg-gray-50 rounded-lg">
                      <p className="font-bold text-gray-700 mb-0.5">{k}</p>
                      <p className="text-gray-500">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h2 className="font-bold text-gray-900 mb-3">This Month Stats</h2>
                <div className="space-y-2">
                  {[
                    { label: 'Requests Received', value: 28, color: '#3B82F6' },
                    { label: 'Approved', value: 19, color: '#10B981' },
                    { label: 'Rejected', value: 1, color: '#E35A4A' },
                    { label: 'Pending', value: 8, color: '#E69B30' },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-xs text-gray-600">{s.label}</span>
                      <span className="text-sm font-black" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'shifts' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Zone-wise Attendance Summary — 16 Mar 2026</h2>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Zone', 'Total Strength', 'Present', 'Absent', 'On Leave', 'OD / Tour', 'Late Arrivals', 'Attendance %', 'Action'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {zoneStats.map((z) => {
                    const pct = Math.round((z.present / z.total) * 100)
                    return (
                      <tr key={z.zone} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">{z.zone} Zone</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{z.total.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm font-bold text-green-600">{z.present.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm font-bold text-red-600">{z.absent}</td>
                        <td className="px-4 py-3 text-sm font-bold text-amber-600">{z.leave}</td>
                        <td className="px-4 py-3 text-sm font-bold text-blue-600">{z.od}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${z.late > 60 ? 'bg-red-50 text-red-600' : z.late > 40 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>{z.late}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                              <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 95 ? '#4CAF50' : pct >= 90 ? '#E69B30' : '#E35A4A' }} />
                            </div>
                            <span className="text-sm font-black" style={{ color: pct >= 95 ? '#4CAF50' : pct >= 90 ? '#E69B30' : '#E35A4A' }}>{pct}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View Detail</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td className="px-4 py-3 text-sm font-black text-gray-900">TOTAL</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">29,340</td>
                    <td className="px-4 py-3 text-sm font-black text-green-600">27,485</td>
                    <td className="px-4 py-3 text-sm font-black text-red-600">1,245</td>
                    <td className="px-4 py-3 text-sm font-black text-amber-600">892</td>
                    <td className="px-4 py-3 text-sm font-black text-blue-600">378</td>
                    <td className="px-4 py-3 text-sm font-black text-gray-900">1,128</td>
                    <td className="px-4 py-3 text-sm font-black" style={{ color: '#4CAF50' }}>93.7%</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Office Shift Timings — GHMC Offices</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { shift: 'General Shift (Administrative)', in: '09:00 AM', out: '05:00 PM', grace: '15 min', lunch: '1:00–1:30 PM', applies: 'All administrative staff, clerks, DEOs, officers' },
                  { shift: 'Field Shift (Engineering / Revenue)', in: '08:00 AM', out: '06:00 PM', grace: '10 min', lunch: '1:00–2:00 PM (staggered)', applies: 'Engineers, Town Planning, Revenue Inspectors' },
                  { shift: 'Sanitation Shift (Early Morning)', in: '06:00 AM', out: '02:00 PM', grace: '10 min', lunch: '10:00–10:30 AM', applies: 'Sanitary Workers, Sanitary Inspectors' },
                ].map((s) => (
                  <div key={s.shift} className="p-4 bg-gray-50 rounded-xl">
                    <p className="font-bold text-gray-900 text-sm mb-3">{s.shift}</p>
                    <div className="space-y-1.5 text-xs">
                      {[['In Time', s.in, 'text-green-600'], ['Out Time', s.out, 'text-red-500'], ['Grace Period', s.grace, 'text-amber-600'], ['Lunch Break', s.lunch, 'text-gray-600']].map(([k, v, c]) => (
                        <div key={k as string} className="flex justify-between">
                          <span className="text-gray-400">{k}</span>
                          <span className={`font-bold ${c}`}>{v}</span>
                        </div>
                      ))}
                      <p className="text-gray-400 mt-2 leading-relaxed">{s.applies}</p>
                    </div>
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
