"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import axios from "axios"
import Logo from "@/components/Logo"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[\W_]/, { message: "Password must contain at least one special character." });

// Define schema using Zod
const FormSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: passwordSchema,
  cpassword: z.string()
    .min(8, { message: "Confirm Password must be at least 8 characters long." }),
}).refine((data) => data.password === data.cpassword, {
  message: "Passwords do not match.",
  path: ["cpassword"],
})

export default function RegisterPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  })

  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true)
    try {
      const response = await axios.post("/api/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })

      if (response.data?.success) {
        toast({
          title: "Registration Successful!",
          description: "You can now log in with your credentials.",
        })
        router.push("/login")
      } else {
        toast({
          title: "Registration Failed",
          description: response.data?.message || "Something went wrong. Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Registration Failed",
          description: error.response?.data?.message || "Something went wrong. Please try again later.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Registration Failed",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

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
      <div className="w-full lg:w-[75%] flex items-center justify-start">
        <div className=" sm:pl-10  ">
          <h2 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Register to Ipost</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-zinc-300">Username</FormLabel>
                    <FormControl>
                      <Input className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-700 dark:text-white" placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-zinc-300">Email Address</FormLabel>
                    <FormControl>
                      <Input className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-700 dark:text-white" placeholder="Enter your email" {...field} />
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
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-zinc-300">Password</FormLabel>
                    <FormControl>
                      <Input className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-700 dark:text-white" type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="cpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-zinc-300">Confirm Password</FormLabel>
                    <FormControl>
                      <Input className="w-full p-3 border border-gray-300 dark:border-zinc-600 rounded-md focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-700 dark:text-white" type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.cpassword?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox id="agreeToTerms" />
                <label htmlFor="agreeToTerms" className="text-sm cursor-pointer text-gray-600 dark:text-zinc-300">
                  I agree with Ipost&apos;s{' '}
                  <Link href="/policies/terms-of-service" className="underline text-indigo-600 dark:text-indigo-400">
                    Terms of Service
                  </Link>
                  ,{' '}
                  <Link href="/policies/privacy-policy" className="underline text-indigo-600 dark:text-indigo-400">
                    Privacy Policy
                  </Link>
                  , and default{' '}
                  <Link href="/policies/notification-settings" className="underline text-indigo-600 dark:text-indigo-400">
                    Notification Settings
                  </Link>.
                </label>
              </div>
              {/* Submit Button */}
              <div className="mt-4">
                <Button type="submit" disabled={loading} className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800">
                  {loading ? "Submitting..." : "Create Account"}
                </Button>
              </div>
            </form>
          </Form>

          {/* Sign In Link */}
          <p className="text-center text-sm mt-4 text-gray-600 dark:text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Login
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

  )
}









