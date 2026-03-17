'use client'
import React, { useState } from 'react'
import Components from '../components'
import {
  User, FileText, Calendar, Clock, DollarSign, Award, CheckCircle,
  AlertCircle, ChevronRight, Bell, TrendingUp, Users, Clipboard,
  Star, Download, Send, Eye, Edit3, Phone, Mail, MapPin,
  Shield, Lock, CreditCard, Briefcase, BookOpen, Heart,
  AlertTriangle, CheckSquare, Zap, BarChart2, RefreshCw, Share2
} from 'lucide-react'
import { Link } from '@/lib'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts'

const pendingApprovals = [
  { id: 'APR-001', emp: 'M. Suresh Kumar', empId: 'EMP1234', type: 'Leave Request', detail: 'Casual Leave — Mar 18-19 (2 days)', time: '2 hrs ago', priority: 'normal', dept: 'Engineering' },
  { id: 'APR-002', emp: 'V. Anitha Reddy', empId: 'EMP1567', type: 'Claim Approval', detail: 'Medical — ₹18,500 (hospitalization)', time: '5 hrs ago', priority: 'high', dept: 'Revenue' },
  { id: 'APR-003', emp: 'K. Ravi Shankar', empId: 'EMP2089', type: 'Tour Request', detail: 'Site visit — Karimnagar (Mar 20-21)', time: '1 day ago', priority: 'normal', dept: 'Town Planning' },
  { id: 'APR-004', emp: 'S. Padmaja', empId: 'EMP2341', type: 'OT Approval', detail: 'Overtime — 32 hrs (Feb month)', time: '2 days ago', priority: 'normal', dept: 'Accounts' },
  { id: 'APR-005', emp: 'T. Nagaraju', empId: 'EMP3102', type: 'Transfer Request', detail: 'Zone transfer — Uppal to LB Nagar', time: '3 days ago', priority: 'high', dept: 'Sanitation' },
]

const teamMembers = [
  { name: 'M. Suresh Kumar', role: 'Asst. Engineer', status: 'present', zone: 'Kukatpally', perf: 4.2 },
  { name: 'V. Anitha Reddy', role: 'Sr. Clerk', status: 'present', zone: 'Kukatpally', perf: 3.9 },
  { name: 'K. Ravi Shankar', role: 'Jr. Engineer', status: 'leave', zone: 'Kukatpally', perf: 4.5 },
  { name: 'S. Padmaja', role: 'Revenue Inspector', status: 'present', zone: 'Kukatpally', perf: 4.0 },
  { name: 'T. Nagaraju', role: 'Sanitary Worker', status: 'absent', zone: 'Kukatpally', perf: 3.5 },
  { name: 'R. Deepika', role: 'Data Entry Op.', status: 'present', zone: 'Kukatpally', perf: 4.1 },
]

const monthlyAttendance = [
  { m: 'Oct', p: 92 }, { m: 'Nov', p: 88 }, { m: 'Dec', p: 85 },
  { m: 'Jan', p: 91 }, { m: 'Feb', p: 94 }, { m: 'Mar', p: 90 },
]

const payHistory = [
  { m: 'Sep', net: 1.08 }, { m: 'Oct', net: 1.08 }, { m: 'Nov', net: 1.11 },
  { m: 'Dec', net: 1.14 }, { m: 'Jan', net: 1.14 }, { m: 'Feb', net: 1.17 },
]

const myDocuments = [
  { name: 'Pay Slip — Feb 2026', type: 'PDF', date: '01 Mar 2026', size: '182 KB' },
  { name: 'Form 16A — FY 2025-26', type: 'PDF', date: '28 Feb 2026', size: '340 KB' },
  { name: 'GPF Annual Statement', type: 'PDF', date: '01 Feb 2026', size: '415 KB' },
  { name: 'Service Certificate', type: 'PDF', date: '15 Jan 2026', size: '128 KB' },
  { name: 'No Objection Certificate', type: 'PDF', date: '10 Jan 2026', size: '96 KB' },
]

const leaveBalances = [
  { type: 'Casual Leave', used: 6, total: 12, color: '#3B82F6' },
  { type: 'Earned Leave', used: 7, total: 55, color: '#10B981' },
  { type: 'Half Pay Leave', used: 0, total: 20, color: '#8B5CF6' },
  { type: 'Comp Off', used: 2, total: 4, color: '#F59E0B' },
  { type: 'Restricted Holiday', used: 1, total: 2, color: '#EF4444' },
]

