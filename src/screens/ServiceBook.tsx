'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Download, Printer, BookOpen, User, Award, TrendingUp, Shield, Calendar, FileText, ChevronRight, CheckCircle, AlertCircle, Clock, Edit3 } from 'lucide-react'
import { Link } from '@/lib'

const employee = {
  empId: 'GHMC-004892',
  name: 'K. Venkateswara Rao',
  photo: '',
  designation: 'Executive Engineer (Civil)',
  cadre: 'Class-I Gazetted',
  dob: '15-Jun-1972',
  doj: '12-Mar-1997',
  department: 'Engineering & Projects',
  zone: 'Kukatpally',
  serviceYears: 29,
  retirementDate: '30-Jun-2032',
  pfNo: 'GPF/TS/12456',
  pan: 'BXKPV4891F',
  aadhar: 'XXXX-XXXX-7823',
  sbAccount: 'SBI 00321456789',
  mobile: '+91 94400 12345',
}

const serviceHistory = [
  { date: '01-Jan-2024', event: 'Annual Increment', details: 'Basic Pay revised from ₹71,100 to ₹73,200 (Pay Level 12)', type: 'pay', authority: 'GO Ms. No. 12/2024 FIN(HRM.IV)', verified: true },
  { date: '15-Aug-2022', event: 'Promotion — Executive Engineer', details: 'Promoted from Dy. EE (Civil) to Executive Engineer (Civil). Pay fixed at ₹67,700.', type: 'promotion', authority: 'GO Ms. No. 87/2022 MA&UD', verified: true },
  { date: '01-Jan-2022', event: 'Annual Increment', details: 'Basic Pay revised from ₹63,100 to ₹65,000. DA @ 46%.', type: 'pay', authority: 'GO Ms. No. 04/2022 FIN', verified: true },
  { date: '10-Mar-2020', event: 'Transfer — Kukatpally Zone', details: 'Transferred from Serilingampally Zone to Kukatpally Zone on mutual request.', type: 'transfer', authority: 'Memo No. GHMC/HRM/TR/2020/345', verified: true },
  { date: '15-Jan-2019', event: 'Pay Revision — PRC 2015 Implementation', details: 'Pay fixed at ₹59,800 in new Pay Matrix (Level 11). Arrears of ₹2,84,500 processed.', type: 'pay', authority: 'GO Ms. No. 46/2019 FIN(HRM)', verified: true },
  { date: '01-Jun-2018', event: 'Promotion — Deputy Executive Engineer', details: 'Promoted from Assistant Engineer to Deputy Executive Engineer. New Basic: ₹53,600', type: 'promotion', authority: 'GO Ms. No. 31/2018 MA&UD', verified: true },
  { date: '22-Sep-2015', event: 'Deputation — HMDA', details: 'Proceeded on deputation to HMDA for infrastructure project. Deputation allowance paid.', type: 'transfer', authority: 'GO Ms. No. 122/2015 MA&UD', verified: true },
  { date: '12-Mar-1997', event: 'Initial Appointment', details: 'Appointed as Assistant Engineer (Civil) under GHMC (erstwhile MCH). Basic Pay: ₹7,100 (PRC 1993).', type: 'appointment', authority: 'GO Ms. No. 88/1997 MA&UD', verified: true },
]

const leaveAccount = [
  { type: 'Casual Leave', entitlement: 12, taken: 8, balance: 4, encashable: false },
  { type: 'Earned Leave', entitlement: 30, taken: 12, balance: 240, encashable: true },
  { type: 'Half Pay Leave', entitlement: 20, taken: 3, balance: 165, encashable: false },
  { type: 'Commuted Leave', entitlement: 10, taken: 0, balance: 10, encashable: false },
  { type: 'Special Casual Leave', entitlement: 5, taken: 2, balance: 3, encashable: false },
  { type: 'Restricted Holiday', entitlement: 2, taken: 1, balance: 1, encashable: false },
]

const qualifications = [
  { degree: 'B.E. Civil Engineering', institution: 'JNTU Hyderabad', year: '1994', grade: 'First Class — 72%', verified: true },
  { degree: 'M.Tech (Structural Engineering)', institution: 'Osmania University', year: '1996', grade: 'First Class with Distinction — 81%', verified: true },
  { degree: 'AMIE (Civil)', institution: 'Institution of Engineers India', year: '2001', grade: 'Pass', verified: true },
]

const nominations = [
  { relation: 'Spouse', name: 'K. Sarada Devi', dob: '22-Aug-1975', share: '70%', scheme: 'GPF + DCRG + Family Pension' },
  { relation: 'Son', name: 'K. Sai Kiran', dob: '14-May-2001', share: '30%', scheme: 'GPF + DCRG' },
]

const penalties = [
  { date: '12-May-2011', charge: 'Delay in submission of project completion report', penalty: 'Censure', status: 'Closed' },
]

