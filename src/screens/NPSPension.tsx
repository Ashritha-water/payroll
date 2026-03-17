'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Download, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, ChevronDown, FileText, RefreshCw, ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/lib'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const corpusGrowth = [
  { month: 'Apr', corpus: 2840 }, { month: 'May', corpus: 2910 }, { month: 'Jun', corpus: 2975 },
  { month: 'Jul', corpus: 3040 }, { month: 'Aug', corpus: 3120 }, { month: 'Sep', corpus: 3185 },
  { month: 'Oct', corpus: 3220 }, { month: 'Nov', corpus: 3310 }, { month: 'Dec', corpus: 3390 },
  { month: 'Jan', corpus: 3450 }, { month: 'Feb', corpus: 3520 }, { month: 'Mar', corpus: 3614 },
]

const fundAllocation = [
  { name: 'Equity (E)', value: 75, color: '#1A3555' },
  { name: 'Corp Bonds (C)', value: 15, color: '#E69B30' },
  { name: 'Govt Sec (G)', value: 10, color: '#4CAF50' },
]

const monthlyContribs = [
  { month: 'Oct', employee: 48.2, employer: 48.2 },
  { month: 'Nov', employee: 48.6, employer: 48.6 },
  { month: 'Dec', employee: 49.1, employer: 49.1 },
  { month: 'Jan', employee: 49.4, employer: 49.4 },
  { month: 'Feb', employee: 49.8, employer: 49.8 },
  { month: 'Mar', employee: 50.2, employer: 50.2 },
]

const employees = [
  { pranNo: 'TS110023456789', name: 'Srinivas Reddy K.', empId: 'GHMC-001234', designation: 'Deputy Commissioner', doj: '15 Mar 2005', tier1: 842400, tier2: 124500, empContrib: 78800*0.1, govtContrib: 78800*0.14, status: 'Active', pfm: 'SBI' },
  { pranNo: 'TS110034567890', name: 'Lakshmi Devi P.', empId: 'GHMC-002456', designation: 'Asst Engineer', doj: '01 Jul 2010', tier1: 512300, tier2: 45200, empContrib: 56100*0.1, govtContrib: 56100*0.14, status: 'Active', pfm: 'LIC' },
  { pranNo: 'TS110045678901', name: 'Mohammed Irfan S.', empId: 'GHMC-003789', designation: 'Senior Clerk', doj: '10 Jan 2012', tier1: 398700, tier2: 28400, empContrib: 44900*0.1, govtContrib: 44900*0.14, status: 'Active', pfm: 'UTI' },
  { pranNo: 'TS110056789012', name: 'Swathi Priya M.', empId: 'GHMC-008901', designation: 'Data Entry Op.', doj: '14 Feb 2018', tier1: 214500, tier2: 0, empContrib: 25500*0.1, govtContrib: 25500*0.14, status: 'Active', pfm: 'SBI' },
  { pranNo: 'TS110067890123', name: 'Bhaskar Rao K.', empId: 'GHMC-009123', designation: 'Junior Engineer', doj: '05 Aug 2016', tier1: 312800, tier2: 18700, empContrib: 38200*0.1, govtContrib: 38200*0.14, status: 'On Leave', pfm: 'UTI' },
]

const exitCases = [
  { name: 'Padma Rani T.', pranNo: 'TS110078901234', reason: 'Superannuation', retirementDate: '31 Mar 2026', corpus: '₹48,24,500', annuity: '40%', lump: '60%', status: 'Processing' },
  { name: 'Venkat Narayana B.', pranNo: 'TS110089012345', reason: 'Superannuation', retirementDate: '30 Apr 2026', corpus: '₹62,10,300', annuity: '40%', lump: '60%', status: 'Intimation Sent' },
  { name: 'K. Suresh Kumar', pranNo: 'TS110090123456', reason: 'Death in Service', retirementDate: '08 Feb 2026', corpus: '₹28,45,200', annuity: '—', lump: '100%', status: 'Family Claim' },
]

const chartConfig = {
  corpus: { label: 'Corpus (₹ Lakhs)', color: '#1A3555' },
  employee: { label: 'Employee (₹ Lakhs)', color: '#1A3555' },
  employer: { label: 'Employer/Govt (₹ Lakhs)', color: '#E69B30' },
}

