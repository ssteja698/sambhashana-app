import React, { useState, useRef, useEffect } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import type { Lesson } from "../services/LessonScheduler";
import { getVideoTimestamp, saveVideoTimestamp, getVideoProgressData, formatTime } from "../utils/videoProgress";

interface YouTubeEmbedProps {
  lesson: Lesson;
  onComplete: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  lesson,
  onComplete,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasRestoredTimestamp, setHasRestoredTimestamp] = useState(false);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    }
  }, [lesson.youtubeId]);

  const createPlayer = () => {
    if (!containerRef.current || !lesson.youtubeId) return;

    // Get saved timestamp
    const savedTime = getVideoTimestamp(lesson.youtubeId);

    playerRef.current = new window.YT.Player(containerRef.current, {
      height: '100%',
      width: '100%',
      videoId: lesson.youtubeId,
      playerVars: {
        rel: 0,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin,
        start: savedTime > 0 ? savedTime : 0,
      },
      events: {
        onReady: (event: any) => {
          setIsPlayerReady(true);
          if (savedTime > 0) {
            event.target.seekTo(savedTime);
            setHasRestoredTimestamp(true);
          }
        },
        onStateChange: (event: any) => {
          // Save timestamp when video is paused or ended
          if (event.data === window.YT.PlayerState.PAUSED || 
              event.data === window.YT.PlayerState.ENDED) {
            const currentTime = event.target.getCurrentTime();
            if (lesson.youtubeId) {
              saveVideoTimestamp(lesson.youtubeId, currentTime);
            }
          }
        },
      },
    });
  };

  // Update current time periodically
  useEffect(() => {
    if (!isPlayerReady || !lesson.youtubeId) return;

    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(time);
        setDuration(dur);
        
        // Save timestamp every 5 seconds
        if (Math.floor(time) % 5 === 0 && lesson.youtubeId) {
          saveVideoTimestamp(lesson.youtubeId, time);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlayerReady, lesson.youtubeId]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleComplete = () => {
    onComplete();
  };

  const progressData = lesson.youtubeId ? getVideoProgressData(lesson.youtubeId) : null;

  return (
    <div className="max-w-full md:max-w-2xl mx-auto p-2 md:p-6">
      <div className="lesson-card rounded-2xl p-3 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4 telugu-text">
          YouTube పాఠం | YouTube Lesson
        </h2>

        {/* Progress Indicator */}
        {progressData && progressData.timestamp > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex items-center gap-2 text-blue-800">
              <span>📺</span>
              <span className="telugu-text">మీరు {formatTime(progressData.timestamp)} నుండి కొనసాగుతున్నారు</span>
              <span>| Resumed from {formatTime(progressData.timestamp)}</span>
              {hasRestoredTimestamp && (
                <span className="text-green-600">✓</span>
              )}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
          <p className="text-blue-800 text-base md:text-sm telugu-text">
            మీరు OpenAI లేదా YouTube ఖాతాలో లాగిన్ అవ్వవలసిన అవసరం లేదు. మీరు
            ఇప్పటికే లాగిన్ అయినట్లయితే, మీ ప్రోగ్రెస్ సజావుగా కొనసాగుతుంది.
          </p>
          <p className="text-blue-700 text-base md:text-sm mt-2">
            You don't need to log in to OpenAI or YouTube accounts. If you're
            already logged in, your progress will continue seamlessly.
          </p>
        </div>

        {/* Video Title */}
        <div className="mb-4">
          <h3 className="text-base md:text-lg font-medium telugu-text">
            {lesson.title}
          </h3>
          <p className="text-gray-600 text-base md:text-sm telugu-text">
            {lesson.objectives}
          </p>
        </div>

        {/* YouTube Video Embed */}
        <div className="mb-4 md:mb-6">
          <div
            className="relative bg-black rounded-2xl overflow-hidden min-h-[180px] md:min-h-[320px]"
            style={{ aspectRatio: "16/9" }}
          >
            <div ref={containerRef} className="w-full h-full min-h-[180px] md:min-h-[320px]" />
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              {isPlayerReady && (
                <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              )}
              <button
                onClick={toggleMute}
                className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <FiVolumeX className="w-4 h-4" />
                ) : (
                  <FiVolume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Video Instructions */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
          <h4 className="font-medium mb-2 telugu-text text-base md:text-lg">
            వీడియో చూసే సూచనలు | Video Instructions
          </h4>
          <ul className="text-base md:text-sm text-gray-700 space-y-1 telugu-text">
            <li>• వీడియో పూర్తి చేయండి | Complete the video</li>
            <li>
              • ముఖ్యమైన పదాలు మరియు వాక్యాలను గమనించండి | Note important words
              and sentences
            </li>
            <li>
              • వీడియో ముగిసిన తర్వాత "పాఠం పూర్తి చేయండి" బటన్ క్లిక్ చేయండి |
              Click "Mark Lesson Complete" after the video ends
            </li>
          </ul>
        </div>

        {/* Complete Lesson Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleComplete}
            className="secondary-button w-full py-3 text-base md:text-lg rounded-xl transition-all duration-200"
          >
            పాఠం పూర్తి చేయండి | Mark Lesson Complete
          </button>
        </div>

        {/* Alternative: Open in YouTube */}
        <div className="text-center mt-4">
          <button
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${lesson.youtubeId}`,
                "_blank",
              )
            }
            className="text-primary-500 hover:text-primary-600 text-base md:text-sm telugu-text w-full md:w-auto mt-2 md:mt-0"
          >
            YouTube లో తెరవండి | Open in YouTube
          </button>
        </div>
      </div>
    </div>
  );
};
