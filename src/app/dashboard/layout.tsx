"use client";

import Navbar from "@/components/dashboard/Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-16 min-h-[calc(100vh-116px)]">
        {children}
      </div>
      <footer className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
            © {new Date().getFullYear()} Pizza Dashboard. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
} 