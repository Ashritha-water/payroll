'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Printer, Download, Search, ChevronDown } from 'lucide-react'

const employees = ['Srinivas Reddy K. (GHMC-001234)', 'Lakshmi Devi P. (GHMC-002456)', 'Mohammed Irfan S. (GHMC-003789)', 'Padma Rani T. (GHMC-004012)']

export default function Payroll() {
  const [selectedEmp, setSelectedEmp] = useState(0)
  const [showRunModal, setShowRunModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Payroll" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">February 2026 — Processing Complete</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">View Pay Slip</button>
            <button
              onClick={() => setShowRunModal(true)}
              className="px-4 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#1A3555' }}
            >
              Run March Payroll
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Gross Salary', value: '₹18,63,45,200', sub: '30,340 employees', color: '#1A3555' },
            { label: 'Total Deductions', value: '₹5,89,12,600', sub: 'GPF + IT + Prof Tax', color: '#E35A4A' },
            { label: 'Net Disbursement', value: '₹12,74,32,600', sub: 'Credited to accounts', color: '#4CAF50' },
            { label: 'Arrears Paid', value: '₹42,18,900', sub: '236 employees', color: '#E69B30' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{card.label}</p>
              <p className="text-xl font-black text-gray-900 mb-1">{card.value}</p>
              <p className="text-xs text-gray-500">{card.sub}</p>
              <div className="mt-3 h-1 rounded-full bg-gray-100">
                <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: card.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-gray-900">Pay Slip</h2>
              <div className="relative">
                <select
                  value={selectedEmp}
                  onChange={e => setSelectedEmp(parseInt(e.target.value))}
                  className="appearance-none pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer"
                >
                  {employees.map((e, i) => <option key={i} value={i}>{e}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                <Printer size={14} /> Print
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                <Download size={14} /> PDF
              </button>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl mb-5 text-sm">
              <div><span className="text-gray-500 font-medium">Month:</span> <span className="font-bold text-gray-800 ml-1">February 2026</span></div>
              <div><span className="text-gray-500 font-medium">Designation:</span> <span className="font-bold text-gray-800 ml-1">Deputy Commissioner</span></div>
              <div><span className="text-gray-500 font-medium">Zone:</span> <span className="font-bold text-gray-800 ml-1">Charminar Zone</span></div>
              <div><span className="text-gray-500 font-medium">Bank:</span> <span className="font-bold text-gray-800 ml-1">SBI - A/C ...0123</span></div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-5">
              <div>
                <p className="text-sm font-bold mb-3" style={{ color: '#4CAF50' }}>EARNINGS</p>
                <div className="space-y-2">
                  {[
                    ['Basic Pay', 78800],
                    ['Dearness Allowance (53%)', 41764],
                    ['House Rent Allowance (27%)', 21276],
                    ['City Compensatory Allowance', 5400],
                    ['Medical Allowance', 1500],
                    ['Transport Allowance', 3600],
                    ['Special Pay', 4000],
                  ].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-sm text-gray-700">{label}</span>
                      <span className="text-sm font-semibold text-gray-800">₹{(val as number).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 font-bold">
                    <span className="text-sm" style={{ color: '#4CAF50' }}>Total Earnings</span>
                    <span className="text-sm" style={{ color: '#4CAF50' }}>₹1,56,340</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold mb-3" style={{ color: '#E35A4A' }}>DEDUCTIONS</p>
                <div className="space-y-2">
                  {[
                    ['GPF Subscription (12%)', 9456],
                    ['Income Tax (TDS)', 12850],
                    ['Professional Tax', 2500],
                    ['GHMC Staff Welfare', 500],
                    ['LIC Premium', 3200],
                    ['Group Insurance', 120],
                    ['NPS Contribution', 7880],
                  ].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-sm text-gray-700">{label}</span>
                      <span className="text-sm font-semibold text-gray-800">₹{(val as number).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 font-bold">
                    <span className="text-sm" style={{ color: '#E35A4A' }}>Total Deductions</span>
                    <span className="text-sm" style={{ color: '#E35A4A' }}>₹36,506</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-5 flex justify-between items-center" style={{ backgroundColor: '#1A3555' }}>
              <span className="text-sm font-bold text-white tracking-widest uppercase">Net Salary Payable</span>
              <span className="text-2xl font-black" style={{ color: '#E69B30' }}>₹1,19,834</span>
            </div>
          </div>
        </div>

        {showRunModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRunModal(false)}>
            <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Run March 2026 Payroll</h2>
              <p className="text-sm text-gray-500 mb-5">This will process payroll for all 29,340 active employees. Please confirm to proceed.</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5">
                <p className="text-xs font-semibold text-amber-700">⚠ Ensure attendance finalization is complete before running payroll.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowRunModal(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">Cancel</button>
                <button onClick={() => setShowRunModal(false)} className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>Confirm & Run</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
