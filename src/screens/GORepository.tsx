'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Download, BookOpen, Bell, Star, Filter, ChevronDown, FileText, ExternalLink, Clock } from 'lucide-react'

const goData = [
  { goNo: 'G.O.Ms.No.28', dept: 'Finance', date: '14 Feb 2026', subject: 'Dearness Allowance enhancement — GO 4% additional DR w.e.f 01 Jan 2026 to State Government Employees', category: 'Pay & Allowances', status: 'Active', modules: ['Payroll', 'Salary Revision'], priority: 'High', bookmarked: true },
  { goNo: 'G.O.Ms.No.12', dept: 'MA&UD', date: '22 Jan 2026', subject: 'GHMC Cadre & Recruitment Rules Amendment — Revised qualification criteria for Assistant Engineer (Civil) posts', category: 'Recruitment', status: 'Active', modules: ['Recruitment', 'Employee Master'], priority: 'High', bookmarked: true },
  { goNo: 'G.O.Rt.No.456', dept: 'Finance', date: '05 Dec 2025', subject: 'General Provident Fund — Rate of interest on GPF balances announced at 7.1% p.a. for Q4 FY 2025-26', category: 'GPF/Pension', status: 'Active', modules: ['GPF Statement', 'Terminal Benefits'], priority: 'Medium', bookmarked: false },
  { goNo: 'Memo No.6842', dept: 'Finance', date: '28 Nov 2025', subject: 'Income Tax — Revised TDS computation guidelines for FY 2025-26 and New Tax Regime default applicability', category: 'Income Tax', status: 'Active', modules: ['Income Tax', 'Payroll'], priority: 'High', bookmarked: false },
  { goNo: 'G.O.Ms.No.89', dept: 'GA&Services', date: '15 Nov 2025', subject: 'Revised Earned Leave encashment rules — Maximum 30 days per encashment, twice in service lifetime removed', category: 'Leave Rules', status: 'Active', modules: ['Leave Management', 'ESS/MSS'], priority: 'Medium', bookmarked: false },
  { goNo: 'G.O.Ms.No.74', dept: 'Finance', date: '02 Oct 2025', subject: 'Pay Revision Commission — Implementation of 11th PRC recommendations effective 01 July 2025', category: 'Pay & Allowances', status: 'Active', modules: ['Salary Revision', 'Payroll', 'Budget'], priority: 'Critical', bookmarked: true },
  { goNo: 'G.O.Ms.No.653', dept: 'Finance', date: '22 Sep 2004', subject: 'National Pension System — Introduction of defined contribution pension scheme for employees joining on/after 01 Sep 2004', category: 'NPS/Pension', status: 'Active', modules: ['NPS & Pension'], priority: 'Critical', bookmarked: true },
  { goNo: 'G.O.Ms.No.141', dept: 'GA&Services', date: '18 Aug 2025', subject: 'Work-from-Home (WFH) Policy for State Government Employees — Eligibility and operational guidelines', category: 'Service Rules', status: 'Active', modules: ['Attendance', 'ESS/MSS'], priority: 'Low', bookmarked: false },
  { goNo: 'G.O.Rt.No.892', dept: 'MA&UD', date: '10 Jul 2025', subject: 'GHMC Departmental Promotion Committee (DPC) norms — Revised constitution and proceedings format', category: 'Promotion/Transfer', status: 'Active', modules: ['Promotion & Transfer', 'Service Book'], priority: 'High', bookmarked: false },
  { goNo: 'Circular No.18/2025', dept: 'Finance', date: '01 Apr 2025', subject: 'Medical Reimbursement — Enhancement of TSMA scheme limits with revised package rates for empanelled hospitals', category: 'Medical', status: 'Active', modules: ['Medical Reimbursement', 'ESS/MSS'], priority: 'Medium', bookmarked: false },
  { goNo: 'U.O.Note No.2341', dept: 'Finance', date: '15 Mar 2025', subject: 'Travelling Allowance Rules — TA/DA rates revision for tours within TS effective from 01 Apr 2025', category: 'Claims/TA', status: 'Active', modules: ['Claims & Travel'], priority: 'Medium', bookmarked: false },
  { goNo: 'G.O.Ms.No.56', dept: 'GA&Services', date: '12 Jun 2025', subject: 'Roster Rules for direct recruitment and promotion — SC/ST/BC/EWS reservation point maintenance norms', category: 'Reservation/Roster', status: 'Active', modules: ['Roster Management', 'Recruitment', 'Promotion & Transfer'], priority: 'Critical', bookmarked: true },
]

