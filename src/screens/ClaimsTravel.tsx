'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Plus, FileText, CheckCircle, Clock, XCircle, MapPin, Plane, Briefcase, ChevronDown, Download, AlertCircle } from 'lucide-react'

const claims = [
  { id: 'CLM-2026-0312', type: 'Tour TA/DA', purpose: 'Site inspection — Uppal flyover', from: 'Hyderabad', to: 'Warangal', date: 'Mar 10, 2026', days: 2, amount: 8400, status: 'pending' },
  { id: 'CLM-2026-0289', type: 'Medical Reimbursement', purpose: 'Hospitalization — Apollo Hospital', from: '—', to: '—', date: 'Feb 28, 2026', days: null, amount: 42500, status: 'approved' },
  { id: 'CLM-2026-0261', type: 'Tour TA/DA', purpose: 'Training — NAARM, Hyderabad', from: 'Secunderabad', to: 'Rajendranagar', date: 'Feb 18, 2026', days: 3, amount: 3200, status: 'approved' },
  { id: 'CLM-2026-0244', type: 'Conveyance', purpose: 'Field visit — ward inspections', from: '—', to: '—', date: 'Feb 10, 2026', days: null, amount: 1800, status: 'disbursed' },
  { id: 'CLM-2026-0213', type: 'Tour TA/DA', purpose: 'Conference — New Delhi (MoUD)', from: 'Hyderabad', to: 'New Delhi', date: 'Jan 22, 2026', days: 5, amount: 34200, status: 'rejected' },
  { id: 'CLM-2026-0198', type: 'Medical Reimbursement', purpose: 'Dental treatment', from: '—', to: '—', date: 'Jan 15, 2026', days: null, amount: 12000, status: 'disbursed' },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Pending', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: <Clock size={11} /> },
  approved: { label: 'Approved', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: <CheckCircle size={11} /> },
  disbursed: { label: 'Disbursed', color: 'text-green-700 bg-green-50 border-green-200', icon: <CheckCircle size={11} /> },
  rejected: { label: 'Rejected', color: 'text-red-700 bg-red-50 border-red-200', icon: <XCircle size={11} /> },
}

const claimTypes = ['Tour TA/DA', 'Medical Reimbursement', 'Conveyance', 'LTC (Leave Travel)', 'Children Education Allowance', 'Uniform Allowance']

const taSlabs = [
  { grade: 'Grade A (IAS/IPS)', daily: '₹1,800', hotel: '₹5,500', travel: 'AC 1st Class / Flight' },
  { grade: 'Grade B (Gazetted)', daily: '₹1,200', hotel: '₹3,500', travel: 'AC 2nd Class' },
  { grade: 'Grade C (Non-Gazetted)', daily: '₹800', hotel: '₹2,000', travel: 'Sleeper Class' },
  { grade: 'Grade D (Group D)', daily: '₹500', hotel: '₹1,200', travel: 'Second Class' },
]

export default function ClaimsTravel() {
  const [showForm, setShowForm] = useState(false)
  const [claimType, setClaimType] = useState('Tour TA/DA')
  const [filter, setFilter] = useState('all')
  const [tab, setTab] = useState<'my' | 'team'>('my')

  const filtered = filter === 'all' ? claims : claims.filter(c => c.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Claims & Travel" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Claims & Travel</h1>
            <p className="text-sm text-gray-500 mt-0.5">TA/DA, Medical, Conveyance & LTC reimbursements</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
            <Plus size={16} /> New Claim
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Pending Approval', value: '1', amount: '₹8,400', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Approved (FY)', value: '3', amount: '₹47,900', color: '#3B82F6', bg: 'bg-blue-50' },
            { label: 'Disbursed (FY)', value: '2', amount: '₹13,800', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Rejected', value: '1', amount: '₹34,200', color: '#E35A4A', bg: 'bg-red-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <FileText size={17} style={{ color: k.color }} />
              </div>
              <p className="text-2xl font-black text-gray-900">{k.value} <span className="text-sm font-medium text-gray-400">claims</span></p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs font-bold mt-1" style={{ color: k.color }}>{k.amount}</p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">New Claim Application</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg leading-none">×</button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Claim Type</label>
                <div className="relative">
                  <select value={claimType} onChange={e => setClaimType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white">
                    {claimTypes.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Purpose / Description</label>
                <input type="text" placeholder="Purpose of travel/claim" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Claim Amount (₹)</label>
                <input type="number" placeholder="0.00" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
            {claimType === 'Tour TA/DA' && (
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">From</label>
                  <input type="text" placeholder="Departure city" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">To</label>
                  <input type="text" placeholder="Destination city" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">From Date</label>
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">To Date</label>
                  <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
              </div>
            )}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                <FileText size={20} className="text-gray-300 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Upload bills / receipts (PDF, JPG)</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Submit Claim</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex gap-1">
                {['my', 'team'].map(t => (
                  <button key={t} onClick={() => setTab(t as 'my' | 'team')} className={`px-3 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors capitalize ${tab === t ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t ? { backgroundColor: '#1A3555' } : {}}>
                    {t === 'my' ? 'My Claims' : 'Team Approvals'}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {['all', 'pending', 'approved', 'disbursed'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer capitalize transition-colors ${filter === f ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">Claim ID</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">Type & Purpose</th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">Date</th>
                    <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">Amount</th>
                    <th className="text-center text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((c) => {
                    const s = statusConfig[c.status]
                    return (
                      <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-blue-600 font-bold">{c.id}</td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-gray-800">{c.type}</p>
                          <p className="text-xs text-gray-400">{c.purpose}</p>
                          {c.from !== '—' && <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={10} />{c.from} → {c.to} {c.days && `(${c.days}d)`}</p>}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{c.date}</td>
                        <td className="px-4 py-3 text-right text-sm font-black text-gray-900">₹{c.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${s.color}`}>{s.icon}{s.label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><Download size={14} /></button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">TA/DA Rate Slabs</h2>
              <div className="space-y-2">
                {taSlabs.map((s) => (
                  <div key={s.grade} className="rounded-lg p-3" style={{ backgroundColor: '#F8FAFC' }}>
                    <p className="text-xs font-bold text-gray-800 mb-1.5">{s.grade}</p>
                    <div className="grid grid-cols-3 gap-1">
                      <div>
                        <p className="text-xs text-gray-400">Daily</p>
                        <p className="text-xs font-bold text-gray-700">{s.daily}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Hotel</p>
                        <p className="text-xs font-bold text-gray-700">{s.hotel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Travel</p>
                        <p className="text-xs font-bold text-gray-700 leading-tight">{s.travel}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">Quick TA Calculator</h2>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Grade</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 cursor-pointer focus:outline-none bg-white">
                    <option>Grade A (IAS/IPS)</option>
                    <option>Grade B (Gazetted)</option>
                    <option>Grade C (Non-Gazetted)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">No. of Days</label>
                  <input type="number" defaultValue={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none" />
                </div>
                <div className="rounded-lg p-3 mt-1" style={{ backgroundColor: '#1A3555' }}>
                  <p className="text-xs text-blue-200">Estimated TA/DA</p>
                  <p className="text-xl font-black text-white mt-0.5">₹14,600</p>
                  <p className="text-xs text-blue-300 mt-0.5">Daily: ₹3,600 | Hotel: ₹11,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
