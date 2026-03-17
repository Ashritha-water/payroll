'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Zap, Users, DollarSign, Clock, ChevronRight, Activity, ArrowUp, ArrowDown } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, ResponsiveContainer, Cell } from 'recharts'

const attritionRisk = [
  { name: 'T. Phani Kumar', role: 'Asst. Engineer', zone: 'Kukatpally', score: 87, drivers: ['5+ yrs stagnation', 'Low salary', 'Transfer pending'] },
  { name: 'M. Lakshmi Prasad', role: 'Sr. Clerk', zone: 'LB Nagar', score: 74, drivers: ['No promotion (4 yrs)', 'Overtime overload'] },
  { name: 'K. Venugopal', role: 'Data Entry Op.', zone: 'Charminar', score: 68, drivers: ['Low engagement', 'Peer departures'] },
  { name: 'B. Sravanthi', role: 'Jr. Engineer', zone: 'Secunderabad', score: 61, drivers: ['Extended probation', 'Skills mismatch'] },
]

const payrollForecast = [
  { month: 'Apr', actual: 242, forecast: null },
  { month: 'May', actual: 244, forecast: null },
  { month: 'Jun', actual: 246, forecast: null },
  { month: 'Jul', actual: 249, forecast: null },
  { month: 'Aug', actual: 251, forecast: null },
  { month: 'Sep', actual: 248, forecast: null },
  { month: 'Oct', actual: 253, forecast: null },
  { month: 'Nov', actual: 255, forecast: null },
  { month: 'Dec', actual: 258, forecast: null },
  { month: 'Jan', actual: 261, forecast: null },
  { month: 'Feb', actual: 263, forecast: null },
  { month: 'Mar', actual: null, forecast: 266 },
  { month: 'Apr\'27', actual: null, forecast: 271 },
  { month: 'May\'27', actual: null, forecast: 275 },
]

const anomalies = [
  { type: 'Payroll Anomaly', desc: 'EMP4512 salary spike — 340% above norm', severity: 'critical', time: '2 hrs ago', resolved: false },
  { type: 'Attendance Fraud', desc: '12 employees — identical biometric time stamps', severity: 'high', time: '1 day ago', resolved: false },
  { type: 'Duplicate Claim', desc: 'Medical claim submitted twice — EMP2234', severity: 'medium', time: '2 days ago', resolved: true },
  { type: 'Leave Abuse', desc: '28 employees with Monday/Friday patterns', severity: 'medium', time: '3 days ago', resolved: false },
  { type: 'TDS Mismatch', desc: 'PAN not linked for 47 employees', severity: 'low', time: '1 week ago', resolved: true },
]

const zonePerformance = [
  { zone: 'Kukatpally', attendance: 94, payroll: 92, leave: 88, claims: 90, overall: 91 },
  { zone: 'LB Nagar', attendance: 91, payroll: 95, leave: 85, claims: 88, overall: 90 },
  { zone: 'Secunderabad', attendance: 88, payroll: 91, leave: 90, claims: 83, overall: 88 },
  { zone: 'Charminar', attendance: 82, payroll: 88, leave: 79, claims: 85, overall: 84 },
  { zone: 'KPHB', attendance: 90, payroll: 93, leave: 87, claims: 91, overall: 90 },
  { zone: 'Malakpet', attendance: 79, payroll: 85, leave: 82, claims: 78, overall: 81 },
]

const kpiTrend = [
  { mo: 'Oct', val: 91.2 }, { mo: 'Nov', val: 92.4 }, { mo: 'Dec', val: 90.8 },
  { mo: 'Jan', val: 93.1 }, { mo: 'Feb', val: 94.2 }, { mo: 'Mar', val: 93.8 },
]

const aiInsights = [
  { insight: 'Payroll will hit ₹275Cr by May 2027 (+5.3%)', impact: 'Financial Planning', action: 'Budget provision required', positive: false },
  { insight: '3 zones show improving attendance trends (↑2.4%)', impact: 'Productivity', action: 'Share best practices', positive: true },
  { insight: 'Attrition probability peaks in Jun–Aug', impact: 'Workforce Risk', action: 'Initiate retention programs', positive: false },
  { insight: 'GPF corpus projected at ₹2,840Cr by year end', impact: 'Finance', action: 'Review investment strategy', positive: true },
]

const chartConfig = {
  actual: { label: 'Actual (₹Cr)', color: '#1A3555' },
  forecast: { label: 'AI Forecast (₹Cr)', color: '#E69B30' },
  val: { label: 'Performance Score', color: '#1A3555' },
}

