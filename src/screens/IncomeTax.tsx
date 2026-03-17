'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Download, AlertCircle, CheckCircle, ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/lib'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'

const tdsData = [
  { month: 'Apr', deducted: 14200, projected: 14500 },
  { month: 'May', deducted: 14200, projected: 14500 },
  { month: 'Jun', deducted: 14200, projected: 14500 },
  { month: 'Jul', deducted: 14200, projected: 14800 },
  { month: 'Aug', deducted: 14200, projected: 14800 },
  { month: 'Sep', deducted: 14200, projected: 14800 },
  { month: 'Oct', deducted: 12850, projected: 14800 },
  { month: 'Nov', deducted: 12850, projected: 14800 },
  { month: 'Dec', deducted: 12850, projected: 14800 },
  { month: 'Jan', deducted: 12850, projected: 14800 },
  { month: 'Feb', deducted: 12850, projected: 14800 },
  { month: 'Mar', deducted: 0, projected: 14800 },
]

const chartConfig = {
  deducted: { label: 'TDS Deducted', color: '#1A3555' },
  projected: { label: 'Projected', color: '#E69B30' },
}

const declarations = [
  { section: '80C', description: 'GPF + LIC + NPS', declared: 150000, limit: 150000, verified: true },
  { section: '80CCD(1B)', description: 'NPS Extra Contribution', declared: 50000, limit: 50000, verified: true },
  { section: '80D', description: 'Medical Insurance Premium', declared: 25000, limit: 25000, verified: false },
  { section: '80TTA', description: 'Savings Account Interest', declared: 10000, limit: 10000, verified: true },
  { section: '10(13A)', description: 'HRA Exemption', declared: 255312, limit: null, verified: true },
]

export default function IncomeTax() {
  const [regime, setRegime] = useState<'old' | 'new'>('old')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Income Tax" />
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
            { label: 'Leave', to: '/LeaveManagement' },
            { label: 'Income Tax', to: '/IncomeTax', active: true },
          ].map(link => (
            <Link key={link.label} to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >{link.label}</Link>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Income Tax & Compliance</h1>
            <p className="text-sm text-gray-500 mt-0.5">FY 2025-26 (AY 2026-27) | Sri Amrapali K. Das, IAS</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['old', 'new'] as const).map(r => (
                <button key={r} onClick={() => setRegime(r)} className={`px-3 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition-all capitalize ${regime === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {r} Regime
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Form 16A
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Form 16B
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Income Tax Computation — FY 2025-26</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-8 mb-5">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Income</p>
                <div className="space-y-2">
                  {[
                    ['Gross Salary (Apr-Mar)', '₹18,72,480', false],
                    ['HRA Exemption u/s 10(13A)', '(₹2,55,312)', true],
                    ['Professional Tax u/s 16(iii)', '(₹30,000)', true],
                    ['Standard Deduction u/s 16(ia)', '(₹75,000)', true],
                  ].map(([label, val, deduction]) => (
                    <div key={label as string} className="flex justify-between py-2 border-b border-gray-50">
                      <span className={`text-sm ${(deduction as boolean) ? 'text-blue-600' : 'text-gray-800'}`}>{label}</span>
                      <span className={`text-sm font-semibold ${(deduction as boolean) ? 'text-blue-600' : 'text-gray-900'}`}>{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 pt-3">
                    <span className="text-sm font-bold text-gray-900">Total Taxable Income</span>
                    <span className="text-sm font-black text-gray-900">₹15,12,168</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Deductions (Chapter VI-A)</p>
                <div className="space-y-2">
                  {[
                    ['80C — GPF + LIC + NPS', '₹1,50,000'],
                    ['80CCD(1B) — NPS Extra', '₹50,000'],
                    ['80D — Medical Insurance', '₹25,000'],
                    ['80TTA — Savings Interest', '₹10,000'],
                  ].map(([label, val]) => (
                    <div key={label as string} className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-blue-600">{label}</span>
                      <span className="text-sm font-semibold text-gray-900">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 pt-3">
                    <span className="text-sm font-bold text-gray-900">Net Taxable Income</span>
                    <span className="text-sm font-black text-gray-900">₹12,77,168</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-5 grid grid-cols-3 gap-4" style={{ backgroundColor: '#1A3555' }}>
              <div className="text-center">
                <p className="text-xs text-blue-200 mb-1">Tax on Income</p>
                <p className="text-xl font-black text-white">₹1,72,650</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-xs text-blue-200 mb-1">Surcharge + Cess (4%)</p>
                <p className="text-xl font-black text-white">₹6,906</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-blue-200 mb-1">Total Tax Liability</p>
                <p className="text-2xl font-black" style={{ color: '#E69B30' }}>₹1,79,556</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">TDS Deduction Trend (FY 2025-26)</h2>
            <ChartContainer config={chartConfig} className="h-48">
              <BarChart data={tdsData} barSize={10}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="deducted" fill="#1A3555" radius={[2, 2, 0, 0]} />
                <Bar dataKey="projected" fill="#E69B30" radius={[2, 2, 0, 0]} opacity={0.5} />
              </BarChart>
            </ChartContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1A3555' }} /><span className="text-xs text-gray-500">TDS Deducted</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-400" /><span className="text-xs text-gray-500">Projected</span></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Investment Declarations</h2>
              <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-semibold">Actual Declaration Due</span>
            </div>
            <div className="space-y-2">
              {declarations.map((d) => (
                <div key={d.section} className="flex items-center gap-3 py-2 border-b border-gray-50">
                  <div className="w-16 flex-shrink-0">
                    <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{d.section}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">{d.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-1 bg-gray-100 rounded-full">
                        <div className="h-1 rounded-full bg-blue-500" style={{ width: d.limit ? `${(d.declared / d.limit) * 100}%` : '100%' }} />
                      </div>
                      <span className="text-xs text-gray-600 font-semibold">₹{d.declared.toLocaleString()}</span>
                    </div>
                  </div>
                  {d.verified ? <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> : <AlertCircle size={16} className="text-amber-500 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Tax Liability Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Tax Liability', value: '₹1,79,556', color: '#E35A4A' },
              { label: 'TDS Deducted (Apr-Feb)', value: '₹1,54,200', color: '#1A3555' },
              { label: 'Remaining TDS (Mar)', value: '₹25,356', color: '#E69B30' },
              { label: 'Advance Tax Paid', value: '₹0', color: '#9CA3AF' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">{s.label}</p>
                <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
