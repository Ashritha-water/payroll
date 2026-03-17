'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Bell, MessageSquare, Smartphone, Mail, Send, CheckCircle, Clock, AlertCircle, Users, BarChart3, Plus, Eye, Edit, Trash2, Filter, Download } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, AreaChart, Area } from 'recharts'

const channels = [
  { id: 'whatsapp', label: 'WhatsApp Business', icon: MessageSquare, color: '#25D366', bg: 'bg-green-50', sent: 18420, delivered: 17980, read: 15640, optedOut: 284 },
  { id: 'push', label: 'Mobile App Push', icon: Smartphone, color: '#3B82F6', bg: 'bg-blue-50', sent: 12840, delivered: 11920, read: 9820, optedOut: 142 },
  { id: 'sms', label: 'SMS Alerts', icon: MessageSquare, color: '#E69B30', bg: 'bg-amber-50', sent: 8240, delivered: 8180, read: 8180, optedOut: 0 },
  { id: 'email', label: 'Email Notifications', icon: Mail, color: '#8B5CF6', bg: 'bg-purple-50', sent: 24800, delivered: 23840, read: 14200, optedOut: 520 },
]

const recentNotifications = [
  { id: 'N-0841', title: 'IT Declaration Deadline Reminder', channel: 'whatsapp', target: 'All Employees · 29,340', sent: '16 Mar 2026, 09:00 AM', delivered: 28840, read: 24200, status: 'delivered', type: 'Compliance' },
  { id: 'N-0840', title: 'March 2026 Payslip Available', channel: 'push', target: 'All Active · 29,340', sent: '01 Mar 2026, 08:00 AM', delivered: 27820, read: 22480, status: 'delivered', type: 'Payroll' },
  { id: 'N-0839', title: 'Leave Application Approved — EL 5 days', channel: 'whatsapp', target: 'Individual · T. Lakshmi', sent: '14 Mar 2026, 02:30 PM', delivered: 1, read: 1, status: 'delivered', type: 'Leave' },
  { id: 'N-0838', title: 'Holiday Circular — GHMC Foundation Day', channel: 'email', target: 'All Zones · 8 zones', sent: '12 Mar 2026, 11:00 AM', delivered: 23840, read: 14200, status: 'delivered', type: 'General' },
  { id: 'N-0837', title: 'Pending GPF Nomination — Action Required', channel: 'whatsapp', target: 'Targeted · 142 employees', sent: '10 Mar 2026, 10:00 AM', delivered: 140, read: 118, status: 'partial', type: 'GPF' },
  { id: 'N-0836', title: 'Medical Claim Documents Pending Upload', channel: 'push', target: 'Targeted · 38 employees', sent: '08 Mar 2026, 04:00 PM', delivered: 36, read: 29, status: 'delivered', type: 'Medical' },
]

const templates = [
  { name: 'Leave Approval Alert', channel: 'whatsapp', category: 'Leave', variables: ['{{employee_name}}', '{{leave_type}}', '{{from_date}}', '{{to_date}}'], approved: true },
  { name: 'Payslip Ready Notification', channel: 'push', category: 'Payroll', variables: ['{{month}}', '{{net_pay}}', '{{payslip_link}}'], approved: true },
  { name: 'IT Declaration Reminder', channel: 'whatsapp', category: 'Compliance', variables: ['{{employee_name}}', '{{deadline_date}}', '{{pending_amount}}'], approved: true },
  { name: 'Retirement Alert — 60 Days', channel: 'whatsapp', category: 'Retirement', variables: ['{{employee_name}}', '{{dor}}', '{{pending_nocs}}'], approved: false },
  { name: 'Disciplinary Notice Issued', channel: 'email', category: 'Disciplinary', variables: ['{{employee_name}}', '{{case_number}}', '{{charge_date}}'], approved: true },
]

const deliveryTrend = [
  { day: 'Mon', wa: 4200, push: 3100, sms: 1800 },
  { day: 'Tue', wa: 3800, push: 2800, sms: 1400 },
  { day: 'Wed', wa: 5200, push: 3600, sms: 2200 },
  { day: 'Thu', wa: 6800, push: 4200, sms: 2600 },
  { day: 'Fri', wa: 4400, push: 3200, sms: 1600 },
  { day: 'Sat', wa: 1200, push: 800, sms: 400 },
  { day: 'Sun', wa: 600, push: 400, sms: 200 },
]

