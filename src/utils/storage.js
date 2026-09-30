import { initialSeedData } from '../data/initialSeedData';

const STORAGE_KEYS = {
  INITIALIZED: 'csp_initialized_v1',
  CURRENT_USER: 'csp_current_user',
  USERS: 'csp_users',
  STUDENT_PROFILES: 'csp_student_profiles',
  SKILLS: 'csp_skills',
  CERTIFICATIONS: 'csp_certifications',
  PROJECTS: 'csp_projects',
  INTERNSHIPS: 'csp_internships',
  OPPORTUNITIES: 'csp_opportunities',
  BOOKMARKS: 'csp_bookmarks',
  APPLIED_JOBS: 'csp_applied_jobs',
  APTITUDE_QUESTIONS: 'csp_aptitude_questions',
  TEST_RESULTS: 'csp_test_results',
  ROADMAP: 'csp_roadmap',
  NOTIFICATIONS: 'csp_notifications',
  ANNOUNCEMENTS: 'csp_announcements',
  RECENT_ACTIVITIES: 'csp_recent_activities',
  THEME: 'csp_theme'
};

export const initializeStorage = () => {
  try {
    const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInitialized) {
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialSeedData.users));
      localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(initialSeedData.studentProfiles));
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(initialSeedData.skills));
      localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(initialSeedData.certifications));
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialSeedData.projects));
      localStorage.setItem(STORAGE_KEYS.INTERNSHIPS, JSON.stringify(initialSeedData.internships));
      localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(initialSeedData.opportunities));
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(initialSeedData.bookmarks));
      localStorage.setItem(STORAGE_KEYS.APPLIED_JOBS, JSON.stringify(initialSeedData.appliedJobs));
      localStorage.setItem(STORAGE_KEYS.APTITUDE_QUESTIONS, JSON.stringify(initialSeedData.aptitudeQuestions));
      localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(initialSeedData.testResults));
      localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(initialSeedData.roadmap));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialSeedData.notifications));
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(initialSeedData.announcements));
      localStorage.setItem(STORAGE_KEYS.RECENT_ACTIVITIES, JSON.stringify(initialSeedData.recentActivities));
      
      // Default to demo student login initially
      const demoStudent = initialSeedData.users[0];
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(demoStudent));
    }
  } catch (error) {
    console.error('Failed to initialize local storage data:', error);
  }
};

export const resetToSampleData = () => {
  try {
    localStorage.clear();
    initializeStorage();
    return true;
  } catch (error) {
    console.error('Error resetting data:', error);
    return false;
  }
};

export const getItem = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
    return false;
  }
};

export { STORAGE_KEYS };
