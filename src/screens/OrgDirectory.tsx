'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Search, Phone, Mail, MapPin, Users, ChevronDown, Download, Building2 } from 'lucide-react'

const commissioner = [
  { sno: 1, name: 'Sri R.V.Karnan, IAS', designation: 'Commissioner', contact: '040-23224564 / Fax: +91 40-23260050', email: 'commissioner-ghmc@gov.in' },
]

const additionalCommissioners = [
  { sno: 1, name: 'Dr. Priyanka Ala, IAS', designation: 'Additional Commissioner', department: 'Health', contact: '—', email: '—' },
  { sno: 2, name: 'Dr. Priyanka Ala, IAS', designation: 'Additional Commissioner', department: 'Revenue', contact: '040 23260052', email: '—' },
  { sno: 3, name: 'Smt K. Chandrakala', designation: 'Additional Commissioner', department: 'Elections', contact: '—', email: '—' },
  { sno: 4, name: 'Smt. K. Alivelu Mangatayaru', designation: 'Additional Commissioner', department: 'Sports, UCD', contact: '—', email: '—' },
  { sno: 5, name: 'Smt. V. Subhadra Devi, IFS', designation: 'Additional Commissioner', department: 'Urban Bio Diversity', contact: '—', email: 'ac.ub.ghmc@gmail.com' },
  { sno: 6, name: 'Sri K. Sathyanarayana', designation: 'Additional Commissioner', department: 'Administration', contact: '040 23220172', email: '—' },
  { sno: 7, name: 'Sri N. Ravi Kiran', designation: 'Additional Commissioner', department: 'SWM-HIMWS & Sanitation', contact: '233220172', email: '—' },
  { sno: 8, name: 'Sri. Manda Makarandu, IAS', designation: 'Additional Commissioner', department: 'Finance, Information Technology (IT)', contact: '040 23260052', email: '—' },
]

const zonalCommissioners = [
  { sno: 1, name: 'Smt. K. Chandrakala', designation: 'Zonal Commissioner', zone: 'Shamshabad', contact: '—', email: 'zcshamshabad.ghmc@gmail.com' },
  { sno: 2, name: 'Sri G. Mukunda Reddy', designation: 'Zonal Commissioner', zone: 'Golconda', contact: '—', email: 'zcgolcondaghmc@gmail.com' },
  { sno: 3, name: 'Sri S. Srinivas Reddy', designation: 'Zonal Commissioner', zone: 'Charminar', contact: '—', email: 'zcs.ghmc@gmail.com' },
  { sno: 4, name: 'Ms. Priyanka Ala, IAS', designation: 'Zonal Commissioner', zone: 'Khairathabad', contact: '—', email: 'zcc.ghmc@gmail.com' },
  { sno: 5, name: 'Smt. K. A. Mangatayaru', designation: 'Zonal Commissioner', zone: 'Secunderabad', contact: '—', email: 'zc.north.ghmc@gmail.com' },
  { sno: 6, name: 'Sri. Manda Makarandu, IAS', designation: 'Zonal Commissioner', zone: 'Rajendranagar', contact: '—', email: 'zcrajendranagarghmc@gmail.com' },
]

