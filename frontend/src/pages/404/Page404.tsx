import './style.css';
export default function NotFound() {
   return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4 overflow-hidden">
         <div id="particles"></div>
         <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
               <div className="flex flex-col items-center">
                  {/* 404 Text with animation */}
                  <h1 className="text-8xl md:text-9xl font-bold mb-4 gradient-text relative">
                     <span className="inline-block">4</span>
                     <span className="inline-block ">0</span>
                     <span className="inline-block">4</span>
                  </h1>

                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Houston, We Have a Problem!</h2>

                  <p className="text-gray-300 max-w-lg mx-auto mb-8">
                     The page you're looking for seems to have drifted off into the cosmic void. Maybe it got sucked into a black hole or hitched a ride with a passing comet.
                  </p>

                  {/* Interactive button */}
                  <a
                     href="/"
                     id="returnBtn"
                     className="relative overflow-hidden group px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                     <span className="relative z-10 flex items-center">
                        <i className="fas fa-rocket mr-2"></i>
                        Return to Home
                     </span>
                     <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                  </a>
               </div>
            </div>

            {/* Floating space objects */}
            <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-yellow-300 opacity-60 blur-sm animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/4 right-20 w-6 h-6 rounded-full bg-blue-300 opacity-40 blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-5 h-5 rounded-full bg-purple-300 opacity-50 blur-sm animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-1/3 right-10 w-10 h-10 rounded-full bg-pink-300 opacity-30 blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
         </div>
      </div>
   );
}
