'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Download, Search, Filter, ChevronDown, CheckCircle, Clock, AlertCircle, Printer, FileText, Building2 } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts'

const payrollRegisterData = [
  { empId: 'GHMC-001234', name: 'Srinivas Reddy K.', designation: 'Deputy Commissioner', zone: 'Charminar', basic: 78800, da: 41764, hra: 21276, ta: 3600, cca: 5400, special: 4000, gross: 154840, gpf: 9456, tds: 12850, pt: 2500, nps: 7880, welfare: 500, lic: 3200, gi: 120, totalDed: 36506, net: 118334, bank: 'SBI ...0123', status: 'credited' },
  { empId: 'GHMC-002456', name: 'Lakshmi Devi P.', designation: 'Assistant Engineer', zone: 'Khairatabad', basic: 56100, da: 29733, hra: 15147, ta: 3600, cca: 3600, special: 2000, gross: 110180, gpf: 6732, tds: 6840, pt: 2500, nps: 5610, welfare: 500, lic: 2800, gi: 120, totalDed: 25102, net: 85078, bank: 'HDFC ...4512', status: 'credited' },
  { empId: 'GHMC-003789', name: 'Mohammed Irfan S.', designation: 'Senior Clerk', zone: 'Serilingampally', basic: 44900, da: 23797, hra: 12123, ta: 3200, cca: 2400, special: 0, gross: 86420, gpf: 5388, tds: 3420, pt: 2500, nps: 4490, welfare: 500, lic: 0, gi: 120, totalDed: 16418, net: 70002, bank: 'SBI ...7890', status: 'credited' },
  { empId: 'GHMC-004012', name: 'Padma Rani T.', designation: 'Town Planning Officer', zone: 'Kukatpally', basic: 67700, da: 35881, hra: 18279, ta: 3600, cca: 4200, special: 3000, gross: 132660, gpf: 8124, tds: 9800, pt: 2500, nps: 6770, welfare: 500, lic: 4500, gi: 120, totalDed: 32314, net: 100346, bank: 'HDFC ...2341', status: 'pending' },
  { empId: 'GHMC-005678', name: 'Ramesh Kumar G.', designation: 'Sanitary Worker', zone: 'Secunderabad', basic: 21700, da: 11501, hra: 5859, ta: 1800, cca: 1080, special: 0, gross: 41940, gpf: 2604, tds: 0, pt: 1500, nps: 2170, welfare: 200, lic: 0, gi: 60, totalDed: 6534, net: 35406, bank: 'AP Grameena ...5543', status: 'credited' },
  { empId: 'GHMC-006890', name: 'Anitha Kumari V.', designation: 'Revenue Inspector', zone: 'LB Nagar', basic: 35400, da: 18762, hra: 9558, ta: 3200, cca: 2400, special: 0, gross: 69320, gpf: 4248, tds: 1200, pt: 2500, nps: 3540, welfare: 300, lic: 1500, gi: 90, totalDed: 13378, net: 55942, bank: 'SBI ...6712', status: 'credited' },
  { empId: 'GHMC-007345', name: 'Venkat Narayana B.', designation: 'Superintendent Engineer', zone: 'Charminar', basic: 118500, da: 62805, hra: 31995, ta: 3600, cca: 5400, special: 4000, gross: 226300, gpf: 14220, tds: 22400, pt: 2500, nps: 11850, welfare: 500, lic: 8200, gi: 120, totalDed: 59790, net: 166510, bank: 'SBI ...3345', status: 'pending' },
]

const zonePayroll = [
  { zone: 'Serilingampally', employees: 3100, gross: 24.2, deductions: 7.6, net: 16.6 },
  { zone: 'Secunderabad', employees: 2950, gross: 23.1, deductions: 7.2, net: 15.9 },
  { zone: 'Charminar', employees: 2840, gross: 22.2, deductions: 6.9, net: 15.3 },
  { zone: 'Kukatpally', employees: 2780, gross: 21.8, deductions: 6.8, net: 15.0 },
  { zone: 'Khairatabad', employees: 2650, gross: 20.7, deductions: 6.4, net: 14.3 },
  { zone: 'LB Nagar', employees: 2560, gross: 20.0, deductions: 6.2, net: 13.8 },
  { zone: 'Malkajgiri', employees: 2380, gross: 18.6, deductions: 5.8, net: 12.8 },
  { zone: 'Uppal', employees: 2100, gross: 16.4, deductions: 5.1, net: 11.3 },
]

