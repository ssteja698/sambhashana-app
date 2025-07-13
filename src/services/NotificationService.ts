import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';

export class NotificationService {
  private static instance: NotificationService;
  private isInitialized = false;

  private constructor() { }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (Capacitor.isNativePlatform()) {
        await this.initializeNativeNotifications();
      } else {
        await this.initializeWebNotifications();
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  private async initializeNativeNotifications(): Promise<void> {
    // Request permissions
    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === 'granted') {
      await this.scheduleDailyNotification();
    }
  }

  private async initializeWebNotifications(): Promise<void> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        await this.scheduleDailyWebNotification();
      }
    }
  }

  public async scheduleDailyNotification(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await this.scheduleNativeDailyNotification();
    } else {
      await this.scheduleDailyWebNotification();
    }
  }

  private async scheduleNativeDailyNotification(): Promise<void> {
    try {
      // Cancel existing notifications
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

      // Schedule daily notification at 9:00 AM
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: '📚 సంభాషణ | Sambhashana',
            body: 'మీ నేటి ఆంగ్ల పాఠం సిద్ధంగా ఉంది! Tap to begin.',
            schedule: {
              on: {
                hour: 9,
                minute: 0,
                second: 0
              },
              repeats: true
            },
            actionTypeId: 'OPEN_LESSON',
            extra: {
              route: '/lesson/today'
            }
          }
        ]
      });
    } catch (error) {
      console.error('Failed to schedule native notification:', error);
    }
  }

  private async scheduleDailyWebNotification(): Promise<void> {
    // For web, we'll use a different approach since we can't schedule recurring notifications
    // We'll check on app load if notification should be shown
    const lastNotificationDate = localStorage.getItem('sambhashana_last_notification');
    const today = new Date().toDateString();

    if (lastNotificationDate !== today) {
      // Show notification if not shown today
      this.showWebNotification();
      localStorage.setItem('sambhashana_last_notification', today);
    }
  }

  public async showWebNotification(): Promise<void> {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('📚 సంభాషణ | Sambhashana', {
        body: 'మీ నేటి ఆంగ్ల పాఠం సిద్ధంగా ఉంది! Click to begin.',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'daily-lesson',
        requireInteraction: false
      });

      notification.onclick = () => {
        window.focus();
        window.location.href = '/lesson/today';
        notification.close();
      };
    }
  }

  public async showLessonReminder(): Promise<void> {
    const message = 'మీ నేటి పాఠం ఇంకా పూర్తి కాలేదు. దయచేసి పాఠం చేయండి!';

    if (Capacitor.isNativePlatform()) {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 2,
            title: '📚 పాఠం రిమైండర్ | Lesson Reminder',
            body: message,
            schedule: {
              at: new Date(Date.now() + 1000) // Show in 1 second
            }
          }
        ]
      });
    } else {
      this.showWebNotification();
    }
  }

  public async cancelAllNotifications(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await LocalNotifications.cancel({ notifications: [] });
    }
  }

  public async requestPermission(): Promise<boolean> {
    try {
      if (Capacitor.isNativePlatform()) {
        const permission = await LocalNotifications.requestPermissions();
        return permission.display === 'granted';
      } else {
        if ('Notification' in window) {
          const permission = await Notification.requestPermission();
          return permission === 'granted';
        }
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
    }
    return false;
  }

  public isSupported(): boolean {
    return Capacitor.isNativePlatform() || 'Notification' in window;
  }
} 