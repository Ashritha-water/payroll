'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Heart, FileText, CheckCircle, Clock, AlertCircle, Download, Search, Plus, Upload, ChevronDown } from 'lucide-react'

const claims = [
  { claimId: 'MED-2026-0241', name: 'V. Raghunath Rao', empId: 'GHMC-011234', hospitalization: 'KIMS Hospital, Secunderabad', treatment: 'Cardiac Catheterization & Stent Placement', admDate: '10-Jan-2026', disDate: '15-Jan-2026', billAmount: 184500, admissible: 164800, deductible: 19700, status: 'approved', approvedDate: '20-Feb-2026', creditedDate: '28-Feb-2026' },
  { claimId: 'MED-2026-0198', name: 'Lakshmi Bai T.', empId: 'GHMC-028912', hospitalization: 'Aware Global Hospital, Hyderabad', treatment: 'Total Knee Replacement Surgery', admDate: '05-Feb-2026', disDate: '12-Feb-2026', billAmount: 248000, admissible: 210000, deductible: 38000, status: 'pending_approval', approvedDate: '', creditedDate: '' },
  { claimId: 'MED-2026-0204', name: 'P. Krishna Reddy', empId: 'GHMC-007654', hospitalization: 'Apollo Hospitals, Jubilee Hills', treatment: 'Laparoscopic Cholecystectomy', admDate: '18-Feb-2026', disDate: '20-Feb-2026', billAmount: 68400, admissible: 60000, deductible: 8400, status: 'documents_pending', approvedDate: '', creditedDate: '' },
  { claimId: 'MED-2026-0156', name: 'M. Anjaneyulu', empId: 'GHMC-034210', hospitalization: 'Nirman Government Hospital, Hyderabad', treatment: 'Type-II Diabetes Management', admDate: '12-Jan-2026', disDate: '14-Jan-2026', billAmount: 22800, admissible: 22800, deductible: 0, status: 'approved', approvedDate: '15-Feb-2026', creditedDate: '22-Feb-2026' },
  { claimId: 'MED-2026-0088', name: 'S. Kalavathi', empId: 'GHMC-019872', hospitalization: 'Rainbow Children Hospital', treatment: 'Paediatric Surgery (Dependent Child)', admDate: '02-Dec-2025', disDate: '07-Dec-2025', billAmount: 92000, admissible: 80000, deductible: 12000, status: 'rejected', approvedDate: '', creditedDate: '' },
]

const panelHospitals = [
  { name: 'KIMS Hospitals', areas: 'Secunderabad, Begumpet', type: 'Empanelled', specialties: 'Cardiology, Ortho, Neuro' },
  { name: 'Apollo Hospitals', areas: 'Jubilee Hills, Hyderguda', type: 'Empanelled', specialties: 'Multi-specialty' },
  { name: 'Aware Global Hospital', areas: 'Hyderabad', type: 'Empanelled', specialties: 'Ortho, Oncology' },
  { name: 'Care Hospitals', areas: 'Banjara Hills, Secunderabad', type: 'Empanelled', specialties: 'Cardiology, Multi-specialty' },
  { name: 'Yashoda Hospitals', areas: 'Somajiguda, Malakpet', type: 'Empanelled', specialties: 'Neurology, Cardiology' },
  { name: 'NIMS (Government)', areas: 'Punjagutta', type: 'Government', specialties: 'All specialties — No Deductible' },
  { name: 'Gandhi General Hospital', areas: 'Secunderabad', type: 'Government', specialties: 'General — No Deductible' },
]

const rateLimits = [
  { category: 'Room Rent (General Ward)', govtHospital: 'Actual', empanelledPvt: '₹1,500/day', non_empanelled: '₹1,000/day' },
  { category: 'Room Rent (Private Room)', govtHospital: 'Actual', empanelledPvt: '₹2,500/day', non_empanelled: '₹1,500/day' },
  { category: 'Diagnostic Tests (Lab)', govtHospital: 'Actual', empanelledPvt: 'As per NABH rates', non_empanelled: '75% admissible' },
  { category: 'Specialist Consultation', govtHospital: 'Actual', empanelledPvt: '₹500/visit', non_empanelled: '₹300/visit' },
  { category: 'ICU Charges', govtHospital: 'Actual', empanelledPvt: '₹4,000/day', non_empanelled: '₹3,000/day' },
  { category: 'Implants / Medical Devices', govtHospital: 'Actual', empanelledPvt: 'NPPA Ceiling Price', non_empanelled: 'NPPA Price — 20%' },
  { category: 'Surgical Operation Charges', govtHospital: 'Actual', empanelledPvt: 'As per package rates', non_empanelled: '80% of package' },
]

const statusColor: Record<string, { bg: string; text: string; label: string }> = {
  approved: { bg: 'bg-green-50', text: 'text-green-700', label: 'Approved & Credited' },
  pending_approval: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Pending Approval' },
  documents_pending: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Documents Pending' },
  rejected: { bg: 'bg-red-50', text: 'text-red-600', label: 'Rejected' },
}