const categories = ['All Categories', 'Pay & Allowances', 'Recruitment', 'GPF/Pension', 'NPS/Pension', 'Income Tax', 'Leave Rules', 'Service Rules', 'Promotion/Transfer', 'Medical', 'Claims/TA', 'Reservation/Roster']
const departments = ['All Departments', 'Finance', 'MA&UD', 'GA&Services', 'Labour', 'Health']
const goTypes = ['All Types', 'G.O.Ms.', 'G.O.Rt.', 'Memo', 'Circular', 'U.O.Note', 'Office Proceedings']

const recentAlerts = [
  { goNo: 'G.O.Ms.No.28', subject: 'DR enhanced to 4% — update payroll by 01 Apr 2026', urgency: 'High', daysAgo: 30 },
  { goNo: 'G.O.Ms.No.12', subject: 'AE (Civil) qualification criteria changed — update vacancy notifications', urgency: 'High', daysAgo: 53 },
  { goNo: 'G.O.Rt.No.892', subject: 'DPC norms revised — update pending DPC proceedings format', urgency: 'Medium', daysAgo: 254 },
]

const priorityConfig: Record<string, { bg: string; text: string }> = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700' },
  High: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Medium: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Low: { bg: 'bg-gray-100', text: 'text-gray-600' },
}

