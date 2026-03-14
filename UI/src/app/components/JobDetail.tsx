import { useParams, useNavigate } from 'react-router';
import { Job } from '../types/job';
import { ArrowLeft, Trash2, MapPin, Building2, Banknote, ExternalLink, Calendar, Laptop2 } from 'lucide-react';
import { formatSalary } from '../hooks/useJobs';
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

interface JobDetailProps {
  jobs: Job[];
  onDeleteJob: (id: string) => void;
}

export function JobDetail({ jobs, onDeleteJob }: JobDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Jobul nu a fost găsit</p>
          <Button onClick={() => navigate('/')}>Înapoi la listă</Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    onDeleteJob(job.id);
    toast.success('Jobul a fost șters');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
                <AlertDialogTitle>Ștergi acest job?</AlertDialogTitle>
                <AlertDialogDescription>
                  Această acțiune nu poate fi anulată. Jobul va fi șters permanent.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anulează</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Șterge</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="p-8">
            <h1 className="text-3xl mb-4">{job.titlu}</h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">{job.companie}</span>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">
                  {job.localitate}, {job.judet}
                </span>
              </div>

              {job.remote ? (
                <div className="flex items-center gap-3 text-lg">
                  <Laptop2 className="w-6 h-6 text-sky-600" />
                  <Badge className="border-sky-200 bg-sky-50 px-4 py-2 text-lg text-sky-700">
                    {job.remote}
                  </Badge>
                </div>
              ) : null}

              <div className="flex items-center gap-3">
                <Banknote className="w-6 h-6 text-green-600" />
                <Badge className={job.salariuMin !== null || job.salariuMax !== null ? 'border-green-200 bg-green-50 px-4 py-2 text-lg text-green-700' : 'border-slate-200 bg-slate-50 px-4 py-2 text-lg text-slate-600'}>
                  {formatSalary(job.salariuMin, job.salariuMax, job.salariuCurrency) || 'Salariu nespecificat'}
                </Badge>
              </div>
            </div>

            {job.descriere && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="text-xl mb-4">Descriere</h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {job.descriere}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full h-12 text-lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Accesează anunțul complet
                </Button>
              </a>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  Postat la {new Date(job.createdAt).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
