import { useState, useEffect } from 'react';
import { DiaryEntry } from '../types/diary';

const STORAGE_KEY = 'photo_diary_entries';

export function useDiaryEntries() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEntries = localStorage.getItem(STORAGE_KEY);
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
    setLoading(false);
  }, []);

  const saveEntries = (newEntries: DiaryEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
  };

  const addEntry = (entry: DiaryEntry) => {
    const newEntries = [entry, ...entries];
    saveEntries(newEntries);
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(e => e.id !== id);
    saveEntries(newEntries);
  };

  const updateEntry = (id: string, updates: Partial<DiaryEntry>) => {
    const newEntries = entries.map(e => 
      e.id === id ? { ...e, ...updates } : e
    );
    saveEntries(newEntries);
  };

  return {
    entries,
    loading,
    addEntry,
    deleteEntry,
    updateEntry,
  };
}
