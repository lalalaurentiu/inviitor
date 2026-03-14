import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { DiaryEntry, Mood, moodConfig } from '../types/diary';
import { Camera, ArrowLeft, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface AddEntryProps {
  onAddEntry: (entry: DiaryEntry) => void;
}

export function AddEntry({ onAddEntry }: AddEntryProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>('happy');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!photoUrl) {
      toast.error('Please add a photo');
      return;
    }
    
    if (!caption.trim()) {
      toast.error('Please add a caption');
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      photoUrl,
      caption,
      mood: selectedMood,
      createdAt: new Date().toISOString(),
    };

    onAddEntry(newEntry);
    toast.success('Memory saved!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl">Add New Memory</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label className="text-lg mb-4 block">Photo</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            
            {photoUrl ? (
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <img
                  src={photoUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Upload className="w-8 h-8 text-white" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <Camera className="w-12 h-12 text-gray-400" />
                <span className="text-gray-500">Click to add photo</span>
              </button>
            )}
          </div>

          {/* Date */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label htmlFor="date" className="text-lg mb-4 block">Date</Label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Mood */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label className="text-lg mb-4 block">How are you feeling?</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(moodConfig) as Mood[]).map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedMood === mood
                      ? 'border-gray-900 shadow-md scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 mx-auto"
                    style={{ backgroundColor: moodConfig[mood].color }}
                  >
                    {moodConfig[mood].emoji}
                  </div>
                  <p className="text-center">{moodConfig[mood].label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label htmlFor="caption" className="text-lg mb-4 block">Caption</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What made this moment special?"
              className="min-h-32 resize-none"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full h-14 text-lg">
            Save Memory
          </Button>
        </form>
      </div>
    </div>
  );
}
