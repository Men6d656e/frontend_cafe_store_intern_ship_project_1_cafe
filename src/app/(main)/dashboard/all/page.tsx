"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/constants/api";
import { ClipboardList, LayoutList, Loader, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Data {
  bookings: number;
  users: number;
  pendingBokings: number;
}

function page() {
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState<Data | null>(null);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/admin/all`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const message = await response.json();
      toast.error(message.message || "Server Error");
      setLoading(false);
    } else if (response.ok) {
      const data = await response.json();
      setdata(data.data);
      setLoading(false);
    } else {
      const mesg = await response.json();
      toast.error(mesg.message || "server Error");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-10 h-10"></Loader>
        </div>
      ) : (
        <div className="w-full flex">
          {data && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>CAFEFFECT DASHBOARD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" flex flex-col sm:flex-row gap-3 flex-wrap">
                  {/* usercard */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col text-center gap-5 min-w-[200px] ">
                        <span className="text-3xl font-bold text-amber-950">
                          {data.users}
                        </span>
                        <div className="flex justify-center items-center gap-2 text-sm">
                          <Users size={20} />
                          <p>Total Users </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Bookings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col text-center gap-5 min-w-[200px]">
                        <span className="text-3xl font-bold text-amber-950">
                          {data.bookings}
                        </span>
                        <div className="flex justify-center items-center gap-2 text-sm">
                          <ClipboardList size={20} />
                          <p>Total Bookings</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* pending Bookings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col text-center gap-5 min-w-[200px]">
                        <span className="text-3xl font-bold text-amber-950">
                          {data.pendingBokings}
                        </span>

                        <div className="flex justify-center items-center gap-2 text-sm">
                          <LayoutList size={20} />
                          <p>Pending Bookings</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
}

export default page;
