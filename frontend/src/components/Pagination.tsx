import IconArrowLeft from './Icon/IconArrowLeft';

interface PaginationProps {
   totalRecordsCount: number;
   pageSize: number;
   page: number;
   setPage: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
   const totalRecords = props.totalRecordsCount || 0;
   const pageSize = props.pageSize || 10;
   const page = props.page || 1;
   const setPage = props.setPage;
   const totalPages = Math.ceil(totalRecords / pageSize);
   return (
      <div className="py-5">
         <div className="flex items-center justify-between" aria-label="Pagination">
            <div className="hidden sm:block">
               <p className="text-sm text-gray-700">
                  Showing
                  <span className="font-medium"> {(page - 1) * pageSize + 1} </span>
                  to
                  <span className="font-medium"> {page * pageSize} </span>
                  of
                  <span className="font-medium"> {totalRecords} </span>
                  results
               </p>
            </div>
            <div className="flex justify-between space-x-2">
               <button onClick={() => setPage(page - 1)} className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 dark:bg-dark`} disabled={page === 1}>
                  &lt;
               </button>

               {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
                  <button
                     key={item}
                     onClick={() => setPage(item)}
                     className={`w-10 h-10 rounded-full flex items-center justify-center  ${page === item ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-dark'}`}
                  >
                     {item}
                  </button>
               ))}

               <button onClick={() => setPage(page + 1)} className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 dark:bg-dark`} disabled={page === totalPages}>
                  &gt;
               </button>
            </div>
         </div>
      </div>
   );
};

export default Pagination;
