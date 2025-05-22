"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/dashboard");
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full space-y-6 p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl text-center">
        <div className="pizza-bounce inline-block mb-2">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
            <div className="absolute inset-0 rounded-full bg-yellow-200 dark:bg-yellow-300"></div>
            <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-red-500 dark:bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              {/* Pizza pepperoni */}
              <div className="w-3 h-3 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '25%', left: '25%' }}></div>
              <div className="w-3 h-3 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '35%', left: '55%' }}></div>
              <div className="w-3 h-3 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '65%', left: '40%' }}></div>
              <div className="w-3 h-3 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '55%', left: '70%' }}></div>
              
              {/* Missing slice */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-white dark:bg-gray-800" 
                  style={{ 
                    clipPath: 'polygon(50% 50%, 100% 0%, 85% 0%)',
                    transform: 'rotate(45deg)'
                  }}>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
          404
        </h1>
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200">
          Oops! We lost that slice.
        </h2>
        
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          The page you're looking for doesn't exist or was moved to another location.
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Redirecting to Dashboard in <span className="font-bold text-red-600 dark:text-red-400">{countdown}</span> seconds
          </p>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-linear" 
              style={{ width: `${(countdown / 10) * 100}%` }}>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link 
            href="/dashboard" 
            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors"
          >
            Go to Dashboard Now
          </Link>
        </div>
      </div>
    </div>
  );
} 