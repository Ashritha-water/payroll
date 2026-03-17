'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Download, FileText, BarChart2, Users, Calendar, DollarSign, Clock, Search, Filter, RefreshCw, CheckCircle } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const reportCategories = [
  {
    category: 'HR & Workforce',
    color: '#1A3555',
    bg: 'bg-blue-50',
    reports: [
      { name: 'Employee Master Report', desc: 'Complete employee data with cadre & zone details', format: ['PDF', 'Excel'], freq: 'On-demand' },
      { name: 'Headcount Analysis', desc: 'Zone/cadre/department-wise headcount', format: ['Excel', 'CSV'], freq: 'Monthly' },
      { name: 'New Joinees & Separations', desc: 'Joinings, transfers, retirements, resignations', format: ['PDF', 'Excel'], freq: 'Monthly' },
      { name: 'Cadre Strength vs Sanctioned', desc: 'Vacancy analysis against sanctioned strength', format: ['PDF', 'Excel'], freq: 'Quarterly' },
    ]
  },
  {
    category: 'Payroll & Finance',
    color: '#E69B30',
    bg: 'bg-amber-50',
    reports: [
      { name: 'Monthly Payroll Abstract', desc: 'Salary abstract with all components & deductions', format: ['PDF', 'Excel'], freq: 'Monthly' },
      { name: 'Salary Register', desc: 'Detailed salary register for all employees', format: ['Excel', 'CSV'], freq: 'Monthly' },
      { name: 'Arrears Statement', desc: 'Pending arrears and revision arrears', format: ['PDF', 'Excel'], freq: 'On-demand' },
      { name: 'GPF Statement', desc: 'GPF subscription & corpus zone-wise', format: ['PDF'], freq: 'Annual' },
    ]
  },
  {
    category: 'Attendance & Leave',
    color: '#10B981',
    bg: 'bg-green-50',
    reports: [
      { name: 'Monthly Attendance Register', desc: 'Day-wise attendance for all employees', format: ['Excel', 'CSV'], freq: 'Monthly' },
      { name: 'Leave Balance Report', desc: 'Leave balances — all types, all employees', format: ['PDF', 'Excel'], freq: 'On-demand' },
      { name: 'Absenteeism Report', desc: 'Absent without leave (AWL) analysis', format: ['PDF', 'Excel'], freq: 'Monthly' },
      { name: 'Late Arrivals & Early Exits', desc: 'Biometric anomaly report', format: ['Excel'], freq: 'Weekly' },
    ]
  },
  {
    category: 'Compliance & Tax',
    color: '#8B5CF6',
    bg: 'bg-purple-50',
    reports: [
      { name: 'Form 16 Bulk Generation', desc: 'Form 16 Part A & B for all employees', format: ['PDF'], freq: 'Annual' },
      { name: 'TDS Return (24Q)', desc: 'Quarterly TDS statement for filing', format: ['CSV'], freq: 'Quarterly' },
      { name: 'Income Tax Computation', desc: 'Employee-wise tax computation sheet', format: ['Excel'], freq: 'On-demand' },
      { name: 'PF & ESI Challan', desc: 'Monthly PF and ESI contribution challans', format: ['PDF', 'Excel'], freq: 'Monthly' },
    ]
  },
]

const recentDownloads = [
  { name: 'Monthly Payroll Abstract — Feb 2026', size: '2.4 MB', format: 'PDF', date: 'Mar 10, 2026' },
  { name: 'Employee Master Report — All Zones', size: '5.1 MB', format: 'Excel', date: 'Mar 8, 2026' },
  { name: 'Monthly Attendance — Feb 2026', size: '1.8 MB', format: 'Excel', date: 'Mar 5, 2026' },
  { name: 'TDS Return 24Q — Q3 FY 2025-26', size: '0.3 MB', format: 'CSV', date: 'Feb 28, 2026' },
  { name: 'Leave Balance Report', size: '0.8 MB', format: 'PDF', date: 'Feb 25, 2026' },
]

