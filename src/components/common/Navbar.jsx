import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ShieldAlert,
  ChevronDown,
  CheckCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Navbar = ({ onOpenSidebar }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifications = notifications.filter(n => !n.read);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/opportunities?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Student Dashboard';
    if (path.includes('/profile')) return 'My Profile & Details';
    if (path.includes('/skills')) return 'Skills & Proficiencies';
    if (path.includes('/certifications')) return 'Certifications & Credentials';
    if (path.includes('/projects')) return 'Technical Projects';
    if (path.includes('/opportunities')) return 'Campus Drives & Opportunities';
    if (path.includes('/aptitude')) return 'Aptitude Practice & Tests';
    if (path.includes('/roadmap')) return 'Placement Preparation Roadmap';
    if (path.includes('/resume')) return 'Resume Builder & Preview';
    if (path.includes('/notifications')) return 'Notifications & Updates';
    if (path.includes('/settings')) return 'Settings & Preferences';
    if (path.includes('/admin/students')) return 'Admin • Registered Students';
    if (path.includes('/admin/opportunities')) return 'Admin • Placement Drives';
    if (path.includes('/admin/aptitude')) return 'Admin • Question Bank';
    if (path.includes('/admin/announcements')) return 'Admin • Broadcast Announcements';
    if (path.includes('/admin')) return 'Placement Admin Dashboard';
    return 'Placement Portal';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-none">
              {getPageTitle()}
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
              {currentUser?.college || 'National Institute of Technology'}
            </p>
          </div>
        </div>

        {/* Center: Quick Search Bar */}
        <div className="hidden md:block max-w-md w-full mx-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, jobs, skills, or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all outline-none text-slate-800 placeholder-slate-400"
            />
          </form>
        </div>

        {/* Right Side: Notifications & Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Notification Bell Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                    <p className="text-xs text-slate-500">
                      {unreadNotifications.length} unread updates
                    </p>
                  </div>
                  {unreadNotifications.length > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.slice(0, 5).map(item => (
                      <div
                        key={item.id}
                        className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                          !item.read ? 'bg-indigo-50/40' : ''
                        }`}
                        onClick={() => {
                          markNotificationRead(item.id);
                          if (item.link) {
                            navigate(item.link);
                            setShowNotifications(false);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900 leading-tight">
                            {item.title}
                          </h5>
                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {item.message}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1.5 block">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View All Notifications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors focus:outline-none"
            >
              <img
                src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'User'}`}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.name?.split(' ')[0] || 'User'}
                </span>
                <span className="block text-[10px] text-slate-500 font-medium">
                  {isAdmin ? 'Admin' : 'Student'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {isAdmin ? 'Placement Administrator' : currentUser?.branch || 'Engineering'}
                  </span>
                </div>

                <div className="py-1">
                  {!isAdmin ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/resume"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span>Resume Builder</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <ShieldAlert className="w-4 h-4 text-purple-600" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings</span>
                  </Link>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
