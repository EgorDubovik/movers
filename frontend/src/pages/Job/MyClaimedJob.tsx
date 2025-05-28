import { useEffect, useState } from 'react';
import { useApiRequest } from '../../utils/hooks/useApiRequest';
import { PageCirclePrimaryLoader, PageLoadError } from '../../components/PageLoadStatus';
import { IJob } from '../../types';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';
import IconEye from '../../components/Icon/IconEye';
import Pagination from '../../components/Pagination';
import { ButtonCirculeLoaderDanger } from '../../components/ButtonLoaders';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import axiosClient from '../../utils/axiosClient';
import { alertError } from '../../utils/alerts';

interface IClaimedJob {
   claim_status: number;
   job: IJob;
}

const MyClaimedJob = () => {
   const PAGE_SIZES = [10, 20, 50];
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
   const [total, setTotal] = useState(0);
   const [claimedJobs, setClaimedJobs] = useState<IClaimedJob[]>([]);
   const [viewType, setViewType] = useState<'list' | 'grid'>('list');
   const claimedStatus = ['Pending', 'Accepted', 'Rejected'];
   const claimedStatusColors = ['text-yellow-500', 'text-green-500', 'text-red-500'];
   const [removeClaimedJobId, setRemoveClaimedJobId] = useState<number | null>(null);
   const { loadingStatus, data, error, sendRequest } = useApiRequest({
      url: '/job/my-claimed-job',
      method: 'get',
      params: {
         limit: pageSize,
         page: page,
      },
   });

   useEffect(() => {
      sendRequest();
   }, [page, pageSize]);

   useEffect(() => {
      if (data) {
         setClaimedJobs(data.jobs || []);
         setTotal(data.total);
      }
   }, [data]);

   const removeClaimedJob = (jobId: number) => {
      if (removeClaimedJobId !== null) {
         return;
      }

      if (!confirm('Are you sure you want to remove this claim?')) {
         return;
      }
      setRemoveClaimedJobId(jobId);
      axiosClient
         .delete(`/job/my-claimed-job/${jobId}`)
         .then(() => {
            setClaimedJobs((prev) => prev.filter((job) => job.job.id !== jobId));
         })
         .catch((error) => {
            console.log(error);
            alertError(error.response?.data?.message || 'Something went wrong');
         })
         .finally(() => {
            setRemoveClaimedJobId(null);
         });
   };

   return (
      <div>
         {loadingStatus === 'loading' && <PageCirclePrimaryLoader />}
         {loadingStatus === 'error' && <PageLoadError />}
         {loadingStatus === 'success' && (
            <>
               <div className="flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-xl">Jobs list</h2>
                  <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                     <div className="flex gap-3">
                        <div>
                           <button type="button" className={`btn btn-outline-primary p-2 ${viewType === 'list' && 'bg-primary text-white'}`} onClick={() => setViewType('list')}>
                              <IconListCheck />
                           </button>
                        </div>
                        <div>
                           <button type="button" className={`btn btn-outline-primary p-2 ${viewType === 'grid' && 'bg-primary text-white'}`} onClick={() => setViewType('grid')}>
                              <IconLayoutGrid />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               {viewType === 'list' && (
                  <div className="panel p-0 mt-4">
                     <div className="table-responsive">
                        <table className="table-hover">
                           <thead>
                              <tr>
                                 <th>ID</th>
                                 <th>Title</th>
                                 <th>Posted</th>
                                 <th>Pickup Location</th>
                                 <th>Delivery Location</th>
                                 <th>Price</th>
                                 <th>Claim Status</th>
                                 <th className="!text-center">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {claimedJobs.map((claimedJob) => (
                                 <tr key={claimedJob.job.id}>
                                    <td>{claimedJob.job.id}</td>
                                    <td>{claimedJob.job.title}</td>
                                    <td>{claimedJob.job.posted}</td>
                                    <td>
                                       {claimedJob.job.pickupLocation.city} {claimedJob.job.pickupLocation.state} {claimedJob.job.pickupLocation.zip_code}
                                    </td>
                                    <td>
                                       {claimedJob.job.deliveryAddress.city} {claimedJob.job.deliveryAddress.state} {claimedJob.job.deliveryAddress.zip_code}
                                    </td>
                                    <td>{claimedJob.job.price}</td>
                                    <td>
                                       <span className={`${claimedStatusColors[claimedJob.claim_status]}`}>{claimedStatus[claimedJob.claim_status]}</span>
                                    </td>
                                    <td className="flex items-center justify-center space-x-4">
                                       <IconEye className="text-primary cursor-pointer" />

                                       <button type="button" className="text-danger cursor-pointer flex items-center" onClick={() => removeClaimedJob(claimedJob.job.id)}>
                                          {removeClaimedJobId === claimedJob.job.id ? <ButtonCirculeLoaderDanger /> : <IconTrashLines />}
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className="px-4">
                        <Pagination page={page} setPage={setPage} totalRecordsCount={total} pageSize={pageSize} bg="bg-gray-300 dark:bg-zinc-800 text-gray-700 dark:text-gray-200" />
                     </div>
                  </div>
               )}
            </>
         )}
      </div>
   );
};

export default MyClaimedJob;
