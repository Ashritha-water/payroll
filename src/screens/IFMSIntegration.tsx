'use client'
import React, { useState } from 'react'
import Components from '../components'
import {
  Building2, CheckCircle, AlertTriangle, XCircle, Clock, Download,
  RefreshCw, Send, FileText, DollarSign, Activity, Database,
  TrendingUp, ArrowRight, ChevronDown, Landmark, Shield
} from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts'

const billSubmissions = [
  { ddo: 'DDO-001 — Commissioner Office', desig: 'Commissioner HQ', employees: 284, grossSalary: '₹42,18,340', deductions: '₹8,94,210', netPayable: '₹33,24,130', billNo: 'GHMC/HO/SAL/03/2026/001', submittedOn: '20 Mar 2026', treasuryStatus: 'Passed', voucherNo: 'VO/HYD/2026/084512', disbursed: true },
  { ddo: 'DDO-002 — Charminar Zone', desig: 'Zonal Office Charminar', employees: 2840, grossSalary: '₹3,24,80,420', deductions: '₹68,42,810', netPayable: '₹2,56,37,610', billNo: 'GHMC/CZ/SAL/03/2026/002', submittedOn: '20 Mar 2026', treasuryStatus: 'Passed', voucherNo: 'VO/HYD/2026/084618', disbursed: true },
  { ddo: 'DDO-003 — Kukatpally Zone', desig: 'Zonal Office Kukatpally', employees: 2780, grossSalary: '₹3,12,42,180', deductions: '₹65,18,430', netPayable: '₹2,47,23,750', billNo: 'GHMC/KZ/SAL/03/2026/003', submittedOn: '21 Mar 2026', treasuryStatus: 'Under Audit', voucherNo: '—', disbursed: false },
  { ddo: 'DDO-004 — Serilingampally', desig: 'Zonal Office Serilingampally', employees: 3100, grossSalary: '₹3,48,92,600', deductions: '₹72,80,240', netPayable: '₹2,76,12,360', billNo: 'GHMC/SZ/SAL/03/2026/004', submittedOn: '21 Mar 2026', treasuryStatus: 'Passed', voucherNo: 'VO/HYD/2026/084802', disbursed: true },
  { ddo: 'DDO-005 — Secunderabad Zone', desig: 'Zonal Office Secunderabad', employees: 2950, grossSalary: '₹3,28,14,050', deductions: '₹68,82,410', netPayable: '₹2,59,31,640', billNo: 'GHMC/SCZ/SAL/03/2026/005', submittedOn: '22 Mar 2026', treasuryStatus: 'Objected', voucherNo: '—', disbursed: false },
  { ddo: 'DDO-006 — LB Nagar Zone', desig: 'Zonal Office LB Nagar', employees: 2560, grossSalary: '₹2,86,48,320', deductions: '₹60,16,340', netPayable: '₹2,26,31,980', billNo: 'GHMC/LBZ/SAL/03/2026/006', submittedOn: '22 Mar 2026', treasuryStatus: 'Passed', voucherNo: 'VO/HYD/2026/085104', disbursed: true },
  { ddo: 'DDO-007 — Malkajgiri Zone', desig: 'Zonal Office Malkajgiri', employees: 2380, grossSalary: '₹2,62,14,680', deductions: '₹54,84,230', netPayable: '₹2,07,30,450', billNo: 'GHMC/MLZ/SAL/03/2026/007', submittedOn: '23 Mar 2026', treasuryStatus: 'Submitted', voucherNo: '—', disbursed: false },
  { ddo: 'DDO-008 — Uppal Zone', desig: 'Zonal Office Uppal', employees: 2100, grossSalary: '₹2,28,64,200', deductions: '₹47,92,840', netPayable: '₹1,80,71,360', billNo: 'GHMC/UZ/SAL/03/2026/008', submittedOn: '23 Mar 2026', treasuryStatus: 'Submitted', voucherNo: '—', disbursed: false },
  { ddo: 'DDO-009 — Khairatabad Zone', desig: 'Zonal Office Khairatabad', employees: 2650, grossSalary: '₹2,96,88,400', deductions: '₹62,40,680', netPayable: '₹2,34,47,720', billNo: 'GHMC/KBZ/SAL/03/2026/009', submittedOn: '24 Mar 2026', treasuryStatus: 'Pending Submission', voucherNo: '—', disbursed: false },
]

