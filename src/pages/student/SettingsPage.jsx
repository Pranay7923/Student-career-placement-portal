import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Lock,
  Moon,
  Sun,
  RotateCcw,
  LogOut,
  Download,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { resetToSampleData } from '../../utils/storage';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ConfirmModal } from '../../components/common/ConfirmModal';

export const SettingsPage = () => {
  const { currentUser, logout, updateCurrentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [theme, setTheme] = useState('light');
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('Password should be at least 6 characters', 'error');
      return;
    }

    updateCurrentUser({ password: newPassword });
    showToast('Password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleResetData = () => {
    resetToSampleData();
    setResetModalOpen(false);
    showToast('Portal data reset to initial sample records!', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleExportData = () => {
    const data = {
      user: currentUser,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_sync_profile_${currentUser?.name?.toLowerCase().replace(/\s+/g, '_')}.json`;
    a.click();
    showToast('Profile data exported as JSON file', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Settings & Account Preferences</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your account security, appearance, and local storage data
        </p>
      </div>

      {/* Change Password Card */}
      <Card
        title="Security & Password"
        subtitle="Update your LocalStorage authentication credentials"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Min 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button variant="primary" size="sm" type="submit" icon={Lock}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>

      {/* Theme Preference */}
      <Card
        title="Appearance & Theme"
        subtitle="Customize the portal visual presentation"
      >
        <div className="flex items-center justify-between max-w-lg">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Color Theme</h4>
            <p className="text-xs text-slate-500 mt-0.5">Indigo / Slate Blue (Default SaaS)</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setTheme('light');
                showToast('Light Theme Active', 'info');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                theme === 'light' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Professional Light</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Data Management & Reset */}
      <Card
        title="Local Data & Diagnostics"
        subtitle="Export profile records or restore default sample data"
      >
        <div className="space-y-4 max-w-lg">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Export Profile Snapshot</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Download your profile data as JSON</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleExportData}
            >
              Export JSON
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-xl border border-rose-200">
            <div>
              <h4 className="text-xs font-bold text-rose-900">Reset LocalStorage to Demo Sample Data</h4>
              <p className="text-[11px] text-rose-600 mt-0.5">Clears custom edits and restores pre-built test records</p>
            </div>

            <Button
              variant="danger"
              size="sm"
              icon={RotateCcw}
              onClick={() => setResetModalOpen(true)}
            >
              Reset Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Sign Out Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Sign Out of Session</h4>
            <p className="text-xs text-slate-500 mt-0.5">Signed in as {currentUser?.email}</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={LogOut}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetData}
        title="Reset All Local Data"
        message="This will clear your local storage and reload the pre-populated demo data (Aarav Sharma, 10+ jobs, 20+ MCQs). Continue?"
        confirmText="Reset Now"
        confirmVariant="danger"
      />

    </div>
  );
};