const severityConfig: Record<string, { label: string; color: string }> = {
  critical: { label: 'Critical', color: 'text-red-700 bg-red-50 border-red-200' },
  high: { label: 'High', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  medium: { label: 'Medium', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  low: { label: 'Low', color: 'text-gray-600 bg-gray-50 border-gray-200' },
}

function RiskBar({ score }: { score: number }) {
  const color = score >= 80 ? '#E35A4A' : score >= 65 ? '#E69B30' : '#10B981'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
        <div className="h-1.5 rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-black w-8" style={{ color }}>{score}%</span>
    </div>
  )
}

export default function AIAnalytics() {
  const [activeInsight, setActiveInsight] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="AI Analytics" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain size={24} style={{ color: '#8B5CF6' }} /> AI Analytics & Insights
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">ML-powered workforce intelligence — last updated Mar 16, 2026 04:30 AM</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#F3F0FF' }}>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold text-purple-700">AI Engine Active</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'AI Model Accuracy', value: '94.7%', change: '+1.2%', up: true, color: '#8B5CF6', bg: 'bg-purple-50' },
            { label: 'Anomalies Detected', value: '5', change: '3 unresolved', up: false, color: '#E35A4A', bg: 'bg-red-50' },
            { label: 'Attrition Risk (High)', value: '4', change: '↑ from last month', up: false, color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Payroll Forecast Accuracy', value: '98.1%', change: '+0.4%', up: true, color: '#10B981', bg: 'bg-green-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <Brain size={17} style={{ color: k.color }} />
              </div>
              <p className="text-2xl font-black text-gray-900">{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className={`text-xs font-bold mt-1 flex items-center gap-0.5 ${k.up ? 'text-green-600' : 'text-red-500'}`}>
                {k.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{k.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-900">Payroll Forecast — AI Prediction (₹ Crores)</h2>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full font-semibold">95% CI ±2.1%</span>
            </div>
            <ChartContainer config={chartConfig} className="h-52">
              <LineChart data={payrollForecast}>
                <XAxis dataKey="mo" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <YAxis domain={[230, 290]} hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="actual" stroke="#1A3555" strokeWidth={2.5} dot={false} connectNulls={false} />
                <Line type="monotone" dataKey="forecast" stroke="#E69B30" strokeWidth={2.5} strokeDasharray="5 4" dot={false} connectNulls={false} />
              </LineChart>
            </ChartContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 rounded" style={{ backgroundColor: '#1A3555' }} /><span className="text-xs text-gray-500">Actual</span></div>
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 rounded border-t-2 border-dashed" style={{ borderColor: '#E69B30' }} /><span className="text-xs text-gray-500">AI Forecast</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-3">AI-Generated Insights</h2>
            <div className="space-y-2">
              {aiInsights.map((ins, i) => (
                <div key={i} onClick={() => setActiveInsight(i)} className={`p-3 rounded-xl cursor-pointer transition-all border ${activeInsight === i ? 'border-purple-200 bg-purple-50' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                  <div className="flex items-start gap-2">
                    <Zap size={13} className={`mt-0.5 flex-shrink-0 ${ins.positive ? 'text-green-500' : 'text-amber-500'}`} />
                    <div>
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{ins.insight}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Impact: {ins.impact}</p>
                      {activeInsight === i && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <ChevronRight size={11} className="text-purple-500" />
                          <span className="text-xs font-semibold text-purple-700">{ins.action}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-1">Attrition Risk Radar</h2>
            <p className="text-xs text-gray-400 mb-3">ML score based on 18 behavioral signals</p>
            <div className="space-y-3">
              {attritionRisk.map((e) => (
                <div key={e.name} className="p-3 rounded-xl bg-gray-50 hover:bg-red-50/30 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <p className="text-xs font-bold text-gray-800">{e.name}</p>
                      <p className="text-xs text-gray-400">{e.role} · {e.zone}</p>
                    </div>
                  </div>
                  <RiskBar score={e.score} />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {e.drivers.map(d => <span key={d} className="text-xs bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">{d}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-1">Anomaly Detection Log</h2>
            <p className="text-xs text-gray-400 mb-3">Real-time AI surveillance alerts</p>
            <div className="space-y-2">
              {anomalies.map((a, i) => {
                const s = severityConfig[a.severity]
                return (
                  <div key={i} className={`p-3 rounded-xl border ${a.resolved ? 'opacity-50' : ''} ${s.color}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-xs font-bold`}>{a.type}</p>
                        <p className="text-xs mt-0.5 opacity-80">{a.desc}</p>
                        <p className="text-xs mt-1 opacity-60">{a.time}</p>
                      </div>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full border ${s.color}`}>{a.resolved ? 'Resolved' : s.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h2 className="font-bold text-gray-900 mb-1">Zone Performance Heatmap</h2>
            <p className="text-xs text-gray-400 mb-3">Overall HR compliance score by zone</p>
            <div className="space-y-2">
              {zonePerformance.map((z) => (
                <div key={z.zone}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-700">{z.zone}</span>
                    <span className="text-xs font-black" style={{ color: z.overall >= 90 ? '#10B981' : z.overall >= 85 ? '#E69B30' : '#E35A4A' }}>{z.overall}%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-0.5">
                    {[z.attendance, z.payroll, z.leave, z.claims].map((v, j) => (
                      <div key={j} className="h-3 rounded-sm" style={{ backgroundColor: v >= 90 ? '#10B981' : v >= 85 ? '#E69B30' : '#E35A4A', opacity: v / 100 + 0.2 }} title={['Attendance', 'Payroll', 'Leave', 'Claims'][j] + ': ' + v + '%'} />
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Attendance</span><span>Payroll</span><span>Leave</span><span>Claims</span>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-green-500" /><span className="text-xs text-gray-400">≥90%</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-400" /><span className="text-xs text-gray-400">≥85%</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-400" /><span className="text-xs text-gray-400">&lt;85%</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-bold text-gray-900 mb-4">GHMC HR System Performance Score</h2>
          <ChartContainer config={chartConfig} className="h-36">
            <AreaChart data={kpiTrend}>
              <defs>
                <linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="mo" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis domain={[88, 96]} hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#kpiGrad)" />
            </AreaChart>
          </ChartContainer>
        </div>
      </main>
    </div>
  )
}
