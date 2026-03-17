'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Award, Clock, CheckCircle, AlertCircle, ChevronRight, Download, User, Calendar } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const retireeSoon = [
  { id: 'EMP0023', name: 'K. Raghavendra Rao', designation: 'Dy. City Planner', zone: 'LB Nagar', dor: '31 Mar 2026', service: '35 Yrs 2 Mo', gratuity: '21,00,000', gpf: '48,32,000', pension: '62,400', status: 'processing' },
  { id: 'EMP0045', name: 'S. Nirmala Devi', designation: 'Sr. Asst. Eng.', zone: 'Secunderabad', dor: '30 Apr 2026', service: '34 Yrs 8 Mo', gratuity: '20,00,000', gpf: '41,28,000', pension: '58,200', status: 'initiated' },
  { id: 'EMP0078', name: 'M. Venkateshwarlu', designation: 'Sanitary Inspector', zone: 'Charminar', dor: '31 May 2026', service: '33 Yrs 1 Mo', gratuity: '18,50,000', gpf: '38,64,000', pension: '54,600', status: 'pending' },
  { id: 'EMP0112', name: 'P. Sridhar Reddy', designation: 'Revenue Inspector', zone: 'Kukatpally', dor: '30 Jun 2026', service: '32 Yrs 5 Mo', gratuity: '17,80,000', gpf: '36,90,000', pension: '52,800', status: 'pending' },
]

const benefitBreakdown = [
  { name: 'Gratuity', value: 21, color: '#1A3555' },
  { name: 'GPF Corpus', value: 48, color: '#E69B30' },
  { name: 'Commutation', value: 18, color: '#3B82F6' },
  { name: 'Leave Encashment', value: 8, color: '#10B981' },
]

const pensionData = [
  { year: '2022', amount: 48200 },
  { year: '2023', amount: 52600 },
  { year: '2024', amount: 57800 },
  { year: '2025', amount: 61400 },
  { year: '2026', amount: 64800 },
]

const chartConfig = {
  amount: { label: 'Monthly Pension', color: '#1A3555' },
}

const statusMap: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  processing: { label: 'Processing', color: 'text-blue-600 bg-blue-50', icon: <Clock size={12} /> },
  initiated: { label: 'Initiated', color: 'text-amber-600 bg-amber-50', icon: <AlertCircle size={12} /> },
  pending: { label: 'Pending', color: 'text-gray-500 bg-gray-100', icon: <AlertCircle size={12} /> },
  completed: { label: 'Completed', color: 'text-green-600 bg-green-50', icon: <CheckCircle size={12} /> },
}

const timeline = [
  { step: 'Retirement Sanction Order', done: true, date: 'Feb 10, 2026' },
  { step: 'Service Verification', done: true, date: 'Feb 18, 2026' },
  { step: 'Gratuity Calculation', done: true, date: 'Feb 26, 2026' },
  { step: 'GPF Final Settlement', done: false, date: 'Mar 5, 2026' },
  { step: 'Pension PPO Generation', done: false, date: 'Mar 12, 2026' },
  { step: 'Benefit Disbursement', done: false, date: 'Mar 31, 2026' },
]

export default function TerminalBenefits() {
  const [selected, setSelected] = useState(retireeSoon[0])

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Terminal Benefits" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Terminal Benefits</h1>
            <p className="text-sm text-gray-500 mt-0.5">Retirement processing & superannuation management — FY 2025-26</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 cursor-pointer hover:bg-gray-50 font-medium">
              <Download size={14} /> Export PPO Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              + Initiate Retirement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Retiring This Quarter', value: '12', sub: 'Apr–Jun 2026', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'PPOs Generated', value: '8', sub: 'FY 2025-26', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Avg. Gratuity', value: '₹19.3L', sub: 'Per employee', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Total Payout (FY)', value: '₹24.6Cr', sub: 'All terminal benefits', color: '#E35A4A', bg: 'bg-red-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-3`}>
                <Award size={18} style={{ color: k.color }} />
              </div>
              <p className="text-2xl font-black text-gray-900">{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Upcoming Retirements</h2>
              <span className="text-xs text-gray-400">Next 6 months</span>
            </div>
            <div className="divide-y divide-gray-50">
              {retireeSoon.map((emp) => {
                const s = statusMap[emp.status]
                const isSelected = selected.id === emp.id
                return (
                  <div
                    key={emp.id}
                    onClick={() => setSelected(emp)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50/60' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                        {emp.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{emp.name}</span>
                          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.icon}{s.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">{emp.designation} | {emp.zone} | Service: {emp.service}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-red-600">DOR: {emp.dor}</p>
                        <p className="text-xs text-gray-400">{emp.id}</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-1">Benefit Breakdown</h2>
            <p className="text-xs text-gray-400 mb-3">{selected.name.split(' ')[0]} {selected.name.split(' ').slice(-1)}</p>
            <div className="flex justify-center mb-3">
              <ChartContainer config={{ value: { label: 'Amount', color: '#1A3555' } }} className="h-36 w-full">
                <PieChart>
                  <Pie data={benefitBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {benefitBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Gratuity', value: `₹${selected.gratuity}`, color: '#1A3555' },
                { label: 'GPF Corpus', value: `₹${selected.gpf}`, color: '#E69B30' },
                { label: 'Monthly Pension', value: `₹${selected.pension}`, color: '#3B82F6' },
                { label: 'Leave Encashment', value: '₹3,84,000', color: '#10B981' },
              ].map((b) => (
                <div key={b.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: b.color }} />
                    <span className="text-xs text-gray-600">{b.label}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{b.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-4">Processing Timeline — {selected.name.split(' ')[0]} {selected.name.split(' ').slice(-1)}</h2>
            <div className="relative">
              {timeline.map((t, i) => (
                <div key={t.step} className="flex gap-3 mb-4 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-green-500' : 'bg-gray-100'}`}>
                      {t.done ? <CheckCircle size={14} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                    </div>
                    {i < timeline.length - 1 && <div className={`w-0.5 h-6 mt-1 ${t.done ? 'bg-green-200' : 'bg-gray-100'}`} />}
                  </div>
                  <div className="pt-0.5">
                    <p className={`text-sm font-semibold ${t.done ? 'text-gray-900' : 'text-gray-400'}`}>{t.step}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-4">Average Monthly Pension Trend (GHMC)</h2>
            <ChartContainer config={chartConfig} className="h-52">
              <BarChart data={pensionData} barSize={32}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="#1A3555" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { label: 'Avg. Pension', value: '₹61,400/mo' },
                { label: 'GPF Interest Rate', value: '7.1% p.a.' },
                { label: 'Commutation', value: '40% of Pension' },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
