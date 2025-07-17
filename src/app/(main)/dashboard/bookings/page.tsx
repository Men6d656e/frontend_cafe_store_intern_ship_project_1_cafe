"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Data {
  _id: string;
  userId: string;
  bookingDate: string;
  bookingTime: string;
  numberOfPeoples: number;
  status: "rejected" | "pending" | "accepted";
}

function BookingPage() {
  const [data, setdata] = useState<Data[] | null>(null);
  const [pendingBookings, setPendingBookings] = useState<Data[]>([]);
  const [rejectedBookings, setRejectedBookings] = useState<Data[]>([]);
  const [acceptedBookings, setAcceptedBookings] = useState<Data[]>([]);
  // function to fetch bookings
  const fetchBookings = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/bookings`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const message = await response.json();
      toast.error(message.message || "Server Error");
    } else if (response.ok) {
      const data = await response.json();
      setdata(data.bookings);
    } else {
      const mesg = await response.json();
      toast.error(mesg.message || "server Error");
    }
  };
  // initial fetch
  useEffect(() => {
    fetchBookings();
  }, []);
  // filter the data after fetchfrom backend
  useEffect(() => {
    if (data) {
      const pending = data.filter((item) => item.status === "pending");
      const accpted = data.filter((item) => item.status === "accepted");
      const rejected = data.filter((item) => item.status === "rejected");
      setPendingBookings(pending);
      setAcceptedBookings(accpted);
      setRejectedBookings(rejected);
    }
  }, [data]);

  // update function
  async function updateBookingStatus(bookingId: string, status: string) {
    console.log(bookingId, status);
    const response = await fetch(`${API_BASE_URL}/api/admin/updateStatus`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ bookingId, status }),
    });
    if (response.ok) {
      const res = await response.json();
      toast.success(res.mesg || "success");
      fetchBookings();
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "somthing is wrong try again latter");
    }
  }

  // delete Booking
  const deleteBooking = async (bookingId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/deleteBooking`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bookingId }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success(data.message || "delete successfully");
      fetchBookings();
    } else {
      const data = await response.json();
      toast.error(data.message || "something went wrong try again");
    }
  };

  console.log(pendingBookings, rejectedBookings, acceptedBookings);
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4">
            {/* pendng card */}
            <Card
              className={"w-full sm:w-full md:w-full lg:w-1/2 bg-blue-100/10"}
            >
              <CardHeader>
                <CardTitle>Pending Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingBookings && pendingBookings.length > 0 && (
                  <div className="h-[400px]  overflow-y-scroll w-full p-5 space-y-3 border rounded-sm">
                    {/* pending bookings  */}
                    {pendingBookings.map((card, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle>
                            Peoples: <span>{card.numberOfPeoples}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between flex-col md:flex-col lg:flex-row gap-2 ">
                            <div className="space-y-2">
                              <p>
                                <span className="font-bold">Date: </span>
                                {new Date(card.bookingDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                  }
                                )}
                              </p>
                              <p>
                                <span className="font-bold">Time: </span>
                                {card.bookingTime}
                              </p>
                            </div>
                            <div className="flex justify-between flex-col xl:flex-row items-center gap-2">
                              <Button
                                className=" cursor-pointer w-full lg:w-auto bg-green-500 hover:bg-green-800"
                                onClick={() =>
                                  updateBookingStatus(card._id, "accepted")
                                }
                              >
                                Accepted
                              </Button>
                              <Button
                                className=" cursor-pointer w-full lg:w-auto bg-red-500 hover:bg-red-800"
                                onClick={() =>
                                  updateBookingStatus(card._id, "rejected")
                                }
                              >
                                Rejected
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <p className="text-xs">This one is pending</p>
                          <span className="text-white rounded-sm px-2 py-1 bg-amber-500 text-xs ml-2 ">
                            pending
                          </span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Booked rejected card */}
            <Card
              className={"w-full sm:w-full md:w-full lg:w-1/2 bg-blue-100/10"}
            >
              <CardHeader>
                <CardTitle>Your Regected Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {rejectedBookings && rejectedBookings.length > 0 && (
                  <div className="h-[400px] overflow-y-scroll w-full space-y-3 border p-5 rounded-sm">
                    {/*  */}
                    {rejectedBookings.map((card, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle>Peoples: {card.numberOfPeoples}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between flex-col md:flex-col lg:flex-row gap-2 ">
                            <div className="space-y-2">
                              <p>
                                <span className="font-bold">Date: </span>
                                {new Date(card.bookingDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                  }
                                )}
                              </p>
                              <p>
                                <span className="font-bold">Time: </span>
                                {card.bookingTime}
                              </p>
                            </div>
                            <div className="flex justify-between flex-col md:flex-row items-center gap-2">
                              <Button
                                onClick={() => deleteBooking(card._id)}
                                className="w-full lg:w-auto bg-red-500 hover:bg-red-900 cursor-pointer"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <p className="text-red-500 text-xs">
                            you reject this booking
                          </p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {acceptedBookings && acceptedBookings.length > 0 && (
            <div className="w-full mt-5 ">
              <Card className="bg-blue-100/10">
                <CardHeader>
                  <CardTitle>Your Accepted bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {acceptedBookings.map((card, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle>
                            Peoples: <span>{card.numberOfPeoples}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between flex-col sm:flex-col md:flex-row space-y-5">
                            <div className="space-y-2">
                              <p>
                                <span className="font-bold">Date: </span>
                                {new Date(card.bookingDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                  }
                                )}
                              </p>
                              <p>
                                <span className="font-bold">Time: </span>
                                {card.bookingTime}
                              </p>
                            </div>
                            <div className="flex justify-between flex-col md:flex-row items-center gap-2">
                              <Button
                                onClick={() => deleteBooking(card._id)}
                                className="w-full md:w-auto bg-red-500 hover:bg-red-900 cursor-pointer"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <p className="text-green-500 text-xs">
                            you accept this booking
                          </p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingPage;
