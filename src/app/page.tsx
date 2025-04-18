"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative h-screen overflow-hidden bg-[#111827] text-white">
      <div className="absolute inset-0 z-0">
        <InteractiveBackground />
      </div>

      <div className="relative z-10 h-full">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="KraftedX Logo" 
              width={150} 
              height={40} 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
              Courses
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
              Blog
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link 
              href="/sign-up" 
              className="bg-[#5A67D8] hover:bg-[#4C51BF] text-white rounded-lg px-4 py-2 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>


        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-5rem)] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Modern Development Skills with <span className="text-[#5A67D8]">KraftedX</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Interactive courses designed by industry experts to help you build real-world projects and accelerate your career.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sign-up" 
                className="bg-[#5A67D8] hover:bg-[#4C51BF] text-white rounded-lg px-8 py-3 text-lg font-medium transition-colors"
              >
                Start Learning for Free
              </Link>
              <Link 
                href="/courses" 
                className="border border-gray-600 hover:border-gray-400 text-white rounded-lg px-8 py-3 text-lg font-medium transition-colors"
              >
                Browse Courses
              </Link>
            </div>
            
            <div className="mt-12 flex flex-col items-center">
              <p className="text-gray-400 mb-4">Trusted by developers from</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-70 items-center">
                <Image src="/google.png" alt="Google" width={120} height={40} className="h-8 w-auto" />
                <Image src="/microsoft.png" alt="Microsoft" width={120} height={40} className="h-16 w-auto" />
                <Image src="/amazon.png" alt="Amazon" width={120} height={40} className="h-8 w-auto" />
                <Image src="/meta.png" alt="Meta" width={100} height={40} className="h-10 w-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}