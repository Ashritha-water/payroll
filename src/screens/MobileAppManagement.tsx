'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Smartphone, Download, CheckCircle, AlertCircle, Users, Wifi, Battery, BarChart3, Settings, Bell, Shield, RefreshCw, Star, TrendingUp } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, LineChart, Line } from 'recharts'

const platformStats = [
  { platform: 'Android', installs: 18420, active: 16840, version: '3.4.1', color: '#3DDC84', icon: '🤖', rating: 4.2 },
  { platform: 'iOS', installs: 4060, active: 3680, version: '3.4.1', color: '#000000', icon: '🍎', rating: 4.5 },
]

const adoptionTrend = [
  { month: 'Sep', android: 12400, ios: 2800 },
  { month: 'Oct', android: 13800, ios: 3100 },
  { month: 'Nov', android: 15200, ios: 3400 },
  { month: 'Dec', android: 16400, ios: 3600 },
  { month: 'Jan', android: 17200, ios: 3800 },
  { month: 'Feb', android: 17800, ios: 3900 },
  { month: 'Mar', android: 18420, ios: 4060 },
]

const modules = [
  { name: 'Payslip & Salary', icon: '💰', enabled: true, roles: ['All Employees'], usageRate: 94, sessions: 48200 },
  { name: 'Leave Application', icon: '📅', enabled: true, roles: ['All Employees'], usageRate: 88, sessions: 38400 },
  { name: 'Attendance View', icon: '🕐', enabled: true, roles: ['All Employees'], usageRate: 76, sessions: 28800 },
  { name: 'GPF Statement', icon: '🏦', enabled: true, roles: ['All Employees'], usageRate: 62, sessions: 18600 },
  { name: 'Medical Claims', icon: '🏥', enabled: true, roles: ['All Employees'], usageRate: 44, sessions: 12400 },
  { name: 'Pending Approvals', icon: '✅', enabled: true, roles: ['Supervisor', 'HOD', 'DDO'], usageRate: 82, sessions: 8200 },
  { name: 'Zone Report (Read)', icon: '📊', enabled: true, roles: ['Zone Commissioner', 'Admin'], usageRate: 68, sessions: 2400 },
  { name: 'Payroll Run', icon: '⚙️', enabled: false, roles: ['DDO Only'], usageRate: 0, sessions: 0 },
  { name: 'Disciplinary Mgmt', icon: '⚖️', enabled: false, roles: ['HR Admin'], usageRate: 0, sessions: 0 },
  { name: 'IT Declaration', icon: '📋', enabled: true, roles: ['All Employees'], usageRate: 58, sessions: 14800 },
]

const performanceMetrics = [
  { day: 'Mon', crashes: 2, loadTime: 1.8, apiErrors: 8 },
  { day: 'Tue', crashes: 1, loadTime: 1.6, apiErrors: 5 },
  { day: 'Wed', crashes: 3, loadTime: 2.1, apiErrors: 12 },
  { day: 'Thu', crashes: 0, loadTime: 1.5, apiErrors: 4 },
  { day: 'Fri', crashes: 1, loadTime: 1.7, apiErrors: 6 },
  { day: 'Sat', crashes: 0, loadTime: 1.4, apiErrors: 2 },
  { day: 'Sun', crashes: 0, loadTime: 1.3, apiErrors: 1 },
]

const crashes = [
  { version: 'v3.4.1 (Current)', crashes: 6, users: 22480, rate: '0.03%', status: 'stable' },
  { version: 'v3.3.8', crashes: 28, users: 22480, rate: '0.12%', status: 'retired' },
  { version: 'v3.2.4', crashes: 84, users: 22480, rate: '0.37%', status: 'retired' },
]

const versions = [
  { version: 'v3.4.1', platform: 'Android + iOS', releaseDate: '01-Mar-2026', status: 'current', changes: 'WhatsApp deep link, GPF offline view, biometric fix' },
  { version: 'v3.3.8', platform: 'Android + iOS', releaseDate: '15-Jan-2026', status: 'deprecated', changes: 'Payslip download, ESS improvements' },
  { version: 'v3.2.4', platform: 'Android', releaseDate: '01-Dec-2025', status: 'deprecated', changes: 'Performance improvements, HTTPS cert update' },
]

const chartConfig = {
  android: { label: 'Android', color: '#3DDC84' },
  ios: { label: 'iOS', color: '#1A3555' },
  crashes: { label: 'Crashes', color: '#E35A4A' },
  loadTime: { label: 'Load Time (s)', color: '#3B82F6' },
}

