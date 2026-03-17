'use client'
import React, { useState } from 'react'
import Components from '../components'
import {
  MapPin, Camera, Smartphone, Wifi, WifiOff, CheckCircle2, AlertTriangle,
  XCircle, RefreshCw, Download, Settings, Shield, Eye, Activity,
  Clock, Users, Zap, Navigation, BarChart3, Filter
} from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const hourlyCheckins = [
  { hour: '6am', count: 1840, facial: 1720, manual: 120 },
  { hour: '7am', count: 4280, facial: 4100, manual: 180 },
  { hour: '8am', count: 6940, facial: 6680, manual: 260 },
  { hour: '9am', count: 9480, facial: 9140, manual: 340 },
  { hour: '10am', count: 3240, facial: 3100, manual: 140 },
  { hour: '11am', count: 840, facial: 790, manual: 50 },
  { hour: '12pm', count: 280, facial: 260, manual: 20 },
  { hour: '1pm', count: 120, facial: 112, manual: 8 },
]

const deviceHealth = [
  { zone: 'Charminar HO', devices: 6, online: 6, model: 'ESSL MB160', lastSync: '09:14 AM', status: 'healthy' },
  { zone: 'Kukatpally Circle', devices: 4, online: 4, model: 'ZKTeco SpeedFace', lastSync: '09:08 AM', status: 'healthy' },
  { zone: 'Serilingampally', devices: 5, online: 4, model: 'ESSL MB160', lastSync: '09:22 AM', status: 'warn' },
  { zone: 'Secunderabad', devices: 4, online: 4, model: 'Realtime RFace', lastSync: '09:11 AM', status: 'healthy' },
  { zone: 'LB Nagar', devices: 4, online: 3, model: 'ZKTeco SpeedFace', lastSync: '08:44 AM', status: 'warn' },
  { zone: 'Malkajgiri', devices: 3, online: 3, model: 'Realtime RFace', lastSync: '09:19 AM', status: 'healthy' },
  { zone: 'Uppal', devices: 3, online: 2, model: 'ESSL MB160', lastSync: '07:52 AM', status: 'critical' },
  { zone: 'Khairatabad', devices: 4, online: 4, model: 'ZKTeco SpeedFace', lastSync: '09:06 AM', status: 'healthy' },
]

const geoZones = [
  { name: 'Charminar Zone HQ', lat: '17.3616° N', lon: '78.4747° E', radius: '150m', staff: 2840, checkedIn: 2614, compliance: 92, status: 'active' },
  { name: 'Kukatpally Zone HQ', lat: '17.4849° N', lon: '78.3996° E', radius: '150m', staff: 2780, checkedIn: 2562, compliance: 92, status: 'active' },
  { name: 'Serilingampally', lat: '17.4940° N', lon: '78.3176° E', radius: '200m', staff: 3100, checkedIn: 2728, compliance: 88, status: 'active' },
  { name: 'Secunderabad Zone HQ', lat: '17.4399° N', lon: '78.4983° E', radius: '150m', staff: 2950, checkedIn: 2714, compliance: 92, status: 'active' },
  { name: 'LB Nagar Zone HQ', lat: '17.3470° N', lon: '78.5510° E', radius: '150m', staff: 2560, checkedIn: 2253, compliance: 88, status: 'warn' },
  { name: 'Field Depots (Sanitation)', lat: 'Multiple', lon: '', radius: '100m each', staff: 8420, checkedIn: 7662, compliance: 91, status: 'active' },
]

