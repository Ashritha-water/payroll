'use client'
import React, { useState } from 'react'
import Components from '../components'
import { TrendingUp, TrendingDown, Download, AlertCircle, CheckCircle, Clock, Filter, FileText } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'

const budgetHeads = [
  { head: 'Basic Pay', code: '0101', budgeted: 1248.50, released: 1100.00, expended: 1086.40, pct: 87.0 },
  { head: 'Dearness Allowance', code: '0102', budgeted: 661.70, released: 583.00, expended: 575.79, pct: 87.0 },
  { head: 'House Rent Allowance', code: '0103', budgeted: 336.90, released: 296.96, expended: 293.33, pct: 87.1 },
  { head: 'Travel Allowance', code: '0104', budgeted: 42.00, released: 37.00, expended: 34.21, pct: 81.5 },
  { head: 'City Compensatory Allowance', code: '0105', budgeted: 28.80, released: 25.40, expended: 24.19, pct: 84.0 },
  { head: 'Medical Reimbursement', code: '0201', budgeted: 18.50, released: 14.00, expended: 12.84, pct: 69.4 },
  { head: 'GPF Subscription (Employer)', code: '0301', budgeted: 148.60, released: 131.00, expended: 127.42, pct: 85.7 },
  { head: 'NPS Employer Share', code: '0302', budgeted: 144.20, released: 127.00, expended: 122.68, pct: 85.1 },
  { head: 'Honorarium / Overtime', code: '0401', budgeted: 24.00, released: 18.00, expended: 21.60, pct: 90.0 },
  { head: 'TA / DA on Tour', code: '0501', budgeted: 8.40, released: 6.50, expended: 5.78, pct: 68.8 },
  { head: 'Training Expenditure', code: '0601', budgeted: 4.20, released: 3.00, expended: 2.10, pct: 50.0 },
  { head: 'Terminal Benefits (Gratuity)', code: '0701', budgeted: 38.00, released: 32.00, expended: 28.90, pct: 76.1 },
]

const monthlyTrend = [
  { month: 'Apr', budget: 186.3, actual: 179.4, variance: 6.9 },
  { month: 'May', budget: 186.3, actual: 181.2, variance: 5.1 },
  { month: 'Jun', budget: 186.3, actual: 184.0, variance: 2.3 },
  { month: 'Jul', budget: 186.3, actual: 186.3, variance: 0 },
  { month: 'Aug', budget: 186.3, actual: 188.9, variance: -2.6 },
  { month: 'Sep', budget: 186.3, actual: 183.4, variance: 2.9 },
  { month: 'Oct', budget: 214.8, actual: 212.8, variance: 2.0 },
  { month: 'Nov', budget: 186.3, actual: 187.0, variance: -0.7 },
  { month: 'Dec', budget: 186.3, actual: 185.1, variance: 1.2 },
  { month: 'Jan', budget: 186.3, actual: 186.3, variance: 0 },
  { month: 'Feb', budget: 186.3, actual: 185.8, variance: 0.5 },
  { month: 'Mar', budget: 186.3, actual: 186.3, variance: 0 },
]

const zoneAllocation = [
  { zone: 'Serilingampally', allotted: 29.4, expended: 25.6, pct: 87.1 },
  { zone: 'Secunderabad', allotted: 28.1, expended: 24.2, pct: 86.1 },
  { zone: 'Charminar', allotted: 27.0, expended: 23.5, pct: 87.0 },
  { zone: 'Kukatpally', allotted: 26.5, expended: 21.4, pct: 80.8 },
  { zone: 'Khairatabad', allotted: 25.2, expended: 22.8, pct: 90.5 },
  { zone: 'LB Nagar', allotted: 24.3, expended: 21.6, pct: 88.9 },
  { zone: 'Malkajgiri', allotted: 22.6, expended: 19.7, pct: 87.2 },
  { zone: 'Uppal', allotted: 19.9, expended: 16.8, pct: 84.4 },
]

