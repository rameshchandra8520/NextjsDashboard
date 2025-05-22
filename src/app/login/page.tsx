"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import PizzaLoader from "@/components/ui/PizzaLoader";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Welcome back! 🍕");
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const result = await signIn("google", { 
        callbackUrl: "/dashboard",
        redirect: false
      });
      
      if (result?.error) {
        setAuthError("Authentication failed. Please try again.");
        toast.error("Authentication failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setAuthError("Something went wrong. Please try again.");
      toast.error("Authentication error");
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <PizzaLoader message="Preparing your pizza..." fullScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Pizza icon at the top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-red-500 rounded-full p-4 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm-3 8a1 1 0 110-2 1 1 0 010 2zm3 2a1 1 0 110-2 1 1 0 010 2zm3-5a1 1 0 110-2 1 1 0 010 2zm-1.5 5a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl transform transition-all hover:scale-105">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Pizza Dashboard</h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            Sign in to manage your pizza orders
          </p>
        </div>
        
        {authError && (
          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{authError}</p>
          </div>
        )}
        
        <div className="mt-10">
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Getting your pizza ready...
              </div>
            ) : (
              <>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#FFFFFF" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#FFFFFF" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FFFFFF" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#FFFFFF" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </span>
                Sign in with Google
              </>
            )}
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Secure login powered by Google Authentication</p>
        </div>
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Pizza Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
} 