const deductionPie = [
  { name: 'GPF', value: 18, color: '#1A3555' },
  { name: 'Income Tax (TDS)', value: 32, color: '#E35A4A' },
  { name: 'NPS', value: 20, color: '#E69B30' },
  { name: 'Professional Tax', value: 12, color: '#3B82F6' },
  { name: 'LIC / Insurance', value: 12, color: '#10B981' },
  { name: 'Staff Welfare', value: 4, color: '#8B5CF6' },
  { name: 'Group Insurance', value: 2, color: '#9CA3AF' },
]

const chartConfig = {
  gross: { label: 'Gross (₹Cr)', color: '#1A3555' },
  deductions: { label: 'Deductions (₹Cr)', color: '#E35A4A' },
  net: { label: 'Net (₹Cr)', color: '#4CAF50' },
}

const ddoSteps = [
  { step: 'Payroll Generated', done: true, date: 'Mar 14, 2026' },
  { step: 'Attendance Finalized', done: true, date: 'Mar 14, 2026' },
  { step: 'Deductions Verified', done: true, date: 'Mar 15, 2026' },
  { step: 'DDO Certification', done: false, date: 'Mar 17, 2026' },
  { step: 'Treasury Authorization', done: false, date: 'Mar 18, 2026' },
  { step: 'Bank Advice Issued', done: false, date: 'Mar 19, 2026' },
  { step: 'Salary Credited', done: false, date: 'Mar 20, 2026' },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  credited: { label: 'Credited', color: 'bg-green-50 text-green-700' },
  pending: { label: 'Pending', color: 'bg-amber-50 text-amber-700' },
  hold: { label: 'On Hold', color: 'bg-red-50 text-red-600' },
}

const banks = [
  { bank: 'State Bank of India', employees: 18420, amount: '₹78.4 Cr', ifsc: 'SBIN', status: 'sent' },
  { bank: 'HDFC Bank', employees: 5840, amount: '₹24.8 Cr', ifsc: 'HDFC', status: 'sent' },
  { bank: 'AP Grameena Bank', employees: 2960, amount: '₹8.6 Cr', ifsc: 'APGB', status: 'pending' },
  { bank: 'Canara Bank', employees: 1560, amount: '₹6.2 Cr', ifsc: 'CNRB', status: 'pending' },
  { bank: 'Union Bank', employees: 560, amount: '₹2.1 Cr', ifsc: 'UBIN', status: 'pending' },
]

