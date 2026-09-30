import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Github,
  Globe,
  Calendar,
  Tag,
  Edit2,
  Trash2,
  ExternalLink,
  Code2,
  Star
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';

export const Projects = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    projectType: 'Personal Project',
    githubLink: '',
    demoLink: '',
    completionDate: '',
    highlights: ''
  });

  const projectTypes = [
    'Capstone Project',
    'Hackathon Project',
    'Personal Project',
    'Academic / Coursework',
    'Client / Freelance',
    'Open Source Contribution'
  ];

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      projectType: 'Personal Project',
      githubLink: '',
      demoLink: '',
      completionDate: new Date().toISOString().split('T')[0],
      highlights: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies,
      projectType: proj.projectType || 'Personal Project',
      githubLink: proj.githubLink || '',
      demoLink: proj.demoLink || '',
      completionDate: proj.completionDate || '',
      highlights: proj.highlights || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      showToast('Please provide a project title and description', 'error');
      return;
    }

    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    setIsModalOpen(false);
  };

  const getTypeBadgeVariant = (type) => {
    switch (type) {
      case 'Capstone Project': return 'purple';
      case 'Hackathon Project': return 'amber';
      case 'Personal Project': return 'indigo';
      case 'Open Source Contribution': return 'emerald';
      default: return 'slate';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Technical Projects & Portfolio</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Demonstrate your engineering capability with full-stack architectures, live demos, and source code
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Add New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No projects added yet"
          description="Projects carry 15% of your placement readiness score and are critical for technical interviews."
          actionText="Add New Project"
          onAction={openAddModal}
          actionIcon={Plus}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <Badge variant={getTypeBadgeVariant(proj.projectType)} size="sm">
                    {proj.projectType}
                  </Badge>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setProjectToDelete(proj)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{proj.title}</h3>

                {proj.completionDate && (
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Completed: {proj.completionDate}
                  </p>
                )}

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {proj.description}
                </p>

                {proj.highlights && (
                  <div className="mt-3 p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-start gap-2 text-xs text-indigo-900">
                    <Star className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{proj.highlights}</span>
                  </div>
                )}

                {/* Tech Stack Tags */}
                {proj.technologies && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.technologies.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[11px] rounded-lg font-medium"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>
                  )}

                  {proj.demoLink && (
                    <a
                      href={proj.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Live Preview</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        subtitle="Include live demo and GitHub repository links for recruiters"
        maxWidth="max-w-2xl"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              {editingProject ? 'Save Changes' : 'Add Project'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. EduPulse - AI Campus Management Platform"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Classification *
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                {projectTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Completion Date
              </label>
              <input
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technologies / Tools (comma separated) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS, Docker"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description & Key Architectural Features *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe what problem the project solves, key features implemented, and architecture..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Key Metric / Impact Highlight (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 500+ GitHub stars, won 1st prize at Smart India Hackathon"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/project"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Live Deployment URL
              </label>
              <input
                type="url"
                placeholder="https://my-app.vercel.app"
                value={formData.demoLink}
                onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      {projectToDelete && (
        <ConfirmModal
          isOpen={!!projectToDelete}
          onClose={() => setProjectToDelete(null)}
          onConfirm={() => {
            deleteProject(projectToDelete.id);
            setProjectToDelete(null);
          }}
          title="Delete Project"
          message={`Are you sure you want to delete "${projectToDelete.title}"?`}
        />
      )}

    </div>
  );
};
