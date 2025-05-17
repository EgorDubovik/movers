export const PageCirclePrimaryLoader = () => {
   return (
      <div className="text-center">
         <span className="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>
      </div>
   );
};

export const PageLoadError = () => {
   return (
      <div className="flex items-center p-3.5 rounded text-danger bg-danger-light dark:bg-danger-dark-light">
         <span className="ltr:pr-2 rtl:pl-2">
            <strong className="ltr:mr-1 rtl:ml-1">Woops!</strong>Something went wrong. Please try again or{' '}
            <a
               href=""
               onClick={() => {
                  window.location.reload();
               }}
               className="underline"
            >
               reload the page
            </a>
         </span>
      </div>
   );
};

export const PageMainLoader = () => {
   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <svg viewBox="0 0 100 100" className="w-64 h-64">
            <path
               id="infinity"
               d="M20,50 Q35,20 50,50 Q65,80 80,50 Q95,20 50,50 Q5,80 20,50"
               fill="none"
               stroke="url(#gradient)"
               strokeWidth="4"
               strokeLinecap="round"
               strokeDasharray="190"
               strokeDashoffset="190"
            >
               <animate id="drow" attributeName="stroke-dashoffset" from="190" to="0" dur=".9s" begin="0s;erase.end" fill="none" />
               <animate id="erase" attributeName="stroke-dashoffset" from="0" to="-190" dur=".9s" begin="drow.end" fill="none" />
            </path>
            <defs>
               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
               </linearGradient>
            </defs>
         </svg>
         <h1 className="gradient-text text-4xl md:text-5xl font-bold text-center mb-12 animate-pulse-slow">Loading...</h1>
      </div>
   );
};
