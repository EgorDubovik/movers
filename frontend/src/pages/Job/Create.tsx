import { useState } from 'react';
import { IJobFormData } from './types';
import axiosClient from '../../utils/axiosClient';
import { ButtonLoaderPrimary } from '../../components/ButtonLoaders';

const CreateJob = () => {
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
   const [errorMessage, setErrorMessage] = useState('');
   const [formData, setFormData] = useState<IJobFormData>({
      address_from: {
         id: 0,
         line_1: '',
         line_2: '',
         city: '',
         state: '',
         zip_code: '',
      },
      address_to: {
         id: 0,
         line_1: '',
         line_2: '',
         city: '',
         state: '',
         zip_code: '',
      },
      title: '',
      description: '',
      volume: '',
      price: '',
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setErrorMessage('');
      setErrors({});
      axiosClient
         .post('/jobs', formData)
         .then((response) => {
            console.log(response);
         })
         .catch((error) => {
            if (error.response && error.response.data.errors) {
               setErrors(error.response.data.errors);
            }
            if (error.response && error.response.data.message) {
               setErrorMessage(error.response.data.message);
            }
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const hasError = (field: string) => errors[field] !== undefined;

   return (
      <div className="container w-full md:w-1/2 lg:w-1/3 mx-auto px-4 sm:px-8">
         <div className="panel">
            <div className="flex items-center justify-between mb-5">
               <h5 className="font-semibold text-lg dark:text-white-light">Enter job information</h5>
            </div>
            {errorMessage && <div className="my-4 flex items-center rounded bg-danger-light p-3.5 text-danger dark:bg-danger-dark-light">{errorMessage}</div>}
            <form className="" onSubmit={handleSubmit}>
               <div className="space-y-6 pb-6">
                  <h1 className="font-semibold text-lg dark:text-white-light">Address from</h1>
                  <div className={hasError('address_from.line_1') ? 'has-error' : ''}>
                     <input
                        type="text"
                        placeholder="Address line 1"
                        name="address_from_line_1"
                        className="form-input w-full"
                        value={formData.address_from.line_1}
                        onChange={(e) => setFormData({ ...formData, address_from: { ...formData.address_from, line_1: e.target.value } })}
                     />
                  </div>
                  <div className={hasError('address_from.line_2') ? 'has-error' : ''}>
                     <input
                        type="text"
                        placeholder="Address line 2"
                        name="address_from_line_2"
                        className="form-input w-full"
                        value={formData.address_from.line_2}
                        onChange={(e) => setFormData({ ...formData, address_from: { ...formData.address_from, line_2: e.target.value } })}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                     <div className={`md:col-span-2 ${hasError('address_from.city') ? 'has-error' : ''}`}>
                        <label>City</label>
                        <input
                           type="text"
                           placeholder="Enter City"
                           name="city"
                           className="form-input"
                           value={formData.address_from.city}
                           onChange={(e) => setFormData({ ...formData, address_from: { ...formData.address_from, city: e.target.value } })}
                        />
                     </div>
                     <div className={`${hasError('address_from.state') ? 'has-error' : ''}`}>
                        <label>State</label>
                        <input
                           type="text"
                           placeholder="Enter State"
                           name="state"
                           className="form-input"
                           value={formData.address_from.state}
                           onChange={(e) => setFormData({ ...formData, address_from: { ...formData.address_from, state: e.target.value } })}
                        />
                     </div>
                     <div className={`${hasError('address_from.zip_code') ? 'has-error' : ''}`}>
                        <label>Zip</label>
                        <input
                           type="text"
                           placeholder="Enter Zip"
                           name="zip"
                           className="form-input"
                           value={formData.address_from.zip_code}
                           onChange={(e) => setFormData({ ...formData, address_from: { ...formData.address_from, zip_code: e.target.value } })}
                        />
                     </div>
                  </div>
                  <div className={hasError('address_from.description') ? 'has-error' : ''}>
                     <textarea
                        placeholder="Description"
                        name="description"
                        className="form-input w-full"
                        value={formData.address_from.description}
                        onChange={(e) => setFormData({ ...formData, address_from: { ...formData.address_from, description: e.target.value } })}
                     />
                  </div>
               </div>
               <div className="space-y-6 border-t dark:border-gray-700 border-gray-200 py-6">
                  <h1 className="font-semibold text-lg dark:text-white-light">Address to</h1>
                  <div className={hasError('address_to.line_1') ? 'has-error' : ''}>
                     <input
                        type="text"
                        placeholder="Address line 1"
                        name="address_to_line_1"
                        className="form-input w-full"
                        value={formData.address_to.line_1}
                        onChange={(e) => setFormData({ ...formData, address_to: { ...formData.address_to, line_1: e.target.value } })}
                     />
                  </div>
                  <div className={hasError('address_to.line_2') ? 'has-error' : ''}>
                     <input
                        type="text"
                        placeholder="Address line 2"
                        name="address_to_line_2"
                        className="form-input w-full"
                        value={formData.address_to.line_2}
                        onChange={(e) => setFormData({ ...formData, address_to: { ...formData.address_to, line_2: e.target.value } })}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                     <div className={`md:col-span-2 ${hasError('address_to.city') ? 'has-error' : ''}`}>
                        <label>City</label>
                        <input
                           type="text"
                           placeholder="Enter City"
                           name="city"
                           className="form-input"
                           value={formData.address_to.city}
                           onChange={(e) => setFormData({ ...formData, address_to: { ...formData.address_to, city: e.target.value } })}
                        />
                     </div>
                     <div className={`${hasError('address_to.state') ? 'has-error' : ''}`}>
                        <label>State</label>
                        <input
                           type="text"
                           placeholder="Enter State"
                           name="state"
                           className="form-input"
                           value={formData.address_to.state}
                           onChange={(e) => setFormData({ ...formData, address_to: { ...formData.address_to, state: e.target.value } })}
                        />
                     </div>
                     <div className={`${hasError('address_to.zip_code') ? 'has-error' : ''}`}>
                        <label>Zip</label>
                        <input
                           type="text"
                           placeholder="Enter Zip"
                           name="zip"
                           className="form-input"
                           value={formData.address_to.zip_code}
                           onChange={(e) => setFormData({ ...formData, address_to: { ...formData.address_to, zip_code: e.target.value } })}
                        />
                     </div>
                  </div>
                  <div className={hasError('address_to.description') ? 'has-error' : ''}>
                     <textarea
                        placeholder="Description"
                        name="description"
                        className="form-input w-full"
                        value={formData.address_to.description}
                        onChange={(e) => setFormData({ ...formData, address_to: { ...formData.address_to, description: e.target.value } })}
                     />
                  </div>
               </div>

               <div className="space-y-4 border-t dark:border-gray-700 border-gray-200 py-6">
                  <h1 className="font-semibold text-lg dark:text-white-light">Job information</h1>
                  <div className={`${hasError('title') ? 'has-error' : ''}`}>
                     <input type="text" placeholder="Title" name="title" className="form-input w-full" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                  </div>
                  <div className={`${hasError('description') ? 'has-error' : ''}`}>
                     <textarea
                        placeholder="Description"
                        name="description"
                        className="form-input w-full"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className={`${hasError('volume') ? 'has-error' : ''}`}>
                        <input
                           type="text"
                           placeholder="Volume"
                           name="volume"
                           className="form-input w-full"
                           value={formData.volume}
                           onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        />
                     </div>
                     <div className={`${hasError('price') ? 'has-error' : ''}`}>
                        <input
                           type="text"
                           placeholder="Price"
                           name="price"
                           className="form-input w-full"
                           value={formData.price}
                           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                     </div>
                  </div>
               </div>

               <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                     Create Job
                     {loading && <ButtonLoaderPrimary />}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default CreateJob;
