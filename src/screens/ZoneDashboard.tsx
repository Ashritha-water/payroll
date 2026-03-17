'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Users, TrendingUp, TrendingDown, MapPin, ChevronRight, Eye, Download, BarChart3 } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'

const zones = [
  {
    id: 'SER', name: 'Serilingampally Zone', commissioner: 'Sri D. Vinay Kumar, IAS',
    employees: 3100, present: 2914, absent: 112, leave: 74, payroll: 28.4,
    pendingApprovals: 12, attritionRisk: 3, compliance: 91,
    attendance: 94.0, payrollAccuracy: 98.2, leaveUtil: 88.4, claimsPending: 8,
    circles: ['Chandanagar', 'Gachibowli', 'Kondapur', 'Miyapur'],
    color: '#3B82F6',
  },
  {
    id: 'SEC', name: 'Secunderabad Zone', commissioner: 'Smt. R. Padmavathi, IPS',
    employees: 2950, present: 2714, absent: 136, leave: 100, payroll: 26.8,
    pendingApprovals: 9, attritionRisk: 2, compliance: 89,
    attendance: 92.0, payrollAccuracy: 97.8, leaveUtil: 85.2, claimsPending: 5,
    circles: ['Trimulgherry', 'Malkajgiri', 'Alwal', 'Bowenpally'],
    color: '#8B5CF6',
  },
  {
    id: 'CHA', name: 'Charminar Zone', commissioner: 'Sri M. Abdul Aziz',
    employees: 2840, present: 2530, absent: 198, leave: 112, payroll: 24.2,
    pendingApprovals: 21, attritionRisk: 8, compliance: 76,
    attendance: 89.1, payrollAccuracy: 94.6, leaveUtil: 79.8, claimsPending: 18,
    circles: ['Charminar', 'Falaknuma', 'Rajendranagar', 'Chandrayangutta'],
    color: '#E35A4A',
  },
  {
    id: 'KUK', name: 'Kukatpally Zone', commissioner: 'Smt. K. Swapna Reddy',
    employees: 2780, present: 2614, absent: 102, leave: 64, payroll: 25.6,
    pendingApprovals: 7, attritionRisk: 4, compliance: 93,
    attendance: 94.1, payrollAccuracy: 98.8, leaveUtil: 90.2, claimsPending: 4,
    circles: ['KPHB', 'Balanagar', 'Quthbullapur', 'Suraram'],
    color: '#10B981',
  },
  {
    id: 'KHB', name: 'Khairatabad Zone', commissioner: 'Sri P. Venkataiah',
    employees: 2650, present: 2432, absent: 142, leave: 76, payroll: 23.8,
    pendingApprovals: 14, attritionRisk: 5, compliance: 84,
    attendance: 91.8, payrollAccuracy: 96.4, leaveUtil: 82.6, claimsPending: 11,
    circles: ['Ameerpet', 'Jubilee Hills', 'Banjara Hills', 'Panjagutta'],
    color: '#E69B30',
  },
  {
    id: 'LBN', name: 'LB Nagar Zone', commissioner: 'Smt. V. Kalyani',
    employees: 2560, present: 2368, absent: 128, leave: 64, payroll: 22.4,
    pendingApprovals: 11, attritionRisk: 3, compliance: 87,
    attendance: 92.5, payrollAccuracy: 97.2, leaveUtil: 86.4, claimsPending: 7,
    circles: ['LB Nagar', 'Saroornagar', 'Hayathnagar', 'Vanasthalipuram'],
    color: '#06B6D4',
  },
  {
    id: 'MAL', name: 'Malkajgiri Zone', commissioner: 'Sri C. Suresh Babu',
    employees: 2380, present: 2088, absent: 198, leave: 94, payroll: 20.8,
    pendingApprovals: 18, attritionRisk: 9, compliance: 72,
    attendance: 87.7, payrollAccuracy: 93.8, leaveUtil: 76.2, claimsPending: 22,
    circles: ['Malkajgiri', 'Kapra', 'Mallapur', 'Uppal'],
    color: '#F59E0B',
  },
  {
    id: 'UPP', name: 'Uppal Zone', commissioner: 'Sri N. Ramesh Rao',
    employees: 2100, present: 1932, absent: 112, leave: 56, payroll: 18.6,
    pendingApprovals: 8, attritionRisk: 2, compliance: 90,
    attendance: 92.0, payrollAccuracy: 97.6, leaveUtil: 87.8, claimsPending: 6,
    circles: ['Uppal', 'Ghatkesar', 'Boduppal', 'Medipalli'],
    color: '#EC4899',
  },
]

const chartConfig = {
  employees: { label: 'Employees', color: '#1A3555' },
  payroll: { label: 'Payroll ₹Cr', color: '#E69B30' },
}

type Metric = 'compliance' | 'attendance' | 'payrollAccuracy' | 'pendingApprovals'

