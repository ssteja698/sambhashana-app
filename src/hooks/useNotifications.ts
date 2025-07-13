import { useState, useEffect, useCallback } from 'react';
import { NotificationService } from '../services/NotificationService';

export const useNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isInitialized, setIsInitialized] = useState(false);

  const notificationService = NotificationService.getInstance();

  const checkSupport = useCallback(() => {
    const supported = notificationService.isSupported();
    setIsSupported(supported);
    return supported;
  }, [notificationService]);

  const checkPermission = useCallback(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      return Notification.permission;
    }
    return 'denied' as NotificationPermission;
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const granted = await notificationService.requestPermission();
      checkPermission();
      return granted;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported, notificationService, checkPermission]);

  const initializeNotifications = useCallback(async () => {
    if (!isSupported) return;

    try {
      await notificationService.initialize();
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }, [isSupported, notificationService]);

  const scheduleDailyNotification = useCallback(async () => {
    if (!isSupported || permission !== 'granted') return;

    try {
      await notificationService.scheduleDailyNotification();
    } catch (error) {
      console.error('Failed to schedule daily notification:', error);
    }
  }, [isSupported, permission, notificationService]);

  const showLessonReminder = useCallback(async () => {
    if (!isSupported || permission !== 'granted') return;

    try {
      await notificationService.showLessonReminder();
    } catch (error) {
      console.error('Failed to show lesson reminder:', error);
    }
  }, [isSupported, permission, notificationService]);

  const cancelAllNotifications = useCallback(async () => {
    if (!isSupported) return;

    try {
      await notificationService.cancelAllNotifications();
    } catch (error) {
      console.error('Failed to cancel notifications:', error);
    }
  }, [isSupported, notificationService]);

  const showWebNotification = useCallback(async () => {
    if (!isSupported || permission !== 'granted') return;

    try {
      await notificationService.showWebNotification();
    } catch (error) {
      console.error('Failed to show web notification:', error);
    }
  }, [isSupported, permission, notificationService]);

  useEffect(() => {
    checkSupport();
    checkPermission();
  }, [checkSupport, checkPermission]);

  useEffect(() => {
    if (isSupported && permission === 'granted' && !isInitialized) {
      initializeNotifications();
    }
  }, [isSupported, permission, isInitialized, initializeNotifications]);

  return {
    isSupported,
    permission,
    isInitialized,
    requestPermission,
    initializeNotifications,
    scheduleDailyNotification,
    showLessonReminder,
    cancelAllNotifications,
    showWebNotification,
    checkPermission
  };
}; 