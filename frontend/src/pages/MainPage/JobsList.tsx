import IconBox from '../../components/Icon/IconBox';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconDollarSign from '../../components/Icon/IconDollarSign';
import IconHome from '../../components/Icon/IconHome';
import IconMapPin from '../../components/Icon/IconMapPin';
import { useState } from 'react';
import { IJob } from '../../types';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import IconChecks from '../../components/Icon/IconChecks';
import { ButtonLoaderPrimary } from '../../components/ButtonLoaders';
import axiosClient from '../../utils/axiosClient';
import { alertSuccess, alertError } from '../../utils/alerts';

const JobsList = ({
   jobs,
   cleamedJobs,
   setCleamedJobs,
}: {
   jobs: IJob[];
   cleamedJobs: { id: number; job_id: number; claim_status: number }[];
   setCleamedJobs: (cleamedJobs: { id: number; job_id: number; claim_status: number }[]) => void;
}) => {
   const claimedStatus = ['Pending', 'Accepted', 'Rejected'];
   const claimedStatusColors = ['text-yellow-500', 'text-green-500', 'text-red-500'];

   const user = useSelector((state: IRootState) => state.themeConfig.user);

   const [claimJobId, setClaimJobId] = useState<number | null>(null);

   const handleClaimJob = (jobId: number) => {
      setClaimJobId(jobId);
      axiosClient
         .post(`/jobs/${jobId}/claim`)
         .then((response) => {
            setCleamedJobs(response.data.cleamedJobs);
            alertSuccess(response.data.message || 'Job claimed successfully');
         })
         .catch((error) => {
            console.log(error);
            alertError(error.response?.data?.message || 'Something went wrong');
         })
         .finally(() => {
            setClaimJobId(null);
         });
   };

   return (
      <div className="panel p-0">
         <div className="px-6 border-b py-4 border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white-light">
               Available Jobs <span className="text-sm text-gray-500 dark:text-[#d0d2d6]">({jobs?.length || 0})</span>
            </h2>
            <div className="flex items-center justify-between space-x-2">
               <span className="text-sm text-gray-500 w-20 dark:text-[#d0d2d6]">Sort by:</span>
               <select className="form-select text-white-dark w-40">
                  <option>Distance</option>
                  <option>Volume</option>
                  <option>Pickup Date</option>
                  <option>Price</option>
               </select>
            </div>
         </div>
         <div id="jobList" className="overflow-y-scroll" style={{ maxHeight: '800px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(67, 97, 238, 0.2) transparent' }}>
            {/* Job Card 1 */}
            {jobs?.map((job: IJob, index: number) => {
               const cleamedJob = cleamedJobs.find((cleamedJob: any) => cleamedJob.job_id === job.id);
               return (
                  <div key={job.id} className="job-card border-b border-b-gray-100 dark:border-b-gray-800 p-6 border-l-4 border-l-transparent hover:border-l-indigo-500">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="font-medium text-gray-900 dark:text-white-light">{job.title}</h3>
                           <p className="text-sm text-gray-500 mt-1 dark:text-[#616161]">
                              Posted {job.posted} * {job.company.name}
                           </p>
                        </div>
                        <span className="text-primary">{job.status}</span>
                     </div>

                     <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                 <IconMapPin className="text-indigo-500" />
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Pickup Location</p>
                                 <p className="text-gray-800 dark:text-gray-200 text-lg mt-2">
                                    {job.pickupLocation.city} {job.pickupLocation.state} {job.pickupLocation.zip_code}
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div>
                           <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                 <IconHome className="text-indigo-500" />
                              </div>
                              <div>
                                 <p className="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Delivery Address</p>
                                 <p className="text-gray-800 dark:text-gray-200 text-lg mt-2">
                                    {job.deliveryAddress.city} {job.deliveryAddress.state} {job.deliveryAddress.zip_code}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                           <IconBox className="text-indigo-500" />
                           <div>
                              <p className="text-xs text-gray-500 dark:text-[#d0d2d6]">Volume</p>
                              <p className="text-sm font-medium dark:text-[#d0d2d6]">{job.volume} cu ft</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <IconDollarSign className="text-indigo-500" />
                           <div>
                              <p className="text-xs text-gray-500 dark:text-[#d0d2d6]">Price</p>
                              <p className="text-sm font-medium dark:text-[#d0d2d6]">${job.price}</p>
                           </div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <IconCalendar className="text-indigo-500" />
                           <div>
                              <p className="text-xs text-gray-500 dark:text-[#d0d2d6]">Delivery</p>
                              <p className="text-sm font-medium dark:text-[#d0d2d6]">{job.deliveryDate}</p>
                           </div>
                        </div>
                     </div>

                     {user.company_id !== job.company.id ? (
                        cleamedJob ? (
                           <div className="mt-6 flex justify-end space-x-3">
                              <p className="text-indigo-600 text-sm font-medium flex items-center space-x-1">
                                 You claimed this job, status: <span className={`ml-2 ${claimedStatusColors[cleamedJob.claim_status]}`}>{claimedStatus[cleamedJob.claim_status]}</span>
                              </p>
                           </div>
                        ) : (
                           <div className="mt-6 flex justify-end space-x-3">
                              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1">
                                 <span>Details</span>
                              </button>
                              <button onClick={() => handleClaimJob(job.id)} className="btn-primary text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1">
                                 {claimJobId === job.id ? <ButtonLoaderPrimary /> : <IconChecks />}
                                 <span>Claim Job</span>
                              </button>
                           </div>
                        )
                     ) : (
                        <div className="mt-6 flex justify-end space-x-3">
                           <p className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1">This is your job</p>
                        </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default JobsList;
