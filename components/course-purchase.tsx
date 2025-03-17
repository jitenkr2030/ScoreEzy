"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: {
    name: string;
  };
}

export default function CoursePurchase({ course }: { course: Course }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "Please log in to purchase this course.",
        variant: "destructive",
      });
      return;
    }

    setIsPurchasing(true);
    try {
      const res = await fetch("/api/purchase-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: course.id }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Course Purchased",
          description: "You have successfully enrolled in this course.",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>By {course.instructor.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{course.description}</p>
        <p className="text-2xl font-bold mb-4">${course.price}</p>
        <Button onClick={handlePurchase} disabled={isPurchasing}>
          {isPurchasing ? "Processing..." : "Purchase Course"}
        </Button>
      </CardContent>
    </Card>
  );
}

