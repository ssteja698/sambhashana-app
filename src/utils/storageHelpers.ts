export interface LessonProgress {
  [day: number]: boolean;
}

export interface UserData {
  startDate: string;
  lessonProgress: LessonProgress;
  streak: number;
  lastCompletedDay: number;
  totalLessonsCompleted: number;
}

export const getLessonProgress = (): LessonProgress => {
  const stored = localStorage.getItem('sambhashana_lesson_progress');
  return stored ? JSON.parse(stored) : {};
};

export const setLessonCompleted = (day: number): void => {
  const progress = getLessonProgress();
  progress[day] = true;
  localStorage.setItem('sambhashana_lesson_progress', JSON.stringify(progress));

  // Update user data
  updateUserData(day);
};

export const isLessonCompleted = (day: number): boolean => {
  const progress = getLessonProgress();
  return progress[day] || false;
};

export const getUserData = (): UserData => {
  const stored = localStorage.getItem('sambhashana_user_data');
  if (stored) {
    return JSON.parse(stored);
  }

  const defaultData: UserData = {
    startDate: new Date().toISOString(),
    lessonProgress: {},
    streak: 0,
    lastCompletedDay: 0,
    totalLessonsCompleted: 0
  };

  localStorage.setItem('sambhashana_user_data', JSON.stringify(defaultData));
  return defaultData;
};

export const updateUserData = (completedDay: number): void => {
  const userData = getUserData();
  const progress = getLessonProgress();

  userData.totalLessonsCompleted = Object.keys(progress).length;
  userData.lastCompletedDay = completedDay;

  // Calculate streak
  let streak = 0;
  let currentDay = completedDay;

  while (progress[currentDay] && currentDay > 0) {
    streak++;
    currentDay--;
  }

  userData.streak = streak;

  localStorage.setItem('sambhashana_user_data', JSON.stringify(userData));
};

export const getTotalProgress = (): number => {
  const progress = getLessonProgress();
  const completedLessons = Object.keys(progress).length;
  return Math.min(60, completedLessons);
};

export const getProgressPercentage = (): number => {
  const totalProgress = getTotalProgress();
  return Math.round((totalProgress / 60) * 100);
};

export const resetProgress = (): void => {
  localStorage.removeItem('sambhashana_lesson_progress');
  localStorage.removeItem('sambhashana_user_data');
  localStorage.removeItem('sambhashana_start_date');
}; 