import { useParams, useNavigate } from 'react-router';
import { DiaryEntry, moodConfig } from '../types/diary';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { toast } from 'sonner';

interface EntryDetailProps {
  entries: DiaryEntry[];
  onDeleteEntry: (id: string) => void;
}

export function EntryDetail({ entries, onDeleteEntry }: EntryDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const entry = entries.find(e => e.id === id);

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Entry not found</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const mood = moodConfig[entry.mood];

  const handleDelete = () => {
    onDeleteEntry(entry.id);
    toast.success('Memory deleted');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this memory?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your memory.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="aspect-video overflow-hidden">
            <img
              src={entry.photoUrl}
              alt={entry.caption}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Badge
                style={{ backgroundColor: mood.color }}
                className="border-0 text-lg px-4 py-2"
              >
                <span className="mr-2 text-2xl">{mood.emoji}</span>
                {mood.label}
              </Badge>
              <div className="text-right">
                <p className="text-2xl text-gray-700">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
              {entry.caption}
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Created {new Date(entry.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
