import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Job, judeteRomania } from '../types/job';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface AddJobProps {
  onAddJob: (job: Job) => void;
}

export function AddJob({ onAddJob }: AddJobProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titlu: '',
    companie: '',
    localitate: '',
    judet: '',
    salariuMin: '',
    salariuMax: '',
    salariuCurrency: 'RON',
    link: '',
    descriere: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.titlu.trim()) {
      toast.error('Te rog completează titlul jobului');
      return;
    }
    if (!formData.companie.trim()) {
      toast.error('Te rog completează compania');
      return;
    }
    if (!formData.localitate.trim()) {
      toast.error('Te rog completează localitatea');
      return;
    }
    if (!formData.judet) {
      toast.error('Te rog selectează județul');
      return;
    }
    if (formData.salariuMin && formData.salariuMax && parseInt(formData.salariuMin) > parseInt(formData.salariuMax)) {
      toast.error('Salariul minim nu poate fi mai mare decât salariul maxim');
      return;
    }

    if (!formData.link.trim()) {
      toast.error('Te rog completează linkul către anunț');
      return;
    }

    const newJob: Job = {
      id: Date.now().toString(),
      titlu: formData.titlu,
      companie: formData.companie,
      localitate: formData.localitate,
      judet: formData.judet,
      salariuMin: formData.salariuMin ? parseInt(formData.salariuMin) : null,
      salariuMax: formData.salariuMax ? parseInt(formData.salariuMax) : null,
      salariuCurrency: formData.salariuCurrency.trim() || null,
      remote: null,
      link: formData.link,
      descriere: formData.descriere || undefined,
      createdAt: new Date().toISOString(),
    };

    onAddJob(newJob);
    toast.success('Jobul a fost adăugat cu succes!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl">Adaugă Job Nou</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titlu Job */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label htmlFor="titlu" className="text-lg mb-4 block">
              Titlu Job *
            </Label>
            <Input
              id="titlu"
              value={formData.titlu}
              onChange={(e) => setFormData({ ...formData, titlu: e.target.value })}
              placeholder="ex: Dezvoltator Full Stack Senior"
            />
          </div>

          {/* Companie */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label htmlFor="companie" className="text-lg mb-4 block">
              Companie *
            </Label>
            <Input
              id="companie"
              value={formData.companie}
              onChange={(e) => setFormData({ ...formData, companie: e.target.value })}
              placeholder="ex: TechCorp Romania"
            />
          </div>

          {/* Locație */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label className="text-lg mb-4 block">Locație *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="localitate" className="text-sm mb-2 block">
                  Localitate
                </Label>
                <Input
                  id="localitate"
                  value={formData.localitate}
                  onChange={(e) => setFormData({ ...formData, localitate: e.target.value })}
                  placeholder="ex: Cluj-Napoca"
                />
              </div>
              <div>
                <Label htmlFor="judet" className="text-sm mb-2 block">
                  Județ
                </Label>
                <Select
                  value={formData.judet}
                  onValueChange={(value) => setFormData({ ...formData, judet: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează județul" />
                  </SelectTrigger>
                  <SelectContent>
                    {judeteRomania.map(judet => (
                      <SelectItem key={judet} value={judet}>{judet}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Salariu */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label className="text-lg mb-4 block">Salariu (opțional)</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="salariuMin" className="text-sm mb-2 block">
                  Minim
                </Label>
                <Input
                  id="salariuMin"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.salariuMin}
                  onChange={(e) => setFormData({ ...formData, salariuMin: e.target.value })}
                  placeholder="ex: 5000"
                />
              </div>
              <div>
                <Label htmlFor="salariuMax" className="text-sm mb-2 block">
                  Maxim
                </Label>
                <Input
                  id="salariuMax"
                  type="number"
                  min="0"
                  step="100"
                  value={formData.salariuMax}
                  onChange={(e) => setFormData({ ...formData, salariuMax: e.target.value })}
                  placeholder="ex: 8000"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="salariuCurrency" className="text-sm mb-2 block">
                  Moneda
                </Label>
                <Input
                  id="salariuCurrency"
                  value={formData.salariuCurrency}
                  onChange={(e) => setFormData({ ...formData, salariuCurrency: e.target.value.toUpperCase() })}
                  placeholder="ex: RON"
                  maxLength={10}
                />
              </div>
            </div>
          </div>

          {/* Link */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label htmlFor="link" className="text-lg mb-4 block">
              Link către anunț *
            </Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://..."
            />
          </div>

          {/* Descriere */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Label htmlFor="descriere" className="text-lg mb-4 block">
              Descriere (opțional)
            </Label>
            <Textarea
              id="descriere"
              value={formData.descriere}
              onChange={(e) => setFormData({ ...formData, descriere: e.target.value })}
              placeholder="Scurtă descriere a jobului..."
              className="min-h-32 resize-none"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full h-14 text-lg">
            Publică Jobul
          </Button>
        </form>
      </div>
    </div>
  );
}
