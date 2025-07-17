"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "@/constants/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const loginSchema = z.object({
  email: z.string().max(50, "Email less then 50 characters"),
  password: z
    .string()
    .min(4, "password must be more then 4 characters")
    .max(10, "password must be less then 10 characters"),
  username: z
    .string()
    .min(4, "username must be 4 characters")
    .max(12, "username must be less then 12 characters"),
});

type LoginFormInput = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: LoginFormInput) => {
    // console.log(data);
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const response = await res.json();
        toast.success(response.message);
        router.push("/home");
      } else {
        const response = await res.json();
        toast.error(response.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center w-full h-screen">
      <h1 className="text-2xl font-bold text-amber-950 mb-10">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[300px] flex flex-col space-y-4">
          {/* 1 */}
          <div className="w-full space-y-2">
            <Label htmlFor="username">Enter Unsername:</Label>
            <Input {...register("username")} />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="email">Enter Email:</Label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full space-y-2 ">
            <Label htmlFor="password">Enter Password:</Label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-amber-950 hover:bg-amber-900"
          >
            {isSubmitting ? "Sign in..." : "Sign Up"}
          </Button>
        </div>
      </form>
      <p className="pt-4 text-amber-950 ">
        Already have an account?
        <Link href={"/login"}>
          <Button className="font-bold text-amber-900" variant={"link"}>
            Sign Up
          </Button>
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
