'use client'
import React from 'react'
import Components from '../components'
import { Users, CheckCircle, Clock, DollarSign, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const payrollData = [
  { month: 'Sep', value: 16.8 },
  { month: 'Oct', value: 17.1 },
  { month: 'Nov', value: 17.4 },
  { month: 'Dec', value: 17.8 },
  { month: 'Jan', value: 18.2 },
  { month: 'Feb', value: 18.6 },
]

const zones = [
  { name: 'Serilingampally Zone', count: 3100 },
  { name: 'Secunderabad Zone', count: 2950 },
  { name: 'Charminar Zone', count: 2840 },
  { name: 'Kukatpally Zone', count: 2780 },
  { name: 'Khairatabad Zone', count: 2650 },
  { name: 'LB Nagar Zone', count: 2560 },
  { name: 'Malkajgiri Zone', count: 2380 },
  { name: 'Uppal Zone', count: 2100 },
]

const attendancePie = [
  { name: 'Present', value: 27485, color: '#4CAF50' },
  { name: 'Absent', value: 1245, color: '#E35A4A' },
  { name: 'On Leave', value: 892, color: '#E69B30' },
  { name: 'On Duty', value: 378, color: '#3B82F6' },
]

const approvals = [
  { name: 'Lakshmi Devi P.', type: 'Leave', typeColor: '#4CAF50', detail: 'CL - 18 Mar to 19 Mar 2026' },
  { name: 'Mohammed Irfan S.', type: 'Travel', typeColor: '#E69B30', detail: 'TA/DA Claim - ₹14,500' },
  { name: 'Padma Rani T.', type: 'IT Decl.', typeColor: '#3B82F6', detail: 'Actual Investment Declaration FY 2025-26' },
  { name: 'Anitha Kumari V.', type: 'Leave', typeColor: '#4CAF50', detail: 'EL - 20 Mar to 28 Mar 2026' },
]

const chartConfig = {
  value: { label: 'Payroll (₹ Cr)', color: '#1A3555' },
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Dashboard" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Sri R.V.Karnan, IAS</h1>
          <p className="text-sm text-gray-500 mt-0.5">Commissioner — Head Office | Monday, 16 March 2026</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'TOTAL EMPLOYEES', value: '29,340', trend: '+3.2% vs last month', up: true, icon: Users, accent: '#248C7C' },
            { label: 'PRESENT TODAY', value: '27,485', trend: '91.4% vs last month', up: true, icon: CheckCircle, accent: '#439C8C' },
            { label: 'PENDING APPROVALS', value: '48', trend: '-12% vs last month', up: false, icon: Clock, accent: '#EC3898' },
            { label: 'PAYROLL PROCESSED', value: '₹18.6 Cr', trend: 'Feb 2026 vs last month', up: true, icon: DollarSign, accent: '#F081BD' },
          ].map((kpi) => {
            const Icon = kpi.icon
            return (
              <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100" style={{ borderLeft: `3px solid ${kpi.accent}` }}>
                <div className="flex justify-between items-start mb-3">
                  <p className="text-xs font-semibold text-gray-500 tracking-wide">{kpi.label}</p>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.accent}15` }}>
                    <Icon size={16} style={{ color: kpi.accent }} />
                  </div>
                </div>
                <p className="text-2xl font-black text-gray-900 mb-1">{kpi.value}</p>
                <div className="flex items-center gap-1">
                  {kpi.up ? <TrendingUp size={12} className="text-green-500" /> : <TrendingDown size={12} className="text-red-500" />}
                  <span className={`text-xs font-medium ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>{kpi.trend}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Monthly Payroll Trend (₹ Crores)</h2>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600">FY 2025-26</span>
            </div>
            <ChartContainer config={chartConfig} className="h-48">
              <BarChart data={payrollData} barSize={32}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#248C7C" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#6B7280', fontSize: 10, formatter: (v: unknown) => `₹${v}Cr` }} />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Zone-wise Distribution</h2>
            <div className="space-y-2.5">
              {zones.map((zone) => (
                <div key={zone.name} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-44 flex-shrink-0">{zone.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${(zone.count / 3100) * 100}%`, background: 'linear-gradient(90deg, #248C7C, #EC3898)' }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-10 text-right">{zone.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Pending Approvals</h2>
            <div className="space-y-3">
              {approvals.map((a, i) => (
                <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-800">{a.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: a.typeColor }}>{a.type}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{a.detail}</p>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded-md text-white font-semibold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>Approve</button>
                    <button className="text-xs px-3 py-1 rounded-md border border-gray-300 text-gray-600 font-semibold cursor-pointer hover:bg-gray-50">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-3">Today's Attendance</h2>
            <div className="flex justify-center mb-4">
              <div className="relative w-36 h-36">
                <PieChart width={144} height={144}>
                  <Pie data={attendancePie} cx={68} cy={68} innerRadius={48} outerRadius={68} dataKey="value" strokeWidth={0}>
                    {attendancePie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-gray-900">91.4%</span>
                  <span className="text-xs text-gray-500">Present</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {attendancePie.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-xs text-gray-500">{item.name}</p>
                    <p className="text-xs font-bold text-gray-800">{item.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Announcements</h2>
            <div className="space-y-4">
              {[
                { date: '15 Mar 2026', title: 'Salary Processing for March 2026 — Input Deadline', desc: 'All zones must complete attendance finalization by 25th March.' },
                { date: '14 Mar 2026', title: 'Actual IT Declaration — Last Date Extended', desc: 'Submit actual investment proofs by 31st March via ESS portal.' },
                { date: '12 Mar 2026', title: 'GHMC Foundation Day — Holiday on 16th April', desc: 'All offices to remain closed. Holiday master updated.' },
              ].map((ann, i) => (
                <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <p className="text-xs font-bold mb-1" style={{ color: '#E69B30' }}>{ann.date}</p>
                  <p className="text-sm font-semibold text-gray-800 leading-tight mb-1">{ann.title}</p>
                  <p className="text-xs text-gray-500">{ann.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
