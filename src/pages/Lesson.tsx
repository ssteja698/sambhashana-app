import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLessonProgress } from "../hooks/useLessonProgress";
import { LessonHeader } from "../components/LessonHeader";
import { ChatGPTEmbed } from "../components/ChatGPTEmbed";
import { YouTubeEmbed } from "../components/YouTubeEmbed";
import { LessonComplete } from "../components/LessonComplete";

export const Lesson: React.FC = () => {
  const navigate = useNavigate();
  const {
    getTodayLesson,
    getNextLesson,
    isTodayCompleted,
    completeTodayLesson,
    getStreakDays,
    totalProgress,
  } = useLessonProgress();

  const [isCompleted, setIsCompleted] = useState(false);
  const [completedLesson, setCompletedLesson] =
    useState<typeof todayLesson>(null);

  const todayLesson = getTodayLesson();
  const nextLesson = getNextLesson();
  const streakDays = getStreakDays();

  useEffect(() => {
    // Check if today's lesson is already completed
    if (isTodayCompleted) {
      setIsCompleted(true);
      setCompletedLesson(todayLesson);
    }
  }, [isTodayCompleted, todayLesson]);

  const handleLessonComplete = () => {
    if (todayLesson) {
      completeTodayLesson();
      setCompletedLesson(todayLesson);
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  // If lesson is completed, show completion screen
  if (isCompleted && completedLesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LessonComplete
          completedLesson={completedLesson}
          nextLesson={nextLesson}
          streakDays={streakDays}
          totalProgress={totalProgress}
        />
      </div>
    );
  }

  // If no lesson available, redirect to home
  if (!todayLesson) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <LessonHeader lesson={todayLesson} onBack={handleBack} />

      {/* Lesson Content */}
      <div className="flex-1">
        {todayLesson.type === "chat" ? (
          <ChatGPTEmbed
            lesson={todayLesson}
            onComplete={handleLessonComplete}
          />
        ) : (
          <YouTubeEmbed
            lesson={todayLesson}
            onComplete={handleLessonComplete}
          />
        )}
      </div>
    </div>
  );
};
