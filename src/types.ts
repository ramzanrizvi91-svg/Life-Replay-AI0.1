export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  screenshot?: string;
  location?: string;
  activityType: string;
  mood: 'Focused' | 'Calm' | 'Stressed' | 'Energized' | 'Distracted';
  score: number; // Productivity score (e.g., 92)
  category: 'work' | 'meeting' | 'learning' | 'break' | 'exercise';
}

export interface ScreenshotItem {
  id: string;
  timestamp: string;
  imageSrc: string;
  caption: string;
  app: string;
  activity: string;
  focusScore: number;
  distractionScore: number;
  suggestions: string[];
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  color: string;
  aiTip?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  date: string;
  pinned: boolean;
}

export interface InsightItem {
  id: string;
  type: 'alert' | 'success' | 'tip' | 'warning';
  title: string;
  value: string;
  description: string;
}

export interface MoodData {
  time: string; // e.g. "9:00 AM"
  emoji: string;
  label: string;
  stressLevel: number; // 1-100
  energyLevel: number; // 1-100
  happinessScore: number; // 1-100
  focusScore: number; // 1-100
}

export interface AppConfig {
  theme: 'dark' | 'light';
  notifications: boolean;
  smartNotifications: boolean;
  privacyMode: boolean;
  locationToggle: boolean;
  screenshotInterval: number; // minutes
  integrations: {
    google: boolean;
    apple: boolean;
    microsoft: boolean;
  };
}
