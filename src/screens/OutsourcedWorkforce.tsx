'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Download, Users, AlertTriangle, CheckCircle, Clock, Plus, ChevronDown, Filter } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const categoryBreakdown = [
  { name: 'Daily Wage (Sanitation)', value: 8420, color: '#1A3555' },
  { name: 'Outsourced (Agency)', value: 4280, color: '#E69B30' },
  { name: 'Contract (Fixed Term)', value: 1840, color: '#4CAF50' },
  { name: 'Muster Roll (Works)', value: 2340, color: '#8B5CF6' },
  { name: 'Security (In-house)', value: 620, color: '#0284C7' },
]

const monthlyPayment = [
  { month: 'Oct', dw: 84.2, agency: 38.4, contract: 16.8 },
  { month: 'Nov', dw: 85.1, agency: 38.8, contract: 17.2 },
  { month: 'Dec', dw: 86.4, agency: 39.2, contract: 17.6 },
  { month: 'Jan', dw: 84.8, agency: 39.8, contract: 18.1 },
  { month: 'Feb', dw: 85.6, agency: 40.2, contract: 18.4 },
  { month: 'Mar', dw: 86.2, agency: 40.6, contract: 18.8 },
]

const chartConfig = {
  dw: { label: 'Daily Wage (₹ Lakhs)', color: '#1A3555' },
  agency: { label: 'Agency Staff (₹ Lakhs)', color: '#E69B30' },
  contract: { label: 'Contract (₹ Lakhs)', color: '#4CAF50' },
}

const workers = [
  { id: 'DW-CH-001245', name: 'T. Srinivasa Rao', category: 'Daily Wage', designation: 'Sanitary Worker', contractor: 'Direct/Dept', zone: 'Charminar', present: true, days: 24, wagePerDay: 812, duesMonth: '₹19,488', pf: false, esi: false },
  { id: 'OS-KP-002341', name: 'S. Lakshmi', category: 'Outsourced', designation: 'Sweeper', contractor: 'M/s Clean Hyderabad Pvt Ltd', zone: 'Kukatpally', present: true, days: 26, wagePerDay: 750, duesMonth: '₹19,500', pf: true, esi: true },
  { id: 'DW-SC-003892', name: 'B. Ramulu', category: 'Daily Wage', designation: 'Helper (Parks)', contractor: 'Direct/Dept', zone: 'Secunderabad', present: false, days: 18, wagePerDay: 812, duesMonth: '₹14,616', pf: false, esi: false },
  { id: 'CT-LB-004201', name: 'G. Anjanamma', category: 'Contract', designation: 'Data Entry Operator', contractor: 'Direct Fixed-Term', zone: 'LB Nagar', present: true, days: 26, wagePerDay: 1200, duesMonth: '₹31,200', pf: true, esi: true },
  { id: 'OS-ML-005567', name: 'M. Kishore Kumar', category: 'Outsourced', designation: 'Security Guard', contractor: 'M/s Safe Guard Services', zone: 'Malkajgiri', present: true, days: 30, wagePerDay: 830, duesMonth: '₹24,900', pf: true, esi: true },
  { id: 'MR-UP-006123', name: 'V. Narayana', category: 'Muster Roll', designation: 'Mason (Works)', contractor: 'Works Dept', zone: 'Uppal', present: false, days: 14, wagePerDay: 950, duesMonth: '₹13,300', pf: false, esi: false },
]

const contractors = [
  { name: 'M/s Clean Hyderabad Pvt Ltd', type: 'Sanitation', workers: 1840, zones: 'All 8 Zones', contract: 'RC-2024-089', validity: '31 Mar 2026', billing: '₹1.38 Cr/month', pf: 'Verified', compliance: 'Green' },
  { name: 'M/s Safe Guard Services', type: 'Security', workers: 420, zones: 'HO + 4 Zones', contract: 'RC-2023-124', validity: '30 Jun 2026', billing: '₹34.8 L/month', pf: 'Verified', compliance: 'Green' },
  { name: 'M/s IT Support Solutions', type: 'IT/DEO Staff', workers: 186, zones: 'Head Office', contract: 'RC-2024-201', validity: '28 Feb 2026', billing: '₹22.3 L/month', pf: 'Pending Verification', compliance: 'Amber' },
  { name: 'M/s Green Works Corp', type: 'Parks & Gardens', workers: 620, zones: 'Serilingampally, KP', contract: 'RC-2024-312', validity: '31 Dec 2025', billing: '₹48.6 L/month', pf: 'Not Submitted', compliance: 'Red' },
]

