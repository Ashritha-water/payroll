'use client'
import React, { useState } from 'react'
import { Link } from '@/lib'
import { Eye, EyeOff, HelpCircle } from 'lucide-react'

const roles = [
  { id: 'commissioner', label: 'Commissioner', name: 'Sri R.V.Karnan, IAS', to: '/Dashboard' },
  { id: 'additional', label: 'Additional Commissioner', name: 'Dr. Priyanka Ala, IAS', to: '/Dashboard' },
  { id: 'zonal', label: 'Zonal Commissioner', name: 'Smt. K.Chandrakala', to: '/ZoneDashboard' },
  { id: 'deputy', label: 'Deputy Commissioner', name: 'D.Jagan', to: '/AttendanceRegister' },
]

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('commissioner')
  const [showPass, setShowPass] = useState(false)

  const selectedUser = roles.find(r => r.id === selectedRole)

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#042220', backgroundImage: 'radial-gradient(ellipse at 20% 60%, rgba(36,140,124,0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(236,56,152,0.12) 0%, transparent 45%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute" style={{ left: `${i * 14}%`, top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(36,140,124,0.08)' }} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute" style={{ top: `${i * 18}%`, left: 0, right: 0, height: '1px', backgroundColor: 'rgba(36,140,124,0.08)' }} />
        ))}
      </div>

      <div className="relative w-full max-w-md mx-4 rounded-2xl p-8 shadow-2xl" style={{ backgroundColor: 'rgba(7,51,48,0.95)', border: '1px solid rgba(36,140,124,0.25)' }}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full mb-4 overflow-hidden bg-white p-1 shadow-lg" style={{ boxShadow: '0 0 0 3px #248C7C, 0 0 0 6px rgba(236,56,152,0.3)' }}>
            <img
              src="https://wemxiqpkiyrwpffrdrgu.supabase.co/storage/v1/object/public/public-assets/projects/41f54b7a-50d1-4037-b538-6ac5a7407147/ca5093fc-3083-45f2-9344-0188e64b68a6.png"
              alt="GHMC Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">GHMC HRMS & Payroll</h1>
          <p className="text-xs font-semibold tracking-widest mt-1" style={{ color: '#5EAA9C' }}>HUMAN RESOURCE MANAGEMENT SYSTEM</p>
          <p className="text-xs mt-1" style={{ color: '#F081BD' }}>Powered by Amigo Techno Park Pvt Ltd</p>
        </div>

        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: '#5EAA9C' }}>SELECT ROLE FOR DEMO</p>
          <div className="grid grid-cols-2 gap-2">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`text-left px-3 py-3 rounded-xl border transition-all cursor-pointer`}
                style={selectedRole === role.id
                  ? { borderColor: '#EC3898', backgroundColor: 'rgba(236,56,152,0.1)' }
                  : { borderColor: 'rgba(36,140,124,0.2)', backgroundColor: 'rgba(36,140,124,0.05)' }
                }
              >
                <p className="text-sm font-bold" style={{ color: selectedRole === role.id ? '#F081BD' : 'white' }}>{role.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#5EAA9C' }}>{role.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold tracking-widest block mb-2" style={{ color: '#5EAA9C' }}>EMPLOYEE ID / USERNAME</label>
          <input
            type="text"
            value={selectedUser?.name || ''}
            readOnly
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
            style={{ backgroundColor: 'rgba(36,140,124,0.08)', border: '1px solid rgba(36,140,124,0.25)' }}
          />
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold tracking-widest block mb-2" style={{ color: '#5EAA9C' }}>PASSWORD</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              defaultValue="password123"
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none pr-11"
              style={{ backgroundColor: 'rgba(36,140,124,0.08)', border: '1px solid rgba(36,140,124,0.25)' }}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
              style={{ color: '#5EAA9C' }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Link to={selectedUser?.to || '/Dashboard'}>
          <button className="w-full py-3.5 rounded-xl font-bold text-base cursor-pointer transition-all hover:opacity-90 active:scale-[0.98] text-white" style={{ background: 'linear-gradient(135deg, #248C7C 0%, #073330 100%)', boxShadow: '0 4px 15px rgba(36,140,124,0.35)' }}>
            Sign In to HRMS
          </button>
        </Link>

        <div className="flex justify-between mt-4">
          <button className="text-xs cursor-pointer transition-colors hover:text-white" style={{ color: '#5EAA9C' }}>Forgot Password?</button>
          <button className="text-xs cursor-pointer transition-colors hover:text-white flex items-center gap-1" style={{ color: '#5EAA9C' }}>
            <HelpCircle size={12} /> Help & Support
          </button>
        </div>
      </div>
    </div>
  )
}
