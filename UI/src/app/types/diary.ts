export type Mood = 'happy' | 'sad' | 'excited' | 'calm' | 'anxious' | 'grateful';

export interface DiaryEntry {
  id: string;
  date: string;
  photoUrl: string;
  caption: string;
  mood: Mood;
  createdAt: string;
}

export const moodConfig: Record<Mood, { label: string; color: string; emoji: string }> = {
  happy: { label: 'Happy', color: '#FCD34D', emoji: '😊' },
  sad: { label: 'Sad', color: '#60A5FA', emoji: '😢' },
  excited: { label: 'Excited', color: '#FB923C', emoji: '🤩' },
  calm: { label: 'Calm', color: '#6EE7B7', emoji: '😌' },
  anxious: { label: 'Anxious', color: '#C084FC', emoji: '😰' },
  grateful: { label: 'Grateful', color: '#F9A8D4', emoji: '🙏' },
};
