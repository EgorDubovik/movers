import axiosClient from '../utils/axiosClient';

const Index = () => {
   axiosClient.get('/user').then((response) => {
      console.log(response.data);
   });
   return (
      <div>
         <h1>starter page</h1>
      </div>
   );
};

export default Index;
