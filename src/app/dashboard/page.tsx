"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Code, 
  Award, 
  Zap, 
  ChevronRight
} from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";
import Navbar from "@/components/Navbar";

interface CourseCardProps {
  title: string;
  description: string;
  progress: number;
  image: string;
  href: string;
}

const CourseCard = ({ title, description, progress, image, href }: CourseCardProps) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-[#5A67D8] transition-all"
  >
    <Link href={href}>
      <div className="relative h-56 w-full">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#5A67D8] text-white text-xs px-2 py-1 rounded-md">
          {progress}% Complete
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-[#5A67D8] h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-400 text-xs">Continue Learning</span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </Link>
  </motion.div>
);

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const AchievementCard = ({ title, description, icon: Icon }: AchievementCardProps) => (
  <motion.div 
    whileHover={{ scale: 1.03 }}
    className="bg-[#1E293B] p-5 rounded-xl flex items-start gap-4 border border-gray-800"
  >
    <div className="bg-[#2D3748] p-3 rounded-lg">
      <Icon className="h-6 w-6 text-[#5A67D8]" />
    </div>
    <div>
      <h3 className="text-white font-bold">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
}

const StatsCard = ({ title, value, icon: Icon, bgColor }: StatsCardProps) => (
  <div className="bg-[#1E293B] p-6 rounded-xl border border-gray-800">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-white text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#111827] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <InteractiveBackground />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <section className="mb-20">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Welcome back, Developer!</h1>
              <div>
                <Link 
                  href="/courses" 
                  className="inline-flex items-center bg-[#5A67D8] hover:bg-[#4C51BF] text-white px-5 py-2 rounded-lg transition-colors"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Explore Courses
                </Link>
              </div>
            </div>
            <p className="text-gray-400 mt-2">
              Continue your learning journey where you left off.
            </p>
          </section>

          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard 
                title="Courses Completed" 
                value="3" 
                icon={BookOpen} 
                bgColor="bg-gradient-to-tr from-blue-600 to-indigo-600"
              />
              <StatsCard 
                title="Coding Exercises" 
                value="47" 
                icon={Code} 
                bgColor="bg-gradient-to-tr from-purple-600 to-pink-600"
              />
              <StatsCard 
                title="Certificates Earned" 
                value="2" 
                icon={Award} 
                bgColor="bg-gradient-to-tr from-amber-500 to-orange-600"
              />
            </div>
          </section>

          <section className="mb-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Continue Learning</h2>
              <Link 
                href="/courses" 
                className="text-[#5A67D8] hover:text-[#4C51BF] flex items-center"
              >
                View all courses
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CourseCard 
                title="Full-Stack Web Development" 
                description="Learn modern full-stack development with React, Node.js, and MongoDB."
                progress={75}
                image="/webdev.png
                "
                href="/courses/full-stack-web-development"
              />
              <CourseCard 
                title="Machine Learning Fundamentals" 
                description="Master the basics of machine learning algorithms and implementation."
                progress={45}
                image="/ml.png"
                href="/courses/machine-learning-fundamentals"
              />
              <CourseCard 
                title="Cloud Computing with AWS" 
                description="Deploy and scale applications using Amazon Web Services."
                progress={30}
                image="/aws.png"
                href="/courses/cloud-computing-aws"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Latest Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AchievementCard 
                title="Coding Streak: 7 Days" 
                description="You've completed coding exercises for 7 consecutive days!"
                icon={Zap}
              />
              <AchievementCard 
                title="First Project Completed" 
                description="You've successfully deployed your first full-stack application."
                icon={Award}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}