export default function ZoneDashboard() {
  const [selected, setSelected] = useState<typeof zones[0] | null>(zones[0])
  const [metric, setMetric] = useState<Metric>('compliance')

  const radarData = selected ? [
    { subject: 'Attendance', value: selected.attendance },
    { subject: 'Payroll Acc.', value: selected.payrollAccuracy },
    { subject: 'Compliance', value: selected.compliance },
    { subject: 'Leave Util.', value: selected.leaveUtil },
    { subject: 'Claims Free', value: 100 - selected.claimsPending },
  ] : []

  const metricLabel: Record<Metric, string> = {
    compliance: 'HR Compliance Score',
    attendance: 'Attendance %',
    payrollAccuracy: 'Payroll Accuracy',
    pendingApprovals: 'Pending Approvals',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Dashboard" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Zone Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Commissioner-level zone-wise HR analytics — 8 zones · 29,340 employees</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export Report
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Total Zones', value: '8', sub: 'All zones active', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'Avg Attendance', value: '91.8%', sub: '↑ 1.2% vs last month', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Low Compliance Zones', value: '2', sub: 'Charminar & Malkajgiri', color: '#E35A4A', bg: 'bg-red-50' },
            { label: 'Total Payroll (Mar)', value: '₹190.6 Cr', sub: 'All 8 zones combined', color: '#E69B30', bg: 'bg-amber-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <BarChart3 size={17} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          {/* Zone cards */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Zone-wise Overview</h2>
              <div className="flex gap-1.5">
                {(['compliance', 'attendance', 'payrollAccuracy', 'pendingApprovals'] as Metric[]).map(m => (
                  <button key={m} onClick={() => setMetric(m)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${metric === m ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`} style={metric === m ? { backgroundColor: '#1A3555' } : {}}>
                    {metricLabel[m].split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {zones.map(z => {
                const val = z[metric]
                const isSelected = selected?.id === z.id
                const metricVal = metric === 'pendingApprovals' ? z.pendingApprovals : z[metric as 'compliance' | 'attendance' | 'payrollAccuracy']
                const barPct = metric === 'pendingApprovals' ? Math.min((z.pendingApprovals / 25) * 100, 100) : metricVal as number
                const barColor = metric === 'pendingApprovals' ? (z.pendingApprovals > 15 ? '#E35A4A' : z.pendingApprovals > 8 ? '#E69B30' : '#10B981') : ((metricVal as number) >= 90 ? '#10B981' : (metricVal as number) >= 80 ? '#E69B30' : '#E35A4A')

                return (
                  <div key={z.id} onClick={() => setSelected(z)} className={`px-4 py-3.5 flex items-center gap-4 cursor-pointer transition-all ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-black" style={{ backgroundColor: z.color }}>
                      {z.id.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-gray-900 text-sm truncate">{z.name}</p>
                        <p className="text-xs font-black ml-4 flex-shrink-0" style={{ color: barColor }}>
                          {metric === 'pendingApprovals' ? z.pendingApprovals : `${metricVal}%`}
                        </p>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full">
                        <div className="h-1.5 rounded-full transition-all" style={{ width: `${barPct}%`, backgroundColor: barColor }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{z.commissioner} · {z.employees.toLocaleString()} employees</p>
                    </div>
                    <ChevronRight size={14} className={`text-gray-300 flex-shrink-0 transition-colors ${isSelected ? 'text-blue-500' : ''}`} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Zone Detail Panel */}
          {selected && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black" style={{ backgroundColor: selected.color }}>
                    {selected.id.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm leading-tight">{selected.name}</p>
                    <p className="text-xs text-gray-400">{selected.commissioner}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: 'Employees', value: selected.employees.toLocaleString(), color: '#1A3555' },
                    { label: 'Present', value: selected.present.toLocaleString(), color: '#10B981' },
                    { label: 'On Leave', value: selected.leave, color: '#E69B30' },
                    { label: 'Absent', value: selected.absent, color: '#E35A4A' },
                  ].map(s => (
                    <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                      <p className="text-sm font-black" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Payroll (Mar 2026)', value: `₹${selected.payroll}Cr` },
                    { label: 'Pending Approvals', value: selected.pendingApprovals },
                    { label: 'High Attrition Risk', value: `${selected.attritionRisk} employees` },
                    { label: 'Compliance Score', value: `${selected.compliance}%` },
                  ].map(i => (
                    <div key={i.label} className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                      <span className="text-gray-400">{i.label}</span>
                      <span className="font-bold text-gray-800">{i.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2">HR Metrics Radar</h3>
                <ChartContainer config={{ value: { label: 'Score', color: selected.color } }} className="h-44">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <Radar dataKey="value" stroke={selected.color} fill={selected.color} fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ChartContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Circles / Divisions</h3>
                <div className="space-y-1.5">
                  {selected.circles.map(c => (
                    <div key={c} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-2">
                        <MapPin size={11} style={{ color: selected.color }} />
                        <span className="text-xs text-gray-700 font-medium">{c}</span>
                      </div>
                      <span className="text-xs text-gray-400 cursor-pointer hover:text-blue-600 flex items-center gap-1">
                        <Eye size={10} /> View
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Zone Comparison Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-bold text-gray-900 mb-4">Zone-wise Employee & Payroll Comparison</h2>
          <ChartContainer config={chartConfig} className="h-48">
            <BarChart data={zones.map(z => ({ name: z.id, employees: z.employees, payroll: z.payroll * 10 }))} barGap={4}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="employees" fill="#1A3555" radius={[4, 4, 0, 0]} barSize={22} />
              <Bar dataKey="payroll" fill="#E69B30" radius={[4, 4, 0, 0]} barSize={22} />
            </BarChart>
          </ChartContainer>
          <div className="flex gap-4 mt-1">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1A3555' }} /><span className="text-xs text-gray-500">Headcount</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#E69B30' }} /><span className="text-xs text-gray-500">Payroll × 10 (₹Cr)</span></div>
          </div>
        </div>
      </main>
    </div>
  )
}
