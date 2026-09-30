/**
 * Calculate placement readiness score with transparent breakdown
 * Weights:
 * - Profile completion — 10%
 * - Skills — 15%
 * - Projects — 15%
 * - Certifications — 10%
 * - Internship experience — 15%
 * - Aptitude performance — 20%
 * - Preparation roadmap — 15%
 * Total = 100%
 */

export const calculateReadiness = ({
  profile = {},
  skills = [],
  projects = [],
  certifications = [],
  internships = [],
  testResults = [],
  roadmap = []
}) => {
  // 1. Profile Completion (10%)
  const profileFields = [
    'fullName', 'email', 'phone', 'college', 'branch',
    'year', 'semester', 'cgpa', 'location', 'linkedin',
    'github', 'bio', 'careerObjective'
  ];
  let filledProfileFields = 0;
  profileFields.forEach(field => {
    if (profile[field] && String(profile[field]).trim().length > 0) {
      filledProfileFields++;
    }
  });
  const profileScore = Math.min(100, Math.round((filledProfileFields / profileFields.length) * 100));

  // 2. Skills (15%)
  // Target: At least 5 well-defined skills with a mix of categories
  const skillCount = skills.length;
  let skillRawScore = 0;
  if (skillCount === 0) skillRawScore = 0;
  else if (skillCount <= 2) skillRawScore = 40;
  else if (skillCount <= 4) skillRawScore = 75;
  else skillRawScore = 100;
  
  // Bonus for advanced proficiency
  const hasAdvanced = skills.some(s => s.proficiency === 'Advanced');
  if (hasAdvanced && skillRawScore < 100) skillRawScore = Math.min(100, skillRawScore + 10);
  const skillsScore = skillRawScore;

  // 3. Projects (15%)
  // Target: At least 2-3 detailed projects with live/github links
  const projectCount = projects.length;
  let projectRawScore = 0;
  if (projectCount === 0) projectRawScore = 0;
  else if (projectCount === 1) projectRawScore = 50;
  else if (projectCount === 2) projectRawScore = 80;
  else projectRawScore = 100;
  const projectsScore = projectRawScore;

  // 4. Certifications (10%)
  // Target: At least 1-2 verified certifications
  const certCount = certifications.length;
  let certRawScore = 0;
  if (certCount === 0) certRawScore = 0;
  else if (certCount === 1) certRawScore = 70;
  else certRawScore = 100;
  const certsScore = certRawScore;

  // 5. Internships (15%)
  // Target: 1+ industrial internship or real project experience
  const internCount = internships.length;
  let internRawScore = 0;
  if (internCount === 0) internRawScore = 20; // baseline if student hasn't interned yet
  else if (internCount === 1) internRawScore = 85;
  else internRawScore = 100;
  const internshipsScore = internRawScore;

  // 6. Aptitude Performance (20%)
  // Average score of test results
  let aptitudeScore = 0;
  if (testResults.length === 0) {
    aptitudeScore = 0;
  } else {
    const totalPercentage = testResults.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
    aptitudeScore = Math.round(totalPercentage / testResults.length);
  }

  // 7. Preparation Roadmap (15%)
  let totalTasks = 0;
  let earnedTaskPoints = 0;
  roadmap.forEach(phase => {
    (phase.tasks || []).forEach(task => {
      totalTasks++;
      if (task.status === 'Completed') {
        earnedTaskPoints += 1.0;
      } else if (task.status === 'In Progress') {
        earnedTaskPoints += 0.5;
      }
    });
  });
  const roadmapScore = totalTasks > 0 ? Math.round((earnedTaskPoints / totalTasks) * 100) : 0;

  // Overall Weighted Calculation
  const totalScore = Math.round(
    (profileScore * 0.10) +
    (skillsScore * 0.15) +
    (projectsScore * 0.15) +
    (certsScore * 0.10) +
    (internshipsScore * 0.15) +
    (aptitudeScore * 0.20) +
    (roadmapScore * 0.15)
  );

  return {
    total: Math.min(100, Math.max(0, totalScore)),
    breakdown: [
      { key: 'profile', label: 'Profile Completion', weight: '10%', score: profileScore, contribution: Math.round(profileScore * 0.10), color: 'bg-blue-500' },
      { key: 'skills', label: 'Technical & Soft Skills', weight: '15%', score: skillsScore, contribution: Math.round(skillsScore * 0.15), color: 'bg-indigo-500' },
      { key: 'projects', label: 'Practical Projects', weight: '15%', score: projectsScore, contribution: Math.round(projectsScore * 0.15), color: 'bg-emerald-500' },
      { key: 'certs', label: 'Certifications', weight: '10%', score: certsScore, contribution: Math.round(certsScore * 0.10), color: 'bg-amber-500' },
      { key: 'internships', label: 'Internship Experience', weight: '15%', score: internshipsScore, contribution: Math.round(internshipsScore * 0.15), color: 'bg-purple-500' },
      { key: 'aptitude', label: 'Aptitude Readiness', weight: '20%', score: aptitudeScore, contribution: Math.round(aptitudeScore * 0.20), color: 'bg-cyan-500' },
      { key: 'roadmap', label: 'Preparation Roadmap', weight: '15%', score: roadmapScore, contribution: Math.round(roadmapScore * 0.15), color: 'bg-rose-500' }
    ]
  };
};