const supplementary = [
  { desc: 'Festival Advance — Diwali 2025', amount: 18.40, status: 'Approved', date: 'Oct 2025' },
  { desc: 'Arrears — PRC 2017 (Final Instalment)', amount: 42.60, status: 'Approved', date: 'Jun 2025' },
  { desc: 'DA Enhancement (4 months backlog)', amount: 24.80, status: 'Under Process', date: 'Feb 2026' },
  { desc: 'Bonus — Productivity Linked (2024-25)', amount: 8.20, status: 'Pending Grant', date: 'Mar 2026' },
]

const reconciliation = [
  { item: 'Treasury Challan Receipts', count: 248, amount: '₹1,086.4 Cr', status: 'matched' },
  { item: 'GPF Deductions Remitted', count: 29340, amount: '₹127.4 Cr', status: 'matched' },
  { item: 'TDS Deposited (Form 24Q)', count: 8420, amount: '₹48.6 Cr', status: 'matched' },
  { item: 'NPS Contribution Uploaded', count: 29340, amount: '₹122.7 Cr', status: 'matched' },
  { item: 'Professional Tax Remitted', count: 29340, amount: '₹58.9 Cr', status: 'pending' },
  { item: 'LIC / GIS Group Insurance', count: 14200, amount: '₹8.4 Cr', status: 'pending' },
]

const chartConfig = {
  budget: { label: 'Budget (₹Cr)', color: '#1A3555' },
  actual: { label: 'Actual (₹Cr)', color: '#10B981' },
  expended: { label: 'Expended', color: '#1A3555' },
  allotted: { label: 'Allotted', color: '#E5E7EB' },
}

