'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Download, AlertTriangle, CheckCircle, Plus, ChevronDown, Filter } from 'lucide-react'
import { Link } from '@/lib'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

const rosterPoints = [
  { pt: 1, category: 'OC', filled: true, name: 'K. Srinivas Reddy', designation: 'Deputy Commissioner', date: '15 Mar 2005', remarks: '' },
  { pt: 2, category: 'SC', filled: true, name: 'S. Satyanarayana', designation: 'Deputy Commissioner', date: '20 Jun 2006', remarks: '' },
  { pt: 3, category: 'OC', filled: true, name: 'P. Lakshmi Devi', designation: 'Deputy Commissioner', date: '01 Jul 2007', remarks: '' },
  { pt: 4, category: 'BC-A', filled: true, name: 'M. Nizamuddin', designation: 'Deputy Commissioner', date: '10 Apr 2009', remarks: '' },
  { pt: 5, category: 'OC', filled: true, name: 'T. Padmarao', designation: 'Deputy Commissioner', date: '18 Sep 2010', remarks: '' },
  { pt: 6, category: 'ST', filled: false, name: '—', designation: '—', date: '—', remarks: 'BACKLOG — ST candidate pending' },
  { pt: 7, category: 'OC', filled: true, name: 'B. Venkat Rao', designation: 'Deputy Commissioner', date: '22 Jan 2012', remarks: '' },
  { pt: 8, category: 'BC-B', filled: true, name: 'G. Naveen Kumar', designation: 'Deputy Commissioner', date: '05 Aug 2013', remarks: '' },
  { pt: 9, category: 'OC', filled: true, name: 'R. Suresh', designation: 'Deputy Commissioner', date: '14 Nov 2014', remarks: '' },
  { pt: 10, category: 'SC', filled: false, name: '—', designation: '—', date: '—', remarks: 'BACKLOG — SC candidate pending' },
]

const categoryTarget = [
  { category: 'OC (Open)', target: 50, filled: 50, color: '#1A3555' },
  { category: 'SC', target: 15, filled: 13, color: '#E69B30' },
  { category: 'ST', target: 6, filled: 4, color: '#DC2626' },
  { category: 'BC-A', target: 12, filled: 12, color: '#4CAF50' },
  { category: 'BC-B', target: 7, filled: 7, color: '#0284C7' },
  { category: 'BC-C', target: 1, filled: 1, color: '#8B5CF6' },
  { category: 'BC-D', target: 7, filled: 7, color: '#64748B' },
  { category: 'EWS', target: 10, filled: 8, color: '#D97706' },
  { category: 'PH', target: 3, filled: 2, color: '#DB2777' },
]

const chartConfig = {
  target: { label: 'Target', color: '#CBD5E1' },
  filled: { label: 'Filled', color: '#1A3555' },
}

const cadres = [
  { cadre: 'Deputy Commissioner', totalVacancies: 100, rosters: { SC: { target: 15, filled: 13, backlog: 2 }, ST: { target: 6, filled: 4, backlog: 2 }, BC: { target: 27, filled: 27, backlog: 0 }, EWS: { target: 10, filled: 8, backlog: 2 }, OC: { target: 50, filled: 50, backlog: 0 } } },
  { cadre: 'Assistant Engineer (Civil)', totalVacancies: 200, rosters: { SC: { target: 30, filled: 28, backlog: 2 }, ST: { target: 12, filled: 9, backlog: 3 }, BC: { target: 54, filled: 54, backlog: 0 }, EWS: { target: 20, filled: 18, backlog: 2 }, OC: { target: 100, filled: 100, backlog: 0 } } },
  { cadre: 'Revenue Inspector', totalVacancies: 500, rosters: { SC: { target: 75, filled: 75, backlog: 0 }, ST: { target: 30, filled: 24, backlog: 6 }, BC: { target: 135, filled: 135, backlog: 0 }, EWS: { target: 50, filled: 45, backlog: 5 }, OC: { target: 250, filled: 250, backlog: 0 } } },
  { cadre: 'Sanitary Worker', totalVacancies: 8420, rosters: { SC: { target: 1263, filled: 1263, backlog: 0 }, ST: { target: 505, filled: 492, backlog: 13 }, BC: { target: 2273, filled: 2273, backlog: 0 }, EWS: { target: 842, filled: 810, backlog: 32 }, OC: { target: 4210, filled: 4210, backlog: 0 } } },
]

