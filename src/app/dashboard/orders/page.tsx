"use client";

import { useState, useEffect } from "react";
import { pizzaOrders, PizzaOrder, OrderStatus } from "@/data/orders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PizzaLoader from "@/components/ui/PizzaLoader";

export default function Orders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<PizzaOrder[]>(pizzaOrders);
  const [sortField, setSortField] = useState<keyof PizzaOrder | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "All">("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      // Simulate API loading for demo purposes
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [status, router]);

  // Sorting function
  const handleSort = (field: keyof PizzaOrder) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter by status
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as OrderStatus | "All");
  };

  // Apply sorting and filtering
  const displayedOrders = [...orders]
    .filter((order) => {
      if (filterStatus === "All") return true;
      return order.status === filterStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      if (sortField === "quantity" || sortField === "orderDate") {
        if (sortField === "quantity") {
          return sortDirection === "asc" 
            ? a[sortField] - b[sortField] 
            : b[sortField] - a[sortField];
        } else {
          // For dates
          return sortDirection === "asc" 
            ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime() 
            : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
        }
      } else {
        // For string fields
        const valueA = a[sortField].toString().toLowerCase();
        const valueB = b[sortField].toString().toLowerCase();
        return sortDirection === "asc" 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
    });

  if (status === "loading" || isLoading) {
    return <PizzaLoader message="Loading pizza orders..." />;
  }

  // Helper function to get status badge color
  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 ring-yellow-500/30";
      case "Preparing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 ring-blue-500/30";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 ring-purple-500/30";
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 ring-green-500/30";
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 ring-red-500/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 ring-gray-500/30";
    }
  };

  // Get total count of orders by status
  const getStatusCount = (status: OrderStatus | "All") => {
    if (status === "All") return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg animate-fadeIn">
      <div className="px-4 py-5 sm:px-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pizza Orders</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            View and manage all pizza orders
          </p>
        </div>
        
        {/* Status summary */}
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          <span className={`px-2.5 py-1 text-xs rounded-full inline-flex items-center ${filterStatus === "All" ? 'bg-gray-100 dark:bg-gray-700 ring-1 ring-gray-500/30 dark:ring-gray-400/30 dark:text-gray-200' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'} cursor-pointer transition-all`} onClick={() => setFilterStatus("All")}>
            All ({getStatusCount("All")})
          </span>
          <span className={`px-2.5 py-1 text-xs rounded-full inline-flex items-center ${filterStatus === "Pending" ? 'ring-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 ring-yellow-500/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'} cursor-pointer transition-all`} onClick={() => setFilterStatus("Pending")}>
            Pending ({getStatusCount("Pending")})
          </span>
          <span className={`px-2.5 py-1 text-xs rounded-full inline-flex items-center ${filterStatus === "Preparing" ? 'ring-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 ring-blue-500/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'} cursor-pointer transition-all`} onClick={() => setFilterStatus("Preparing")}>
            Preparing ({getStatusCount("Preparing")})
          </span>
          <span className={`px-2.5 py-1 text-xs rounded-full inline-flex items-center ${filterStatus === "Out for Delivery" ? 'ring-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 ring-purple-500/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'} cursor-pointer transition-all`} onClick={() => setFilterStatus("Out for Delivery")}>
            Out for Delivery ({getStatusCount("Out for Delivery")})
          </span>
          <span className={`px-2.5 py-1 text-xs rounded-full inline-flex items-center ${filterStatus === "Delivered" ? 'ring-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 ring-green-500/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'} cursor-pointer transition-all`} onClick={() => setFilterStatus("Delivered")}>
            Delivered ({getStatusCount("Delivered")})
          </span>
          <span className={`px-2.5 py-1 text-xs rounded-full inline-flex items-center ${filterStatus === "Cancelled" ? 'ring-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 ring-red-500/30' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200'} cursor-pointer transition-all`} onClick={() => setFilterStatus("Cancelled")}>
            Cancelled ({getStatusCount("Cancelled")})
          </span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Order ID</span>
                    {sortField === "id" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden sm:table-cell"
                  onClick={() => handleSort("customerName")}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Customer</span>
                    {sortField === "customerName" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort("pizzaType")}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Pizza</span>
                    {sortField === "pizzaType" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:table-cell"
                  onClick={() => handleSort("quantity")}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Qty</span>
                    {sortField === "quantity" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:table-cell"
                  onClick={() => handleSort("orderDate")}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Date</span>
                    {sortField === "orderDate" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Status</span>
                    {sortField === "status" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {displayedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
                    No orders found with the selected filter
                  </td>
                </tr>
              ) : (
                displayedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden sm:table-cell">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {order.pizzaType}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden md:table-cell">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden md:table-cell">
                      {order.orderDate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs leading-5 font-medium rounded-full ring-1 ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 