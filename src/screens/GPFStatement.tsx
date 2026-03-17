'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Download, TrendingUp, DollarSign, Calculator, AlertCircle, CheckCircle, Clock, ChevronDown } from 'lucide-react'
import { Link } from '@/lib'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar } from 'recharts'

const corpusGrowth = [
  { year: '2015', balance: 480000 },
  { year: '2016', balance: 614000 },
  { year: '2017', balance: 758000 },
  { year: '2018', balance: 920000 },
  { year: '2019', balance: 1120000 },
  { year: '2020', balance: 1340000 },
  { year: '2021', balance: 1580000 },
  { year: '2022', balance: 1844000 },
  { year: '2023', balance: 2140000 },
  { year: '2024', balance: 2463000 },
  { year: '2025', balance: 2810000 },
  { year: '2026*', balance: 3194000 },
]

const monthlyDeductions = [
  { month: 'Apr', amount: 9456 }, { month: 'May', amount: 9456 },
  { month: 'Jun', amount: 9456 }, { month: 'Jul', amount: 9456 },
  { month: 'Aug', amount: 9456 }, { month: 'Sep', amount: 9456 },
  { month: 'Oct', amount: 9456 }, { month: 'Nov', amount: 9456 },
  { month: 'Dec', amount: 9456 }, { month: 'Jan', amount: 9456 },
  { month: 'Feb', amount: 9456 }, { month: 'Mar', amount: 0 },
]

const transactions = [
  { date: '01 Feb 2026', type: 'Monthly Subscription', narration: 'Salary deduction — Feb 2026', credit: 9456, debit: 0, balance: 2826456 },
  { date: '01 Jan 2026', type: 'Monthly Subscription', narration: 'Salary deduction — Jan 2026', credit: 9456, debit: 0, balance: 2817000 },
  { date: '31 Mar 2025', type: 'Annual Interest', narration: 'GPF Interest @ 7.1% — FY 2024-25', credit: 193510, debit: 0, balance: 2807544 },
  { date: '01 Mar 2025', type: 'Monthly Subscription', narration: 'Salary deduction — Mar 2025', credit: 9456, debit: 0, balance: 2614034 },
  { date: '15 Jan 2025', type: 'Partial Withdrawal', narration: 'Sanctioned — Education (Rule 15)', credit: 0, debit: 150000, balance: 2604578 },
  { date: '01 Dec 2024', type: 'Monthly Subscription', narration: 'Salary deduction — Dec 2024', credit: 9456, debit: 0, balance: 2754578 },
  { date: '01 Oct 2024', type: 'Temporary Advance', narration: 'Housing loan advance — sanctioned', credit: 0, debit: 300000, balance: 2745122 },
  { date: '31 Mar 2024', type: 'Annual Interest', narration: 'GPF Interest @ 7.1% — FY 2023-24', credit: 178892, debit: 0, balance: 3045122 },
]

const advances = [
  { id: 'ADV-2024-007', type: 'Housing Advance', amount: 300000, drawn: 'Oct 2024', monthly: 12500, recovered: 75000, outstanding: 225000, status: 'active' },
  { id: 'ADV-2022-003', type: 'Education Advance', amount: 100000, drawn: 'Jun 2022', monthly: 5000, recovered: 100000, outstanding: 0, status: 'closed' },
]

const chartConfig = {
  balance: { label: 'GPF Balance (₹)', color: '#1A3555' },
  amount: { label: 'Monthly Deduction (₹)', color: '#E69B30' },
}

