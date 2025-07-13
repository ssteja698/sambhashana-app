import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlay, FiCalendar, FiTrendingUp, FiBell } from "react-icons/fi";
import { useLessonProgress } from "../hooks/useLessonProgress";
import { useNotifications } from "../hooks/useNotifications";
import { ProgressBar } from "../components/ProgressBar";
import { LessonScheduler } from "../services/LessonScheduler";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentDay,
    totalProgress,
    progressPercentage,
    userData,
    isTodayCompleted,
    daysSinceStart,
    getTodayLesson,
    getNextLesson,
    getStreakDays,
    shouldShowReview,
  } = useLessonProgress();

  const {
    isSupported,
    permission,
    requestPermission,
    scheduleDailyNotification,
  } = useNotifications();

  const todayLesson = getTodayLesson();
  const nextLesson = getNextLesson();
  const streakDays = getStreakDays();

  useEffect(() => {
    // Request notification permission on first visit
    if (isSupported && permission === "default") {
      requestPermission();
    }
  }, [isSupported, permission, requestPermission]);

  const handleStartLesson = () => {
    navigate("/lesson/today");
  };

  const getWelcomeMessage = (): string => {
    if (daysSinceStart === 0) {
      return "సంభాషణకి స్వాగతం! | Welcome to Sambhashana!";
    }
    if (daysSinceStart === 1) {
      return "మీ ప్రయాణం ప్రారంభమైంది! | Your journey has begun!";
    }
    return `Day ${daysSinceStart} - మీరు బాగా చేస్తున్నారు! | You're doing great!`;
  };

  const getMotivationalMessage = (): string => {
    if (totalProgress === 0) {
      return "మీ ఆంగ్ల భాషా నైపుణ్యాలను మెరుగుపరచుకోవడానికి సిద్ధంగా ఉన్నారా?";
    }
    if (totalProgress >= 50) {
      return "మీరు సగం మార్గంలో ఉన్నారు! కొనసాగించండి!";
    }
    if (streakDays >= 5) {
      return `${streakDays} రోజుల నిరంతరం! మీరు అద్భుతంగా చేస్తున్నారు!`;
    }
    return "ప్రతి రోజు కొంచెం చేయడం ద్వారా మీ నైపుణ్యాలను మెరుగుపరచుకోండి!";
  };

  if (!todayLesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="lesson-card text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 telugu-text">
            🎉 అభినందనలు! | Congratulations!
          </h1>
          <p className="text-lg text-gray-700 mb-6 telugu-text">
            మీరు అన్ని 60 పాఠాలు పూర్తి చేశారు! మీ ఆంగ్ల భాషా నైపుణ్యాలు చాలా
            మెరుగ్గా ఉన్నాయి!
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-2 telugu-text">
              మీ విజయం | Your Achievement
            </h2>
            <p className="text-green-700 telugu-text">
              {totalProgress} / 60 పాఠాలు పూర్తి చేశారు ({progressPercentage}%)
            </p>
          </div>
          <button onClick={() => navigate("/")} className="primary-button">
            మళ్లీ ప్రారంభించండి | Start Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 telugu-text">
          📚 సంభాషణ | Sambhashana
        </h1>
        <p className="text-lg text-gray-600 telugu-text">
          {getWelcomeMessage()}
        </p>
      </div>

      {/* Progress Overview */}
      <div className="lesson-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 telugu-text">
            మీ పురోగతి | Your Progress
          </h2>
        </div>

        <ProgressBar current={totalProgress} total={60} className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {totalProgress}
            </div>
            <div className="text-sm text-blue-700 telugu-text">
              పూర్తి చేసిన పాఠాలు
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {streakDays}
            </div>
            <div className="text-sm text-green-700 telugu-text">
              నిరంతర రోజులు
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {60 - totalProgress}
            </div>
            <div className="text-sm text-purple-700 telugu-text">
              మిగిలిన పాఠాలు
            </div>
          </div>
        </div>
      </div>

      {/* Today's Lesson */}
      <div className="lesson-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 telugu-text">
            నేటి పాఠం | Today's Lesson
          </h2>
          <div className="flex items-center space-x-2">
            <FiCalendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Day {currentDay}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 telugu-text">
            {todayLesson.title}
          </h3>
          <p className="text-gray-700 mb-4 telugu-text">
            {todayLesson.objectives}
          </p>

          <div className="flex items-center space-x-2 mb-4">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                todayLesson.type === "chat"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {todayLesson.type === "chat" ? "💬 చాట్ పాఠం" : "📹 వీడియో పాఠం"}
            </div>
            {shouldShowReview() && (
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                🔄 సమీక్ష
              </div>
            )}
          </div>

          {isTodayCompleted ? (
            <div className="bg-green-100 border border-green-300 rounded-lg p-3">
              <p className="text-green-800 font-medium telugu-text">
                ✅ నేటి పాఠం పూర్తి చేయబడింది! | Today's lesson completed!
              </p>
            </div>
          ) : (
            <button
              onClick={handleStartLesson}
              className="primary-button w-full flex items-center justify-center space-x-2"
            >
              <FiPlay className="w-4 h-4" />
              <span className="telugu-text">
                పాఠం ప్రారంభించండి | Start Lesson
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="lesson-card mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <FiTrendingUp className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900 telugu-text">
            ప్రేరణ | Motivation
          </h2>
        </div>
        <p className="text-gray-700 telugu-text">{getMotivationalMessage()}</p>
      </div>

      {/* Next Lesson Preview */}
      {nextLesson && (
        <div className="lesson-card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 telugu-text">
            తదుపరి పాఠం | Next Lesson
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2 telugu-text">
              Day {nextLesson.day}: {nextLesson.title}
            </h3>
            <p className="text-sm text-gray-600 telugu-text">
              {nextLesson.objectives}
            </p>
          </div>
        </div>
      )}

      {/* Notification Setup */}
      {isSupported && permission !== "granted" && (
        <div className="lesson-card mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiBell className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900 telugu-text">
              నోటిఫికేషన్లు | Notifications
            </h2>
          </div>
          <p className="text-gray-700 mb-4 telugu-text">
            ప్రతి రోజు 9:00 AM కి నోటిఫికేషన్ పొందడానికి అనుమతి ఇవ్వండి.
          </p>
          <button
            onClick={scheduleDailyNotification}
            className="secondary-button"
          >
            నోటిఫికేషన్లు ప్రారంభించండి | Enable Notifications
          </button>
        </div>
      )}
    </div>
  );
};