const deputyCommissioners = [
  { sno: 1, name: 'D. Jagan', zone: 'Golconda', circle: 'Golconda', contact: '9154032866', email: 'ghmc.dc32@gmail.com' },
  { sno: 2, name: 'A. Sujatha', zone: 'Khairathabad', circle: 'Ameerpet', contact: '8125967026', email: 'dc39ameerpet.ghmc@gmail.com' },
  { sno: 3, name: 'A. Suresh', zone: 'Khairathabad', circle: 'Yousufguda', contact: '9398430105', email: 'dc10c.ghmc@gmail.com' },
  { sno: 4, name: 'L. Saritha', zone: 'Charminar', circle: 'Charminar', contact: '7288880307 / 9247832030', email: 'dc5a.ghmc@gmail.com' },
  { sno: 5, name: 'M.K.I. Ali', zone: 'Charminar', circle: 'Malakpet', contact: '9154172353', email: 'dc4a.ghmc@gmail.com' },
  { sno: 6, name: 'MNR Jyoti', zone: 'Secunderabad', circle: 'Tarnaka', contact: '7995307809', email: 'dc43.ghmc@gmail.com' },
  { sno: 7, name: 'N. Shanker', zone: 'Khairathabad', circle: 'Jubilee Hills', contact: '8297531555', email: 'dc10b.ghmc@gmail.com' },
  { sno: 8, name: 'N. Vanisri', zone: 'Khairathabad', circle: 'Borabanda', contact: '9154686544', email: 'dc37borabanda.ghmc@gmail.com' },
  { sno: 9, name: 'A. Nagamani', zone: 'Rajendranagar', circle: 'Jangammet', contact: '9063421156', email: 'dc24.ghmc@gmail.com' },
  { sno: 10, name: 'V. Sammaiah', zone: 'Rajendranagar', circle: 'Attapur', contact: '9154931446', email: 'dc20.ghmc@gmail.com' },
  { sno: 11, name: 'V. Surender', zone: 'Rajendranagar', circle: 'Chandrayangutta', contact: '9000036998', email: 'dc4c.ghmc@gmail.com' },
  { sno: 12, name: 'Mangatayaru', zone: 'Charminar', circle: 'Santosh Nagar', contact: '9989930422', email: 'dc4b.ghmc@gmail.com' },
  { sno: 13, name: 'T. Dasharath', zone: 'Golconda', circle: 'Mehdipatnam', contact: '9154931426', email: 'dc7a.ghmc@gmail.com' },
  { sno: 14, name: 'B. Sreenivasu', zone: 'Khairathabad', circle: 'Khairatabad', contact: '7032164595', email: 'dc10a.ghmc@gmail.com' },
  { sno: 15, name: 'B. Suman Rao', zone: 'Shamshabad', circle: 'Shamshabad', contact: '7337336191', email: 'dcshamshabad.c18@gmail.com' },
  { sno: 16, name: 'B. Venkat Ram', zone: 'Shamshabad', circle: 'Jalpally', contact: '8143919131', email: 'mc.jalpally@gmail.com' },
  { sno: 17, name: 'D. Subash Rao', zone: 'Charminar', circle: 'Yakutpura', contact: '9063421152', email: 'dc26.ghmc@gmail.com' },
  { sno: 18, name: 'G. Anjaneyulu', zone: 'Secunderabad', circle: 'Mettuguda', contact: '9652644275', email: 'dc.secunderbadcircle.ghmc@gmail.com' },
  { sno: 19, name: 'P. Saraswati', zone: 'Shamshabad', circle: 'Badangpet', contact: '8977533858', email: 'dccircle16badangpet@gmail.com' },
  { sno: 20, name: 'Pushpalatha', zone: 'Secunderabad', circle: 'Kavadiguda', contact: '9247505723', email: 'dc40.ghmc@gmail.com' },
  { sno: 21, name: 'Rajesh Kumar', zone: 'Golconda', circle: 'Karwan', contact: '9849152707', email: 'dc7b.ghmc@gmail.com' },
  { sno: 22, name: 'M. Shoba Shanker', zone: 'Golconda', circle: 'Masab Tank', contact: '8977767950', email: 'ghmc.dc34@gmail.com' },
  { sno: 23, name: 'S. Bhaskar Reddy', zone: 'Charminar', circle: 'Moosarambagh', contact: '7075596119', email: 'dc29moosarambagh.ghmc@gmail.com' },
  { sno: 24, name: 'B. Surender Reddy', zone: 'Rajendranagar', circle: 'Rajendra Nagar', contact: '9849906787 / 8712499189', email: 'dc6.ghmc@gmail.com' },
  { sno: 25, name: 'A. Maruthi Diwakar', zone: 'Secunderabad', circle: 'Amberpet', contact: '9154032864', email: 'dc9b.ghmc@gmail.com' },
  { sno: 26, name: 'Ahmed Shafiullah', zone: 'Rajendranagar', circle: 'Bahadurpura', contact: '9849985500', email: 'dcbahadurpura21@gmail.com' },
  { sno: 27, name: 'C. Arun Kumari Charan', zone: 'Rajendranagar', circle: 'Falaknuma', contact: '9154299601', email: 'dc5b.ghmc@gmail.com' },
  { sno: 28, name: 'Praveen Kumar Reddy', zone: 'Secunderabad', circle: 'Musheerabad', contact: '9160999007', email: 'dc9a.ghmc@gmail.com' },
  { sno: 29, name: 'B. Satyanarayana Reddy', zone: 'Shamshabad', circle: 'Adibatla', contact: '7799011775', email: 'dcadibatla@gmail.com' },
  { sno: 30, name: 'T Praveen Kumar Reddy', zone: 'Secunderabad', circle: 'Musheerabad', contact: '8125967208', email: 'dc9a.ghmc@gmail.com' },
]

