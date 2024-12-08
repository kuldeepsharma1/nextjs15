'use client'
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const passwordSchema = z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." });

const FormSchema = z.object({
    password: passwordSchema,
    cpassword: z.string()
        .min(8, { message: "Confirm Password must be at least 8 characters long." }),
}).refine((data) => data.password === data.cpassword, {
    message: "Passwords do not match.",
    path: ["cpassword"],
});

export default function Reset() {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            cpassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (!token) {
            toast({
                title: "Invalid Token",
                description: "Token not found. Please check the reset link.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/users/reset', { token, data }, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data?.success) {
                toast({
                    title: "Password Reset Successful",
                    description: "Your password has been reset successfully. You can now log in with your new password.",
                });
                window.location.href = "/login"; // Redirect to login page
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast({
                    title: "Password Reset Failed",
                    description:
                        error.response?.data?.message ||
                        "There was an issue resetting your password. Please try again.",
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

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get('token');
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

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
                <div className=" sm:pl-10">
                    <h2 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                        Reset Password
                    </h2>
                    <p className=" text-sm dark:text-gray-200 mb-8">
                        Enter and confirm your new password.
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 dark:text-white">

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
