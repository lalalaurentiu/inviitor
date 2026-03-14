import { useState } from 'react';
import { Link } from 'react-router';
import { DiaryEntry, Mood, moodConfig } from '../types/diary';
import { Plus, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DiaryCard } from './DiaryCard';

interface TimelineProps {
  entries: DiaryEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const filteredEntries = selectedMood
    ? entries.filter(e => e.mood === selectedMood)
    : entries;

  // Group by date
  const groupedEntries = filteredEntries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, DiaryEntry[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">My Photo Diary</h1>
          <p className="text-gray-600">Capture your daily moments and moods</p>
        </div>

        {/* Mood Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg">Filter by Mood</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedMood === null ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedMood(null)}
            >
              All Moods
            </Badge>
            {(Object.keys(moodConfig) as Mood[]).map((mood) => (
              <Badge
                key={mood}
                variant={selectedMood === mood ? 'default' : 'outline'}
                className="cursor-pointer"
                style={{
                  backgroundColor: selectedMood === mood ? moodConfig[mood].color : undefined,
                  borderColor: moodConfig[mood].color,
                }}
                onClick={() => setSelectedMood(mood)}
              >
                <span className="mr-1">{moodConfig[mood].emoji}</span>
                {moodConfig[mood].label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Add Entry Button */}
        <Link to="/add">
          <Button className="w-full mb-8 h-14 text-lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Today's Memory
          </Button>
        </Link>

        {/* Timeline */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg mb-4">
              {selectedMood ? 'No entries with this mood yet.' : 'No memories yet. Start your journey!'}
            </p>
            {!selectedMood && (
              <Link to="/add">
                <Button>Create First Entry</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEntries).map(([date, dateEntries]) => (
              <div key={date}>
                <div className="sticky top-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-2 mb-4 z-10">
                  <h3 className="text-xl text-gray-700">{date}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dateEntries.map((entry) => (
                    <DiaryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