export default function PayrollRegister() {
  const [tab, setTab] = useState<'register' | 'zone' | 'ddo' | 'bank'>('register')
  const [search, setSearch] = useState('')
  const [zone, setZone] = useState('All Zones')

  const filteredData = payrollRegisterData.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.empId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Payroll" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Register</h1>
            <p className="text-sm text-gray-500 mt-0.5">March 2026 — GHMC Pay Register | 29,340 employees | DDO Certification in progress</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 font-medium">
              <Printer size={14} /> Print Register
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Excel Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <FileText size={14} /> Certify & Submit
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Gross Payroll', value: '₹18,63,45,200', sub: 'Mar 2026', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'Total Deductions', value: '₹5,89,12,600', sub: 'GPF + TDS + NPS + PT', color: '#E35A4A', bg: 'bg-red-50' },
            { label: 'Net Disbursement', value: '₹12,74,32,600', sub: 'To be credited', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Pending Credit', value: '₹3,18,20,000', sub: '2 banks pending', color: '#E69B30', bg: 'bg-amber-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <FileText size={17} style={{ color: k.color }} />
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
            { key: 'register', label: 'Pay Register' },
            { key: 'zone', label: 'Zone Summary' },
            { key: 'ddo', label: 'DDO Certification' },
            { key: 'bank', label: 'Bank Payment Advice' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'register' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3 items-center">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search employee or ID..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="relative">
                <select value={zone} onChange={e => setZone(e.target.value)} className="appearance-none px-4 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                  {['All Zones', ...zonePayroll.map(z => z.zone + ' Zone')].map(z => <option key={z}>{z}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                <Filter size={13} /> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-max">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">Emp ID</th>
                    <th className="text-left px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">Name</th>
                    <th className="text-left px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">Zone</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">Basic</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">DA</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">HRA</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">TA+CCA</th>
                    <th className="text-right px-3 py-3 font-bold text-green-600 uppercase tracking-wide">Gross</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">GPF</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">TDS</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">PT</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">NPS</th>
                    <th className="text-right px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">Others</th>
                    <th className="text-right px-3 py-3 font-bold text-red-500 uppercase tracking-wide">Total Ded.</th>
                    <th className="text-right px-3 py-3 font-bold text-green-600 uppercase tracking-wide">Net Pay</th>
                    <th className="text-left px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">Bank</th>
                    <th className="text-center px-3 py-3 font-bold text-gray-400 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.map((e) => {
                    const s = statusConfig[e.status]
                    return (
                      <tr key={e.empId} className="hover:bg-blue-50/20 transition-colors">
                        <td className="px-3 py-3 font-semibold text-blue-600">{e.empId}</td>
                        <td className="px-3 py-3">
                          <p className="font-bold text-gray-900">{e.name}</p>
                          <p className="text-gray-400">{e.designation}</p>
                        </td>
                        <td className="px-3 py-3 text-gray-600">{e.zone}</td>
                        <td className="px-3 py-3 text-right font-semibold text-gray-800">₹{e.basic.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{e.da.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{e.hra.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{(e.ta + e.cca).toLocaleString()}</td>
                        <td className="px-3 py-3 text-right font-black text-green-700">₹{e.gross.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{e.gpf.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{e.tds.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{e.pt.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{e.nps.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right text-gray-600">₹{(e.welfare + e.lic + e.gi).toLocaleString()}</td>
                        <td className="px-3 py-3 text-right font-black text-red-600">₹{e.totalDed.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right font-black text-green-700">₹{e.net.toLocaleString()}</td>
                        <td className="px-3 py-3 text-gray-500">{e.bank}</td>
                        <td className="px-3 py-3 text-center">
                          <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${s.color}`}>{s.label}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                  <tr className="font-black">
                    <td colSpan={3} className="px-3 py-3 text-sm text-gray-700">TOTAL (Showing {filteredData.length} of 29,340)</td>
                    <td className="px-3 py-3 text-right text-xs text-gray-700">₹{filteredData.reduce((a, e) => a + e.basic, 0).toLocaleString()}</td>
                    <td colSpan={2} className="px-3 py-3"></td>
                    <td className="px-3 py-3"></td>
                    <td className="px-3 py-3 text-right text-sm text-green-700">₹{filteredData.reduce((a, e) => a + e.gross, 0).toLocaleString()}</td>
                    <td colSpan={5} className="px-3 py-3"></td>
                    <td className="px-3 py-3 text-right text-sm text-red-600">₹{filteredData.reduce((a, e) => a + e.totalDed, 0).toLocaleString()}</td>
                    <td className="px-3 py-3 text-right text-sm text-green-700">₹{filteredData.reduce((a, e) => a + e.net, 0).toLocaleString()}</td>
                    <td colSpan={2} className="px-3 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {tab === 'zone' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Zone-wise Payroll Summary (₹ Crores) — Mar 2026</h2>
                <ChartContainer config={chartConfig} className="h-56">
                  <BarChart data={zonePayroll} barSize={16}>
                    <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 9 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="gross" fill="#1A3555" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="deductions" fill="#E35A4A" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="net" fill="#4CAF50" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-bold text-gray-900">Zone-wise Detailed Summary</h2>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {['Zone', 'Employees', 'Gross (₹Cr)', 'Deductions (₹Cr)', 'Net (₹Cr)', '% of Total'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {zonePayroll.map((z) => (
                      <tr key={z.zone} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-bold text-gray-900">{z.zone} Zone</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{z.employees.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">₹{z.gross}Cr</td>
                        <td className="px-4 py-3 text-sm font-semibold text-red-500">₹{z.deductions}Cr</td>
                        <td className="px-4 py-3 text-sm font-black text-gray-900">₹{z.net}Cr</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-100 rounded-full">
                              <div className="h-1.5 rounded-full" style={{ width: `${(z.gross / 24.2) * 100}%`, backgroundColor: '#1A3555' }} />
                            </div>
                            <span className="text-xs text-gray-500">{((z.gross / 186.3) * 100).toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 border-t-2 border-gray-200 font-black">
                      <td className="px-4 py-3 text-sm text-gray-900">TOTAL</td>
                      <td className="px-4 py-3 text-sm text-gray-900">29,340</td>
                      <td className="px-4 py-3 text-sm text-green-600">₹186.3Cr</td>
                      <td className="px-4 py-3 text-sm text-red-500">₹58.9Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₹127.4Cr</td>
                      <td className="px-4 py-3 text-sm text-gray-900">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Deduction Breakup</h2>
                <div className="flex justify-center mb-3">
                  <PieChart width={180} height={180}>
                    <Pie data={deductionPie} cx={90} cy={90} innerRadius={54} outerRadius={82} dataKey="value" strokeWidth={0}>
                      {deductionPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </div>
                <div className="space-y-1.5">
                  {deductionPie.map((d) => (
                    <div key={d.name} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-gray-600">{d.name}</span>
                      </div>
                      <span className="font-bold text-gray-800">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Payroll Timeline</h2>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Payroll Cut-off Date', value: '25 Mar 2026', status: 'done' },
                    { label: 'DDO Certification', value: '17 Mar 2026', status: 'pending' },
                    { label: 'Treasury Submission', value: '18 Mar 2026', status: 'pending' },
                    { label: 'Salary Credit Date', value: '20 Mar 2026', status: 'pending' },
                  ].map((t) => (
                    <div key={t.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-gray-600">{t.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-800">{t.value}</span>
                        {t.status === 'done' ? <CheckCircle size={12} className="text-green-500" /> : <Clock size={12} className="text-amber-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'ddo' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-1">DDO Certification Process</h2>
              <p className="text-xs text-gray-400 mb-5">Drawing & Disbursing Officer — March 2026</p>
              <div className="relative">
                {ddoSteps.map((s, i) => (
                  <div key={s.step} className="flex gap-3 mb-5 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-green-500' : i === 3 ? 'bg-amber-400' : 'bg-gray-100'}`}>
                        {s.done ? <CheckCircle size={16} className="text-white" /> : i === 3 ? <Clock size={16} className="text-white" /> : <div className="w-3 h-3 rounded-full bg-gray-300" />}
                      </div>
                      {i < ddoSteps.length - 1 && <div className={`w-0.5 h-6 mt-1 ${s.done ? 'bg-green-200' : 'bg-gray-100'}`} />}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-semibold ${s.done ? 'text-gray-900' : i === 3 ? 'text-amber-700' : 'text-gray-400'}`}>{s.step}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">DDO Certification — Action Required</h2>
                    <p className="text-sm text-gray-500 mt-0.5">The DDO must certify the payroll before Treasury submission. Please verify and certify.</p>
                  </div>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { check: 'All employees present in pay register are authorized by sanctioned strength', ok: true },
                    { check: 'Attendance records verified and finalized for the month', ok: true },
                    { check: 'Deductions (GPF, TDS, PT, NPS) match schedule of deductions', ok: true },
                    { check: 'New appointments / cessations reflected in pay register', ok: true },
                    { check: 'Increment orders for January 2026 incorporated in pay', ok: false },
                    { check: 'Bank account numbers verified for new employees (Feb 2026 joiners)', ok: false },
                  ].map((c, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${c.ok ? 'bg-green-50' : 'bg-amber-50'}`}>
                      {c.ok ? <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /> : <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />}
                      <p className={`text-sm font-medium ${c.ok ? 'text-green-800' : 'text-amber-800'}`}>{c.check}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">DDO Digital Signature & Certification</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">DDO NAME</label>
                      <input type="text" defaultValue="B. Murali Krishna" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" readOnly />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">DDO CODE</label>
                      <input type="text" defaultValue="GHMC/DDO/HQ/004" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" readOnly />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Certify & Submit to Treasury</button>
                    <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Save for Later</button>
                    <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 flex items-center gap-1.5"><Download size={13} /> Download Bill</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'bank' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Bank-wise Payment Advice — March 2026</h2>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                  <Download size={14} /> Generate All Advices
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {banks.map((b) => (
                  <div key={b.bank} className="px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${b.status === 'sent' ? 'bg-green-50' : 'bg-amber-50'}`}>
                      <Building2 size={18} style={{ color: b.status === 'sent' ? '#10B981' : '#E69B30' }} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{b.bank}</p>
                      <p className="text-xs text-gray-400">{b.ifsc} · {b.employees.toLocaleString()} employees</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 text-sm">{b.amount}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.status === 'sent' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{b.status === 'sent' ? 'Advice Sent' : 'Pending'}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="text-xs px-2.5 py-1.5 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-1"><Download size={11} />Advice</button>
                      {b.status === 'pending' && <button className="text-xs px-2.5 py-1.5 bg-blue-500 text-white rounded-lg font-semibold cursor-pointer">Send Now</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Salary Credit Status — Employee Level</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Successfully Credited', value: '23,980', color: '#10B981', icon: CheckCircle },
                  { label: 'Pending Credit', value: '5,360', color: '#E69B30', icon: Clock },
                  { label: 'Failed / RTN', value: '0', color: '#E35A4A', icon: AlertCircle },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: `${s.color}10` }}>
                    <s.icon size={28} style={{ color: s.color }} />
                    <div>
                      <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs text-gray-600">{s.label}</p>
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
