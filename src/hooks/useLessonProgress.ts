import { useState, useEffect, useCallback } from 'react';
import { LessonScheduler } from '../services/LessonScheduler';
import { getCurrentDay, getDaysSinceStart } from '../utils/dateHelpers';
import { getTotalProgress, getProgressPercentage, getUserData } from '../utils/storageHelpers';

export const useLessonProgress = () => {
  const [currentDay, setCurrentDay] = useState(getCurrentDay());
  const [totalProgress, setTotalProgress] = useState(getTotalProgress());
  const [progressPercentage, setProgressPercentage] = useState(getProgressPercentage());
  const [userData, setUserData] = useState(getUserData());
  const [isTodayCompleted, setIsTodayCompleted] = useState(false);

  const lessonScheduler = LessonScheduler.getInstance();

  const updateProgress = useCallback(() => {
    setCurrentDay(getCurrentDay());
    setTotalProgress(getTotalProgress());
    setProgressPercentage(getProgressPercentage());
    setUserData(getUserData());
    setIsTodayCompleted(lessonScheduler.isTodayLessonCompleted());
  }, [lessonScheduler]);

  useEffect(() => {
    updateProgress();

    // Update progress every minute to handle day changes
    const interval = setInterval(updateProgress, 60000);

    return () => clearInterval(interval);
  }, [updateProgress]);

  const completeTodayLesson = useCallback(() => {
    lessonScheduler.completeTodayLesson();
    updateProgress();
  }, [lessonScheduler, updateProgress]);

  const getTodayLesson = useCallback(() => {
    return lessonScheduler.getTodayLesson();
  }, [lessonScheduler]);

  const getNextLesson = useCallback(() => {
    return lessonScheduler.getNextLesson();
  }, [lessonScheduler]);

  const getPreviousLesson = useCallback(() => {
    return lessonScheduler.getPreviousLesson();
  }, [lessonScheduler]);

  const getStreakDays = useCallback(() => {
    return lessonScheduler.getStreakDays();
  }, [lessonScheduler]);

  const shouldShowReview = useCallback(() => {
    return lessonScheduler.shouldShowReview();
  }, [lessonScheduler]);

  const getCurrentProgress = useCallback(() => {
    return lessonScheduler.getCurrentProgress();
  }, [lessonScheduler]);

  const daysSinceStart = getDaysSinceStart();

  return {
    currentDay,
    totalProgress,
    progressPercentage,
    userData,
    isTodayCompleted,
    daysSinceStart,
    completeTodayLesson,
    getTodayLesson,
    getNextLesson,
    getPreviousLesson,
    getStreakDays,
    shouldShowReview,
    getCurrentProgress,
    updateProgress
  };
}; 