const recentActivity = [
  { action: 'Pay slip for February 2026 generated', time: 'Today, 9:00 AM', icon: DollarSign, color: '#15803D' },
  { action: 'Leave balance updated — 8 EL credited', time: 'Mar 1, 2026', icon: Calendar, color: '#3B82F6' },
  { action: 'Form 16A downloaded from the portal', time: 'Feb 28, 2026', icon: Download, color: '#7C3AED' },
  { action: 'Medical claim ₹42,500 approved by DDO', time: 'Feb 26, 2026', icon: CheckCircle, color: '#15803D' },
  { action: 'Tour TA/DA ₹34,200 sent for revision', time: 'Jan 28, 2026', icon: AlertCircle, color: '#D97706' },
  { action: 'GPF withdrawal credited to bank account', time: 'Jan 10, 2026', icon: CreditCard, color: '#0284C7' },
]

const notifications = [
  { msg: 'Pay slip for Feb 2026 ready for download', tag: 'Payroll', time: 'Now', urgent: false },
  { msg: 'Actual IT declaration due by 31 Mar 2026 — Submit now', tag: 'Income Tax', time: '2d', urgent: true },
  { msg: 'GPF statement FY 2025-26 available for download', tag: 'GPF', time: '5d', urgent: false },
  { msg: 'Biometric not captured on Mar 12 — Regularize', tag: 'Attendance', time: '1w', urgent: true },
  { msg: 'Medical reimbursement claim pending documents', tag: 'Claims', time: '2w', urgent: false },
]

