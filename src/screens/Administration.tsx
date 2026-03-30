'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Settings, Users, Shield, Activity, Database, Bell, Key, ToggleLeft, ToggleRight, CheckCircle, AlertCircle, Clock, Search, Plus, Edit, Trash2, Server, FileText } from 'lucide-react'

const adminUsers = [
  { name: 'Sri Amrapali K. Das', role: 'Commissioner', empId: 'EMP-0001', email: 'commissioner@ghmc.gov.in', access: 'Super Admin', status: 'active', lastLogin: 'Today, 9:12 AM' },
  { name: 'B. Murali Krishna', role: 'HR Administrator', empId: 'EMP-0034', email: 'hradmin@ghmc.gov.in', access: 'HR Admin', status: 'active', lastLogin: 'Today, 8:45 AM' },
  { name: 'K. S. Ramaiah', role: 'Zonal Commissioner, LB Nagar', empId: 'EMP-0056', email: 'zc.lbn@ghmc.gov.in', access: 'Zonal Admin', status: 'active', lastLogin: 'Mar 15, 2026' },
  { name: 'V. Padma Priya', role: 'IT Manager', empId: 'EMP-0089', email: 'it@ghmc.gov.in', access: 'IT Admin', status: 'inactive', lastLogin: 'Mar 10, 2026' },
  { name: 'M. Srinivas Reddy', role: 'Finance Officer', empId: 'EMP-0112', email: 'finance@ghmc.gov.in', access: 'Payroll Admin', status: 'active', lastLogin: 'Mar 14, 2026' },
]

const auditLogs = [
  { user: 'B. Murali Krishna', action: 'Modified payroll config — DA rate updated to 46%', module: 'Payroll', time: 'Mar 16, 2026 10:22 AM', type: 'update' },
  { user: 'Sri Amrapali K. Das', action: 'Approved bulk leave — Holi holiday (Mar 14)', module: 'Leave', time: 'Mar 13, 2026 9:00 AM', type: 'approve' },
  { user: 'V. Padma Priya', action: 'New biometric device added — Kukatpally Zone Office', module: 'Attendance', time: 'Mar 12, 2026 3:45 PM', type: 'create' },
  { user: 'B. Murali Krishna', action: 'EMP4512 record updated — basic pay correction', module: 'Employee', time: 'Mar 12, 2026 11:30 AM', type: 'update' },
  { user: 'System', action: 'Automated payroll run — Feb 2026 processed', module: 'Payroll', time: 'Mar 1, 2026 12:00 AM', type: 'system' },
  { user: 'M. Srinivas Reddy', action: 'GPF statement generated for FY 2025-26', module: 'Reports', time: 'Feb 28, 2026 5:15 PM', type: 'create' },
]

const modules = [
  { name: 'Employee Master', enabled: true, lastSync: 'Real-time' },
  { name: 'Payroll Engine', enabled: true, lastSync: 'Mar 1, 2026' },
  { name: 'Leave Management', enabled: true, lastSync: 'Real-time' },
  { name: 'Attendance (Biometric)', enabled: true, lastSync: '5 min ago' },
  { name: 'Income Tax Module', enabled: true, lastSync: 'Monthly' },
  { name: 'Terminal Benefits', enabled: true, lastSync: 'On-demand' },
  { name: 'Claims & Travel', enabled: true, lastSync: 'On-demand' },
  { name: 'AI Analytics Engine', enabled: true, lastSync: 'Hourly' },
  { name: 'ESS / MSS Portal', enabled: true, lastSync: 'Real-time' },
  { name: 'SMS/Email Notifications', enabled: false, lastSync: 'Disabled' },
]

const biometricDevices = [
  { location: 'HQ — Main Entrance', id: 'BIO-001', status: 'online', lastPing: '2 min ago', records: '29,340' },
  { location: 'Kukatpally Zone Office', id: 'BIO-002', status: 'online', lastPing: '3 min ago', records: '4,820' },
  { location: 'LB Nagar Zone Office', id: 'BIO-003', status: 'online', lastPing: '1 min ago', records: '3,940' },
  { location: 'Charminar Zone Office', id: 'BIO-004', status: 'offline', lastPing: '48 min ago', records: '3,210' },
  { location: 'Secunderabad Zone Office', id: 'BIO-005', status: 'online', lastPing: '4 min ago', records: '4,160' },
]

const policies = [
  { name: 'GHMC Service Regulations 2023', type: 'PDF', updated: 'Nov 2023' },
  { name: 'TA/DA Rules — Revised 2025', type: 'PDF', updated: 'Apr 2025' },
  { name: 'Leave Rules — GHMC', type: 'PDF', updated: 'Jan 2024' },
  { name: 'Conduct & Discipline Rules', type: 'PDF', updated: 'Mar 2022' },
]

const logTypeConfig: Record<string, string> = {
  update: 'text-amber-700 bg-amber-50',
  approve: 'text-green-700 bg-green-50',
  create: 'text-blue-700 bg-blue-50',
  system: 'text-gray-600 bg-gray-100',
}