export default function BudgetAllocation() {
  const [tab, setTab] = useState<'heads' | 'trend' | 'zones' | 'reconciliation'>('heads')

  const totalBudget = budgetHeads.reduce((a, b) => a + b.budgeted, 0)
  const totalExpended = budgetHeads.reduce((a, b) => a + b.expended, 0)
  const totalReleased = budgetHeads.reduce((a, b) => a + b.released, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Finance" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Budget & Expenditure</h1>
            <p className="text-sm text-gray-500 mt-0.5">FY 2025-26 — GHMC Salary & Establishment Budget</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <FileText size={14} /> Supplementary Grant
            </button>
          </div>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Annual Budget', value: `₹${totalBudget.toFixed(1)} Cr`, sub: 'Salary & Establishment', color: '#1A3555', bg: 'bg-blue-50', icon: TrendingUp },
            { label: 'Released to Date', value: `₹${totalReleased.toFixed(1)} Cr`, sub: `${((totalReleased / totalBudget) * 100).toFixed(1)}% of budget`, color: '#8B5CF6', bg: 'bg-purple-50', icon: TrendingUp },
            { label: 'Expended', value: `₹${totalExpended.toFixed(1)} Cr`, sub: `${((totalExpended / totalBudget) * 100).toFixed(1)}% utilization`, color: '#10B981', bg: 'bg-green-50', icon: CheckCircle },
            { label: 'Balance', value: `₹${(totalBudget - totalExpended).toFixed(1)} Cr`, sub: '3.5 months remaining', color: '#E69B30', bg: 'bg-amber-50', icon: Clock },
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
            { key: 'heads', label: 'Budget Heads' },
            { key: 'trend', label: 'Monthly Trend' },
            { key: 'zones', label: 'Zone Allocation' },
            { key: 'reconciliation', label: 'Reconciliation' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'heads' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Head-wise Budget vs Expenditure (₹ Crores)</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Head of Account', 'Code', 'Budgeted (₹Cr)', 'Released (₹Cr)', 'Expended (₹Cr)', 'Balance', 'Utilization %'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {budgetHeads.map(b => {
                  const balance = b.budgeted - b.expended
                  const overrun = b.expended > b.budgeted
                  return (
                    <tr key={b.code} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{b.head}</td>
                      <td className="px-4 py-3 text-xs text-blue-600 font-bold">{b.code}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-700">₹{b.budgeted.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">₹{b.released.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">₹{b.expended.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${overrun ? 'text-red-600' : 'text-green-600'}`}>
                          {overrun ? '—' : `₹${balance.toFixed(2)}`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(b.pct, 100)}%`, backgroundColor: b.pct > 100 ? '#E35A4A' : b.pct > 90 ? '#E69B30' : '#10B981' }} />
                          </div>
                          <span className={`text-xs font-black ${b.pct > 100 ? 'text-red-600' : b.pct > 90 ? 'text-amber-600' : 'text-green-700'}`}>{b.pct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                <tr className="bg-gray-50 border-t-2 border-gray-200 font-black">
                  <td className="px-4 py-3 text-sm text-gray-900">TOTAL</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{totalBudget.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{totalReleased.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{totalExpended.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-green-700">₹{(totalBudget - totalExpended).toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{((totalExpended / totalBudget) * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {tab === 'trend' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Monthly Payroll Budget vs Actuals — FY 2025-26 (₹ Crores)</h2>
              <ChartContainer config={chartConfig} className="h-64">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis domain={[170, 220]} axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="budget" stroke="#1A3555" strokeWidth={2} dot={false} name="Budget" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: '#10B981' }} name="Actual" />
                </LineChart>
              </ChartContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Supplementary Grant Requests — FY 2025-26</h2>
              <div className="divide-y divide-gray-50">
                {supplementary.map((s, i) => (
                  <div key={i} className="py-3 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${s.status === 'Approved' ? 'bg-green-50' : s.status === 'Under Process' ? 'bg-blue-50' : 'bg-amber-50'}`}>
                      {s.status === 'Approved' ? <CheckCircle size={15} className="text-green-500" /> : <Clock size={15} className={s.status === 'Under Process' ? 'text-blue-500' : 'text-amber-500'} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{s.desc}</p>
                      <p className="text-xs text-gray-400">{s.date}</p>
                    </div>
                    <p className="font-black text-gray-900">₹{s.amount} Cr</p>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.status === 'Approved' ? 'bg-green-50 text-green-700' : s.status === 'Under Process' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'zones' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Zone-wise Budget Allocation vs Expenditure (₹ Crores)</h2>
            <ChartContainer config={chartConfig} className="h-56 mb-6">
              <BarChart data={zoneAllocation} barSize={20}>
                <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="allotted" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expended" fill="#1A3555" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="grid grid-cols-4 gap-3">
              {zoneAllocation.map(z => (
                <div key={z.zone} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-bold text-gray-700 mb-1">{z.zone}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-400">Allotted</p>
                      <p className="text-sm font-semibold text-gray-700">₹{z.allotted}Cr</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Spent</p>
                      <p className="text-sm font-black text-gray-900">₹{z.expended}Cr</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div className="h-1.5 rounded-full" style={{ width: `${z.pct}%`, backgroundColor: z.pct > 90 ? '#E35A4A' : '#1A3555' }} />
                    </div>
                    <p className="text-xs font-black mt-0.5" style={{ color: z.pct > 90 ? '#E35A4A' : '#10B981' }}>{z.pct}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'reconciliation' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Treasury & Deduction Reconciliation — March 2026</h2>
                <p className="text-xs text-gray-400 mt-0.5">Cross-verification of all payroll deductions with treasury & statutory remittances</p>
              </div>
              <div className="divide-y divide-gray-50">
                {reconciliation.map(r => (
                  <div key={r.item} className="px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${r.status === 'matched' ? 'bg-green-50' : 'bg-amber-50'}`}>
                      {r.status === 'matched' ? <CheckCircle size={15} className="text-green-500" /> : <Clock size={15} className="text-amber-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{r.item}</p>
                      <p className="text-xs text-gray-400">{r.count.toLocaleString()} entries</p>
                    </div>
                    <p className="font-black text-gray-900">{r.amount}</p>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.status === 'matched' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{r.status === 'matched' ? '✓ Matched' : 'Pending'}</span>
                    {r.status !== 'matched' && <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Reconcile</button>}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-800 text-sm">Core Remittances Reconciled</p>
                  <p className="text-xs text-green-700 mt-0.5">GPF, TDS, NPS, and treasury challans for March 2026 have been reconciled and match CFMS records. No discrepancies found.</p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-800 text-sm">PT & Group Insurance Pending</p>
                  <p className="text-xs text-amber-700 mt-0.5">Professional Tax remittance to Hyderabad GHMC (₹58.9 Cr) and LIC Group Insurance (₹8.4 Cr) are pending reconciliation. Submit before 25-Mar-2026.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
