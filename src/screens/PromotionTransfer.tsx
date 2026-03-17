'use client'
import React, { useState } from 'react'
import Components from '../components'
import { ArrowRightLeft, Users, CheckCircle, Clock, AlertCircle, Download, Search, Plus, ChevronRight, MapPin, TrendingUp, Filter, ArrowUpCircle } from 'lucide-react'
import { Link } from '@/lib'

const promotionList = [
  { rank: 1, empId: 'GHMC-007345', name: 'Venkat Narayana B.', current: 'Superintendent Engineer', proposed: 'Chief Engineer', zone: 'Charminar', doj: '25 Nov 2002', acr: 'Outstanding', dpc: 'DPC-2026-01', status: 'recommended' },
  { rank: 2, empId: 'GHMC-001234', name: 'Srinivas Reddy K.', current: 'Deputy Commissioner', proposed: 'Additional Commissioner', zone: 'Charminar', doj: '15 Mar 2005', acr: 'Outstanding', dpc: 'DPC-2026-02', status: 'recommended' },
  { rank: 3, empId: 'GHMC-010456', name: 'Sunitha Nair R.', current: 'Health Officer', proposed: 'Senior Health Officer', zone: 'Secunderabad', doj: '22 Mar 2007', acr: 'Very Good', dpc: 'DPC-2026-03', status: 'pending' },
  { rank: 4, empId: 'GHMC-004012', name: 'Padma Rani T.', current: 'Town Planning Officer', proposed: 'Deputy Commissioner (TP)', zone: 'Kukatpally', doj: '20 Sep 2008', acr: 'Very Good', dpc: 'DPC-2026-04', status: 'withheld' },
  { rank: 5, empId: 'GHMC-002456', name: 'Lakshmi Devi P.', current: 'Assistant Engineer', proposed: 'Executive Engineer', zone: 'Khairatabad', doj: '01 Jul 2010', acr: 'Very Good', dpc: 'DPC-2026-05', status: 'pending' },
]

const transferOrders = [
  { orderId: 'TRF-2026-0045', empId: 'GHMC-003789', name: 'Mohammed Irfan S.', from: 'Serilingampally / Gachibowli', to: 'LB Nagar / Vanasthalipuram', reason: 'Administrative', effective: '01 Apr 2026', status: 'issued', designation: 'Senior Clerk' },
  { orderId: 'TRF-2026-0038', empId: 'GHMC-009123', name: 'Bhaskar Rao K.', from: 'Uppal / Nacharam', to: 'Secunderabad / Marredpally', reason: 'Mutual Transfer', effective: '01 Apr 2026', status: 'approved', designation: 'Junior Engineer' },
  { orderId: 'TRF-2026-0032', empId: 'GHMC-006890', name: 'Anitha Kumari V.', from: 'LB Nagar / Vanasthalipuram', to: 'Malkajgiri / Tarnaka', reason: 'Employee Request', effective: '01 Mar 2026', status: 'joined', designation: 'Revenue Inspector' },
  { orderId: 'TRF-2026-0028', empId: 'GHMC-008901', name: 'Swathi Priya M.', from: 'Malkajgiri / Tarnaka', to: 'Charminar / Falaknuma', reason: 'Administrative', effective: '01 Feb 2026', status: 'issued', designation: 'Data Entry Operator' },
  { orderId: 'TRF-2026-0021', empId: 'GHMC-005678', name: 'Ramesh Kumar G.', from: 'Secunderabad / Marredpally', to: 'Charminar / Chandrayangutta', reason: 'Administrative', effective: '15 Jan 2026', status: 'joined', designation: 'Sanitary Worker' },
]

const vacancies = [
  { zone: 'Charminar Zone', role: 'Deputy Commissioner', sanctioned: 3, present: 2, vacancy: 1 },
  { zone: 'Kukatpally Zone', role: 'Assistant Engineer', sanctioned: 12, present: 9, vacancy: 3 },
  { zone: 'Secunderabad Zone', role: 'Revenue Inspector', sanctioned: 20, present: 16, vacancy: 4 },
  { zone: 'LB Nagar Zone', role: 'Sanitary Inspector', sanctioned: 8, present: 7, vacancy: 1 },
  { zone: 'Serilingampally Zone', role: 'Junior Engineer', sanctioned: 15, present: 11, vacancy: 4 },
  { zone: 'Malkajgiri Zone', role: 'Senior Clerk', sanctioned: 10, present: 9, vacancy: 1 },
]

const dpcStatus = [
  { step: 'Seniority List Finalized', done: true, date: 'Jan 5, 2026' },
  { step: 'Eligibility Check (ACR / Vigilance)', done: true, date: 'Jan 18, 2026' },
  { step: 'DPC Meeting Convened', done: true, date: 'Feb 3, 2026' },
  { step: 'DPC Recommendations Issued', done: true, date: 'Feb 14, 2026' },
  { step: 'Government / Board Approval', done: false, date: 'Mar 20, 2026' },
  { step: 'Promotion Orders Issued', done: false, date: 'Mar 31, 2026' },
  { step: 'Employee Joins New Post', done: false, date: 'Apr 1, 2026' },
]

