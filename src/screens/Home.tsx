'use client'
import React, { useState } from 'react'
import Components from '../components'
import { Link } from '@/lib'
import {
  LayoutDashboard, Users, DollarSign, Calendar, Clock,
  FileText, Award, Truck, Monitor, BarChart3, Lightbulb,
  Settings, Bell, MapPin, Bot, GitBranch, Smartphone,
  UserPlus, Shield, PiggyBank, BookOpen, GraduationCap,
  TrendingUp, CheckCircle, AlertTriangle, Activity,
  ChevronRight, Database, Heart, CreditCard, Building2,
  BarChart2, Search, Scale, FolderOpen, Briefcase, ListChecks,
  HardHat, Coins
} from 'lucide-react'

const moduleGroups = [
  {
    category: 'Employee Management',
    color: '#1A3555',
    lightColor: '#EBF2FF',
    textColor: '#1A3555',
    icon: Users,
    modules: [
      { label: 'Employee Master', to: '/EmployeeMaster', desc: '29,340 employees', icon: Users },
      { label: 'Employee Profile', to: '/EmployeeProfile', desc: 'Service details', icon: BookOpen },
      { label: 'Promotion & Transfer', to: '/PromotionTransfer', desc: 'DPC & postings', icon: TrendingUp },
      { label: 'Service Book', to: '/ServiceBook', desc: 'Digital record', icon: FileText },
      { label: 'Recruitment', to: '/RecruitmentOnboarding', desc: 'Vacancy & hiring', icon: UserPlus },
      { label: 'Disciplinary', to: '/DisciplinaryProceedings', desc: 'Charge sheets', icon: Shield },
      { label: 'ACR / PAR', to: '/ACRPerformance', desc: 'Annual appraisals', icon: Award },
    ]
  },
  {
    category: 'Workforce Management',
    color: '#0E7490',
    lightColor: '#ECFEFF',
    textColor: '#0E7490',
    icon: Briefcase,
    modules: [
      { label: 'Outsourced Staff', to: '/OutsourcedWorkforce', desc: 'Agency & daily wage', icon: Briefcase },
      { label: 'Roster Management', to: '/RosterManagement', desc: 'SC/ST/BC/EWS roster', icon: ListChecks },
    ]
  },
  {
    category: 'Payroll & Finance',
    color: '#15803D',
    lightColor: '#F0FDF4',
    textColor: '#15803D',
    icon: DollarSign,
    modules: [
      { label: 'Payroll', to: '/Payroll', desc: '₹18.6 Cr monthly', icon: DollarSign },
      { label: 'Pay Register', to: '/PayrollRegister', desc: 'DDO certification', icon: BarChart2 },
      { label: 'Salary Revision', to: '/SalaryRevision', desc: 'Pay fixation', icon: CreditCard },
      { label: 'Income Tax', to: '/IncomeTax', desc: 'FY 2025-26 TDS', icon: FileText },
      { label: 'Budget & Expenditure', to: '/BudgetAllocation', desc: 'Head-wise budget', icon: PiggyBank },
      { label: 'IFMS / Treasury', to: '/IFMSIntegration', desc: 'CFMS pay bills', icon: Database },
    ]
  },
  {
    category: 'Attendance & Leave',
    color: '#D97706',
    lightColor: '#FFFBEB',
    textColor: '#D97706',
    icon: Clock,
    modules: [
      { label: 'Attendance', to: '/Attendance', desc: 'Daily biometric', icon: Clock },
      { label: 'Attendance Register', to: '/AttendanceRegister', desc: 'Zone-wise drill', icon: BarChart3 },
      { label: 'Leave Management', to: '/LeaveManagement', desc: 'CL/EL/HPL balances', icon: Calendar },
      { label: 'Biometric & Geo', to: '/BiometricGeoAttendance', desc: 'Facial + geo-fence', icon: MapPin },
    ]
  },
  {
    category: 'Benefits & Claims',
    color: '#7C3AED',
    lightColor: '#F5F3FF',
    textColor: '#7C3AED',
    icon: Heart,
    modules: [
      { label: 'NPS & Pension', to: '/NPSPension', desc: 'PRAN / Tier I & II', icon: Coins },
      { label: 'Terminal Benefits', to: '/TerminalBenefits', desc: 'Gratuity, DCRG', icon: Award },
      { label: 'GPF Statement', to: '/GPFStatement', desc: 'Annual interest', icon: Database },
      { label: 'Claims & Travel', to: '/ClaimsTravel', desc: 'TA/DA/LTC claims', icon: Truck },
      { label: 'Medical Reimburse', to: '/MedicalReimbursement', desc: 'TSMA/APIMA', icon: Heart },
      { label: 'Retirement Pipeline', to: '/RetirementPipeline', desc: '12-month calendar', icon: Calendar },
    ]
  },
  {
    category: 'Policy & Compliance',
    color: '#B45309',
    lightColor: '#FFF7ED',
    textColor: '#B45309',
    icon: Scale,
    modules: [
      { label: 'Court Cases', to: '/CourtCases', desc: 'HC / CAT / SC cases', icon: Scale },
      { label: 'GO Repository', to: '/GORepository', desc: 'GOs, Circulars, Memos', icon: FolderOpen },
      { label: 'Health & Safety', to: '/HealthSafety', desc: 'OHS / PPE / Accidents', icon: HardHat },
    ]
  },
  {
    category: 'Training & Development',
    color: '#0284C7',
    lightColor: '#F0F9FF',
    textColor: '#0284C7',
    icon: GraduationCap,
    modules: [
      { label: 'Training & Development', to: '/TrainingDevelopment', desc: 'MCTP/TS Academy', icon: GraduationCap },
      { label: 'ESS / MSS Portal', to: '/ESSMSS', desc: 'Self service', icon: Monitor },
    ]
  },
  {
    category: 'Analytics & AI',
    color: '#BE185D',
    lightColor: '#FFF1F5',
    textColor: '#BE185D',
    icon: Lightbulb,
    modules: [
      { label: 'Reports & MIS', to: '/ReportsMIS', desc: '120+ reports', icon: BarChart3 },
      { label: 'AI Analytics', to: '/AIAnalytics', desc: 'Anomaly detection', icon: Lightbulb },
      { label: 'Agentic AI (ARIA)', to: '/AgenticAI', desc: 'Advisory AI', icon: Bot },
      { label: 'Zone Dashboard', to: '/ZoneDashboard', desc: '8 zones drill-down', icon: MapPin },
    ]
  },
  {
    category: 'System & Operations',
    color: '#475569',
    lightColor: '#F8FAFC',
    textColor: '#475569',
    icon: Settings,
    modules: [
      { label: 'Notifications', to: '/NotificationsCenter', desc: 'WhatsApp / Push', icon: Bell },
      { label: 'Workflow Engine', to: '/WorkflowEngine', desc: 'Approval chains', icon: GitBranch },
      { label: 'Administration', to: '/Administration', desc: 'System config', icon: Settings },
    ]
  },
]

