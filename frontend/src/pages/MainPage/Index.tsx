import Header from './Header';
import SearchBox from './SearchBox';

const Index = () => {
   return (
      <div className="w-full h-screen">
         <Header />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Storage Jobs</h1>
               <p className="mt-2 text-sm text-gray-500 dark:text-[#d0d2d6]">Find additional jobs along your current route to maximize efficiency</p>
            </div>

            {/* Search Box */}
            <SearchBox />
         </div>
      </div>
   );
};

export default Index;
