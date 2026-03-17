'use client'
import React, { useState } from 'react'
import Components from '../components'
import { AlertTriangle, CheckCircle, Download, Plus, Search, Shield, Activity } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts'

const incidentTrend = [
  { month: 'Oct', accidents: 8, near_miss: 14 }, { month: 'Nov', accidents: 6, near_miss: 11 },
  { month: 'Dec', accidents: 5, near_miss: 9 }, { month: 'Jan', accidents: 9, near_miss: 16 },
  { month: 'Feb', accidents: 7, near_miss: 12 }, { month: 'Mar', accidents: 4, near_miss: 8 },
]

const zoneScores = [
  { zone: 'Serilingampally', score: 88, ppeCompliance: 92, healthCheck: 85, incidents: 2 },
  { zone: 'Secunderabad', score: 82, ppeCompliance: 88, healthCheck: 78, incidents: 3 },
  { zone: 'Charminar', score: 74, ppeCompliance: 80, healthCheck: 70, incidents: 6 },
  { zone: 'Kukatpally', score: 90, ppeCompliance: 94, healthCheck: 88, incidents: 1 },
  { zone: 'Khairatabad', score: 85, ppeCompliance: 89, healthCheck: 82, incidents: 2 },
  { zone: 'LB Nagar', score: 78, ppeCompliance: 82, healthCheck: 75, incidents: 4 },
  { zone: 'Malkajgiri', score: 71, ppeCompliance: 76, healthCheck: 68, incidents: 5 },
  { zone: 'Uppal', score: 68, ppeCompliance: 72, healthCheck: 64, incidents: 7 },
]

const chartConfig = {
  accidents: { label: 'Accidents', color: '#DC2626' },
  near_miss: { label: 'Near Misses', color: '#E69B30' },
}

const incidents = [
  { id: 'INC-2026-045', date: '14 Mar 2026', zone: 'Charminar', type: 'Accident', category: 'Road Accident', employee: 'T. Ramulu (Sanitary Worker)', severity: 'Minor', status: 'Treated & Returned', ppeWorn: false, hospitalized: false, compensation: '—' },
  { id: 'INC-2026-041', date: '10 Mar 2026', zone: 'Uppal', type: 'Accident', category: 'Fall from Height', employee: 'B. Narayana (Helper, Works)', severity: 'Moderate', status: 'Under Treatment', ppeWorn: false, hospitalized: true, compensation: '₹15,000 interim' },
  { id: 'INC-2026-038', date: '05 Mar 2026', zone: 'Malkajgiri', type: 'Near Miss', category: 'Chemical Exposure', employee: 'G. Srinivas (Sanitary Insp.)', severity: 'Near Miss', status: 'Reported', ppeWorn: true, hospitalized: false, compensation: '—' },
  { id: 'INC-2026-032', date: '28 Feb 2026', zone: 'LB Nagar', type: 'Accident', category: 'Bite/Sting (Animal)', employee: 'P. Kistaiah (Sanitary Worker)', severity: 'Minor', status: 'Treated & Returned', ppeWorn: true, hospitalized: false, compensation: '₹5,000' },
  { id: 'INC-2026-028', date: '20 Feb 2026', zone: 'Uppal', type: 'Accident', category: 'Heat Stroke', employee: 'S. Rajamma (Sanitary Worker)', severity: 'Serious', status: 'Recovered, Returned', ppeWorn: true, hospitalized: true, compensation: '₹48,000 ESI' },
]

const ppeItems = [
  { item: 'Safety Gloves', issued: 18200, dueReplacement: 2840, compliance: 93 },
  { item: 'Safety Boots', issued: 15600, dueReplacement: 1240, compliance: 88 },
  { item: 'Reflective Vests / Jackets', issued: 16800, dueReplacement: 3200, compliance: 91 },
  { item: 'Dust Mask / N95 Respirator', issued: 12400, dueReplacement: 4200, compliance: 76 },
  { item: 'Safety Helmet', issued: 6200, dueReplacement: 480, compliance: 95 },
  { item: 'Chemical Protective Suit', issued: 1800, dueReplacement: 240, compliance: 82 },
  { item: 'Eye Protection', issued: 4200, dueReplacement: 680, compliance: 84 },
]

