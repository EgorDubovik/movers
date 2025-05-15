import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IJob } from '../../types';
import axiosClient from '../../utils/axiosClient';
import { PageCirclePrimaryLoader } from '../../components/PageLoadStatus';
import { PageLoadError } from '../../components/PageLoadStatus';
import IconUserPlus from '../../components/Icon/IconUserPlus';
import IconListCheck from '../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../components/Icon/IconLayoutGrid';
import IconSearch from '../../components/Icon/IconSearch';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { DataTable } from 'mantine-datatable';
import IconEye from '../../components/Icon/IconEye';
import IconPencilPaper from '../../components/Icon/IconPencilPaper';
import IconTrash from '../../components/Icon/IconTrash';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { ButtonCirculeLoaderDanger } from '../../components/ButtonLoaders';

const List = () => {
   const navigator = useNavigate();
   const PAGE_SIZES = [10, 20, 50];
   const [jobs, setJobs] = useState<IJob[]>([]);
   const [loadingStatus, setLoadingStatus] = useState<'loading' | 'error' | 'success'>('loading');
   const [viewType, setViewType] = useState<'list' | 'grid'>('list');
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
   const [total, setTotal] = useState(0);
   const [removeJobId, setRemoveJobId] = useState<number>(0);

   useEffect(() => {
      setLoadingStatus('loading');
      axiosClient
         .get('/jobs', {
            params: {
               limit: pageSize,
               page: page,
            },
         })
         .then((response) => {
            setLoadingStatus('success');
            setTotal(response.data.total);
            setJobs(response.data.jobs || []);
         })
         .catch((error) => {
            setLoadingStatus('error');
            console.log(error);
         });
   }, [page, pageSize]);

   const removeJob = (id: number) => {
      if (!window.confirm('Are you sure you want to delete this job?')) return;
      setRemoveJobId(id);
      axiosClient.delete(`/jobs/${id}`).then(() => {
         axiosClient
            .get('/jobs', {
               params: {
                  limit: pageSize,
                  page: page,
               },
            })
            .then((response) => {
               setJobs(jobs.filter((job) => job.id !== id));
            })
            .catch((error) => {
               console.log(error);
            })
            .finally(() => {
               setRemoveJobId(0);
            });
      });
   };

   const statusColors = {
      Active: 'text-warning',
      Inactive: 'text-danger',
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
                           <button type="button" className="btn btn-primary" onClick={() => navigator('/panel/job/create')}>
                              <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                              Create new Job
                           </button>
                        </div>
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
                     <div className="relative">
                        <input type="text" placeholder="Search Contacts" className="form-input py-2 pr-11 peer" />
                        <button type="button" className="absolute right-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                           <IconSearch className="mx-auto" />
                        </button>
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
                                 <th>Job Status</th>
                                 <th className="!text-center">Action</th>
                              </tr>
                           </thead>
                           <tbody>
                              {jobs.map((job) => (
                                 <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>{job.title}</td>
                                    <td>{job.posted}</td>
                                    <td>{job.pickupLocation.full_address}</td>
                                    <td>{job.deliveryAddress.full_address}</td>
                                    <td>{job.price}</td>
                                    <td>
                                       <span className={`${statusColors[job.status as keyof typeof statusColors]}`}>{job.status}</span>
                                    </td>
                                    <td className="flex items-center justify-center space-x-4">
                                       <IconEye className="text-primary cursor-pointer" />
                                       <IconPencil className="text-warning cursor-pointer" />
                                       <button type="button" className="text-danger cursor-pointer flex items-center" onClick={() => removeJob(job.id)}>
                                          {removeJobId === job.id && <ButtonCirculeLoaderDanger />}
                                          {removeJobId !== job.id && <IconTrashLines />}
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

export default List;
