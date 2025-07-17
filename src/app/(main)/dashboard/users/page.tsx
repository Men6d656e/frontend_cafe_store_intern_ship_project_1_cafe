"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/constants/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface UserData {
  username: string;
  email: string;
  _id: string;
  bookingCount: number;
}

// schema for username
const usernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

type UserNameFromValues = z.infer<typeof usernameSchema>;

function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialpogOpen, setIsDialpogOpen] = useState(false);
  const [currentUserToUpdated, setCurrentUserToUpdated] =
    useState<UserData | null>(null);
  // initial fetch request
  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const message = await response.json();
      toast.error(message.message || "Error Refresh the page");
    } else {
      const res = await response.json();
      setUsers(res.userWithBookingCount);
    }
    setLoading(false);
  };
  // first data get
  useEffect(() => {
    fetchUsers();
  }, []);

  // form update username
  const from = useForm<UserNameFromValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  // handle upadate username
  const handleUpdateClick = (user: UserData) => {
    setCurrentUserToUpdated(user);
    from.reset({ username: user.username });
    setIsDialpogOpen(true);
  };

  const onSubmit = async (values: UserNameFromValues) => {
    if (!currentUserToUpdated) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/update`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: currentUserToUpdated._id,
          username: values.username,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update username");
      } else {
        const succesDate = await response.json();
        toast.success(succesDate.message || "Username updated successfully");
        setIsDialpogOpen(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("Netword error: Could not update username");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader className="animate-spin size-10 " />
        </div>
      ) : (
        <div className="flex flex-col shadow-sm border rounded-lg p-5">
          <h1 className="font-bold text-xl mb-5">Users</h1>
          <div className="flex flex-col md:flex-row gap-3 flex-wrap">
            {users &&
              users.length > 0 &&
              users.map((card, idx) => (
                <Card key={idx} className="min-w-[300px]">
                  <CardHeader>
                    <CardTitle>{card.username}</CardTitle>
                    <CardDescription>
                      <span>{card.email}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-wrap text-sm">
                      This user booked visits {card.bookingCount} times.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-end w-full">
                      <Button
                        onClick={() => handleUpdateClick(card)}
                        className="bg-amber-800 hover:bg-amber-700"
                      >
                        Update
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
          {/* Update Username Dialog */}
          <Dialog open={isDialpogOpen} onOpenChange={setIsDialpogOpen}>
            {/* DialogTrigger is handled by the onClick in the CardFooter button */}
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Username</DialogTitle>
                <DialogDescription>
                  Make changes to the user&apos;s username here. Click save when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={from.handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    {...from.register("username")}
                    className="col-span-3"
                    disabled={loading} // Disable input while submitting
                  />
                </div>
                <div>
                  {from.formState.errors.username && (
                    <p className="text-red-500 text-sm text-right col-start-2 col-span-3">
                      {from.formState.errors.username.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialpogOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-amber-950 hover:bg-amber-900"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader className="animate-spin size-4 mr-2" />
                    ) : null}
                    Update Username
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default UsersPage;
