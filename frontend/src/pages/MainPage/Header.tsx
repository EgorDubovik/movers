import IconBell from '../../components/Icon/IconBell';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import IconSun from '../../components/Icon/IconSun';
import IconMoon from '../../components/Icon/IconMoon';
import IconLaptop from '../../components/Icon/IconLaptop';
import { toggleTheme } from '../../store/themeConfigSlice';
import { Link } from 'react-router-dom';
import IconUser from '../../components/Icon/IconUser';
import IconSettings from '../../components/Icon/IconSettings';
import IconLogout from '../../components/Icon/IconLogout';
import { useEffect, useRef, useState } from 'react';
import IconX from '../../components/Icon/IconX';

const Header = () => {
   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
   const user = useSelector((state: IRootState) => state.themeConfig.user);
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const menuRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenu(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <>
         <nav className="bg-white shadow-sm  dark:bg-black dark:text-[#d0d2d6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between h-16">
                  <div className="flex items-center">
                     <div className="flex-shrink-0 flex items-center">
                        <i className="fas fa-truck text-2xl text-indigo-600 mr-2"></i>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">MoveMate</span>
                     </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-4">
                     {user.id ? (
                        <>
                           <div>
                              {themeConfig.theme === 'light' ? (
                                 <button
                                    className={`${themeConfig.theme === 'light' && 'flex items-center p-2 hover:text-primary'}`}
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
                                    className={`${themeConfig.theme === 'dark' && 'flex items-center p-2  hover:text-primary'}`}
                                    onClick={() => {
                                       dispatch(toggleTheme('system'));
                                    }}
                                 >
                                    <IconMoon />
                                 </button>
                              )}
                              {themeConfig.theme === 'system' && (
                                 <button
                                    className={`${themeConfig.theme === 'system' && 'flex items-center p-2  hover:text-primary'}`}
                                    onClick={() => {
                                       dispatch(toggleTheme('light'));
                                    }}
                                 >
                                    <IconLaptop />
                                 </button>
                              )}
                           </div>
                           <button className="p-1  hover:text-primary focus:outline-none">
                              <IconBell className="w-5 h-5" />
                           </button>

                           <div className="ml-3 relative" ref={menuRef}>
                              <div className="hover:bg-gray-100 hover:dark:bg-gray-800 p-2 px-4 rounded cursor-pointer" onClick={() => setShowMenu((prev) => !prev)}>
                                 <span className="text-sm font-medium text-gray-700 dark:text-[#d0d2d6]">{user.name}</span>
                              </div>
                              {showMenu && (
                                 <div className="absolute z-52 top-10 right-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                                    <div className="py-2">
                                       <Link to={'/panel'} className="flex items-center justify-start gap-4 p-2 px-4 hover:text-primary hover:bg-gray-100 hover:dark:bg-gray-900">
                                          <IconLaptop className="w-5 h-5" />
                                          Panel
                                       </Link>
                                       <Link to={'/panel'} className="flex items-center justify-start gap-4 p-2 px-4 hover:text-primary hover:bg-gray-100 hover:dark:bg-gray-900">
                                          <IconSettings className="w-5 h-5" />
                                          Settings
                                       </Link>
                                       <Link to={'/auth/logout'} className="flex items-center justify-start gap-4 p-2 px-4 hover:text-primary hover:bg-gray-100 hover:dark:bg-gray-900">
                                          <IconLogout className="w-5 h-5" />
                                          Logout
                                       </Link>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </>
                     ) : (
                        <Link to={'/auth/signin'} className="ml-3 relative">
                           <div className="hover:bg-gray-100 hover:dark:bg-gray-800 p-2 px-4 rounded cursor-pointer">
                              <span className="text-sm font-medium text-gray-700 dark:text-[#d0d2d6]">Sign In</span>
                           </div>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default Header;