const spoofingAlerts = [
  { id: 'GHMC-034512', name: 'K. Venkaiah', zone: 'Uppal', type: 'Proxy Attempt', time: '07:42 AM', detail: 'Face ID mismatch — photo spoofing detected by liveness check', severity: 'high' },
  { id: 'GHMC-019234', name: 'S. Narayana Rao', zone: 'LB Nagar', type: 'Out of Geo-fence', time: '09:05 AM', detail: 'Check-in location 2.8km outside assigned geo-fence boundary', severity: 'high' },
  { id: 'GHMC-045671', name: 'B. Ramadevi', zone: 'Malkajgiri', type: 'Liveness Fail', time: '08:51 AM', detail: 'Failed 3D depth liveness check — attendance not recorded', severity: 'medium' },
  { id: 'GHMC-028904', name: 'T. Krishnamurthy', zone: 'Charminar', type: 'Multiple Attempts', time: '09:17 AM', detail: '5 failed facial recognition attempts — device auto-locked', severity: 'medium' },
  { id: 'GHMC-056123', name: 'V. Suresh Kumar', zone: 'Khairatabad', type: 'GPS Spoofing', time: '08:38 AM', detail: 'Mock GPS location detected via motion sensor cross-check', severity: 'high' },
]

const methodBreakdown = [
  { name: 'Facial (Device)', value: 18420, color: '#1A3555' },
  { name: 'Facial (Mobile App)', value: 6840, color: '#E69B30' },
  { name: 'Biometric (Fingerprint)', value: 1280, color: '#4CAF50' },
  { name: 'Manual Override', value: 945, color: '#9CA3AF' },
]

const weeklyAccuracy = [
  { day: 'Mon', accuracy: 97.2, spoofs: 8 },
  { day: 'Tue', accuracy: 97.8, spoofs: 5 },
  { day: 'Wed', accuracy: 96.9, spoofs: 12 },
  { day: 'Thu', accuracy: 97.4, spoofs: 7 },
  { day: 'Fri', accuracy: 97.1, spoofs: 9 },
  { day: 'Sat', accuracy: 98.2, spoofs: 3 },
  { day: 'Sun', accuracy: 98.6, spoofs: 1 },
]

const chartConfig = {
  facial: { label: 'Facial Recognition', color: '#1A3555' },
  manual: { label: 'Manual Override', color: '#E69B30' },
  count: { label: 'Total Check-ins', color: '#4CAF50' },
  accuracy: { label: 'Recognition Accuracy %', color: '#1A3555' },
  spoofs: { label: 'Spoof Attempts', color: '#E35A4A' },
}

