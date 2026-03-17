'use client'
import React, { useState } from 'react'
import Components from '../components'
import { TrendingUp, CheckCircle, Clock, AlertCircle, Download, Search, Filter, ChevronDown, CalendarDays, Calculator } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const revisionHistory = [
  { id: 'REV-2026-012', empId: 'GHMC-001234', name: 'Srinivas Reddy K.', designation: 'Deputy Commissioner', oldPay: 75300, newPay: 78800, increment: 3500, effective: '01 Jan 2026', type: 'Annual Increment', status: 'approved' },
  { id: 'REV-2026-013', empId: 'GHMC-002456', name: 'Lakshmi Devi P.', designation: 'Assistant Engineer', oldPay: 53300, newPay: 56100, increment: 2800, effective: '01 Jan 2026', type: 'Annual Increment', status: 'approved' },
  { id: 'REV-2026-014', empId: 'GHMC-003789', name: 'Mohammed Irfan S.', designation: 'Senior Clerk', oldPay: 42600, newPay: 44900, increment: 2300, effective: '01 Jan 2026', type: 'Annual Increment', status: 'pending' },
  { id: 'REV-2026-015', empId: 'GHMC-004012', name: 'Padma Rani T.', designation: 'Town Planning Officer', oldPay: 64300, newPay: 67700, increment: 3400, effective: '01 Jan 2026', type: 'Annual Increment', status: 'pending' },
  { id: 'REV-2026-016', empId: 'GHMC-007345', name: 'Venkat Narayana B.', designation: 'Superintendent Engineer', oldPay: 112700, newPay: 118500, increment: 5800, effective: '01 Jan 2026', type: 'Stagnation Increment', status: 'processing' },
  { id: 'REV-2026-017', empId: 'GHMC-010456', name: 'Sunitha Nair R.', designation: 'Health Officer', oldPay: 68600, newPay: 72300, increment: 3700, effective: '01 Jan 2026', type: 'Annual Increment', status: 'approved' },
  { id: 'REV-2026-018', empId: 'GHMC-006890', name: 'Anitha Kumari V.', designation: 'Revenue Inspector', oldPay: 33500, newPay: 35400, increment: 1900, effective: '01 Jan 2026', type: 'Annual Increment', status: 'approved' },
]

const arrearsData = [
  { month: 'Jan', amount: 2.4 },
  { month: 'Feb', amount: 2.3 },
  { month: 'Mar', amount: 2.6 },
  { month: 'Apr', amount: 1.8 },
  { month: 'May', amount: 2.1 },
  { month: 'Jun', amount: 2.5 },
]

const chartConfig = {
  amount: { label: 'Arrears (₹ Cr)', color: '#E69B30' },
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  approved: { label: 'Approved', color: 'bg-green-50 text-green-700', icon: <CheckCircle size={11} /> },
  pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700', icon: <Clock size={11} /> },
  processing: { label: 'Processing', color: 'bg-blue-50 text-blue-700', icon: <AlertCircle size={11} /> },
  rejected: { label: 'Rejected', color: 'bg-red-50 text-red-600', icon: <AlertCircle size={11} /> },
}

