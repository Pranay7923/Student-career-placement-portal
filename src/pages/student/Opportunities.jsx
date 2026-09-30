import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Calendar,
  Building,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  DollarSign,
  Send,
  Layers
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { ApplyModal } from '../../components/opportunities/ApplyModal';

export const Opportunities = () => {
  const { opportunities, bookmarks, toggleBookmark, appliedJobs } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [typeFilter, setTypeFilter] = useState('All'); // All | Job | Internship
  const [workModeFilter, setWorkModeFilter] = useState('All'); // All | Remote | Hybrid | Onsite
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showAppliedOnly, setShowAppliedOnly] = useState(false);

  const [selectedOppForApply, setSelectedOppForApply] = useState(null);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query ||
        opp.company.toLowerCase().includes(query) ||
        opp.position.toLowerCase().includes(query) ||
        opp.location.toLowerCase().includes(query) ||
        opp.requiredSkills.toLowerCase().includes(query);

      const matchesType = typeFilter === 'All' || opp.type === typeFilter;
      const matchesMode = workModeFilter === 'All' || opp.workMode === workModeFilter;
      const matchesBookmark = !showBookmarksOnly || bookmarks.includes(opp.id);
      const matchesApplied = !showAppliedOnly || appliedJobs.some(a => a.opportunityId === opp.id);

      return matchesSearch && matchesType && matchesMode && matchesBookmark && matchesApplied;
    });
  }, [opportunities, searchQuery, typeFilter, workModeFilter, showBookmarksOnly, showAppliedOnly, bookmarks, appliedJobs]);

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('All');
    setWorkModeFilter('All');
    setShowBookmarksOnly(false);
    setShowAppliedOnly(false);
    setSearchParams({});
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Campus Drives & Career Opportunities</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover full-time SDE roles, summer internships, and graduate engineer training programs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showBookmarksOnly ? 'primary' : 'outline'}
            size="sm"
            icon={Bookmark}
            onClick={() => {
              setShowBookmarksOnly(!showBookmarksOnly);
              setShowAppliedOnly(false);
            }}
          >
            Saved ({bookmarks.length})
          </Button>

          <Button
            variant={showAppliedOnly ? 'primary' : 'outline'}
            size="sm"
            icon={CheckCircle2}
            onClick={() => {
              setShowAppliedOnly(!showAppliedOnly);
              setShowBookmarksOnly(false);
            }}
          >
            Applied ({appliedJobs.length})
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card noPadding>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by company, role title, or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="All">All Types (Job & Internship)</option>
                <option value="Job">Full-time Jobs Only</option>
                <option value="Internship">Internships Only</option>
              </select>
            </div>

            {/* Work Mode Filter */}
            <div>
              <select
                value={workModeFilter}
                onChange={(e) => setWorkModeFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="All">All Modes (Remote / Hybrid / Onsite)</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>

          </div>

          {/* Active Filter Chips */}
          {(searchQuery || typeFilter !== 'All' || workModeFilter !== 'All' || showBookmarksOnly || showAppliedOnly) && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Showing {filteredOpportunities.length} opportunities</span>
              <button
                onClick={clearFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Opportunities List */}
      {filteredOpportunities.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No matching opportunities found"
          description="Try broadening your search parameters or clearing filters."
          actionText="Clear Filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredOpportunities.map((opp) => {
            const isBookmarked = bookmarks.includes(opp.id);
            const isApplied = appliedJobs.some(a => a.opportunityId === opp.id);

            return (
              <div
                key={opp.id}
                className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={opp.companyLogo}
                        alt={opp.company}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">{opp.position}</h3>
                        <p className="text-xs font-semibold text-indigo-700">{opp.company}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(opp.id)}
                      className={`p-2 rounded-xl border transition-colors ${
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
                    <Badge variant={opp.type === 'Job' ? 'indigo' : 'purple'} size="sm">
                      {opp.type}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full text-[11px] font-medium">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {opp.location} • {opp.workMode}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                      {opp.salary}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                    <p className="text-slate-500 text-[11px]">
                      <strong className="text-slate-700">Eligibility:</strong> {opp.eligibility}
                    </p>
                    <p className="text-slate-500 text-[11px] line-clamp-1">
                      <strong className="text-slate-700">Required Skills:</strong> {opp.requiredSkills}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
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
      )}

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
