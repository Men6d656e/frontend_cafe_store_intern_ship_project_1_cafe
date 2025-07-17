"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import { Frown, Loader} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Booking {
  bookingDate: string;
  bookingTime: string;
  status: "pending" | "accepted" | "rejected";
  _id: string;
}

function UserInbox() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setmessage] = useState(null);
  const fetchBookings = async () => {
    setLoading(true);
    const response = await fetch(
      `${API_BASE_URL}/booking/userBookings`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      const message = await response.json();
      toast.error(message.message || "Server Error try again");
      setLoading(false);
    } else if (response.ok) {
      const message = await response.json();
      if (message.message === "you don't have nay booking") {
        setmessage(message.message);
        setBookings([]);
        setLoading(false);
      } else {
        console.log(message);
        setBookings(message.bookings);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  console.log(bookings);
  return (
    <>
      {loading ? (
        <div className="flex h-screen w-full justify-center items-center">
          <Loader className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <>
          <div className=" my-5 mx-5 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto sm:px-5 md:px-5 lg:px-5 xl:px-5 px-0">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" space-y-5">
                  {bookings && bookings.length > 0 && (
                    <>
                      {bookings?.map((book, index) => {
                        return (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle>Booked Visit</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between flex-col sm:flex-col md:flex-row space-y-5">
                                <div className="space-y-2">
                                  <p>
                                    <span className="font-bold">Date: </span>
                                    {new Date(
                                      book.bookingDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "2-digit",
                                    })}
                                  </p>
                                  <p>
                                    <span className="font-bold">Time: </span>
                                    {book.bookingTime}
                                  </p>
                                </div>
                                <div>
                                  <span
                                    className={`${
                                      book.status === "pending"
                                        ? "bg-yellow-500 text-yellow-950"
                                        : book.status === "accepted"
                                        ? "bg-green-500 text-green-950"
                                        : "bg-red-500 text-red-950"
                                    } px-5 py-2 rounded-sm`}
                                  >
                                    {book.status}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </>
                  )}
                  {message && (
                    <div className="flex justify-center items-center  ">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Frown />
                        <span>{message}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default UserInbox;
