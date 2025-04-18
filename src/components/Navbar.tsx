import { useClerk } from "@clerk/nextjs";
import { Bell, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <header className="border-b border-gray-800 bg-[#111827]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <Image
              src="/logo.png"
              alt="KraftedX Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/notifications" className="relative">
              <Bell className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link href="/messages">
              <MessageSquare className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