const zoneColors: Record<string, string> = {
  'Golconda': '#7C3AED',
  'Khairathabad': '#0891B2',
  'Charminar': '#DC2626',
  'Secunderabad': '#2563EB',
  'Rajendranagar': '#059669',
  'Shamshabad': '#D97706',
}

const avatarColors = ['#0D6B6B', '#0E7490', '#1D4ED8', '#7C3AED', '#059669', '#DC2626', '#D97706', '#0891B2']

function initials(name: string) {
  return name.replace(/,.*$/, '').trim().split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

type Tab = 'commissioner' | 'additional' | 'zonal' | 'deputy'

export default function OrgDirectory() {
  const [tab, setTab] = useState<Tab>('commissioner')
  const [search, setSearch] = useState('')
  const [zoneFilter, setZoneFilter] = useState('All Zones')

  const zones = ['All Zones', ...Array.from(new Set(deputyCommissioners.map(d => d.zone))).sort()]

  const filteredDCs = deputyCommissioners.filter(d =>
    (d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.circle.toLowerCase().includes(search.toLowerCase()) ||
      d.zone.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase())) &&
    (zoneFilter === 'All Zones' || d.zone === zoneFilter)
  )

  const filteredACs = additionalCommissioners.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.department.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  )

  const filteredZCs = zonalCommissioners.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.zone.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  )

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'commissioner', label: 'Commissioner', count: 1 },
    { key: 'additional', label: 'Addl. Commissioners', count: additionalCommissioners.length },
    { key: 'zonal', label: 'Zonal Commissioners', count: zonalCommissioners.length },
    { key: 'deputy', label: 'Deputy Commissioners', count: deputyCommissioners.length },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="Administration" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Organizational Directory</h1>
            <p className="text-sm text-gray-500 mt-0.5">GHMC official contact directory — Commissioner, Addl. Commissioners, Zonal & Deputy Commissioners</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
            <Download size={14} /> Export Directory
          </button>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Commissioner', value: '1', icon: Building2, color: '#0D6B6B', bg: 'bg-teal-50' },
            { label: 'Addl. Commissioners', value: '8', icon: Users, color: '#0891B2', bg: 'bg-cyan-50' },
            { label: 'Zonal Commissioners', value: '6', icon: MapPin, color: '#7C3AED', bg: 'bg-violet-50' },
            { label: 'Deputy Commissioners', value: '30', icon: Users, color: '#DC2626', bg: 'bg-red-50' },
          ].map(k => (
            <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <k.icon size={18} style={{ color: k.color }} />
              </div>
              <div>
                <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs text-gray-500 font-medium">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-4 w-fit">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSearch(''); setZoneFilter('All Zones') }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              style={tab === t.key ? { backgroundColor: '#0D6B6B' } : {}}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Search + Filter bar (hidden for Commissioner tab) */}
        {tab !== 'commissioner' && (
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, zone, circle, email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': '#0D6B6B33' } as React.CSSProperties}
              />
            </div>
            {tab === 'deputy' && (
              <div className="relative">
                <select
                  value={zoneFilter}
                  onChange={e => setZoneFilter(e.target.value)}
                  className="appearance-none px-4 py-2.5 pr-8 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer"
                >
                  {zones.map(z => <option key={z}>{z}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            )}
          </div>
        )}

        {/* Commissioner Tab */}
        {tab === 'commissioner' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <Building2 size={16} style={{ color: '#0D6B6B' }} />
              <h2 className="font-bold text-gray-900">Commissioner, GHMC</h2>
            </div>
            {commissioner.map((c, i) => (
              <div key={c.sno} className="flex items-center gap-5 p-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black flex-shrink-0" style={{ backgroundColor: '#0D6B6B' }}>
                  {initials(c.name)}
                </div>
                <div className="flex-1">
                  <p className="text-xl font-black text-gray-900">{c.name}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: '#0D6B6B' }}>{c.designation}</p>
                  <div className="flex gap-6 mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={13} className="text-gray-400" />
                      <span>{c.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={13} className="text-gray-400" />
                      <a href={`mailto:${c.email}`} className="hover:underline" style={{ color: '#0D6B6B' }}>{c.email}</a>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl text-xs font-bold" style={{ backgroundColor: '#E6F4F4', color: '#0D6B6B' }}>
                  Head of GHMC
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Commissioners Tab */}
        {tab === 'additional' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Additional Commissioners</h2>
              <span className="text-xs text-gray-400">{filteredACs.length} officials</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {['S.No', 'Name', 'Designation', 'Department', 'Contact', 'Email'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredACs.map((ac, i) => (
                  <tr key={ac.sno} className="hover:bg-teal-50/30 transition-colors">
                    <td className="px-4 py-3 text-xs font-bold text-gray-400">{ac.sno}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: avatarColors[i % avatarColors.length] }}>
                          {initials(ac.name)}
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{ac.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#E6F4F4', color: '#0D6B6B' }}>{ac.designation}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 text-sm text-gray-700">
                        <Building2 size={12} className="text-gray-400" />
                        {ac.department}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Phone size={12} className="text-gray-400" />
                        {ac.contact}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {ac.email !== '—' ? (
                        <a href={`mailto:${ac.email}`} className="flex items-center gap-1.5 text-sm hover:underline" style={{ color: '#0D6B6B' }}>
                          <Mail size={12} />
                          {ac.email}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Zonal Commissioners Tab */}
        {tab === 'zonal' && (
          <div className="grid grid-cols-2 gap-4">
            {filteredZCs.map((zc, i) => (
              <div key={zc.sno} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0" style={{ backgroundColor: zoneColors[zc.zone] || '#0D6B6B' }}>
                  {initials(zc.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-black text-gray-900 text-sm leading-tight">{zc.name}</p>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 text-white" style={{ backgroundColor: zoneColors[zc.zone] || '#0D6B6B' }}>{zc.zone}</span>
                  </div>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: '#0D6B6B' }}>{zc.designation}</p>
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={11} style={{ color: zoneColors[zc.zone] || '#0D6B6B' }} />
                      <span className="font-medium">{zc.zone} Zone</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Phone size={11} className="text-gray-400" />
                      <span>{zc.contact === '—' ? 'Not listed' : zc.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Mail size={11} className="text-gray-400" />
                      <a href={`mailto:${zc.email}`} className="hover:underline truncate" style={{ color: '#0D6B6B' }}>{zc.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deputy Commissioners Tab */}
        {tab === 'deputy' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Deputy Commissioners</h2>
              <span className="text-xs text-gray-400">{filteredDCs.length} of {deputyCommissioners.length} officials</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['S.No', 'Name', 'Zone', 'Circle', 'Contact', 'Email'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wide px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredDCs.map((dc, i) => (
                    <tr key={`${dc.sno}-${dc.circle}`} className="hover:bg-teal-50/20 transition-colors">
                      <td className="px-4 py-3 text-xs font-bold text-gray-400">{dc.sno}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: zoneColors[dc.zone] || '#0D6B6B' }}>
                            {initials(dc.name)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{dc.name}</p>
                            <p className="text-xs text-gray-400">Deputy Commissioner</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: zoneColors[dc.zone] || '#0D6B6B' }}>
                          {dc.zone}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-sm text-gray-700 whitespace-nowrap">
                          <MapPin size={11} className="text-gray-400" />
                          {dc.circle}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${dc.contact.split('/')[0].trim()}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-teal-700 whitespace-nowrap">
                          <Phone size={11} className="text-gray-400" />
                          {dc.contact}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${dc.email}`} className="flex items-center gap-1.5 text-sm hover:underline whitespace-nowrap" style={{ color: '#0D6B6B' }}>
                          <Mail size={11} />
                          {dc.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-400">Showing {filteredDCs.length} Deputy Commissioners {zoneFilter !== 'All Zones' ? `in ${zoneFilter} Zone` : 'across all zones'}</p>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(zoneColors).map(([zone, color]) => (
                  <div key={zone} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-xs text-gray-500">{zone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
