import React, { useRef, useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building,
  BookOpen,
  Calendar,
  Award,
  MapPin,
  Linkedin,
  Github,
  Globe,
  FileText,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Camera,
  Upload
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const Profile = () => {
  const { profile, updateProfile, readiness } = useData();
  const { currentUser, updateCurrentUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const savedAvatar = localStorage.getItem('careersync_profile_avatar') || '';
  const [formData, setFormData] = useState({
    fullName: profile.fullName || currentUser?.name || '',
    email: profile.email || currentUser?.email || '',
    phone: profile.phone || '',
    college: profile.college || currentUser?.college || '',
    branch: profile.branch || currentUser?.branch || '',
    year: profile.year || currentUser?.year || 'Final Year (4th)',
    semester: profile.semester || '7th Semester',
    cgpa: profile.cgpa || '',
    location: profile.location || '',
    linkedin: profile.linkedin || '',
    github: profile.github || '',
    portfolio: profile.portfolio || '',
    bio: profile.bio || '',
    careerObjective: profile.careerObjective || '',
    achievements: profile.achievements || [],
    avatar: savedAvatar || profile.avatar || currentUser?.avatar || ''
  });

  const [newAchievement, setNewAchievement] = useState('');
  const fileInputRef = useRef(null);

  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.fullName || 'Student')}`;

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      window.alert('Please select a JPG or PNG image.');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      window.alert('Please choose an image smaller than 2 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication (ECE)',
    'Electrical & Electronics (EEE)',
    'Mechanical Engineering',
    'Civil Engineering',
    'Data Science & AI',
    'MCA / Postgraduate'
  ];

  const semesters = [
    '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
    '5th Semester', '6th Semester', '7th Semester', '8th Semester'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (newAchievement.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...(prev.achievements || []), newAchievement.trim()]
      }));
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);

    if (formData.avatar) {
      localStorage.setItem('careersync_profile_avatar', formData.avatar);
    } else {
      localStorage.removeItem('careersync_profile_avatar');
    }

    updateCurrentUser({
      name: formData.fullName,
      college: formData.college,
      branch: formData.branch,
      year: formData.year,
      avatar: formData.avatar || ''
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile.fullName || currentUser?.name || '',
      email: profile.email || currentUser?.email || '',
      phone: profile.phone || '',
      college: profile.college || currentUser?.college || '',
      branch: profile.branch || currentUser?.branch || '',
      year: profile.year || currentUser?.year || 'Final Year (4th)',
      semester: profile.semester || '7th Semester',
      cgpa: profile.cgpa || '',
      location: profile.location || '',
      linkedin: profile.linkedin || '',
      github: profile.github || '',
      portfolio: profile.portfolio || '',
      bio: profile.bio || '',
      careerObjective: profile.careerObjective || '',
      achievements: profile.achievements || [],
      avatar: localStorage.getItem('careersync_profile_avatar') || profile.avatar || currentUser?.avatar || ''
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <img
                  src={formData.avatar || defaultAvatar}
                  alt={formData.fullName || 'Student'}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-50 border border-slate-200 shadow-sm bg-slate-100"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
                    title="Change profile photo"
                    aria-label="Change profile photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Photo
                  </button>
                  {formData.avatar && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="inline-flex items-center px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-[11px] font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{formData.fullName}</h2>
                <Badge variant="indigo">{formData.branch}</Badge>
                {formData.cgpa && <Badge variant="emerald">CGPA: {formData.cgpa} / 10</Badge>}
              </div>
              
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                <span className="font-medium text-slate-700">{formData.college}</span>
                <span>•</span>
                <span>{formData.year}</span>
                <span>•</span>
                <span>{formData.semester}</span>
              </p>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                {formData.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {formData.location}
                  </span>
                )}
                {formData.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {formData.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" icon={X} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="sm"
                icon={Edit3}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Profile Info (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Academic & Personal Details */}
            <Card
              title="Academic & Personal Details"
              subtitle="Keep your official placement details up to date"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    disabled={!isEditing}
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91 98765 43210"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Location / City
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Bengaluru, Karnataka"
                    disabled={!isEditing}
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / Institute Name
                  </label>
                  <input
                    type="text"
                    name="college"
                    disabled={!isEditing}
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Branch / Discipline
                  </label>
                  <select
                    name="branch"
                    disabled={!isEditing}
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    {branches.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Semester
                  </label>
                  <select
                    name="semester"
                    disabled={!isEditing}
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  >
                    {semesters.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cumulative CGPA (out of 10)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="cgpa"
                    placeholder="e.g. 8.85"
                    disabled={!isEditing}
                    value={formData.cgpa}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    disabled={!isEditing}
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>
              </div>
            </Card>

            {/* Bio & Career Objective */}
            <Card
              title="Career Objective & Professional Summary"
              subtitle="This summary will also automatically appear in your Resume header"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Career Objective
                  </label>
                  <textarea
                    rows={3}
                    name="careerObjective"
                    placeholder="To secure a challenging Software Engineer role where I can utilize my development expertise..."
                    disabled={!isEditing}
                    value={formData.careerObjective}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    About Me / Bio
                  </label>
                  <textarea
                    rows={3}
                    name="bio"
                    placeholder="Passionate engineer with deep interest in full-stack web architectures..."
                    disabled={!isEditing}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>
              </div>
            </Card>

            {/* Honors & Key Achievements */}
            <Card
              title="Honors & Achievements"
              subtitle="Hackathons, competitive programming badges, paper publications, and awards"
            >
              <div className="space-y-3">
                {formData.achievements?.map((ach, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="font-medium text-slate-800">{ach}</span>
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add an achievement (e.g. Winner Smart India Hackathon 2025)..."
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      icon={Plus}
                      onClick={handleAddAchievement}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </Card>

          </div>

          {/* Sidebar Links & Profile Progress (1 col) */}
          <div className="space-y-6">
            
            {/* Social & Professional Links */}
            <Card
              title="Online Links & Profiles"
              subtitle="Recruiters view these during campus screening"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    disabled={!isEditing}
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-800" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    placeholder="https://github.com/username"
                    disabled={!isEditing}
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    Portfolio / Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    placeholder="https://yourwebsite.dev"
                    disabled={!isEditing}
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>
              </div>
            </Card>

            {/* Profile Completion Card */}
            <Card title="Profile Verification Status">
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Profile Contribution</span>
                  <span className="font-bold text-indigo-700">{readiness.breakdown[0].score}%</span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${readiness.breakdown[0].score}%` }}
                  />
                </div>

                <div className="pt-2 space-y-2 text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${formData.cgpa ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>CGPA Recorded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${formData.linkedin ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>LinkedIn Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${formData.github ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>GitHub Profile Attached</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${formData.careerObjective ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>Career Objective Defined</span>
                  </div>
                </div>
              </div>
            </Card>

          </div>

        </div>
      </form>

    </div>
  );
};
