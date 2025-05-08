const CreateJob = () => {
   return (
      <div className="container w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-8">
         <div className="panel">
            <div className="flex items-center justify-between mb-5">
               <h5 className="font-semibold text-lg dark:text-white-light">Enter job information</h5>
            </div>
            <form className="space-y-6">
               <div className="">
                  <div className="false">
                     <label>Customer name</label>
                     <input type="text" placeholder="Name" name="name" className="transition-colors duration-500 form-input w-full" value="" />
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default CreateJob;
