export const initialSeedData = {
  users: [
    {
      id: 'usr_student_1',
      name: 'Aarav Sharma',
      email: 'alex@college.edu',
      password: 'password123',
      role: 'student',
      college: 'National Institute of Technology (NIT)',
      branch: 'Computer Science & Engineering',
      year: 'Final Year (4th)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      createdAt: '2026-08-10T10:00:00Z'
    },
    {
      id: 'usr_student_2',
      name: 'Priya Patel',
      email: 'priya@college.edu',
      password: 'password123',
      role: 'student',
      college: 'National Institute of Technology (NIT)',
      branch: 'Information Technology',
      year: '3rd Year',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      createdAt: '2026-08-12T11:30:00Z'
    },
    {
      id: 'usr_admin_1',
      name: 'Dr. Ramesh Kulkarni (Placement Dean)',
      email: 'admin@placement.edu',
      password: 'admin123',
      role: 'admin',
      college: 'National Institute of Technology (NIT)',
      branch: 'Training & Placement Cell',
      year: 'Faculty',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
      createdAt: '2026-01-01T09:00:00Z'
    }
  ],

  studentProfiles: {
    usr_student_1: {
      id: 'usr_student_1',
      fullName: 'Aarav Sharma',
      email: 'alex@college.edu',
      phone: '+91 98765 43210',
      college: 'National Institute of Technology (NIT)',
      branch: 'Computer Science & Engineering',
      year: 'Final Year (4th)',
      semester: '7th Semester',
      cgpa: '8.85',
      location: 'Bengaluru, Karnataka, India',
      linkedin: 'https://linkedin.com/in/aarav-sharma-tech',
      github: 'https://github.com/aaravsharma-dev',
      portfolio: 'https://aaravsharma.dev',
      bio: 'Enthusiastic pre-final year Software Engineer with expertise in modern full-stack web applications, scalable cloud microservices, and algorithmic problem solving. Looking for SDE-1 / Graduate Engineer roles in forward-thinking engineering teams.',
      careerObjective: 'To secure a challenging Software Development Engineer role in a progressive tech organization where I can leverage my problem-solving skills, full-stack development expertise, and passion for distributed systems to build impactful solutions.',
      achievements: [
        'Winner of Smart India Hackathon (College Level) - 2025',
        'Solved 450+ problems on LeetCode (Knight badge, 1920 rating)',
        'Secured Global Rank 142 in CodeChef Starters Challenge',
        'Head Coordinator of University Web Development Club'
      ]
    },
    usr_student_2: {
      id: 'usr_student_2',
      fullName: 'Priya Patel',
      email: 'priya@college.edu',
      phone: '+91 98123 45678',
      college: 'National Institute of Technology (NIT)',
      branch: 'Information Technology',
      year: '3rd Year',
      semester: '5th Semester',
      cgpa: '9.10',
      location: 'Pune, Maharashtra, India',
      linkedin: 'https://linkedin.com/in/priyapatel-it',
      github: 'https://github.com/priyapatel-tech',
      portfolio: 'https://priyapatel.me',
      bio: 'Data science & Machine Learning enthusiast with a solid foundation in Python, PyTorch, and cloud analytics.',
      careerObjective: 'Aspiring Machine Learning Engineer seeking an internship to contribute to AI-driven data pipelines and intelligent automation.',
      achievements: [
        'Published research paper in IEEE Student Conference on Image Classification',
        'Top 5% in Kaggle NLP competition'
      ]
    }
  },

  skills: [
    {
      id: 'skl_1',
      userId: 'usr_student_1',
      name: 'React.js & Next.js',
      category: 'Web Development',
      proficiency: 'Advanced', // Beginner | Intermediate | Advanced
      experience: '2+ years'
    },
    {
      id: 'skl_2',
      userId: 'usr_student_1',
      name: 'Data Structures & Algorithms',
      category: 'Programming',
      proficiency: 'Advanced',
      experience: '3 years'
    },
    {
      id: 'skl_3',
      userId: 'usr_student_1',
      name: 'Node.js & Express',
      category: 'Web Development',
      proficiency: 'Intermediate',
      experience: '1.5 years'
    },
    {
      id: 'skl_4',
      userId: 'usr_student_1',
      name: 'PostgreSQL & MongoDB',
      category: 'Web Development',
      proficiency: 'Intermediate',
      experience: '2 years'
    },
    {
      id: 'skl_5',
      userId: 'usr_student_1',
      name: 'Python for AI/Data',
      category: 'AI/ML',
      proficiency: 'Intermediate',
      experience: '1 year'
    },
    {
      id: 'skl_6',
      userId: 'usr_student_1',
      name: 'Quantitative Aptitude',
      category: 'Aptitude',
      proficiency: 'Advanced',
      experience: 'Practice tests'
    },
    {
      id: 'skl_7',
      userId: 'usr_student_1',
      name: 'Technical Communication',
      category: 'Communication',
      proficiency: 'Advanced',
      experience: 'Club lead'
    },
    {
      id: 'skl_8',
      userId: 'usr_student_1',
      name: 'Docker & CI/CD Basics',
      category: 'Web Development',
      proficiency: 'Beginner',
      experience: '6 months'
    }
  ],

  certifications: [
    {
      id: 'cert_1',
      userId: 'usr_student_1',
      name: 'AWS Certified Cloud Practitioner (CLF-C02)',
      organization: 'Amazon Web Services',
      issueDate: '2025-11-15',
      credentialId: 'AWS-CCP-982341-X',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert_2',
      userId: 'usr_student_1',
      name: 'Meta Front-End Developer Professional Certificate',
      organization: 'Meta / Coursera',
      issueDate: '2025-06-20',
      credentialId: 'COURSERA-META-771829',
      credentialUrl: 'https://coursera.org/verify/professional-cert'
    },
    {
      id: 'cert_3',
      userId: 'usr_student_1',
      name: 'Postman API Fundamentals Student Expert',
      organization: 'Postman',
      issueDate: '2025-02-10',
      credentialId: 'POSTMAN-EXPERT-44120',
      credentialUrl: 'https://badgr.com/public/assertions'
    }
  ],

  projects: [
    {
      id: 'proj_1',
      userId: 'usr_student_1',
      title: 'EduPulse - AI Campus Management Platform',
      description: 'A comprehensive full-stack platform for colleges featuring automated attendance with OpenCV, automated grade calculation, assignment submissions, and a real-time discussion forum using WebSockets.',
      technologies: 'React, Node.js, Express, MongoDB, Tailwind CSS, Socket.io',
      projectType: 'Capstone Project',
      githubLink: 'https://github.com/aaravsharma-dev/edupulse-platform',
      demoLink: 'https://edupulse-demo.vercel.app',
      completionDate: '2025-12-05',
      highlights: 'Adopted by 3 student departments with over 800 active student users during campus tech symposium.'
    },
    {
      id: 'proj_2',
      userId: 'usr_student_1',
      title: 'DevCollab - Real-Time Code Collaboration Editor',
      description: 'Browser-based collaborative code editor with Monaco editor, syntax highlighting for 15+ languages, audio chat via WebRTC, and instant terminal execution using sandboxed Docker containers.',
      technologies: 'Next.js, TypeScript, WebRTC, Docker, Redis, TailwindCSS',
      projectType: 'Hackathon Project',
      githubLink: 'https://github.com/aaravsharma-dev/devcollab-editor',
      demoLink: 'https://devcollab-live.vercel.app',
      completionDate: '2025-08-18',
      highlights: 'Won 1st prize at Inter-College Hackathon with under 50ms peer-to-peer sync latency.'
    },
    {
      id: 'proj_3',
      userId: 'usr_student_1',
      title: 'AlgoVisualizer - Interactive Algorithm Learning Tool',
      description: 'Visual simulation tool for sorting algorithms, graph traversals (Dijkstra, A*, BFS, DFS), and dynamic programming trees with step-by-step playback controls and time complexity breakdowns.',
      technologies: 'JavaScript, React, Canvas API, Tailwind CSS',
      projectType: 'Personal Project',
      githubLink: 'https://github.com/aaravsharma-dev/algo-visualizer',
      demoLink: 'https://algo-visualizer-suite.web.app',
      completionDate: '2025-04-10',
      highlights: '500+ GitHub stars and featured on JavaScript Weekly newsletter.'
    }
  ],

  internships: [
    {
      id: 'intern_1',
      userId: 'usr_student_1',
      company: 'TechCorp Solutions',
      role: 'Software Engineer Intern (Frontend)',
      duration: 'May 2025 - July 2025 (3 Months)',
      location: 'Bengaluru, India (Hybrid)',
      description: 'Engineered responsive dashboard modules for B2B analytics portal. Optimized web performance improving Google Lighthouse score from 68 to 94. Wrote unit tests achieving 85% code coverage with Jest.'
    }
  ],

  opportunities: [
    {
      id: 'opp_1',
      company: 'Google Cloud',
      companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=120',
      position: 'Associate Software Engineer (Campus 2026)',
      type: 'Job', // Job | Internship
      location: 'Bengaluru / Hyderabad',
      workMode: 'Hybrid', // Remote | Hybrid | Onsite
      salary: '₹22,00,000 - ₹28,00,000 / annum',
      requiredSkills: 'Data Structures, Algorithms, C++/Java/Python, Cloud Fundamentals, System Design Basics',
      eligibility: 'B.Tech/M.Tech in CS/IT/ECE with CGPA >= 7.5, Graduating in 2026',
      deadline: '2026-10-25',
      description: 'Join the Google Cloud infrastructure team to build scalable services powering millions of global enterprises. You will collaborate on distributed databases, networking, and developer tools.',
      applyUrl: 'https://careers.google.com/students',
      isFeatured: true,
      postedDate: '2026-09-15'
    },
    {
      id: 'opp_2',
      company: 'Microsoft',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
      position: 'Software Development Engineer - 1',
      type: 'Job',
      location: 'Noida / Bengaluru',
      workMode: 'Hybrid',
      salary: '₹20,00,000 - ₹25,00,000 / annum',
      requiredSkills: 'C#, Java, Python, REST APIs, Microservices, Problem Solving, Git',
      eligibility: 'Final Year CS / IT / Electrical Engineering with >= 7.0 CGPA, No Active Backlogs',
      deadline: '2026-10-30',
      description: 'Work on Microsoft 365 core productivity experiences and modern Azure services. Deliver high-impact software used by 300+ million daily users.',
      applyUrl: 'https://careers.microsoft.com/professionals/us/en',
      isFeatured: true,
      postedDate: '2026-09-18'
    },
    {
      id: 'opp_3',
      company: 'Amazon AWS',
      companyLogo: 'https://images.unsplash.com/photo-1523474255658-4af61b168344?auto=format&fit=crop&q=80&w=120',
      position: 'Software Development Engineer Intern (Summer 2027 / Spring)',
      type: 'Internship',
      location: 'Hyderabad, India',
      workMode: 'Onsite',
      salary: '₹80,000 / month + Accommodation stipend',
      requiredSkills: 'Object Oriented Programming, Java/Python/C++, Data Structures, Linux commands',
      eligibility: '3rd Year & 4th Year B.Tech Students with CGPA >= 7.0',
      deadline: '2026-10-20',
      description: '6-month intensive technical internship with full mentorship, high PPO conversion rate, and real-time production deployments in AWS Lambda & DynamoDB teams.',
      applyUrl: 'https://amazon.jobs/en/teams/internships-for-students',
      isFeatured: true,
      postedDate: '2026-09-20'
    },
    {
      id: 'opp_4',
      company: 'Cisco Systems',
      companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=120',
      position: 'Technical Consulting Engineer - Cloud & Security',
      type: 'Job',
      location: 'Bengaluru, India',
      workMode: 'Hybrid',
      salary: '₹14,50,000 - ₹18,00,000 / annum',
      requiredSkills: 'Computer Networks, TCP/IP, Linux, Python Scripting, Cybersecurity Basics',
      eligibility: 'All Engineering branches (CS, IT, ECE, EEE, Mechanical) with CGPA >= 6.5',
      deadline: '2026-11-05',
      description: 'Diagnose complex customer enterprise network issues, architect cloud security transitions, and automate network testing frameworks using Python.',
      applyUrl: 'https://jobs.cisco.com',
      isFeatured: false,
      postedDate: '2026-09-22'
    },
    {
      id: 'opp_5',
      company: 'Razorpay',
      companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=120',
      position: 'Frontend Engineering Intern',
      type: 'Internship',
      location: 'Bengaluru (Remote optional)',
      workMode: 'Remote',
      salary: '₹45,000 - ₹60,000 / month',
      requiredSkills: 'React, TypeScript, Tailwind CSS, State Management (Zustand/Redux), Browser APIs',
      eligibility: 'Pre-final and Final Year students with strong web development portfolio',
      deadline: '2026-10-18',
      description: 'Build slick, lightning fast checkout interfaces and dashboard analytics for India’s premier fintech unicorns. Fast-paced startup learning environment.',
      applyUrl: 'https://razorpay.com/jobs',
      isFeatured: true,
      postedDate: '2026-09-24'
    },
    {
      id: 'opp_6',
      company: 'Tata Consultancy Services (TCS Digital)',
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=120',
      position: 'Digital Cadre Systems Engineer',
      type: 'Job',
      location: 'Pan India (Multiple Locations)',
      workMode: 'Onsite',
      salary: '₹7,50,000 - ₹9,00,000 / annum',
      requiredSkills: 'Java, Python, SQL, Aptitude, Good Communication Skills, Git',
      eligibility: 'Graduating 2026, Min 60% in 10th, 12th & Degree, No active backlogs',
      deadline: '2026-11-15',
      description: 'National Qualifier Test (NQT) based hiring for premier digital division focusing on enterprise AI, IoT, Cloud migration, and Agile transformation.',
      applyUrl: 'https://tcs.com/careers',
      isFeatured: false,
      postedDate: '2026-09-10'
    },
    {
      id: 'opp_7',
      company: 'Swiggy',
      companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=120',
      position: 'Backend Developer Intern',
      type: 'Internship',
      location: 'Bengaluru, India',
      workMode: 'Hybrid',
      salary: '₹50,000 / month',
      requiredSkills: 'Golang / Java, Redis, Kafka, MySQL, REST APIs, Microservices architecture',
      eligibility: 'B.Tech/B.E students graduating in 2026 or 2027',
      deadline: '2026-10-22',
      description: 'Work on hyper-scale delivery dispatch routing engine handling 2+ million orders per day with sub-second latency constraints.',
      applyUrl: 'https://careers.swiggy.com',
      isFeatured: false,
      postedDate: '2026-09-21'
    },
    {
      id: 'opp_8',
      company: 'Infosys (SP & DSE)',
      companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=120',
      position: 'Specialist Programmer (Power Programmer)',
      type: 'Job',
      location: 'Bengaluru / Pune / Mysore',
      workMode: 'Hybrid',
      salary: '₹9,50,000 - ₹11,00,000 / annum',
      requiredSkills: 'High level coding in HackWithInfy, Dynamic Programming, Graph Theory, System Design',
      eligibility: 'Any engineering graduate batch 2026, clearance of coding test',
      deadline: '2026-11-20',
      description: 'Prestigious elite coder tier solving high-complexity architectural challenges for Fortune 500 enterprise clients worldwide.',
      applyUrl: 'https://infosys.com/careers',
      isFeatured: false,
      postedDate: '2026-09-12'
    },
    {
      id: 'opp_9',
      company: 'Zomato',
      companyLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=120',
      position: 'Product Analytics & Growth Intern',
      type: 'Internship',
      location: 'Gurugram / Remote',
      workMode: 'Hybrid',
      salary: '₹40,000 / month',
      requiredSkills: 'SQL, Python Pandas, PowerBI/Tableau, A/B Testing, Product Metrics',
      eligibility: 'Final & Pre-final year students with analytical mindset',
      deadline: '2026-10-28',
      description: 'Analyze user funnels, run experimentation on dining and quick-commerce features, and derive actionable growth insights directly for business leaders.',
      applyUrl: 'https://zomato.com/careers',
      isFeatured: false,
      postedDate: '2026-09-25'
    }
  ],

  bookmarks: ['opp_1', 'opp_3', 'opp_5'],
  appliedJobs: [
    {
      id: 'app_1',
      opportunityId: 'opp_1',
      userId: 'usr_student_1',
      appliedDate: '2026-09-18',
      status: 'Under Review'
    }
  ],

  aptitudeQuestions: [
    // Quantitative Aptitude (8 questions)
    {
      id: 'apt_1',
      category: 'Quantitative Aptitude',
      difficulty: 'Medium',
      question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
      options: [
        '65 seconds',
        '89 seconds',
        '100 seconds',
        '75 seconds'
      ],
      correctAnswer: 1, // 89 seconds
      explanation: 'Speed of the train = Length / Time = 240/24 = 10 m/s. Total distance to cross platform = 240 + 650 = 890 m. Time required = 890 / 10 = 89 seconds.'
    },
    {
      id: 'apt_2',
      category: 'Quantitative Aptitude',
      difficulty: 'Easy',
      question: 'A shopkeeper marks an article at 20% above the cost price and gives a discount of 10% on the marked price. What is his net gain percentage?',
      options: [
        '8%',
        '10%',
        '12%',
        '6%'
      ],
      correctAnswer: 0, // 8%
      explanation: 'Let CP = 100. Marked Price = 120. Discount = 10% of 120 = 12. Selling Price = 120 - 12 = 108. Net Profit = 108 - 100 = 8%.'
    },
    {
      id: 'apt_3',
      category: 'Quantitative Aptitude',
      difficulty: 'Hard',
      question: 'A and B together can do a piece of work in 12 days. B and C can do it in 15 days, and C and A in 20 days. In how many days can A alone do the entire work?',
      options: [
        '24 days',
        '30 days',
        '40 days',
        '20 days'
      ],
      correctAnswer: 1, // 30 days
      explanation: '2(A + B + C)\'s 1 day work = 1/12 + 1/15 + 1/20 = (5 + 4 + 3)/60 = 12/60 = 1/5. (A + B + C) 1 day = 1/10. A\'s 1 day work = (A+B+C) - (B+C) = 1/10 - 1/15 = 1/30. So A alone completes it in 30 days.'
    },
    {
      id: 'apt_4',
      category: 'Quantitative Aptitude',
      difficulty: 'Medium',
      question: 'Two pipes A and B can fill a cistern in 20 and 30 minutes respectively, and a third pipe C can empty it in 40 minutes. How long will it take to fill the tank if all three pipes are opened simultaneously?',
      options: [
        '17 1/7 minutes',
        '15 minutes',
        '18 2/3 minutes',
        '16 1/4 minutes'
      ],
      correctAnswer: 0, // 17 1/7 min
      explanation: 'Net 1 minute fill rate = 1/20 + 1/30 - 1/40 = (6 + 4 - 3)/120 = 7/120. Total time required = 120/7 = 17 1/7 minutes.'
    },
    {
      id: 'apt_5',
      category: 'Quantitative Aptitude',
      difficulty: 'Easy',
      question: 'The average of 5 consecutive numbers is 27. What is the product of the smallest and largest numbers?',
      options: [
        '725',
        '700',
        '675',
        '715'
      ],
      correctAnswer: 0, // 725
      explanation: 'Since numbers are consecutive, middle number = 27. The numbers are 25, 26, 27, 28, 29. Smallest = 25, Largest = 29. Product = 25 * 29 = 725.'
    },
    {
      id: 'apt_6',
      category: 'Quantitative Aptitude',
      difficulty: 'Medium',
      question: 'In how many different ways can the letters of the word "LEADING" be arranged in such a way that the vowels always come together?',
      options: [
        '360',
        '480',
        '720',
        '5040'
      ],
      correctAnswer: 2, // 720
      explanation: 'The word "LEADING" has 7 letters with vowels E, A, I (3 vowels) and consonants L, D, N, G (4 consonants). Treat (EAI) as 1 unit. Total units = 4 + 1 = 5. Arrangements = 5! * 3! = 120 * 6 = 720 ways.'
    },
    {
      id: 'apt_7',
      category: 'Quantitative Aptitude',
      difficulty: 'Hard',
      question: 'A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?',
      options: [
        '3/7',
        '4/7',
        '1/2',
        '4/5'
      ],
      correctAnswer: 1, // 4/7
      explanation: 'Total balls = 6 + 8 = 14. Number of white balls = 8. Probability = 8/14 = 4/7.'
    },
    {
      id: 'apt_8',
      category: 'Quantitative Aptitude',
      difficulty: 'Easy',
      question: 'If simple interest on a certain sum of money for 3 years at 5% per annum is ₹600, what is the principal amount?',
      options: [
        '₹4,000',
        '₹3,500',
        '₹4,500',
        '₹5,000'
      ],
      correctAnswer: 0, // ₹4000
      explanation: 'SI = (P * R * T) / 100. 600 = (P * 5 * 3) / 100. P = (600 * 100) / 15 = ₹4,000.'
    },

    // Logical Reasoning (6 questions)
    {
      id: 'apt_9',
      category: 'Logical Reasoning',
      difficulty: 'Medium',
      question: 'Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?',
      options: [
        '7',
        '10',
        '12',
        '13'
      ],
      correctAnswer: 1, // 10
      explanation: 'This is an alternating addition and subtraction series: +3, -2, +3, -2, +3... So after 12, subtract 2: 12 - 2 = 10.'
    },
    {
      id: 'apt_10',
      category: 'Logical Reasoning',
      difficulty: 'Easy',
      question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
      options: [
        'Brother',
        'Uncle',
        'Father',
        'Cousin'
      ],
      correctAnswer: 2, // Father
      explanation: 'Mother\'s only son is Suresh himself. Therefore, the boy is the son of Suresh. Suresh is his Father.'
    },
    {
      id: 'apt_11',
      category: 'Logical Reasoning',
      difficulty: 'Hard',
      question: 'Statements: All mangoes are golden in colour. No golden-coloured things are cheap.\nConclusions: \nI. All mangoes are cheap.\nII. Golden-coloured mangoes are not cheap.',
      options: [
        'Only conclusion I follows',
        'Only conclusion II follows',
        'Either I or II follows',
        'Neither I nor II follows'
      ],
      correctAnswer: 1, // Only conclusion II follows
      explanation: 'Since all mangoes are golden, and no golden things are cheap, it directly implies golden-coloured mangoes cannot be cheap.'
    },
    {
      id: 'apt_12',
      category: 'Logical Reasoning',
      difficulty: 'Medium',
      question: 'If "CLOUD" is coded as "DMPVE" in a certain code language, how will "SIGHT" be coded?',
      options: [
        'TJHIU',
        'TIHIU',
        'THJIU',
        'TJIVU'
      ],
      correctAnswer: 0, // TJHIU
      explanation: 'Each letter is shifted forward by +1: C->D, L->M, O->P, U->V, D->E. For SIGHT: S->T, I->J, G->H, H->I, T->U. Result: TJHIU.'
    },
    {
      id: 'apt_13',
      category: 'Logical Reasoning',
      difficulty: 'Medium',
      question: 'A person walks 5 km North, turns right and walks 3 km, then turns right again and walks 5 km. In which direction is he now from his starting point?',
      options: [
        'North',
        'South',
        'East',
        'West'
      ],
      correctAnswer: 2, // East
      explanation: 'He goes 5km N, then 3km E, then 5km S (returning to the same vertical level as starting point). He is exactly 3 km East from the start.'
    },
    {
      id: 'apt_14',
      category: 'Logical Reasoning',
      difficulty: 'Easy',
      question: 'Find the odd one out: 27, 64, 125, 144, 216, 343',
      options: [
        '64',
        '125',
        '144',
        '216'
      ],
      correctAnswer: 2, // 144
      explanation: '27 = 3^3, 64 = 4^3, 125 = 5^3, 216 = 6^3, 343 = 7^3 are all perfect cubes. 144 is 12^2 (a square, not a cube of an integer).'
    },

    // Verbal Ability (6 questions)
    {
      id: 'apt_15',
      category: 'Verbal Ability',
      difficulty: 'Easy',
      question: 'Choose the word that is most nearly SYNONYMOUS in meaning to "PRAGMATIC":',
      options: [
        'Theoretical',
        'Practical',
        'Arrogant',
        'Impulsive'
      ],
      correctAnswer: 1, // Practical
      explanation: 'Pragmatic means dealing with things sensibly and realistically based on practical rather than theoretical considerations.'
    },
    {
      id: 'apt_16',
      category: 'Verbal Ability',
      difficulty: 'Medium',
      question: 'Choose the word that is most nearly OPPOSITE in meaning to "CANDID":',
      options: [
        'Honest',
        'Deceitful',
        'Blunt',
        'Frank'
      ],
      correctAnswer: 1, // Deceitful
      explanation: 'Candid means truthful, straightforward, and frank. The opposite is deceitful or secretive.'
    },
    {
      id: 'apt_17',
      category: 'Verbal Ability',
      difficulty: 'Medium',
      question: 'Fill in the blank: The committee decided to ______ the decision until further market research was conducted.',
      options: [
        'defer',
        'differ',
        'defy',
        'diffuse'
      ],
      correctAnswer: 0, // defer
      explanation: '"Defer" means to put off or postpone to a later time.'
    },
    {
      id: 'apt_18',
      category: 'Verbal Ability',
      difficulty: 'Hard',
      question: 'Identify the sentence with correct grammatical structure:',
      options: [
        'Neither of the two candidates have submitted their resumes.',
        'Neither of the two candidates has submitted his resume.',
        'Neither of the two candidates were submitting their resumes.',
        'Neither of the two candidates are ready for an interview.'
      ],
      correctAnswer: 1, // Neither... has submitted
      explanation: '"Neither" is a singular indefinite pronoun and takes a singular verb ("has") and singular pronoun ("his/her").'
    },
    {
      id: 'apt_19',
      category: 'Verbal Ability',
      difficulty: 'Easy',
      question: 'Choose the correct idiom meaning: "To burn the midnight oil"',
      options: [
        'To waste energy unnecessarily',
        'To work late into the night',
        'To cause friction between team members',
        'To cook dinner very late'
      ],
      correctAnswer: 1, // To work late into the night
      explanation: '"Burning the midnight oil" refers to working or studying late into the night or early morning hours.'
    },
    {
      id: 'apt_20',
      category: 'Verbal Ability',
      difficulty: 'Medium',
      question: 'Select the correctly spelled word:',
      options: [
        'Acquaintance',
        'Aquaintance',
        'Acquaintence',
        'Acquantance'
      ],
      correctAnswer: 0, // Acquaintance
      explanation: 'The correct spelling is "Acquaintance" (A-C-Q-U-A-I-N-T-A-N-C-E).'
    }
  ],

  testResults: [
    {
      id: 'res_1',
      userId: 'usr_student_1',
      testTitle: 'General Aptitude Full Mock 1',
      date: '2026-09-24T14:30:00Z',
      category: 'All Categories',
      totalQuestions: 15,
      correctCount: 12,
      incorrectCount: 3,
      score: 12,
      percentage: 80,
      accuracy: 80,
      timeSpentSeconds: 540
    },
    {
      id: 'res_2',
      userId: 'usr_student_1',
      testTitle: 'Quantitative Aptitude Special',
      date: '2026-09-27T10:15:00Z',
      category: 'Quantitative Aptitude',
      totalQuestions: 8,
      correctCount: 7,
      incorrectCount: 1,
      score: 7,
      percentage: 87.5,
      accuracy: 87.5,
      timeSpentSeconds: 320
    }
  ],

  roadmap: [
    {
      phaseId: 1,
      phaseTitle: 'Phase 1: Aptitude & Reasoning Foundations',
      description: 'Master quantitative math, speed calculation, logical deduction, and verbal communication essentials for early screening rounds.',
      weight: 15,
      tasks: [
        { id: 't_1_1', title: 'Quantitative: Percentages, Profit & Loss, Ratio Proportions', status: 'Completed' },
        { id: 't_1_2', title: 'Quantitative: Time & Work, Speed Distance & Trains', status: 'Completed' },
        { id: 't_1_3', title: 'Logical Reasoning: Blood Relations, Direction Sense, Series', status: 'Completed' },
        { id: 't_1_4', title: 'Verbal Ability: Reading Comprehension & Sentence Correction', status: 'In Progress' },
        { id: 't_1_5', title: 'Timed Practice: 5 full-length speed tests', status: 'In Progress' }
      ]
    },
    {
      phaseId: 2,
      phaseTitle: 'Phase 2: Core Computer Science & Technical Skills',
      description: 'Solidify fundamental CS subjects frequently asked in technical interviews.',
      weight: 15,
      tasks: [
        { id: 't_2_1', title: 'Object-Oriented Programming (OOP) 4 Pillars & Design Patterns', status: 'Completed' },
        { id: 't_2_2', title: 'Database Management Systems (DBMS): Normalization, SQL, Indexing', status: 'Completed' },
        { id: 't_2_3', title: 'Operating Systems: Threads, Deadlocks, Memory Management', status: 'In Progress' },
        { id: 't_2_4', title: 'Computer Networks: OSI/TCP layers, DNS, HTTP/HTTPS, WebSockets', status: 'In Progress' },
        { id: 't_2_5', title: 'System Design Basics: Scalability, Caching, Load Balancers', status: 'Not Started' }
      ]
    },
    {
      phaseId: 3,
      phaseTitle: 'Phase 3: Coding & Data Structures (DSA)',
      description: 'Systematic problem solving covering arrays, trees, graphs, dynamic programming, and LeetCode patterns.',
      weight: 20,
      tasks: [
        { id: 't_3_1', title: 'Arrays, Two Pointers, Sliding Window & HashMaps', status: 'Completed' },
        { id: 't_3_2', title: 'Linked Lists, Stacks, Queues & Recursion', status: 'Completed' },
        { id: 't_3_3', title: 'Binary Trees, Binary Search Trees & Heaps', status: 'Completed' },
        { id: 't_3_4', title: 'Graph Algorithms: BFS, DFS, Dijkstra, Disjoint Set', status: 'In Progress' },
        { id: 't_3_5', title: 'Dynamic Programming: 1D, 2D grids & Knapsack patterns', status: 'In Progress' },
        { id: 't_3_6', title: 'Solve 150+ Top Interview Questions on LeetCode/CodeStudio', status: 'In Progress' }
      ]
    },
    {
      phaseId: 4,
      phaseTitle: 'Phase 4: Communication & Soft Skills',
      description: 'Sharpen your verbal delivery, behavioral STAR responses, group discussion participation, and technical explanations.',
      weight: 15,
      tasks: [
        { id: 't_4_1', title: 'Draft standard 90-second "Tell me about yourself" pitch', status: 'Completed' },
        { id: 't_4_2', title: 'Prepare 5 STAR format stories for behavioral questions', status: 'Completed' },
        { id: 't_4_3', title: 'Group Discussion (GD) active listening & articulation practice', status: 'In Progress' },
        { id: 't_4_4', title: 'Practice explaining complex technical projects simply', status: 'Completed' }
      ]
    },
    {
      phaseId: 5,
      phaseTitle: 'Phase 5: Resume & Portfolio Polish',
      description: 'Create an ATS-friendly, single-page resume with quantified impact metrics and deployed projects.',
      weight: 15,
      tasks: [
        { id: 't_5_1', title: 'Build 1-page ATS-optimized resume with standard typography', status: 'Completed' },
        { id: 't_5_2', title: 'Ensure all GitHub repositories have clean READMEs & live demos', status: 'Completed' },
        { id: 't_5_3', title: 'Optimize LinkedIn profile with professional headshot & skills', status: 'Completed' },
        { id: 't_5_4', title: 'Get resume reviewed by alumni / senior engineers', status: 'In Progress' }
      ]
    },
    {
      phaseId: 6,
      phaseTitle: 'Phase 6: Mock Interviews & Company Specific Prep',
      description: 'Simulate high-pressure technical and managerial rounds to build confidence before the campus drive.',
      weight: 20,
      tasks: [
        { id: 't_6_1', title: 'Complete 2 Peer-to-Peer Technical Mock Interviews', status: 'Completed' },
        { id: 't_6_2', title: 'Practice live whiteboarding / Google Docs coding without IDE assistance', status: 'In Progress' },
        { id: 't_6_3', title: 'Research target companies, company values, and past questions', status: 'In Progress' },
        { id: 't_6_4', title: 'Complete 1 Faculty / Senior HR Mock Interview session', status: 'Not Started' }
      ]
    }
  ],

  notifications: [
    {
      id: 'notif_1',
      userId: 'usr_student_1',
      title: 'New Campus Drive Announced: Google Cloud',
      message: 'Google Cloud is hiring Associate Software Engineers for 2026 batch. Deadline to apply is Oct 25.',
      type: 'opportunity',
      date: '2026-09-28T09:00:00Z',
      read: false,
      link: '/opportunities'
    },
    {
      id: 'notif_2',
      userId: 'usr_student_1',
      title: 'Aptitude Test Score Recorded',
      message: 'You scored 80% on General Aptitude Full Mock 1. Great work on Quantitative questions!',
      type: 'aptitude',
      date: '2026-09-24T14:35:00Z',
      read: true,
      link: '/aptitude'
    },
    {
      id: 'notif_3',
      userId: 'usr_student_1',
      title: 'Upcoming Deadline: Razorpay Internships',
      message: 'Only 3 days left to submit your application for Frontend Engineering Intern at Razorpay.',
      type: 'deadline',
      date: '2026-09-27T16:00:00Z',
      read: false,
      link: '/opportunities'
    },
    {
      id: 'notif_4',
      userId: 'usr_student_1',
      title: 'Placement Readiness Milestone',
      message: 'Your Placement Readiness index has crossed 75%! Keep practicing Aptitude and DSA.',
      type: 'roadmap',
      date: '2026-09-22T11:00:00Z',
      read: true,
      link: '/dashboard'
    }
  ],

  announcements: [
    {
      id: 'ann_1',
      title: 'Pre-Placement Talk: Microsoft IDC Campus Drive 2026',
      content: 'The Training & Placement Cell is organizing a mandatory pre-placement talk for all registered CS/IT final year students in the Main Auditorium on October 5th at 10:00 AM.',
      date: '2026-09-26',
      postedBy: 'Dr. Ramesh Kulkarni (Placement Dean)',
      important: true
    },
    {
      id: 'ann_2',
      title: 'Resume Verification Deadline Notice',
      content: 'All students must verify their semester marks, CGPA certificates, and uploaded resumes on the portal before October 15th to maintain eligibility for Tier-1 corporate visits.',
      date: '2026-09-23',
      postedBy: 'TPO Coordination Committee',
      important: false
    }
  ],

  recentActivities: [
    {
      id: 'act_1',
      userId: 'usr_student_1',
      title: 'Completed Aptitude Test',
      description: 'Scored 80% on General Aptitude Full Mock 1',
      timestamp: '2 hours ago',
      type: 'aptitude'
    },
    {
      id: 'act_2',
      userId: 'usr_student_1',
      title: 'Applied to Google Cloud',
      description: 'Submitted application for Associate Software Engineer',
      timestamp: '1 day ago',
      type: 'opportunity'
    },
    {
      id: 'act_3',
      userId: 'usr_student_1',
      title: 'Added Certification',
      description: 'Added AWS Certified Cloud Practitioner (CLF-C02)',
      timestamp: '3 days ago',
      type: 'certification'
    },
    {
      id: 'act_4',
      userId: 'usr_student_1',
      title: 'Roadmap Progress',
      description: 'Completed Binary Trees & Heaps milestone in Phase 3',
      timestamp: '4 days ago',
      type: 'roadmap'
    }
  ]
};
