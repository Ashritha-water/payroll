'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Link } from '@/lib'
import {
  Star, Download, CheckCircle, AlertCircle, Clock, ChevronRight,
  User, TrendingUp, Award, FileText, Edit3, ArrowLeft,
  BarChart3, Shield, Zap, Target, ThumbsUp, Printer
} from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell } from 'recharts'

const tabs = [
  { key: 'dashboard', label: 'ACR Dashboard', icon: BarChart3 },
  { key: 'current', label: 'FY 2024-25 ACR', icon: Edit3 },
  { key: 'history', label: 'ACR History', icon: FileText },
  { key: 'pending', label: 'Pending Actions', icon: Clock },
  { key: 'dpc', label: 'DPC / Promotions', icon: TrendingUp },
] as const

type Tab = (typeof tabs)[number]['key']

const dpcEligible = [
  { empId: 'GHMC-001234', name: 'Srinivas Reddy K.', currentPost: 'Deputy Commissioner', nextPost: 'Additional Commissioner', zone: 'Charminar', acrScore: 87, acrGrade: 'Outstanding', seniority: 21, vacancies: 3, dpcStatus: 'Eligible', integrityOk: true, vigClear: true, dpcDate: 'May 2026' },
  { empId: 'GHMC-007345', name: 'Venkat Narayana B.', currentPost: 'Superintendent Engineer', nextPost: 'Chief Engineer', zone: 'Charminar', acrScore: 89, acrGrade: 'Outstanding', seniority: 24, vacancies: 1, dpcStatus: 'Eligible', integrityOk: true, vigClear: true, dpcDate: 'May 2026' },
  { empId: 'GHMC-012340', name: 'P. Ananya Reddy', currentPost: 'Executive Engineer', nextPost: 'Superintendent Engineer', zone: 'Kukatpally', acrScore: 84, acrGrade: 'Very Good', seniority: 18, vacancies: 4, dpcStatus: 'Eligible', integrityOk: true, vigClear: false, dpcDate: 'Pending clearance' },
  { empId: 'GHMC-019870', name: 'L. Satyanarayana', currentPost: 'Deputy Commissioner', nextPost: 'Additional Commissioner', zone: 'Secunderabad', acrScore: 81, acrGrade: 'Very Good', seniority: 19, vacancies: 3, dpcStatus: 'Under Review', integrityOk: true, vigClear: true, dpcDate: 'Jun 2026' },
  { empId: 'GHMC-024560', name: 'K. Meera Devi', currentPost: 'Assistant Commissioner', nextPost: 'Deputy Commissioner', zone: 'LB Nagar', acrScore: 78, acrGrade: 'Very Good', seniority: 15, vacancies: 5, dpcStatus: 'Eligible', integrityOk: true, vigClear: true, dpcDate: 'May 2026' },
  { empId: 'GHMC-031200', name: 'G. Ramachandra Rao', currentPost: 'Senior Assistant', nextPost: 'Section Officer', zone: 'Malkajgiri', acrScore: 76, acrGrade: 'Good', seniority: 12, vacancies: 8, dpcStatus: 'Deferred', integrityOk: false, vigClear: true, dpcDate: 'Deferred — ACR pending' },
]

const dpcPanels = [
  { panel: 'Additional Commissioner Cadre', date: '20 May 2026', chairman: 'Commissioner, GHMC', vacancies: 3, eligible: 7, status: 'Scheduled' },
  { panel: 'Chief Engineer Cadre', date: '20 May 2026', chairman: 'Commissioner, GHMC', vacancies: 1, eligible: 4, status: 'Scheduled' },
  { panel: 'Superintendent Engineer Cadre', date: '22 May 2026', chairman: 'Additional Commissioner (Engg)', vacancies: 4, eligible: 12, status: 'Scheduled' },
  { panel: 'Deputy Commissioner Cadre', date: '27 May 2026', chairman: 'Commissioner, GHMC', vacancies: 3, eligible: 9, status: 'Notified' },
  { panel: 'Section Officer Cadre', date: '10 Jun 2026', chairman: 'Additional Commissioner (HR)', vacancies: 8, eligible: 22, status: 'Notified' },
]

