"use client";

import { useState, useEffect } from "react";

interface PizzaLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function PizzaLoader({ 
  message = "Pizza is cooking...", 
  fullScreen = false 
}: PizzaLoaderProps) {
  const [step, setStep] = useState(0);
  const pizzaSteps = [
    "Tossing the dough...",
    "Adding tomato sauce...",
    "Sprinkling the cheese...",
    "Adding toppings...",
    "Baking in the oven...",
    "Pizza is almost ready...",
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % pizzaSteps.length);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50 backdrop-blur-sm">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 relative mb-3 sm:mb-4 pizza-bounce">
            <div className="absolute inset-0 rounded-full bg-yellow-200 dark:bg-yellow-300 animate-pulse"></div>
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '25%', left: '25%' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '35%', left: '55%' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '65%', left: '40%' }}></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '55%', left: '70%' }}></div>
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">{message}</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">{pizzaSteps[step]}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-8">
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 relative mb-2 sm:mb-3 pizza-bounce">
        <div className="absolute inset-0 rounded-full bg-yellow-200 dark:bg-yellow-300 animate-pulse"></div>
        <div className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500 dark:bg-red-600 flex items-center justify-center">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '25%', left: '25%' }}></div>
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '35%', left: '55%' }}></div>
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '65%', left: '40%' }}></div>
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-800 dark:bg-red-900 absolute" style={{ top: '55%', left: '70%' }}></div>
        </div>
      </div>
      <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">{message}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{pizzaSteps[step]}</p>
    </div>
  );
} 