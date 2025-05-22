"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Show a loading toast
    const loadingToast = toast.loading("Ciao! Your pizza chef is leaving...");
    
    // Small delay to show the loading state (in a real app, this would be the actual logout time)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      await signOut({ callbackUrl: "/login", redirect: false });
      toast.dismiss(loadingToast);
      toast.success("You've been logged out");
      router.push("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 bg-white shadow-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all ${scrolled ? 'backdrop-blur-md bg-white/90 dark:bg-gray-800/90' : ''}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="bg-red-500 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm-3 8a1 1 0 110-2 1 1 0 010 2zm3 2a1 1 0 110-2 1 1 0 010 2zm3-5a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Pizza Dashboard</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === "/dashboard"
                    ? "border-red-500 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                Home
              </Link>
              <Link
                href="/dashboard/orders"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === "/dashboard/orders"
                    ? "border-red-500 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                Pizza Orders
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:gap-4">
            <ThemeToggle />
            <div className="relative flex items-center gap-3">
              {session?.user?.image && (
                <div className="relative group">
                  <Image
                    className="h-8 w-8 rounded-full border-2 border-gray-200 dark:border-gray-700"
                    src={session.user.image}
                    alt={`${session.user.name}'s profile`}
                    width={32}
                    height={32}
                  />
                  <div className="hidden group-hover:flex absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {session.user.name}
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200 disabled:bg-red-400 flex items-center"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chef is leaving...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <div className="mr-2">
              <ThemeToggle />
            </div>
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                // X icon when menu is open
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Menu icon when menu is closed
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`sm:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`} 
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          <Link
            href="/dashboard"
            className={`block py-2.5 px-4 rounded-md text-base font-medium transition-colors duration-200 ${
              pathname === "/dashboard"
                ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Home
          </Link>
          <Link
            href="/dashboard/orders"
            className={`block py-2.5 px-4 rounded-md text-base font-medium transition-colors duration-200 ${
              pathname === "/dashboard/orders"
                ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            Pizza Orders
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              {session?.user?.image && (
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                    src={session.user.image}
                    alt={`${session.user.name}'s profile`}
                    width={40}
                    height={40}
                  />
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {session?.user?.name}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {session?.user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center px-4 py-2.5 text-base font-medium text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-md disabled:bg-red-400"
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chef is leaving...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 