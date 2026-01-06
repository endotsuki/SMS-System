import type { User, Class, Assignment, Announcement, Grade, Enrollment } from '@/types';

// Mock Users
export const mockUsers: Record<string, User> = {
  admin1: {
    id: 'admin1',
    name: 'Sarah Johnson',
    email: 'admin@school.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    department: 'Administration',
    phone: '+1 (555) 123-4567',
  },
  teacher1: {
    id: 'teacher1',
    name: 'Michael Chen',
    email: 'm.chen@school.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    department: 'Mathematics',
    phone: '+1 (555) 234-5678',
  },
  teacher2: {
    id: 'teacher2',
    name: 'Emma Wilson',
    email: 'e.wilson@school.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    department: 'English',
    phone: '+1 (555) 345-6789',
  },
  student1: {
    id: 'student1',
    name: 'Alex Rivera',
    email: 'a.rivera@student.school.edu',
    role: 'student',
    avatar: 'https://www.untitledui.com/images/avatars/cohen-lozano?w=400&h=400&fit=crop',
    department: 'Grade 10',
    phone: '+1 (555) 456-7890',
  },
  student2: {
    id: 'student2',
    name: 'Jordan Lee',
    email: 'j.lee@student.school.edu',
    role: 'student',
    avatar: 'https://www.untitledui.com/images/avatars/ammar-foley?w=400&h=400&fit=crop',
    department: 'Grade 10',
    phone: '+1 (555) 567-8901',
  },
  student3: {
    id: 'student3',
    name: 'Taylor Smith',
    email: 't.smith@student.school.edu',
    role: 'student',
    avatar: 'https://www.untitledui.com/images/avatars/amanda-lowery?w=400&h=400&fit=crop',
    department: 'Grade 11',
    phone: '+1 (555) 678-9012',
  },
};

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: 'class1',
    name: 'Advanced Calculus',
    code: 'MATH-301',
    description: 'A comprehensive course on calculus covering derivatives and integrals.',
    teacher: mockUsers.teacher1,
    studentCount: 28,
    schedule: 'Mon, Wed, Fri - 10:00 AM',
    room: 'Room 301',
    image:
      'https://images.unsplash.com/photo-1758685734006-4a3cb9253a2b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&h=400&fit=crop',
  },
  {
    id: 'class2',
    name: 'Literature & Writing',
    code: 'ENG-201',
    description: 'Exploring great works of literature and developing writing skills.',
    teacher: mockUsers.teacher2,
    studentCount: 32,
    schedule: 'Tue, Thu - 2:00 PM',
    room: 'Room 205',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&h=400&fit=crop',
  },
  {
    id: 'class3',
    name: 'Data Structures',
    code: 'CS-401',
    description: 'In-depth study of data structures and algorithms.',
    teacher: mockUsers.teacher1,
    studentCount: 24,
    schedule: 'Mon, Wed - 1:00 PM',
    room: 'Lab 101',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
  },
  {
    id: 'class4',
    name: 'World History',
    code: 'HIST-101',
    description: 'Survey of major historical events and civilizations.',
    teacher: mockUsers.teacher2,
    studentCount: 35,
    schedule: 'Tue, Thu, Sat - 11:00 AM',
    room: 'Room 120',
    image: 'https://images.unsplash.com/photo-1497633012509-a1f91a34aba3?w=600&h=400&fit=crop',
  },
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'assign1',
    title: 'Derivative Problem Set',
    description: 'Solve 20 problems on derivatives and chain rule',
    classId: 'class1',
    dueDate: new Date('2025-01-15'),
    createdDate: new Date('2025-01-08'),
    points: 100,
    status: 'published',
  },
  {
    id: 'assign2',
    title: 'Essay: Personal Narrative',
    description: 'Write a 1500-word personal narrative essay',
    classId: 'class2',
    dueDate: new Date('2025-01-18'),
    createdDate: new Date('2025-01-04'),
    points: 100,
    status: 'published',
  },
  {
    id: 'assign3',
    title: 'Algorithm Implementation',
    description: 'Implement binary search and quicksort algorithms',
    classId: 'class3',
    dueDate: new Date('2025-01-20'),
    createdDate: new Date('2025-01-06'),
    points: 150,
    status: 'published',
  },
  {
    id: 'assign4',
    title: 'Mid-term Exam Review',
    description: 'Review guide for mid-term examination',
    classId: 'class4',
    dueDate: new Date('2025-02-01'),
    createdDate: new Date('2025-01-10'),
    points: 50,
    status: 'draft',
  },
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'System Maintenance Notice',
    content: 'The learning management system will be down for maintenance on January 20-21, 2025, from 10 PM to 6 AM.',
    author: mockUsers.admin1,
    createdDate: new Date('2025-01-10'),
    priority: 'high',
  },
  {
    id: 'ann2',
    title: 'New Feature: Class Discussion Forum',
    content: "We've added a new discussion forum for each class to improve student engagement and collaboration.",
    author: mockUsers.admin1,
    createdDate: new Date('2025-01-08'),
    priority: 'medium',
  },
  {
    id: 'ann3',
    title: 'Reminder: Update Your Profile',
    content: 'Please ensure your profile information is up to date. This helps us send you relevant notifications.',
    author: mockUsers.admin1,
    createdDate: new Date('2025-01-05'),
    priority: 'low',
  },
];

