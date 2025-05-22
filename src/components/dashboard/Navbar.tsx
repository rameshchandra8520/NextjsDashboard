"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-800">
                Dashboard
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/dashboard"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/dashboard/orders"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/dashboard/orders"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pizza Orders
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative flex items-center gap-4">
              {session?.user?.image && (
                <Image
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt={`${session.user.name}'s profile`}
                  width={32}
                  height={32}
                />
              )}
              <span className="text-sm font-medium text-gray-700">
                {session?.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="ml-2 px-3 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/dashboard"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === "/dashboard"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Home
          </Link>
          <Link
            href="/dashboard/orders"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname === "/dashboard/orders"
                ? "border-blue-500 text-blue-700 bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            Pizza Orders
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {session?.user?.image && (
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={session.user.image}
                    alt={`${session.user.name}'s profile`}
                    width={40}
                    height={40}
                  />
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {session?.user?.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {session?.user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="block px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 