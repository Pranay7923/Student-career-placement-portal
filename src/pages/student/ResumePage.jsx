import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Award,
  Briefcase,
  Layers,
  FileBadge,
  CheckCircle2,
  Sparkles,
  Edit3
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Link } from 'react-router-dom';

export const ResumePage = () => {
  const { profile, skills, projects, certifications, internships } = useData();
  const { currentUser } = useAuth();
  
  const [template, setTemplate] = useState('modern'); // 'modern' | 'classic' | 'minimal'

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Action Bar (Hidden during Print) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">ATS-Ready Resume Builder & Preview</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data is auto-synchronized from your profile, projects, and certifications.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Template Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                template === 'modern' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTemplate('classic')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                template === 'classic' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classic ATS
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Printer}
            onClick={handlePrint}
          >
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Resume Paper Container (Target for Print) */}
      <div className="flex justify-center">
        <div
          id="resume-print-area"
          className={`w-full max-w-4xl bg-white shadow-lg border border-slate-200 rounded-2xl p-8 sm:p-12 transition-all ${
            template === 'modern' ? 'font-sans' : 'font-serif'
          }`}
          style={{ minHeight: '1050px' }}
        >
          {/* Header */}
          <div className={`pb-6 border-b ${template === 'modern' ? 'border-indigo-100' : 'border-slate-300'}`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {profile.fullName || currentUser?.name || 'Aarav Sharma'}
              </h1>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                {profile.branch || currentUser?.branch || 'Computer Science & Engineering'}
              </span>
            </div>

            {/* Contact Meta Line */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-3 text-xs text-slate-600">
              {profile.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {profile.email}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {profile.phone}
                </span>
              )}
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.location}
                </span>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline">
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-800 hover:underline">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
              {profile.portfolio && (
                <a href={profile.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-emerald-600 hover:underline">
                  <Globe className="w-3.5 h-3.5" />
                  Portfolio
                </a>
              )}
            </div>
          </div>

          {/* Section: Career Objective */}
          {profile.careerObjective && (
            <div className="mt-6">
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b ${
                template === 'modern' ? 'text-indigo-800 border-indigo-100' : 'text-slate-900 border-slate-300'
              }`}>
                Career Objective
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {profile.careerObjective}
              </p>
            </div>
          )}

          {/* Section: Education */}
          <div className="mt-6">
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b ${
              template === 'modern' ? 'text-indigo-800 border-indigo-100' : 'text-slate-900 border-slate-300'
            }`}>
              Education
            </h3>
            
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 font-bold">{profile.college || currentUser?.college}</strong>
                  <span className="block text-slate-600">Bachelor of Technology ({profile.branch || currentUser?.branch})</span>
                </div>
                <div className="text-right mt-1 sm:mt-0">
                  <span className="font-semibold text-slate-800">{profile.year || '2022 - 2026'}</span>
                  {profile.cgpa && (
                    <span className="block text-indigo-700 font-bold">CGPA: {profile.cgpa} / 10</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Technical Skills */}
          {skills.length > 0 && (
            <div className="mt-6">
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b ${
                template === 'modern' ? 'text-indigo-800 border-indigo-100' : 'text-slate-900 border-slate-300'
              }`}>
                Technical & Core Skills
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                <div>
                  <strong className="text-slate-800">Languages & Web: </strong>
                  <span className="text-slate-600">
                    {skills.filter(s => s.category === 'Web Development' || s.category === 'Programming').map(s => s.name).join(', ') || 'React, JavaScript, Python, SQL'}
                  </span>
                </div>
                <div>
                  <strong className="text-slate-800">Advanced / Domain: </strong>
                  <span className="text-slate-600">
                    {skills.filter(s => s.category === 'AI/ML' || s.category === 'Data Analytics' || s.proficiency === 'Advanced').map(s => s.name).join(', ') || 'DSA, System Design, Git'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Section: Work Experience / Internships */}
          {internships.length > 0 && (
            <div className="mt-6">
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b ${
                template === 'modern' ? 'text-indigo-800 border-indigo-100' : 'text-slate-900 border-slate-300'
              }`}>
                Work & Internship Experience
              </h3>

              <div className="space-y-3">
                {internships.map(intern => (
                  <div key={intern.id} className="text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-slate-900">
                      <span>{intern.role} • <span className="text-indigo-700">{intern.company}</span></span>
                      <span className="text-slate-500 font-normal text-[11px]">{intern.duration}</span>
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {intern.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Projects */}
          {projects.length > 0 && (
            <div className="mt-6">
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b ${
                template === 'modern' ? 'text-indigo-800 border-indigo-100' : 'text-slate-900 border-slate-300'
              }`}>
                Projects
              </h3>

              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <strong className="font-bold text-slate-900">{proj.title}</strong>
                        {proj.technologies && (
                          <span className="text-slate-500 text-[11px]">| {proj.technologies}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0 text-[11px]">
                        {proj.githubLink && (
                          <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                            Code
                          </a>
                        )}
                        {proj.demoLink && (
                          <a href={proj.demoLink} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 mt-1 leading-relaxed">
                      {proj.description}
                    </p>
                    {proj.highlights && (
                      <p className="text-[11px] text-indigo-700 font-semibold mt-0.5">
                        • Key Highlight: {proj.highlights}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Certifications */}
          {certifications.length > 0 && (
            <div className="mt-6">
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b ${
                template === 'modern' ? 'text-indigo-800 border-indigo-100' : 'text-slate-900 border-slate-300'
              }`}>
                Certifications
              </h3>

              <div className="space-y-1.5 text-xs">
                {certifications.map(cert => (
                  <div key={cert.id} className="flex justify-between items-center text-slate-700">
                    <div>
                      <strong className="text-slate-900">{cert.name}</strong> — {cert.organization}
                    </div>
                    <span className="text-slate-500 text-[11px]">{new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Honors & Achievements */}
          {profile.achievements?.length > 0 && (
            <div className="mt-6">
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b ${
                template === 'modern' ? 'text-indigo-800 border-indigo-100' : 'text-slate-900 border-slate-300'
              }`}>
                Honors & Key Achievements
              </h3>

              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                {profile.achievements.map((ach, idx) => (
                  <li key={idx} className="leading-relaxed">{ach}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