export default function BiometricGeoAttendance() {
  const [tab, setTab] = useState<'live' | 'devices' | 'geo' | 'alerts' | 'config'>('live')

  const onlineDevices = deviceHealth.reduce((sum, d) => sum + d.online, 0)
  const totalDevices = deviceHealth.reduce((sum, d) => sum + d.devices, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Attendance" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Biometric & Geo-Attendance Integration</h1>
            <p className="text-sm text-gray-500 mt-0.5">App-based Facial Recognition · GPS Geo-fence · Device Network · Anti-Spoofing · 16 March 2026</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <RefreshCw size={14} /> Sync All Devices
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1A3555' }}>
              <Download size={14} /> Export Attendance
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-6 gap-3 mb-5">
          {[
            { label: 'Facial Check-ins Today', value: '25,260', sub: '96.6% of those present', color: '#1A3555', icon: Camera },
            { label: 'App-based (Mobile)', value: '6,840', sub: 'GHMC ESS mobile app', color: '#0284C7', icon: Smartphone },
            { label: 'Devices Online', value: `${onlineDevices}/${totalDevices}`, sub: `${Math.round(onlineDevices/totalDevices*100)}% uptime`, color: '#10B981', icon: Wifi },
            { label: 'Geo-compliance', value: '91.8%', sub: 'Within geo-fence boundary', color: '#8B5CF6', icon: Navigation },
            { label: 'Spoof Attempts', value: '5', sub: 'Flagged today — under review', color: '#DC2626', icon: Shield },
            { label: 'Recognition Accuracy', value: '97.4%', sub: '7-day rolling average', color: '#E69B30', icon: Eye },
          ].map((k) => {
            const Icon = k.icon
            return (
              <div key={k.label} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={14} style={{ color: k.color }} />
                  <p className="text-xs text-gray-400 leading-tight">{k.label}</p>
                </div>
                <p className="text-lg font-black" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[
            { key: 'live', label: 'Live Dashboard' },
            { key: 'devices', label: 'Device Health' },
            { key: 'geo', label: 'Geo-fence Zones' },
            { key: 'alerts', label: 'Spoof Alerts' },
            { key: 'config', label: 'Configuration' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Live Dashboard Tab */}
        {tab === 'live' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Hourly Check-in Distribution — Today</h2>
                <ChartContainer config={chartConfig} className="h-52">
                  <BarChart data={hourlyCheckins} barSize={22}>
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="facial" fill="#1A3555" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="manual" fill="#E69B30" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
                <div className="flex gap-5 mt-2">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{ backgroundColor: '#1A3555' }} /><span className="text-xs text-gray-500">Facial Recognition</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded" style={{ backgroundColor: '#E69B30' }} /><span className="text-xs text-gray-500">Manual Override</span></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Check-in Method Breakdown</h2>
                <div className="flex justify-center mb-4">
                  <PieChart width={140} height={140}>
                    <Pie data={methodBreakdown} cx={66} cy={66} innerRadius={36} outerRadius={62} dataKey="value" strokeWidth={0}>
                      {methodBreakdown.map((_, i) => <Cell key={i} fill={_.color} />)}
                    </Pie>
                  </PieChart>
                </div>
                <div className="space-y-2">
                  {methodBreakdown.map((m) => (
                    <div key={m.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                        <span className="text-xs text-gray-600">{m.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-800">{m.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center">
                    Facial recognition: <span className="text-green-600 font-bold">92.8%</span> of total check-ins
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">7-Day Recognition Accuracy Trend</h2>
                <ChartContainer config={chartConfig} className="h-44">
                  <LineChart data={weeklyAccuracy}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis domain={[95, 100]} hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="accuracy" stroke="#1A3555" strokeWidth={2.5} dot={{ fill: '#1A3555', r: 4 }} />
                  </LineChart>
                </ChartContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Zone-wise Facial Compliance — Today</h2>
                <div className="space-y-2.5">
                  {[
                    { zone: 'Secunderabad', facial: 2680, total: 2790, pct: 96.1 },
                    { zone: 'Kukatpally', facial: 2496, total: 2640, pct: 94.5 },
                    { zone: 'Khairatabad', facial: 2360, total: 2510, pct: 94.0 },
                    { zone: 'Charminar', facial: 2492, total: 2680, pct: 93.0 },
                    { zone: 'Serilingampally', fiscal: 2692, total: 2920, pct: 92.2 },
                    { zone: 'LB Nagar', facial: 2214, total: 2430, pct: 91.1 },
                    { zone: 'Malkajgiri', facial: 2034, total: 2260, pct: 90.0 },
                    { zone: 'Uppal', facial: 1751, total: 1990, pct: 88.0 },
                  ].map((z) => (
                    <div key={z.zone} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-28 flex-shrink-0">{z.zone}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full transition-all" style={{ width: `${z.pct}%`, backgroundColor: z.pct >= 95 ? '#4CAF50' : z.pct >= 90 ? '#E69B30' : '#E35A4A' }} />
                      </div>
                      <span className="text-xs font-black w-10 text-right" style={{ color: z.pct >= 95 ? '#4CAF50' : z.pct >= 90 ? '#E69B30' : '#E35A4A' }}>{z.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Feed Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-900">Live Facial Recognition Feed</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-600">LIVE</span>
                  <span className="text-xs text-gray-400">— Updates every 30 seconds</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { emp: 'GHMC-041234', name: 'K. Venkateswara Rao', zone: 'Sec\'bad HQ', time: '09:31:04', confidence: 99.2, status: 'success', location: 'Main Entrance' },
                  { emp: 'GHMC-028901', name: 'P. Sunitha Devi', zone: 'Charminar HQ', time: '09:31:02', confidence: 97.8, status: 'success', location: 'Side Gate' },
                  { emp: 'GHMC-067234', name: 'B. Ravi Shankar', zone: 'Kukatpally', time: '09:30:58', confidence: 96.4, status: 'success', location: 'Main Entrance' },
                  { emp: 'GHMC-034512', name: 'K. Venkaiah', zone: 'Uppal', time: '09:30:45', confidence: 0, status: 'spoof', location: 'Camera-1' },
                  { emp: 'GHMC-012678', name: 'T. Narasimha Rao', zone: 'LB Nagar', time: '09:30:39', confidence: 94.1, status: 'success', location: 'Mobile App' },
                ].map((f, i) => (
                  <div key={i} className={`rounded-xl p-3 border ${f.status === 'spoof' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 text-white font-black text-sm mx-auto ${f.status === 'spoof' ? 'bg-red-500' : 'bg-green-500'}`}>
                      {f.status === 'spoof' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                    </div>
                    <p className="text-xs font-bold text-gray-800 text-center mb-0.5 truncate">{f.name}</p>
                    <p className="text-xs text-gray-400 text-center">{f.zone}</p>
                    <div className="mt-2 pt-2 border-t border-gray-100/50">
                      <p className="text-xs text-gray-500 text-center">{f.time}</p>
                      {f.status === 'spoof' ? (
                        <p className="text-xs font-bold text-red-600 text-center mt-0.5">SPOOF BLOCKED</p>
                      ) : (
                        <p className="text-xs font-bold text-green-600 text-center mt-0.5">{f.confidence}% conf.</p>
                      )}
                      <p className="text-xs text-gray-400 text-center">{f.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Device Health Tab */}
        {tab === 'devices' && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3 mb-2">
              {[
                { label: 'Total Devices', value: totalDevices, color: '#1A3555' },
                { label: 'Online', value: onlineDevices, color: '#10B981' },
                { label: 'Offline / Fault', value: totalDevices - onlineDevices, color: '#E35A4A' },
                { label: 'Mobile App Nodes', value: '29,340', color: '#0284C7' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400">{s.label}</p>
                  <p className="text-2xl font-black mt-1" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Device Network — Zone-wise Status</h2>
                <button className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                  <RefreshCw size={12} /> Ping All
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Zone / Location', 'Device Model', 'Total Devices', 'Online', 'Last Sync', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {deviceHealth.map((d, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{d.zone}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{d.model}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-700">{d.devices}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-black" style={{ color: d.online === d.devices ? '#10B981' : d.online >= d.devices - 1 ? '#E69B30' : '#E35A4A' }}>
                          {d.online}/{d.devices}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{d.lastSync}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.status === 'healthy' ? 'bg-green-50 text-green-700' : d.status === 'warn' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                          {d.status === 'healthy' ? '● Healthy' : d.status === 'warn' ? '● Warning' : '● Critical'}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">Ping</button>
                        <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">Logs</button>
                        {d.status !== 'healthy' && (
                          <button className="text-xs px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg cursor-pointer hover:bg-amber-100">Restart</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Mobile App Attendance — Device Stats</h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Registered Devices', value: '29,340', sub: 'All enrolled employees', color: '#1A3555' },
                  { label: 'Active Today', value: '24,180', sub: '82.4% DAU — app-attendance', color: '#10B981' },
                  { label: 'App Version (Latest)', value: 'v3.4.1', sub: '91.2% on latest', color: '#0284C7' },
                  { label: 'Root/Jailbreak Blocked', value: '14', sub: 'Devices blocked today', color: '#E35A4A' },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Geo-fence Zones Tab */}
        {tab === 'geo' && (
          <div className="space-y-4">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Geo-fence Zone Map — GHMC 8 Zones</h2>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50">+ Add Zone</button>
                  <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50 flex items-center gap-1"><Settings size={12} /> Configure</button>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-blue-50 to-slate-100 h-72 overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '28px 28px' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-gray-400 font-medium">Interactive Map — Hyderabad City</p>
                </div>
                {[
                  { name: 'Charminar', x: '48%', y: '62%', color: '#1A3555', compliance: 93 },
                  { name: 'Khairatabad', x: '38%', y: '48%', color: '#E69B30', compliance: 94 },
                  { name: 'Secunderabad', x: '52%', y: '35%', color: '#10B981', compliance: 92 },
                  { name: 'Kukatpally', x: '30%', y: '38%', color: '#8B5CF6', compliance: 92 },
                  { name: 'Serilingampally', x: '22%', y: '42%', color: '#0284C7', compliance: 88 },
                  { name: 'LB Nagar', x: '62%', y: '68%', color: '#DC2626', compliance: 88 },
                  { name: 'Malkajgiri', x: '55%', y: '28%', color: '#E69B30', compliance: 90 },
                  { name: 'Uppal', x: '68%', y: '48%', color: '#DC2626', compliance: 88 },
                ].map((z) => (
                  <div key={z.name} className="absolute cursor-pointer group" style={{ left: z.x, top: z.y, transform: 'translate(-50%,-50%)' }}>
                    <div className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110" style={{ backgroundColor: z.color }}>
                      <MapPin size={14} color="white" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-11 whitespace-nowrap text-xs font-bold text-gray-700 bg-white/90 px-1.5 py-0.5 rounded shadow-sm pointer-events-none">
                      {z.name} · {z.compliance}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Configured Geo-fence Zones</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Zone / Location', 'Coordinates', 'Radius', 'Staff Assigned', 'Checked In', 'Geo-Compliance', 'Status'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {geoZones.map((z, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin size={13} style={{ color: '#1A3555' }} /> {z.name}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-500">{z.lat}{z.lon ? `, ${z.lon}` : ''}</td>
                      <td className="px-4 py-3 text-xs font-bold text-gray-700">{z.radius}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{z.staff.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600">{z.checkedIn.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                            <div className="h-1.5 rounded-full" style={{ width: `${z.compliance}%`, backgroundColor: z.compliance >= 92 ? '#10B981' : '#E69B30' }} />
                          </div>
                          <span className="text-xs font-black" style={{ color: z.compliance >= 92 ? '#10B981' : '#E69B30' }}>{z.compliance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${z.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {z.status === 'active' ? '● Active' : '● Warning'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-100 bg-blue-50/30">
                <p className="text-xs text-gray-500">
                  <span className="font-bold text-gray-700">Note:</span> Geo-fence tolerance — 50m buffer applied for GPS drift. Field staff carrying government-issued mobile devices. Sanitation workers: 100m radius per depot/ward boundary configured individually (2,240 micro-fences).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Spoof Alerts Tab */}
        {tab === 'alerts' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mb-2">
              {[
                { label: 'Spoof Attempts Today', value: '5', color: '#DC2626', bg: 'bg-red-50' },
                { label: 'Geo-fence Violations', value: '12', color: '#E69B30', bg: 'bg-amber-50' },
                { label: 'Auto-blocked (Device)', value: '3', color: '#8B5CF6', bg: 'bg-purple-50' },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Anti-spoofing Alerts — 16 March 2026</h2>
                <span className="text-xs font-bold bg-red-50 text-red-700 px-2 py-1 rounded-full">5 flagged</span>
              </div>
              <div className="divide-y divide-gray-50">
                {spoofingAlerts.map((a, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${a.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'}`}>
                          <AlertTriangle size={16} style={{ color: a.severity === 'high' ? '#DC2626' : '#D97706' }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-black text-gray-900">{a.name}</span>
                            <span className="text-xs text-gray-400">{a.id}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.severity === 'high' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                              {a.severity === 'high' ? '🔴 HIGH' : '🟡 MEDIUM'}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-gray-700 mb-0.5">{a.type} — {a.zone} Zone · {a.time}</p>
                          <p className="text-xs text-gray-500">{a.detail}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="px-3 py-1.5 text-xs font-bold border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View Evidence</button>
                        <button className="px-3 py-1.5 text-xs font-bold bg-red-50 border border-red-200 text-red-700 rounded-lg cursor-pointer hover:bg-red-100">Issue Notice</button>
                        <button className="px-3 py-1.5 text-xs font-bold bg-green-50 border border-green-200 text-green-700 rounded-lg cursor-pointer hover:bg-green-100">Dismiss</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Anti-spoofing Engine — Deployed Checks</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { check: '3D Liveness Detection', desc: 'Detects 2D photo/video replay attacks. Infrared face mapping on ZKTeco/ESSL devices.', enabled: true },
                  { check: 'Blink & Motion Check', desc: 'Random blink/nod prompt during facial scan. Mobile app camera.', enabled: true },
                  { check: 'GPS Cross-validation', desc: 'IP geolocation vs GPS vs WiFi triangulation triple-check.', enabled: true },
                  { check: 'Mock GPS Detection', desc: 'App detects Developer Options + mock location apps. Blocks check-in.', enabled: true },
                  { check: 'Root/Jailbreak Detection', desc: 'Blocks attendance from rooted devices. 14 blocked today.', enabled: true },
                  { check: 'Face Confidence Threshold', desc: 'Minimum 88% confidence required. Below threshold → fallback to OTP.', enabled: true },
                ].map((c) => (
                  <div key={c.check} className="p-3.5 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-1.5">
                      <span className="text-xs font-black text-gray-800">{c.check}</span>
                      <span className="text-xs font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded ml-2 flex-shrink-0">ON</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Configuration Tab */}
        {tab === 'config' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Facial Recognition Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Minimum Confidence Threshold', type: 'slider', value: '88%', desc: 'Below this score → OTP fallback' },
                  { label: 'Liveness Detection Mode', type: 'select', value: '3D + Blink', desc: 'Hardware 3D where available, blink-test on mobile' },
                  { label: 'Max Recognition Attempts', type: 'select', value: '3 attempts', desc: 'After 3 fails → device lock + alert' },
                  { label: 'Template Update Frequency', type: 'select', value: 'Every 90 days', desc: 'Auto re-register face template for aging accuracy' },
                  { label: 'Low-light Mode', type: 'toggle', value: true, desc: 'Infrared mode at < 50 lux — field/early morning shifts' },
                  { label: 'Mask Detection Mode', type: 'toggle', value: true, desc: 'Upper-half face scan for mask-wearing field staff' },
                ].map((s, i) => (
                  <div key={i} className="flex items-start justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                    </div>
                    {s.type === 'toggle' ? (
                      <div className={`w-10 h-6 rounded-full cursor-pointer relative flex-shrink-0 ml-3 ${s.value ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${s.value ? 'left-5' : 'left-1'}`} />
                      </div>
                    ) : (
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-700 rounded-lg ml-3 flex-shrink-0">{s.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Geo-fence Configuration</h2>
                <div className="space-y-3">
                  {[
                    { param: 'GPS Accuracy Required', value: '≤ 20m' },
                    { param: 'Geo-fence Buffer (Tolerance)', value: '50m' },
                    { param: 'Sanitation Ward Micro-radius', value: '100m per ward depot' },
                    { param: 'HQ / Office Zones', value: '150m radius' },
                    { param: 'Out-of-zone Alert Trigger', value: '> 500m from boundary' },
                    { param: 'GPS Refresh Rate (App)', value: 'Every 10 seconds' },
                    { param: 'OD / On-duty Override', value: 'Supervisor approval required' },
                  ].map((p, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-600">{p.param}</span>
                      <span className="text-xs font-bold text-gray-800">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Integration Endpoints</h2>
                <div className="space-y-2">
                  {[
                    { system: 'ZKTeco Cloud Push SDK', status: 'Connected', color: 'green' },
                    { system: 'ESSL e-Time Track Suite', status: 'Connected', color: 'green' },
                    { system: 'GHMC ESS Mobile App API', status: 'Connected', color: 'green' },
                    { system: 'HRMS Attendance Module', status: 'Synced (Real-time)', color: 'green' },
                    { system: 'IFMS Pay Bill Interface', status: 'Synced (Monthly)', color: 'green' },
                    { system: 'TS State Biometric Grid', status: 'Pending Integration', color: 'amber' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                      <span className="text-xs font-semibold text-gray-700">{s.system}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.color === 'green' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{s.status}</span>
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
