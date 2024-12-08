"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Checkbox } from "@/components/ui/checkbox";


// Define schema using Zod
const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data?.success) {
        toast({
          title: "Login Successful!",
          description: "Welcome back! Redirecting to the homepage.",
        });
        window.location.href = "/";
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Login Failed",
          description:
            error.response?.data?.message ||
            "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex">
      {/* Left Section with Logo and Image */}
      <div className="hidden lg:block lg:w-[25%]">
        <div className="relative">
          <img
            className="h-screen w-full object-cover bg-opacity-15 opacity-50"
            src="https://cdn.pixabay.com/photo/2024/06/10/15/05/flower-8820894_640.png"
            alt="Logo Background"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Logo className="lg:text-7xl" icon="size-16" />
           
          </div>
        </div>

      </div>

      {/* Right Section with Registration Form */}
      <div className="w-full h-screen px-5 md:px-0 lg:w-[75%] flex items-center justify-start bg-gradient-to-b from-zinc-100 to-zinc-200 dark:bg-gradient-to-tr dark:from-zinc-900 dark:to-zinc-700">
        <div className=" sm:pl-10  ">
          <h2 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Welcome Back!
          </h2>
          <p className=" text-sm dark:text-gray-200 mb-8">
            Login to continue to IPOSt platform
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 dark:text-white">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between items-center">
                <div >
                  <Checkbox /> Remember me
                </div>
                <div>
                  <Link className="text-indigo-500" href={'/forgot'}>Forgot</Link>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  disabled={loading || form.formState.isSubmitting}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-center text-sm mt-4 text-gray-600 dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Register here
            </Link>
          </p>

          {/* reCAPTCHA Disclaimer */}
          <p className="text-center text-sm mt-2 text-gray-600 dark:text-zinc-400">
            This site is protected by reCAPTCHA and the Google{' '}
            <Link href="https://policies.google.com/privacy" target="_blank" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="https://policies.google.com/terms" target="_blank" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Terms of Service
            </Link>{' '}
            apply.
          </p>
        </div>

      </div>
    </div>
  );
}
