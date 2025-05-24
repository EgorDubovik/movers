import Header from './Header';
import SearchBox from './SearchBox';
import Map from './Map';
import JobsList from './JobsList';
import { useState } from 'react';
import { IJob } from '../../types';
import { useEffect } from 'react';
import { PageMainLoader } from '../../components/PageLoadStatus';
import { PageLoadError } from '../../components/PageLoadStatus';
import './style.css';
import { useApiRequest } from '../../utils/hooks/useApiRequest';

const Index = () => {
   const [jobs, setJobs] = useState<IJob[]>([]);
   const { loadingStatus, data, error, sendRequest } = useApiRequest({
      url: '/public/jobs',
      method: 'get',
   });

   useEffect(() => {
      sendRequest();
   }, []);

   useEffect(() => {
      if (data) {
         setJobs(data.jobs || []);
      }
   }, [data]);

   return (
      <>
         {loadingStatus === 'loading' && <PageMainLoader />}
         {loadingStatus === 'error' && <PageLoadError />}
         {loadingStatus === 'success' && (
            <div className="w-full h-screen">
               <Header />
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="mb-8">
                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Storage Jobs</h1>
                     <p className="mt-2 text-sm text-gray-500 dark:text-[#d0d2d6]">Find additional jobs along your current route to maximize efficiency</p>
                  </div>

                  {/* Search Box */}
                  <SearchBox />

                  {/* Map */}
                  <Map jobs={jobs} />

                  {/* Jobs List */}
                  <JobsList jobs={jobs} />
               </div>
            </div>
         )}
      </>
   );
};

export default Index;