export default function Administration() {
  const [activeTab, setActiveTab] = useState<'users' | 'modules' | 'audit' | 'devices' | 'policies'>('users')
  const [moduleState, setModuleState] = useState<Record<string, boolean>>(Object.fromEntries(modules.map(m => [m.name, m.enabled])))

  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email:'',
    role: '',
    access: '',
    status: 'active',
  })

  const tabs = [
    { key: 'users', label: 'User Management', icon: Users },
    { key: 'modules', label: 'Module Config', icon: Settings },
    { key: 'audit', label: 'Audit Log', icon: Activity },
    { key: 'devices', label: 'Biometric Devices', icon: Server },
    { key: 'policies', label: 'HR Policies', icon: FileText },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Administration" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-sm text-gray-500 mt-0.5">System configuration, access control & audit management</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-bold text-green-700">All Systems Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Admin Users', value: '5', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'Active Modules', value: '9/10', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Biometric Devices', value: '5', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'System Uptime', value: '99.7%', color: '#8B5CF6', bg: 'bg-purple-50' },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${activeTab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={activeTab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              <t.icon size={14} />{t.label}
            </button>
          ))}
        </div>

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Admin User Management</h2>
              <button 
                onClick={() => setShowAddUser(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                <Plus size={14} /> Add User
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {['Employee', 'Role', 'Access Level', 'Status', 'Last Login', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {adminUsers.map((u) => (
                  <tr key={u.empId} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0" style={{ backgroundColor: '#1A3555' }}>
                          {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{u.role}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#EEF2FF', color: '#4338CA' }}>{u.access}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{u.lastLogin}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-blue-600 cursor-pointer"><Edit size={14} /></button>
                        <button className="text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 size={14} /></button>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><Key size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Module Configuration & Status</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {modules.map((m) => (
                <div key={m.name} className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-400">Sync: {m.lastSync}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${moduleState[m.name] ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`text-xs font-semibold ${moduleState[m.name] ? 'text-green-600' : 'text-gray-400'}`}>{moduleState[m.name] ? 'Active' : 'Disabled'}</span>
                  <button onClick={() => setModuleState(prev => ({ ...prev, [m.name]: !prev[m.name] }))} className="cursor-pointer transition-colors">
                    {moduleState[m.name]
                      ? <ToggleRight size={28} style={{ color: '#1A3555' }} />
                      : <ToggleLeft size={28} className="text-gray-300" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">System Audit Log</h2>
              <span className="text-xs text-gray-400">Showing last 30 days</span>
            </div>
            <div className="divide-y divide-gray-50">
              {auditLogs.map((l, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className={`mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${logTypeConfig[l.type]}`}>{l.type}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{l.action}</p>
                    <div className="flex gap-3 mt-0.5">
                      <span className="text-xs text-gray-400">By: <span className="font-semibold text-gray-600">{l.user}</span></span>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-gray-400">Module: {l.module}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{l.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Biometric Device Management</h2>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                <Plus size={14} /> Add Device
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {biometricDevices.map((d) => (
                <div key={d.id} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.status === 'online' ? 'bg-green-50' : 'bg-red-50'}`}>
                    <Server size={18} style={{ color: d.status === 'online' ? '#10B981' : '#E35A4A' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{d.location}</p>
                    <p className="text-xs text-gray-400">{d.id} · Last ping: {d.lastPing}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-700">{d.records} records</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${d.status === 'online' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{d.status}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><Settings size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">HR Policy Documents</h2>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                  <Plus size={14} /> Upload Policy
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {policies.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50/50 transition-colors group">
                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={16} className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800">{p.name}</p>
                      <p className="text-xs text-gray-400">Last updated: {p.updated}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg text-white text-xs font-semibold cursor-pointer transition-opacity" style={{ backgroundColor: '#1A3555' }}>Download</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">System Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Auto Payroll on 1st of Month', desc: 'Automatically run payroll on the 1st', on: true },
                  { label: 'Email Notifications', desc: 'Send email for approvals & alerts', on: true },
                  { label: 'SMS Alerts', desc: 'SMS for salary credit & leaves', on: false },
                  { label: 'Biometric Force Sync', desc: 'Force sync every 5 minutes', on: true },
                  { label: 'ITR Auto-prefill', desc: 'Prefill ITR from Form 16 data', on: true },
                  { label: 'Dual Approval for Payroll', desc: 'Require 2 admins to process payroll', on: false },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-3 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                    <button className="cursor-pointer">
                      {s.on
                        ? <ToggleRight size={26} style={{ color: '#1A3555' }} />
                        : <ToggleLeft size={26} className="text-gray-300" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showAddUser && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[400px] p-6">

              <h2 className="text-lg font-bold text-gray-900 mb-4">Add New User</h2>

              <div className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="Enter Email"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g. HR Administrator"
                  />
                </div>

                {/* Access Level */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Access Level
                  </label>
                  <input
                    type="text"
                    value={newUser.access}
                    onChange={(e) => setNewUser({ ...newUser, access: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g. Super Admin"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 text-sm rounded-lg border cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    console.log(newUser) // later replace with API call
                    setShowAddUser(false)
                  }}
                  className="px-4 py-2 text-sm text-white rounded-lg cursor-pointer"
                  style={{ backgroundColor: '#1A3555' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
