import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getItem, setItem, STORAGE_KEYS } from '../utils/storage';
import { useAuth } from './AuthContext';
import { calculateReadiness } from '../utils/readinessCalculator';
import { useToast } from './ToastContext';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [profiles, setProfiles] = useState({});
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [internships, setInternships] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Load state from localStorage on mount
  useEffect(() => {
    setProfiles(getItem(STORAGE_KEYS.STUDENT_PROFILES, {}));
    setSkills(getItem(STORAGE_KEYS.SKILLS, []));
    setCertifications(getItem(STORAGE_KEYS.CERTIFICATIONS, []));
    setProjects(getItem(STORAGE_KEYS.PROJECTS, []));
    setInternships(getItem(STORAGE_KEYS.INTERNSHIPS, []));
    setOpportunities(getItem(STORAGE_KEYS.OPPORTUNITIES, []));
    setBookmarks(getItem(STORAGE_KEYS.BOOKMARKS, []));
    setAppliedJobs(getItem(STORAGE_KEYS.APPLIED_JOBS, []));
    setAptitudeQuestions(getItem(STORAGE_KEYS.APTITUDE_QUESTIONS, []));
    setTestResults(getItem(STORAGE_KEYS.TEST_RESULTS, []));
    setRoadmap(getItem(STORAGE_KEYS.ROADMAP, []));
    setNotifications(getItem(STORAGE_KEYS.NOTIFICATIONS, []));
    setAnnouncements(getItem(STORAGE_KEYS.ANNOUNCEMENTS, []));
    setRecentActivities(getItem(STORAGE_KEYS.RECENT_ACTIVITIES, []));
  }, []);

  const currentUserId = currentUser?.id || 'usr_student_1';

  // Current student specific data
  const currentProfile = useMemo(() => {
    return profiles[currentUserId] || {
      id: currentUserId,
      fullName: currentUser?.name || 'Student',
      email: currentUser?.email || '',
      college: currentUser?.college || 'College of Engineering',
      branch: currentUser?.branch || 'Computer Science',
      year: currentUser?.year || 'Final Year'
    };
  }, [profiles, currentUserId, currentUser]);

  const userSkills = useMemo(() => {
    return skills.filter(s => !s.userId || s.userId === currentUserId);
  }, [skills, currentUserId]);

  const userCertifications = useMemo(() => {
    return certifications.filter(c => !c.userId || c.userId === currentUserId);
  }, [certifications, currentUserId]);

  const userProjects = useMemo(() => {
    return projects.filter(p => !p.userId || p.userId === currentUserId);
  }, [projects, currentUserId]);

  const userInternships = useMemo(() => {
    return internships.filter(i => !i.userId || i.userId === currentUserId);
  }, [internships, currentUserId]);

  const userTestResults = useMemo(() => {
    return testResults.filter(t => !t.userId || t.userId === currentUserId);
  }, [testResults, currentUserId]);

  const userNotifications = useMemo(() => {
    return notifications.filter(n => !n.userId || n.userId === currentUserId);
  }, [notifications, currentUserId]);

  const userActivities = useMemo(() => {
    return recentActivities.filter(a => !a.userId || a.userId === currentUserId);
  }, [recentActivities, currentUserId]);

  // Placement Readiness Calculation
  const readiness = useMemo(() => {
    return calculateReadiness({
      profile: currentProfile,
      skills: userSkills,
      projects: userProjects,
      certifications: userCertifications,
      internships: userInternships,
      testResults: userTestResults,
      roadmap: roadmap
    });
  }, [currentProfile, userSkills, userProjects, userCertifications, userInternships, userTestResults, roadmap]);

  // Log activity helper
  const addActivity = (title, description, type = 'general') => {
    const newActivity = {
      id: 'act_' + Date.now(),
      userId: currentUserId,
      title,
      description,
      timestamp: 'Just now',
      type
    };
    const updated = [newActivity, ...recentActivities].slice(0, 20);
    setRecentActivities(updated);
    setItem(STORAGE_KEYS.RECENT_ACTIVITIES, updated);
  };

  // Profile actions
  const updateProfile = (updatedData) => {
    const updatedProfiles = {
      ...profiles,
      [currentUserId]: {
        ...currentProfile,
        ...updatedData
      }
    };
    setProfiles(updatedProfiles);
    setItem(STORAGE_KEYS.STUDENT_PROFILES, updatedProfiles);
    addActivity('Profile Updated', 'Updated contact and career information', 'profile');
    showToast('Profile updated successfully!', 'success');
  };

  // Skill actions
  const addSkill = (skillData) => {
    const newSkill = {
      id: 'skl_' + Date.now(),
      userId: currentUserId,
      ...skillData
    };
    const updated = [...skills, newSkill];
    setSkills(updated);
    setItem(STORAGE_KEYS.SKILLS, updated);
    addActivity('Added Skill', `Added ${newSkill.name} (${newSkill.proficiency})`, 'skill');
    showToast(`Skill "${newSkill.name}" added successfully!`, 'success');
  };

  const updateSkill = (id, skillData) => {
    const updated = skills.map(s => s.id === id ? { ...s, ...skillData } : s);
    setSkills(updated);
    setItem(STORAGE_KEYS.SKILLS, updated);
    showToast('Skill updated successfully!', 'success');
  };

  const deleteSkill = (id) => {
    const skillToDelete = skills.find(s => s.id === id);
    const updated = skills.filter(s => s.id !== id);
    setSkills(updated);
    setItem(STORAGE_KEYS.SKILLS, updated);
    showToast(`Skill "${skillToDelete?.name || ''}" removed`, 'info');
  };

  // Certification actions
  const addCertification = (certData) => {
    const newCert = {
      id: 'cert_' + Date.now(),
      userId: currentUserId,
      ...certData
    };
    const updated = [...certifications, newCert];
    setCertifications(updated);
    setItem(STORAGE_KEYS.CERTIFICATIONS, updated);
    addActivity('Added Certification', `Added ${newCert.name}`, 'certification');
    showToast(`Certification "${newCert.name}" added!`, 'success');
  };

  const updateCertification = (id, certData) => {
    const updated = certifications.map(c => c.id === id ? { ...c, ...certData } : c);
    setCertifications(updated);
    setItem(STORAGE_KEYS.CERTIFICATIONS, updated);
    showToast('Certification updated successfully!', 'success');
  };

  const deleteCertification = (id) => {
    const updated = certifications.filter(c => c.id !== id);
    setCertifications(updated);
    setItem(STORAGE_KEYS.CERTIFICATIONS, updated);
    showToast('Certification removed', 'info');
  };

  // Project actions
  const addProject = (projectData) => {
    const newProject = {
      id: 'proj_' + Date.now(),
      userId: currentUserId,
      ...projectData
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    setItem(STORAGE_KEYS.PROJECTS, updated);
    addActivity('Added Project', `Added project "${newProject.title}"`, 'project');
    showToast(`Project "${newProject.title}" added successfully!`, 'success');
  };

  const updateProject = (id, projectData) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...projectData } : p);
    setProjects(updated);
    setItem(STORAGE_KEYS.PROJECTS, updated);
    showToast('Project updated successfully!', 'success');
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    setItem(STORAGE_KEYS.PROJECTS, updated);
    showToast('Project removed', 'info');
  };

  // Internship actions
  const addInternship = (internshipData) => {
    const newIntern = {
      id: 'intern_' + Date.now(),
      userId: currentUserId,
      ...internshipData
    };
    const updated = [...internships, newIntern];
    setInternships(updated);
    setItem(STORAGE_KEYS.INTERNSHIPS, updated);
    addActivity('Added Experience', `Added internship at ${newIntern.company}`, 'internship');
    showToast('Internship experience added!', 'success');
  };

  const updateInternship = (id, internshipData) => {
    const updated = internships.map(i => i.id === id ? { ...i, ...internshipData } : i);
    setInternships(updated);
    setItem(STORAGE_KEYS.INTERNSHIPS, updated);
    showToast('Internship updated successfully!', 'success');
  };

  const deleteInternship = (id) => {
    const updated = internships.filter(i => i.id !== id);
    setInternships(updated);
    setItem(STORAGE_KEYS.INTERNSHIPS, updated);
    showToast('Internship removed', 'info');
  };

  // Bookmarks & Job Applications
  const toggleBookmark = (oppId) => {
    let updated;
    const isBookmarked = bookmarks.includes(oppId);
    if (isBookmarked) {
      updated = bookmarks.filter(id => id !== oppId);
      showToast('Opportunity removed from bookmarks', 'info');
    } else {
      updated = [...bookmarks, oppId];
      showToast('Opportunity saved to bookmarks!', 'success');
    }
    setBookmarks(updated);
    setItem(STORAGE_KEYS.BOOKMARKS, updated);
  };

  const applyToOpportunity = (oppId) => {
    const opp = opportunities.find(o => o.id === oppId);
    const existing = appliedJobs.find(a => a.opportunityId === oppId && a.userId === currentUserId);
    if (existing) {
      showToast(`You have already applied for ${opp?.position || 'this position'}`, 'info');
      return;
    }

    const newApplication = {
      id: 'app_' + Date.now(),
      opportunityId: oppId,
      userId: currentUserId,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Application Submitted'
    };

    const updated = [...appliedJobs, newApplication];
    setAppliedJobs(updated);
    setItem(STORAGE_KEYS.APPLIED_JOBS, updated);
    addActivity('Job Application', `Applied for ${opp?.position} at ${opp?.company}`, 'opportunity');
    showToast(`Application submitted for ${opp?.position} at ${opp?.company}!`, 'success');
  };

  // Admin Opportunities CRUD
  const addOpportunity = (oppData) => {
    const newOpp = {
      id: 'opp_' + Date.now(),
      companyLogo: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=120`,
      postedDate: new Date().toISOString().split('T')[0],
      ...oppData
    };
    const updated = [newOpp, ...opportunities];
    setOpportunities(updated);
    setItem(STORAGE_KEYS.OPPORTUNITIES, updated);
    
    // Broadcast notification to students
    const newNotif = {
      id: 'notif_' + Date.now(),
      title: `New Drive: ${newOpp.position} at ${newOpp.company}`,
      message: `Eligibility: ${newOpp.eligibility}. Deadline: ${newOpp.deadline}`,
      type: 'opportunity',
      date: new Date().toISOString(),
      read: false,
      link: '/opportunities'
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    setItem(STORAGE_KEYS.NOTIFICATIONS, updatedNotifs);

    showToast(`Opportunity "${newOpp.position}" published!`, 'success');
  };

  const updateOpportunity = (id, oppData) => {
    const updated = opportunities.map(o => o.id === id ? { ...o, ...oppData } : o);
    setOpportunities(updated);
    setItem(STORAGE_KEYS.OPPORTUNITIES, updated);
    showToast('Opportunity updated successfully!', 'success');
  };

  const deleteOpportunity = (id) => {
    const updated = opportunities.filter(o => o.id !== id);
    setOpportunities(updated);
    setItem(STORAGE_KEYS.OPPORTUNITIES, updated);
    showToast('Opportunity removed', 'info');
  };

  // Admin Aptitude Questions CRUD
  const addAptitudeQuestion = (qData) => {
    const newQ = {
      id: 'apt_' + Date.now(),
      ...qData
    };
    const updated = [...aptitudeQuestions, newQ];
    setAptitudeQuestions(updated);
    setItem(STORAGE_KEYS.APTITUDE_QUESTIONS, updated);
    showToast('Aptitude question added!', 'success');
  };

  const updateAptitudeQuestion = (id, qData) => {
    const updated = aptitudeQuestions.map(q => q.id === id ? { ...q, ...qData } : q);
    setAptitudeQuestions(updated);
    setItem(STORAGE_KEYS.APTITUDE_QUESTIONS, updated);
    showToast('Question updated successfully!', 'success');
  };

  const deleteAptitudeQuestion = (id) => {
    const updated = aptitudeQuestions.filter(q => q.id !== id);
    setAptitudeQuestions(updated);
    setItem(STORAGE_KEYS.APTITUDE_QUESTIONS, updated);
    showToast('Question deleted', 'info');
  };

  // Aptitude Test Submissions
  const saveTestResult = (resultData) => {
    const newResult = {
      id: 'res_' + Date.now(),
      userId: currentUserId,
      date: new Date().toISOString(),
      ...resultData
    };
    const updated = [newResult, ...testResults];
    setTestResults(updated);
    setItem(STORAGE_KEYS.TEST_RESULTS, updated);
    addActivity('Aptitude Test Completed', `Scored ${resultData.score}/${resultData.totalQuestions} (${resultData.percentage}%) in ${resultData.category}`, 'aptitude');
    
    // Create notification
    const notif = {
      id: 'notif_' + Date.now(),
      userId: currentUserId,
      title: 'Aptitude Test Result Saved',
      message: `You scored ${resultData.percentage}% on ${resultData.testTitle}.`,
      type: 'aptitude',
      date: new Date().toISOString(),
      read: false,
      link: '/aptitude'
    };
    setNotifications(prev => [notif, ...prev]);
    setItem(STORAGE_KEYS.NOTIFICATIONS, [notif, ...notifications]);

    showToast(`Test submitted! You scored ${resultData.percentage}%`, 'success');
  };

  // Roadmap task status
  const updateRoadmapTaskStatus = (phaseId, taskId, newStatus) => {
    const updatedRoadmap = roadmap.map(phase => {
      if (phase.phaseId === phaseId) {
        const updatedTasks = phase.tasks.map(t => {
          if (t.id === taskId) {
            return { ...t, status: newStatus };
          }
          return t;
        });
        return { ...phase, tasks: updatedTasks };
      }
      return phase;
    });

    setRoadmap(updatedRoadmap);
    setItem(STORAGE_KEYS.ROADMAP, updatedRoadmap);
    if (newStatus === 'Completed') {
      addActivity('Roadmap Milestone', 'Marked a preparation task as Completed', 'roadmap');
      showToast('Milestone completed! Placement readiness updated.', 'success');
    }
  };

  // Notification actions
  const markNotificationRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    setItem(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setItem(STORAGE_KEYS.NOTIFICATIONS, updated);
    showToast('All notifications marked as read', 'info');
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    setItem(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  // Announcements CRUD
  const addAnnouncement = (annData) => {
    const newAnn = {
      id: 'ann_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      postedBy: currentUser?.name || 'Placement Cell',
      ...annData
    };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    setItem(STORAGE_KEYS.ANNOUNCEMENTS, updated);
    showToast('Announcement posted to all students!', 'success');
  };

  const deleteAnnouncement = (id) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    setItem(STORAGE_KEYS.ANNOUNCEMENTS, updated);
    showToast('Announcement deleted', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        // Current student state
        profile: currentProfile,
        skills: userSkills,
        certifications: userCertifications,
        projects: userProjects,
        internships: userInternships,
        testResults: userTestResults,
        notifications: userNotifications,
        recentActivities: userActivities,
        readiness,
        bookmarks,
        appliedJobs,

        // Global / Admin state
        allStudents: getItem(STORAGE_KEYS.USERS, []).filter(u => u.role === 'student'),
        allProfiles: profiles,
        opportunities,
        aptitudeQuestions,
        roadmap,
        announcements,

        // Methods
        updateProfile,
        addSkill,
        updateSkill,
        deleteSkill,
        addCertification,
        updateCertification,
        deleteCertification,
        addProject,
        updateProject,
        deleteProject,
        addInternship,
        updateInternship,
        deleteInternship,
        toggleBookmark,
        applyToOpportunity,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        addAptitudeQuestion,
        updateAptitudeQuestion,
        deleteAptitudeQuestion,
        saveTestResult,
        updateRoadmapTaskStatus,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        addAnnouncement,
        deleteAnnouncement,
        addActivity
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
