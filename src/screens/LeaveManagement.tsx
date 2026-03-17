'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Plus, Calendar, CheckCircle, XCircle, Clock, ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/lib'

const leaveTypes = [
  { name: 'Casual Leave', short: 'CL', total: 12, availed: 5, balance: 7, color: '#3B82F6' },
  { name: 'Earned Leave', short: 'EL', total: 30, availed: 8, balance: 22, color: '#4CAF50' },
  { name: 'Half Pay Leave', short: 'HPL', total: 20, availed: 3, balance: 17, color: '#E69B30' },
  { name: 'Maternity Leave', short: 'ML', total: 180, availed: 0, balance: 180, color: '#EC4899' },
  { name: 'Compensatory Off', short: 'CO', total: 4, availed: 2, balance: 2, color: '#8B5CF6' },
  { name: 'Restricted Holiday', short: 'RH', total: 2, availed: 1, balance: 1, color: '#06B6D4' },
]

const leaveHistory = [
  { id: 'LV-2026-089', type: 'CL', from: '18 Mar 2026', to: '19 Mar 2026', days: 2, reason: 'Personal work', status: 'Pending', applied: '14 Mar 2026' },
  { id: 'LV-2026-067', type: 'EL', from: '10 Feb 2026', to: '14 Feb 2026', days: 5, reason: 'Family function', status: 'Approved', applied: '05 Feb 2026' },
  { id: 'LV-2026-041', type: 'CL', from: '12 Jan 2026', to: '12 Jan 2026', days: 1, reason: 'Medical checkup', status: 'Approved', applied: '11 Jan 2026' },
  { id: 'LV-2025-198', type: 'EL', from: '20 Dec 2025', to: '27 Dec 2025', days: 8, reason: 'Annual vacation', status: 'Approved', applied: '12 Dec 2025' },
  { id: 'LV-2025-155', type: 'HPL', from: '05 Nov 2025', to: '07 Nov 2025', days: 3, reason: 'Medical treatment', status: 'Rejected', applied: '01 Nov 2025' },
]

const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  Pending: { bg: 'bg-amber-50', text: 'text-amber-700', icon: <Clock size={12} /> },
  Approved: { bg: 'bg-green-50', text: 'text-green-700', icon: <CheckCircle size={12} /> },
  Rejected: { bg: 'bg-red-50', text: 'text-red-600', icon: <XCircle size={12} /> },
}

export default function LeaveManagement() {
  const [showApply, setShowApply] = useState(false)
  const [leaveType, setLeaveType] = useState('CL')
  const [tab, setTab] = useState<'balance' | 'history'>('balance')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Leave Management" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        {/* Deep-link Nav Strip */}
        <div className="flex items-center gap-2 mb-5">
          <Link to="/EmployeeMaster" className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-colors"><ArrowLeft size={12} /> Employee Master</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link to="/EmployeeProfile" className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer transition-colors">Employee Profile</Link>
          <ChevronRight size={12} className="text-gray-300" />
          {[
            { label: 'Service Book', to: '/ServiceBook' },
            { label: 'GPF Statement', to: '/GPFStatement' },
            { label: 'NPS & Pension', to: '/NPSPension' },
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Leave', to: '/LeaveManagement', active: true },
            { label: 'Income Tax', to: '/IncomeTax' },
          ].map(link => (
            <Link key={link.label} to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >{link.label}</Link>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">FY 2025-26 | Sri Amrapali K. Das, IAS</p>
          </div>
          <button
            onClick={() => setShowApply(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer hover:opacity-90"
            style={{ backgroundColor: '#1A3555' }}
          >
            <Plus size={16} /> Apply Leave
          </button>
        </div>

        <div className="flex gap-2 mb-5">
          {(['balance', 'history'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all capitalize ${tab === t ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              style={tab === t ? { backgroundColor: '#1A3555' } : {}}
            >
              {t === 'balance' ? 'Leave Balances' : 'Leave History'}
            </button>
          ))}
        </div>

        {tab === 'balance' && (
          <div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5">
              <h2 className="font-bold text-gray-900 mb-4">Leave Balances — FY 2025-26</h2>
              <div className="grid grid-cols-3 gap-4">
                {leaveTypes.map(lt => (
                  <div key={lt.name} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{lt.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full text-white font-semibold mt-1 inline-block" style={{ backgroundColor: lt.color }}>{lt.short}</span>
                      </div>
                      <Calendar size={20} style={{ color: lt.color }} />
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Total</span>
                        <span className="font-semibold text-gray-700">{lt.total}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Availed</span>
                        <span className="font-semibold text-red-500">{lt.availed}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Balance</span>
                        <span className="font-bold text-green-600">{lt.balance}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${(lt.availed / lt.total) * 100}%`, backgroundColor: lt.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Leave Calendar</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-600">Upcoming Leave</span><span className="font-semibold text-amber-600">18-19 Mar</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-600">Public Holidays</span><span className="font-semibold text-blue-600">3 remaining</span></div>
                  <div className="flex justify-between py-2"><span className="text-gray-600">Restricted Holidays</span><span className="font-semibold text-purple-600">1 remaining</span></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Leave Encashment</h3>
                <p className="text-2xl font-black text-gray-900 mb-1">22 <span className="text-lg text-gray-500 font-normal">EL days</span></p>
                <p className="text-xs text-gray-500 mb-3">Eligible for encashment at end of year</p>
                <p className="text-sm font-bold text-green-600">Est. ₹1,72,480</p>
                <p className="text-xs text-gray-400 mt-1">Based on current basic pay</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Team Leaves Today</h3>
                <div className="space-y-2">
                  {[{ name: 'R. Kumar', type: 'CL' }, { name: 'P. Sharma', type: 'EL' }].map((p, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50">
                      <span className="text-gray-700">{p.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-semibold">{p.type}</span>
                    </div>
                  ))}
                  <p className="text-xs text-gray-400 mt-2">2 team members on leave</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Leave ID', 'Type', 'From', 'To', 'Days', 'Reason', 'Applied On', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((lv) => {
                  const s = statusConfig[lv.status]
                  return (
                    <tr key={lv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold" style={{ color: '#1A5276' }}>{lv.id}</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{lv.type}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-700">{lv.from}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{lv.to}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{lv.days}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{lv.reason}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{lv.applied}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${s.bg} ${s.text}`}>{s.icon} {lv.status}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {showApply && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowApply(false)}>
            <div className="bg-white rounded-2xl p-6 w-[480px] shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Apply for Leave</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">LEAVE TYPE</label>
                  <select value={leaveType} onChange={e => setLeaveType(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer">
                    {leaveTypes.map(lt => <option key={lt.short} value={lt.short}>{lt.name} ({lt.balance} days available)</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">FROM DATE</label>
                    <input type="date" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">TO DATE</label>
                    <input type="date" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">REASON</label>
                  <textarea rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none resize-none" placeholder="Enter reason for leave..." />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">HANDOVER TO (Optional)</label>
                  <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Employee name/ID" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowApply(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">Cancel</button>
                <button onClick={() => setShowApply(false)} className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>Submit Application</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