export default function GORepository() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [dept, setDept] = useState('All Departments')
  const [tab, setTab] = useState<'library' | 'bookmarks' | 'alerts' | 'tracker'>('library')
  const [bookmarked, setBookmarked] = useState<string[]>(goData.filter(g => g.bookmarked).map(g => g.goNo))
  const [selected, setSelected] = useState<typeof goData[0] | null>(null)

  const filtered = goData.filter(g =>
    (g.goNo.toLowerCase().includes(search.toLowerCase()) || g.subject.toLowerCase().includes(search.toLowerCase())) &&
    (category === 'All Categories' || g.category === category) &&
    (dept === 'All Departments' || g.dept === dept)
  )

  const toggleBookmark = (goNo: string) => {
    setBookmarked(prev => prev.includes(goNo) ? prev.filter(g => g !== goNo) : [...prev, goNo])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="GO Repository" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GO & Policy Repository</h1>
            <p className="text-sm text-gray-500 mt-0.5">Government Orders · Circulars · Memos · Office Proceedings · Telangana Government + GHMC</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Bell size={13} /> Set Alerts
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
              <FileText size={14} /> Upload GO
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {[
            { label: 'Total GOs / Memos', value: '1,284', sub: 'In repository', color: '#1A3555' },
            { label: 'Active / In Force', value: '892', sub: 'Currently applicable', color: '#15803D' },
            { label: 'Added This Month', value: '6', sub: 'Mar 2026', color: '#D97706' },
            { label: 'HR-Relevant', value: '348', sub: 'Tagged to HRMS modules', color: '#0284C7' },
            { label: 'New Alerts', value: '3', sub: 'Action required', color: '#DC2626' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-bold text-gray-700 mt-1">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'library', label: 'GO Library' },
            { key: 'bookmarks', label: `Bookmarked (${bookmarked.length})` },
            { key: 'alerts', label: 'New Alerts' },
            { key: 'tracker', label: 'Implementation Tracker' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {(tab === 'library' || tab === 'bookmarks') && (
          <div className="flex gap-4">
            {/* List */}
            <div className="flex-1">
              {tab === 'library' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 p-4 flex gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search GO number, subject, keyword..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none" />
                  </div>
                  <div className="relative">
                    <select value={category} onChange={e => setCategory(e.target.value)} className="appearance-none px-3 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select value={dept} onChange={e => setDept(e.target.value)} className="appearance-none px-3 py-2 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer">
                      {departments.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {tab === 'library' && (
                  <div className="p-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-xs font-bold text-gray-500">{filtered.length} Government Orders / Circulars found</p>
                  </div>
                )}
                <div className="divide-y divide-gray-50">
                  {(tab === 'bookmarks' ? goData.filter(g => bookmarked.includes(g.goNo)) : filtered).map((g, i) => {
                    const pc = priorityConfig[g.priority]
                    const isBookmarked = bookmarked.includes(g.goNo)
                    return (
                      <div key={i} onClick={() => setSelected(g)} className={`p-4 cursor-pointer hover:bg-blue-50/30 transition-colors ${selected?.goNo === g.goNo ? 'bg-blue-50/50 border-l-2 border-blue-600' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                            <BookOpen size={16} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-sm font-black text-blue-700">{g.goNo}</span>
                              <span className="text-xs font-semibold text-gray-400">· {g.dept} Dept ·</span>
                              <span className="text-xs text-gray-400">{g.date}</span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>{g.priority}</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-800 leading-snug mb-1.5 line-clamp-2">{g.subject}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{g.category}</span>
                              {g.modules.map(m => (
                                <span key={m} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: '#1A355515', color: '#1A3555' }}>{m}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <button onClick={e => { e.stopPropagation(); toggleBookmark(g.goNo) }} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                              <Star size={14} className={isBookmarked ? 'text-amber-500' : 'text-gray-300'} fill={isBookmarked ? '#F59E0B' : 'none'} />
                            </button>
                            <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                              <Download size={14} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            {selected && (
              <div className="w-80 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold text-gray-400">{selected.dept} Department</p>
                      <p className="text-lg font-black text-blue-700">{selected.goNo}</p>
                      <p className="text-xs text-gray-400">{selected.date}</p>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg leading-none">×</button>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-4 leading-snug">{selected.subject}</p>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 mb-1">CATEGORY</p>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{selected.category}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 mb-1">APPLICABLE MODULES</p>
                      <div className="flex flex-wrap gap-1">
                        {selected.modules.map(m => (
                          <span key={m} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: '#1A355515', color: '#1A3555' }}>{m}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 mb-1">STATUS</p>
                      <span className="text-xs font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{selected.status}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
                      <Download size={14} /> Download PDF
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold cursor-pointer hover:bg-gray-50">
                      <ExternalLink size={14} /> View on TS Portal
                    </button>
                    <button onClick={() => toggleBookmark(selected.goNo)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold cursor-pointer hover:bg-gray-50">
                      <Star size={14} className={bookmarked.includes(selected.goNo) ? 'text-amber-500' : ''} />
                      {bookmarked.includes(selected.goNo) ? 'Remove Bookmark' : 'Bookmark'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'alerts' && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-bold text-amber-800">3 Recent GOs Require HRMS Implementation Action</p>
              <p className="text-xs text-amber-700 mt-0.5">These orders have been issued recently and require corresponding changes in payroll, recruitment, or other modules.</p>
            </div>
            {recentAlerts.map((a, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: a.urgency === 'High' ? '#FEF3C7' : '#EFF6FF' }}>
                      <Bell size={18} className={a.urgency === 'High' ? 'text-amber-600' : 'text-blue-600'} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-blue-700">{a.goNo}</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{a.subject}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.urgency === 'High' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>{a.urgency} Priority</span>
                        <span className="text-xs text-gray-400">{a.daysAgo} days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>Mark Implemented</button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">View GO</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tracker' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">GO Implementation Tracker</h2>
              <span className="text-xs font-bold px-2 py-1 bg-amber-50 text-amber-700 rounded-full">3 pending</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['GO Reference', 'Subject', 'Action Required', 'Responsible Officer', 'Due Date', 'Implementation Status'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { go: 'G.O.Ms.No.28 (14 Feb 2026)', subject: 'DR 4% enhancement from Jan 2026', action: 'Update DR% in salary masters, process arrears for Jan-Mar 2026', officer: 'CFO / Pay Section', due: '31 Mar 2026', status: 'In Progress' },
                  { go: 'G.O.Ms.No.12 (22 Jan 2026)', subject: 'AE (Civil) qualification revision', action: 'Update recruitment notification, reject old applications if qualification not met', officer: 'Recruitment Cell', due: '28 Feb 2026', status: 'Overdue' },
                  { go: 'G.O.Ms.No.74 (02 Oct 2025)', subject: '11th PRC recommendations', action: 'Pay fixation for all employees in revised scales, generate arrear bills', officer: 'SR Department', due: '31 Dec 2025', status: 'Completed' },
                  { go: 'G.O.Ms.No.56 (12 Jun 2025)', subject: 'Roster rules for SC/ST/BC/EWS', action: 'Update promotion and recruitment roster register', officer: 'Roster Officer', due: '30 Sep 2025', status: 'Completed' },
                  { go: 'G.O.Rt.No.892 (10 Jul 2025)', subject: 'Revised DPC proceedings norms', action: 'Update DPC templates and minutes format for all cadres', officer: 'Promotion Section', due: '31 Aug 2025', status: 'Pending' },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-black text-blue-700">{r.go}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 max-w-xs">{r.subject}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-xs">{r.action}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{r.officer}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{r.due}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.status === 'Completed' ? 'bg-green-50 text-green-700' : r.status === 'Overdue' ? 'bg-red-50 text-red-700' : r.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