const monthlyDisbursement = [
  { month: 'Sep', gross: 16.8, net: 13.4, deductions: 3.4 },
  { month: 'Oct', gross: 17.1, net: 13.7, deductions: 3.4 },
  { month: 'Nov', gross: 17.4, net: 13.9, deductions: 3.5 },
  { month: 'Dec', gross: 17.8, net: 14.2, deductions: 3.6 },
  { month: 'Jan', gross: 18.2, net: 14.6, deductions: 3.6 },
  { month: 'Feb', gross: 18.6, net: 14.9, deductions: 3.7 },
  { month: 'Mar', gross: 19.2, net: 15.4, deductions: 3.8 },
]

const budgetHeads = [
  { head: '2054-00-095-00', desc: 'Pay of Officers (Gazetted)', sanctions: '₹48.20 Cr', utilized: '₹42.18 Cr', balance: '₹6.02 Cr', utilPct: 87.5 },
  { head: '2054-00-095-01', desc: 'Pay of Establishment (Non-Gazetted)', sanctions: '₹142.60 Cr', utilized: '₹128.40 Cr', balance: '₹14.20 Cr', utilPct: 90.0 },
  { head: '2054-00-095-02', desc: 'Allowances (HRA, CCA, DA)', sanctions: '₹38.40 Cr', utilized: '₹33.82 Cr', balance: '₹4.58 Cr', utilPct: 88.1 },
  { head: '2054-00-096-00', desc: 'Medical Reimbursement', sanctions: '₹8.20 Cr', utilized: '₹5.42 Cr', balance: '₹2.78 Cr', utilPct: 66.1 },
  { head: '2054-00-097-00', desc: 'TA/DA & Tour Expenses', sanctions: '₹4.80 Cr', utilized: '₹2.84 Cr', balance: '₹1.96 Cr', utilPct: 59.2 },
  { head: '2054-00-099-00', desc: 'Pension & Terminal Benefits', sanctions: '₹24.60 Cr', utilized: '₹21.48 Cr', balance: '₹3.12 Cr', utilPct: 87.3 },
]

const deductionRemittances = [
  { type: 'Income Tax (TDS)', account: 'OLTAS / CIN', frequency: 'Monthly', lastRemitted: '07 Mar 2026', amount: '₹1,84,20,340', status: 'Remitted', challan: 'OLTAS/03/2026/GHMC' },
  { type: 'GPF Subscription', account: 'AG Telangana', frequency: 'Monthly', lastRemitted: '05 Mar 2026', amount: '₹2,14,80,200', status: 'Remitted', challan: 'AGTG/GPF/03/2026' },
  { type: 'NPS Contribution (Tier-I)', account: 'CRA / NSDL', frequency: 'Monthly', lastRemitted: '10 Mar 2026', amount: '₹84,20,400', status: 'Remitted', challan: 'NSDL/CRA/03/2026/GHMC' },
  { type: 'Professional Tax', account: 'GHMC Commercial Tax', frequency: 'Monthly', lastRemitted: '08 Mar 2026', amount: '₹18,40,200', status: 'Remitted', challan: 'PT/03/2026' },
  { type: 'Recovery (GIS / LIC / Housing)', account: 'Respective Agencies', frequency: 'Monthly', lastRemitted: '06 Mar 2026', amount: '₹42,80,140', status: 'Remitted', challan: 'Various' },
  { type: 'ESI (Outsourced Staff)', account: 'ESIC — Hyderabad', frequency: 'Monthly', lastRemitted: 'Pending', amount: '₹12,84,200', status: 'Overdue', challan: '—' },
]

