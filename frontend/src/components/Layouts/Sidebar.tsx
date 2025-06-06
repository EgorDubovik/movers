import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';

const Sidebar = () => {
   const themeConfig = useSelector((state: IRootState) => state.themeConfig);

   const dispatch = useDispatch();

   // useEffect(() => {
   //    console.log(window.location.pathname);
   //    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
   //    console.log(selector);
   //    if (selector) {
   //       // selector.classList.add('active');
   //       const ul: any = selector.closest('ul.sub-menu');
   //       if (ul) {
   //          let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
   //          if (ele.length) {
   //             ele = ele[0];
   //             setTimeout(() => {
   //                ele.click();
   //             });
   //          }
   //       }
   //    }
   // }, []);

   // useEffect(() => {
   //    if (window.innerWidth < 1024 && themeConfig.sidebar) {
   //       dispatch(toggleSidebar());
   //    }
   // }, [location]);

   return (
      <div>
         <nav className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 `}>
            <div className="bg-white dark:bg-black h-full">
               <div className="flex justify-between items-center px-4 py-3">
                  <NavLink to="/" className="main-logo flex items-center shrink-0">
                     <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                     <span className="text-2xl ml-1.5 font-semibold align-middle lg:inline dark:text-white-light">MOVING</span>
                  </NavLink>

                  <button
                     type="button"
                     className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                     onClick={() => dispatch(toggleSidebar())}
                  >
                     <IconCaretsDown className="m-auto rotate-90" />
                  </button>
               </div>
               <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                  <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                     <li className="nav-item">
                        <NavLink to="/panel" end className="group">
                           <div className="flex items-center">
                              <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                              <span className="pl-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Dashboard</span>
                           </div>
                        </NavLink>
                     </li>
                     <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                        <IconMinus className="w-4 h-5 flex-none hidden" />
                        <span>Job</span>
                     </h2>
                     <li className="nav-item">
                        <ul>
                           <li className="nav-item">
                              <NavLink to="/panel/job/create" className="group">
                                 <div className="flex items-center">
                                    <IconMenuScrumboard className="group-hover:!text-primary shrink-0" />
                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Create new job</span>
                                 </div>
                              </NavLink>
                           </li>
                           <li className="nav-item">
                              <NavLink to="/panel/job/list" className="group">
                                 <div className="flex items-center">
                                    <IconMenuNotes className="group-hover:!text-primary shrink-0" />
                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">My job list</span>
                                 </div>
                              </NavLink>
                           </li>
                           <li className="nav-item">
                              <NavLink to="/panel/job/my-claimed-job" className="group">
                                 <div className="flex items-center">
                                    <IconMenuTodo className="group-hover:!text-primary shrink-0" />
                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">My claimed job</span>
                                 </div>
                              </NavLink>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </PerfectScrollbar>
            </div>
         </nav>
      </div>
   );
};

export default Sidebar;