const acrHistory = [
  { fy: 'FY 2024-25', period: 'Apr 2024 – Mar 2025', reportingOfficer: 'Zonal Commissioner, Secunderabad', counterSign: 'Commissioner, GHMC', selfScore: 88, roScore: null, csScore: null, overall: null, grade: null, status: 'pending_ro' },
  { fy: 'FY 2023-24', period: 'Apr 2023 – Mar 2024', reportingOfficer: 'Zonal Commissioner, Charminar', counterSign: 'Commissioner, GHMC', selfScore: 91, roScore: 87, csScore: 85, overall: 87, grade: 'Outstanding', status: 'complete' },
  { fy: 'FY 2022-23', period: 'Apr 2022 – Mar 2023', reportingOfficer: 'Additional Commissioner (Engg)', counterSign: 'Commissioner, GHMC', selfScore: 86, roScore: 90, csScore: 88, overall: 89, grade: 'Outstanding', status: 'complete' },
  { fy: 'FY 2021-22', period: 'Apr 2021 – Mar 2022', reportingOfficer: 'Additional Commissioner (Engg)', counterSign: 'Commissioner, GHMC', selfScore: 82, roScore: 84, csScore: 84, overall: 84, grade: 'Very Good', status: 'complete' },
  { fy: 'FY 2020-21', period: 'Apr 2020 – Mar 2021', reportingOfficer: 'Zonal Commissioner, HQ', counterSign: 'Additional Commissioner', selfScore: 79, roScore: 80, csScore: 80, overall: 80, grade: 'Very Good', status: 'complete' },
  { fy: 'FY 2019-20', period: 'Apr 2019 – Mar 2020', reportingOfficer: 'SE (Civil), HQ', counterSign: 'Commissioner, GHMC', selfScore: 85, roScore: 82, csScore: 80, overall: 81, grade: 'Very Good', status: 'complete' },
  { fy: 'FY 2018-19', period: 'Apr 2018 – Mar 2019', reportingOfficer: 'SE (Civil), Sec\'bad Zone', counterSign: 'Additional Commissioner', selfScore: 76, roScore: 76, csScore: 75, overall: 76, grade: 'Good', status: 'complete' },
]

const competencyData = [
  { subject: 'Technical Skills', self: 92, ro: 88, cs: 86 },
  { subject: 'Leadership', self: 88, ro: 85, cs: 84 },
  { subject: 'Integrity', self: 95, ro: 94, cs: 93 },
  { subject: 'Punctuality', self: 90, ro: 88, cs: 88 },
  { subject: 'Public Relations', self: 82, ro: 80, cs: 79 },
  { subject: 'Decision Making', self: 86, ro: 83, cs: 83 },
]

const gradeDistribution = [
  { grade: 'Outstanding', count: 2, color: '#1A3555' },
  { grade: 'Very Good', count: 3, color: '#4CAF50' },
  { grade: 'Good', count: 1, color: '#E69B30' },
  { grade: 'Average', count: 0, color: '#9CA3AF' },
]

const orgAcrStatus = [
  { zone: 'Charminar', total: 2840, submitted: 2612, roReview: 198, csReview: 84, complete: 2330, pct: 82 },
  { zone: 'Kukatpally', total: 2780, submitted: 2480, roReview: 210, csReview: 76, complete: 2194, pct: 79 },
  { zone: 'Secunderabad', total: 2950, submitted: 2714, roReview: 176, csReview: 92, complete: 2446, pct: 83 },
  { zone: 'LB Nagar', total: 2560, submitted: 2100, roReview: 280, csReview: 60, complete: 1760, pct: 69 },
  { zone: 'Serilingampally', total: 3100, submitted: 2844, roReview: 194, csReview: 108, complete: 2542, pct: 82 },
  { zone: 'Malkajgiri', total: 2380, submitted: 2046, roReview: 192, csReview: 70, complete: 1784, pct: 75 },
  { zone: 'Khairatabad', total: 2650, submitted: 2410, roReview: 158, csReview: 66, complete: 2186, pct: 82 },
  { zone: 'Uppal', total: 2100, submitted: 1764, roReview: 224, csReview: 58, complete: 1482, pct: 71 },
]

