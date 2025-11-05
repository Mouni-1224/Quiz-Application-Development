export interface User {
  id: string;
  email: string;
  name: string;
  loginTime: number;
}

export interface QuizAttempt {
  subject: string;
  score: number;
  totalQuestions: number;
  answers: Record<number, number>; // question index -> selected option index
  completedAt: number;
}

export interface WeeklyPoints {
  week: number; // ISO week number
  year: number;
  points: number;
  completedSubjects: string[]; // subjects completed this week
  lastUpdated: number;
}

export interface UserStats {
  totalAttempts: number;
  weeklyPoints: WeeklyPoints[];
  allTimeScore: number;
  currentWeekPoints: number;
}

const STORAGE_KEYS = {
  USER: "quiz_app_user",
  QUIZ_ATTEMPTS: "quiz_app_attempts",
  USER_STATS: "quiz_app_stats",
  WEEKLY_POINTS: "quiz_app_weekly_points",
};

export const Storage = {
  // User Management
  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  isLoggedIn: (): boolean => {
    return Storage.getUser() !== null;
  },

  // Quiz Attempts
  addQuizAttempt: (attempt: QuizAttempt) => {
    const attempts = Storage.getQuizAttempts();
    attempts.push(attempt);
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
  },

  getQuizAttempts: (): QuizAttempt[] => {
    const attempts = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    return attempts ? JSON.parse(attempts) : [];
  },

  getSubjectAttempts: (subject: string): QuizAttempt[] => {
    return Storage.getQuizAttempts().filter((a) => a.subject === subject);
  },

  // User Statistics
  getUserStats: (): UserStats => {
    const stats = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    return stats
      ? JSON.parse(stats)
      : {
          totalAttempts: 0,
          weeklyPoints: [],
          allTimeScore: 0,
          currentWeekPoints: 0,
        };
  },

  updateUserStats: (stats: UserStats) => {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  },

  // Weekly Points Management
  getCurrentWeekPoints: (): number => {
    const weekPoints = Storage.getWeeklyPoints();
    const currentWeek = weekPoints.find(
      (w) => w.week === getCurrentWeekNumber() && w.year === new Date().getFullYear()
    );
    return currentWeek?.points || 0;
  },

  addWeeklyPoints: (points: number, subject: string) => {
    const weekPoints = Storage.getWeeklyPoints();
    const currentWeek = getCurrentWeekNumber();
    const currentYear = new Date().getFullYear();

    let weekRecord = weekPoints.find(
      (w) => w.week === currentWeek && w.year === currentYear
    );

    if (!weekRecord) {
      weekRecord = {
        week: currentWeek,
        year: currentYear,
        points: 0,
        completedSubjects: [],
        lastUpdated: Date.now(),
      };
      weekPoints.push(weekRecord);
    }

    weekRecord.points += points;
    weekRecord.lastUpdated = Date.now();

    if (!weekRecord.completedSubjects.includes(subject)) {
      weekRecord.completedSubjects.push(subject);
    }

    localStorage.setItem(STORAGE_KEYS.WEEKLY_POINTS, JSON.stringify(weekPoints));

    // Update overall stats
    const stats = Storage.getUserStats();
    stats.currentWeekPoints = weekRecord.points;
    stats.allTimeScore += points;
    stats.totalAttempts += 1;
    Storage.updateUserStats(stats);
  },

  getWeeklyPoints: (): WeeklyPoints[] => {
    const points = localStorage.getItem(STORAGE_KEYS.WEEKLY_POINTS);
    return points ? JSON.parse(points) : [];
  },

  hasCompletedAllSubjectsThisWeek: (): boolean => {
    const weekPoints = Storage.getWeeklyPoints();
    const currentWeek = weekPoints.find(
      (w) =>
        w.week === getCurrentWeekNumber() &&
        w.year === new Date().getFullYear()
    );
    return currentWeek ? currentWeek.completedSubjects.length === 4 : false;
  },

  // Clear all data (for logout)
  clearAllData: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    // Keep quiz history for future reference
  },
};

function getCurrentWeekNumber(): number {
  const date = new Date();
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
