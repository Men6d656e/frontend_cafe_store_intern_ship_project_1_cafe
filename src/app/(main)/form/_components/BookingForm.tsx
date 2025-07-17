"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "@/constants/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const BookingFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z
    .string()
    .min(1, "Time is required")
    .regex(/^(1[0-2]|0?[1-9])(am|pm)$/i, {
      message: "Invalid time format (e.g., 7pm, 10am).",
    }),
  memberCount: z.coerce
    .number()
    .min(1, "Minimum 1 Member is required")
    .max(20, "Maximum 20 members allowed.")
    .int("Member count must be a whole number."),
});

type BookingFormValues = z.infer<typeof BookingFormSchema>;

function BookingForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(BookingFormSchema) as any,
    defaultValues: {
      date: "",
      time: "",
      memberCount: 1,
    },
  });

  // submit form
  const onSubmit = async (data: BookingFormValues) => {
    console.log("Form data: ", data);
    const response = await fetch(`${API_BASE_URL}/booking/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!response.ok) {
      const res = await response.json();
      toast.error(res.message);
    } else {
      const res = await response.json();
      toast.success(res.message);
      router.push("/inbox");
      reset();
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-5">
        {/* 1 inp */}
        <div className="space-y-3">
          <Label htmlFor="date">Date</Label>{" "}
          <Input {...register("date")} type="date" id="date" />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>
        {/* 2 inp */}
        <div className="space-y-3">
          <Label htmlFor="time">Time</Label>
          <Input {...register("time")} placeholder="E.g. 7 pm" id="time" />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>
        {/* 3 inp */}
        <div className="space-y-3">
          <Label htmlFor="memberCount">Members Count</Label>
          <Input
            {...register("memberCount", { valueAsNumber: true })}
            type="number"
            placeholder="E.g. 5"
            id="memberCount"
          />
          {errors.memberCount && (
            <p className="text-red-500 text-sm">{errors.memberCount.message}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className=" bg-amber-950 w-full mt-6"
      >
        {isSubmitting ? "Booking..." : "Book"}
      </Button>
    </form>
  );
}

export default BookingForm;