export default function HealthSafety() {
  const [tab, setTab] = useState<'dashboard' | 'incidents' | 'ppe' | 'health' | 'compliance'>('dashboard')
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Health & Safety" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Quick Nav */}
        <div className="flex gap-2 mb-4">
          {[
            { label: 'Court Cases', to: '/CourtCases' },
            { label: 'Health & Safety', to: '/HealthSafety', active: true },
            { label: 'Outsourced Workforce', to: '/OutsourcedWorkforce' },
            { label: 'Disciplinary', to: '/DisciplinaryProceedings' },
            { label: 'GO Repository', to: '/GORepository' },
          ].map(link => (
            <a key={link.label} href={`#${link.to}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#DC2626' } : {}}
            >{link.label}</a>
          ))}
        </div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Occupational Health & Safety</h1>
            <p className="text-sm text-gray-500 mt-0.5">Field staff safety · GHMC · Accident Register · PPE Compliance · OHS Surveillance · March 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Download size={13} /> Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#DC2626' }}>
              <Plus size={14} /> Report Incident
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {[
            { label: 'Accidents YTD (FY26)', value: '44', sub: '-12% vs FY25', color: '#DC2626', icon: '🚨' },
            { label: 'Near Misses YTD', value: '74', sub: 'Reported & investigated', color: '#D97706', icon: '⚠️' },
            { label: 'Days Since Last Fatal', value: '847', sub: 'Target: Zero fatalities', color: '#15803D', icon: '✅' },
            { label: 'PPE Compliance (Overall)', value: '87%', sub: '15,228 / 17,500 workers', color: '#0284C7', icon: '🦺' },
            { label: 'Health Checks Pending', value: '3,284', sub: 'Annual medical due', color: '#7C3AED', icon: '🏥' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-xl mb-1">{k.icon}</div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-bold text-gray-700 mt-1">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'dashboard', label: 'OHS Dashboard' },
            { key: 'incidents', label: 'Incident Register' },
            { key: 'ppe', label: 'PPE Management' },
            { key: 'health', label: 'Health Surveillance' },
            { key: 'compliance', label: 'Safety Compliance' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Accident Trend — FY 2025-26</h2>
                <ChartContainer config={chartConfig} className="h-48">
                  <BarChart data={incidentTrend} barSize={22}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="accidents" fill="#DC2626" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="near_miss" fill="#E69B30" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h2 className="font-bold text-gray-900 mb-3">Accident Categories (YTD)</h2>
                  <div className="space-y-2">
                    {[
                      { cat: 'Road Accidents', count: 14, pct: 32 },
                      { cat: 'Fall from Height', count: 10, pct: 23 },
                      { cat: 'Heat Stroke / Exhaustion', count: 8, pct: 18 },
                      { cat: 'Bite/Sting', count: 7, pct: 16 },
                      { cat: 'Chemical Exposure', count: 5, pct: 11 },
                    ].map((c) => (
                      <div key={c.cat}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs text-gray-600">{c.cat}</span>
                          <span className="text-xs font-bold text-gray-700">{c.count}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div className="h-1.5 rounded-full bg-red-400" style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Zone-wise Safety Scorecard</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Zone', 'Safety Score /100', 'PPE Compliance', 'Annual Health Checks', 'Incidents (YTD)', 'Rating'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {zoneScores.map((z) => (
                      <tr key={z.zone} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">{z.zone} Zone</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-100 rounded-full">
                              <div className="h-1.5 rounded-full" style={{ width: `${z.score}%`, backgroundColor: z.score >= 85 ? '#16a34a' : z.score >= 75 ? '#D97706' : '#DC2626' }} />
                            </div>
                            <span className="text-sm font-black" style={{ color: z.score >= 85 ? '#16a34a' : z.score >= 75 ? '#D97706' : '#DC2626' }}>{z.score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold" style={{ color: z.ppeCompliance >= 90 ? '#16a34a' : z.ppeCompliance >= 80 ? '#D97706' : '#DC2626' }}>{z.ppeCompliance}%</td>
                        <td className="px-4 py-3 text-sm font-semibold" style={{ color: z.healthCheck >= 85 ? '#16a34a' : z.healthCheck >= 75 ? '#D97706' : '#DC2626' }}>{z.healthCheck}%</td>
                        <td className="px-4 py-3 text-sm font-bold" style={{ color: z.incidents <= 2 ? '#16a34a' : z.incidents <= 4 ? '#D97706' : '#DC2626' }}>{z.incidents}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${z.score >= 85 ? 'bg-green-50 text-green-700' : z.score >= 75 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                            {z.score >= 85 ? 'Good' : z.score >= 75 ? 'Fair' : 'Poor'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'incidents' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search incident ID, employee, zone..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
            </div>
            <div className="divide-y divide-gray-50">
              {incidents.map((inc, i) => (
                <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <span className="text-sm font-black text-blue-700">{inc.id}</span>
                        <span className="text-xs text-gray-400">{inc.date}</span>
                        <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{inc.zone} Zone</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${inc.type === 'Accident' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{inc.type}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${inc.severity === 'Minor' ? 'bg-green-50 text-green-700' : inc.severity === 'Moderate' ? 'bg-amber-50 text-amber-700' : inc.severity === 'Serious' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{inc.severity}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 mb-1">{inc.category}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span><span className="font-semibold text-gray-600">Employee:</span> {inc.employee}</span>
                        <span><span className={`font-semibold ${inc.ppeWorn ? 'text-green-600' : 'text-red-600'}`}>PPE {inc.ppeWorn ? '✓ Worn' : '✗ Not Worn'}</span></span>
                        <span><span className="font-semibold text-gray-600">Hospitalized:</span> {inc.hospitalized ? 'Yes' : 'No'}</span>
                        {inc.compensation !== '—' && <span><span className="font-semibold text-gray-600">Compensation:</span> {inc.compensation}</span>}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${inc.status === 'Under Treatment' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>{inc.status}</span>
                      <div className="flex gap-2">
                        <button className="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">View</button>
                        <button className="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Investigate</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing 5 recent incidents of 44 YTD</p>
            </div>
          </div>
        )}

        {tab === 'ppe' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">PPE Inventory & Compliance</h2>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
                <Plus size={13} /> Issue PPE Batch
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['PPE Item', 'Total Issued', 'Due for Replacement', 'Compliance Rate', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ppeItems.map((p) => (
                  <tr key={p.item} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{p.item}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{p.issued.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${p.dueReplacement > 2000 ? 'text-red-600' : p.dueReplacement > 500 ? 'text-amber-600' : 'text-green-600'}`}>{p.dueReplacement.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full">
                          <div className="h-1.5 rounded-full" style={{ width: `${p.compliance}%`, backgroundColor: p.compliance >= 90 ? '#16a34a' : p.compliance >= 80 ? '#D97706' : '#DC2626' }} />
                        </div>
                        <span className="text-sm font-black" style={{ color: p.compliance >= 90 ? '#16a34a' : p.compliance >= 80 ? '#D97706' : '#DC2626' }}>{p.compliance}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.compliance >= 90 ? 'bg-green-50 text-green-700' : p.compliance >= 80 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                        {p.compliance >= 90 ? 'Good' : p.compliance >= 80 ? 'Needs Attention' : 'Critical'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'health' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: 'Annual Medical Examination', due: 3284, done: 14216, total: 17500, color: '#DC2626', desc: 'Mandatory yearly health check for all field staff' },
                { title: 'Eye Test (Vision Check)', due: 2140, done: 15360, total: 17500, color: '#D97706', desc: 'For drivers, field supervisors, engineers' },
                { title: 'Lung Function (Spirometry)', due: 4820, done: 3580, total: 8400, color: '#7C3AED', desc: 'Sanitation workers exposed to dust/chemicals' },
              ].map((h) => (
                <div key={h.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{h.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{h.desc}</p>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-black" style={{ color: h.color }}>{h.due.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 mb-1">pending / {h.total.toLocaleString()} total</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mb-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: `${(h.done / h.total) * 100}%` }} />
                  </div>
                  <p className="text-xs text-gray-400">{h.done.toLocaleString()} completed ({Math.round((h.done / h.total) * 100)}%)</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">High-Risk Exposure Categories</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { risk: 'Chemical Exposure (Bleach/Acid)', affected: 2840, monitoring: 'Monthly urine/blood test', zone: 'All', color: '#DC2626' },
                  { risk: 'Heat Stress (Outdoor Workers)', affected: 8420, monitoring: 'Daily temperature log, hydration check', zone: 'Summer months (Apr–Jun)', color: '#D97706' },
                  { risk: 'Dust Inhalation (Roads/Construction)', affected: 3200, monitoring: 'Quarterly spirometry', zone: 'Works Dept zones', color: '#7C3AED' },
                  { risk: 'Biological Hazard (Sewage/Waste)', affected: 4180, monitoring: 'Hepatitis-B vaccine, quarterly blood test', zone: 'Sanitation zones', color: '#E69B30' },
                  { risk: 'Road/Traffic Accident Risk', affected: 12400, monitoring: 'Defensive driving training, vest compliance', zone: 'All field staff', color: '#0284C7' },
                  { risk: 'Noise Exposure (Equipment)', affected: 1640, monitoring: 'Annual audiometry test', zone: 'Works / Machinery', color: '#64748B' },
                ].map((r) => (
                  <div key={r.risk} className="p-3 bg-gray-50 rounded-xl border-l-4" style={{ borderLeftColor: r.color }}>
                    <p className="text-xs font-bold text-gray-800 mb-1">{r.risk}</p>
                    <p className="text-xs text-gray-500 mb-1">{r.monitoring}</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">{r.affected.toLocaleString()} exposed</span>
                      <span className="text-xs text-gray-400">{r.zone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'compliance' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Statutory Compliance Checklist — OHS</h2>
              <div className="space-y-3">
                {[
                  { item: 'Accident Register (Form 4 — Factories Act, 1948)', status: 'Maintained', lastUpdated: '16 Mar 2026', ok: true },
                  { item: 'Annual OHS Report — Labour Department TS', status: 'Submitted', lastUpdated: '15 Jan 2026', ok: true },
                  { item: 'Safety Officer Appointment (under Factories Act)', status: 'Appointed', lastUpdated: 'G.O.Dt. 12 Apr 2024', ok: true },
                  { item: 'Hazardous Substance Register (Bleach, Acid etc.)', status: 'Maintained', lastUpdated: '01 Mar 2026', ok: true },
                  { item: 'First Aid Boxes — All GHMC ward offices (182 wards)', status: 'Partial', lastUpdated: '68 of 182 wards verified', ok: false },
                  { item: 'ESI Registration — Field Staff (< ₹21,000 wage)', status: 'Partial', lastUpdated: '3,200 daily-wage staff not yet covered', ok: false },
                  { item: 'Workmen Compensation Insurance — All Field Staff', status: 'Active', lastUpdated: 'Policy valid till 31 Mar 2027', ok: true },
                  { item: 'Annual Safety Drill / Mock Evacuation', status: 'Overdue', lastUpdated: 'Last held: Jun 2024 (18 months ago)', ok: false },
                  { item: 'Safety Training Record — Field Supervisors', status: 'In Progress', lastUpdated: '840 of 2,200 trained', ok: false },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                    {c.ok ? <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{c.item}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.lastUpdated}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${c.ok ? 'bg-green-50 text-green-700' : c.status === 'Overdue' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{c.status}</span>
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
