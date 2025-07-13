import React from "react";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Lesson } from "../services/LessonScheduler";

interface LessonHeaderProps {
  lesson: Lesson;
  onBack?: () => void;
  showHome?: boolean;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  lesson,
  onBack,
  showHome = true,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900 telugu-text">
              {lesson.title}
            </h1>
            <p className="text-sm text-gray-600">Day {lesson.day} of 60</p>
          </div>
        </div>

        {showHome && (
          <button
            onClick={handleHome}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Go home"
          >
            <FiHome className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-700 telugu-text">{lesson.objectives}</p>
      </div>
    </div>
  );
};