const channelLabel: Record<string, { color: string; label: string }> = {
  whatsapp: { color: 'bg-green-100 text-green-700', label: 'WhatsApp' },
  push: { color: 'bg-blue-100 text-blue-700', label: 'Push' },
  sms: { color: 'bg-amber-100 text-amber-700', label: 'SMS' },
  email: { color: 'bg-purple-100 text-purple-700', label: 'Email' },
}

const chartConfig = {
  wa: { label: 'WhatsApp', color: '#25D366' },
  push: { label: 'Push', color: '#3B82F6' },
  sms: { label: 'SMS', color: '#E69B30' },
}

export default function NotificationsCenter() {
  const [activeTab, setActiveTab] = useState<'overview' | 'compose' | 'templates' | 'history'>('overview')
  const [selectedChanel, setSelectedChannel] = useState('all')

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="ESS/MSS" />
      <Components.TopBar notifCount={8} />
      <main className="ml-60 pt-14 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications Center</h1>
            <p className="text-sm text-gray-500 mt-0.5">WhatsApp · Mobile App · SMS · Email — Multi-channel employee communication</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Download size={14} /> Export Analytics
            </button>
            <button onClick={() => setActiveTab('compose')} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Plus size={14} /> Compose Notification
            </button>
          </div>
        </div>

        {/* Channel KPIs */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          {channels.map(ch => (
            <div key={ch.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-9 h-9 ${ch.bg} rounded-xl flex items-center justify-center`}>
                  <ch.icon size={17} style={{ color: ch.color }} />
                </div>
                <p className="text-xs font-bold text-gray-700">{ch.label}</p>
              </div>
              <p className="text-xl font-black text-gray-900">{ch.sent.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mb-2">Sent this month</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Delivered</span>
                  <span className="font-bold text-green-600">{Math.round((ch.delivered / ch.sent) * 100)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Read Rate</span>
                  <span className="font-bold" style={{ color: ch.color }}>{Math.round((ch.read / ch.delivered) * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {[{ key: 'overview', label: 'Analytics' }, { key: 'compose', label: 'Compose' }, { key: 'templates', label: 'Templates' }, { key: 'history', label: 'History' }].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${activeTab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`} style={activeTab === t.key ? { backgroundColor: '#1A3555' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="font-bold text-gray-900 mb-3">Daily Notification Volume (This Week)</h2>
              <ChartContainer config={chartConfig} className="h-52">
                <BarChart data={deliveryTrend} barGap={3}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="wa" fill="#25D366" radius={[4, 4, 0, 0]} barSize={18} />
                  <Bar dataKey="push" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={18} />
                  <Bar dataKey="sms" fill="#E69B30" radius={[4, 4, 0, 0]} barSize={18} />
                </BarChart>
              </ChartContainer>
              <div className="flex gap-4 mt-1">
                {[{ label: 'WhatsApp', color: '#25D366' }, { label: 'Push', color: '#3B82F6' }, { label: 'SMS', color: '#E69B30' }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: l.color }} /><span className="text-xs text-gray-500">{l.label}</span></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Recent Notifications Sent</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {recentNotifications.slice(0, 5).map(n => {
                    const cl = channelLabel[n.channel]
                    return (
                      <div key={n.id} className="px-4 py-3">
                        <div className="flex justify-between items-start mb-1.5">
                          <p className="text-sm font-bold text-gray-800">{n.title}</p>
                          <div className="flex gap-1.5 ml-3">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cl.color}`}>{cl.label}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{n.type}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{n.target} · {n.sent}</p>
                        <div className="flex gap-6">
                          <div className="text-xs"><span className="text-gray-400">Delivered: </span><span className="font-bold text-green-600">{n.delivered.toLocaleString()}</span></div>
                          <div className="text-xs"><span className="text-gray-400">Read: </span><span className="font-bold text-blue-600">{n.read.toLocaleString()}</span></div>
                          <div className="text-xs"><span className="text-gray-400">Read Rate: </span><span className="font-bold text-gray-800">{Math.round((n.read / Math.max(n.delivered, 1)) * 100)}%</span></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Mobile App Adoption</h3>
                <div className="space-y-3">
                  {[
                    { label: 'GHMC HRMS App Installed', value: 22480, total: 29340, color: '#3B82F6' },
                    { label: 'Push Notifications Enabled', value: 19840, total: 22480, color: '#10B981' },
                    { label: 'WhatsApp Opt-In', value: 27840, total: 29340, color: '#25D366' },
                    { label: 'Email Verified', value: 24800, total: 29340, color: '#8B5CF6' },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 font-medium">{s.label}</span>
                        <span className="font-black text-gray-800">{Math.round((s.value / s.total) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full" style={{ width: `${(s.value / s.total) * 100}%`, backgroundColor: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-xs font-bold text-green-800 flex items-center gap-1.5 mb-1"><Smartphone size={12} /> GHMC Employee App</p>
                  <p className="text-xs text-green-700">Available on Play Store & App Store. 22,480 active installs. Features: Payslip, Leave, Attendance, GPF, Claims.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compose' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Compose New Notification</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Notification Channel</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['WhatsApp', 'Push', 'SMS', 'Email'].map((ch, i) => (
                      <button key={ch} className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 cursor-pointer transition-all ${i === 0 ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}>
                        {i === 0 ? <MessageSquare size={16} className="text-green-600" /> : i === 1 ? <Smartphone size={16} className="text-blue-600" /> : i === 2 ? <Bell size={16} className="text-amber-500" /> : <Mail size={16} className="text-purple-600" />}
                        <span className="text-xs font-bold text-gray-700">{ch}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Target Audience</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
                      <option>All Employees (29,340)</option>
                      <option>Zone-wise (select zone)</option>
                      <option>Department-wise</option>
                      <option>Individual Employee</option>
                      <option>Designation Group</option>
                      <option>Custom Filter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Use Template</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
                      <option>— Select Template —</option>
                      {templates.filter(t => t.approved).map(t => <option key={t.name}>{t.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Subject / Title</label>
                  <input type="text" placeholder="Notification title or subject..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Message Body</label>
                  <textarea rows={5} placeholder="Compose your message here. Use {{employee_name}}, {{date}} etc. for dynamic fields..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none" />
                  <p className="text-xs text-gray-400 mt-1">WhatsApp: Max 1024 chars · SMS: Max 160 chars per segment</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Schedule (optional)</label>
                    <input type="datetime-local" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Priority</label>
                    <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                    <Send size={13} /> Send Now
                  </button>
                  <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Schedule</button>
                  <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">Preview</button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-bold text-green-800 text-sm flex items-center gap-1.5 mb-2"><MessageSquare size={13} /> WhatsApp Business API</p>
                <div className="space-y-1.5 text-xs text-green-700">
                  <p>✓ Connected to GHMC WhatsApp Business Number</p>
                  <p>✓ 27,840 employees opted-in</p>
                  <p>✓ Template messages pre-approved by Meta</p>
                  <p>✗ Session messages require opt-in response</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-bold text-blue-800 text-sm flex items-center gap-1.5 mb-2"><Smartphone size={13} /> Mobile App Push</p>
                <div className="space-y-1.5 text-xs text-blue-700">
                  <p>✓ FCM (Firebase) integrated</p>
                  <p>✓ 19,840 devices with push enabled</p>
                  <p>✓ Deep linking to module screens</p>
                  <p>✓ Telugु / English bilingual support</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="font-bold text-gray-800 text-sm mb-2">Send Guidelines</p>
                {['WhatsApp messages must use pre-approved templates', 'Bulk SMS limited to 10,000/day via TRAI DLT', 'Avoid sending between 9 PM – 8 AM', 'Always include opt-out instructions'].map((g, i) => (
                  <div key={i} className="flex gap-2 mb-1.5">
                    <span className="text-gray-400 text-xs">{i + 1}.</span>
                    <p className="text-xs text-gray-600">{g}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Notification Templates</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                <Plus size={12} /> New Template
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {templates.map(t => {
                const cl = channelLabel[t.channel]
                return (
                  <div key={t.name} className="px-4 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cl.color}`}>{cl.label}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{t.category}</span>
                        {t.approved ? <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700">Approved</span> : <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">Pending</span>}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {t.variables.map(v => <span key={v} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{v}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-400"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-400"><Edit size={14} /></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Notification History</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Notification ID', 'Title', 'Channel', 'Target', 'Sent On', 'Delivered', 'Read Rate', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentNotifications.map(n => {
                  const cl = channelLabel[n.channel]
                  return (
                    <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-bold text-gray-500">{n.id}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800 max-w-xs truncate">{n.title}</td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cl.color}`}>{cl.label}</span></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{n.target}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{n.sent}</td>
                      <td className="px-4 py-3 text-xs font-bold text-green-600">{n.delivered.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs font-bold text-blue-600">{Math.round((n.read / Math.max(n.delivered, 1)) * 100)}%</td>
                      <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${n.status === 'delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{n.status === 'delivered' ? 'Delivered' : 'Partial'}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
