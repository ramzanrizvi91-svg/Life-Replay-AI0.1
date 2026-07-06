import { TimelineEvent, ScreenshotItem, TaskItem, CalendarEvent, NoteItem, InsightItem, MoodData, AppConfig } from './types';

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl-1',
    time: '8:00 AM',
    title: 'Morning Routine & Coffee',
    description: 'Synced calendar, imported health metrics, and reviewed today\'s priorities. Energy is high, planning is complete.',
    location: 'Home Office',
    activityType: 'Planning',
    mood: 'Calm',
    score: 95,
    category: 'break'
  },
  {
    id: 'tl-2',
    time: '9:00 AM',
    title: 'Design Review & Sprint Sync',
    description: 'Weekly team collaboration. Reviewed the Figma specifications for the Life Replay dashboard. High engagement and alignment.',
    location: 'Google Meet',
    activityType: 'Collaboration',
    mood: 'Energized',
    score: 88,
    category: 'meeting'
  },
  {
    id: 'tl-3',
    time: '10:15 AM',
    title: 'Deep Work: Replay Timeline Engine',
    description: 'Wrote the core rendering engine and state flow in VS Code. Completed 3 modular layouts ahead of schedule.',
    location: 'Home Office',
    activityType: 'Coding',
    mood: 'Focused',
    score: 96,
    category: 'work'
  },
  {
    id: 'tl-4',
    time: '12:00 PM',
    title: 'Lunch & Mindfulness Walk',
    description: 'Stepped away from screens for a 20-minute walk. Monitored active heart rate and cognitive reset.',
    location: 'Neighborhood Park',
    activityType: 'Exercise',
    mood: 'Calm',
    score: 100,
    category: 'break'
  },
  {
    id: 'tl-5',
    time: '1:45 PM',
    title: 'After-Lunch Context Switching',
    description: 'Experienced a small distraction window. Brief exploration of YouTube dev tutorials and Twitter feeds before returning to focus.',
    location: 'Home Office',
    activityType: 'Browsing',
    mood: 'Distracted',
    score: 45,
    category: 'break'
  },
  {
    id: 'tl-6',
    time: '2:30 PM',
    title: 'Technical Refactoring & Linting',
    description: 'Refactored shared states and removed code duplication. Optimized compilation speed and verified component bundle size.',
    location: 'Home Office',
    activityType: 'Coding',
    mood: 'Focused',
    score: 92,
    category: 'work'
  },
  {
    id: 'tl-7',
    time: '4:30 PM',
    title: 'Lead Architect Sync',
    description: 'Demonstrated the responsive glassmorphism UI. Received outstanding feedback on the micro-interactions.',
    location: 'Zoom Video',
    activityType: 'Collaboration',
    mood: 'Energized',
    score: 90,
    category: 'meeting'
  },
  {
    id: 'tl-8',
    time: '6:00 PM',
    title: 'Cardio Workout & Stretch',
    description: 'High-intensity interval training. Excellent physical recovery to offload the cognitive strain of the day.',
    location: 'Local Gym',
    activityType: 'Workout',
    mood: 'Energized',
    score: 98,
    category: 'exercise'
  }
];

export const INITIAL_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'sc-1',
    timestamp: '9:15 AM',
    imageSrc: 'figma_mockup',
    caption: 'Collaborating on Life Replay app mockup in Figma. Designing the custom neon sidebar and fluid container layout.',
    app: 'Figma',
    activity: 'UI/UX Design',
    focusScore: 90,
    distractionScore: 10,
    suggestions: ['Keep figma tab isolated to prevent browser memory bloat', 'Save assets directly to asset folder']
  },
  {
    id: 'sc-2',
    timestamp: '10:45 AM',
    imageSrc: 'vscode_coding',
    caption: 'Writing pure React component files under /src/components. Working with Tailwind CSS utility classes.',
    app: 'VS Code',
    activity: 'TypeScript Coding',
    focusScore: 98,
    distractionScore: 2,
    suggestions: ['Consider turning off secondary chat notifications during compiler runs', 'Take a 2-min stretch break']
  },
  {
    id: 'sc-3',
    timestamp: '1:48 PM',
    imageSrc: 'twitter_distraction',
    caption: 'Scrolling tech news feed and watching dynamic rendering animations on social media. Caught by dopamine loops.',
    app: 'Google Chrome',
    activity: 'Social Browsing',
    focusScore: 20,
    distractionScore: 80,
    suggestions: ['Block or redirect feeds between 1 PM and 3 PM', 'Set a 10-minute browsing limit']
  },
  {
    id: 'sc-4',
    timestamp: '3:15 PM',
    imageSrc: 'terminal_rebuild',
    caption: 'Executing local dev builds, running tsx server and analyzing network sockets for port 3000.',
    app: 'Terminal',
    activity: 'DevOps & Testing',
    focusScore: 95,
    distractionScore: 5,
    suggestions: ['Automate code validation checks via pre-commit hooks', 'Ensure all environment secrets are in .env']
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  { id: 't-1', text: 'Build modular design system with responsive sidebar', completed: true, priority: 'high', category: 'Development' },
  { id: 't-2', text: 'Create Recharts visualization for focus vs distraction', completed: true, priority: 'high', category: 'Analytics' },
  { id: 't-3', text: 'Implement Future-Self AI conversational agent mock-engine', completed: false, priority: 'high', category: 'AI Integration' },
  { id: 't-4', text: 'Review Figma wireframes for Tomorrow Planner screen', completed: true, priority: 'medium', category: 'UI Design' },
  { id: 't-5', text: 'Enable toggle settings for location and automated screen grabs', completed: false, priority: 'low', category: 'Settings' }
];

