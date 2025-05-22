"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pizzaOrders } from "@/data/orders";
import PizzaLoader from "@/components/ui/PizzaLoader";

export default function DashboardHome() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      // Simulate API loading
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [status, router]);

  // Calculate dashboard stats
  const totalOrders = pizzaOrders.length;
  const deliveredOrders = pizzaOrders.filter(order => order.status === "Delivered").length;
  const pendingOrders = pizzaOrders.filter(order => order.status === "Pending").length;
  const preparingOrders = pizzaOrders.filter(order => order.status === "Preparing").length;
  const outForDeliveryOrders = pizzaOrders.filter(order => order.status === "Out for Delivery").length;

  if (status === "loading" || isLoading) {
    return <PizzaLoader message="Loading your dashboard..." />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome section */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hello, {session?.user?.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome to your Pizza Dashboard. Here's an overview of your pizza orders.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Orders Card */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Orders</dt>
                  <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{totalOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3">
            <div className="text-sm">
              <a href="/dashboard/orders" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">View all orders</a>
            </div>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Delivered</dt>
                  <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{deliveredOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3">
            <div className="text-sm">
              <a href="/dashboard/orders" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">View delivered orders</a>
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending</dt>
                  <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{pendingOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3">
            <div className="text-sm">
              <a href="/dashboard/orders" className="font-medium text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300">View pending orders</a>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">In Progress</dt>
                  <dd className="text-3xl font-semibold text-gray-900 dark:text-white">{preparingOrders + outForDeliveryOrders}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3">
            <div className="text-sm">
              <a href="/dashboard/orders" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">View in progress orders</a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick info section */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Info</h2>
          <div className="mt-4 text-gray-600 dark:text-gray-300">
            <p className="mb-2">
              Welcome to your Pizza Dashboard! Here you can track and manage all pizza orders.
            </p>
            <p className="mb-2">
              Use the <strong>Pizza Orders</strong> tab to view all orders, sort them by different criteria, and filter them by status.
            </p>
            <p>
              Stay on top of your pizza business with our intuitive dashboard. Happy pizza making!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 