export default function GPFStatement() {
  const [tab, setTab] = useState<'statement' | 'advances' | 'projection' | 'history'>('statement')
  const [projYears, setProjYears] = useState('3')

  const currentBalance = 2826456
  const interestRate = 7.1
  const monthlySubscription = 9456
  const years = parseInt(projYears || '3')
  const projectedCorpus = Math.round(currentBalance * Math.pow(1 + interestRate / 100, years) + monthlySubscription * 12 * years * ((Math.pow(1 + interestRate / 100, years) - 1) / (interestRate / 100)))

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Terminal Benefits" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex gap-2 mb-4">
          {[
            { label: 'Employee Profile', to: '/EmployeeProfile' },
            { label: 'Service Book', to: '/ServiceBook' },
            { label: 'GPF Statement', to: '/GPFStatement', active: true },
            { label: 'NPS & Pension', to: '/NPSPension' },
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Pay Slips', to: '/Payroll' },
            { label: 'Leave', to: '/LeaveManagement' },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${(link as any).active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={(link as any).active ? { backgroundColor: '#1A3555' } : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GPF Account Statement</h1>
            <p className="text-sm text-gray-500 mt-0.5">General Provident Fund — Srinivas Reddy K. | Account: TS/GPF/2005/004512</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 font-medium">
              <Download size={14} /> FY 2025-26 Statement
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Download size={14} /> Annual GPF Slip
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Total Corpus (Feb 2026)', value: '₹28,26,456', sub: 'Current balance', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'FY 2025-26 Subscription', value: '₹1,04,016', sub: '11 months credited', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Interest Credited (FY 24-25)', value: '₹1,93,510', sub: '@ 7.1% p.a.', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Outstanding Advances', value: '₹2,25,000', sub: 'Housing advance', color: '#E35A4A', bg: 'bg-red-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <DollarSign size={17} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'statement', label: 'Account Statement' },
            { key: 'history', label: 'Corpus Growth' },
            { key: 'advances', label: 'Advances & Withdrawals' },
            { key: 'projection', label: 'Corpus Projector' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'statement' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Transaction Ledger — FY 2025-26</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <select className="appearance-none px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 outline-none cursor-pointer pr-7">
                      <option>FY 2025-26</option>
                      <option>FY 2024-25</option>
                      <option>FY 2023-24</option>
                    </select>
                    <ChevronDown size={11} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                  </div>
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={12} /> PDF</button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Date', 'Type', 'Narration', 'Credit (₹)', 'Debit (₹)', 'Balance (₹)'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((t, i) => (
                    <tr key={i} className={`hover:bg-gray-50/60 transition-colors ${t.type === 'Annual Interest' ? 'bg-green-50/30' : t.type.includes('Advance') || t.type.includes('Withdrawal') ? 'bg-red-50/20' : ''}`}>
                      <td className="px-4 py-3 text-xs text-gray-600">{t.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.type === 'Annual Interest' ? 'bg-green-50 text-green-700' : t.type === 'Monthly Subscription' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-600'}`}>{t.type}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{t.narration}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-green-600">{t.credit > 0 ? `₹${t.credit.toLocaleString()}` : '—'}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-red-600">{t.debit > 0 ? `₹${t.debit.toLocaleString()}` : '—'}</td>
                      <td className="px-4 py-3 text-sm font-black text-gray-900">₹{t.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">FY 2025-26 Monthly Subscriptions</h2>
                <ChartContainer config={chartConfig} className="h-40">
                  <BarChart data={monthlyDeductions} barSize={16}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 9 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="#E69B30" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
                <div className="mt-3 space-y-2">
                  {[
                    ['Subscription Rate', '12% of Basic Pay'],
                    ['Monthly Deduction', '₹9,456'],
                    ['Annual (FY 2025-26)', '₹1,04,016'],
                    ['Interest Rate (FY 25-26)', '7.1% p.a.'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                      <span className="text-gray-400">{k}</span>
                      <span className="font-bold text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ backgroundColor: '#1A3555' }}>
                <p className="text-xs text-blue-200 mb-1">Estimated Final Settlement</p>
                <p className="text-2xl font-black text-white">₹48,32,000</p>
                <p className="text-xs text-blue-200 mt-1">On retirement (Feb 2040)</p>
                <p className="text-xs text-blue-300 mt-3">Based on 7.1% interest, ₹9,456/mo subscription and 14 years remaining service</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-1">GPF Corpus Growth (2015–2026)</h2>
              <p className="text-xs text-gray-400 mb-4">Cumulative balance (subscription + interest)</p>
              <ChartContainer config={chartConfig} className="h-56">
                <AreaChart data={corpusGrowth}>
                  <defs>
                    <linearGradient id="gpfGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A3555" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1A3555" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="balance" stroke="#1A3555" strokeWidth={2.5} fill="url(#gpfGrad)" />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Year-wise GPF Summary</h2>
              <div className="overflow-y-auto max-h-72">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-100">
                      {['FY', 'Opening', 'Subscriptions', 'Interest', 'Advances', 'Closing'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 py-2 pr-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    {[
                      { fy: '2024-25', opening: 2463000, sub: 113472, interest: 193510, adv: 150000, closing: 2810000 },
                      { fy: '2023-24', opening: 2140000, sub: 113472, interest: 178892, adv: 300000, closing: 2463000 },
                      { fy: '2022-23', opening: 1844000, sub: 110400, interest: 155968, adv: 0, closing: 2140000 },
                      { fy: '2021-22', opening: 1580000, sub: 105600, interest: 134524, adv: 100000, closing: 1844000 },
                      { fy: '2020-21', opening: 1340000, sub: 99600, interest: 115760, adv: 0, closing: 1580000 },
                    ].map((r) => (
                      <tr key={r.fy} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 pr-3 font-semibold text-gray-700">{r.fy}</td>
                        <td className="py-2.5 pr-3 text-gray-600">₹{(r.opening / 100000).toFixed(1)}L</td>
                        <td className="py-2.5 pr-3 text-green-600 font-semibold">+₹{r.sub.toLocaleString()}</td>
                        <td className="py-2.5 pr-3 text-blue-600 font-semibold">+₹{r.interest.toLocaleString()}</td>
                        <td className="py-2.5 pr-3 text-red-500 font-semibold">{r.adv > 0 ? `-₹${r.adv.toLocaleString()}` : '—'}</td>
                        <td className="py-2.5 font-black text-gray-900">₹{(r.closing / 100000).toFixed(1)}L</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'advances' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">GPF Advances & Withdrawals</h2>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Apply for Advance</button>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                {advances.map((a) => (
                  <div key={a.id} className={`rounded-xl border p-4 ${a.status === 'active' ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{a.type}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{a.id} · Drawn: {a.drawn}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.status === 'active' ? 'bg-amber-100 text-amber-700' : 'bg-green-50 text-green-700'}`}>{a.status === 'active' ? 'Active' : 'Closed'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white rounded-lg p-2.5">
                        <p className="text-gray-400">Sanctioned Amount</p>
                        <p className="font-black text-gray-900 text-sm mt-0.5">₹{a.amount.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg p-2.5">
                        <p className="text-gray-400">Monthly Recovery</p>
                        <p className="font-black text-gray-900 text-sm mt-0.5">₹{a.monthly.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg p-2.5">
                        <p className="text-gray-400">Total Recovered</p>
                        <p className="font-black text-green-600 text-sm mt-0.5">₹{a.recovered.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg p-2.5">
                        <p className="text-gray-400">Outstanding</p>
                        <p className={`font-black text-sm mt-0.5 ${a.outstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>{a.outstanding > 0 ? `₹${a.outstanding.toLocaleString()}` : 'NIL'}</p>
                      </div>
                    </div>
                    {a.status === 'active' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Recovery Progress</span>
                          <span className="font-semibold text-gray-700">{Math.round((a.recovered / a.amount) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 rounded-full bg-amber-500" style={{ width: `${(a.recovered / a.amount) * 100}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">GPF Withdrawal Eligibility (Rule 15 & 16)</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { purpose: 'Housing Construction / Purchase', eligible: true, max: '36 months basic or corpus (whichever less)', note: 'After 10 yrs service' },
                  { purpose: 'Education of Children', eligible: true, max: '₹1,50,000 (non-refundable if 15+ yrs service)', note: 'After 15 yrs service' },
                  { purpose: 'Medical Treatment', eligible: true, max: '6 months basic or 50% of corpus', note: 'Any time' },
                  { purpose: 'Marriage of Children', eligible: true, max: '50% of own subscriptions', note: 'After 15 yrs service' },
                  { purpose: 'Motor Vehicle Purchase', eligible: false, max: 'Not applicable under GHMC rules', note: 'Not permitted' },
                  { purpose: 'Final Withdrawal (Retirement)', eligible: true, max: '100% of corpus', note: 'At retirement' },
                ].map((w) => (
                  <div key={w.purpose} className={`rounded-xl p-3 border ${w.eligible ? 'border-green-100 bg-green-50/30' : 'border-red-100 bg-red-50/20'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      {w.eligible ? <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" /> : <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />}
                      <p className="text-xs font-bold text-gray-800">{w.purpose}</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-1 pl-4">{w.max}</p>
                    <p className="text-xs text-gray-400 italic pl-4">{w.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'projection' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calculator size={18} className="text-amber-500" /> GPF Corpus Projector</h2>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">CURRENT BALANCE (₹)</label>
                    <input type="text" defaultValue="28,26,456" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">MONTHLY SUBSCRIPTION (₹)</label>
                    <input type="text" defaultValue="9,456" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5">PROJECTION YEARS</label>
                    <select value={projYears} onChange={e => setProjYears(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer focus:outline-none bg-white">
                      {['1', '2', '3', '5', '7', '10', '14'].map(y => <option key={y} value={y}>{y} {parseInt(y) === 1 ? 'Year' : 'Years'}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="rounded-xl p-4" style={{ backgroundColor: '#1A3555' }}>
                    <p className="text-xs text-blue-200">Projected Corpus</p>
                    <p className="text-2xl font-black text-white mt-1">₹{(projectedCorpus / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-blue-300 mt-1">After {projYears} year{parseInt(projYears) > 1 ? 's' : ''}</p>
                  </div>
                  <div className="rounded-xl p-4 bg-green-50 border border-green-100">
                    <p className="text-xs text-green-600">Interest Earned</p>
                    <p className="text-2xl font-black text-green-700 mt-1">₹{((projectedCorpus - currentBalance - monthlySubscription * 12 * years) / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-green-500 mt-1">@ 7.1% p.a. compound</p>
                  </div>
                  <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
                    <p className="text-xs text-amber-600">Subscriptions Added</p>
                    <p className="text-2xl font-black text-amber-700 mt-1">₹{((monthlySubscription * 12 * years) / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-amber-500 mt-1">₹9,456/mo × {12 * years} months</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm">
                  <p className="font-bold text-gray-800 mb-2">Projection Assumptions</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-gray-500">
                    <p>• Interest rate constant at 7.1% (Govt. may revise annually)</p>
                    <p>• No advances or withdrawals assumed</p>
                    <p>• Monthly subscription revised on annual increment</p>
                    <p>• Interest compounded annually (credited on 31st March)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">GPF Interest Rate History</h2>
                <div className="space-y-2">
                  {[
                    { fy: 'FY 2025-26', rate: '7.1%', status: 'Current' },
                    { fy: 'FY 2024-25', rate: '7.1%', status: 'Past' },
                    { fy: 'FY 2023-24', rate: '7.1%', status: 'Past' },
                    { fy: 'FY 2022-23', rate: '7.1%', status: 'Past' },
                    { fy: 'FY 2021-22', rate: '7.1%', status: 'Past' },
                    { fy: 'FY 2020-21', rate: '7.1%', status: 'Past' },
                    { fy: 'FY 2019-20', rate: '7.9%', status: 'Past' },
                    { fy: 'FY 2018-19', rate: '8.0%', status: 'Past' },
                  ].map((r) => (
                    <div key={r.fy} className="flex justify-between items-center py-1.5 border-b border-gray-50 text-sm">
                      <span className="text-gray-600">{r.fy}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900">{r.rate}</span>
                        {r.status === 'Current' && <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full font-semibold">Current</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Key GPF Rules</h2>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex gap-2 p-2 bg-blue-50 rounded-lg"><span className="text-blue-500 font-bold flex-shrink-0">•</span><span>Minimum subscription: 6% of basic pay per month</span></div>
                  <div className="flex gap-2 p-2 bg-blue-50 rounded-lg"><span className="text-blue-500 font-bold flex-shrink-0">•</span><span>Maximum subscription: No upper limit (voluntary basis)</span></div>
                  <div className="flex gap-2 p-2 bg-blue-50 rounded-lg"><span className="text-blue-500 font-bold flex-shrink-0">•</span><span>Final settlement: Within 30 days of retirement</span></div>
                  <div className="flex gap-2 p-2 bg-blue-50 rounded-lg"><span className="text-blue-500 font-bold flex-shrink-0">•</span><span>Nomination mandatory — can be changed at any time</span></div>
                  <div className="flex gap-2 p-2 bg-blue-50 rounded-lg"><span className="text-blue-500 font-bold flex-shrink-0">•</span><span>GPF is tax-exempt u/s 80C (up to ₹1.5L per year)</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