const chartConfig = {
  gross: { label: 'Gross Salary (₹ Cr)', color: '#1A3555' },
  net: { label: 'Net Disbursed (₹ Cr)', color: '#10B981' },
  deductions: { label: 'Deductions (₹ Cr)', color: '#E69B30' },
}

const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  'Passed': { bg: 'bg-green-50', text: 'text-green-700', icon: <CheckCircle size={11} /> },
  'Under Audit': { bg: 'bg-blue-50', text: 'text-blue-700', icon: <Clock size={11} /> },
  'Submitted': { bg: 'bg-purple-50', text: 'text-purple-700', icon: <Send size={11} /> },
  'Objected': { bg: 'bg-red-50', text: 'text-red-700', icon: <XCircle size={11} /> },
  'Pending Submission': { bg: 'bg-amber-50', text: 'text-amber-700', icon: <AlertTriangle size={11} /> },
}

export default function IFMSIntegration() {
  const [tab, setTab] = useState<'bills' | 'disbursement' | 'budget' | 'deductions' | 'preaudit'>('bills')

  const passed = billSubmissions.filter(b => b.treasuryStatus === 'Passed').length
  const objected = billSubmissions.filter(b => b.treasuryStatus === 'Objected').length
  const pending = billSubmissions.filter(b => ['Submitted', 'Under Audit', 'Pending Submission'].includes(b.treasuryStatus)).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Payroll" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">IFMS / Treasury Integration</h1>
            <p className="text-sm text-gray-500 mt-0.5">Telangana CFMS · DDO Pay Bill Submission · Salary Disbursement · Budget Heads · Pre-audit — March 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <RefreshCw size={14} /> Sync IFMS
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
              <Send size={14} /> Submit All Bills
            </button>
          </div>
        </div>

        {/* IFMS Connection Banner */}
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-green-800">IFMS / CFMS Connection — Active</p>
            <p className="text-xs text-green-600">Connected to TS CFMS API v4.2 · Treasury Office Hyderabad · Last sync: 16 Mar 2026, 09:30 AM · DDO Code: GHMC-HYD-001</p>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="text-green-700"><span className="font-bold">{passed}</span> Bills Passed</span>
            <span className="text-amber-700"><span className="font-bold">{pending}</span> Pending</span>
            <span className="text-red-700"><span className="font-bold">{objected}</span> Objected</span>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {[
            { label: 'Total Gross Salary (Mar)', value: '₹19.2 Cr', sub: 'All DDOs combined', color: '#1A3555' },
            { label: 'Net Disbursed (Passed)', value: '₹11.96 Cr', sub: '4 DDOs treasury cleared', color: '#10B981' },
            { label: 'Pending Treasury Clearance', value: '₹7.24 Cr', sub: '5 DDOs in pipeline', color: '#E69B30' },
            { label: 'Objection Held', value: '₹2.59 Cr', sub: 'DDO-005 Secunderabad', color: '#DC2626' },
            { label: 'TDS Remitted to Govt', value: '₹1.84 Cr', sub: 'OLTAS March challan', color: '#8B5CF6' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">{k.label}</p>
              <p className="text-lg font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'bills', label: 'DDO Pay Bills' },
            { key: 'disbursement', label: 'Disbursement Trend' },
            { key: 'budget', label: 'Budget Head Utilization' },
            { key: 'deductions', label: 'Deduction Remittances' },
            { key: 'preaudit', label: 'Pre-audit Checklist' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* DDO Pay Bills Tab */}
        {tab === 'bills' && (
          <div className="space-y-4">
            {/* Objection Alert */}
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <XCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-800">Treasury Objection — DDO-005 Secunderabad Zone</p>
                <p className="text-xs text-red-600 mt-0.5">Objection raised: "Increment drawn without sanction order attached. Ref: Objection No. TO/HYD/OBJ/2026/0412." — Action required: Attach G.O. and resubmit by 28 Mar 2026.</p>
              </div>
              <button className="text-xs font-bold px-3 py-1.5 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 flex-shrink-0">Respond</button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">DDO-wise Pay Bill Status — March 2026</h2>
                <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                  <Download size={12} /> Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {['DDO / Office', 'Employees', 'Gross Salary', 'Deductions', 'Net Payable', 'Bill No.', 'Submitted On', 'Treasury Status', 'Voucher No.', 'Action'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 px-3 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {billSubmissions.map((b, i) => {
                      const sc = statusConfig[b.treasuryStatus]
                      return (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-3">
                            <p className="text-xs font-bold text-gray-900">{b.ddo.split(' — ')[0]}</p>
                            <p className="text-xs text-gray-400">{b.desig}</p>
                          </td>
                          <td className="px-3 py-3 text-sm font-bold text-gray-700">{b.employees.toLocaleString()}</td>
                          <td className="px-3 py-3 text-sm font-semibold text-gray-800">{b.grossSalary}</td>
                          <td className="px-3 py-3 text-sm text-red-600">{b.deductions}</td>
                          <td className="px-3 py-3 text-sm font-black text-green-700">{b.netPayable}</td>
                          <td className="px-3 py-3 text-xs font-mono text-blue-600">{b.billNo.split('/').slice(-3).join('/')}</td>
                          <td className="px-3 py-3 text-xs text-gray-600">{b.submittedOn}</td>
                          <td className="px-3 py-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                              {sc.icon}{b.treasuryStatus}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-xs font-mono text-gray-600">{b.voucherNo}</td>
                          <td className="px-3 py-3">
                            <div className="flex gap-1">
                              <button className="text-xs px-2 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View</button>
                              {b.treasuryStatus === 'Pending Submission' && (
                                <button className="text-xs px-2 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100">Submit</button>
                              )}
                              {b.treasuryStatus === 'Objected' && (
                                <button className="text-xs px-2 py-1 bg-red-50 border border-red-200 text-red-700 rounded-lg cursor-pointer hover:bg-red-100">Revise</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 border-t-2 border-gray-200">
                      <td className="px-3 py-3 text-xs font-black text-gray-900">TOTAL — All 9 DDOs</td>
                      <td className="px-3 py-3 text-sm font-black text-gray-900">29,644</td>
                      <td className="px-3 py-3 text-sm font-black text-gray-900">₹19.28 Cr</td>
                      <td className="px-3 py-3 text-sm font-black text-red-600">₹3.84 Cr</td>
                      <td className="px-3 py-3 text-sm font-black text-green-700">₹15.44 Cr</td>
                      <td colSpan={5}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Disbursement Trend Tab */}
        {tab === 'disbursement' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Monthly Salary Outgo — FY 2025-26 (₹ Crores)</h2>
                <ChartContainer config={chartConfig} className="h-56">
                  <BarChart data={monthlyDisbursement} barSize={18}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="gross" fill="#1A3555" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="net" fill="#10B981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="deductions" fill="#E69B30" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
                <div className="flex gap-5 mt-2">
                  {[['#1A3555', 'Gross'], ['#10B981', 'Net Disbursed'], ['#E69B30', 'Deductions']].map(([c, l]) => (
                    <div key={l} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{ backgroundColor: c }} /><span className="text-xs text-gray-500">{l}</span></div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Bank-wise Salary Credit Distribution — March 2026</h2>
                <div className="space-y-3">
                  {[
                    { bank: 'State Bank of India', employees: 14820, amount: '₹7.84 Cr', pct: 50.9, color: '#1A3555' },
                    { bank: 'Andhra Bank / Union Bank', employees: 6240, amount: '₹3.24 Cr', pct: 21.0, color: '#3B82F6' },
                    { bank: 'Indian Bank', employees: 3480, amount: '₹1.82 Cr', pct: 11.8, color: '#10B981' },
                    { bank: 'Canara Bank', employees: 2840, amount: '₹1.48 Cr', pct: 9.6, color: '#E69B30' },
                    { bank: 'Bank of Baroda', employees: 1260, amount: '₹0.64 Cr', pct: 4.2, color: '#8B5CF6' },
                    { bank: 'Other Banks', employees: 700, amount: '₹0.38 Cr', pct: 2.5, color: '#9CA3AF' },
                  ].map(b => (
                    <div key={b.bank}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">{b.bank}</span>
                        <div className="text-right">
                          <span className="text-xs font-black" style={{ color: b.color }}>{b.amount}</span>
                          <span className="text-xs text-gray-400 ml-2">({b.employees.toLocaleString()} emp)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                  <span className="text-xs text-gray-400">Credit mode: NEFT/RTGS via TS Treasury</span>
                  <span className="text-xs font-bold text-gray-600">ECS mandate file: <span className="text-green-600">Submitted ✓</span></span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Disbursement Timeline — March 2026 Processing</h2>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100" />
                {[
                  { date: '18 Mar 2026', event: 'Salary input deadline — All zones finalize attendance & leave', status: 'done', ddo: 'All DDOs' },
                  { date: '20 Mar 2026', event: 'DDO-001, 002, 004 — Bills submitted to CFMS treasury portal', status: 'done', ddo: 'HO, Charminar, Serilingampally' },
                  { date: '21 Mar 2026', event: 'DDO-003, 005 bills submitted — DDO-005 objection received from TO', status: 'done', ddo: 'Kukatpally, Secunderabad' },
                  { date: '22 Mar 2026', event: 'DDO-006 bill passed. DDO-004 treasury voucher received — disbursement initiated', status: 'done', ddo: 'LB Nagar, Serilingampally' },
                  { date: '23 Mar 2026', event: 'DDO-007, 008 bills submitted. Treasury audit in progress', status: 'active', ddo: 'Malkajgiri, Uppal' },
                  { date: '24 Mar 2026', event: 'DDO-009 bill to be submitted. DDO-005 objection response deadline', status: 'pending', ddo: 'Khairatabad, Secunderabad' },
                  { date: '25 Mar 2026', event: 'Target: All passed bills — salary credit to employee bank accounts', status: 'pending', ddo: 'All DDOs' },
                  { date: '28 Mar 2026', event: 'Reconciliation with TS Treasury — final MIS submission to Commissioner', status: 'pending', ddo: 'Finance Team' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 mb-4 pl-10 relative">
                    <div className={`absolute left-3.5 top-1 w-3 h-3 rounded-full border-2 border-white flex-shrink-0 ${step.status === 'done' ? 'bg-green-500' : step.status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-gray-200'}`} style={{ marginLeft: '-1px' }} />
                    <div className="flex-1 bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-gray-800">{step.event}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${step.status === 'done' ? 'bg-green-50 text-green-700' : step.status === 'active' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                          {step.status === 'done' ? 'Done' : step.status === 'active' ? 'In Progress' : 'Upcoming'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{step.date} · {step.ddo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Budget Head Utilization Tab */}
        {tab === 'budget' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-gray-900">Budget Head Utilization — FY 2025-26</h2>
                  <p className="text-xs text-gray-400 mt-0.5">GHMC HR Expenditure — Budget Head Code 2054 (Administration of Justice — Personnel)</p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full">As of 16 March 2026</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Budget Head Code', 'Description', 'Sanctioned Amount', 'Utilized (YTD)', 'Balance', 'Utilization %', 'Status'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {budgetHeads.map((b, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono font-bold text-blue-600">{b.head}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{b.desc}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{b.sanctions}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">{b.utilized}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-700">{b.balance}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-100 rounded-full">
                            <div className="h-2 rounded-full transition-all" style={{ width: `${b.utilPct}%`, backgroundColor: b.utilPct >= 90 ? '#E35A4A' : b.utilPct >= 75 ? '#E69B30' : '#10B981' }} />
                          </div>
                          <span className="text-xs font-black" style={{ color: b.utilPct >= 90 ? '#E35A4A' : b.utilPct >= 75 ? '#E69B30' : '#10B981' }}>{b.utilPct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.utilPct >= 90 ? 'bg-red-50 text-red-700' : b.utilPct >= 75 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                          {b.utilPct >= 90 ? 'Near Exhaustion' : b.utilPct >= 75 ? 'Moderate' : 'Adequate'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-100 bg-amber-50/40">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">
                    <span className="font-bold">Budget Alert:</span> Head 2054-00-095-01 (Non-Gazetted Pay) at 90% utilization with Q4 salary remaining. Finance dept requested supplementary grant of ₹14.20 Cr — pending GO. Contact: CFO Office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deduction Remittances Tab */}
        {tab === 'deductions' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mb-1">
              {[
                { label: 'Total Deductions (Mar)', value: '₹3.84 Cr', sub: 'Across all 9 DDOs', color: '#1A3555' },
                { label: 'Remitted to Agencies', value: '₹5 of 6', sub: 'On time', color: '#10B981' },
                { label: 'Overdue Remittances', value: '1', sub: 'ESI — action needed', color: '#DC2626' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className="text-xl font-black mt-1" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Salary Deduction Remittance Register — March 2026</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Deduction Type', 'Remittance Account', 'Frequency', 'Last Remitted', 'Amount', 'Challan / Ref', 'Status'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {deductionRemittances.map((d, i) => (
                    <tr key={i} className={`hover:bg-gray-50 transition-colors ${d.status === 'Overdue' ? 'bg-red-50/30' : ''}`}>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{d.type}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{d.account}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{d.frequency}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{d.lastRemitted}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-800">{d.amount}</td>
                      <td className="px-4 py-3 text-xs font-mono text-blue-600">{d.challan}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${d.status === 'Remitted' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {d.status === 'Remitted' ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Statutory Compliance Calendar — FY 2025-26</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { statute: 'TDS (Income Tax)', deadline: '7th of following month', next: '7 Apr 2026', form: 'Form 24G / OLTAS' },
                  { statute: 'GPF Subscription', deadline: '5th of following month', next: '5 Apr 2026', form: 'AG Telangana Schedule' },
                  { statute: 'NPS Tier-I (CRA)', deadline: '10th of following month', next: '10 Apr 2026', form: 'NSDL CRA Upload' },
                  { statute: 'ESI Challan', deadline: '15th of following month', next: '15 Apr 2026', form: 'ESIC Challan' },
                  { statute: 'Professional Tax', deadline: '10th of following month', next: '10 Apr 2026', form: 'Form V (TS PT Act)' },
                  { statute: 'Form 24Q (TDS Return)', deadline: '15th after quarter end', next: '15 Jul 2026', form: 'TRACES Portal' },
                  { statute: 'Form 16 (Employees)', deadline: '15 June (YE)', next: '15 Jun 2026', form: 'TRACES Portal' },
                  { statute: 'Annual GPF Statement', deadline: '31 March (FY end)', next: '31 Mar 2026', form: 'AG Telangana' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs font-black text-gray-800 mb-1">{s.statute}</p>
                    <p className="text-xs text-gray-500 mb-2">Deadline: <span className="font-semibold text-gray-700">{s.deadline}</span></p>
                    <p className="text-xs font-bold text-blue-600 mb-1">Next: {s.next}</p>
                    <p className="text-xs text-gray-400">{s.form}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pre-audit Checklist Tab */}
        {tab === 'preaudit' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Pre-audit Checklist — Salary Bill Submission to Treasury</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    category: 'Attendance & Leave',
                    items: [
                      { check: 'Attendance register finalized & certified by HOD', done: true },
                      { check: 'Leave sanctioning orders uploaded for all absentees', done: true },
                      { check: 'Biometric/Geo-attendance muster reconciled', done: true },
                      { check: 'EOL / Dies Non clearly marked in service book', done: false },
                    ]
                  },
                  {
                    category: 'Pay Fixation',
                    items: [
                      { check: 'Increment GOs (increments due in month) attached', done: false },
                      { check: 'New joinee/promotee pay fixation orders attached', done: true },
                      { check: 'LOP (Loss of Pay) deduction computed correctly', done: true },
                      { check: 'Salary revision arrears separately computed', done: true },
                    ]
                  },
                  {
                    category: 'Deductions',
                    items: [
                      { check: 'IT deduction per latest declaration / TDS computation', done: true },
                      { check: 'GPF subscription per subscriber ledger', done: true },
                      { check: 'NPS contribution (employer + employee separately)', done: true },
                      { check: 'Loan recovery schedule attached', done: true },
                    ]
                  },
                  {
                    category: 'Treasury Submission',
                    items: [
                      { check: 'Bill countersigned by DDO (Digital Signature)', done: true },
                      { check: 'HOA (Head of Account) correctly mapped in CFMS', done: true },
                      { check: 'Budget availability confirmed (no overdraft)', done: true },
                      { check: 'Objection memo responses attached (if applicable)', done: false },
                    ]
                  },
                ].map((section) => {
                  const doneCount = section.items.filter(i => i.done).length
                  return (
                    <div key={section.category} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-800 text-sm">{section.category}</h3>
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${doneCount === section.items.length ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {doneCount}/{section.items.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {section.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${item.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                              {item.done && <CheckCircle size={10} color="white" />}
                            </div>
                            <span className={`text-xs leading-relaxed ${item.done ? 'text-gray-600' : 'text-gray-800 font-semibold'}`}>{item.check}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div>
                  <p className="text-sm font-bold text-amber-900">3 checklist items pending — DDO-005 (Secunderabad)</p>
                  <p className="text-xs text-amber-700 mt-0.5">Increment GO attachment + EOL marking + Objection response required before resubmission.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded-lg cursor-pointer hover:bg-amber-700">
                  Complete Checklist <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Audit Trail — IFMS System Activity Log</h2>
              <div className="space-y-2">
                {[
                  { time: '09:30 AM', user: 'DDO Finance Officer (GHMC/HO)', action: 'CFMS Sync triggered. 9 DDO bills status refreshed.', type: 'sync' },
                  { time: '08:45 AM', user: 'Finance Officer K. Srinivasa', action: 'DDO-006 (LB Nagar) Treasury Voucher VO/HYD/2026/085104 received. Salary disbursement initiated.', type: 'pass' },
                  { time: '07:22 AM', user: 'Treasury Office Hyderabad', action: 'Objection raised on DDO-005: Increment order missing. Ref: TO/HYD/OBJ/2026/0412.', type: 'objection' },
                  { time: '15 Mar, 06:40 PM', user: 'Finance Officer P. Lakshmi', action: 'DDO-007, 008 bills submitted to CFMS treasury portal. Pending audit.', type: 'submit' },
                  { time: '15 Mar, 04:15 PM', user: 'Accounts Superintendent', action: 'Budget availability confirmed for DDO-007 & 008 (Head 2054-00-095-01).', type: 'budget' },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${log.type === 'pass' ? 'bg-green-500' : log.type === 'objection' ? 'bg-red-500' : log.type === 'submit' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-gray-800">{log.user}</span>
                        <span className="text-xs text-gray-400">{log.time}</span>
                      </div>
                      <p className="text-xs text-gray-600">{log.action}</p>
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
