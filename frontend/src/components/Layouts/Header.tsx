import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconBellBing from '../Icon/IconBellBing';
import IconUser from '../Icon/IconUser';
import IconMail from '../Icon/IconMail';
import IconLockDots from '../Icon/IconLockDots';
import IconLogout from '../Icon/IconLogout';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import { getNameFirstTwoLetter } from '../../utils/helpers';
import axiosClient from '../../utils/axiosClient';
import { setUser } from '../../store/themeConfigSlice';

const Header = () => {
   const isRtl = false;

   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
   const user = useSelector((state: IRootState) => state.themeConfig.user);
   const dispatch = useDispatch();
   const [notifications, setNotifications] = useState([]);
   useEffect(() => {
      axiosClient
         .get('/user')
         .then((response) => {
            dispatch(setUser(response.data.user));
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);
   return (
      <header className={`z-40 `}>
         <div className="shadow-sm">
            <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
               <div className="horizontal-logo flex lg:hidden justify-between items-center mr-2">
                  <Link to="/" className="main-logo flex items-center shrink-0">
                     <img className="w-8 -ml-1 inline" src="/assets/images/logo.svg" alt="logo" />
                     <span className="text-2xl ml-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300">MOVING</span>
                  </Link>
                  <button
                     type="button"
                     className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                     onClick={() => {
                        dispatch(toggleSidebar());
                     }}
                  >
                     <IconMenu className="w-5 h-5" />
                  </button>
               </div>

               <div className="sm:flex-1 sm:ml-0 ml-auto flex items-center space-x-1.5 lg:space-x-2 dark:text-[#d0d2d6]">
                  <div className="sm:mr-auto ">
                     <Link
                        to="/"
                        className="flex items-center gap-2 cursor-pointer hover:text-primary bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60 rounded-md py-2 px-4"
                     >
                        <IconMenuApps className="w-5 h-5" />
                        See all jobs
                     </Link>
                  </div>
                  <div>
                     {themeConfig.theme === 'light' ? (
                        <button
                           className={`${
                              themeConfig.theme === 'light' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                           }`}
                           onClick={() => {
                              dispatch(toggleTheme('dark'));
                           }}
                        >
                           <IconSun />
                        </button>
                     ) : (
                        ''
                     )}
                     {themeConfig.theme === 'dark' && (
                        <button
                           className={`${
                              themeConfig.theme === 'dark' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                           }`}
                           onClick={() => {
                              dispatch(toggleTheme('system'));
                           }}
                        >
                           <IconMoon />
                        </button>
                     )}
                     {themeConfig.theme === 'system' && (
                        <button
                           className={`${
                              themeConfig.theme === 'system' && 'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                           }`}
                           onClick={() => {
                              dispatch(toggleTheme('light'));
                           }}
                        >
                           <IconLaptop />
                        </button>
                     )}
                  </div>

                  <div className="dropdown shrink-0">
                     <Dropdown
                        offset={[0, 8]}
                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                        btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                        button={
                           <span>
                              <IconBellBing />
                              <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                 <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                 <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                              </span>
                           </span>
                        }
                     >
                        <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                           <li onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center px-4 py-2 justify-between font-semibold">
                                 <h4 className="text-lg">Notification</h4>
                                 {notifications.length ? <span className="badge bg-primary/80">{notifications.length}New</span> : ''}
                              </div>
                           </li>
                           {notifications.length > 0 ? (
                              <>
                                 {notifications.map((notification, index: number) => {
                                    return (
                                       <li key={index} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
                                          {/* <div className="group flex items-center px-4 py-2">
                                             <div className="grid place-content-center rounded">
                                                <div className="w-12 h-12 relative">
                                                   <img className="w-12 h-12 rounded-full object-cover" alt="profile" src={`/assets/images/${notification.profile}`} />
                                                   <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                                </div>
                                             </div>
                                             <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                <div className="ltr:pr-3 rtl:pl-3">
                                                   <h6
                                                      dangerouslySetInnerHTML={{
                                                         __html: notification.message,
                                                      }}
                                                   ></h6>
                                                   <span className="text-xs block font-normal dark:text-gray-500">{notification.time}</span>
                                                </div>
                                                <button
                                                   type="button"
                                                   className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                   onClick={() => removeNotification(notification.id)}
                                                >
                                                   <IconXCircle />
                                                </button>
                                             </div>
                                          </div> */}
                                       </li>
                                    );
                                 })}
                                 <li>
                                    <div className="p-4">
                                       <button className="btn btn-primary block w-full btn-small">Read All Notifications</button>
                                    </div>
                                 </li>
                              </>
                           ) : (
                              <li onClick={(e) => e.stopPropagation()}>
                                 <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                    <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                       <IconInfoCircle fill={true} className="w-10 h-10" />
                                    </div>
                                    No data available.
                                 </button>
                              </li>
                           )}
                        </ul>
                     </Dropdown>
                  </div>
                  <div className="dropdown shrink-0 flex">
                     <Dropdown
                        offset={[0, 8]}
                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                        btnClassName="relative group block"
                        button={<div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-white">{getNameFirstTwoLetter(user.name || '')}</div>}
                     >
                        <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                           <li>
                              <div className="flex items-center px-4 py-4">
                                 <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-white">{getNameFirstTwoLetter(user.name || '')}</div>
                                 <div className="pl-4 truncate">
                                    <h4 className="text-base">
                                       {user.name}
                                       <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                                    </h4>
                                    <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                       {user.email}
                                    </button>
                                 </div>
                              </div>
                           </li>
                           <li>
                              <Link to="/users/profile" className="dark:hover:text-white">
                                 <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                 Profile
                              </Link>
                           </li>
                           <li>
                              <Link to="/apps/mailbox" className="dark:hover:text-white">
                                 <IconMail className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                 Inbox
                              </Link>
                           </li>
                           <li>
                              <Link to="/auth/boxed-lockscreen" className="dark:hover:text-white">
                                 <IconLockDots className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                 Lock Screen
                              </Link>
                           </li>
                           <li className="border-t border-white-light dark:border-white-light/10">
                              <Link to="/auth/logout" className="text-danger !py-3">
                                 <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                 Sign Out
                              </Link>
                           </li>
                        </ul>
                     </Dropdown>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
