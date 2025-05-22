"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Hello, {session?.user?.name}!
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Welcome to your dashboard
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="prose max-w-none">
          <p>
            This is your personal dashboard. You can navigate to different
            sections using the navigation bar above.
          </p>
          <p className="mt-4">
            Check out the <strong>Pizza Orders</strong> section to view all
            orders.
          </p>
        </div>
      </div>
    </div>
  );
} 