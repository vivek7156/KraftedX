/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const errorCode = err.errors[0]?.code;
      if (errorCode === "form_password_pwned") {
        setError("Your password has been found in a data breach. Please choose a more secure password.");
      } else {
        setError(err.errors[0]?.message || "An unexpected error occurred.");
      }
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111827] text-white">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="KraftedX Logo" 
              width={150} 
              height={40} 
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        <Card className="w-full bg-[#1E293B] border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Join KraftedX to start your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!pendingVerification ? (
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                    className="bg-[#2D3748] border-gray-700 text-white focus:border-[#5A67D8] focus:ring-[#5A67D8]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-[#2D3748] border-gray-700 text-white focus:border-[#5A67D8] focus:ring-[#5A67D8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                {error && (
                  <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-red-200">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div id="clerk-captcha" data-cl-theme="dark" data-cl-size="flexible" data-cl-language="en-US" />
                <Button 
                  type="submit" 
                  className="w-full bg-[#5A67D8] hover:bg-[#4C51BF] text-white font-medium py-2"
                >
                  Sign Up
                </Button>
              </form>
            ) : (
              <form onSubmit={onPressVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-gray-300">Verification Code</Label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                    required
                    className="bg-[#2D3748] border-gray-700 text-white focus:border-[#5A67D8] focus:ring-[#5A67D8]"
                  />
                </div>
                {error && (
                  <Alert variant="destructive" className="bg-red-900/50 border-red-800 text-red-200">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-[#5A67D8] hover:bg-[#4C51BF] text-white font-medium py-2"
                >
                  Verify Email
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-[#5A67D8] hover:text-[#4C51BF] hover:underline"
              >
                Sign in
              </Link>
            </p>
            <p className="text-xs text-gray-500 text-center mt-2">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}