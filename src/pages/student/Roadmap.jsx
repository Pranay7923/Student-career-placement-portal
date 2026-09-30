import React from 'react';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Circle,
  TrendingUp,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

export const Roadmap = () => {
  const { roadmap, updateRoadmapTaskStatus } = useData();

  // Compute total roadmap stats
  let totalTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;

  roadmap.forEach(phase => {
    (phase.tasks || []).forEach(task => {
      totalTasks++;
      if (task.status === 'Completed') completedTasks++;
      else if (task.status === 'In Progress') inProgressTasks++;
    });
  });

  const overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const calculatePhaseProgress = (tasks = []) => {
    if (!tasks.length) return 0;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / tasks.length) * 100);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="emerald" size="sm">Completed</Badge>;
      case 'In Progress':
        return <Badge variant="indigo" size="sm">In Progress</Badge>;
      default:
        return <Badge variant="slate" size="sm">Not Started</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Structured 6-Phase Placement Blueprint</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Placement Preparation Roadmap
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Track your journey from core aptitude and CS fundamentals to DSA, system design, portfolio polish, and high-pressure mock interviews.
            </p>
          </div>

          <div className="w-full md:w-72 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-slate-700">Roadmap Progress</span>
              <span className="font-black text-indigo-700 text-base">{overallPercentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-2">
              <span>{completedTasks} of {totalTasks} Tasks Done</span>
              <span>{inProgressTasks} In Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Phases Timeline Grid */}
      <div className="space-y-6">
        {roadmap.map((phase, index) => {
          const phaseProgress = calculatePhaseProgress(phase.tasks);

          return (
            <Card key={phase.phaseId} noPadding>
              <div className="p-5 bg-gradient-to-r from-slate-50 via-white to-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
                    phaseProgress === 100
                      ? 'bg-emerald-600 text-white shadow-emerald-200'
                      : phaseProgress > 0
                      ? 'bg-indigo-600 text-white shadow-indigo-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {phaseProgress === 100 ? <CheckCircle2 className="w-5 h-5" /> : `0${phase.phaseId}`}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{phase.phaseTitle}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                  </div>
                </div>

                <div className="w-full sm:w-44 flex-shrink-0">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-[11px] font-semibold text-slate-500">Phase Completion</span>
                    <span className="font-bold text-indigo-700">{phaseProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        phaseProgress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${phaseProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="p-5 divide-y divide-slate-100">
                {phase.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const nextStatus =
                            task.status === 'Completed'
                              ? 'Not Started'
                              : task.status === 'In Progress'
                              ? 'Completed'
                              : 'In Progress';
                          updateRoadmapTaskStatus(phase.phaseId, task.id, nextStatus);
                        }}
                        className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                          task.status === 'Completed'
                            ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                            : task.status === 'In Progress'
                            ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                            : 'text-slate-300 hover:text-slate-500 bg-slate-100'
                        }`}
                        title="Click to toggle status"
                      >
                        {task.status === 'Completed' && <CheckCircle2 className="w-4 h-4" />}
                        {task.status === 'In Progress' && <Clock className="w-4 h-4" />}
                        {task.status === 'Not Started' && <Circle className="w-4 h-4" />}
                      </button>

                      <span className={`text-xs sm:text-sm font-medium ${
                        task.status === 'Completed' ? 'text-slate-500 line-through' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <select
                        value={task.status}
                        onChange={(e) => updateRoadmapTaskStatus(phase.phaseId, task.id, e.target.value)}
                        className={`text-xs font-semibold rounded-xl px-2.5 py-1.5 border outline-none cursor-pointer transition-all ${
                          task.status === 'Completed'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : task.status === 'In Progress'
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

    </div>
  );
};
