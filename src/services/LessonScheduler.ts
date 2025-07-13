import { getCurrentDay } from '../utils/dateHelpers';
import { isLessonCompleted, setLessonCompleted } from '../utils/storageHelpers';
import lessonsData from '../data/lessons.json';

export interface Lesson {
  day: number;
  type: 'chat' | 'video';
  title: string;
  prompt?: string;
  youtubeId?: string;
  objectives: string;
  reviewable: boolean;
}

export class LessonScheduler {
  private static instance: LessonScheduler;
  private lessons: Lesson[] = lessonsData as Lesson[];

  private constructor() { }

  public static getInstance(): LessonScheduler {
    if (!LessonScheduler.instance) {
      LessonScheduler.instance = new LessonScheduler();
    }
    return LessonScheduler.instance;
  }

  public getTodayLesson(): Lesson | null {
    const currentDay = getCurrentDay();

    if (currentDay > 60) {
      return null; // All lessons completed
    }

    return this.lessons.find(lesson => lesson.day === currentDay) || null;
  }

  public getLessonByDay(day: number): Lesson | null {
    if (day < 1 || day > 60) {
      return null;
    }

    return this.lessons.find(lesson => lesson.day === day) || null;
  }

  public isTodayLessonCompleted(): boolean {
    const currentDay = getCurrentDay();
    return isLessonCompleted(currentDay);
  }

  public completeTodayLesson(): void {
    const currentDay = getCurrentDay();
    setLessonCompleted(currentDay);
  }

  public getNextLesson(): Lesson | null {
    const currentDay = getCurrentDay();
    const nextDay = currentDay + 1;

    if (nextDay > 60) {
      return null;
    }

    return this.getLessonByDay(nextDay);
  }

  public getPreviousLesson(): Lesson | null {
    const currentDay = getCurrentDay();
    const previousDay = currentDay - 1;

    if (previousDay < 1) {
      return null;
    }

    return this.getLessonByDay(previousDay);
  }

  public getAllLessons(): Lesson[] {
    return this.lessons;
  }

  public getCompletedLessons(): Lesson[] {
    return this.lessons.filter(lesson => isLessonCompleted(lesson.day));
  }

  public getIncompleteLessons(): Lesson[] {
    return this.lessons.filter(lesson => !isLessonCompleted(lesson.day));
  }

  public getCurrentProgress(): { completed: number; total: number; percentage: number } {
    const completed = this.getCompletedLessons().length;
    const total = this.lessons.length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
  }

  public shouldShowReview(): boolean {
    const todayLesson = this.getTodayLesson();
    return todayLesson?.reviewable || false;
  }

  public getStreakDays(): number {
    const currentDay = getCurrentDay();
    let streak = 0;

    for (let day = currentDay; day >= 1; day--) {
      if (isLessonCompleted(day)) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
} 