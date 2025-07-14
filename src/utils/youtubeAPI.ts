declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

class YouTubeAPIManager {
  private static instance: YouTubeAPIManager;
  private isLoaded = false;
  private isLoading = false;
  private callbacks: (() => void)[] = [];

  private constructor() {}

  public static getInstance(): YouTubeAPIManager {
    if (!YouTubeAPIManager.instance) {
      YouTubeAPIManager.instance = new YouTubeAPIManager();
    }
    return YouTubeAPIManager.instance;
  }

  public loadAPI(): Promise<void> {
    return new Promise((resolve) => {
      // If already loaded, resolve immediately
      if (this.isLoaded) {
        resolve();
        return;
      }

      // If already loading, add to callbacks
      if (this.isLoading) {
        this.callbacks.push(resolve);
        return;
      }

      this.isLoading = true;

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (existingScript) {
        // Script exists, wait for it to load
        this.waitForAPI(resolve);
        return;
      }

      // Set up callback before creating script
      window.onYouTubeIframeAPIReady = () => {
        this.isLoaded = true;
        this.isLoading = false;
        resolve();
        // Resolve all pending callbacks
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
      };

      // Create and append script safely
      try {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.onerror = () => {
          console.error('Failed to load YouTube API');
          this.isLoading = false;
          resolve(); // Resolve anyway to prevent hanging
        };
        
        // Append to head instead of using insertBefore
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading YouTube API:', error);
        this.isLoading = false;
        resolve(); // Resolve anyway to prevent hanging
      }
    });
  }

  private waitForAPI(resolve: () => void): void {
    const checkAPI = () => {
      if (window.YT && window.YT.Player) {
        this.isLoaded = true;
        this.isLoading = false;
        resolve();
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
      } else {
        setTimeout(checkAPI, 100);
      }
    };
    checkAPI();
  }

  public isAPILoaded(): boolean {
    return this.isLoaded && !!(window.YT && window.YT.Player);
  }
}

export const youtubeAPI = YouTubeAPIManager.getInstance(); 