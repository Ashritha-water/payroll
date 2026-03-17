'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, ChevronRight, ChevronDown, Plus, Filter } from 'lucide-react'
import { Link } from '@/lib'

const employees = [
  { id: 'GHMC-001234', initials: 'SR', name: 'Srinivas Reddy K.', designation: 'Deputy Commissioner', cadre: 'I', zone: 'Charminar / Falaknuma', doj: '15 Mar 2005', basicPay: 78800, status: 'Active' },
  { id: 'GHMC-002456', initials: 'LD', name: 'Lakshmi Devi P.', designation: 'Assistant Engineer', cadre: 'II', zone: 'Khairatabad / Jubilee Hills', doj: '01 Jul 2010', basicPay: 56100, status: 'Active' },
  { id: 'GHMC-003789', initials: 'MI', name: 'Mohammed Irfan S.', designation: 'Senior Clerk', cadre: 'III', zone: 'Serilingampally / Gachibowli', doj: '10 Jan 2012', basicPay: 44900, status: 'Active' },
  { id: 'GHMC-004012', initials: 'PR', name: 'Padma Rani T.', designation: 'Town Planning Officer', cadre: 'I', zone: 'Kukatpally / KPHB Colony', doj: '20 Sep 2008', basicPay: 67700, status: 'Active' },
  { id: 'GHMC-005678', initials: 'RK', name: 'Ramesh Kumar G.', designation: 'Sanitary Worker', cadre: 'IV', zone: 'Secunderabad / Marredpally', doj: '12 Apr 2015', basicPay: 21700, status: 'Active' },
  { id: 'GHMC-006890', initials: 'AK', name: 'Anitha Kumari V.', designation: 'Revenue Inspector', cadre: 'III', zone: 'LB Nagar / Vanasthalipuram', doj: '18 Jun 2013', basicPay: 35400, status: 'Active' },
  { id: 'GHMC-007345', initials: 'VN', name: 'Venkat Narayana B.', designation: 'Superintendent Engineer', cadre: 'I', zone: 'Charminar / Chandrayangutta', doj: '25 Nov 2002', basicPay: 118500, status: 'Active' },
  { id: 'GHMC-008901', initials: 'SP', name: 'Swathi Priya M.', designation: 'Data Entry Operator', cadre: 'III', zone: 'Malkajgiri / Tarnaka', doj: '14 Feb 2018', basicPay: 25500, status: 'Active' },
  { id: 'GHMC-009123', initials: 'BK', name: 'Bhaskar Rao K.', designation: 'Junior Engineer', cadre: 'II', zone: 'Uppal / Nacharam', doj: '05 Aug 2016', basicPay: 38200, status: 'On Leave' },
  { id: 'GHMC-010456', initials: 'SN', name: 'Sunitha Nair R.', designation: 'Health Officer', cadre: 'I', zone: 'Secunderabad / Trimulgherry', doj: '22 Mar 2007', basicPay: 72300, status: 'Active' },
]

const bgColors = ['#1A3555', '#2D6A4F', '#7B2D8B', '#B5451B', '#1565C0', '#6D4C41', '#37474F', '#1A3555']

const zones = ['All Zones', 'Charminar Zone', 'Khairatabad Zone', 'Serilingampally Zone', 'Kukatpally Zone', 'Secunderabad Zone', 'LB Nagar Zone', 'Malkajgiri Zone', 'Uppal Zone']

export default function EmployeeMaster() {
  const [search, setSearch] = useState('')
  const [zone, setZone] = useState('All Zones')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = employees.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase())) &&
    (zone === 'All Zones' || e.zone.includes(zone.replace(' Zone', '')))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Employee Master" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employee Master</h1>
            <p className="text-sm text-gray-500 mt-0.5">{filtered.length} employees shown • 29,340 total in system</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#1A3555' }}
          >
            <Plus size={16} /> Add New Employee
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="relative">
              <select
                value={zone}
                onChange={e => setZone(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer"
              >
                {zones.map(z => <option key={z}>{z}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
              <Filter size={14} /> Filter
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Emp ID', 'Name', 'Designation', 'Cadre', 'Zone / Circle', 'D.O.J', 'Basic Pay', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold cursor-pointer hover:underline" style={{ color: '#1A5276' }}>{emp.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: bgColors[i % bgColors.length] }}>
                        {emp.initials}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{emp.designation}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Class {emp.cadre}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.zone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.doj}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">₹{emp.basicPay.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${emp.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing {filtered.length} of 29,340 employees</p>
            <div className="flex gap-2">
              {[1, 2, 3, '...', 2934].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-sm cursor-pointer transition-colors ${p === 1 ? 'text-white' : 'text-gray-600 hover:bg-gray-100'}`} style={p === 1 ? { backgroundColor: '#1A3555' } : {}}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showAdd && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAdd(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Employee</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Full Name', 'Employee ID', 'Designation', 'Cadre', 'Zone', 'Date of Joining', 'Basic Pay', 'Department'].map(field => (
                  <div key={field}>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{field}</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200" placeholder={`Enter ${field}`} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">Cancel</button>
                <button className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>Save Employee</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
