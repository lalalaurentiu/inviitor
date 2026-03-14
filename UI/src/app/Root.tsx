import { useLocation } from 'react-router';
import { useJobs } from './hooks/useJobs';
import { Home } from './components/Home';
import { JobsList } from './components/JobsList';
import { JobDetail } from './components/JobDetail';
import { LoadingState } from './components/LoadingState';
import { Toaster } from './components/ui/sonner';
import { useSeo } from './hooks/useSeo';

export default function Root() {
  const location = useLocation();
  const { jobs, jobsCount, totalJobs, salaryFloor, salaryFloorCurrency, allCompanies, loading, loadingMoreJobs, hasMoreJobs, loadMoreJobs, deleteJob } = useJobs();

  useSeo({ jobs, totalJobs });

  if (loading) {
    return <LoadingState fullScreen />;
  }

  let content;
  
  if (location.pathname === '/cautare') {
    content = <JobsList jobs={jobs} jobsCount={jobsCount} companies={allCompanies} loadingMoreJobs={loadingMoreJobs} hasMoreJobs={hasMoreJobs} onLoadMoreJobs={loadMoreJobs} />;
  } else if (location.pathname.startsWith('/job/')) {
    content = <JobDetail jobs={jobs} onDeleteJob={deleteJob} />;
  } else {
    content = <Home jobs={jobs} totalJobs={totalJobs} salaryFloor={salaryFloor} salaryFloorCurrency={salaryFloorCurrency} companies={allCompanies} />;
  }

  return (
    <>
      {content}
      <Toaster />
    </>
  );
}