const quickStats = [
  { label: 'Total Employees', value: '29,340', sub: 'Across 8 zones', color: '#1A3555', icon: Users },
  { label: 'Present Today', value: '27,485', sub: '93.7% attendance', color: '#15803D', icon: CheckCircle },
  { label: 'Pending Actions', value: '48', sub: 'Require approval', color: '#D97706', icon: AlertTriangle },
  { label: 'Payroll (Feb)', value: '₹18.6 Cr', sub: 'Disbursed on time', color: '#7C3AED', icon: DollarSign },
  { label: 'Open Claims', value: '312', sub: 'Awaiting processing', color: '#0284C7', icon: Activity },
  { label: 'AI Tasks (ARIA)', value: '24', sub: 'Completed today', color: '#BE185D', icon: Bot },
]

const alerts = [
  { type: 'warn', msg: 'Actual IT declaration deadline: 31 Mar 2026', time: '2h ago' },
  { type: 'info', msg: '47 employees retiring in next 90 days — action required', time: '5h ago' },
  { type: 'success', msg: 'Feb 2026 payroll processed successfully — ₹18.6 Cr', time: '1d ago' },
  { type: 'warn', msg: 'Biometric sync pending for Uppal Zone (3 devices)', time: '1d ago' },
]

export default function Home() {
  const [search, setSearch] = useState('')

  const allModules = moduleGroups.flatMap(g => g.modules.map(m => ({ ...m, category: g.category, color: g.color })))
  const filtered = search ? allModules.filter(m => m.label.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase())) : []

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F4F8' }}>
      <Components.Sidebar active="Home" />
      <Components.TopBar />
      <main className="ml-56 pt-14">

        {/* Hero Banner */}
        <div className="relative overflow-hidden px-6 py-8" style={{ background: 'linear-gradient(135deg, #0C1C34 0%, #1A3555 60%, #1e4d8c 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #E69B30 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3B82F6 0%, transparent 40%)' }} />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E69B30' }}>
                  <Building2 size={16} className="text-white" />
                </div>
                <span className="text-white/70 text-sm font-semibold tracking-wider">GHMC HRMS — COMMAND CENTER</span>
              </div>
              <h1 className="text-3xl font-black text-white leading-tight">Welcome, Sri R.V.Karnan, IAS</h1>
              <p className="text-white/60 mt-1 text-sm">Commissioner, Greater Hyderabad Municipal Corporation • Monday, 16 March 2026</p>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/AgenticAI" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all hover:scale-105" style={{ backgroundColor: '#E69B30', color: '#0C1C34' }}>
                <Bot size={16} /> Ask ARIA
              </Link>
              <Link to="/Dashboard" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white border border-white/20 cursor-pointer hover:bg-white/10 transition-all">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="relative z-10 grid grid-cols-6 gap-3 mt-6">
            {quickStats.map((s) => (
              <div key={s.label} className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + '30' }}>
                    <s.icon size={12} style={{ color: '#fff' }} />
                  </div>
                </div>
                <p className="text-white font-black text-xl leading-none">{s.value}</p>
                <p className="text-white/50 text-xs mt-1 leading-tight">{s.label}</p>
                <p className="text-white/35 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-5">
          {/* Module Search */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-black text-gray-900">Module Directory</h2>
              <p className="text-sm text-gray-500 mt-0.5">All 40 modules across 9 categories</p>
            </div>
            <div className="relative w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search modules..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Search Results */}
          {search && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-5 overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-500">{filtered.length} results for "{search}"</p>
              </div>
              <div className="grid grid-cols-4 gap-0 divide-x divide-gray-50">
                {filtered.map((m) => (
                  <Link key={m.label} to={m.to} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: m.color + '15' }}>
                      <m.icon size={15} style={{ color: m.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{m.label}</p>
                      <p className="text-xs text-gray-400">{m.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Module Groups Grid */}
          <div className="space-y-4">
            {moduleGroups.map((group) => {
              const GroupIcon = group.icon
              return (
                <div key={group.category} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-50" style={{ backgroundColor: group.lightColor }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: group.color }}>
                      <GroupIcon size={14} className="text-white" />
                    </div>
                    <h3 className="font-black text-sm" style={{ color: group.textColor }}>{group.category}</h3>
                    <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: group.color }}>
                      {group.modules.length} modules
                    </span>
                  </div>
                  <div className="grid grid-cols-6 divide-x divide-gray-50">
                    {group.modules.map((mod) => (
                      <Link
                        key={mod.label}
                        to={mod.to}
                        className="group flex flex-col items-center text-center p-4 hover:bg-gray-50/80 transition-all cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110" style={{ backgroundColor: group.color + '12' }}>
                          <mod.icon size={18} style={{ color: group.color }} />
                        </div>
                        <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{mod.label}</p>
                        <p className="text-xs text-gray-400 leading-tight">{mod.desc}</p>
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={12} style={{ color: group.color }} />
                        </div>
                      </Link>
                    ))}
                    {/* Fill empty slots */}
                    {Array.from({ length: Math.max(0, 6 - group.modules.length) }).map((_, i) => (
                      <div key={i} className="p-4" style={{ backgroundColor: group.lightColor + '40' }} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Alerts & Recent Activity bottom row */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-black text-sm text-gray-900">System Alerts</h3>
                <Link to="/NotificationsCenter" className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">View All</Link>
              </div>
              <div className="divide-y divide-gray-50">
                {alerts.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.type === 'warn' ? 'bg-amber-400' : a.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{a.msg}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${a.type === 'warn' ? 'bg-amber-50 text-amber-700' : a.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                      {a.type === 'warn' ? 'Action' : a.type === 'success' ? 'Done' : 'Info'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-50">
                <h3 className="font-black text-sm text-gray-900">Quick Launch</h3>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2">
                {[
                  { label: 'Run Payroll', to: '/Payroll', color: '#15803D', icon: DollarSign },
                  { label: 'Add Employee', to: '/EmployeeMaster', color: '#1A3555', icon: UserPlus },
                  { label: 'Zone View', to: '/ZoneDashboard', color: '#D97706', icon: MapPin },
                  { label: 'AI Chat', to: '/AgenticAI', color: '#BE185D', icon: Bot },
                  { label: 'MIS Report', to: '/ReportsMIS', color: '#0284C7', icon: BarChart3 },
                  { label: 'Notifications', to: '/NotificationsCenter', color: '#475569', icon: Bell },
                ].map((q) => (
                  <Link key={q.label} to={q.to} className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: q.color + '15' }}>
                      <q.icon size={13} style={{ color: q.color }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{q.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
