'use client'
import React from 'react'
import { Search, Bell, LogOut } from 'lucide-react'
import { Link } from '@/lib'

interface TopBarProps {
  notifCount?: number
}

export default function TopBar({ notifCount = 6 }: TopBarProps) {
  return (
    <header className="fixed top-0 left-56 right-0 h-14 bg-white flex items-center justify-between px-6 z-30" style={{ borderBottom: '2px solid #248C7C' }}>
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees, reports..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2"
            style={{ border: '1px solid #A0CCC4' }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-500" />
          {notifCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white text-xs rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#EC3898', fontSize: '10px' }}>
              {notifCount}
            </span>
          )}
        </div>
        <div className="h-6 w-px bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #248C7C, #073330)' }}>
            SA
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">Sri Amrapali K. Das, IAS</p>
            <p className="text-xs font-medium" style={{ color: '#248C7C' }}>Commissioner</p>
          </div>
        </div>
        <Link to="/Login" className="cursor-pointer transition-colors" style={{ color: '#248C7C' }}>
          <LogOut size={18} />
        </Link>
      </div>
    </header>
  )
}