const proStatusConfig: Record<string, { label: string; color: string }> = {
  recommended: { label: 'Recommended', color: 'bg-green-50 text-green-700' },
  pending: { label: 'Pending DPC', color: 'bg-amber-50 text-amber-700' },
  withheld: { label: 'Withheld', color: 'bg-red-50 text-red-600' },
  issued: { label: 'Issued', color: 'bg-blue-50 text-blue-700' },
  approved: { label: 'Approved', color: 'bg-purple-50 text-purple-700' },
  joined: { label: 'Joined', color: 'bg-green-50 text-green-700' },
}

export default function PromotionTransfer() {
  const [tab, setTab] = useState<'promotions' | 'transfers' | 'vacancies' | 'dpc'>('promotions')
  const [search, setSearch] = useState('')

  const filteredPromotions = promotionList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.empId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Promote & Transfer" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-400">GHMC HRMS</span>
              <ChevronRight size={12} className="text-gray-300" />
              <span className="text-xs font-semibold text-gray-700">Promotion & Transfer Management</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Promotion & Transfer Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">DPC proceedings, seniority lists, transfer orders & vacancy management</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50 font-medium">
              <Download size={14} /> Seniority List
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={15} /> Issue Transfer Order
            </button>
          </div>
        </div>

        {/* Quick Module Nav */}
        <div className="flex gap-2 mb-5">
          {[
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Promotion & Transfer', to: '/PromotionTransfer', active: true },
            { label: 'Roster Management', to: '/RosterManagement' },
            { label: 'Recruitment', to: '/RecruitmentOnboarding' },
            { label: 'Disciplinary', to: '/DisciplinaryProceedings' },
            { label: 'Retirement Pipeline', to: '/RetirementPipeline' },
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

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Promotions Pending', value: '5', sub: 'DPC 2026', color: '#E69B30', bg: 'bg-amber-50', icon: TrendingUp },
            { label: 'Transfer Orders Issued', value: '4', sub: 'Mar–Apr 2026', color: '#3B82F6', bg: 'bg-blue-50', icon: ArrowRightLeft },
            { label: 'Total Vacancies', value: '14', sub: 'Across all zones', color: '#E35A4A', bg: 'bg-red-50', icon: Users },
            { label: 'DPC Stage', value: '4/7', sub: 'Steps completed', color: '#10B981', bg: 'bg-green-50', icon: CheckCircle },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <k.icon size={17} style={{ color: k.color }} />
              </div>
              <p className="text-2xl font-black text-gray-900">{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'promotions', label: 'Promotion Seniority List' },
            { key: 'transfers', label: 'Transfer Orders' },
            { key: 'vacancies', label: 'Zone Vacancies' },
            { key: 'dpc', label: 'DPC Progress' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'promotions' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3 items-center">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Filter size={13} /> Filter Cadre</button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {['Rank', 'Emp ID', 'Name', 'Current Post', 'Proposed Post', 'Zone', 'DOJ', 'ACR Grade', 'DPC Ref', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPromotions.map((p) => {
                  const s = proStatusConfig[p.status]
                  return (
                    <tr key={p.rank} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-sm" style={{ backgroundColor: p.rank <= 2 ? '#E69B30' : '#E5E7EB', color: p.rank <= 2 ? '#fff' : '#6B7280' }}>
                          {p.rank}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-blue-600">{p.empId}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.current}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-blue-700">{p.proposed}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{p.zone}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.doj}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.acr === 'Outstanding' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{p.acr}</span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-600">{p.dpc}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View File</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'transfers' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Transfer Orders — Apr 2026 Zone Transfers</h2>
                <div className="flex gap-2">
                  {['all', 'issued', 'approved', 'joined'].map(f => (
                    <button key={f} className={`text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer capitalize ${f === 'all' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{f}</button>
                  ))}
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Order ID', 'Employee', 'Designation', 'From', 'To', 'Reason', 'Effective', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transferOrders.map((t) => {
                    const s = proStatusConfig[t.status]
                    return (
                      <tr key={t.orderId} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono font-bold text-blue-600">{t.orderId}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-bold text-gray-900">{t.name}</p>
                          <p className="text-xs text-gray-400">{t.empId}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{t.designation}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <MapPin size={11} className="text-gray-400 flex-shrink-0" />{t.from}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                            <MapPin size={11} className="text-blue-500 flex-shrink-0" />{t.to}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{t.reason}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600">{t.effective}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-xs px-2 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View</button>
                            <button className="text-xs px-2 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-1"><Download size={11} />Order</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* New Transfer Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Issue New Transfer Order</h2>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">EMPLOYEE ID / NAME</label>
                  <input type="text" placeholder="Search employee..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">TRANSFER TO (ZONE)</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer focus:outline-none bg-white">
                    {['Charminar Zone', 'Kukatpally Zone', 'LB Nagar Zone', 'Secunderabad Zone', 'Malkajgiri Zone', 'Khairatabad Zone'].map(z => <option key={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">REASON FOR TRANSFER</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer focus:outline-none bg-white">
                    {['Administrative', 'Employee Request', 'Mutual Transfer', 'Promotion Posting', 'Disciplinary'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1.5">EFFECTIVE DATE</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Issue Transfer Order</button>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Save Draft</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'vacancies' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Zone-wise Vacancy Register</h2>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50"><Download size={13} /> Export</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Zone', 'Designation', 'Sanctioned Strength', 'Present Strength', 'Vacancies', 'Status'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vacancies.map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">{v.zone}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{v.role}</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-700">{v.sanctioned}</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-700">{v.present}</td>
                      <td className="px-4 py-3"><span className="text-sm font-black text-red-600">{v.vacancy}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full max-w-24">
                            <div className="h-2 rounded-full" style={{ width: `${(v.present / v.sanctioned) * 100}%`, backgroundColor: (v.present / v.sanctioned) >= 0.9 ? '#10B981' : (v.present / v.sanctioned) >= 0.75 ? '#E69B30' : '#E35A4A' }} />
                          </div>
                          <span className="text-xs text-gray-500">{Math.round((v.present / v.sanctioned) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Vacancy Summary by Cadre</h2>
                <div className="space-y-3">
                  {[
                    { cadre: 'Class I (Gazetted)', vacancies: 3, total: 145, color: '#1A3555' },
                    { cadre: 'Class II (Gazetted)', vacancies: 7, total: 420, color: '#3B82F6' },
                    { cadre: 'Class III (Non-Gazetted)', vacancies: 28, total: 4820, color: '#E69B30' },
                    { cadre: 'Class IV', vacancies: 142, total: 14200, color: '#10B981' },
                  ].map((c) => (
                    <div key={c.cadre} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-gray-700">{c.cadre}</span>
                        <span className="text-xs font-black text-red-600">{c.vacancies} vacant</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div className="h-1.5 rounded-full" style={{ width: `${((c.total - c.vacancies) / c.total) * 100}%`, backgroundColor: c.color }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{c.total - c.vacancies} / {c.total} filled</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Pending Joining Reports</h2>
                <div className="space-y-2">
                  {[
                    { name: 'Mohammed Irfan S.', date: '01 Apr 2026', zone: 'LB Nagar Zone' },
                    { name: 'Bhaskar Rao K.', date: '01 Apr 2026', zone: 'Secunderabad Zone' },
                    { name: 'Swathi Priya M.', date: '01 Mar 2026', zone: 'Charminar Zone' },
                  ].map((j, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                        {j.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-800">{j.name}</p>
                        <p className="text-xs text-gray-400">{j.zone} · Joining: {j.date}</p>
                      </div>
                      <button className="text-xs px-2 py-1 bg-green-500 text-white rounded-lg font-semibold cursor-pointer">Mark Joined</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'dpc' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-1">DPC 2026 Progress</h2>
              <p className="text-xs text-gray-400 mb-3">Departmental Promotion Committee — Deputy Commissioner cadre</p>
              <Link to="/ACRPerformance" className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer mb-5 transition-colors">
                <TrendingUp size={12} /> ← View ACR / Performance Module
              </Link>
              <div className="relative">
                {dpcStatus.map((s, i) => (
                  <div key={s.step} className="flex gap-3 mb-5 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-green-500' : 'bg-gray-100'}`}>
                        {s.done ? <CheckCircle size={16} className="text-white" /> : <div className="w-3 h-3 rounded-full bg-gray-300" />}
                      </div>
                      {i < dpcStatus.length - 1 && <div className={`w-0.5 h-6 mt-1 ${s.done ? 'bg-green-200' : 'bg-gray-100'}`} />}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-semibold ${s.done ? 'text-gray-900' : 'text-gray-400'}`}>{s.step}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">DPC Eligibility Criteria — Deputy Commissioner Cadre</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { criterion: 'Minimum Service in current grade', value: '5 years' },
                    { criterion: 'Minimum ACR Grade', value: 'Very Good (3 consecutive)' },
                    { criterion: 'Vigilance Clearance', value: 'Required' },
                    { criterion: 'Departmental Examination', value: 'Not applicable (Class I)' },
                    { criterion: 'Pending Inquiry / Suspension', value: 'Disqualifies candidate' },
                    { criterion: 'Medical Fitness Certificate', value: 'Required (Form GHMC-H4)' },
                    { criterion: 'NPS Compliance', value: 'All contributions up to date' },
                    { criterion: 'Seniority Criterion', value: 'Merit-cum-seniority' },
                  ].map(({ criterion: k, value: v }) => (
                    <div key={k} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-400">{k}</p>
                      <p className="text-sm font-bold text-gray-800 mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">DPC Committee Members</h2>
                <div className="space-y-2">
                  {[
                    { name: 'Sri Amrapali K. Das, IAS', role: 'Commissioner, GHMC', position: 'Chairperson' },
                    { name: 'Additional Director, HRD', role: 'Government Nominee (Telangana)', position: 'Member' },
                    { name: 'B. Murali Krishna', role: 'HR Administrator, GHMC', position: 'Member Secretary' },
                    { name: 'Finance Controller, GHMC', role: 'Finance Representative', position: 'Member' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role}</p>
                      </div>
                      <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{m.position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
