import React, { useState } from 'react';
import {
  FileBadge,
  Plus,
  ExternalLink,
  Calendar,
  Building,
  Edit2,
  Trash2,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { EmptyState } from '../../components/common/EmptyState';

export const Certifications = () => {
  const { certifications, addCertification, updateCertification, deleteCertification } = useData();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certToDelete, setCertToDelete] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: ''
  });

  const openAddModal = () => {
    setEditingCert(null);
    setFormData({
      name: '',
      organization: '',
      issueDate: new Date().toISOString().split('T')[0],
      credentialId: '',
      credentialUrl: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      organization: cert.organization,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.organization.trim()) {
      showToast('Please fill in certification name and organization', 'error');
      return;
    }

    if (editingCert) {
      updateCertification(editingCert.id, formData);
    } else {
      addCertification(formData);
    }
    setIsModalOpen(false);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Credential ID copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Certifications & Licenses</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showcase verified industry certifications from AWS, Meta, Google, Cisco, and Coursera
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Add Certification
        </Button>
      </div>

      {/* Certifications List */}
      {certifications.length === 0 ? (
        <EmptyState
          icon={FileBadge}
          title="No certifications added yet"
          description="Add your verified credentials to improve your placement profile rating."
          actionText="Add Certification"
          onAction={openAddModal}
          actionIcon={Plus}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(cert)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCertToDelete(cert)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{cert.name}</h3>
                
                <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                  <p className="font-semibold text-indigo-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {cert.organization}
                  </p>

                  <p className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>

                {cert.credentialId && (
                  <div className="mt-3 p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                    <span className="truncate mr-2">ID: {cert.credentialId}</span>
                    <button
                      onClick={() => copyToClipboard(cert.credentialId, cert.id)}
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded"
                      title="Copy ID"
                    >
                      {copiedId === cert.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {cert.credentialUrl && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Certification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCert ? 'Edit Certification' : 'Add New Certification'}
        subtitle="Provide credential details and verification URL"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              {editingCert ? 'Save Changes' : 'Add Certification'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Certification Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AWS Certified Solutions Architect"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amazon Web Services / Coursera"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Date *
              </label>
              <input
                type="date"
                required
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Credential ID / License Number (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. AWS-CLF-001928"
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Verification URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://coursera.org/verify/..."
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      {certToDelete && (
        <ConfirmModal
          isOpen={!!certToDelete}
          onClose={() => setCertToDelete(null)}
          onConfirm={() => {
            deleteCertification(certToDelete.id);
            setCertToDelete(null);
          }}
          title="Delete Certification"
          message={`Are you sure you want to delete "${certToDelete.name}"?`}
        />
      )}

    </div>
  );
};