export default function SalaryRevision() {
  const [tab, setTab] = useState<'revisions' | 'bulk' | 'fixation' | 'arrears'>('revisions')
  const [search, setSearch] = useState('')
  const [showCalc, setShowCalc] = useState(false)
  const [basicPay, setBasicPay] = useState('78800')

  const filtered = revisionHistory.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.empId.toLowerCase().includes(search.toLowerCase())
  )

  const gross = (v: number) => {
    const bp = v
    const da = Math.round(bp * 0.53)
    const hra = Math.round(bp * 0.27)
    const ta = 3600
    const cca = 5400
    return bp + da + hra + ta + cca
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Payroll" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Quick Nav */}
        <div className="flex gap-2 mb-4">
          {[
            { label: 'Payroll Register', to: '/PayrollRegister' },
            { label: 'Salary Revision', to: '/SalaryRevision', active: true },
            { label: 'NPS & Pension', to: '/NPSPension' },
            { label: 'GPF Statement', to: '/GPFStatement' },
            { label: 'Income Tax', to: '/IncomeTax' },
          ].map(link => (
            <a key={link.label} href={`#${link.to}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >{link.label}</a>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Salary Revision & Pay Fixation</h1>
            <p className="text-sm text-gray-500 mt-0.5">Annual increments, arrears & pay commission revisions — FY 2025-26</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowCalc(!showCalc)} className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 font-medium">
              <Calculator size={15} /> Pay Fixation Tool
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              + Initiate Revision
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Revisions Pending', value: '2', sub: 'Jan 2026 increment', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Approved This Month', value: '4', sub: 'Total ₹15,100/mo increase', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Total Arrears (FY)', value: '₹13.7 Cr', sub: '2,890 employees', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'Avg. Increment', value: '₹3,240', sub: 'Per employee (FY 2025-26)', color: '#8B5CF6', bg: 'bg-purple-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <TrendingUp size={17} style={{ color: k.color }} />
              </div>
              <p className="text-2xl font-black text-gray-900">{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Pay Fixation Calculator */}
        {showCalc && (
          <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-5 mb-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><Calculator size={16} className="text-amber-500" /> Pay Fixation Tool — 7th CPC</h2>
              <button onClick={() => setShowCalc(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer text-xl leading-none">×</button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">CURRENT BASIC PAY (₹)</label>
                <input type="number" value={basicPay} onChange={e => setBasicPay(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-200" />
                <div className="mt-3 space-y-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">PAY LEVEL</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none bg-white">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(l => <option key={l}>Level {l}</option>)}
                  </select>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-bold text-gray-500 mb-1">EFFECTIVE DATE</label>
                  <input type="date" defaultValue="2026-01-01" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none" />
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Computed Pay Structure</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    ['Basic Pay (Revised)', `₹${parseInt(basicPay || '0').toLocaleString()}`, '#1A3555'],
                    ['Annual Increment (3%)', `₹${Math.round(parseInt(basicPay || '0') * 0.03).toLocaleString()}`, '#E69B30'],
                    ['Revised Basic Pay', `₹${Math.round(parseInt(basicPay || '0') * 1.03).toLocaleString()}`, '#10B981'],
                    ['DA (53%)', `₹${Math.round(parseInt(basicPay || '0') * 1.03 * 0.53).toLocaleString()}`, '#3B82F6'],
                    ['HRA (27%)', `₹${Math.round(parseInt(basicPay || '0') * 1.03 * 0.27).toLocaleString()}`, '#8B5CF6'],
                    ['Gross Salary', `₹${gross(Math.round(parseInt(basicPay || '0') * 1.03)).toLocaleString()}`, '#E35A4A'],
                  ].map(([k, v, c]) => (
                    <div key={k as string} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-1 leading-tight">{k}</p>
                      <p className="text-lg font-black" style={{ color: c as string }}>{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Apply Revision</button>
                  <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Print Fixation Order</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'revisions', label: 'Revision Orders' },
            { key: 'bulk', label: 'Bulk Increment' },
            { key: 'fixation', label: 'Pay Commission' },
            { key: 'arrears', label: 'Arrears' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'revisions' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by name or employee ID..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                <Filter size={13} /> Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                <Download size={13} /> Export
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {['Revision ID', 'Employee', 'Designation', 'Old Pay', 'New Pay', 'Increment', 'Type', 'Effective', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => {
                  const s = statusConfig[r.status]
                  return (
                    <tr key={r.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono font-bold text-blue-600">{r.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.empId}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.designation}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">₹{r.oldPay.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{r.newPay.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-black text-green-600">+₹{r.increment.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 ml-1">({((r.increment / r.oldPay) * 100).toFixed(1)}%)</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{r.type}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{r.effective}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.icon}{s.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {r.status === 'pending' && <>
                            <button className="text-xs px-2 py-1 bg-green-500 text-white rounded-lg font-semibold cursor-pointer hover:bg-green-600">Approve</button>
                            <button className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded-lg font-semibold cursor-pointer hover:bg-red-50">Reject</button>
                          </>}
                          {r.status !== 'pending' && <button className="text-xs px-2 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View</button>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'bulk' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-5">Bulk Annual Increment — January 2026</h2>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">INCREMENT EFFECTIVE DATE</label>
                  <input type="date" defaultValue="2026-01-01" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">INCREMENT RATE</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none bg-white">
                      <option>3% of Basic Pay</option>
                      <option>One Increment in Pay Matrix</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">CADRE</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none bg-white">
                      <option>All Cadres</option>
                      <option>Class I</option>
                      <option>Class II</option>
                      <option>Class III</option>
                      <option>Class IV</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-800 mb-1">Pre-run Check</p>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>• 29,092 employees eligible for increment (completeness of 1 year service as on 01 Jan 2026)</li>
                      <li>• 248 employees excluded (probation / disciplinary proceeding / stagnation at max)</li>
                      <li>• Estimated total salary increase: <strong>₹9.43 Cr per month</strong></li>
                      <li>• Arrears applicable for Jan 2026 (if processing in Mar 2026)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Run Bulk Increment</button>
                <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 flex items-center gap-2">
                  <Download size={13} /> Download Preview (Excel)
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Increment Progress</h2>
              <div className="space-y-4">
                {[
                  { label: 'Eligibility Check', pct: 100, done: true },
                  { label: 'Sanction Order Prep', pct: 100, done: true },
                  { label: 'Commissioner Approval', pct: 72, done: false },
                  { label: 'Pay Fixation', pct: 0, done: false },
                  { label: 'DDO Certification', pct: 0, done: false },
                  { label: 'Payroll Update', pct: 0, done: false },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-700">{s.label}</span>
                      <span className={`text-xs font-bold ${s.done ? 'text-green-600' : s.pct > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: s.done ? '#10B981' : s.pct > 0 ? '#E69B30' : '#E5E7EB' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'fixation' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Pay Commission Revision History</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { commission: '5th CPC', effective: '01 Jan 1996', multiplier: '3.5x', da_merged: '100% DA', basis: '4th CPC scales upgraded' },
                  { commission: '6th CPC', effective: '01 Jan 2006', multiplier: '1.86x', da_merged: 'Grade Pay system', basis: 'Pay Band + Grade Pay' },
                  { commission: '7th CPC', effective: '01 Jan 2016', multiplier: '2.57x', da_merged: '125% DA merged', basis: 'Pay Matrix (Level 1-18)' },
                ].map((c) => (
                  <div key={c.commission} className="rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-gray-900">{c.commission}</h3>
                      <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: '#1A3555' }}>eff. {c.effective}</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-gray-400">Fitment Factor</span><span className="font-bold text-gray-800">{c.multiplier}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">DA Neutralized</span><span className="font-bold text-gray-800">{c.da_merged}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Structure</span><span className="font-bold text-gray-800">{c.basis}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-900">7th CPC Pay Matrix — Applicable Levels</h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">Effective 01 Jan 2016</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2 font-bold text-gray-500 uppercase tracking-wide">Pay Level</th>
                      <th className="text-left px-3 py-2 font-bold text-gray-500 uppercase tracking-wide">GP (Pre-revised)</th>
                      <th className="text-left px-3 py-2 font-bold text-gray-500 uppercase tracking-wide">Entry Pay</th>
                      <th className="text-left px-3 py-2 font-bold text-gray-500 uppercase tracking-wide">Max Pay</th>
                      <th className="text-left px-3 py-2 font-bold text-gray-500 uppercase tracking-wide">Increment (3%)</th>
                      <th className="text-left px-3 py-2 font-bold text-gray-500 uppercase tracking-wide">Applies To</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { level: 'Level 1', gp: '₹1,800', entry: '₹18,000', max: '₹56,900', inc: '₹540+', role: 'Sanitary Workers, Helpers' },
                      { level: 'Level 4', gp: '₹2,400', entry: '₹25,500', max: '₹81,100', inc: '₹765+', role: 'Sr. Clerks, DEOs' },
                      { level: 'Level 6', gp: '₹4,200', entry: '₹35,400', max: '₹1,12,400', inc: '₹1,062+', role: 'Revenue Inspectors' },
                      { level: 'Level 10', gp: '₹5,400', entry: '₹56,100', max: '₹1,77,500', inc: '₹1,683+', role: 'Assistant Engineers' },
                      { level: 'Level 12', gp: '₹7,600', entry: '₹78,800', max: '₹2,09,200', inc: '₹2,364+', role: 'Deputy Commissioners' },
                      { level: 'Level 14', gp: '₹10,000', entry: '₹1,44,200', max: '₹2,18,200', inc: '₹4,326+', role: 'Zonal Commissioners' },
                      { level: 'Level 17', gp: 'Apex', entry: '₹2,25,000', max: '₹2,25,000', inc: 'Fixed', role: 'Commissioner' },
                    ].map((r) => (
                      <tr key={r.level} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-3 py-2.5 font-bold text-blue-700">{r.level}</td>
                        <td className="px-3 py-2.5 text-gray-600">{r.gp}</td>
                        <td className="px-3 py-2.5 font-bold text-gray-900">{r.entry}</td>
                        <td className="px-3 py-2.5 text-gray-700">{r.max}</td>
                        <td className="px-3 py-2.5 text-green-600 font-semibold">{r.inc}</td>
                        <td className="px-3 py-2.5 text-gray-500">{r.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'arrears' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Arrears — Monthly Release (₹ Crores)</h2>
                <ChartContainer config={chartConfig} className="h-48">
                  <BarChart data={arrearsData} barSize={40}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="#E69B30" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#6B7280', fontSize: 10, formatter: (v: unknown) => `₹${v}Cr` }} />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-bold text-gray-900">Employee-wise Arrears — Jan 2026</h2>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {['Emp ID', 'Name', 'Old Pay', 'New Pay', 'Months', 'Arrears (Gross)', 'Tax on Arrears', 'Net Arrears'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {revisionHistory.filter(r => r.status === 'approved').map((r) => {
                      const months = 3
                      const monthlyDiff = r.increment + Math.round(r.increment * 0.53) + Math.round(r.increment * 0.27)
                      const gross = monthlyDiff * months
                      const tax = Math.round(gross * 0.1)
                      return (
                        <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-xs font-semibold text-blue-600">{r.empId}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">{r.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">₹{r.oldPay.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{r.newPay.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-center font-semibold text-gray-700">{months}</td>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{gross.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-red-600 font-semibold">₹{tax.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-black text-green-600">₹{(gross - tax).toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Arrears Summary</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Total Arrears (Gross)', value: '₹13,72,48,000', color: '#1A3555' },
                    { label: 'Tax Deducted on Arrears', value: '₹1,37,24,800', color: '#E35A4A' },
                    { label: 'Net Arrears Payable', value: '₹12,35,23,200', color: '#10B981' },
                    { label: 'Pending Disbursement', value: '₹2,18,400', color: '#E69B30' },
                  ].map((s) => (
                    <div key={s.label} className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400">{s.label}</p>
                      <p className="text-lg font-black mt-0.5" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Arrears Release Schedule</h2>
                <div className="space-y-2">
                  {[
                    { label: 'Jan 2026 Arrears', status: 'Released', color: 'text-green-600' },
                    { label: 'Feb 2026 Arrears', status: 'Released', color: 'text-green-600' },
                    { label: 'Mar 2026 Arrears', status: 'Scheduled — Mar 31', color: 'text-amber-600' },
                  ].map((a) => (
                    <div key={a.label} className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
                      <span className="text-gray-700 font-medium">{a.label}</span>
                      <span className={`font-bold text-xs ${a.color}`}>{a.status}</span>
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