const tabs = [
  { key: 'service', label: 'Service History', icon: BookOpen },
  { key: 'personal', label: 'Personal Details', icon: User },
  { key: 'leave', label: 'Leave Account', icon: Calendar },
  { key: 'qualifications', label: 'Qualifications', icon: Award },
  { key: 'nominations', label: 'Nominations', icon: Shield },
  { key: 'disciplinary', label: 'Disciplinary', icon: AlertCircle },
]

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  pay: { color: 'text-green-700', bg: 'bg-green-100', label: 'Pay Revision' },
  promotion: { color: 'text-blue-700', bg: 'bg-blue-100', label: 'Promotion' },
  transfer: { color: 'text-purple-700', bg: 'bg-purple-100', label: 'Transfer' },
  appointment: { color: 'text-amber-700', bg: 'bg-amber-100', label: 'Appointment' },
  disciplinary: { color: 'text-red-700', bg: 'bg-red-100', label: 'Disciplinary' },
}

export default function ServiceBook() {
  const [tab, setTab] = useState('service')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Employees" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex gap-2 mb-4">
          {[
            { label: 'Employee Profile', to: '/EmployeeProfile' },
            { label: 'Service Book', to: '/ServiceBook', active: true },
            { label: 'GPF Statement', to: '/GPFStatement' },
            { label: 'NPS & Pension', to: '/NPSPension' },
            { label: 'ACR / PAR', to: '/ACRPerformance' },
            { label: 'Pay Slips', to: '/Payroll' },
            { label: 'Leave', to: '/LeaveManagement' },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${(link as any).active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={(link as any).active ? { backgroundColor: '#1A3555' } : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Digital Service Book</h1>
            <p className="text-sm text-gray-500 mt-0.5">Complete electronic service record as per GHMC Service Rules</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Search size={14} /> Search Employee
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Printer size={14} /> Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Download size={14} /> Export Service Book
            </button>
          </div>
        </div>

        {/* Employee Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-3xl font-black" style={{ backgroundColor: '#1A3555' }}>
              {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-black text-gray-900">{employee.name}</h2>
                  <p className="text-sm font-semibold text-blue-700 mt-0.5">{employee.designation}</p>
                  <div className="flex gap-4 mt-2 flex-wrap">
                    <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full">{employee.cadre}</span>
                    <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full">{employee.zone} Zone</span>
                    <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-full">{employee.department}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Employee ID</p>
                  <p className="text-lg font-black text-gray-900 mt-0.5">{employee.empId}</p>
                  <p className="text-xs text-gray-500">GPF: {employee.pfNo}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 pt-4 border-t border-gray-100">
            {[
              { label: 'Date of Birth', value: employee.dob },
              { label: 'Date of Joining', value: employee.doj },
              { label: 'Service Length', value: `${employee.serviceYears} Years` },
              { label: 'Retirement Date', value: employee.retirementDate },
              { label: 'PAN Number', value: employee.pan },
              { label: 'Mobile', value: employee.mobile },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{f.label}</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'service' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-gray-900">Chronological Service Entries</h2>
              <div className="flex gap-2">
                {Object.entries(typeConfig).map(([k, v]) => (
                  <span key={k} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${v.bg} ${v.color}`}>{v.label}</span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gray-100" />
              <div className="space-y-0">
                {serviceHistory.map((entry, i) => {
                  const tc = typeConfig[entry.type]
                  return (
                    <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${tc.bg}`}>
                        {entry.type === 'pay' && <TrendingUp size={15} className={tc.color} />}
                        {entry.type === 'promotion' && <Award size={15} className={tc.color} />}
                        {entry.type === 'transfer' && <ChevronRight size={15} className={tc.color} />}
                        {entry.type === 'appointment' && <User size={15} className={tc.color} />}
                        {entry.type === 'disciplinary' && <AlertCircle size={15} className={tc.color} />}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-blue-50/30 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>{tc.label}</span>
                              {entry.verified && <CheckCircle size={13} className="text-green-500" />}
                            </div>
                            <h3 className="font-bold text-gray-900">{entry.event}</h3>
                            <p className="text-sm text-gray-600 mt-0.5">{entry.details}</p>
                            <p className="text-xs text-gray-400 mt-1.5 font-medium">Authority: {entry.authority}</p>
                          </div>
                          <div className="text-right ml-4 flex-shrink-0">
                            <p className="text-sm font-bold text-gray-700">{entry.date}</p>
                            <button className="text-xs text-blue-600 cursor-pointer hover:underline mt-1 flex items-center gap-0.5">
                              <FileText size={11} /> View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 mt-4 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 cursor-pointer hover:bg-gray-50 w-full justify-center">
              <Edit3 size={14} /> Add Service Entry
            </button>
          </div>
        )}

        {tab === 'personal' && (
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Personal Information', fields: [['Full Name', employee.name], ['Date of Birth', employee.dob], ['Gender', 'Male'], ['Caste', 'OC'], ['Religion', 'Hindu'], ['Marital Status', 'Married'], ['Nationality', 'Indian'], ['Mother Tongue', 'Telugu']] },
              { title: 'Service Information', fields: [['Employee ID', employee.empId], ['Designation', employee.designation], ['Cadre', employee.cadre], ['Department', employee.department], ['Zone/Circle', employee.zone], ['Date of Joining', employee.doj], ['Service Length', `${employee.serviceYears} Years`], ['Retirement Date', employee.retirementDate]] },
              { title: 'Financial Identifiers', fields: [['PAN Number', employee.pan], ['Aadhaar', employee.aadhar], ['GPF Account', employee.pfNo], ['NPS PRAN', 'PRAN-110098765432'], ['Bank Account', employee.sbAccount], ['IFSC', 'SBIN0012345']] },
              { title: 'Contact & Address', fields: [['Mobile', employee.mobile], ['Email', 'k.venkat.rao@ghmc.gov.in'], ['Address', 'H.No. 5-6-123, Kukatpally, Hyderabad — 500072'], ['Emergency Contact', '+91 98480 45678 (Spouse)']] },
            ].map(section => (
              <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">{section.title}</h3>
                <div className="space-y-3">
                  {section.fields.map(([label, val]) => (
                    <div key={label} className="flex justify-between items-start pb-2.5 border-b border-gray-50 last:border-0 last:pb-0">
                      <span className="text-xs text-gray-400 font-medium w-40 flex-shrink-0">{label}</span>
                      <span className="text-sm font-semibold text-gray-800 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'leave' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Leave Account — FY 2025-26</h2>
                <p className="text-xs text-gray-400 mt-0.5">29 years of service — Earned Leave balance includes carry-forward</p>
              </div>
              <div className="divide-y divide-gray-50">
                {leaveAccount.map(l => (
                  <div key={l.type} className="px-4 py-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Calendar size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{l.type}</p>
                      <p className="text-xs text-gray-400">Annual Entitlement: {l.entitlement} days</p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Taken</p>
                        <p className="text-base font-black text-red-500">{l.taken}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Balance</p>
                        <p className="text-base font-black text-green-600">{l.balance}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">Encashable</p>
                        <p className="text-base font-black text-gray-500">{l.encashable ? '✓' : '—'}</p>
                      </div>
                    </div>
                    <div className="w-32">
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(l.taken / (l.entitlement)) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 text-sm">EL Encashment on Retirement</p>
                <p className="text-xs text-amber-700 mt-0.5">240 Earned Leave days are eligible for encashment at the time of retirement (max 300 days). Estimated encashment: <strong>₹8,96,640</strong></p>
              </div>
            </div>
          </div>
        )}

        {tab === 'qualifications' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Educational Qualifications</h2>
              <button className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center gap-1"><Edit3 size={12} /> Add Qualification</button>
            </div>
            <div className="space-y-3">
              {qualifications.map((q, i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{q.degree}</h3>
                        <p className="text-sm text-gray-600 mt-0.5">{q.institution}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{q.year} · {q.grade}</p>
                      </div>
                      {q.verified && <span className="flex items-center gap-1 text-xs text-green-700 font-semibold bg-green-50 px-2.5 py-1 rounded-full h-fit"><CheckCircle size={12} /> Verified</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'nominations' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-gray-900">GPF & DCRG Nominations</h2>
                <p className="text-xs text-gray-400 mt-0.5">As per Form No. 2 — Nomination for GPF, Gratuity & Family Pension</p>
              </div>
              <button className="text-sm text-blue-600 cursor-pointer hover:underline flex items-center gap-1"><Edit3 size={12} /> Update Nomination</button>
            </div>
            <div className="space-y-3 mb-5">
              {nominations.map((n, i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl items-center">
                  <div className="w-10 h-10 rounded-full bg-navy-100 text-white flex items-center justify-center font-bold flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                    {n.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{n.name}</p>
                    <p className="text-xs text-gray-400">{n.relation} · DOB: {n.dob}</p>
                    <p className="text-xs text-blue-600 mt-0.5 font-medium">{n.scheme}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">{n.share}</p>
                    <p className="text-xs text-gray-400">Share</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 font-medium">Nominations are valid and on record. Last updated: 22-Sep-2019. Total share: 100%.</p>
            </div>
          </div>
        )}

        {tab === 'disciplinary' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Disciplinary Proceedings Record</h2>
              {penalties.map((p, i) => (
                <div key={i} className="flex gap-4 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold text-red-900">{p.charge}</p>
                        <p className="text-xs text-red-600 mt-0.5">Date: {p.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">{p.penalty}</span>
                        <p className="text-xs text-green-600 font-semibold mt-1">{p.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 font-medium">No pending disciplinary proceedings as on date. Last case closed on 30-Jun-2011. Vigilance clearance: Active.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
