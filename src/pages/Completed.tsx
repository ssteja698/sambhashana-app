import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiTrendingUp, FiAward } from "react-icons/fi";
import { useLessonProgress } from "../hooks/useLessonProgress";
import { ProgressBar } from "../components/ProgressBar";
import { LessonScheduler } from "../services/LessonScheduler";

export const Completed: React.FC = () => {
  const navigate = useNavigate();
  const { totalProgress, progressPercentage, userData, getStreakDays } =
    useLessonProgress();

  const lessonScheduler = LessonScheduler.getInstance();
  const completedLessons = lessonScheduler.getCompletedLessons();
  const streakDays = getStreakDays();

  const handleBack = () => {
    navigate("/");
  };

  const getAchievementBadge = (progress: number): string => {
    if (progress >= 60) return "🏆 మాస్టర్ | Master";
    if (progress >= 45) return "🥇 గోల్డ్ | Gold";
    if (progress >= 30) return "🥈 సిల్వర్ | Silver";
    if (progress >= 15) return "🥉 బ్రోంజ్ | Bronze";
    return "🌟 బిగినర్ | Beginner";
  };

  const getMotivationalQuote = (): string => {
    const quotes = [
      "ప్రతి రోజు కొంచెం చేయడం ద్వారా మీ నైపుణ్యాలను మెరుగుపరచుకోండి!",
      "మీరు చాలా బాగా చేస్తున్నారు! కొనసాగించండి!",
      "ఆంగ్ల భాషా నేర్చుకోవడం ఒక ప్రయాణం, గమ్యం కాదు!",
      "మీ ధైర్యం మరియు కృషికి అభినందనలు!",
      "ప్రతి పాఠం మీకు ఒక కొత్త అవకాశం!",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 telugu-text">
            పూర్తి చేసిన పాఠాలు | Completed Lessons
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Statistics Overview */}
        <div className="lesson-card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 telugu-text">
            మీ విజయాలు | Your Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {totalProgress}
              </div>
              <div className="text-sm text-blue-700 telugu-text">
                పూర్తి చేసిన పాఠాలు
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {streakDays}
              </div>
              <div className="text-sm text-green-700 telugu-text">
                నిరంతర రోజులు
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {progressPercentage}%
              </div>
              <div className="text-sm text-purple-700 telugu-text">పురోగతి</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {getAchievementBadge(totalProgress).split(" ")[0]}
              </div>
              <div className="text-sm text-yellow-700 telugu-text">
                బ్యాడ్జ్
              </div>
            </div>
          </div>

          <ProgressBar current={totalProgress} total={60} className="mb-4" />

          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800 telugu-text">
              {getAchievementBadge(totalProgress)}
            </p>
            <p className="text-sm text-gray-600 mt-1 telugu-text">
              {getMotivationalQuote()}
            </p>
          </div>
        </div>

        {/* Completed Lessons List */}
        <div className="lesson-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 telugu-text">
            పూర్తి చేసిన పాఠాల జాబితా | Completed Lessons List
          </h2>

          {completedLessons.length === 0 ? (
            <div className="text-center py-8">
              <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 telugu-text">
                ఇంకా ఏ పాఠం పూర్తి చేయబడలేదు. మొదటి పాఠం ప్రారంభించండి!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedLessons.map((lesson) => (
                <div
                  key={lesson.day}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        lesson.type === "chat" ? "bg-blue-500" : "bg-red-500"
                      }`}
                    >
                      {lesson.type === "chat" ? "💬" : "📹"}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 telugu-text">
                        Day {lesson.day}: {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 telugu-text">
                        {lesson.objectives}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.reviewable && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        🔄 సమీక్ష
                      </span>
                    )}
                    <FiAward className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Motivational Section */}
        <div className="lesson-card mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiTrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900 telugu-text">
              మీ ప్రయాణం | Your Journey
            </h2>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4 telugu-text">
              మీరు {totalProgress} పాఠాలు విజయవంతంగా పూర్తి చేశారు!
              {totalProgress < 60
                ? ` మీకు ఇంకా ${60 - totalProgress} పాఠాలు మిగిలి ఉన్నాయి.`
                : " మీరు అన్ని పాఠాలు పూర్తి చేశారు!"}
            </p>

            {streakDays > 0 && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 font-medium telugu-text">
                  🔥 {streakDays} రోజుల నిరంతరం! మీరు అద్భుతంగా చేస్తున్నారు!
                </p>
              </div>
            )}

            <div className="text-center">
              <button onClick={handleBack} className="primary-button">
                హోమ్‌కి తిరిగి వెళ్లండి | Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
