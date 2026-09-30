import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp, Info, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { Link } from 'react-router-dom';

export const ReadinessWidget = () => {
  const { readiness } = useData();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getStatusMessage = (score) => {
    if (score >= 80) return { label: 'High Readiness', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 60) return { label: 'Moderate Readiness', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    return { label: 'Early Stage', color: 'text-amber-800 bg-amber-50 border-amber-200' };
  };

  const status = getStatusMessage(readiness.total);

  return (
    <Card className="border-indigo-100 bg-gradient-to-br from-white via-indigo-50/20 to-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Side: Score & Primary Progress */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">Placement Readiness Index</h3>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${status.color}`}>
              {status.label}
            </span>
          </div>

          <p className="text-xs text-slate-500 max-w-xl">
            A comprehensive, transparent progress indicator computed across your profile, verified skills, projects, certifications, internships, mock aptitude, and roadmap milestones.
          </p>

          {/* Large Main Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs font-semibold text-slate-700">Overall Progress</span>
              <span className="text-2xl font-black text-indigo-700">{readiness.total}%</span>
            </div>
            
            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${readiness.total}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Toggle Breakdown & Quick Stats */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center gap-3">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-all"
          >
            <span>{showBreakdown ? 'Hide Breakdown' : 'View Formula Breakdown'}</span>
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <Link
            to="/roadmap"
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            <span>Follow preparation roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Expanded Breakdown Table / Visual Progress Bars */}
      {showBreakdown && (
        <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
            <Info className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>
              <strong>Note:</strong> This score is a personal preparation-progress indicator to guide your daily effort. It is not an automated employment prediction.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {readiness.breakdown.map((item) => (
              <div key={item.key} className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-800">{item.label}</span>
                  <span className="text-[11px] font-semibold text-slate-400">Weight: {item.weight}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-slate-900 w-9 text-right">{item.score}%</span>
                </div>
                
                <div className="mt-2 flex justify-between items-center text-[10px] text-slate-500">
                  <span>Earned Points:</span>
                  <span className="font-bold text-indigo-700">{item.contribution} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
