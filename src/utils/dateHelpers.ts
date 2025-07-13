export const getStartDate = (): Date => {
  const stored = localStorage.getItem('sambhashana_start_date');
  if (stored) {
    return new Date(stored);
  }

  const today = new Date();
  localStorage.setItem('sambhashana_start_date', today.toISOString());
  return today;
};

export const getCurrentDay = (): number => {
  const startDate = getStartDate();
  const today = new Date();

  // Reset time to compare only dates
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = current.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(1, diffDays + 1); // +1 because day 1 is the start date
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('te-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export const getDaysSinceStart = (): number => {
  const startDate = getStartDate();
  const today = new Date();

  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = current.getTime() - start.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}; 