import IconBell from '../../components/Icon/IconBell';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import IconSun from '../../components/Icon/IconSun';
import IconMoon from '../../components/Icon/IconMoon';
import IconLaptop from '../../components/Icon/IconLaptop';
import { toggleTheme } from '../../store/themeConfigSlice';

const Header = () => {
   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
   const dispatch = useDispatch();
   return (
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
                  <div className="ml-3 relative">
                     <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-[#d0d2d6]">John Smith</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Header;
