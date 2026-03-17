'use client'
import React, { useState } from 'react'
import { Link } from '@/lib'
import {
  LayoutDashboard, Users, DollarSign, Calendar, Clock,
  FileText, Award, Truck, Monitor, BarChart3, Lightbulb,
  Settings, Bell, MapPin, Bot, ChevronDown, GitBranch,
  Home, BookOpen, GraduationCap, Shield,
  UserPlus, PiggyBank, Scale, Briefcase, BookMarked,
  List, HeartPulse, Building2, Landmark, HardHat,
  Smartphone, TrendingUp, ClipboardList
} from 'lucide-react'

interface SidebarProps {
  active?: string
}

const groups = [
  {
    label: 'CORE',
    items: [
      { label: 'Home', icon: Home, to: '/Home' },
      { label: 'Dashboard', icon: LayoutDashboard, to: '/Dashboard' },
    ]
  },
  {
    label: 'EMPLOYEES',
    items: [
      { label: 'Employee Master', icon: Users, to: '/EmployeeMaster', sub: [
        { label: 'Employee Profile', to: '/EmployeeProfile' },
        { label: 'Service Book', to: '/ServiceBook' },
      ]},
      { label: 'Promote & Transfer', icon: TrendingUp, to: '/PromotionTransfer', sub: [
        { label: 'Roster Management', to: '/RosterManagement' },
        { label: 'Recruitment', to: '/RecruitmentOnboarding' },
      ]},
      { label: 'Disciplinary', icon: Shield, to: '/DisciplinaryProceedings' },
      { label: 'Court Cases', icon: Scale, to: '/CourtCases' },
      { label: 'ACR / Performance', icon: ClipboardList, to: '/ACRPerformance' },
    ]
  },
  {
    label: 'WORKFORCE',
    items: [
      { label: 'Outsourced Staff', icon: Briefcase, to: '/OutsourcedWorkforce' },
      { label: 'Training & Dev', icon: GraduationCap, to: '/TrainingDevelopment' },
      { label: 'Health & Safety', icon: HardHat, to: '/HealthSafety' },
      { label: 'ESS / MSS', icon: Monitor, to: '/ESSMSS' },
    ]
  },
  {
    label: 'PAY & BENEFITS',
    items: [
      { label: 'Payroll', icon: DollarSign, to: '/Payroll', sub: [
        { label: 'Pay Register', to: '/PayrollRegister' },
        { label: 'Salary Revision', to: '/SalaryRevision' },
        { label: 'Income Tax', to: '/IncomeTax' },
        { label: 'Budget & Expenditure', to: '/BudgetAllocation' },
        { label: 'IFMS / Treasury', to: '/IFMSIntegration' },
      ]},
      { label: 'NPS & Pension', icon: Landmark, to: '/NPSPension', sub: [
        { label: 'GPF Statement', to: '/GPFStatement' },
        { label: 'Terminal Benefits', to: '/TerminalBenefits' },
        { label: 'Retirement Pipeline', to: '/RetirementPipeline' },
      ]},
      { label: 'Claims & Medical', icon: Truck, to: '/ClaimsTravel', sub: [
        { label: 'Medical Reimbursement', to: '/MedicalReimbursement' },
      ]},
    ]
  },
  {
    label: 'ATTENDANCE',
    items: [
      { label: 'Leave Management', icon: Calendar, to: '/LeaveManagement' },
      { label: 'Attendance', icon: Clock, to: '/Attendance', sub: [
        { label: 'Attendance Register', to: '/AttendanceRegister' },
        { label: 'Biometric & Geo', to: '/BiometricGeoAttendance' },
      ]},
    ]
  },
  {
    label: 'POLICY & COMPLIANCE',
    items: [
      { label: 'GO Repository', icon: BookMarked, to: '/GORepository' },
      { label: 'Org Directory', icon: Building2, to: '/OrgDirectory' },
    ]
  },
  {
    label: 'ANALYTICS & AI',
    items: [
      { label: 'Reports & MIS', icon: BarChart3, to: '/ReportsMIS' },
      { label: 'AI Analytics', icon: Lightbulb, to: '/AIAnalytics' },
      { label: 'Agentic AI (ARIA)', icon: Bot, to: '/AgenticAI' },
      { label: 'Zone Dashboard', icon: MapPin, to: '/ZoneDashboard' },
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      { label: 'Notifications', icon: Bell, to: '/NotificationsCenter' },
      { label: 'Workflow Engine', icon: GitBranch, to: '/WorkflowEngine' },
      { label: 'Mobile App', icon: Smartphone, to: '/MobileAppManagement' },
      { label: 'Administration', icon: Settings, to: '/Administration' },
    ]
  },
]

export default function Sidebar({ active }: SidebarProps) {
  const [openSubs, setOpenSubs] = useState<string[]>([])

  const toggleSub = (label: string) => {
    setOpenSubs(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col z-40" style={{ backgroundColor: '#073330' }}>
      <div className="flex items-center gap-2.5 px-3 py-3 border-b border-white/10 flex-shrink-0">
        <img
          src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/41f54b7a-50d1-4037-b538-6ac5a7407147/ca5093fc-3083-45f2-9344-0188e64b68a6.png"
          alt="GHMC Logo"
          className="w-9 h-9 rounded-full object-cover flex-shrink-0 bg-white"
        />
        <div>
          <div className="text-white font-bold text-sm leading-tight">GHMC HRMS</div>
          <div className="text-xs" style={{ color: '#F081BD', fontSize: '9px' }}>AMIGO TECHNO PARK</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {groups.map((group) => (
          <div key={group.label} className="mb-1">
            <p className="text-white/25 text-xs font-bold tracking-widest px-2 py-1 mt-1" style={{ fontSize: '9px' }}>{group.label}</p>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = active === item.label
              const hasSub = item.sub && item.sub.length > 0
              const isOpen = openSubs.includes(item.label)

              return (
                <div key={item.label}>
                  {hasSub ? (
                    <button
                      onClick={() => toggleSub(item.label)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 cursor-pointer transition-all duration-150 text-xs font-medium ${
                        isActive ? 'text-white' : 'text-teal-100/60 hover:text-white hover:bg-white/5'
                      }`}
                      style={isActive ? { backgroundColor: 'rgba(36,140,124,0.25)', borderLeft: '3px solid #EC3898', paddingLeft: '7px' } : {}}
                    >
                      <Icon size={14} className="flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown size={12} className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 cursor-pointer transition-all duration-150 text-xs font-medium ${
                        isActive ? 'text-white' : 'text-teal-100/60 hover:text-white hover:bg-white/5'
                      }`}
                      style={isActive ? { backgroundColor: 'rgba(36,140,124,0.25)', borderLeft: '3px solid #EC3898', paddingLeft: '7px' } : {}}
                    >
                      <Icon size={14} className="flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                  {hasSub && isOpen && (
                    <div className="ml-5 mb-1">
                      {item.sub!.map((s) => (
                        <Link
                          key={s.label}
                          to={s.to}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg mb-0.5 cursor-pointer transition-all duration-150 text-teal-300/45 hover:text-teal-100 hover:bg-white/5"
                          style={{ fontSize: '11px' }}
                        >
                          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#EC3898', opacity: 0.5 }} />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="px-3 py-2 border-t border-white/10 flex-shrink-0">
        <p className="text-blue-300/40" style={{ fontSize: '10px' }}>v2.1 © Amigo Techno Park 2026</p>
      </div>
    </aside>
  )
}
