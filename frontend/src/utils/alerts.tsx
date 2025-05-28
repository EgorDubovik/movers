import Swal from 'sweetalert2';

export const alertSuccess = (text: string) => {
   const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
   });
   toast.fire({
      icon: 'success',
      title: text,
      padding: '10px 20px',
   });
};

export const alertError = (text: string) => {
   const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
   });
   toast.fire({
      icon: 'error',
      title: text,
      padding: '10px 20px',
   });
};

export const alertInfo = (text: string) => {
   const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
   });
   toast.fire({
      icon: 'info',
      title: text,
      padding: '10px 20px',
   });
};