const pendingActions = [
  { empId: 'GHMC-004892', name: 'K. Venkateswara Rao', designation: 'Executive Engineer', zone: 'Kukatpally', fy: 'FY 2024-25', stage: 'Self Appraisal Pending', daysLeft: 4, priority: 'high' },
  { empId: 'GHMC-016034', name: 'T. Srinivasa Murthy', designation: 'Deputy Commissioner', zone: 'LB Nagar', fy: 'FY 2024-25', stage: 'RO Review Pending', daysLeft: 8, priority: 'medium' },
  { empId: 'GHMC-023890', name: 'P. Anantha Krishnan', designation: 'Asst. Commissioner', zone: 'Charminar', fy: 'FY 2024-25', stage: 'CS Review Pending', daysLeft: 12, priority: 'low' },
  { empId: 'GHMC-034124', name: 'D. Lalitha Devi', designation: 'Town Planning Inspector', zone: 'Secunderabad', fy: 'FY 2024-25', stage: 'Self Appraisal Pending', daysLeft: 4, priority: 'high' },
  { empId: 'GHMC-041567', name: 'G. Narendra Kumar', designation: 'Revenue Inspector', zone: 'Malkajgiri', fy: 'FY 2024-25', stage: 'RO Review Pending', daysLeft: 6, priority: 'high' },
]

const selfAppraisalFields = [
  { section: 'Work Performance & Output', items: [
    { label: 'Target Achievement (Projects / Tasks)', score: 9, maxScore: 10 },
    { label: 'Quality of Work Output', score: 9, maxScore: 10 },
    { label: 'Completion within Deadline', score: 8, maxScore: 10 },
    { label: 'Innovation & Process Improvement', score: 7, maxScore: 10 },
  ]},
  { section: 'Conduct & Integrity', items: [
    { label: 'Integrity & Honesty', score: 10, maxScore: 10 },
    { label: 'Punctuality & Regularity', score: 9, maxScore: 10 },
    { label: 'Discipline & Conduct', score: 10, maxScore: 10 },
  ]},
  { section: 'Leadership & Teamwork', items: [
    { label: 'Leadership & Team Management', score: 8, maxScore: 10 },
    { label: 'Communication & Coordination', score: 8, maxScore: 10 },
    { label: 'Public / Stakeholder Handling', score: 8, maxScore: 10 },
    { label: 'Training & Mentoring Subordinates', score: 7, maxScore: 10 },
  ]},
]

const chartConfig = {
  self: { label: 'Self', color: '#1A3555' },
  ro: { label: 'Reporting Officer', color: '#E69B30' },
  cs: { label: 'Countersigning Officer', color: '#10B981' },
  count: { label: 'Employees', color: '#1A3555' },
}

const gradeColor: Record<string, string> = {
  Outstanding: 'bg-purple-50 text-purple-700',
  'Very Good': 'bg-blue-50 text-blue-700',
  Good: 'bg-green-50 text-green-700',
  Average: 'bg-amber-50 text-amber-700',
  'Below Average': 'bg-red-50 text-red-600',
}

const stageColor: Record<string, string> = {
  'Self Appraisal Pending': 'bg-amber-50 text-amber-700',
  'RO Review Pending': 'bg-blue-50 text-blue-700',
  'CS Review Pending': 'bg-purple-50 text-purple-700',
  'Complete': 'bg-green-50 text-green-700',
}

