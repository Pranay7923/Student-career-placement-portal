import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award,
  FileBadge,
  Layers,
  Briefcase,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bookmark,
  Calendar,
  MapPin,
  Building,
  BellRing,
  Clock,
  ExternalLink,
  ChevronRight,
  PlusCircle,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ReadinessWidget } from '../../components/dashboard/ReadinessWidget';
import { ApplyModal } from '../../components/opportunities/ApplyModal';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const {
    profile,
    skills,
    certifications,
    projects,
    internships,
    testResults,
    opportunities,
    bookmarks,
    toggleBookmark,
    appliedJobs,
    applyToOpportunity,
    recentActivities,
    announcements,
    readiness
  } = useData();

  const navigate = useNavigate();
  const [selectedOppForApply, setSelectedOppForApply] = useState(null);

  // Calculate average aptitude score
  const aptitudeAverage = testResults.length > 0
    ? Math.round(testResults.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / testResults.length)
    : 0;

  // Recommended actions logic
  const recommendedActions = [
    {
      id: 'act_profile',
      title: 'Complete Profile Details',
      desc: profile.cgpa && profile.linkedin ? 'Profile is in good shape' : 'Add CGPA, LinkedIn & Portfolio URL',
      completed: !!(profile.cgpa && profile.linkedin),
      link: '/profile',
      btnText: 'Update Profile'
    },
    {
      id: 'act_skills',
      title: 'Verify Technical Skills',
      desc: skills.length >= 5 ? `${skills.length} skills listed` : 'Add at least 5 key technical & soft skills',
      completed: skills.length >= 5,
      link: '/skills',
      btnText: 'Add Skills'
    },
    {
      id: 'act_project',
      title: 'Showcase Live Project',
      desc: projects.length >= 2 ? `${projects.length} projects documented` : 'Add a full-stack or domain project with GitHub link',
      completed: projects.length >= 2,
      link: '/projects',
      btnText: 'Add Project'
    },
    {
      id: 'act_aptitude',
      title: 'Attempt Mock Aptitude Test',
      desc: testResults.length > 0 ? `${testResults.length} tests completed (Avg: ${aptitudeAverage}%)` : 'Take a 15-minute diagnostic test',
      completed: testResults.length > 0,
      link: '/aptitude',
      btnText: 'Start Test'
    },
    {
      id: 'act_resume',
      title: 'Generate Professional Resume',
      desc: 'Preview and print your ATS-friendly resume',
      completed: projects.length > 0 && skills.length > 0,
      link: '/resume',
      btnText: 'View Resume'
    }
  ];

  const featuredOpportunities = opportunities.slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Important Announcement Banner */}
      {announcements.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-indigo-800 text-white shadow-sm flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-xl flex-shrink-0 mt-0.5">
              <BellRing className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/80 px-2 py-0.5 rounded-full">
                  Announcement
                </span>
                <span className="text-xs text-indigo-200">{announcements[0].date}</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">{announcements[0].title}</h4>
              <p className="text-xs text-indigo-100 mt-0.5 max-w-3xl leading-relaxed">
                {announcements[0].content}
              </p>
            </div>
          </div>
          <Link
            to="/notifications"
            className="text-xs font-semibold text-indigo-200 hover:text-white whitespace-nowrap hidden sm:block"
          >
            All Updates →
          </Link>
        </div>
      )}

      {/* Student Welcome Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'Student'}`}
              alt={currentUser?.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-50 border border-white shadow-sm flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Welcome back, {profile.fullName || currentUser?.name}!
                </h2>
                {profile.cgpa && (
                  <Badge variant="emerald" size="sm">
                    CGPA: {profile.cgpa} / 10
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                <span>{profile.college || currentUser?.college}</span>
                <span>•</span>
                <span className="font-semibold text-slate-700">{profile.branch || currentUser?.branch}</span>
                <span>•</span>
                <span>{profile.year || currentUser?.year}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={UserCheck}
              onClick={() => navigate('/profile')}
              className="flex-1 sm:flex-none"
            >
              Edit Profile
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              onClick={() => navigate('/resume')}
              className="flex-1 sm:flex-none"
            >
              Resume Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics 6-Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Readiness</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-700">{readiness.total}%</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Overall index</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Skills</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{skills.length}</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Verified tags</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Certs</span>
            <FileBadge className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{certifications.length}</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Credentials</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Projects</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{projects.length}</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Repositories</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Internships</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{internships.length}</div>
          <p className="text-[10px] text-slate-400 mt-0.5">Industrial exp</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Aptitude Avg</span>
            <HelpCircle className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{aptitudeAverage}%</div>
          <p className="text-[10px] text-slate-400 mt-0.5">{testResults.length} tests taken</p>
        </div>

      </div>

      {/* Placement Readiness Progress Widget */}
      <ReadinessWidget />

      {/* 2-Column Section: Recommended Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recommended Actions (2 Columns on Large) */}
        <div className="lg:col-span-2">
          <Card
            title="Recommended Placement Actions"
            subtitle="Follow these high-impact steps to boost your readiness percentage"
            headerAction={
              <Link to="/roadmap" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View Roadmap →
              </Link>
            }
          >
            <div className="space-y-3">
              {recommendedActions.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    item.completed
                      ? 'bg-slate-50/70 border-slate-200 opacity-80'
                      : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      item.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {item.completed ? <CheckCircle2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${item.completed ? 'text-slate-600 line-through' : 'text-slate-900'}`}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>

                  <Link
                    to={item.link}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      item.completed
                        ? 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                        : 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs'
                    }`}
                  >
                    {item.completed ? 'Review' : item.btnText}
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-1">
          <Card
            title="Recent Activity"
            subtitle="Your latest achievements & submissions"
          >
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {recentActivities.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No recent activity logged yet.</p>
              ) : (
                recentActivities.map((act) => (
                  <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                    <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-indigo-600 flex-shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-bold text-slate-800 truncate">{act.title}</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{act.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{act.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

      </div>

      {/* Recommended Opportunities Section */}
      <Card
        title="Recommended Campus Drives & Opportunities"
        subtitle="Curated roles matching your batch and branch eligibility"
        headerAction={
          <Link to="/opportunities" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
            Explore All ({opportunities.length}) →
          </Link>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredOpportunities.map((opp) => {
            const isBookmarked = bookmarks.includes(opp.id);
            const isApplied = appliedJobs.some(a => a.opportunityId === opp.id);

            return (
              <div
                key={opp.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={opp.companyLogo}
                        alt={opp.company}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-xs"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">{opp.position}</h4>
                        <p className="text-xs font-semibold text-slate-600">{opp.company}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(opp.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isBookmarked
                          ? 'bg-amber-50 border-amber-200 text-amber-600'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Save bookmark'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge variant={opp.type === 'Job' ? 'indigo' : 'purple'}>
                      {opp.type}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {opp.location} ({opp.workMode})
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                      {opp.salary}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2.5 line-clamp-2">
                    {opp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Deadline: <strong className="text-slate-700">{opp.deadline}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={isApplied ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => setSelectedOppForApply(opp)}
                    >
                      {isApplied ? 'Application Sent' : 'Apply Now'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Apply Modal */}
      {selectedOppForApply && (
        <ApplyModal
          opportunity={selectedOppForApply}
          isOpen={!!selectedOppForApply}
          onClose={() => setSelectedOppForApply(null)}
        />
      )}

    </div>
  );
};
