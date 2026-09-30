import React, { useState, useMemo } from 'react';
import {
  Award,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle,
  Sparkles,
  BookOpen,
  Code
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

export const Skills = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Development',
    proficiency: 'Intermediate',
    experience: ''
  });

  const categories = [
    'All',
    'Programming',
    'Electronics',
    'Web Development',
    'Data Analytics',
    'AI/ML',
    'Communication',
    'Aptitude',
    'Other'
  ];

  const categoryListForForm = categories.filter(c => c !== 'All');

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchQuery, selectedCategory]);

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Web Development',
      proficiency: 'Intermediate',
      experience: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      experience: skill.experience || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingSkill) {
      updateSkill(editingSkill.id, formData);
    } else {
      addSkill(formData);
    }
    setIsModalOpen(false);
  };

  const getProficiencyPercentage = (proficiency) => {
    switch (proficiency) {
      case 'Advanced': return 100;
      case 'Intermediate': return 66;
      case 'Beginner': return 33;
      default: return 50;
    }
  };

  const getProficiencyBadgeColor = (proficiency) => {
    switch (proficiency) {
      case 'Advanced': return 'emerald';
      case 'Intermediate': return 'indigo';
      case 'Beginner': return 'slate';
      default: return 'slate';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Skills & Proficiencies</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track and categorize your core technical and behavioral placement strengths
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Add New Skill
        </Button>
      </div>

      {/* Filters & Search */}
      <Card noPadding>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No skills found"
          description={
            searchQuery || selectedCategory !== 'All'
              ? 'Try adjusting your search or category filter.'
              : 'Add your first skill to boost your placement readiness score!'
          }
          actionText="Add New Skill"
          onAction={openAddModal}
          actionIcon={Plus}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map(skill => {
            const percent = getProficiencyPercentage(skill.proficiency);
            const badgeVariant = getProficiencyBadgeColor(skill.proficiency);

            return (
              <div
                key={skill.id}
                className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {skill.category}
                    </span>
                    <Badge variant={badgeVariant} size="sm">
                      {skill.proficiency}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{skill.name}</h3>
                  {skill.experience && (
                    <p className="text-xs text-slate-500 mt-1">Exp: {skill.experience}</p>
                  )}

                  {/* Proficiency Progress Meter */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium mb-1">
                      <span>Proficiency Level</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          skill.proficiency === 'Advanced'
                            ? 'bg-emerald-500'
                            : skill.proficiency === 'Intermediate'
                            ? 'bg-indigo-500'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit skill"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSkillToDelete(skill)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
        subtitle="Specify category and proficiency for placement evaluation"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              {editingSkill ? 'Save Changes' : 'Add Skill'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. React.js, Python, System Design"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                {categoryListForForm.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proficiency Level *
              </label>
              <select
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="Beginner">Beginner (33%)</option>
                <option value="Intermediate">Intermediate (66%)</option>
                <option value="Advanced">Advanced (100%)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Experience / Context (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 2 years coursework, 3 hackathons"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      {skillToDelete && (
        <ConfirmModal
          isOpen={!!skillToDelete}
          onClose={() => setSkillToDelete(null)}
          onConfirm={() => {
            deleteSkill(skillToDelete.id);
            setSkillToDelete(null);
          }}
          title="Delete Skill"
          message={`Are you sure you want to delete "${skillToDelete.name}"? This will update your placement readiness score.`}
        />
      )}

    </div>
  );
};
