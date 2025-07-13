import React from "react";
import { FiCheckCircle, FiArrowRight, FiHome, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Lesson } from "../services/LessonScheduler";

interface LessonCompleteProps {
  completedLesson: Lesson;
  nextLesson?: Lesson | null;
  streakDays: number;
  totalProgress: number;
}

export const LessonComplete: React.FC<LessonCompleteProps> = ({
  completedLesson,
  nextLesson,
  streakDays,
  totalProgress,
}) => {
  const navigate = useNavigate();

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate("/lesson/today");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const getStreakMessage = (streak: number): string => {
    if (streak >= 7) return "🎉 అద్భుతం! మీరు ఒక వారం నిరంతరం చేశారు!";
    if (streak >= 5) return "🔥 5 రోజుల నిరంతరం! మీరు చాలా బాగా చేస్తున్నారు!";
    if (streak >= 3) return "⭐ 3 రోజుల నిరంతరం! మీరు బాగా చేస్తున్నారు!";
    return "👍 మీరు బాగా చేస్తున్నారు!";
  };

  const getProgressMessage = (progress: number): string => {
    if (progress >= 50) return "🎯 మీరు సగం మార్గంలో ఉన్నారు!";
    if (progress >= 25) return "🚀 మీరు చాలా బాగా చేస్తున్నారు!";
    return "🌟 మీ ప్రయాణం ప్రారంభమైంది!";
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="lesson-card text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <FiCheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </div>

        {/* Congratulations Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4 telugu-text">
          అభినందనలు! | Congratulations!
        </h1>

        <p className="text-lg text-gray-700 mb-6 telugu-text">
          మీరు Day {completedLesson.day} పాఠం విజయవంతంగా పూర్తి చేశారు!
        </p>

        {/* Lesson Title */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-green-800 telugu-text">
            {completedLesson.title}
          </h2>
          <p className="text-sm text-green-600 mt-1 telugu-text">
            {completedLesson.objectives}
          </p>
        </div>

        {/* Streak Information */}
        {streakDays > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FiStar className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800 telugu-text">
                {streakDays} రోజుల నిరంతరం | {streakDays} Day Streak
              </span>
            </div>
            <p className="text-sm text-yellow-700 telugu-text">
              {getStreakMessage(streakDays)}
            </p>
          </div>
        )}

        {/* Progress Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 telugu-text">
            మీ మొత్తం పురోగతి | Your Overall Progress
          </h3>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            {totalProgress} / 60
          </p>
          <p className="text-sm text-blue-700 telugu-text">
            {getProgressMessage(totalProgress)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="secondary-button flex items-center justify-center space-x-2"
          >
            <FiHome className="w-4 h-4" />
            <span className="telugu-text">హోమ్‌కి వెళ్లండి | Go Home</span>
          </button>

          {nextLesson && (
            <button
              onClick={handleNextLesson}
              className="primary-button flex items-center justify-center space-x-2"
            >
              <span className="telugu-text">తర్వాతి పాఠం | Next Lesson</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Next Lesson Preview */}
        {nextLesson && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 telugu-text">
              తదుపరి పాఠం | Next Lesson
            </h4>
            <p className="text-sm text-gray-600 telugu-text">
              Day {nextLesson.day}: {nextLesson.title}
            </p>
            <p className="text-xs text-gray-500 mt-1 telugu-text">
              {nextLesson.objectives}
            </p>
          </div>
        )}

        {/* Encouragement */}
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-700 telugu-text">
            💪 మీరు చాలా బాగా చేస్తున్నారు! ప్రతి రోజు కొంచెం చేయడం ద్వారా మీ
            ఆంగ్ల భాషా నైపుణ్యాలను మెరుగుపరచుకోండి.
          </p>
        </div>
      </div>
    </div>
  );
};
