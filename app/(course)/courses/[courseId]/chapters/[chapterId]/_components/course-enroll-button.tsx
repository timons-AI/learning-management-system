"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/formats";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { cn } from "@/lib/utils";
import { TokenModal } from "./token-model";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // TODO : add model for enroll button that has 2 options for check out and enroll
    // create api for those 2 options
    <Drawer>
      <DrawerTrigger
        className={cn(
          buttonVariants({ size: "lg", variant: "default", className: "" })
        )}
      >
        Enroll
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Please choose your prefered method of enrollment
          </DrawerTitle>
          <DrawerDescription>
            You can checkout or use an access token provided by your institution
            to get access to this course.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0  justify-center pb-6">
            <Button
              onClick={onClick}
              disabled={isLoading}
              size="lg"
              className="w-full md:w-auto"
            >
              Enroll for {formatPrice(price)}
            </Button>
            <TokenModal courseId={courseId} />
          </div>

          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
