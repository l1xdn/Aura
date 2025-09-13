"use client";

import Link from "next/link";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <header className="border-b border-gray-800">
      <div className="flex justify-between items-center h-16 px-4">
        <Link href="/">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 bg-clip-text text-transparent cursor-pointer">
            Aura
          </h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isLoaded && (
            <>
              {isSignedIn ? (
                <>
                  <Link 
                    href="/admin" 
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                // Only show sign-in button on admin page
                isAdminPage && (
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                )
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}