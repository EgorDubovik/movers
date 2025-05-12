import { useState } from 'react';

const SearchBox = () => {
   const [range3, setRange3] = useState<any>('20');

   return (
      <div className="panel">
         <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white-light">Route Optimization</h2>
         <form id="routeForm" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label htmlFor="startPoint" className="block text-sm font-medium text-gray-700 mb-1">
                     Starting Point
                  </label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-map-marker-alt text-gray-400"></i>
                     </div>
                     <input type="text" id="startPoint" placeholder="Enter starting address" className="form-input w-full" />
                  </div>
               </div>
               <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                     Destination
                  </label>
                  <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-flag-checkered text-gray-400"></i>
                     </div>
                     <input type="text" id="destination" placeholder="Enter destination address" className="form-input w-full" />
                  </div>
               </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
               {/* Radius search */}
               <div className="flex items-center justify-between md:w-1/2 w-full space-x-3">
                  <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1 whitespace-nowrap">
                     Choose radius
                  </label>
                  <input type="range" className="w-full cursor-pointer outline-none" min="10" max="100" value={range3} onChange={(e) => setRange3(e.target.value)} />
                  <div className="font-bold ml-2 flex items-center">
                     <span className="text-gray-900 dark:text-white-light w-10 text-right">{range3}</span>
                     <span className="ml-2">miles</span>
                  </div>
               </div>
               <button className="btn-primary text-white px-6 py-2 rounded-lg font-medium shadow-sm flex items-center space-x-2">
                  <i className="fas fa-route"></i>
                  <span>Optimize Route</span>
               </button>
            </div>
         </form>
      </div>
   );
};

export default SearchBox;
