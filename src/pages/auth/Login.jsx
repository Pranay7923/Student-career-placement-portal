import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const Login = () => {
  const { login, loginDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      showToast(`Welcome back, ${result.user.name}!`, 'success');
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message);
    }
  };

  const handleDemoLogin = (role) => {
    const result = loginDemo(role);
    if (result.success) {
      showToast(`Signed in as ${role === 'admin' ? 'Admin' : 'Student'} Demo account!`, 'success');
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">CareerSync</h2>
            <p className="text-xs text-indigo-300 font-medium">Student Career & Placement Portal</p>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-slate-100">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Sign in to your account</h3>
            <p className="text-xs text-slate-500 mt-1">
              Access your personalized placement roadmap, mock tests, and jobs
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 shadow-md shadow-indigo-200 transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Fast Demo Logins */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
              ⚡ Instant Demo Access
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>Demo Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-800">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
