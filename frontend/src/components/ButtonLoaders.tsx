export const ButtonLoaderPrimary = () => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="1.5"
         strokeLinejoin="round"
         className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:ml-2 rtl:mr-2 shrink-0"
      >
         <line x1="12" y1="2" x2="12" y2="6"></line>
         <line x1="12" y1="18" x2="12" y2="22"></line>
         <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
         <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
         <line x1="2" y1="12" x2="6" y2="12"></line>
         <line x1="18" y1="12" x2="22" y2="12"></line>
         <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
         <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
   );
};

export const ButtonCirculeLoaderDanger = () => {
   return <span className={'animate-spin border-2 border-danger border-l-transparent rounded-full w-5 h-5 inline-block m-auto '}></span>;
};
// export default {SmallDangerLoader};

export const ButtonCirculeLoaderPrimary = () => {
   return <span className={'animate-spin border-2 border-primary border-l-transparent rounded-full w-5 h-5 inline-block m-auto '}></span>;
};
