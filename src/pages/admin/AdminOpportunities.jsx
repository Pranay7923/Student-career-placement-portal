import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  Search,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminOpportunities = () => {
  const { opportunities, addOpportunity, updateOpportunity, deleteOpportunity } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState(null);
  const [oppToDelete, setOppToDelete] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    type: 'Job',
    location: '',
    workMode: 'Hybrid',
    salary: '',
    requiredSkills: '',
    eligibility: '',
    deadline: '',
    description: '',
    applyUrl: ''
  });

  const openAddModal = () => {
    setEditingOpp(null);
    setFormData({
      company: '',
      position: '',
      type: 'Job',
      location: 'Bengaluru / Hybrid',
      workMode: 'Hybrid',
      salary: '₹18,00,000 - ₹24,00,000 / annum',
      requiredSkills: 'Data Structures, Algorithms, Full-Stack, System Design',
      eligibility: 'B.Tech/M.Tech graduating in 2026 with CGPA >= 7.0',
      deadline: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      description: 'We are seeking passionate engineers to join our high-growth campus engineering cohort...',
      applyUrl: 'https://careers.google.com'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (opp) => {
    setEditingOpp(opp);
    setFormData({
      company: opp.company,
      position: opp.position,
      type: opp.type,
      location: opp.location,
      workMode: opp.workMode,
      salary: opp.salary,
      requiredSkills: opp.requiredSkills,
      eligibility: opp.eligibility,
      deadline: opp.deadline,
      description: opp.description,
      applyUrl: opp.applyUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.position.trim()) return;

    if (editingOpp) {
      updateOpportunity(editingOpp.id, formData);
    } else {
      addOpportunity(formData);
    }
    setIsModalOpen(false);
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const q = searchQuery.toLowerCase().trim();
    return !q ||
      opp.company.toLowerCase().includes(q) ||
      opp.position.toLowerCase().includes(q) ||
      opp.location.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Manage Campus Placement Drives</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, and publish job/internship listings to all registered students
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Post New Drive
        </Button>
      </div>

      {/* Search Bar */}
      <Card noPadding>
        <div className="p-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search published placement drives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </div>
      </Card>

      {/* Drives Grid */}
      {filteredOpportunities.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No opportunities found"
          description="Click the button above to publish a new placement drive."
          actionText="Post Drive"
          onAction={openAddModal}
          actionIcon={Plus}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOpportunities.map(opp => (
            <div
              key={opp.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={opp.companyLogo}
                      alt={opp.company}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{opp.position}</h4>
                      <p className="text-xs text-slate-600">{opp.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(opp)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setOppToDelete(opp)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs mt-3">
                  <Badge variant={opp.type === 'Job' ? 'indigo' : 'purple'} size="sm">
                    {opp.type}
                  </Badge>
                  <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    {opp.location} ({opp.workMode})
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {opp.salary}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                  {opp.description}
                </p>

                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                  <p><strong className="text-slate-700">Eligibility:</strong> {opp.eligibility}</p>
                  <p><strong className="text-slate-700">Deadline:</strong> {opp.deadline}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
                <span>Posted on: {opp.postedDate || 'Active'}</span>
                {opp.applyUrl && (
                  <a
                    href={opp.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>External Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingOpp ? 'Edit Placement Drive' : 'Post New Campus Opportunity'}
        subtitle="This drive will be broadcasted and visible to eligible students"
        maxWidth="max-w-2xl"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              {editingOpp ? 'Save Changes' : 'Publish Opportunity'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Google Cloud, Microsoft"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Role / Position *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Associate Software Engineer"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Opportunity Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="Job">Full-Time Job</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Work Mode *
              </label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Deadline *
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Bengaluru / Hyderabad"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                CTC Package / Stipend *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹20,00,000 / annum"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Eligibility Criteria
            </label>
            <input
              type="text"
              placeholder="e.g. B.Tech/M.Tech CS/IT with CGPA >= 7.5, Batch 2026"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Required Skills
            </label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, Python, SQL, System Design"
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Job Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide role requirements and core responsibilities..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Application / Portal URL
            </label>
            <input
              type="url"
              placeholder="https://company.com/careers/job-123"
              value={formData.applyUrl}
              onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      {oppToDelete && (
        <ConfirmModal
          isOpen={!!oppToDelete}
          onClose={() => setOppToDelete(null)}
          onConfirm={() => {
            deleteOpportunity(oppToDelete.id);
            setOppToDelete(null);
          }}
          title="Delete Placement Drive"
          message={`Are you sure you want to remove the drive for ${oppToDelete.position} at ${oppToDelete.company}?`}
        />
      )}

    </div>
  );
};
