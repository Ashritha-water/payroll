'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Award, Calendar, CheckCircle, Clock, AlertCircle, Download, Search, FileText, User, ChevronRight, Bell } from 'lucide-react'
import { Link } from '@/lib'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

const retirees = [
  {
    empId: 'GHMC-004201', name: 'K. Venkateswarlu', designation: 'Deputy Commissioner', zone: 'Secunderabad',
    dob: '31-Mar-1966', dor: '31-Mar-2026', yearsService: 34.2, basicPay: 92400,
    gratuity: 1642000, gpfCorpus: 3840000, pensionMonthly: 46200, commutation: 820000,
    clearance: { noc: true, audit: true, property: true, loan: false, medical: false },
    readiness: 68, status: 'critical',
  },
  {
    empId: 'GHMC-007812', name: 'P. Nagamani', designation: 'Superintending Engineer', zone: 'Khairatabad',
    dob: '30-Apr-1966', dor: '30-Apr-2026', yearsService: 33.8, basicPay: 88600,
    gratuity: 1580000, gpfCorpus: 4120000, pensionMonthly: 44300, commutation: 780000,
    clearance: { noc: true, audit: false, property: true, loan: true, medical: false },
    readiness: 52, status: 'critical',
  },
  {
    empId: 'GHMC-011560', name: 'M. Satyanarayana', designation: 'Executive Engineer', zone: 'Kukatpally',
    dob: '31-May-1966', dor: '31-May-2026', yearsService: 32.5, basicPay: 82000,
    gratuity: 1460000, gpfCorpus: 3280000, pensionMonthly: 41000, commutation: 690000,
    clearance: { noc: true, audit: true, property: true, loan: true, medical: true },
    readiness: 100, status: 'ready',
  },
  {
    empId: 'GHMC-018234', name: 'T. Rajeswari Devi', designation: 'Accounts Officer', zone: 'LB Nagar',
    dob: '30-Jun-1966', dor: '30-Jun-2026', yearsService: 31.9, basicPay: 74200,
    gratuity: 1320000, gpfCorpus: 2980000, pensionMonthly: 37100, commutation: 610000,
    clearance: { noc: false, audit: false, property: false, loan: true, medical: true },
    readiness: 35, status: 'at_risk',
  },
  {
    empId: 'GHMC-022810', name: 'B. Laxmaiah', designation: 'Senior Assistant', zone: 'Charminar',
    dob: '31-Jul-1966', dor: '31-Jul-2026', yearsService: 30.7, basicPay: 52800,
    gratuity: 940000, gpfCorpus: 1840000, pensionMonthly: 26400, commutation: 420000,
    clearance: { noc: true, audit: true, property: true, loan: true, medical: false },
    readiness: 82, status: 'on_track',
  },
  {
    empId: 'GHMC-031402', name: 'G. Annapurnamma', designation: 'Head Clerk', zone: 'Malkajgiri',
    dob: '31-Aug-1966', dor: '31-Aug-2026', yearsService: 29.3, basicPay: 48600,
    gratuity: 860000, gpfCorpus: 1620000, pensionMonthly: 24300, commutation: 380000,
    clearance: { noc: true, audit: true, property: false, loan: true, medical: true },
    readiness: 78, status: 'on_track',
  },
]

const monthlyCount = [
  { month: 'Mar', count: 1 }, { month: 'Apr', count: 2 }, { month: 'May', count: 1 },
  { month: 'Jun', count: 2 }, { month: 'Jul', count: 1 }, { month: 'Aug', count: 1 },
  { month: 'Sep', count: 3 }, { month: 'Oct', count: 2 }, { month: 'Nov', count: 4 },
  { month: 'Dec', count: 2 }, { month: 'Jan', count: 3 }, { month: 'Feb', count: 2 },
]

