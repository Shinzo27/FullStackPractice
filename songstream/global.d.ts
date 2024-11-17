export {};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (callback: (token: string) => void) => void;
        volume?: number;
      }) => Spotify.PlayerInstance;
    };
  }

  namespace Spotify {
    interface PlayerInstance {
      connect(): Promise<boolean>;
      disconnect(): void;
      getCurrentState(): Promise<PlayerState | null>;
      on(event: string, callback: (...args: any[]) => void): void;
      pause(): Promise<void>;
      resume(): Promise<void>;
      togglePlay(): Promise<void>;
      seek(positionMs: number): Promise<void>;
      setVolume(volume: number): Promise<void>;
      addListener(event: string, callback: (...args: any[]) => void): void;
      
    }

    interface PlayerState {
      context: {
        uri: string;
        metadata: object;
      };
      disallows: {
        pausing: boolean;
        seeking: boolean;
        skipping_prev: boolean;
        skipping_next: boolean;
      };
      paused: boolean;
      position: number;
      repeat_mode: number;
      shuffle: boolean;
      track_window: {
        current_track: Track;
        previous_tracks: Track[];
        next_tracks: Track[];
      };
    }

    interface Track {
      uri: string;
      id: string;
      name: string;
      duration_ms: number;
      album: {
        uri: string;
        name: string;
        images: Array<{ url: string }>;
      };
      artists: Array<{
        uri: string;
        name: string;
      }>;
    }
  }
}