export default function MedicalReimbursement() {
  const [tab, setTab] = useState<'claims' | 'submit' | 'hospitals' | 'rates'>('claims')
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Claims & Travel" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Reimbursement</h1>
            <p className="text-sm text-gray-500 mt-0.5">TSMA / EHS / APIMA Medical Claims — GHMC Employees & Dependents</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
            <button onClick={() => { setTab('submit'); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={14} /> New Claim
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Claims This FY', value: '842', sub: 'FY 2025-26', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'Total Claimed', value: '₹4.82 Cr', sub: 'Bill amount', color: '#8B5CF6', bg: 'bg-purple-50' },
            { label: 'Total Admissible', value: '₹4.14 Cr', sub: '85.9% of claims', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Pending Claims', value: '148', sub: '₹92.4 Lakh in pipeline', color: '#E69B30', bg: 'bg-amber-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <Heart size={17} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'claims', label: 'Claims Register' },
            { key: 'submit', label: 'Submit Claim' },
            { key: 'hospitals', label: 'Panel Hospitals' },
            { key: 'rates', label: 'Admissible Rates' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'claims' && (
          <div className="space-y-3">
            {claims.map(c => {
              const sc = statusColor[c.status]
              return (
                <div key={c.claimId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1A355510' }}>
                      <Heart size={18} style={{ color: '#1A3555' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-gray-900">{c.name}</p>
                            <span className="text-xs text-gray-400">{c.empId}</span>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
                          </div>
                          <p className="text-sm font-semibold text-blue-700 mt-0.5">{c.treatment}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{c.hospitalization} · {c.admDate} to {c.disDate}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xs text-gray-400">Claim ID</p>
                          <p className="text-sm font-bold text-gray-900">{c.claimId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400">Bill Amount</p>
                          <p className="text-sm font-black text-gray-900">₹{c.billAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Admissible</p>
                          <p className="text-sm font-black text-green-600">₹{c.admissible.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Deductible</p>
                          <p className="text-sm font-black text-red-500">₹{c.deductible.toLocaleString()}</p>
                        </div>
                        {c.approvedDate && (
                          <div>
                            <p className="text-xs text-gray-400">Approved</p>
                            <p className="text-sm text-gray-700">{c.approvedDate}</p>
                          </div>
                        )}
                        {c.creditedDate && (
                          <div>
                            <p className="text-xs text-gray-400">Credited</p>
                            <p className="text-sm text-green-600 font-semibold">{c.creditedDate}</p>
                          </div>
                        )}
                        <div className="ml-auto flex gap-2">
                          <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50">View Documents</button>
                          {c.status === 'pending_approval' && (
                            <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Approve</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab === 'submit' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Submit Medical Reimbursement Claim</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Employee ID</label>
                    <input type="text" placeholder="Enter Employee ID..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Patient Name</label>
                    <input type="text" placeholder="Employee or dependent name" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Relationship</label>
                    <div className="relative">
                      <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
                        <option>Self</option>
                        <option>Spouse</option>
                        <option>Dependent Son</option>
                        <option>Dependent Daughter</option>
                        <option>Dependent Father</option>
                        <option>Dependent Mother</option>
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">EHS Health Card Number</label>
                    <input type="text" placeholder="EHS card number" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Hospital Name</label>
                  <input type="text" placeholder="Hospital / Medical Institution" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Nature of Treatment / Diagnosis</label>
                  <textarea rows={2} placeholder="Describe treatment..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Admission Date</label>
                    <input type="date" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Discharge Date</label>
                    <input type="date" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Total Bill Amount (₹)</label>
                    <input type="number" placeholder="0" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                  <Upload size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-600">Upload Medical Documents</p>
                  <p className="text-xs text-gray-400 mt-0.5">Discharge summary, bills, prescriptions, lab reports (PDF/JPG — Max 10MB each)</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Submit Claim</button>
                  <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Save Draft</button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Claim Submission Rules</h3>
                <div className="space-y-2.5">
                  {[
                    'Claims must be submitted within 3 months of discharge',
                    'Attach original bills with doctor\'s prescription',
                    'For planned surgeries, prior approval (advance intimation) required',
                    'Reimbursement limited to TSMA rate schedule',
                    'Claims above ₹50,000 require HOD countersignature',
                  ].map((rule, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-blue-600 font-black text-xs flex-shrink-0">{i + 1}.</span>
                      <p className="text-xs text-gray-600">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-bold text-green-800 text-sm mb-1 flex items-center gap-1.5"><CheckCircle size={13} /> EHS Card Benefits</p>
                <p className="text-xs text-green-700">Employees with EHS (Employee Health Scheme) cards can avail cashless treatment at all empanelled hospitals. No deductible applies for government hospitals.</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-bold text-amber-800 text-sm mb-1 flex items-center gap-1.5"><AlertCircle size={13} /> Processing Time</p>
                <p className="text-xs text-amber-700">Standard claims: 30 working days. Claims above ₹1 lakh: 45 working days. Advance intimation cases: 7 working days for approval.</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'hospitals' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search hospital..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {panelHospitals.map(h => (
                <div key={h.name} className="px-4 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${h.type === 'Government' ? 'bg-green-50' : 'bg-blue-50'}`}>
                    <Heart size={18} style={{ color: h.type === 'Government' ? '#10B981' : '#1A3555' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{h.name}</p>
                    <p className="text-xs text-gray-400">{h.areas}</p>
                    <p className="text-xs text-blue-600 font-medium mt-0.5">{h.specialties}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${h.type === 'Government' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{h.type}</span>
                  <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50">View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'rates' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">TSMA Admissible Rate Schedule</h2>
              <p className="text-xs text-gray-400 mt-0.5">Effective from GO Ms. No. 241/Health, dt. 15-Jul-2023</p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Service Category', 'Govt. / NIMS Hospital', 'Empanelled Private', 'Non-Empanelled Private'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rateLimits.map(r => (
                  <tr key={r.category} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{r.category}</td>
                    <td className="px-4 py-3 text-sm text-green-600 font-medium">{r.govtHospital}</td>
                    <td className="px-4 py-3 text-sm text-blue-600 font-medium">{r.empanelledPvt}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.non_empanelled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-amber-50 border-t border-amber-100">
              <p className="text-xs text-amber-800 font-medium flex items-center gap-2"><AlertCircle size={13} /> <strong>Note:</strong> For treatments not covered in the rate schedule, a Medical Committee review is required. Advance intimation is mandatory for elective surgeries above ₹50,000.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
