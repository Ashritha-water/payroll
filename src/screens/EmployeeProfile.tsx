'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Link } from '@/lib'
import { ArrowLeft, Edit, Download, Phone, Mail, MapPin, Calendar, Award, BookOpen, TrendingUp, Shield, Briefcase, Clock, CheckCircle, AlertCircle, Printer } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar } from 'recharts'
import { useLocation } from 'react-router-dom'

const payProgression = [
  { year: '2015', pay: 44900 }, { year: '2016', pay: 47600 }, { year: '2017', pay: 50400 },
  { year: '2018', pay: 53300 }, { year: '2019', pay: 56500 }, { year: '2020', pay: 59900 },
  { year: '2021', pay: 63400 }, { year: '2022', pay: 67200 }, { year: '2023', pay: 71100 },
  { year: '2024', pay: 75300 }, { year: '2025', pay: 78800 },
]

const serviceHistory = [
  { from: 'Mar 2005', to: 'Jun 2008', role: 'Junior Engineer', zone: 'Uppal Circle', type: 'Regular' },
  { from: 'Jul 2008', to: 'Dec 2012', role: 'Assistant Engineer', zone: 'Malkajgiri Zone', type: 'Regular' },
  { from: 'Jan 2013', to: 'Mar 2017', role: 'Executive Engineer', zone: 'HQ — Engineering Dept', type: 'Regular' },
  { from: 'Apr 2017', to: 'Aug 2020', role: 'Deputy Commissioner', zone: 'Secunderabad Zone', type: 'Regular' },
  { from: 'Sep 2020', to: 'Mar 2023', role: 'Deputy Commissioner', zone: 'HQ — Finance Wing', type: 'Deputation' },
  { from: 'Apr 2023', to: 'Present', role: 'Deputy Commissioner', zone: 'Charminar Zone', type: 'Regular' },
]

const qualifications = [
  { degree: 'B.E. (Civil Engineering)', institution: 'JNTU Hyderabad', year: '1999', grade: '74.5%' },
  { degree: 'M.Tech (Structural Engineering)', institution: 'Osmania University', year: '2002', grade: '82.3%' },
  { degree: 'PGDPA (Public Admin)', institution: 'MCRHRD Institute', year: '2010', grade: 'Distinction' },
]

const leaves = [
  { type: 'Casual Leave (CL)', total: 12, availed: 5, balance: 7, color: '#3B82F6' },
  { type: 'Earned Leave (EL)', total: 300, availed: 212, balance: 88, color: '#10B981' },
  { type: 'Half Pay Leave (HPL)', total: 150, availed: 48, balance: 102, color: '#E69B30' },
  { type: 'Commuted Leave', total: 24, availed: 6, balance: 18, color: '#8B5CF6' },
]

const assets = [
  { item: 'Government Vehicle', detail: 'AP 09 TG 4422 — Innova Crysta', assigned: 'Apr 2023', status: 'active' },
  { item: 'Official Mobile', detail: '+91 94408-XXXXX — Govt. SIM', assigned: 'Sep 2020', status: 'active' },
  { item: 'Laptop (Dell Latitude)', detail: 'Serial: DL-GH-2023-0456', assigned: 'Apr 2023', status: 'active' },
  { item: 'Quarter Allotment', detail: 'Type III — Banjara Hills Govt Qtrs', assigned: 'Sep 2020', status: 'active' },
]

const chartConfig = {
  pay: { label: 'Basic Pay (₹)', color: '#1A3555' },
}

const tabs = [
  { key: 'overview', label: 'Overview', icon: Briefcase },
  { key: 'service', label: 'Service History', icon: Clock },
  { key: 'payroll', label: 'Pay Progression', icon: TrendingUp },
  { key: 'leave', label: 'Leave Summary', icon: Calendar },
  { key: 'qualifications', label: 'Qualifications', icon: BookOpen },
  { key: 'assets', label: 'Assets', icon: Shield },
] as const

type Tab = (typeof tabs)[number]['key']

