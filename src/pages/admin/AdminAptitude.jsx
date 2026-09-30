import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Search,
  BookOpen
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminAptitude = () => {
  const { aptitudeQuestions, addAptitudeQuestion, updateAptitudeQuestion, deleteAptitudeQuestion } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const [formData, setFormData] = useState({
    category: 'Quantitative Aptitude',
    difficulty: 'Medium',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  const categories = ['All', 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'];

  const openAddModal = () => {
    setEditingQuestion(null);
    setFormData({
      category: 'Quantitative Aptitude',
      difficulty: 'Medium',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (q) => {
    setEditingQuestion(q);
    setFormData({
      category: q.category,
      difficulty: q.difficulty,
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || ''
    });
    setIsModalOpen(true);
  };

  const handleOptionChange = (idx, value) => {
    const opts = [...formData.options];
    opts[idx] = value;
    setFormData({ ...formData, options: opts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || formData.options.some(o => !o.trim())) return;

    if (editingQuestion) {
      updateAptitudeQuestion(editingQuestion.id, formData);
    } else {
      addAptitudeQuestion(formData);
    }
    setIsModalOpen(false);
  };

  const filteredQuestions = aptitudeQuestions.filter(q => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || q.question.toLowerCase().includes(query);
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Aptitude Question Bank Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, or remove MCQs for student practice and mock placement tests
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Add Question
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <Card noPadding>
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
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

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No questions found"
          description="Click the button above to add a new question to this category."
          actionText="Add Question"
          onAction={openAddModal}
          actionIcon={Plus}
        />
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                  <Badge variant="indigo" size="sm">{q.category}</Badge>
                  <Badge variant={q.difficulty === 'Easy' ? 'emerald' : q.difficulty === 'Hard' ? 'rose' : 'amber'} size="sm">
                    {q.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(q)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setQuestionToDelete(q)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-slate-900 mb-3 whitespace-pre-line">
                {q.question}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                {q.options.map((opt, optIdx) => {
                  const isCorrect = optIdx === q.correctAnswer;
                  return (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>
                        <strong>{String.fromCharCode(65 + optIdx)}.</strong> {opt}
                      </span>
                      {isCorrect && (
                        <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800">Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Question Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingQuestion ? 'Edit Aptitude Question' : 'Add New Aptitude Question'}
        subtitle="Set category, options, correct answer index, and step explanation"
        maxWidth="max-w-2xl"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              {editingQuestion ? 'Save Changes' : 'Save Question'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="Quantitative Aptitude">Quantitative Aptitude</option>
                <option value="Logical Reasoning">Logical Reasoning</option>
                <option value="Verbal Ability">Verbal Ability</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Difficulty Level *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Question Statement *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Enter the problem statement..."
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          {/* 4 Options */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700">
              Options (and mark the correct one) *
            </label>
            {formData.options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === idx}
                  onChange={() => setFormData({ ...formData, correctAnswer: idx })}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  title="Mark as correct answer"
                />
                <span className="font-bold text-slate-500 w-4">{String.fromCharCode(65 + idx)}.</span>
                <input
                  type="text"
                  required
                  placeholder={`Option ${String.fromCharCode(65 + idx)} text`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Step-by-Step Solution & Explanation
            </label>
            <textarea
              rows={2}
              placeholder="Explain the step-by-step formula or reasoning..."
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      {questionToDelete && (
        <ConfirmModal
          isOpen={!!questionToDelete}
          onClose={() => setQuestionToDelete(null)}
          onConfirm={() => {
            deleteAptitudeQuestion(questionToDelete.id);
            setQuestionToDelete(null);
          }}
          title="Delete Question"
          message="Are you sure you want to remove this question from the test bank?"
        />
      )}

    </div>
  );
};