// Mock Grades
export const mockGrades: Grade[] = [
  {
    id: 'grade1',
    studentId: 'student1',
    classId: 'class1',
    subject: 'Midterm Exam',
    grade: 88,
    date: new Date('2024-12-15'),
  },
  {
    id: 'grade2',
    studentId: 'student1',
    classId: 'class1',
    subject: 'Quiz 1',
    grade: 92,
    date: new Date('2024-12-01'),
  },
  {
    id: 'grade3',
    studentId: 'student1',
    classId: 'class2',
    subject: 'Essay Submission',
    grade: 85,
    date: new Date('2024-12-20'),
  },
  {
    id: 'grade4',
    studentId: 'student2',
    classId: 'class1',
    subject: 'Midterm Exam',
    grade: 91,
    date: new Date('2024-12-15'),
  },
  {
    id: 'grade5',
    studentId: 'student3',
    classId: 'class1',
    subject: 'Midterm Exam',
    grade: 78,
    date: new Date('2024-12-15'),
  },
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: 'enroll1',
    studentId: 'student1',
    classId: 'class1',
    enrolledDate: new Date('2024-09-01'),
    status: 'active',
  },
  {
    id: 'enroll2',
    studentId: 'student1',
    classId: 'class2',
    enrolledDate: new Date('2024-09-01'),
    status: 'active',
  },
  {
    id: 'enroll3',
    studentId: 'student2',
    classId: 'class1',
    enrolledDate: new Date('2024-09-01'),
    status: 'active',
  },
  {
    id: 'enroll4',
    studentId: 'student2',
    classId: 'class3',
    enrolledDate: new Date('2024-09-01'),
    status: 'active',
  },
  {
    id: 'enroll5',
    studentId: 'student3',
    classId: 'class2',
    enrolledDate: new Date('2024-09-01'),
    status: 'active',
  },
];

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return Object.values(mockUsers).find((user) => user.id === id);
};

export const getClassesByTeacher = (teacherId: string): Class[] => {
  return mockClasses.filter((cls) => cls.teacher.id === teacherId);
};

export const getStudentClasses = (studentId: string): Class[] => {
  const enrolledClassIds = mockEnrollments.filter((e) => e.studentId === studentId && e.status === 'active').map((e) => e.classId);
  return mockClasses.filter((cls) => enrolledClassIds.includes(cls.id));
};

export const getClassAssignments = (classId: string): Assignment[] => {
  return mockAssignments.filter((a) => a.classId === classId);
};

export const getStudentAssignments = (studentId: string): Assignment[] => {
  const studentClasses = getStudentClasses(studentId);
  const classIds = studentClasses.map((c) => c.id);
  return mockAssignments.filter((a) => classIds.includes(a.classId));
};

export const getGradesByStudent = (studentId: string): Grade[] => {
  return mockGrades.filter((g) => g.studentId === studentId);
};

export const getStudentsInClass = (classId: string): User[] => {
  const enrollments = mockEnrollments.filter((e) => e.classId === classId && e.status === 'active');
  return enrollments.map((e) => getUserById(e.studentId)).filter((user): user is User => user !== undefined && user.role === 'student');
};

export const getClassGrades = (classId: string): Grade[] => {
  return mockGrades.filter((g) => g.classId === classId);
};
