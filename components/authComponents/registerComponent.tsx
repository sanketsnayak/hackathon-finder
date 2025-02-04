"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/registerSchema"; // Assuming this is defined
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import AlertComponent from "./alertComponent";


const RegisterComponent = () => {
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const response = await axios.post("/api/register", values);
      
      if (response.status === 200) {
        <AlertComponent title="Registration something went wrong" description="Account might already exist." />
        router.push("/signIn");
      } else {
        <AlertComponent title="Registration something went wrong" description="Account might already exist." />
        setRegistrationError("Account might already exists.");
      }
    } catch (error) {
      console.error("Error while registering user", error);
      setRegistrationError("An error occurred during registration.");
    }
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center px-4 bg-neutral-950  ">
      <div className="font-poppins w-full max-w-sm space-y-6  bg-neutral-900 p-8  shadow-black shadow-2xl rounded border-t-2 border-neutral-700 border mt-4 mb-4 h-full max-h-max">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r p-1 from-purple-400 via-purple-600 to-purple-800 bg-clip-text text-transparent  text-center">SignUp</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className=" border shadow-neutral-800 shadow-sm border-neutral-800 bg-neutral-950 pl-10 text-neutral-200"
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className=" border shadow-neutral-800 shadow-sm border-neutral-800 bg-neutral-950 pl-10 text-neutral-100 "
                    />
                    </div>
                  </FormControl>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className=" border shadow-neutral-800 shadow-sm border-neutral-800 bg-neutral-950 pl-10 text-neutral-100 "
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className=" bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 hover:scale-105 transition-all duration-700 ease-in-out text-neutral-200 font-bold shadow-neutral-900 border-none outline-none w-full"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        
        {registrationError && (
          <div className="text-center text-red-500 mt-4">
            {registrationError}
          </div>
        )}

        <div className="text-center text-gray-500 ">or</div>
        
        <Button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          variant="outline"
          className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 hover:scale-105 transition-all duration-700 ease-in-out text-neutral-200 hover:text-neutral-200 font-bold shadow-neutral-900 border-none outline-none"
        >
          Sign Up with GitHub
        </Button>

        <div className="text-center ">
          <Button
            variant="link"
            onClick={() => router.push("/signIn")}
            className="bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent"
          >
            Already have an account? Log in here.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
