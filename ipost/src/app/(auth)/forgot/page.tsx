'use client'
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

// Define schema using Zod
const FormSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address." }),
});


export default function Forgot() {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: ""
        },
    });
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/users/forgot", data, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data?.success) {
                toast({
                    title: "Password Reset Email Sent",
                    description: "If an account with that email exists, you will receive a password reset email shortly.",
                });
                // Optionally, redirect after successful submission, if desired
                // window.location.href = "/";
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast({
                    title: "Password Reset Failed",
                    description:
                        error.response?.data?.message ||
                        "An error occurred while sending the reset email. Please try again.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Password Reset Failed",
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
                        Forgot Password
                    </h2>
                    <p className=" text-sm dark:text-gray-200 mb-8">
                        Enter your email address to reset your password.
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
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                  className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                                    disabled={loading || form.formState.isSubmitting}
                                >
                                    {loading ? "Reseting..." : "Reset Password"}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <p className="text-center text-sm mt-4 text-gray-600 dark:text-zinc-400">
                        Remembered your password?{" "}
                        <Link href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
                            Go back to login
                        </Link>
                    </p>


                </div>

            </div>
        </div>
    );
}


