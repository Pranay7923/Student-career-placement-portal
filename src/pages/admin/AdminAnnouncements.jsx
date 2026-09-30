import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  AlertCircle,
  Calendar,
  User,
  CheckCircle2,
  Megaphone
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { EmptyState } from '../../components/common/EmptyState';

export const AdminAnnouncements = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [annToDelete, setAnnToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    important: true
  });

  const openAddModal = () => {
    setFormData({
      title: '',
      content: '',
      important: true
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    addAnnouncement(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Placement Broadcasts & Announcements</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish official notices and PPT schedules to all candidate dashboards
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Broadcast Notice
        </Button>
      </div>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No announcements published"
          description="Click the button above to broadcast a new notice."
          actionText="Broadcast Notice"
          onAction={openAddModal}
          actionIcon={Plus}
        />
      ) : (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`p-5 rounded-2xl border transition-all ${
                ann.important
                  ? 'bg-gradient-to-br from-white to-indigo-50/30 border-indigo-200 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl flex-shrink-0 mt-0.5 ${
                    ann.important ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Megaphone className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">{ann.title}</h4>
                      {ann.important && (
                        <Badge variant="rose" size="sm">Urgent Notice</Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-3xl">
                      {ann.content}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Posted: {ann.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {ann.postedBy}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setAnnToDelete(ann)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex-shrink-0"
                  title="Delete announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Announcement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Broadcast New Notice"
        subtitle="This notice will appear at the top of every student's dashboard"
        maxWidth="max-w-xl"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Publish Notice
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Notice Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mandatory Pre-Placement Talk with Google Cloud"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Detailed Announcement Content *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Include location, time, eligibility requirements, and action items..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="importantCheck"
              checked={formData.important}
              onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="importantCheck" className="text-xs text-slate-700 font-semibold cursor-pointer">
              Mark as High Priority / Urgent Notice (Shows banner)
            </label>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      {annToDelete && (
        <ConfirmModal
          isOpen={!!annToDelete}
          onClose={() => setAnnToDelete(null)}
          onConfirm={() => {
            deleteAnnouncement(annToDelete.id);
            setAnnToDelete(null);
          }}
          title="Delete Notice"
          message={`Are you sure you want to remove the announcement "${annToDelete.title}"?`}
        />
      )}

    </div>
  );
};