export default function NPSPension() {
  const [tab, setTab] = useState<'overview' | 'accounts' | 'contributions' | 'exit' | 'ops'>('overview')
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="NPS & Pension" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Deep-link Nav Strip */}
        <div className="flex items-center gap-2 mb-5">
          <Link to="/EmployeeMaster" className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-colors"><ArrowLeft size={12} /> Employee Master</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link to="/EmployeeProfile" className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer transition-colors">Employee Profile</Link>
          <ChevronRight size={12} className="text-gray-300" />
          {[
            { label: 'Service Book', to: '/ServiceBook' },
            { label: 'GPF Statement', to: '/GPFStatement' },
            { label: 'NPS & Pension', to: '/NPSPension', active: true },
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Leave', to: '/LeaveManagement' },
            { label: 'Income Tax', to: '/IncomeTax' },
          ].map(link => (
            <Link key={link.label} to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >{link.label}</Link>
          ))}
        </div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">NPS & Pension Module</h1>
            <p className="text-sm text-gray-500 mt-0.5">National Pension System (CRA/NSDL) · GHMC · FY 2025-26 · 18,420 NPS subscribers</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <RefreshCw size={13} /> Sync NSDL
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Download size={13} /> Export SCF
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {[
            { label: 'NPS Subscribers', value: '18,420', sub: 'Post-2004 employees', color: '#1A3555', icon: '👥' },
            { label: 'Total Corpus (Tier I)', value: '₹3,614 Cr', sub: '+2.7% this month', color: '#15803D', icon: '📈' },
            { label: 'Govt Contribution (Mar)', value: '₹8.94 Cr', sub: '14% of basic pay', color: '#D97706', icon: '🏛️' },
            { label: 'Employee Contrib (Mar)', value: '₹6.38 Cr', sub: '10% of basic pay', color: '#0284C7', icon: '💰' },
            { label: 'Exit Cases (Active)', value: '3', sub: '2 superannuation, 1 death', color: '#DC2626', icon: '⚠️' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-xl mb-1">{k.icon}</div>
              <p className="text-xs text-gray-400 mb-1">{k.label}</p>
              <p className="text-lg font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'overview', label: 'Corpus Overview' },
            { key: 'accounts', label: 'PRAN Accounts' },
            { key: 'contributions', label: 'Monthly Contributions' },
            { key: 'exit', label: 'Exit / Withdrawal' },
            { key: 'ops', label: 'OPS (Pre-2004)' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-900">Cumulative Corpus Growth (₹ Crores) — FY 2025-26</h2>
                  <span className="text-xs font-bold px-2 py-1 bg-green-50 text-green-700 rounded-full">+27.3% YoY</span>
                </div>
                <ChartContainer config={chartConfig} className="h-52">
                  <AreaChart data={corpusGrowth}>
                    <defs>
                      <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1A3555" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#1A3555" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis domain={[2700, 3700]} hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="corpus" stroke="#1A3555" strokeWidth={2.5} fill="url(#corpusGrad)" dot={{ fill: '#1A3555', r: 3 }} />
                  </AreaChart>
                </ChartContainer>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="font-bold text-gray-900 mb-3">Fund Allocation (Scheme E)</h2>
                  <div className="flex items-center gap-4">
                    <PieChart width={100} height={100}>
                      <Pie data={fundAllocation} cx={46} cy={46} innerRadius={30} outerRadius={46} dataKey="value" strokeWidth={0}>
                        {fundAllocation.map((f, i) => <Cell key={i} fill={f.color} />)}
                      </Pie>
                    </PieChart>
                    <div className="space-y-2">
                      {fundAllocation.map((f) => (
                        <div key={f.name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: f.color }} />
                          <div>
                            <p className="text-xs font-bold text-gray-800">{f.name}</p>
                            <p className="text-xs text-gray-400">{f.value}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h2 className="font-bold text-gray-900 mb-3">Pension Fund Managers</h2>
                  <div className="space-y-2">
                    {[
                      { pfm: 'SBI Pension Funds', subs: 9840, share: '53.4%' },
                      { pfm: 'UTI Retirement', subs: 5280, share: '28.7%' },
                      { pfm: 'LIC Pension Fund', subs: 3300, share: '17.9%' },
                    ].map((p) => (
                      <div key={p.pfm} className="flex items-center justify-between py-1 border-b border-gray-50">
                        <div>
                          <p className="text-xs font-bold text-gray-800">{p.pfm}</p>
                          <p className="text-xs text-gray-400">{p.subs.toLocaleString()} subscribers</p>
                        </div>
                        <span className="text-sm font-black text-gray-700">{p.share}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">NSDL Compliance Status</h2>
                <div className="space-y-3">
                  {[
                    { task: 'Subscriber Contribution File (SCF) — Mar 2026', status: 'Uploaded', date: '05 Mar 2026', ok: true },
                    { task: 'IPIN Reset Requests Pending', status: '12 pending', date: 'Action needed', ok: false },
                    { task: 'PRAN Generation — New Joiners (Feb 2026)', status: 'Completed', date: '18 Feb 2026', ok: true },
                    { task: 'Quarterly Statement Generation (Q3)', status: 'Sent to employees', date: '20 Jan 2026', ok: true },
                    { task: 'NSDL Portal DDO Certification', status: 'Pending', date: 'Due 10 Apr 2026', ok: false },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                      {c.ok ? <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{c.task}</p>
                        <p className="text-xs text-gray-400">{c.date}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${c.ok ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Returns (Annualized) — Scheme E</h2>
                <div className="space-y-3">
                  {[
                    { pfm: 'SBI Pension Funds', returns1y: '18.4%', returns3y: '14.2%', returns5y: '12.8%', nav: '₹38.42' },
                    { pfm: 'UTI Retirement', returns1y: '17.9%', returns3y: '13.8%', returns5y: '12.2%', nav: '₹36.18' },
                    { pfm: 'LIC Pension Fund', returns1y: '16.8%', returns3y: '12.9%', returns5y: '11.6%', nav: '₹34.55' },
                  ].map((r) => (
                    <div key={r.pfm} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs font-bold text-gray-800 mb-2">{r.pfm}</p>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        {[['1Y', r.returns1y], ['3Y', r.returns3y], ['5Y', r.returns5y], ['NAV', r.nav]].map(([k, v]) => (
                          <div key={k as string}>
                            <p className="text-xs text-gray-400">{k}</p>
                            <p className="text-xs font-black text-green-600">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'accounts' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by PRAN, name, Emp ID..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['PRAN Number', 'Employee', 'Designation', 'DOJ', 'Tier I Corpus', 'Tier II Balance', 'Emp Contrib/Mo', 'Govt Contrib/Mo', 'PFM', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { pranNo: 'TS11002345678', name: 'Srinivas Reddy K.', empId: 'GHMC-001234', des: 'Deputy Commissioner', doj: '15 Mar 2005', tier1: '₹8,42,400', tier2: '₹1,24,500', empC: '₹7,880', govC: '₹11,032', pfm: 'SBI', status: 'Active' },
                  { pranNo: 'TS11003456789', name: 'Lakshmi Devi P.', empId: 'GHMC-002456', des: 'Asst Engineer', doj: '01 Jul 2010', tier1: '₹5,12,300', tier2: '₹45,200', empC: '₹5,610', govC: '₹7,854', pfm: 'LIC', status: 'Active' },
                  { pranNo: 'TS11004567890', name: 'Mohammed Irfan S.', empId: 'GHMC-003789', des: 'Senior Clerk', doj: '10 Jan 2012', tier1: '₹3,98,700', tier2: '₹28,400', empC: '₹4,490', govC: '₹6,286', pfm: 'UTI', status: 'Active' },
                  { pranNo: 'TS11005678901', name: 'Swathi Priya M.', empId: 'GHMC-008901', des: 'DEO', doj: '14 Feb 2018', tier1: '₹2,14,500', tier2: '—', empC: '₹2,550', govC: '₹3,570', pfm: 'SBI', status: 'Active' },
                  { pranNo: 'TS11006789012', name: 'Bhaskar Rao K.', empId: 'GHMC-009123', des: 'Junior Engineer', doj: '05 Aug 2016', tier1: '₹3,12,800', tier2: '₹18,700', empC: '₹3,820', govC: '₹5,348', pfm: 'UTI', status: 'On Leave' },
                  { pranNo: 'TS11007890123', name: 'Anitha Kumari V.', empId: 'GHMC-006890', des: 'Revenue Inspector', doj: '18 Jun 2013', tier1: '₹4,48,200', tier2: '₹62,100', empC: '₹3,540', govC: '₹4,956', pfm: 'SBI', status: 'Active' },
                ].map((e) => (
                  <tr key={e.pranNo} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono font-bold text-blue-600">{e.pranNo}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.empId}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{e.des}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{e.doj}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">{e.tier1}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-600">{e.tier2}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-blue-600">{e.empC}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-amber-600">{e.govC}</td>
                    <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{e.pfm}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${e.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing 6 of 18,420 NPS accounts</p>
            </div>
          </div>
        )}

        {tab === 'contributions' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Monthly Contribution Trend (₹ Lakhs)</h2>
              <ChartContainer config={chartConfig} className="h-52">
                <BarChart data={monthlyContribs} barSize={20}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="employee" fill="#1A3555" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="employer" fill="#E69B30" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1A3555' }} /><span className="text-xs text-gray-500">Employee (10%)</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#E69B30' }} /><span className="text-xs text-gray-500">Govt (14%)</span></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">March 2026 Summary</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Employee Contribution', value: '₹6.38 Cr', note: '10% of basic, 18,420 staff', color: '#1A3555' },
                    { label: 'Govt (Employer) Share', value: '₹8.94 Cr', note: '14% of basic pay', color: '#E69B30' },
                    { label: 'Total SCF Amount', value: '₹15.32 Cr', note: 'To upload to NSDL CRA', color: '#15803D' },
                    { label: 'Pending Remittance', value: '₹0', note: 'All dues cleared', color: '#4CAF50' },
                  ].map((s) => (
                    <div key={s.label} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                      <p className="text-lg font-black" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs text-gray-400">{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h2 className="font-bold text-gray-900 mb-3">Contribution Issues</h2>
                <div className="space-y-2">
                  {[
                    { issue: 'PRAN not generated — 12 new joiners (Feb 2026)', type: 'warn' },
                    { issue: 'Zero contribution for 3 employees — pay revision pending', type: 'warn' },
                    { issue: 'Tier II auto debit mandate expired — 28 employees', type: 'error' },
                    { issue: 'SCF file uploaded successfully for Mar 2026', type: 'ok' },
                  ].map((i, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs py-1.5 border-b border-gray-50 last:border-0">
                      <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${i.type === 'ok' ? 'bg-green-500' : i.type === 'warn' ? 'bg-amber-400' : 'bg-red-500'}`} />
                      <span className="text-gray-600">{i.issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'exit' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Active Exit / Withdrawal Cases</h2>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-gray-800">
                  + Initiate Exit
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {exitCases.map((e, i) => (
                  <div key={i} className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                          {e.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{e.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">PRAN: {e.pranNo}</p>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${e.reason === 'Death in Service' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{e.reason}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-gray-900">{e.corpus}</p>
                        <p className="text-xs text-gray-400">Total Corpus</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {[
                        { k: 'Retirement Date', v: e.retirementDate },
                        { k: 'Annuity Purchase', v: e.annuity },
                        { k: 'Lump Sum Withdrawal', v: e.lump },
                        { k: 'Status', v: e.status },
                      ].map(({ k, v }) => (
                        <div key={k} className="p-2.5 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-400">{k}</p>
                          <p className="text-sm font-bold text-gray-800">{v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>Process Exit</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">View PRAN Statement</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Generate Form</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-bold text-amber-800 mb-1">NPS Exit Rules (Superannuation at 60 years)</p>
              <div className="grid grid-cols-3 gap-4 text-xs text-amber-700 mt-2">
                <div className="bg-white/60 rounded-lg p-3"><p className="font-bold mb-1">If Corpus ≥ ₹5 Lakhs</p><p>Minimum 40% must purchase annuity. 60% can be withdrawn as lump sum (tax-free).</p></div>
                <div className="bg-white/60 rounded-lg p-3"><p className="font-bold mb-1">If Corpus {'<'} ₹5 Lakhs</p><p>Full corpus can be withdrawn as lump sum without mandatory annuity purchase.</p></div>
                <div className="bg-white/60 rounded-lg p-3"><p className="font-bold mb-1">Death in Service</p><p>100% lump sum to nominee. Annuity not mandatory. Family pension (if applicable) in addition.</p></div>
              </div>
            </div>
          </div>
        )}

        {tab === 'ops' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold text-gray-900">Old Pension Scheme (OPS) Employees — Pre-2004 Appointees</h2>
                  <p className="text-sm text-gray-500 mt-0.5">10,920 employees under OPS · Defined Benefit Pension Scheme</p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full">OPS — Defined Benefit</span>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-5">
                {[
                  { label: 'OPS Employees', value: '10,920', color: '#7C3AED' },
                  { label: 'Monthly Pension Outgo', value: '₹4.8 Cr', color: '#15803D' },
                  { label: 'Family Pension Cases', value: '428', color: '#D97706' },
                  { label: 'Retiring in 12 Months', value: '287', color: '#DC2626' },
                ].map((s) => (
                  <div key={s.label} className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Pension Type', 'Formula', 'Commutation (Max)', 'Family Pension', 'DR Rate'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { type: 'Superannuation Pension', formula: '50% of last basic pay (Min 10 yr QS)', commutation: '40% commutable', family: '30% of last basic (or 50% of pension)', dr: '4% from Jan 2026' },
                    { type: 'Retiring Pension (Early)', formula: 'Proportionate qualifying service', commutation: '40% commutable', family: '30% of last basic', dr: '4% from Jan 2026' },
                    { type: 'Invalid Pension', formula: 'Min 30% of last basic pay', commutation: 'Not allowed', family: '30% of last basic', dr: '4% from Jan 2026' },
                    { type: 'Family Pension (Enhanced)', formula: '50% of last basic (first 7 yrs)', commutation: 'N/A', family: '— (Is family pension)', dr: '4% from Jan 2026' },
                  ].map((r) => (
                    <tr key={r.type} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{r.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.formula}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.commutation}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.family}</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{r.dr}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-800">TS Govt OPS Restoration — Policy Note</p>
              <p className="text-xs text-blue-700 mt-1">Government of Telangana is considering restoration of OPS. Current GHMC policy follows NPS for post-2004 appointees per G.O.Ms.No.653 Finance Dept dt. 22 Sep 2004. Monitor GO Repository for updates.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
