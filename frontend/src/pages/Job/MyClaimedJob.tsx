import { useEffect, useState } from 'react';
import { useApiRequest } from '../../utils/hooks/useApiRequest';
import { PageCirclePrimaryLoader, PageLoadError } from '../../components/PageLoadStatus';
import { IJob } from '../../types';

const MyClaimedJob = () => {
   const [claimedJobs, setClaimedJobs] = useState<IJob[]>([]);
   const { loadingStatus, data, error, sendRequest } = useApiRequest({
      url: '/job/my-claimed-job',
      method: 'get',
   });

   useEffect(() => {
      sendRequest();
   }, []);

   useEffect(() => {
      if (data) {
         console.log(data);
         //setClaimedJobs(data.jobs || []);
      }
   }, [data]);

   return (
      <div>
         {loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
         {loadingStatus === 'error' && <PageLoadError />}
         {loadingStatus === 'success' && (
            <div>
               <h1>My Claimed Job</h1>
            </div>
         )}
      </div>
   );
};

export default MyClaimedJob;