export default function ACRPerformance() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [editingScores, setEditingScores] = useState(false)

  const selfTotal = selfAppraisalFields.flatMap(s => s.items).reduce((a, i) => a + i.score, 0)
  const maxTotal = selfAppraisalFields.flatMap(s => s.items).reduce((a, i) => a + i.maxScore, 0)
  const selfPct = Math.round((selfTotal / maxTotal) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active="ACR / Performance" />
      <Components.TopBar />
      <main className="ml-56 pt-14 p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link to="/EmployeeMaster" className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer transition-colors">
                <ArrowLeft size={12} /> Employee Master
              </Link>
              <ChevronRight size={12} className="text-gray-300" />
              <Link to="/EmployeeProfile" className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer transition-colors">Employee Profile</Link>
              <ChevronRight size={12} className="text-gray-300" />
              <span className="text-xs font-semibold text-gray-700">ACR / Performance Appraisal</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ACR / PAR — Performance Appraisal</h1>
            <p className="text-sm text-gray-500 mt-0.5">Annual Confidential Reports — Srinivas Reddy K., Deputy Commissioner, Charminar Zone</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-50">
              <Printer size={14} /> Print ACR
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-bold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
              <Download size={14} /> Export All ACRs
            </button>
          </div>
        </div>

        {/* Quick Employee Nav */}
        <div className="flex gap-2 mb-5">
          {[
            { label: 'Employee Profile', to: '/EmployeeProfile' },
            { label: 'Service Book', to: '/ServiceBook' },
            { label: 'GPF Statement', to: '/GPFStatement' },
            { label: 'NPS & Pension', to: '/NPSPension' },
            { label: 'ACR / PAR', to: '/ACRPerformance', active: true },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${link.active ? 'text-white border-transparent' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
              style={link.active ? { backgroundColor: '#1A3555' } : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-5 w-fit">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${tab === t.key ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              style={tab === t.key ? { backgroundColor: '#1A3555' } : {}}
            >
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>

        {/* ACR Dashboard */}
        {tab === 'dashboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              {[
                { label: 'Total ACRs on Record', value: '21 Years', sub: 'FY 2004-05 to FY 2024-25', color: '#1A3555' },
                { label: 'Outstanding Grade', value: '2 Times', sub: 'FY 23-24, FY 22-23', color: '#8B5CF6' },
                { label: 'Very Good Grade', value: '3 Times', sub: 'Consecutive FYs', color: '#3B82F6' },
                { label: 'Average ACR Score', value: '84.4%', sub: 'Last 5 years avg.', color: '#10B981' },
                { label: 'Current Status', value: 'Pending', sub: 'FY 2024-25 — RO Review', color: '#E69B30' },
              ].map((k) => (
                <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1.5">{k.label}</p>
                  <p className="text-xl font-black" style={{ color: k.color }}>{k.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Year-wise ACR Score Trend</h2>
                <ChartContainer config={chartConfig} className="h-52">
                  <BarChart data={acrHistory.filter(a => a.status === 'complete').reverse().map(a => ({ fy: a.fy.replace('FY ', ''), self: a.selfScore, ro: a.roScore, cs: a.csScore, overall: a.overall }))} barSize={18}>
                    <XAxis dataKey="fy" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 9 }} />
                    <YAxis domain={[60, 100]} hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="self" fill="#1A3555" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="ro" fill="#E69B30" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="cs" fill="#10B981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ChartContainer>
                <div className="flex gap-5 mt-2">
                  {[['#1A3555', 'Self Appraisal'], ['#E69B30', 'Reporting Officer'], ['#10B981', 'Countersigning Officer']].map(([color, label]) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="font-bold text-gray-900 mb-3">Grade Summary</h2>
                  {[
                    { grade: 'Outstanding', count: 2, color: '#8B5CF6', total: 6 },
                    { grade: 'Very Good', count: 3, color: '#3B82F6', total: 6 },
                    { grade: 'Good', count: 1, color: '#10B981', total: 6 },
                    { grade: 'Average', count: 0, color: '#9CA3AF', total: 6 },
                  ].map((g) => (
                    <div key={g.grade} className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-gray-700">{g.grade}</span>
                        <span className="font-black text-gray-900">{g.count} FYs</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full transition-all" style={{ width: `${(g.count / g.total) * 100}%`, backgroundColor: g.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h2 className="font-bold text-gray-900 mb-3">GHMC-wide ACR Status</h2>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: 'Self Appraisals Submitted', value: '26,970', pct: 92, color: '#1A3555' },
                      { label: 'RO Reviews Completed', value: '21,420', pct: 73, color: '#E69B30' },
                      { label: 'CS Reviews Completed', value: '18,924', pct: 64, color: '#8B5CF6' },
                      { label: 'ACRs Fully Complete', value: '17,724', pct: 60, color: '#10B981' },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-gray-500">{s.label}</span>
                          <span className="font-bold text-gray-800">{s.value}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Competency Radar */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Competency Scoring — FY 2023-24</h2>
                <div className="flex justify-center">
                  <RadarChart width={340} height={220} data={competencyData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 10 }} />
                    <Radar name="Self" dataKey="self" stroke="#1A3555" fill="#1A3555" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="RO" dataKey="ro" stroke="#E69B30" fill="#E69B30" fillOpacity={0.1} strokeWidth={2} />
                    <Radar name="CS" dataKey="cs" stroke="#10B981" fill="#10B981" fillOpacity={0.08} strokeWidth={1.5} />
                  </RadarChart>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">Zone-wise ACR Completion — FY 2024-25</h2>
                <div className="space-y-3">
                  {orgAcrStatus.map(z => (
                    <div key={z.zone} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-24 flex-shrink-0">{z.zone} Zone</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div className="h-2 rounded-full" style={{ width: `${z.pct}%`, backgroundColor: z.pct >= 80 ? '#10B981' : z.pct >= 70 ? '#E69B30' : '#E35A4A' }} />
                      </div>
                      <span className="text-xs font-black w-8 text-right" style={{ color: z.pct >= 80 ? '#10B981' : z.pct >= 70 ? '#E69B30' : '#E35A4A' }}>{z.pct}%</span>
                      <span className="text-xs text-gray-400 w-16 text-right">{z.complete.toLocaleString()}/{z.total.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Year ACR */}
        {tab === 'current' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              {/* Workflow Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-4">FY 2024-25 ACR — Workflow Status</h2>
                <div className="flex items-center gap-2 mb-5">
                  {[
                    { step: 'Self Appraisal', status: 'done', date: '20 Apr 2025' },
                    { step: 'Reporting Officer', status: 'active', date: 'Pending' },
                    { step: 'Review Representation', status: 'pending', date: '' },
                    { step: 'Countersigning Officer', status: 'pending', date: '' },
                    { step: 'Final ACR Recorded', status: 'pending', date: '' },
                  ].map((s, i, arr) => (
                    <React.Fragment key={s.step}>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${s.status === 'done' ? 'bg-green-500' : s.status === 'active' ? 'bg-amber-400' : 'bg-gray-100'}`}>
                          {s.status === 'done' ? <CheckCircle size={16} className="text-white" /> : s.status === 'active' ? <Clock size={16} className="text-white" /> : <div className="w-3 h-3 rounded-full bg-gray-300" />}
                        </div>
                        <p className="text-xs font-semibold text-gray-700 w-20 leading-tight">{s.step}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.date}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`flex-1 h-0.5 mt-[-16px] ${s.status === 'done' ? 'bg-green-300' : 'bg-gray-200'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-800">Awaiting Reporting Officer's Review</p>
                    <p className="text-xs text-amber-600 mt-0.5">Zonal Commissioner, Secunderabad Zone — Due by 30 May 2025</p>
                  </div>
                </div>
              </div>

              {/* Self-appraisal scores */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="font-bold text-gray-900">Self-Appraisal Scores</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Submitted on 20 Apr 2025</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-black" style={{ color: '#1A3555' }}>{selfPct}%</p>
                      <p className="text-xs text-gray-400">{selfTotal}/{maxTotal} points</p>
                    </div>
                    <button onClick={() => setEditingScores(!editingScores)} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">
                      <Edit3 size={12} /> {editingScores ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>

                {selfAppraisalFields.map((section) => (
                  <div key={section.section} className="mb-5 last:mb-0">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 pb-1.5 border-b border-gray-100">{section.section}</h3>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 flex-1">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {Array.from({ length: item.maxScore }).map((_, i) => (
                                <div key={i} className={`w-4 h-4 rounded-sm ${i < item.score ? 'bg-blue-500' : 'bg-gray-100'}`} style={i < item.score ? { backgroundColor: '#1A3555' } : {}} />
                              ))}
                            </div>
                            <span className="text-sm font-black text-gray-900 w-8 text-right">{item.score}/{item.maxScore}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#1A3555' }}>
                      <p className="text-xs text-blue-200">Section A: Work Output</p>
                      <p className="text-xl font-black text-white mt-1">33/40</p>
                    </div>
                    <div className="rounded-xl p-3 text-center bg-purple-50 border border-purple-100">
                      <p className="text-xs text-purple-500">Section B: Integrity</p>
                      <p className="text-xl font-black text-purple-700 mt-1">29/30</p>
                    </div>
                    <div className="rounded-xl p-3 text-center bg-green-50 border border-green-100">
                      <p className="text-xs text-green-500">Section C: Leadership</p>
                      <p className="text-xl font-black text-green-700 mt-1">31/40</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Self-Appraisal Remarks</h2>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                  <p>During FY 2024-25, I successfully managed the Charminar Zone infrastructure projects including the Smart Road project on Laad Bazaar Road, achieving 94% completion. The property tax collection target was exceeded by 112%. I led a team of 34 engineers and 180+ field staff, consistently maintaining high standards of service delivery. Solid Waste Management operations were improved with route optimization reducing fleet usage by 18%.</p>
                  <p className="mt-2">No disciplinary proceedings or complaints recorded during the year. Attended 2 training programs (Urban Governance, IIM-A; Project Management, CIPE).</p>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">RO Grading Form</h2>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4 flex gap-2">
                  <Clock size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">Awaiting RO: Zonal Commissioner, Secunderabad Zone</p>
                </div>
                <div className="space-y-3 opacity-50 pointer-events-none">
                  {['Overall Grading', 'Integrity Assessment', 'Recommended for Promotion'].map(f => (
                    <div key={f} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-xs text-gray-600">{f}</span>
                      <span className="text-xs font-semibold text-gray-400">— Pending —</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">Integrity Certificate</h2>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Assets Declared (FY 24-25)', value: 'Filed — Oct 2024', ok: true },
                    { label: 'Anti-Corruption Bureau', value: 'No Case Pending', ok: true },
                    { label: 'Vigilance Clearance', value: 'Cleared', ok: true },
                    { label: 'Suspension / Penalty', value: 'NIL', ok: true },
                    { label: 'Complaints Received', value: '0 (FY 2024-25)', ok: true },
                  ].map((c) => (
                    <div key={c.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-gray-500">{c.label}</span>
                      <div className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green-500" />
                        <span className="font-semibold text-green-700">{c.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 mb-3">ACR Grading Scale</h2>
                <div className="space-y-2 text-xs">
                  {[
                    { grade: 'Outstanding', range: '≥ 90%', color: '#8B5CF6' },
                    { grade: 'Very Good', range: '75% – 89%', color: '#3B82F6' },
                    { grade: 'Good', range: '60% – 74%', color: '#10B981' },
                    { grade: 'Average', range: '45% – 59%', color: '#E69B30' },
                    { grade: 'Below Average', range: '< 45%', color: '#E35A4A' },
                  ].map((g) => (
                    <div key={g.grade} className="flex justify-between items-center py-1 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
                        <span className="font-semibold text-gray-800">{g.grade}</span>
                      </div>
                      <span className="text-gray-500">{g.range}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: '#1A3555' }}>
                <p className="text-xs text-blue-200 mb-1">Self-appraisal Score</p>
                <p className="text-3xl font-black text-white">{selfPct}%</p>
                <p className="text-sm font-bold text-amber-300 mt-1">Projected: Outstanding</p>
                <p className="text-xs text-blue-300 mt-1">If RO grades ≥ 85% and CS concurs</p>
              </div>
            </div>
          </div>
        )}

        {/* ACR History */}
        {tab === 'history' && (
          <div className="space-y-3">
            {acrHistory.map((acr, i) => (
              <div key={acr.fy} className={`bg-white rounded-xl shadow-sm border p-5 ${acr.status === 'pending_ro' ? 'border-amber-200' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm ${acr.status === 'complete' ? 'text-white' : 'bg-amber-50 text-amber-600'}`} style={acr.status === 'complete' ? { backgroundColor: '#1A3555' } : {}}>
                      {acr.status === 'complete' ? acr.fy.replace('FY ', '').replace('-', '\n') : <Clock size={20} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        <h3 className="font-black text-gray-900">{acr.fy}</h3>
                        {acr.grade && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${gradeColor[acr.grade]}`}>{acr.grade}</span>}
                        {acr.status === 'pending_ro' && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">Pending RO Review</span>}
                        {acr.overall && <span className="text-xs font-semibold text-gray-500">Overall: <span className="font-black text-gray-900">{acr.overall}%</span></span>}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{acr.period}</p>
                      <div className="flex gap-6 flex-wrap">
                        <div className="text-xs">
                          <span className="text-gray-400">Reporting Officer: </span>
                          <span className="font-semibold text-gray-700">{acr.reportingOfficer}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-400">Countersigning: </span>
                          <span className="font-semibold text-gray-700">{acr.counterSign}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    {acr.status === 'complete' && (
                      <div className="flex gap-5 text-center">
                        {[['Self', acr.selfScore], ['RO Score', acr.roScore], ['CS Score', acr.csScore]].map(([label, val]) => (
                          <div key={label as string}>
                            <p className="text-xs text-gray-400">{label}</p>
                            <p className="text-lg font-black text-gray-900">{val}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {acr.status === 'complete' && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">
                        <Download size={12} /> Download
                      </button>
                    )}
                  </div>
                </div>

                {acr.status === 'complete' && acr.overall && (
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <div className="w-full h-2 bg-gray-100 rounded-full">
                      <div className="h-2 rounded-full transition-all" style={{ width: `${acr.overall}%`, backgroundColor: acr.overall >= 90 ? '#8B5CF6' : acr.overall >= 75 ? '#3B82F6' : '#10B981' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* DPC / Promotion Integration */}
        {tab === 'dpc' && (
          <div className="space-y-4">
            {/* DPC KPIs */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'DPC Panels Scheduled', value: '5', sub: 'May–Jun 2026', color: '#1A3555' },
                { label: 'Employees Eligible', value: '54', sub: 'Across all cadres', color: '#10B981' },
                { label: 'Total Vacancies', value: '19', sub: 'Sanctioned posts', color: '#E69B30' },
                { label: 'Vigilance Holds', value: '3', sub: 'Pending clearance', color: '#E35A4A' },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">{k.label}</p>
                  <p className="text-2xl font-black" style={{ color: k.color }}>{k.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
                </div>
              ))}
            </div>

            {/* DPC Panels */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Upcoming DPC Panels — FY 2025-26</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs font-bold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                  + Schedule Panel
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['DPC Panel / Cadre', 'Date', 'Chairman', 'Vacancies', 'Eligible', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dpcPanels.map((p) => (
                    <tr key={p.panel} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">{p.panel}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.date}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{p.chairman}</td>
                      <td className="px-4 py-3 text-sm font-black" style={{ color: '#1A3555' }}>{p.vacancies}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-700">{p.eligible}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === 'Scheduled' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">View List</button>
                        <button className="text-xs px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100">Panel Notes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DPC Eligible Employees */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">ACR-linked Promotion Eligibility Register</h2>
                <div className="flex gap-2">
                  <Link to="/PromotionTransfer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs font-bold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>
                    <TrendingUp size={12} /> View in Promotion Module
                  </Link>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-pointer hover:bg-gray-50">
                    <Download size={12} /> Export DPC List
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Emp ID', 'Name', 'Current Post → Next Post', 'Zone', 'ACR Score', 'Seniority', 'Vacancies', 'Integrity', 'Vig. Clear', 'DPC Status', 'Likely Date'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-3 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dpcEligible.map((e) => (
                    <tr key={e.empId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-xs font-semibold text-blue-600">{e.empId}</td>
                      <td className="px-3 py-3">
                        <p className="text-sm font-bold text-gray-900">{e.name}</p>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600">
                        <span className="font-semibold text-gray-800">{e.currentPost}</span>
                        <span className="mx-1 text-gray-400">→</span>
                        <span className="font-semibold text-green-700">{e.nextPost}</span>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600">{e.zone}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black" style={{ color: e.acrScore >= 85 ? '#8B5CF6' : e.acrScore >= 75 ? '#3B82F6' : '#10B981' }}>{e.acrScore}%</span>
                          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${e.acrGrade === 'Outstanding' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>{e.acrGrade}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm font-bold text-gray-800">{e.seniority} yrs</td>
                      <td className="px-3 py-3 text-sm font-bold text-gray-700">{e.vacancies}</td>
                      <td className="px-3 py-3">
                        {e.integrityOk ? <CheckCircle size={14} className="text-green-500" /> : <AlertCircle size={14} className="text-red-500" />}
                      </td>
                      <td className="px-3 py-3">
                        {e.vigClear ? <CheckCircle size={14} className="text-green-500" /> : <Clock size={14} className="text-amber-500" />}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${e.dpcStatus === 'Eligible' ? 'bg-green-50 text-green-700' : e.dpcStatus === 'Under Review' ? 'bg-blue-50 text-blue-700' : e.dpcStatus === 'Deferred' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{e.dpcStatus}</span>
                      </td>
                      <td className="px-3 py-3 text-xs font-semibold text-gray-600">{e.dpcDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ACR → Promotion Flow */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-4">ACR → DPC → Promotion Workflow</h2>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                  { step: '1. ACR Completion', sub: 'All 3 stages signed off', color: '#10B981', done: true },
                  { step: '2. Seniority List', sub: 'Zone/Cadre-wise ranking', color: '#10B981', done: true },
                  { step: '3. Vigilance Clearance', sub: 'ACB + Disciplinary check', color: '#E69B30', done: false },
                  { step: '4. DPC Panel Meeting', sub: 'Commissioner presides', color: '#1A3555', done: false },
                  { step: '5. Promotion Order', sub: 'G.O. / Proceedings issued', color: '#1A3555', done: false },
                  { step: '6. Posting & Joining', sub: 'Relieving + joining report', color: '#1A3555', done: false },
                  { step: '7. Service Book Update', sub: 'Promotion entry recorded', color: '#1A3555', done: false },
                ].map((s, i, arr) => (
                  <React.Fragment key={s.step}>
                    <div className="flex flex-col items-center text-center flex-shrink-0 w-28">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${s.done ? 'bg-green-500' : 'bg-gray-100'}`}>
                        {s.done ? <CheckCircle size={18} className="text-white" /> : <div className="w-4 h-4 rounded-full bg-gray-300" />}
                      </div>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{s.step}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-tight">{s.sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`flex-1 min-w-4 h-0.5 mt-[-24px] ${s.done ? 'bg-green-300' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pending Actions */}
        {tab === 'pending' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Self Appraisals Overdue', value: '1,248', color: '#E35A4A', bg: 'bg-red-50' },
                { label: 'RO Reviews Pending', value: '4,320', color: '#E69B30', bg: 'bg-amber-50' },
                { label: 'CS Reviews Pending', value: '2,148', color: '#8B5CF6', bg: 'bg-purple-50' },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-900">Pending ACR Actions — FY 2024-25</h2>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50">Send Reminders</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold cursor-pointer" style={{ backgroundColor: '#1A3555' }}>Bulk Follow-up</button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Emp ID', 'Employee', 'Zone', 'Pending Stage', 'Days Remaining', 'Priority', 'Action'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 px-4 py-3 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pendingActions.map((p) => (
                    <tr key={p.empId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-blue-600">{p.empId}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.designation}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{p.zone}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stageColor[p.stage]}`}>{p.stage}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-sm font-black ${p.daysLeft <= 4 ? 'text-red-600' : p.daysLeft <= 7 ? 'text-amber-600' : 'text-green-600'}`}>{p.daysLeft} days</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.priority === 'high' ? 'bg-red-50 text-red-700' : p.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                          {p.priority.charAt(0).toUpperCase() + p.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="text-xs px-2.5 py-1 border border-gray-200 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-50">Remind</button>
                        <button className="text-xs px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100">View ACR</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