const clearanceKeys = ['noc', 'audit', 'property', 'loan', 'medical'] as const
const clearanceLabels: Record<string, string> = { noc: 'NOC from HOD', audit: 'Audit Clearance', property: 'Govt. Property', loan: 'Loan Settlement', medical: 'Medical Cert.' }

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  critical: { label: 'Critical — < 2 months', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  at_risk: { label: 'At Risk', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  on_track: { label: 'On Track', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  ready: { label: 'Ready for Release', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
}

const chartConfig = { count: { label: 'Retirements', color: '#1A3555' } }

export default function RetirementPipeline() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof retirees[0] | null>(null)

  const filtered = retirees.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.empId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Terminal Benefits" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Retirement Pipeline</h1>
            <p className="text-sm text-gray-500 mt-0.5">Superannuation tracker — next 12 months · FY 2025–26 & 2026–27</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 bg-white">
              <Download size={14} /> Export List
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Bell size={14} /> Send Reminders
            </button>
          </div>
        </div>

        {/* Quick Module Nav */}
        <div className="flex gap-2 mb-5">
          {[
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Promotion & Transfer', to: '/PromotionTransfer' },
            { label: 'Roster Management', to: '/RosterManagement' },
            { label: 'Recruitment', to: '/RecruitmentOnboarding' },
            { label: 'Disciplinary', to: '/DisciplinaryProceedings' },
            { label: 'Retirement Pipeline', to: '/RetirementPipeline', active: true },
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
            { label: 'Due in 12 Months', value: '24', sub: 'FY 2025-26 & 2026-27', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'Due in 3 Months', value: '4', sub: 'Critical — immediate action', color: '#E35A4A', bg: 'bg-red-50' },
            { label: 'Clearance Ready', value: '8', sub: 'Orders can be issued', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Pension Outgo / mo', value: '₹18.4 L', sub: '24 pensioners', color: '#E69B30', bg: 'bg-amber-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <Award size={17} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-3">Monthly Retirement Count (Apr 2026 – Mar 2027)</h2>
            <ChartContainer config={chartConfig} className="h-36">
              <BarChart data={monthlyCount} barSize={28}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#1A3555" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#6B7280', fontSize: 10 }} />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-3">Clearance Status Summary</h2>
            <div className="space-y-3">
              {clearanceKeys.map((key) => {
                const done = retirees.filter(r => r.clearance[key]).length
                const total = retirees.length
                const pct = Math.round((done / total) * 100)
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 font-medium">{clearanceLabels[key]}</span>
                      <span className="font-black text-gray-800">{done}/{total}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#10B981' : pct >= 60 ? '#E69B30' : '#E35A4A' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Employee list + detail panel */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
            {filtered.map(r => {
              const sc = statusConfig[r.status]
              const doneCount = clearanceKeys.filter(k => r.clearance[k]).length
              return (
                <div key={r.empId} onClick={() => setSelected(r)} className={`bg-white rounded-xl shadow-sm border p-4 cursor-pointer hover:shadow-md transition-all ${selected?.empId === r.empId ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-white text-sm" style={{ backgroundColor: '#1A3555' }}>
                      {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-900">{r.name}</p>
                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{sc.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{r.designation} · {r.zone} · {r.empId}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Date of Retirement</p>
                          <p className="text-sm font-black" style={{ color: r.status === 'critical' ? '#E35A4A' : '#1A3555' }}>{r.dor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400">Service</p>
                          <p className="text-sm font-bold text-gray-800">{r.yearsService} yrs</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Gratuity</p>
                          <p className="text-sm font-bold text-green-600">₹{(r.gratuity / 100000).toFixed(2)}L</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Pension / mo</p>
                          <p className="text-sm font-bold text-blue-600">₹{r.pensionMonthly.toLocaleString()}</p>
                        </div>
                        <div className="ml-auto">
                          <p className="text-xs text-gray-400 mb-1">Clearance ({doneCount}/{clearanceKeys.length})</p>
                          <div className="flex gap-1">
                            {clearanceKeys.map(k => (
                              <div key={k} className={`w-5 h-5 rounded-full flex items-center justify-center ${r.clearance[k] ? 'bg-green-100' : 'bg-red-50'}`} title={clearanceLabels[k]}>
                                {r.clearance[k] ? <CheckCircle size={11} className="text-green-500" /> : <AlertCircle size={11} className="text-red-400" />}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Readiness</p>
                          <p className="text-sm font-black" style={{ color: r.readiness >= 80 ? '#10B981' : r.readiness >= 50 ? '#E69B30' : '#E35A4A' }}>{r.readiness}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detail panel */}
          <div>
            {selected ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white" style={{ backgroundColor: '#1A3555' }}>
                    {selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-black text-gray-900">{selected.name}</p>
                    <p className="text-xs text-gray-500">{selected.designation}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    ['Emp ID', selected.empId],
                    ['Zone', selected.zone],
                    ['Date of Birth', selected.dob],
                    ['Date of Retirement', selected.dor],
                    ['Total Service', `${selected.yearsService} years`],
                    ['Last Basic Pay', `₹${selected.basicPay.toLocaleString()}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                      <span className="text-gray-400 font-medium">{label}</span>
                      <span className="font-bold text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-3 mb-3">
                  <p className="text-xs font-black text-blue-800 mb-2">Terminal Benefits</p>
                  <div className="space-y-1.5">
                    {[
                      ['Gratuity', `₹${(selected.gratuity / 100000).toFixed(2)}L`],
                      ['GPF Corpus', `₹${(selected.gpfCorpus / 100000).toFixed(2)}L`],
                      ['Commutation Value', `₹${(selected.commutation / 100000).toFixed(2)}L`],
                      ['Monthly Pension', `₹${selected.pensionMonthly.toLocaleString()}`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-blue-600">{k}</span>
                        <span className="font-black text-blue-900">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-black text-gray-700 mb-2">NOC / Clearance Checklist</p>
                  <div className="space-y-1.5">
                    {clearanceKeys.map(k => (
                      <div key={k} className="flex items-center gap-2">
                        {selected.clearance[k] ? <CheckCircle size={13} className="text-green-500 flex-shrink-0" /> : <AlertCircle size={13} className="text-red-400 flex-shrink-0" />}
                        <span className={`text-xs ${selected.clearance[k] ? 'text-green-700 line-through' : 'text-red-600 font-semibold'}`}>{clearanceLabels[k]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="w-full py-2 rounded-lg text-white text-sm font-semibold cursor-pointer flex items-center justify-center gap-2" style={{ backgroundColor: '#1A3555' }}>
                    <FileText size={13} /> Generate Retirement Order
                  </button>
                  <button className="w-full py-2 rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-2">
                    <Bell size={13} /> Send WhatsApp Reminder
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center sticky top-20">
                <User size={32} className="text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Select an employee to view full retirement details and benefit computation</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