export default function ESSMSS() {
  const [tab, setTab] = useState<'ess' | 'mss'>('ess')
  const [essTab, setEssTab] = useState<'overview' | 'payroll' | 'leave' | 'documents' | 'profile'>('overview')
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="ESS / MSS" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Employee & Manager Self Service</h1>
            <p className="text-sm text-gray-500 mt-0.5">Sri Amrapali K. Das — Dy. City Planner, Headquarters</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white rounded-xl border border-gray-200 p-1 gap-1">
              {(['ess', 'mss'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} className={`px-6 py-2 rounded-lg text-sm font-black cursor-pointer transition-all uppercase tracking-wide ${tab === t ? 'text-white shadow-sm' : 'text-gray-400 hover:text-gray-700'}`} style={tab === t ? { backgroundColor: '#1A3555' } : {}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {tab === 'ess' ? (
          <>
            {/* ESS Sub-tabs */}
            <div className="flex gap-1 mb-4 bg-white rounded-xl border border-gray-200 p-1 w-fit">
              {(['overview', 'payroll', 'leave', 'documents', 'profile'] as const).map(t => (
                <button key={t} onClick={() => setEssTab(t)} className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize cursor-pointer transition-all ${essTab === t ? 'text-white' : 'text-gray-400 hover:text-gray-700'}`} style={essTab === t ? { backgroundColor: '#1A3555' } : {}}>
                  {t}
                </button>
              ))}
            </div>

            {essTab === 'overview' && (
              <div className="space-y-4">
                {/* Profile + Stats Row */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Profile Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-xl mb-3" style={{ backgroundColor: '#1A3555' }}>AK</div>
                      <p className="font-black text-gray-900">Sri Amrapali K. Das</p>
                      <p className="text-xs text-gray-500 mb-2">IAS — Dy. Commissioner</p>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#E69B30' }}>Level 13 (7th CPC)</span>
                    </div>
                    <div className="mt-4 space-y-2 text-xs">
                      {[
                        ['Employee ID', 'EMP-0001'],
                        ['Zone', 'Headquarters'],
                        ['DOJ', '01 Aug 2012'],
                        ['Basic Pay', '₹1,24,100'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between py-1 border-b border-gray-50 last:border-0">
                          <span className="text-gray-400">{k}</span>
                          <span className="font-bold text-gray-800">{v}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/EmployeeProfile" className="mt-3 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer hover:opacity-90 transition-all" style={{ backgroundColor: '#1A3555' }}>
                      <Eye size={12} /> View Full Profile
                    </Link>
                  </div>

                  {/* KPI Stats */}
                  <div className="col-span-3 grid grid-cols-3 gap-3">
                    {[
                      { label: 'CL Balance', value: '6', sub: 'of 12 used', color: '#3B82F6', icon: Calendar },
                      { label: 'Earned Leave', value: '48', sub: 'days accumulated', color: '#10B981', icon: Calendar },
                      { label: 'YTD Gross Pay', value: '₹20.6L', sub: 'FY 2025-26', color: '#1A3555', icon: DollarSign },
                      { label: 'TDS Deducted', value: '₹1.54L', sub: 'YTD FY 2025-26', color: '#D97706', icon: FileText },
                      { label: 'Attendance %', value: '94.2%', sub: 'FY 2025-26 avg', color: '#7C3AED', icon: Clock },
                      { label: 'Claims (FY)', value: '₹71.7K', sub: 'Reimbursed', color: '#BE185D', icon: Award },
                      { label: 'GPF Balance', value: '₹28.4L', sub: 'As of Feb 2026', color: '#0284C7', icon: CreditCard },
                      { label: 'Pending Claims', value: '2', sub: 'Awaiting approval', color: '#D97706', icon: AlertTriangle },
                      { label: 'Service Years', value: '13.6Y', sub: 'Since Aug 2012', color: '#475569', icon: Briefcase },
                    ].map((s) => (
                      <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + '15' }}>
                            <s.icon size={13} style={{ color: s.color }} />
                          </div>
                          <span className="text-xs text-gray-400">{s.label}</span>
                        </div>
                        <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs text-gray-400">{s.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <h2 className="font-black text-gray-900 text-sm mb-3">Quick Actions</h2>
                  <div className="grid grid-cols-8 gap-2">
                    {[
                      { label: 'Apply Leave', color: '#10B981', icon: Calendar, action: () => setShowLeaveModal(true) },
                      { label: 'New Claim', color: '#7C3AED', icon: FileText, action: () => setShowClaimModal(true) },
                      { label: 'My Pay Slips', color: '#1A3555', icon: DollarSign, to: '/Payroll' },
                      { label: 'IT Declaration', color: '#D97706', icon: FileText, to: '/IncomeTax' },
                      { label: 'GPF Account', color: '#0284C7', icon: CreditCard, to: '/GPFStatement' },
                      { label: 'My Attendance', color: '#3B82F6', icon: Clock, to: '/Attendance' },
                      { label: 'Service Book', color: '#475569', icon: BookOpen, to: '/ServiceBook' },
                      { label: 'Medical Claim', color: '#BE185D', icon: Heart, to: '/MedicalReimbursement' },
                    ].map((a) => (
                      a.to ? (
                        <Link key={a.label} to={a.to} className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: a.color + '15' }}>
                            <a.icon size={16} style={{ color: a.color }} />
                          </div>
                          <span className="text-xs font-bold text-gray-600 text-center leading-tight">{a.label}</span>
                        </Link>
                      ) : (
                        <button key={a.label} onClick={a.action} className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: a.color + '15' }}>
                            <a.icon size={16} style={{ color: a.color }} />
                          </div>
                          <span className="text-xs font-bold text-gray-600 text-center leading-tight">{a.label}</span>
                        </button>
                      )
                    ))}
                  </div>
                </div>

                {/* Activity + Notifications */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                      <h2 className="font-black text-gray-900 text-sm">Recent Activity</h2>
                      <button className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {recentActivity.map((a, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: a.color + '15' }}>
                            <a.icon size={13} style={{ color: a.color }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 font-medium">{a.action}</p>
                            <p className="text-xs text-gray-400">{a.time}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                      <h2 className="font-black text-gray-900 text-sm">Notifications</h2>
                      <span className="text-xs font-black text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E35A4A' }}>2 urgent</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {notifications.map((n, i) => (
                        <div key={i} className={`flex gap-2.5 p-3 cursor-pointer transition-colors ${n.urgent ? 'hover:bg-red-50/30' : 'hover:bg-blue-50/20'}`}>
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.urgent ? 'bg-red-500' : 'bg-blue-400'}`} />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-800 leading-tight">{n.msg}</p>
                            <div className="flex gap-1.5 mt-1">
                              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">{n.tag}</span>
                              <span className="text-xs text-gray-400">{n.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {essTab === 'payroll' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-black text-gray-900">Pay Slip — February 2026</h2>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                        <Download size={12} /> Download PDF
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Earnings</p>
                        {[
                          ['Basic Pay', '₹1,24,100'],
                          ['Dearness Allowance (50%)', '₹62,050'],
                          ['HRA (30%)', '₹37,230'],
                          ['Transport Allowance', '₹7,200'],
                          ['Other Allowances', '₹4,800'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 text-sm">
                            <span className="text-gray-600">{k}</span>
                            <span className="font-semibold text-gray-800">{v}</span>
                          </div>
                        ))}
                        <div className="flex justify-between py-2 mt-1">
                          <span className="font-black text-gray-900 text-sm">Gross Pay</span>
                          <span className="font-black text-green-700">₹2,35,380</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Deductions</p>
                        {[
                          ['GPF Subscription (10%)', '₹12,410'],
                          ['Income Tax (TDS)', '₹27,200'],
                          ['GHMC ESI Contribution', '₹1,800'],
                          ['NPS Tier-I (10%)', '₹12,410'],
                          ['Professional Tax', '₹200'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 text-sm">
                            <span className="text-gray-600">{k}</span>
                            <span className="font-semibold text-red-600">{v}</span>
                          </div>
                        ))}
                        <div className="flex justify-between py-2 mt-1">
                          <span className="font-black text-gray-900 text-sm">Total Deductions</span>
                          <span className="font-black text-red-600">₹54,020</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-xl flex justify-between items-center" style={{ backgroundColor: '#0C1C34' }}>
                      <span className="font-black text-white">Net Pay (Take-Home)</span>
                      <span className="font-black text-2xl" style={{ color: '#E69B30' }}>₹1,81,360</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <h3 className="font-black text-sm text-gray-900 mb-3">Net Pay Trend (₹ Lakhs)</h3>
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={payHistory}>
                          <Line type="monotone" dataKey="net" stroke="#1A3555" strokeWidth={2} dot={{ fill: '#1A3555', r: 3 }} />
                          <XAxis dataKey="m" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v: unknown) => [`₹${v}L`, 'Net Pay']} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <h3 className="font-black text-sm text-gray-900 mb-3">Pay Slips Archive</h3>
                      <div className="space-y-2">
                        {['Feb 2026', 'Jan 2026', 'Dec 2025', 'Nov 2025'].map(m => (
                          <div key={m} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                            <span className="text-xs font-semibold text-gray-700">{m}</span>
                            <button className="flex items-center gap-1 text-xs font-bold text-blue-600 cursor-pointer hover:underline">
                              <Download size={11} /> PDF
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {essTab === 'leave' && (
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-3 mb-4">
                  {leaveBalances.map((lb) => (
                    <div key={lb.type} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <p className="text-xs font-bold text-gray-500 mb-2">{lb.type}</p>
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-2xl font-black" style={{ color: lb.color }}>{lb.total - lb.used}</span>
                        <span className="text-xs text-gray-400 mb-1">/ {lb.total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${(lb.used / lb.total) * 100}%`, backgroundColor: lb.color }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{lb.used} used</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-black text-sm text-gray-900">Leave History</h3>
                      <button onClick={() => setShowLeaveModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer" style={{ backgroundColor: '#10B981' }}>
                        + Apply Leave
                      </button>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {[
                        { type: 'CL', dates: 'Mar 10–11', days: 2, status: 'Approved', color: '#10B981' },
                        { type: 'EL', dates: 'Feb 18–22', days: 5, status: 'Approved', color: '#10B981' },
                        { type: 'CL', dates: 'Jan 20', days: 1, status: 'Approved', color: '#10B981' },
                        { type: 'EL', dates: 'Jan 2–4', days: 3, status: 'Rejected', color: '#EF4444' },
                        { type: 'CL', dates: 'Dec 26', days: 1, status: 'Approved', color: '#10B981' },
                      ].map((l, i) => (
                        <div key={i} className="flex items-center px-4 py-3 gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>{l.type}</div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{l.dates}</p>
                            <p className="text-xs text-gray-400">{l.days} day{l.days > 1 ? 's' : ''}</p>
                          </div>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: l.color + '15', color: l.color }}>{l.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <h3 className="font-black text-sm text-gray-900 mb-3">Attendance Pattern (FY 2025-26)</h3>
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={monthlyAttendance}>
                        <Bar dataKey="p" fill="#1A3555" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10, fill: '#6B7280', formatter: (v: unknown) => `${v}%` }} />
                        <XAxis dataKey="m" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                        <YAxis hide domain={[75, 100]} />
                        <Tooltip formatter={(v: unknown) => [`${v}%`, 'Attendance']} />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {[
                        { label: 'Present Days', value: '198', color: '#10B981' },
                        { label: 'Leave Days', value: '12', color: '#D97706' },
                        { label: 'Avg %', value: '94.2%', color: '#1A3555' },
                      ].map(s => (
                        <div key={s.label} className="text-center p-2 rounded-xl bg-gray-50">
                          <p className="text-lg font-black" style={{ color: s.color }}>{s.value}</p>
                          <p className="text-xs text-gray-500">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {essTab === 'documents' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-black text-sm text-gray-900">My Documents</h3>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">
                    <Share2 size={12} /> Request Certificate
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {myDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0" style={{ backgroundColor: '#BE185D' }}>
                        {doc.type}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                        <p className="text-xs text-gray-400">{doc.date} • {doc.size}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
                          <Download size={11} /> Download
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-100">
                          <Eye size={11} /> Preview
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-2">Request Official Documents</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Service Certificate', 'NOC', 'Character Certificate', 'Pay Certificate', 'Experience Letter'].map(d => (
                      <button key={d} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 cursor-pointer hover:bg-white transition-colors">
                        + {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {essTab === 'profile' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-sm text-gray-900">Personal Information</h3>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"><Edit3 size={14} className="text-gray-400" /></button>
                  </div>
                  <div className="space-y-3 text-xs">
                    {[
                      ['Full Name', 'Sri Amrapali K. Das, IAS'],
                      ['Date of Birth', '15 April 1980'],
                      ['Gender', 'Female'],
                      ['Blood Group', 'B+'],
                      ['Aadhaar (masked)', 'XXXX-XXXX-4821'],
                      ['PAN', 'AXKAZ4821P'],
                      ['Mobile', '+91 98765 43210'],
                      ['Email', 'amrapali.das@ghmc.gov.in'],
                      ['Emergency Contact', '+91 90123 45678'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 border-b border-gray-50">
                        <span className="text-gray-400">{k}</span>
                        <span className="font-semibold text-gray-800 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-black text-sm text-gray-900 mb-4">Service Information</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      ['Employee ID', 'EMP-0001'],
                      ['Cadre', 'IAS — Telangana'],
                      ['Designation', 'Deputy Commissioner'],
                      ['Department', 'Town Planning'],
                      ['Zone / Circle', 'Headquarters'],
                      ['Pay Level', '13 (₹1,23,100–2,15,900)'],
                      ['Date of Joining', '01 August 2012'],
                      ['Date of Retirement', '30 April 2040'],
                      ['GPF Account No', 'TS/GPF/2012/04821'],
                      ['Bank Account', 'SBI XXXX 9871'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 border-b border-gray-50">
                        <span className="text-gray-400">{k}</span>
                        <span className="font-semibold text-gray-800 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <h3 className="font-black text-sm text-gray-900 mb-3">Security & Access</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Change Password', icon: Lock, color: '#1A3555' },
                        { label: 'Update Mobile / Email', icon: Phone, color: '#0284C7' },
                        { label: 'Aadhaar Link Status', icon: Shield, color: '#10B981' },
                        { label: 'Active Sessions', icon: Zap, color: '#D97706' },
                      ].map(item => (
                        <button key={item.label} className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors text-left">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: item.color + '15' }}>
                            <item.icon size={13} style={{ color: item.color }} />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                          <ChevronRight size={12} className="text-gray-300 ml-auto" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <h3 className="font-black text-sm text-gray-900 mb-3">Nomination Details</h3>
                    <div className="space-y-2 text-xs">
                      {[
                        { type: 'GPF Nominee', name: 'K. Sundar Das (Husband)', pct: '100%' },
                        { type: 'Gratuity', name: 'K. Sundar Das', pct: '100%' },
                        { type: 'DCRG', name: 'K. Sundar Das', pct: '100%' },
                      ].map(n => (
                        <div key={n.type} className="p-2.5 rounded-lg bg-gray-50">
                          <p className="font-bold text-gray-700">{n.type}</p>
                          <p className="text-gray-500">{n.name} • {n.pct}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* MSS Tab */
          <>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Team Size', value: '6', icon: Users, color: '#1A3555' },
                { label: 'Present Today', value: '4', icon: CheckCircle, color: '#10B981' },
                { label: 'Pending Approvals', value: '5', icon: Clipboard, color: '#D97706' },
                { label: 'Avg Performance', value: '4.1/5', icon: Star, color: '#7C3AED' },
              ].map((k) => (
                <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: k.color + '15' }}>
                    <k.icon size={17} style={{ color: k.color }} />
                  </div>
                  <p className="text-2xl font-black text-gray-900">{k.value}</p>
                  <p className="text-xs font-semibold text-gray-600 mt-0.5">{k.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-black text-sm text-gray-900">Pending Approvals</h2>
                  <span className="text-xs font-black text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: '#D97706' }}>5 pending</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {pendingApprovals.map((a) => (
                    <div key={a.id} className="px-4 py-3.5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3 flex-1">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                            {a.emp.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-bold text-gray-900">{a.emp}</span>
                              <span className="text-xs text-gray-400">{a.empId}</span>
                              {a.priority === 'high' && <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">Urgent</span>}
                            </div>
                            <p className="text-xs font-bold text-blue-600">{a.type} • <span className="text-gray-400 font-normal">{a.dept}</span></p>
                            <p className="text-xs text-gray-500 mt-0.5">{a.detail}</p>
                            <p className="text-xs text-gray-300 mt-0.5">{a.time}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button className="px-3 py-1.5 rounded-lg text-white text-xs font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#10B981' }}>Approve</button>
                          <button className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-bold cursor-pointer hover:bg-red-50">Reject</button>
                          <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-bold cursor-pointer hover:bg-gray-50">Defer</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <h2 className="font-black text-sm text-gray-900 mb-3">My Team</h2>
                  <div className="space-y-2">
                    {teamMembers.map((m) => (
                      <div key={m.name} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0" style={{ backgroundColor: m.status === 'absent' ? '#9CA3AF' : '#1A3555' }}>
                          {m.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{m.name}</p>
                          <p className="text-xs text-gray-400">{m.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-gray-600">{m.perf}</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.status === 'present' ? 'bg-green-500' : m.status === 'leave' ? 'bg-amber-400' : 'bg-red-400'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-3 text-xs">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-green-500 rounded-full" /><span className="text-gray-500">Present</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-amber-400 rounded-full" /><span className="text-gray-500">Leave</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-400 rounded-full" /><span className="text-gray-500">Absent</span></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <h2 className="font-black text-sm text-gray-900 mb-3">Manager Actions</h2>
                  <div className="space-y-2">
                    {[
                      { label: 'Write Appraisal Remarks', color: '#7C3AED', icon: Edit3 },
                      { label: 'View Team Attendance', color: '#1A3555', icon: Clock },
                      { label: 'Team Leave Calendar', color: '#10B981', icon: Calendar },
                      { label: 'Performance Reports', color: '#D97706', icon: BarChart2 },
                    ].map(a => (
                      <button key={a.label} className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors text-left">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: a.color + '15' }}>
                          <a.icon size={13} style={{ color: a.color }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{a.label}</span>
                        <ChevronRight size={12} className="text-gray-300 ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Leave Modal */}
        {showLeaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowLeaveModal(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-black text-gray-900 mb-4">Apply for Leave</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Leave Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200">
                    {['Casual Leave (CL)', 'Earned Leave (EL)', 'Half Pay Leave (HPL)', 'Compensatory Off', 'Restricted Holiday'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">From Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">To Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Reason / Remarks</label>
                  <textarea rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200 resize-none" placeholder="Enter reason for leave..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Contact During Leave</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200" placeholder="Mobile number" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowLeaveModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-50">Cancel</button>
                <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#10B981' }}>Submit Application</button>
              </div>
            </div>
          </div>
        )}

        {/* Claim Modal */}
        {showClaimModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowClaimModal(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-black text-gray-900 mb-4">Submit New Claim</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Claim Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200">
                    {['Medical Reimbursement', 'Travel Allowance (TA)', 'Daily Allowance (DA)', 'Tour TA/DA', 'Other Expenses'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Claim Amount (₹)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200" placeholder="Amount in rupees" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Claim Period</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200" placeholder="e.g. March 1–15, 2026" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-1">Description</label>
                  <textarea rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200 resize-none" placeholder="Brief description of claim..." />
                </div>
                <div className="border border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <p className="text-xs font-bold text-gray-500">📎 Attach Bills / Receipts</p>
                  <p className="text-xs text-gray-400">Max 5 files, 2MB each (PDF/JPG)</p>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowClaimModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 cursor-pointer hover:bg-gray-50">Cancel</button>
                <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#7C3AED' }}>Submit Claim</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
