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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign Up</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="mt-1"
                    />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="mt-1"
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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

        <div className="text-center text-gray-500 my-4">or</div>
        
        <Button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          variant="outline"
          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Sign Up with GitHub
        </Button>

        <div className="text-center mt-4">
          <Button
            variant="link"
            onClick={() => router.push("/signIn")}
            className="text-blue-600 hover:text-blue-800"
          >
            Already have an account? Log in here.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
