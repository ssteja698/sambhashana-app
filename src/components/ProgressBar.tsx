import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showText = true,
  className = "",
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 telugu-text">
            పురోగతి | Progress
          </span>
          <span className="text-sm font-medium text-gray-700">
            {current} / {total} ({percentage}%)
          </span>
        </div>
      )}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