export default function RosterManagement() {
  const [tab, setTab] = useState<'register' | 'summary' | 'backlog' | 'dpc'>('register')
  const [cadre, setCadre] = useState('Deputy Commissioner')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Roster Management" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Quick Module Nav */}
        <div className="flex gap-2 mb-5">
          {[
            { label: 'Recruitment', to: '/RecruitmentOnboarding' },
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Promotion & Transfer', to: '/PromotionTransfer' },
            { label: 'Disciplinary', to: '/DisciplinaryProceedings' },
            { label: 'Roster Management', to: '/RosterManagement', active: true },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reservation Roster Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">SC/ST/BC/EWS/PH reservation compliance · TS Govt rules · GO.Ms.No.56/2025 · GHMC Cadre-wise</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Download size={13} /> Export Roster
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={14} /> New Appointment
            </button>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-800">Backlog Positions Detected — 65 Unfilled Reservation Posts</p>
            <p className="text-xs text-red-700 mt-0.5">ST category has 24 backlog positions across 4 cadres. EWS backlog: 39 positions. These must be filled in next recruitment drive as per TS Roster Rules.</p>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-6 gap-3 mb-5">
          {[
            { label: 'Total Sanctioned Posts', value: '32,840', color: '#1A3555' },
            { label: 'SC Filled / Target', value: '1,379/1,383', color: '#E69B30' },
            { label: 'ST Filled / Target', value: '529/553', color: '#DC2626' },
            { label: 'BC Filled / Target', value: '2,489/2,489', color: '#15803D' },
            { label: 'EWS Filled / Target', value: '881/922', color: '#D97706' },
            { label: 'PH Filled / Target', value: '82/90', color: '#7C3AED' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 text-center">
              <p className="text-base font-black leading-tight" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-gray-400 mt-1 leading-tight">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'register', label: 'Roster Register' },
            { key: 'summary', label: 'Category Summary' },
            { key: 'backlog', label: 'Backlog Analysis' },
            { key: 'dpc', label: 'DPC Integration' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'register' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative">
                <select value={cadre} onChange={e => setCadre(e.target.value)} className="appearance-none px-3 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer shadow-sm">
                  {cadres.map(c => <option key={c.cadre}>{c.cadre}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select className="appearance-none px-3 py-2 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer shadow-sm">
                  {['Direct Recruitment Roster', 'Promotion Roster'].map(r => <option key={r}>{r}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-gray-900">Roster Register — {cadre}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">200-point cycle · Per G.O.Ms.No.56 GA&Services · Showing points 1-10 of 100</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-bold px-2 py-1 bg-red-50 text-red-700 rounded-full">2 Backlogs</span>
                  <button className="text-xs px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View Full 100 pts</button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Roster Point', 'Category', 'Filled By', 'Designation', 'Date of Appointment', 'Status / Remarks'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rosterPoints.map((r) => (
                    <tr key={r.pt} className={`hover:bg-gray-50 transition-colors ${!r.filled ? 'bg-red-50/30' : ''}`}>
                      <td className="px-4 py-3">
                        <span className="text-sm font-black text-gray-800">Pt. {r.pt}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${r.category === 'OC' ? 'bg-blue-50 text-blue-700' : r.category === 'SC' ? 'bg-amber-50 text-amber-700' : r.category === 'ST' ? 'bg-red-50 text-red-700' : r.category === 'EWS' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'}`}>{r.category}</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{r.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.designation}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.date}</td>
                      <td className="px-4 py-3">
                        {r.filled ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
                            <CheckCircle size={12} /> Filled
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-bold text-red-700">
                            <AlertTriangle size={12} /> {r.remarks}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between text-xs text-gray-500">
                <span>100-point Roster · Cycle repeats 329 times for this cadre (32,900 total posts)</span>
                <span>Last updated: 16 Mar 2026 · Verified by: Adv. Cell GHMC</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'summary' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Category-wise Filled vs Target — All Cadres Combined</h2>
              <ChartContainer config={chartConfig} className="h-52">
                <BarChart data={categoryTarget} barSize={20}>
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="target" fill="#E2E8F0" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="filled" fill="#1A3555" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Cadre-wise Reservation Status</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {['Cadre', 'Total Posts', 'SC (15%)', 'ST (6%)', 'BC (27%)', 'EWS (10%)', 'OC (50%)', 'Total Backlog'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cadres.map((c) => {
                      const totalBacklog = Object.values(c.rosters).reduce((sum, r) => sum + r.backlog, 0)
                      return (
                        <tr key={c.cadre} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-bold text-gray-800">{c.cadre}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-700">{c.totalVacancies.toLocaleString()}</td>
                          {(['SC', 'ST', 'BC', 'EWS', 'OC'] as const).map((cat) => {
                            const r = c.rosters[cat]
                            return (
                              <td key={cat} className="px-4 py-3">
                                <div className="text-xs">
                                  <span className={r.backlog > 0 ? 'text-red-600 font-black' : 'text-green-600 font-bold'}>{r.filled}</span>
                                  <span className="text-gray-400">/{r.target}</span>
                                  {r.backlog > 0 && <span className="ml-1 text-xs font-bold text-red-600">(−{r.backlog})</span>}
                                </div>
                              </td>
                            )
                          })}
                          <td className="px-4 py-3">
                            {totalBacklog > 0 ? (
                              <span className="text-sm font-black text-red-600">{totalBacklog} posts</span>
                            ) : (
                              <span className="text-xs font-bold text-green-600">None</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'backlog' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Backlog Positions — Action Required</h2>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#DC2626' }}>
                  Generate Backlog Notification
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Cadre', 'Roster Type', 'Category', 'Backlog Points', 'Since (Year)', 'Reason', 'Next Recruitment Drive', 'Status'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { cadre: 'Deputy Commissioner', rtype: 'Direct Recruit', cat: 'ST', pts: 2, since: '2018', reason: 'No eligible ST candidate in merit list for 2 cycles', next: 'Apr–Jun 2026', status: 'Carry Forward' },
                    { cadre: 'Deputy Commissioner', rtype: 'Direct Recruit', cat: 'SC', pts: 2, since: '2020', reason: 'Selected candidate declined joining — no alternative', next: 'Apr–Jun 2026', status: 'Carry Forward' },
                    { cadre: 'Asst Engineer (Civil)', rtype: 'Direct Recruit', cat: 'ST', pts: 3, since: '2021', reason: 'No ST engineering graduates in TSPSC eligible list', next: 'Jan–Mar 2026', status: 'Overdue — Escalate' },
                    { cadre: 'Revenue Inspector', rtype: 'Promotion', cat: 'ST', pts: 6, since: '2022', reason: 'Eligible ST employees declined promotion — service reasons', next: 'Next DPC 2026-27', status: 'Carry Forward' },
                    { cadre: 'Revenue Inspector', rtype: 'Direct Recruit', cat: 'EWS', pts: 5, since: '2023', reason: 'EWS quota implemented mid-cycle, adjustment pending', next: 'Apr–Jun 2026', status: 'Under Review' },
                    { cadre: 'Sanitary Worker', rtype: 'Direct Recruit', cat: 'ST', pts: 13, since: '2024', reason: 'Remote posting zones — ST applicants insufficient', next: 'Immediate', status: 'Critical' },
                  ].map((b, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{b.cadre}</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{b.rtype}</span></td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.cat === 'ST' ? 'bg-red-50 text-red-700' : b.cat === 'SC' ? 'bg-amber-50 text-amber-700' : 'bg-purple-50 text-purple-700'}`}>{b.cat}</span></td>
                      <td className="px-4 py-3 text-sm font-black text-red-600">{b.pts} pts</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{b.since}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">{b.reason}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-700">{b.next}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.status === 'Critical' ? 'bg-red-50 text-red-700' : b.status.includes('Overdue') ? 'bg-red-50 text-red-700' : b.status === 'Under Review' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'dpc' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Upcoming DPC Proceedings — Roster Verification Required</h2>
              <div className="divide-y divide-gray-50">
                {[
                  { cadre: 'Deputy Commissioner → Joint Commissioner', dpcDate: '28 Mar 2026', vacancies: 4, scRequired: 1, stRequired: 0, bcRequired: 1, ewsRequired: 0, ocRequired: 2, rosterVerified: true },
                  { cadre: 'Senior Asst Engineer → Executive Engineer', dpcDate: '15 Apr 2026', vacancies: 8, scRequired: 1, stRequired: 1, bcRequired: 2, ewsRequired: 1, ocRequired: 4, rosterVerified: false },
                  { cadre: 'Revenue Inspector → Senior Revenue Inspector', dpcDate: '30 Apr 2026', vacancies: 20, scRequired: 3, stRequired: 1, bcRequired: 5, ewsRequired: 2, ocRequired: 10, rosterVerified: false },
                ].map((d, i) => (
                  <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-black text-gray-900">{d.cadre}</p>
                        <p className="text-xs text-gray-400 mt-0.5">DPC Date: {d.dpcDate} · Total vacancies: {d.vacancies}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${d.rosterVerified ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                        {d.rosterVerified ? '✓ Roster Verified' : '⚠ Verification Pending'}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { cat: 'OC', count: d.ocRequired, color: '#1A3555' },
                        { cat: 'SC', count: d.scRequired, color: '#E69B30' },
                        { cat: 'ST', count: d.stRequired, color: '#DC2626' },
                        { cat: 'BC', count: d.bcRequired, color: '#15803D' },
                        { cat: 'EWS', count: d.ewsRequired, color: '#7C3AED' },
                      ].map((c) => (
                        <div key={c.cat} className="p-2.5 bg-gray-50 rounded-xl text-center">
                          <p className="text-xs text-gray-400">{c.cat}</p>
                          <p className="text-lg font-black" style={{ color: c.color }}>{c.count}</p>
                          <p className="text-xs text-gray-400">vacancies</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>Verify Roster</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Seniority List</button>
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">DPC Minutes Template</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-800 mb-2">Roster Verification Mandate — Legal Requirement</p>
              <p className="text-xs text-blue-700">Per Supreme Court order in <span className="font-bold">Indra Sawhney vs Union of India</span> and subsequent TS Govt GOs, mandatory pre-DPC roster verification is required. Any promotion without prior roster check is liable to be quashed by High Court. Roster Officer must certify before DPC proceedings commence.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
