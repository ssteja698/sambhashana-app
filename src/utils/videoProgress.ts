export interface VideoProgress {
  [youtubeId: string]: {
    timestamp: number;
    lastWatched: string;
    watchDuration: number;
  };
}

const STORAGE_KEY = 'sambhashana_video_progress';

export const getVideoProgress = (): VideoProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const saveVideoTimestamp = (youtubeId: string, timestamp: number, watchDuration: number = 0): void => {
  const progress = getVideoProgress();
  progress[youtubeId] = {
    timestamp,
    lastWatched: new Date().toISOString(),
    watchDuration
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const getVideoTimestamp = (youtubeId: string): number => {
  const progress = getVideoProgress();
  return progress[youtubeId]?.timestamp || 0;
};

export const getVideoProgressData = (youtubeId: string) => {
  const progress = getVideoProgress();
  return progress[youtubeId] || null;
};

export const clearVideoProgress = (youtubeId?: string): void => {
  if (youtubeId) {
    const progress = getVideoProgress();
    delete progress[youtubeId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}; 