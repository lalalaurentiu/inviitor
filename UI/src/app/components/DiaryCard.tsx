import { Link } from 'react-router';
import { DiaryEntry, moodConfig } from '../types/diary';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface DiaryCardProps {
  entry: DiaryEntry;
}

export function DiaryCard({ entry }: DiaryCardProps) {
  const mood = moodConfig[entry.mood];

  return (
    <Link to={`/entry/${entry.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="aspect-square overflow-hidden">
          <img
            src={entry.photoUrl}
            alt={entry.caption}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge
              style={{ backgroundColor: mood.color }}
              className="border-0"
            >
              <span className="mr-1">{mood.emoji}</span>
              {mood.label}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="text-gray-700 line-clamp-2">{entry.caption}</p>
        </div>
      </Card>
    </Link>
  );
}