const scheduledReports = [
  { name: 'Monthly Payroll Abstract', next: 'Apr 1, 2026', freq: 'Monthly', status: 'active' },
  { name: 'Attendance Register', next: 'Apr 1, 2026', freq: 'Monthly', status: 'active' },
  { name: 'Headcount Analysis', next: 'Apr 1, 2026', freq: 'Monthly', status: 'active' },
  { name: '24Q TDS Return', next: 'Apr 15, 2026', freq: 'Quarterly', status: 'active' },
]

const usageData = [
  { month: 'Oct', reports: 142 },
  { month: 'Nov', reports: 168 },
  { month: 'Dec', reports: 124 },
  { month: 'Jan', reports: 189 },
  { month: 'Feb', reports: 214 },
  { month: 'Mar', reports: 162 },
]

const chartConfig = { reports: { label: 'Reports Generated', color: '#1A3555' } }

const formatColors: Record<string, string> = { PDF: 'text-red-600 bg-red-50', Excel: 'text-green-600 bg-green-50', CSV: 'text-blue-600 bg-blue-50' }

export default function ReportsMIS() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...reportCategories.map(c => c.category)]

  const filteredCats = reportCategories
    .filter(c => activeCategory === 'All' || c.category === activeCategory)
    .map(c => ({
      ...c,
      reports: c.reports.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()))
    }))
    .filter(c => c.reports.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Reports & MIS" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & MIS</h1>
            <p className="text-sm text-gray-500 mt-0.5">Analytics, statutory reports, and management information system</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <RefreshCw size={14} /> Scheduled Reports
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <BarChart2 size={14} /> Custom Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Reports Generated', value: '999', sub: 'FY 2025-26 total', color: '#1A3555' },
            { label: 'Scheduled Reports', value: '4', sub: 'Auto-generated', color: '#10B981' },
            { label: 'Avg. Generation Time', value: '4.2s', sub: 'Per report', color: '#E69B30' },
            { label: 'Report Categories', value: '16', sub: 'Across 4 modules', color: '#8B5CF6' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-bold text-gray-700 mt-1">{k.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white" />
              </div>
              <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
                {categories.map(c => (
                  <button key={c} onClick={() => setActiveCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${activeCategory === c ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={activeCategory === c ? { backgroundColor: '#1A3555' } : {}}>
                    {c === 'All' ? 'All' : c.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredCats.map((cat) => (
                <div key={cat.category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className={`px-4 py-3 border-b border-gray-100 flex items-center gap-2`}>
                    <div className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: cat.color }} />
                    <h2 className="font-bold text-gray-900 text-sm">{cat.category}</h2>
                    <span className="text-xs text-gray-400 ml-auto">{cat.reports.length} reports</span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {cat.reports.map((r) => (
                      <div key={r.name} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50/50 transition-colors group">
                        <FileText size={16} className="text-gray-300 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                          <p className="text-xs text-gray-400">{r.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400">{r.freq}</span>
                          {r.format.map(f => (
                            <span key={f} className={`text-xs font-bold px-1.5 py-0.5 rounded ${formatColors[f] || 'text-gray-500 bg-gray-50'}`}>{f}</span>
                          ))}
                          <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-semibold cursor-pointer transition-opacity" style={{ backgroundColor: '#1A3555' }}>
                            <Download size={12} /> Generate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">Report Usage (6 months)</h2>
              <ChartContainer config={chartConfig} className="h-36">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A3555" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1A3555" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="reports" stroke="#1A3555" strokeWidth={2} fill="url(#colorReports)" />
                </AreaChart>
              </ChartContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">Scheduled Reports</h2>
              <div className="space-y-2">
                {scheduledReports.map((s) => (
                  <div key={s.name} className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{s.name}</p>
                      <p className="text-xs text-gray-400">Next: {s.next} | {s.freq}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">Recent Downloads</h2>
              <div className="space-y-2">
                {recentDownloads.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 py-2 border-b border-gray-50">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${formatColors[d.format] || 'bg-gray-50 text-gray-500'}`}>{d.format}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{d.name}</p>
                      <p className="text-xs text-gray-400">{d.size} · {d.date}</p>
                    </div>
                    <button className="text-gray-300 hover:text-gray-600 cursor-pointer flex-shrink-0"><Download size={13} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