export default function OutsourcedWorkforce() {
  const [tab, setTab] = useState<'overview' | 'workers' | 'contractors' | 'payments' | 'gig'>('overview')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')

  const filtered = workers.filter(w =>
    (w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase())) &&
    (category === 'All Categories' || w.category === category)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Outsourced Workforce" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Quick Nav */}
        <div className="flex gap-2 mb-4">
          {[
            { label: 'Employee Master', to: '/EmployeeMaster' },
            { label: 'Outsourced Workforce', to: '/OutsourcedWorkforce', active: true },
            { label: 'Health & Safety', to: '/HealthSafety' },
            { label: 'Payroll Register', to: '/PayrollRegister' },
            { label: 'Attendance Register', to: '/AttendanceRegister' },
          ].map(link => (
            <a key={link.label} href={`#${link.to}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >{link.label}</a>
          ))}
        </div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Outsourced & Contract Workforce</h1>
            <p className="text-sm text-gray-500 mt-0.5">Daily Wage · Outsourced Agency · Fixed Term Contract · Muster Roll · Future Gig/Crowd Workers</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Download size={13} /> Export Muster
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={14} /> Enroll Worker
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {[
            { label: 'Total Workforce', value: '17,500', sub: 'All categories', color: '#1A3555' },
            { label: 'Daily Wage', value: '8,420', sub: 'Sanitation + Horticulture', color: '#E69B30' },
            { label: 'Outsourced (Agency)', value: '4,280', sub: 'Via 12 contractors', color: '#15803D' },
            { label: 'Contract / Fixed Term', value: '1,840', sub: 'IT, DEO, Others', color: '#0284C7' },
            { label: 'Compliance Alerts', value: '4', sub: 'PF/ESI defaults', color: '#DC2626' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-bold text-gray-700 mt-1">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'workers', label: 'Worker Register' },
            { key: 'contractors', label: 'Contractor Management' },
            { key: 'payments', label: 'Wages & Payments' },
            { key: 'gig', label: '🔮 Future: Gig Workers' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Workforce Composition</h2>
                <div className="flex items-center gap-4">
                  <PieChart width={120} height={120}>
                    <Pie data={categoryBreakdown} cx={56} cy={56} innerRadius={32} outerRadius={56} dataKey="value" strokeWidth={0}>
                      {categoryBreakdown.map((_, i) => <Cell key={i} fill={_.color} />)}
                    </Pie>
                  </PieChart>
                  <div className="space-y-1.5">
                    {categoryBreakdown.map((c) => (
                      <div key={c.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <div>
                          <p className="text-xs font-semibold text-gray-700">{c.name.split(' (')[0]}</p>
                          <p className="text-xs text-gray-400">{c.value.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Monthly Payment Outgo (₹ Lakhs)</h2>
                <ChartContainer config={chartConfig} className="h-44">
                  <BarChart data={monthlyPayment} barSize={14}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="dw" fill="#1A3555" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="agency" fill="#E69B30" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="contract" fill="#4CAF50" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Compliance Alerts</h2>
                <div className="space-y-3">
                  {[
                    { issue: 'M/s Green Works Corp — PF contribution not submitted for Jan-Mar 2026 (620 workers)', type: 'error' },
                    { issue: 'M/s IT Support Solutions — Contract expired 28 Feb 2026, running without valid PO', type: 'error' },
                    { issue: '3 daily wage workers — Aadhaar verification pending for wage payment', type: 'warn' },
                    { issue: 'ESI challan for Feb 2026 — due date 15 Mar, not yet remitted by M/s Clean Hyd', type: 'warn' },
                    { issue: 'All active contractor PF submissions for Q3 FY25-26 — verified', type: 'ok' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs py-1.5 border-b border-gray-50 last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${a.type === 'ok' ? 'bg-green-500' : a.type === 'warn' ? 'bg-amber-400' : 'bg-red-500'}`} />
                      <span className="text-gray-600">{a.issue}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Today's Attendance — Outsourced Staff</h2>
                <div className="space-y-3">
                  {[
                    { category: 'Daily Wage (Sanitation)', total: 8420, present: 7890, pct: 93.7, color: '#1A3555' },
                    { category: 'Outsourced Agency Staff', total: 4280, present: 3980, pct: 93.0, color: '#E69B30' },
                    { category: 'Contract/Fixed-Term', total: 1840, present: 1780, pct: 96.7, color: '#4CAF50' },
                    { category: 'Muster Roll (Works)', total: 2340, present: 1890, pct: 80.8, color: '#8B5CF6' },
                  ].map((a) => (
                    <div key={a.category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-600">{a.category}</span>
                        <span className="text-xs font-bold" style={{ color: a.color }}>{a.present.toLocaleString()} / {a.total.toLocaleString()} ({a.pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full">
                        <div className="h-1.5 rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'workers' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search worker ID, name..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none" />
              </div>
              <div className="relative">
                <select value={category} onChange={e => setCategory(e.target.value)} className="appearance-none px-3 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                  {['All Categories', 'Daily Wage', 'Outsourced', 'Contract', 'Muster Roll'].map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Worker ID', 'Name', 'Category', 'Designation', 'Contractor/Dept', 'Zone', 'Status', 'Days (Mar)', 'Month Dues', 'PF/ESI', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 px-3 py-3 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((w, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 text-xs font-mono font-bold text-blue-600">{w.id}</td>
                    <td className="px-3 py-3 text-sm font-semibold text-gray-800">{w.name}</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${w.category === 'Daily Wage' ? 'bg-blue-50 text-blue-700' : w.category === 'Outsourced' ? 'bg-amber-50 text-amber-700' : w.category === 'Contract' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'}`}>{w.category}</span>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600">{w.designation}</td>
                    <td className="px-3 py-3 text-xs text-gray-500 max-w-28 truncate">{w.contractor}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{w.zone}</td>
                    <td className="px-3 py-3">
                      <div className={`w-2 h-2 rounded-full ${w.present ? 'bg-green-500' : 'bg-red-400'}`} title={w.present ? 'Present' : 'Absent'} />
                    </td>
                    <td className="px-3 py-3 text-sm font-bold text-gray-800">{w.days}</td>
                    <td className="px-3 py-3 text-sm font-semibold text-green-600">{w.duesMonth}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${w.pf ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>PF</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${w.esi ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'}`}>ESI</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button className="text-xs px-2 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing {filtered.length} of 17,500 workers</p>
            </div>
          </div>
        )}

        {tab === 'contractors' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Empanelled Contractors</h2>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
                  <Plus size={13} /> Add Contractor
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {contractors.map((c, i) => (
                  <div key={i} className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1">
                          <span className="text-base font-black text-gray-900">{c.name}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{c.type}</span>
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.compliance === 'Green' ? 'bg-green-500' : c.compliance === 'Amber' ? 'bg-amber-400' : 'bg-red-500'}`} />
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span><span className="font-semibold text-gray-600">Contract Ref:</span> {c.contract}</span>
                          <span><span className="font-semibold text-gray-600">Valid Till:</span> <span className={new Date(c.validity) < new Date() ? 'text-red-600 font-bold' : ''}>{c.validity}</span></span>
                          <span><span className="font-semibold text-gray-600">Deployed Zones:</span> {c.zones}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-gray-900">{c.billing}</p>
                        <p className="text-xs text-gray-400">Monthly billing</p>
                        <p className="text-xs font-semibold text-gray-600 mt-0.5">{c.workers.toLocaleString()} workers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.pf === 'Verified' ? 'bg-green-50 text-green-700' : c.pf === 'Pending Verification' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>PF: {c.pf}</span>
                      <button className="px-3 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">View Contract</button>
                      <button className="px-3 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Compliance Tab</button>
                      <button className="px-3 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Generate Bill</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'payments' && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Daily Wage Payout (Mar)', value: '₹86.2 L', sub: '8,420 workers × avg ₹812/day × 25.9 days avg', color: '#1A3555' },
                { label: 'Agency Billing (Mar)', value: '₹40.6 L', sub: '4 contractors · 4,280 workers', color: '#E69B30' },
                { label: 'Contract Salaries (Mar)', value: '₹18.8 L', sub: '1,840 fixed-term staff', color: '#15803D' },
                { label: 'Muster Roll (Mar)', value: '₹22.2 L', sub: '2,340 works-engaged workers', color: '#8B5CF6' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                  <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1 leading-tight">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Minimum Wage Compliance — March 2026</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Category', 'Skill Level', 'Govt Min Wage (GO)', 'GHMC Actual Wage', 'Variance', 'Status'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { cat: 'Sanitary Worker (Unskilled)', skill: 'Unskilled', govt: '₹650/day', ghmc: '₹812/day', var: '+24.9%', status: 'Compliant' },
                    { cat: 'Mason / Plumber (Works)', skill: 'Semi-skilled', govt: '₹720/day', ghmc: '₹950/day', var: '+31.9%', status: 'Compliant' },
                    { cat: 'DEO / Computer Operator', skill: 'Skilled', govt: '₹850/day', ghmc: '₹1,200/day', var: '+41.2%', status: 'Compliant' },
                    { cat: 'Agency Sweeper', skill: 'Unskilled', govt: '₹650/day', ghmc: '₹750/day', var: '+15.4%', status: 'Compliant' },
                    { cat: 'Security Guard', skill: 'Semi-skilled', govt: '₹740/day', ghmc: '₹830/day', var: '+12.2%', status: 'Compliant' },
                  ].map((r) => (
                    <tr key={r.cat} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{r.cat}</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{r.skill}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.govt}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-800">{r.ghmc}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600">{r.var}</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'gig' && (
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-6 text-white">
              <div className="absolute top-4 right-4 text-4xl opacity-20">🔮</div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black mb-3" style={{ backgroundColor: '#E69B30', color: '#0C1C34' }}>FUTURE ROADMAP — Under Design</span>
              <h2 className="text-xl font-black mb-2">Gig & Crowd-Sourced Workforce Module</h2>
              <p className="text-white/70 text-sm mb-4">GHMC plans to engage on-demand gig workers for peak workload events (election duty, disaster response, festival sanitation) and potentially model crowd-sourced civic workers for short-duration, task-based engagement.</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '📱', title: 'App-Based Onboarding', desc: 'Workers register via mobile app. Aadhaar eKYC instant verification. No physical process needed.' },
                  { icon: '📍', title: 'Geo-fenced Task Assignment', desc: 'Tasks assigned based on live location. AI matches nearest available worker to task site.' },
                  { icon: '💳', title: 'Daily / Per-Task Pay', desc: 'Instant payment via UPI after task completion. No monthly muster roll process.' },
                  { icon: '⭐', title: 'Reputation Scoring', desc: 'Supervisor rating after each task. Workers build score for priority task allocation.' },
                  { icon: '📊', title: 'Demand Forecasting', desc: 'AI predicts workforce demand for festivals, rains, waste peaks. Auto-triggers hiring.' },
                  { icon: '⚖️', title: 'Labour Law Compliance', desc: 'Auto-generated Form 5/10 under Contract Labour Act. ESI/PF prorated per day.' },
                ].map((f) => (
                  <div key={f.title} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <p className="text-sm font-bold mb-1">{f.title}</p>
                    <p className="text-xs text-white/60">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Potential Use Cases for GHMC</h2>
                <div className="space-y-2">
                  {[
                    { case: 'Election Duty Workforce', detail: 'Engage 5,000+ temporary workers for election booth management, transport, counting', urgency: 'Seasonal' },
                    { case: 'Disaster Response (Floods)', detail: 'Rapid mobilization of sanitation/rescue workers during Hyderabad flooding season', urgency: 'Emergency' },
                    { case: 'Festival Season Sanitation', detail: 'Ganesh Chaturthi, Diwali: 2,000+ extra sweepers for 5-7 days', urgency: 'Recurring' },
                    { case: 'Road Repair Survey Teams', detail: 'Geo-tagged pothole/damage reporting by registered civic volunteers', urgency: 'Ongoing' },
                    { case: 'Pandemic/Health Emergency', detail: 'Disinfection workers, contact tracers, ward sanitization crews', urgency: 'Emergency' },
                  ].map((u, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${u.urgency === 'Emergency' ? 'bg-red-50 text-red-700' : u.urgency === 'Seasonal' ? 'bg-amber-50 text-amber-700' : u.urgency === 'Recurring' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{u.urgency}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{u.case}</p>
                        <p className="text-xs text-gray-400">{u.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Legal & Compliance Framework</h2>
                <div className="space-y-2">
                  {[
                    { law: 'Contract Labour Act, 1970', applicability: 'Mandatory for contractors with 20+ workers. GHMC as principal employer' },
                    { law: 'Code on Social Security, 2020', applicability: 'Gig workers entitled to life/disability cover. Platform liability defined' },
                    { law: 'Code on Wages, 2019', applicability: 'Minimum wage applicable to gig/platform workers. No exemption' },
                    { law: 'TS Shops & Estab Act', applicability: 'Working hours, overtime for contractual staff' },
                    { law: 'ESI Act', applicability: 'Applicable for workers earning ≤ ₹21,000/month. Employer contributes 3.25%' },
                  ].map((l, i) => (
                    <div key={i} className="p-2.5 bg-gray-50 rounded-lg">
                      <p className="text-xs font-bold text-gray-800">{l.law}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{l.applicability}</p>
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
