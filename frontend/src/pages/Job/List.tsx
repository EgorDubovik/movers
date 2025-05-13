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
import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';

const List = () => {
   const navigator = useNavigate();
   const [jobs, setJobs] = useState<IJob[]>([]);
   const [loadingStatus, setLoadingStatus] = useState<'loading' | 'error' | 'success'>('loading');
   const [viewType, setViewType] = useState<'list' | 'grid'>('list');
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [sortStatus, setSortStatus] = useState({
      columnAccessor: 'name',
      direction: 'asc',
   });
   const PAGE_SIZES = [10, 20, 50];
   useEffect(() => {
      axiosClient
         .get('/jobs')
         .then((response) => {
            console.log(response.data);
            setLoadingStatus('success');
            setJobs(response.data);
         })
         .catch((error) => {
            setLoadingStatus('error');
            console.log(error);
         });
   }, []);

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
                           <button type="button" className="btn btn-primary" onClick={() => navigator('/job/create')}>
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
               {/* {viewType === 'list' && (
                  <div className="mt-5 panel p-0 border-0 overflow-hidden">
                     <div className="datatables pagination-padding">
                        <DataTable
                           className="whitespace-nowrap table-hover invoice-table pb-4"
                           records={jobs}
                           columns={[
                              {
                                 accessor: 'ID',
                                 sortable: true,
                                 render: ({ id }) => <span>{id}</span>,
                              },
                              {
                                 accessor: 'Customer Name',
                                 sortable: true,
                                 render: ({ title, id }) => (
                                    <div className="flex items-center font-semibold">
                                       <Link to={`/job/${id}`} className="text-primary underline hover:no-underline">
                                          {title}
                                       </Link>
                                    </div>
                                 ),
                              },
                              {
                                 accessor: 'pickupLocation',
                                 sortable: true,
                                 render: ({ pickupLocation }) => (
                                    <div className="font-semibold">
                                       {pickupLocation.line_1 + ' ' + pickupLocation.line_2 || '' + ', ' + pickupLocation.city + ', ' + pickupLocation.state + ', ' + pickupLocation.zip_code}
                                    </div>
                                 ),
                              },
                              {
                                 accessor: 'deliveryLocation',
                                 sortable: true,
                                 render: ({ deliveryAddress }) => (
                                    <div className="font-semibold">
                                       {deliveryAddress.line_1 + ' ' + deliveryAddress.line_2 || '' + ', ' + deliveryAddress.city + ', ' + deliveryAddress.state + ', ' + deliveryAddress.zip_code}
                                    </div>
                                 ),
                              },
                              {
                                 accessor: 'Posted',
                                 sortable: true,
                                 render: ({ posted }) => <div className="font-semibold">{posted}</div>,
                              },

                              {
                                 accessor: 'action',
                                 title: 'Actions',
                                 sortable: false,
                                 textAlign: 'center',
                                 render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                       <button type="button" className="btn btn-sm btn-outline-warning">
                                          Edit
                                       </button>
                                       <button type="button" className="btn btn-sm btn-outline-info">
                                          View
                                       </button>
                                    </div>
                                 ),
                              },
                           ]}
                           highlightOnHover
                           totalRecords={jobs.length}
                           recordsPerPage={10}
                           page={page}
                           onPageChange={(p) => setPage(p)}
                           recordsPerPageOptions={PAGE_SIZES}
                           onRecordsPerPageChange={setPageSize}
                           paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                     </div>
                  </div>
               )} */}
               <Pagination page={page} setPage={setPage} totalRecordsCount={100} pageSize={10} />
            </>
         )}
      </div>
   );
};

export default List;
