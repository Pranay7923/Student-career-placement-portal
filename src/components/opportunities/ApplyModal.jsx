import React, { useState } from 'react';
import { Building, MapPin, Briefcase, Calendar, CheckCircle2, ExternalLink, Send } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useData } from '../../context/DataContext';

export const ApplyModal = ({ opportunity, isOpen, onClose }) => {
  const { applyToOpportunity, appliedJobs } = useData();
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!opportunity) return null;

  const alreadyApplied = appliedJobs.some(a => a.opportunityId === opportunity.id);

  const handleApply = () => {
    setSubmitting(true);
    setTimeout(() => {
      applyToOpportunity(opportunity.id);
      setSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={opportunity.position}
      subtitle={opportunity.company}
      maxWidth="max-w-2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          {opportunity.applyUrl && (
            <a
              href={opportunity.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <span>Company Careers Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          
          <div className="flex items-center gap-2.5 ml-auto">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant={alreadyApplied || isSuccess ? 'success' : 'primary'}
              size="sm"
              icon={alreadyApplied || isSuccess ? CheckCircle2 : Send}
              onClick={handleApply}
              loading={submitting}
              disabled={alreadyApplied || isSuccess}
            >
              {isSuccess ? 'Submitted!' : alreadyApplied ? 'Already Applied' : 'Submit Campus Application'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {isSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-medium animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Your application has been registered with the Training & Placement Cell!</span>
          </div>
        )}

        {/* Header summary */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <img
            src={opportunity.companyLogo}
            alt={opportunity.company}
            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
          />
          <div>
            <h4 className="text-base font-bold text-slate-900">{opportunity.company}</h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap text-xs">
              <Badge variant="indigo">{opportunity.type}</Badge>
              <span className="text-slate-600 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {opportunity.location} ({opportunity.workMode})
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {opportunity.salary}
              </span>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3 text-xs text-slate-700">
          <div>
            <span className="font-bold text-slate-900 block mb-1">Job Description & Responsibilities:</span>
            <p className="bg-white p-3 rounded-xl border border-slate-200 leading-relaxed text-slate-600">
              {opportunity.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Eligibility Criteria:</span>
              <p className="text-slate-600">{opportunity.eligibility}</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Application Deadline:</span>
              <p className="font-semibold text-rose-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {opportunity.deadline}
              </p>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-900 block mb-1">Required Skills & Technologies:</span>
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap gap-1.5">
              {opportunity.requiredSkills.split(',').map((skill, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 font-medium px-2 py-1 rounded-lg text-[11px]">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