export default function EmployeeProfile() {
  const location = useLocation()
  const [tab, setTab] = useState<Tab>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active={location.pathname} />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Link to="/EmployeeMaster" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">
            <ArrowLeft size={16} /> Employee Master
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-gray-800">GHMC-001234 — Srinivas Reddy K.</span>
        </div>
        {/* Deep-link navigation strip */}
        {/* <div className="flex gap-2 mb-4">
          {[
            { label: 'Employee Profile', to: '/EmployeeProfile', active: true },
            { label: 'Service Book', to: '/ServiceBook' },
            { label: 'GPF Statement', to: '/GPFStatement' },
            { label: 'NPS & Pension', to: '/NPSPension' },
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Pay Slips', to: '/Payroll' },
            { label: 'Leave', to: '/LeaveManagement' },
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
        </div> */}

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 flex gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
            SR
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-gray-900">Srinivas Reddy K.</h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#4CAF50' }}>Active</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">Class I Gazetted</span>
            </div>
            <p className="text-base font-semibold text-gray-600 mb-3">Deputy Commissioner — Charminar Zone / Falaknuma Circle</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600"><Briefcase size={14} className="text-gray-400" /> Emp ID: <span className="font-bold text-gray-800">GHMC-001234</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar size={14} className="text-gray-400" /> DOJ: <span className="font-bold text-gray-800">15 Mar 2005</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Award size={14} className="text-gray-400" /> Pay Level: <span className="font-bold text-gray-800">Level 12 (7th CPC)</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Clock size={14} className="text-gray-400" /> Service: <span className="font-bold text-gray-800">21 Yrs 1 Mo</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Phone size={14} className="text-gray-400" /><span className="font-bold text-gray-800">+91 98480-12345</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><Mail size={14} className="text-gray-400" /><span className="font-bold text-gray-800">s.reddy.dc@ghmc.gov.in</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={14} className="text-gray-400" /><span className="font-bold text-gray-800">DOB: 22 Aug 1977</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-600"><TrendingUp size={14} className="text-gray-400" /> Basic Pay: <span className="font-bold text-gray-800">₹78,800</span></div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Edit size={14} /> Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Printer size={14} /> Print
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[
            { label: 'Gross Salary', value: '₹1,56,340', sub: 'Feb 2026', color: '#1A3555' },
            { label: 'Net Salary', value: '₹1,19,834', sub: 'After deductions', color: '#4CAF50' },
            { label: 'CL Balance', value: '7 days', sub: 'FY 2025-26', color: '#3B82F6' },
            { label: 'EL Balance', value: '88 days', sub: 'FY 2025-26', color: '#E69B30' },
            { label: 'Attendance', value: '96.2%', sub: 'Current FY', color: '#8B5CF6' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              <t.icon size={13} />{t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide text-gray-500">Personal Information</h2>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {[
                    ['Full Name', 'Srinivas Reddy Koppolu'],
                    ['Father\'s Name', 'Koppolu Narayana Reddy'],
                    ['Gender', 'Male'],
                    ['Date of Birth', '22 Aug 1977 (47 yrs)'],
                    ['Aadhaar', '****-****-4512'],
                    ['PAN', 'CRHPK2012M'],
                    ['Community', 'OC'],
                    ['Religion', 'Hindu'],
                    ['Marital Status', 'Married'],
                    ['Nationality', 'Indian'],
                    ['Mother Tongue', 'Telugu'],
                    ['Ex-Serviceman', 'No'],
                  ].map(([k, v]) => (
                    <div key={k} className="py-2 border-b border-gray-50">
                      <p className="text-xs text-gray-400">{k}</p>
                      <p className="font-semibold text-gray-800 mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide text-gray-500">Bank & Financial Details</h2>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {[
                    ['Bank Name', 'State Bank of India'],
                    ['Branch', 'Abids, Hyderabad'],
                    ['Account Number', '****0123'],
                    ['IFSC', 'SBIN0004345'],
                    ['GPF Account No.', 'TS/GPF/2005/004512'],
                    ['GPF Subscription', '12% of Basic Pay'],
                    ['NPS PRAN', '110024189234'],
                    ['NPS Tier-I', '₹7,880/month'],
                    ['LIC Policy', '83456712 (₹3,200/mo)'],
                  ].map(([k, v]) => (
                    <div key={k} className="py-2 border-b border-gray-50">
                      <p className="text-xs text-gray-400">{k}</p>
                      <p className="font-semibold text-gray-800 mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide text-gray-500">Address</h2>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-bold text-gray-500 mb-1">PRESENT ADDRESS</p>
                    <p className="text-gray-800 leading-relaxed">H.No. 8-2-120/86/A, Flat 3B<br/>Shanthi Apartments, Road No. 72<br/>Banjara Hills, Hyderabad — 500 034<br/>Telangana</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-bold text-gray-500 mb-1">PERMANENT ADDRESS</p>
                    <p className="text-gray-800 leading-relaxed">Koppolu Vari Veedhi, Kosigi<br/>Nandyal District, Andhra Pradesh — 518 563</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide text-gray-500">Emergency Contact</h2>
                <div className="space-y-2 text-sm">
                  {[
                    ['Name', 'Kamala Srinivas (Spouse)'],
                    ['Phone', '+91 98480-67890'],
                    ['Relation', 'Spouse'],
                    ['Address', 'Same as present address'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-400 text-xs">{k}</span>
                      <span className="font-semibold text-gray-800 text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide text-gray-500">Performance Ratings</h2>
                <div className="space-y-2">
                  {[
                    { year: 'FY 2024-25', rating: 'Outstanding', stars: 5, color: '#10B981' },
                    { year: 'FY 2023-24', rating: 'Very Good', stars: 4, color: '#3B82F6' },
                    { year: 'FY 2022-23', rating: 'Outstanding', stars: 5, color: '#10B981' },
                    { year: 'FY 2021-22', rating: 'Good', stars: 3, color: '#E69B30' },
                  ].map((p) => (
                    <div key={p.year} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                      <span className="text-xs text-gray-600">{p.year}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold" style={{ color: p.color }}>{p.rating}</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(s => (
                            <div key={s} className="w-2.5 h-2.5 rounded-sm mr-0.5" style={{ backgroundColor: s <= p.stars ? p.color : '#E5E7EB' }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service History Tab */}
        {tab === 'service' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Service History — 21 Years</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                <Download size={13} /> Export
              </button>
            </div>
            <div className="relative p-6">
              <div className="absolute left-16 top-6 bottom-6 w-0.5 bg-gray-100" />
              <div className="space-y-6">
                {serviceHistory.map((s, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className="w-10 text-right flex-shrink-0">
                      <span className="text-xs text-gray-400 font-semibold leading-tight">{s.from.split(' ')[1]}</span>
                    </div>
                    <div className="w-4 flex-shrink-0 flex flex-col items-center relative z-10">
                      <div className="w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0" style={{ backgroundColor: i === serviceHistory.length - 1 ? '#1A3555' : '#fff', borderColor: '#1A3555' }} />
                    </div>
                    <div className={`flex-1 rounded-xl p-4 border transition-colors ${i === serviceHistory.length - 1 ? 'border-blue-200 bg-blue-50/40' : 'border-gray-100 bg-gray-50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900">{s.role}</p>
                          <p className="text-sm text-gray-600 mt-0.5">{s.zone}</p>
                          <p className="text-xs text-gray-400 mt-1">{s.from} — {s.to}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.type === 'Deputation' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'}`}>{s.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pay Progression Tab */}
        {tab === 'payroll' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Basic Pay Progression (₹)</h2>
              <ChartContainer config={chartConfig} className="h-56">
                <AreaChart data={payProgression}>
                  <defs>
                    <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A3555" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1A3555" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="pay" stroke="#1A3555" strokeWidth={2.5} fill="url(#payGrad)" />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Pay Revision History</h2>
              <div className="space-y-2">
                {payProgression.map((p, i) => (
                  <div key={p.year} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-700 w-10">{p.year}</span>
                      <div className="h-1.5 rounded-full bg-gray-100 w-32">
                        <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${(p.pay / 78800) * 100}%` }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-gray-900">₹{p.pay.toLocaleString()}</span>
                      {i > 0 && <span className="text-xs text-green-500 ml-2">+₹{(p.pay - payProgression[i-1].pay).toLocaleString()}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Current Pay Structure</h2>
              <div className="grid grid-cols-4 gap-4">
                {[['Basic Pay', '₹78,800'], ['DA (53%)', '₹41,764'], ['HRA (27%)', '₹21,276'], ['CCA', '₹5,400'], ['Medical Allowance', '₹1,500'], ['Transport Allowance', '₹3,600'], ['Special Pay', '₹4,000'], ['Gross Salary', '₹1,56,340']].map(([k, v], i) => (
                  <div key={k} className={`rounded-xl p-4 ${i === 7 ? 'text-white' : 'bg-gray-50'}`} style={i === 7 ? { backgroundColor: '#1A3555' } : {}}>
                    <p className={`text-xs mb-1 ${i === 7 ? 'text-blue-200' : 'text-gray-400'}`}>{k}</p>
                    <p className={`text-lg font-black ${i === 7 ? 'text-white' : 'text-gray-900'}`} style={i === 7 ? { color: '#E69B30' } : {}}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leave Summary Tab */}
        {tab === 'leave' && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {leaves.map((l) => (
                <div key={l.type} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <p className="text-xs font-bold text-gray-500 mb-3">{l.type}</p>
                  <div className="space-y-1.5 mb-3">
                    {[['Total Entitlement', l.total, 'text-gray-700'], ['Availed', l.availed, 'text-red-500'], ['Balance', l.balance, 'text-green-600']].map(([k, v, c]) => (
                      <div key={k as string} className="flex justify-between text-sm">
                        <span className="text-gray-400">{k}</span>
                        <span className={`font-bold ${c}`}>{v} days</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 rounded-full" style={{ width: `${(l.availed / l.total) * 100}%`, backgroundColor: l.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100"><h2 className="font-bold text-gray-900">Leave History (Last 2 Years)</h2></div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Leave ID', 'Type', 'From', 'To', 'Days', 'Purpose', 'Sanctioned By', 'Status'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: 'LV-2026-089', type: 'CL', from: '18 Mar 2026', to: '19 Mar 2026', days: 2, purpose: 'Personal', by: 'Zonal Commissioner', status: 'Pending' },
                    { id: 'LV-2026-067', type: 'EL', from: '10 Feb 2026', to: '14 Feb 2026', days: 5, purpose: 'Family function', by: 'HR Admin', status: 'Approved' },
                    { id: 'LV-2025-198', type: 'EL', from: '20 Dec 2025', to: '27 Dec 2025', days: 8, purpose: 'Annual vacation', by: 'Commissioner', status: 'Approved' },
                    { id: 'LV-2025-155', type: 'HPL', from: '05 Nov 2025', to: '07 Nov 2025', days: 3, purpose: 'Medical', by: 'HR Admin', status: 'Rejected' },
                    { id: 'LV-2025-102', type: 'CL', from: '15 Sep 2025', to: '15 Sep 2025', days: 1, purpose: 'Personal', by: 'HR Admin', status: 'Approved' },
                  ].map((lv) => (
                    <tr key={lv.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-blue-600">{lv.id}</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{lv.type}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-700">{lv.from}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{lv.to}</td>
                      <td className="px-4 py-3 text-xs font-bold text-gray-900">{lv.days}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{lv.purpose}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{lv.by}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${lv.status === 'Approved' ? 'bg-green-50 text-green-700' : lv.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'}`}>{lv.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Qualifications Tab */}
        {tab === 'qualifications' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Educational Qualifications</h2>
                <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>+ Add</button>
              </div>
              <div className="divide-y divide-gray-50">
                {qualifications.map((q, i) => (
                  <div key={i} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{q.degree}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{q.institution}</p>
                      <div className="flex gap-4 mt-1.5">
                        <span className="text-xs text-gray-400">Year: <span className="font-semibold text-gray-700">{q.year}</span></span>
                        <span className="text-xs text-gray-400">Score: <span className="font-semibold text-green-600">{q.grade}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Training & Certifications</h2>
                <div className="space-y-3">
                  {[
                    { name: 'IAS Foundation Course', org: 'LBSNAA Mussoorie', year: '2004', type: 'Training' },
                    { name: 'Urban Governance & Mgt', org: 'IIPA New Delhi', year: '2014', type: 'Certificate' },
                    { name: 'Project Management (PMI)', org: 'PMI India', year: '2018', type: 'Certification' },
                    { name: 'Smart Cities Leadership', org: 'IIM Ahmedabad', year: '2022', type: 'Executive Prog.' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50">
                      <Award size={16} className="text-amber-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.org} — {t.year}</p>
                      </div>
                      <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">{t.type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Languages Known</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[['Telugu', 'Native'], ['English', 'Fluent'], ['Hindi', 'Proficient'], ['Urdu', 'Conversational']].map(([lang, level]) => (
                    <div key={lang} className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-semibold text-gray-800">{lang}</span>
                      <span className="text-xs font-semibold text-blue-600">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {tab === 'assets' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Assigned Government Assets</h2>
                <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Assign Asset</button>
              </div>
              <div className="divide-y divide-gray-50">
                {assets.map((a, i) => (
                  <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Shield size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{a.item}</p>
                      <p className="text-xs text-gray-500">{a.detail}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Assigned: {a.assigned}</p>
                    </div>
                    <span className="text-xs font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full capitalize">{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Disciplinary Record</h2>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <CheckCircle size={24} className="text-green-500" />
                  <div>
                    <p className="font-bold text-green-800">Clean Record</p>
                    <p className="text-xs text-green-600 mt-0.5">No disciplinary proceedings on record</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    ['ACR Gradings', '5 Outstanding, 14 Very Good, 2 Good'],
                    ['Vigilance Clearance', 'Clear as on Mar 2026'],
                    ['DEO Clearance', 'Clear'],
                    ['Anti-Corruption', 'Clear'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 text-sm">
                      <span className="text-gray-400">{k}</span>
                      <span className="font-semibold text-gray-800 text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Awards & Recognitions</h2>
                <div className="space-y-3">
                  {[
                    { award: 'Best Officer Award — GHMC', year: '2023', type: 'Excellence' },
                    { award: 'Smart City Champion — MoUD', year: '2021', type: 'National' },
                    { award: 'Commendation — Commissioner', year: '2019', type: 'Appreciation' },
                    { award: 'Best Zone (Secunderabad)', year: '2018', type: 'Team Award' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50">
                      <Award size={16} className="text-amber-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{a.award}</p>
                        <p className="text-xs text-gray-400">{a.year}</p>
                      </div>
                      <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">{a.type}</span>
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
