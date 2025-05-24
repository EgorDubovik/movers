import IconBox from '../../components/Icon/IconBox';
import IconCalendar from '../../components/Icon/IconCalendar';
import IconDollarSign from '../../components/Icon/IconDollarSign';
import IconHome from '../../components/Icon/IconHome';
import IconMapPin from '../../components/Icon/IconMapPin';
import { useState } from 'react';
import { IJob } from '../../types';

const JobsList = ({ jobs }: { jobs: IJob[] }) => {
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
            {jobs?.map((job: IJob, index: number) => (
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

                  <div className="mt-6 flex justify-end space-x-3">
                     <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1">
                        <i className="fas fa-info-circle"></i>
                        <span>Details</span>
                     </button>
                     <button className="btn-primary text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1">
                        <i className="fas fa-check"></i>
                        <span>Claim Job</span>
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default JobsList;