export default function MobileAppManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'versions' | 'performance'>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Administration" />
      <Components.TopBar />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mobile App Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">GHMC Employee Self-Service App · Android & iOS · v3.4.1 · 22,480 active users</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <RefreshCw size={14} /> Force Update Push
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Download size={14} /> Push New Version
            </button>
          </div>
        </div>

        {/* Platform KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[
            { label: 'Total App Installs', value: '22,480', sub: 'Android + iOS', color: '#1A3555', bg: 'bg-blue-50' },
            { label: 'Daily Active Users', value: '18,240', sub: '81.1% DAU rate', color: '#10B981', bg: 'bg-green-50' },
            { label: 'Avg App Rating', value: '4.3 ★', sub: 'Play Store + App Store', color: '#E69B30', bg: 'bg-amber-50' },
            { label: 'Crash Rate (7d)', value: '0.03%', sub: 'Industry avg: 0.5%', color: '#8B5CF6', bg: 'bg-purple-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 ${k.bg} rounded-lg flex items-center justify-center mb-2`}>
                <Smartphone size={17} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {platformStats.map(p => (
            <div key={p.platform} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
              <div className="text-4xl">{p.icon}</div>
              <div className="flex-1">
                <p className="font-black text-gray-900 text-lg">{p.platform}</p>
                <p className="text-xs text-gray-400 mb-2">Current Version: {p.version}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-sm font-black text-gray-900">{p.installs.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Installed</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-sm font-black text-green-600">{p.active.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Active</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2 text-center">
                    <p className="text-sm font-black text-amber-600">{p.rating} ★</p>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700">Live</span>
                <button className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 cursor-pointer hover:bg-gray-50">Store Link</button>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[{ key: 'overview', label: 'Adoption Analytics' }, { key: 'modules', label: 'Module Controls' }, { key: 'versions', label: 'Version History' }, { key: 'performance', label: 'App Performance' }].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${activeTab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={activeTab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">App Adoption Growth (Sep 2025 – Mar 2026)</h2>
              <ChartContainer config={chartConfig} className="h-52">
                <AreaChart data={adoptionTrend}>
                  <defs>
                    <linearGradient id="androidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3DDC84" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3DDC84" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="iosGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A3555" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1A3555" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="android" stroke="#3DDC84" fill="url(#androidGrad)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="ios" stroke="#1A3555" fill="url(#iosGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ChartContainer>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-400" /><span className="text-xs text-gray-500">Android</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#1A3555' }} /><span className="text-xs text-gray-500">iOS</span></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Module Usage Rates</h3>
                <div className="space-y-2.5">
                  {modules.filter(m => m.enabled).slice(0, 7).map(m => (
                    <div key={m.name} className="flex items-center gap-3">
                      <span className="text-lg w-6 flex-shrink-0">{m.icon}</span>
                      <span className="text-xs text-gray-600 flex-1">{m.name}</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full flex-shrink-0">
                        <div className="h-2 rounded-full" style={{ width: `${m.usageRate}%`, backgroundColor: m.usageRate >= 80 ? '#10B981' : m.usageRate >= 60 ? '#3B82F6' : '#E69B30' }} />
                      </div>
                      <span className="text-xs font-black text-gray-700 w-8 text-right">{m.usageRate}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Crash Rate by Version</h3>
                <div className="space-y-3">
                  {crashes.map(c => (
                    <div key={c.version} className="p-3 rounded-xl bg-gray-50">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-bold text-gray-800">{c.version}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.status === 'stable' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{c.status === 'stable' ? 'Current' : 'Retired'}</span>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <span className="text-gray-400">Crashes: <strong className="text-red-600">{c.crashes}</strong></span>
                        <span className="text-gray-400">Rate: <strong className="text-gray-700">{c.rate}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Module Access Controls</h2>
              <p className="text-xs text-gray-400">Enable / disable features per role group in the mobile app</p>
            </div>
            <div className="divide-y divide-gray-50">
              {modules.map(m => (
                <div key={m.name} className="px-4 py-4 flex items-center gap-4">
                  <div className="text-xl w-8 text-center flex-shrink-0">{m.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {m.roles.map(r => <span key={r} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{r}</span>)}
                    </div>
                  </div>
                  {m.enabled && (
                    <div className="text-center px-3">
                      <p className="text-sm font-black text-gray-800">{m.sessions.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">sessions/mo</p>
                    </div>
                  )}
                  <div className={`w-10 h-6 rounded-full cursor-pointer relative transition-colors flex-shrink-0 ${m.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${m.enabled ? 'left-5' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'versions' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Version Release History</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                <Download size={12} /> Deploy New Build
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {versions.map(v => (
                <div key={v.version} className="px-4 py-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${v.status === 'current' ? 'bg-green-50' : 'bg-gray-100'}`}>
                    <Smartphone size={16} style={{ color: v.status === 'current' ? '#10B981' : '#9CA3AF' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-black text-gray-900">{v.version}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${v.status === 'current' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{v.status === 'current' ? 'Current' : 'Deprecated'}</span>
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{v.platform}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">Released: {v.releaseDate}</p>
                    <p className="text-xs text-gray-600">{v.changes}</p>
                  </div>
                  {v.status !== 'current' && (
                    <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50 flex-shrink-0">Release Notes</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">App Performance — Last 7 Days</h2>
              <ChartContainer config={chartConfig} className="h-48">
                <LineChart data={performanceMetrics}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="crashes" stroke="#E35A4A" strokeWidth={2.5} dot={{ fill: '#E35A4A', r: 3 }} />
                  <Line type="monotone" dataKey="loadTime" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: '#3B82F6', r: 3 }} />
                </LineChart>
              </ChartContainer>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded bg-red-500" /><span className="text-xs text-gray-500">Crash Count</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 rounded bg-blue-500" /><span className="text-xs text-gray-500">Avg Load Time (s)</span></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Avg Load Time', value: '1.6s', good: true, sub: 'Target: < 3s' },
                { label: 'API Success Rate', value: '99.7%', good: true, sub: '7-day average' },
                { label: 'Weekly Crashes', value: '7', good: true, sub: '0.03% crash rate' },
                { label: 'App Size', value: '24.6 MB', good: true, sub: 'Android APK' },
              ].map(m => (
                <div key={m.label} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center`}>
                  <p className="text-xl font-black text-gray-900">{m.value}</p>
                  <p className="text-xs font-semibold text-gray-600 mt-1">{m.label}</p>
                  <p className="text-xs text-green-600 mt-0.5">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
