import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Briefcase,
  HelpCircle,
  TrendingUp,
  Award,
  Bell,
  Plus,
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminDashboard = () => {
  const { allStudents, opportunities, aptitudeQuestions, announcements, testResults } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Compute stats
  const totalStudents = allStudents.length;
  const totalJobs = opportunities.filter(o => o.type === 'Job').length;
  const totalInternships = opportunities.filter(o => o.type === 'Internship').length;
  const totalQuestions = aptitudeQuestions.length;

  const avgAptitudeScore = testResults.length > 0
    ? Math.round(testResults.reduce((acc, c) => acc + (c.percentage || 0), 0) / testResults.length)
    : 78;

  const avgReadiness = 76; // Benchmark campus readiness

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30 flex-shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/30 border border-purple-400/40 text-purple-200 px-2 py-0.5 rounded-full">
                  Administrator Portal
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Training & Placement Cell Operations
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Logged in as {currentUser?.name || 'Dr. Ramesh Kulkarni (Placement Dean)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/admin/opportunities')}
            >
              Post Drive
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Bell}
              onClick={() => navigate('/admin/announcements')}
            >
              Broadcast Notice
            </Button>
          </div>
        </div>
      </div>

      {/* 5-Card Analytics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalStudents}</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Registered candidates</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Drives</span>
            <Briefcase className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{opportunities.length}</div>
          <p className="text-[10px] text-slate-400 mt-0.5">{totalJobs} Jobs, {totalInternships} Internships</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aptitude Qs</span>
            <HelpCircle className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalQuestions}</div>
          <p className="text-[10px] text-slate-400 mt-0.5">In question bank</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avg Aptitude</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{avgAptitudeScore}%</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Mock performance</p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avg Readiness</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700">{avgReadiness}%</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Batch readiness index</p>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Link
          to="/admin/students"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Student Directory</h3>
          <p className="text-xs text-slate-500 mt-1">
            View profiles, academic years, branches, and CGPA benchmarks.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 mt-3">
            <span>Manage Candidates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/admin/opportunities"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Placement Drives</h3>
          <p className="text-xs text-slate-500 mt-1">
            Publish new job descriptions, CTC packages, eligibility, and deadlines.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-3">
            <span>Manage Drives ({opportunities.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/admin/aptitude"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Question Bank</h3>
          <p className="text-xs text-slate-500 mt-1">
            Add or edit Quant, Reasoning, and Verbal MCQs with solutions.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 mt-3">
            <span>Manage Questions ({totalQuestions})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/admin/announcements"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Broadcast Notices</h3>
          <p className="text-xs text-slate-500 mt-1">
            Send high-priority placement alerts and PPT schedules.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 mt-3">
            <span>Manage Notices ({announcements.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

      </div>

      {/* Active Campus Drives Overview */}
      <Card
        title="Active Campus Hiring Drives"
        subtitle="Recent drives published for graduating batches"
        headerAction={
          <Link to="/admin/opportunities" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
            View All Drives →
          </Link>
        }
      >
        <div className="divide-y divide-slate-100">
          {opportunities.slice(0, 5).map(opp => (
            <div key={opp.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={opp.companyLogo}
                  alt={opp.company}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{opp.position}</h4>
                  <p className="text-xs text-slate-500">{opp.company} • {opp.location} • <strong className="text-emerald-700">{opp.salary}</strong></p>
                </div>
              </div>

              <div className="text-right">
                <Badge variant={opp.type === 'Job' ? 'indigo' : 'purple'} size="sm">
                  {opp.type}
                </Badge>
                <span className="block text-[11px] text-slate-400 mt-1">
                  Deadline: {opp.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};
