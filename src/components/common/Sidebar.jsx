import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Award,
  FileBadge,
  Briefcase,
  Layers,
  HelpCircle,
  MapPin,
  FileText,
  Bell,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { readiness, notifications } = useData();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const studentNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/profile', icon: UserCheck },
    { label: 'Skills', path: '/skills', icon: Award },
    { label: 'Certifications', path: '/certifications', icon: FileBadge },
    { label: 'Projects', path: '/projects', icon: Layers },
    { label: 'Jobs & Internships', path: '/opportunities', icon: Briefcase },
    { label: 'Aptitude Practice', path: '/aptitude', icon: HelpCircle },
    { label: 'Preparation Roadmap', path: '/roadmap', icon: MapPin },
    { label: 'Resume', path: '/resume', icon: FileText },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const adminNavItems = [
    { label: 'Admin Overview', path: '/admin', icon: ShieldAlert },
    { label: 'Registered Students', path: '/admin/students', icon: UserCheck },
    { label: 'Placement Drives', path: '/admin/opportunities', icon: Briefcase },
    { label: 'Aptitude Bank', path: '/admin/aptitude', icon: HelpCircle },
    { label: 'Announcements', path: '/admin/announcements', icon: Bell },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navClass = ({ isActive }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  const iconClass = (isActive) =>
    `w-4 h-4 flex-shrink-0 transition-colors ${
      isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-200">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight">CareerSync</span>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Placement Portal</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-slate-200/80">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'User'}`}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm ring-1 ring-slate-200 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</h4>
              <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
              <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {isAdmin ? 'Placement Admin' : `${currentUser?.year || 'Final Year'} Student`}
              </span>
            </div>
          </div>

          {/* Readiness Mini Indicator (Students only) */}
          {!isAdmin && (
            <div className="mt-3 pt-3 border-t border-slate-200/60">
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="font-semibold text-slate-600">Readiness Score</span>
                <span className="font-bold text-indigo-700">{readiness.total}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${readiness.total}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {isAdmin ? 'Admin Management' : 'Student Navigation'}
          </div>

          {isAdmin ? (
            adminNavItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={navClass}
                  onClick={() => onClose?.()}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={iconClass(isActive)} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                    </>
                  )}
                </NavLink>
              );
            })
          ) : (
            studentNavItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navClass}
                  onClick={() => onClose?.()}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={iconClass(isActive)} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive ? 'bg-white text-indigo-700' : 'bg-rose-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-300'}`} />
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })
          )}

          {/* Quick Switch Role Link for Demonstration */}
          <div className="pt-4 mt-4 border-t border-slate-100 px-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Role Switcher
            </div>
            {isAdmin ? (
              <NavLink
                to="/dashboard"
                className="flex items-center gap-2.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium py-1.5 hover:underline"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Switch to Student View</span>
              </NavLink>
            ) : (
              <NavLink
                to="/admin"
                className="flex items-center gap-2.5 text-xs text-purple-600 hover:text-purple-800 font-medium py-1.5 hover:underline"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Switch to Admin Panel</span>
              </NavLink>
            )}
          </div>
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
