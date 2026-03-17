'use client'
import React, { useState } from 'react'
import Components from '../components'
import { CheckCircle2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'

type DayType = 'P' | 'A' | 'H' | 'W' | 'OD' | 'L' | 'today' | null

const calendarData: { day: number | null; type: DayType }[] = [
  { day: null, type: null }, { day: null, type: null }, { day: null, type: null }, { day: null, type: null }, { day: null, type: null }, { day: null, type: null }, { day: 1, type: 'P' },
  { day: 2, type: 'P' }, { day: 3, type: 'P' }, { day: 4, type: 'P' }, { day: 5, type: 'P' }, { day: 6, type: 'W' }, { day: 7, type: 'P' }, { day: 8, type: 'L' },
  { day: 9, type: 'P' }, { day: 10, type: 'P' }, { day: 11, type: 'H' }, { day: 12, type: 'P' }, { day: 13, type: 'W' }, { day: 14, type: 'P' }, { day: 15, type: 'P' },
  { day: 16, type: 'today' }, { day: 17, type: null }, { day: 18, type: null }, { day: 19, type: null }, { day: 20, type: null }, { day: 21, type: null }, { day: 22, type: null },
  { day: 23, type: null }, { day: 24, type: null }, { day: 25, type: null }, { day: 26, type: null }, { day: 27, type: null }, { day: 28, type: null }, { day: 29, type: null },
  { day: 30, type: null }, { day: 31, type: null },
]

const dayTypeConfig: Record<NonNullable<DayType>, { bg: string; text: string; label: string }> = {
  P: { bg: 'bg-green-50', text: 'text-green-700', label: 'Present' },
  A: { bg: 'bg-red-50', text: 'text-red-600', label: 'Absent' },
  H: { bg: 'bg-yellow-50', text: 'text-yellow-600', label: 'Holiday' },
  W: { bg: 'bg-gray-100', text: 'text-gray-400', label: 'Weekend' },
  OD: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'On Duty' },
  L: { bg: 'bg-orange-50', text: 'text-orange-600', label: 'Leave' },
  today: { bg: 'bg-white', text: 'text-blue-700', label: 'Today' },
}

export default function Attendance() {
  const [month] = useState('March 2026')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Attendance" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Attendance — {month}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Sri Amrapali K. Das, IAS | Commissioner — Head Office</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">Monthly Calendar View</h2>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <ChevronLeft size={14} className="text-gray-600" />
                </button>
                <span className="text-sm font-semibold text-gray-700">{month}</span>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <ChevronRight size={14} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarData.map((cell, i) => {
                if (!cell.day) return <div key={i} />
                const config = cell.type ? dayTypeConfig[cell.type] : null
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${config ? config.bg : 'bg-gray-50'} ${cell.type === 'today' ? 'border-2 border-blue-500' : ''}`}
                  >
                    <span className={`text-sm font-bold ${config ? config.text : 'text-gray-300'}`}>{cell.day}</span>
                    {cell.type && cell.type !== 'today' && (
                      <span className={`text-xs font-semibold ${config?.text}`}>{cell.type}</span>
                    )}
                    {cell.type === 'today' && <span className="text-xs font-semibold text-blue-600">P</span>}
                  </div>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
              {Object.entries(dayTypeConfig).filter(([k]) => k !== 'today').map(([key, val]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded ${val.bg} border border-gray-200 flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${val.text}`} style={{ fontSize: '8px' }}>{key}</span>
                  </div>
                  <span className="text-xs text-gray-500">{val.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Biometric / Facial Attendance Integration</h2>
              <div className="flex flex-col items-center py-4 mb-4 bg-green-50 rounded-xl">
                <CheckCircle2 size={36} className="text-green-500 mb-2" />
                <p className="font-bold text-gray-800 text-sm">Facial Attendance — SYNCED</p>
                <p className="text-xs text-gray-500 mt-1">Last sync: 16 Mar 2026, 09:15 AM</p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50 mb-4">
                <RefreshCw size={14} /> Force Sync Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Today Present', value: '27,485', color: 'text-green-600' },
                  { label: 'Today Absent', value: '1,245', color: 'text-red-500' },
                  { label: 'On Leave (Approved)', value: '892', color: 'text-amber-600' },
                  { label: 'On Official Duty', value: '378', color: 'text-blue-600' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                    <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">March Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Working Days', value: '21', color: '#1A3555' },
                  { label: 'Present Days', value: '15', color: '#4CAF50' },
                  { label: 'Absent Days', value: '0', color: '#E35A4A' },
                  { label: 'Leave Taken', value: '1', color: '#E69B30' },
                  { label: 'Holidays', value: '2', color: '#8B5CF6' },
                  { label: 'Weekends', value: '4', color: '#9CA3AF' },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-gray-600">{s.label}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Zone-wise Attendance Today</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { zone: 'Charminar Zone', present: 2680, total: 2840 },
              { zone: 'Khairatabad Zone', present: 2510, total: 2650 },
              { zone: 'Serilingampally Zone', present: 2920, total: 3100 },
              { zone: 'Kukatpally Zone', present: 2640, total: 2780 },
              { zone: 'Secunderabad Zone', present: 2790, total: 2950 },
              { zone: 'LB Nagar Zone', present: 2430, total: 2560 },
              { zone: 'Malkajgiri Zone', present: 2260, total: 2380 },
              { zone: 'Uppal Zone', present: 1990, total: 2100 },
            ].map((z) => {
              const pct = Math.round((z.present / z.total) * 100)
              return (
                <div key={z.zone} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">{z.zone}</p>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500">{z.present.toLocaleString()} / {z.total.toLocaleString()}</span>
                    <span className={`font-bold ${pct >= 95 ? 'text-green-600' : pct >= 90 ? 'text-amber-600' : 'text-red-500'}`}>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 95 ? '#4CAF50' : pct >= 90 ? '#E69B30' : '#E35A4A' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