export const INITIAL_CALENDAR: CalendarEvent[] = [
  { id: 'c-1', title: 'Sprint Sync & Design Review', time: '9:00 AM - 10:00 AM', duration: '60 min', color: '#6C63FF', aiTip: 'Ensure Figma designs are prepared to save 15 minutes of discussion.' },
  { id: 'c-2', title: 'Productivity Alignment & Retro', time: '11:30 AM - 12:00 PM', duration: '30 min', color: '#00E5FF', aiTip: 'This overlaps with your optimal peak focus window. Consider shifting.' },
  { id: 'c-3', title: 'Technical Feasibility Sync', time: '2:00 PM - 2:30 PM', duration: '30 min', color: '#4ADE80', aiTip: 'Post-lunch meeting. Good timing since your deep focus peak has subsided.' },
  { id: 'c-4', title: 'One-on-One with Lead Architect', time: '4:30 PM - 5:00 PM', duration: '30 min', color: '#FBBF24', aiTip: 'Focus is typically low here. Keep it action-oriented with a 3-bullet agenda.' }
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'n-1',
    title: 'Product Design Principles: Apple meets Linear',
    content: 'Our core layout relies on extensive glassmorphism, precise 24px rounded corners, and deep indigo-cyan gradient accents. Dark mode should feel spacious, using soft charcoal background tones (#0D0E15) instead of pure black to enable beautiful high-contrast drop shadows. Use Inter for functional typography, and space-grotesk for display headers.',
    summary: 'Establishes UI/UX constraints. Focuses on premium dark mode aesthetics, Inter and Space Grotesk fonts, and soft shadow styles.',
    tags: ['Design', 'UX', 'SaaS'],
    date: '2026-07-06',
    pinned: true
  },
  {
    id: 'n-2',
    title: 'Tomorrow Planner Optimization Rules',
    content: '1. Schedule deep focus blocks only between 10:00 AM and 12:00 PM.\n2. Dedicate afternoon slots (2:00 PM to 4:00 PM) to technical refactoring and modular coding.\n3. Keep meeting limits to 90 minutes max per day.\n4. Mandate a 30-minute digital-detox break after lunch to avoid mid-day energy crash.',
    summary: 'List of rules to structure schedules based on personal energy peaks to maximize cognitive performance.',
    tags: ['AI Planner', 'Productivity'],
    date: '2026-07-05',
    pinned: true
  },
  {
    id: 'n-3',
    title: 'Brainstorming Future Self Prompts',
    content: 'The Future Self AI should behave like an older, wiser version of the user who already lived through today. It acts with supportive warmth, gives actionable advice based on yesterday\'s time leaks, and avoids generic positive reinforcement. Examples: "Tomorrow, let\'s move deep work earlier" or "I noticed a 45-minute drop in energy after your meeting. Let\'s block a snack walk."',
    summary: 'Design criteria for the Future Self AI chatbot, outlining tone, content inputs, and action-oriented prompt examples.',
    tags: ['AI Avatar', 'Brainstorm'],
    date: '2026-07-06',
    pinned: false
  }
];

export const INITIAL_INSIGHTS: InsightItem[] = [
  {
    id: 'in-1',
    type: 'warning',
    title: 'App-Switching Warning',
    value: '2.1 hrs',
    description: 'You spent substantial time rapidly switching between Figma, Slack, and VS Code. Consider grouping reviews into dedicated blocks.'
  },
  {
    id: 'in-2',
    type: 'success',
    title: 'Peak Focus Achieved',
    value: '10 AM - 12 PM',
    description: 'Your coding streak hit a record 96% focus score. Code throughput was 2.4x higher than your daily average.'
  },
  {
    id: 'in-3',
    type: 'alert',
    title: 'Meeting Cost Analysis',
    value: '-34% Focus',
    description: 'Successive meetings in the mid-morning significantly delayed your deep coding flow. Shift meetings to late afternoon.'
  },
  {
    id: 'in-4',
    type: 'tip',
    title: 'Optimal Productivity Zone',
    value: 'Home Office',
    description: 'Your focus score was 15% higher in your home office setup compared to your remote cafe working sessions.'
  }
];

