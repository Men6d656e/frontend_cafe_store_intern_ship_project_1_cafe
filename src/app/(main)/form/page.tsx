import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import BookingForm from "./_components/BookingForm";
function FormPage() {
  return (
    <div className="m-10 mx-auto w-full sm:w-1/2 md:w1/2 ">
      <Card className="p-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-amber-950">
            Book your visit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BookingForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default FormPage;