export const INITIAL_MOOD_TREND: MoodData[] = [
  { time: '8:00 AM', emoji: '😌', label: 'Calm', stressLevel: 15, energyLevel: 85, happinessScore: 90, focusScore: 80 },
  { time: '9:00 AM', emoji: '😃', label: 'Energized', stressLevel: 25, energyLevel: 90, happinessScore: 92, focusScore: 85 },
  { time: '10:00 AM', emoji: '🧠', label: 'Focused', stressLevel: 30, energyLevel: 95, happinessScore: 88, focusScore: 96 },
  { time: '11:00 AM', emoji: '🧠', label: 'Focused', stressLevel: 35, energyLevel: 92, happinessScore: 87, focusScore: 98 },
  { time: '12:00 PM', emoji: '😌', label: 'Calm', stressLevel: 12, energyLevel: 75, happinessScore: 95, focusScore: 60 },
  { time: '1:00 PM', emoji: '🥱', label: 'Tired', stressLevel: 20, energyLevel: 55, happinessScore: 78, focusScore: 50 },
  { time: '2:00 PM', emoji: '🧠', label: 'Focused', stressLevel: 40, energyLevel: 80, happinessScore: 82, focusScore: 90 },
  { time: '3:00 PM', emoji: '🧠', label: 'Focused', stressLevel: 38, energyLevel: 82, happinessScore: 84, focusScore: 92 },
  { time: '4:00 PM', emoji: '😌', label: 'Calm', stressLevel: 25, energyLevel: 78, happinessScore: 86, focusScore: 85 },
  { time: '5:00 PM', emoji: '😤', label: 'Stressed', stressLevel: 55, energyLevel: 70, happinessScore: 75, focusScore: 78 },
  { time: '6:00 PM', emoji: '⚡', label: 'Energized', stressLevel: 15, energyLevel: 95, happinessScore: 94, focusScore: 40 },
  { time: '7:00 PM', emoji: '😌', label: 'Calm', stressLevel: 10, energyLevel: 65, happinessScore: 96, focusScore: 30 }
];

export const TOMORROW_SCHEDULE = [
  { time: '08:00 AM - 09:00 AM', block: 'Morning Routine & Intention', description: 'Calm breathing, hydration, alignment.', status: 'scheduled' },
  { time: '09:00 AM - 10:00 AM', block: 'Technical Standup', description: 'Daily task allocation. Limit to 30 mins if possible.', status: 'flexible' },
  { time: '10:00 AM - 12:30 PM', block: 'Deep Focus Block (Coding)', description: 'Write core integrations. Screen notifications blocked.', status: 'locked' },
  { time: '12:30 PM - 01:15 PM', block: 'Offline Lunch Break', description: 'Step away from Desk. Guided mindful stroll.', status: 'locked' },
  { time: '01:15 PM - 02:00 PM', block: 'Email & Communications', description: 'Clear Linear inbox, respond to client feedback.', status: 'flexible' },
  { time: '02:00 PM - 04:00 PM', block: 'Refactoring & Architecture', description: 'Solve complexity debt, clean tsx files.', status: 'locked' },
  { time: '04:00 PM - 04:30 PM', block: 'Short Recharge Walk', description: 'Reset cognitive load before gym.', status: 'flexible' },
  { time: '05:00 PM - 06:15 PM', block: 'Cardio Workout & Sauna', description: 'Decompress neural pathways.', status: 'scheduled' },
  { time: '07:00 PM - 10:00 PM', block: 'Leisure, Reading & Sleep Prep', description: 'Blue light filters on. No work-related chats.', status: 'scheduled' }
];

export const INITIAL_CONFIG: AppConfig = {
  theme: 'dark',
  notifications: true,
  smartNotifications: true,
  privacyMode: false,
  locationToggle: true,
  screenshotInterval: 5,
  integrations: {
    google: true,
    apple: false,
    microsoft: false
  }
};

export const CHAT_HISTORY_TEMPLATES = [
  { sender: 'future', text: 'Hey there! I am your Future Self. I\'ve just replayed our entire day, and overall, you scored an 87% on productivity. That is solid, but I spotted a clear 45-minute window right after lunch where your energy plummeted and you spent 15 minutes on Twitter.' },
  { sender: 'user', text: 'Yeah, I always feel super tired at around 1:30 PM. How do I fix that?' },
  { sender: 'future', text: 'Two recommendations: First, let\'s shorten lunch by 10 minutes and use that extra time to do a quick 10-minute digital-detox outdoor walk—getting sunlight in your eyes stops the mid-day melatonin spikes. Second, let\'s schedule simple admin work or email clearing for that 1:30 PM slot, rather than attempting deep code, so you don\'t feel overwhelmed.' }
];

export const SUGGESTIONS_LIST = [
  'Set a hard boundary on Twitter between 1:00 PM and 2:30 PM.',
  'Move the technical standup to 4:00 PM to protect morning deep work.',
  'Block out a 15-minute mindfulness breathing exercise after our heaviest meetings.',
  'Work from your Home Office tomorrow. Cafes are 15% more distracting.'
];
