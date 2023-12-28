"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  //   email: z
  //     .string({
  //       required_error: "Please select an email to display.",
  //     })
  //     .email(),

  token: z
    .string({
      required_error: "Please enter a valid token.",
    })
    .min(8, {
      message: "Token must be at least 8 characters.",
    })
    .max(30, {
      message: "Token must not be longer than 30 characters.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export function TokenForm({ courseId }: { courseId: string }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();

  //   function onSubmit(data: ProfileFormValues) {
  //     try {
  //         await axios.patch(`/api/courses/${courseId}`, values);
  //         toast.success("Course updated");
  //         toggleEdit();
  //         router.refresh();
  //       } catch {
  //         toast.error("Something went wrong");
  //       }
  //   }
  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await axios.post(`/api/courses/${courseId}/token-checkout`, values);
      //   /api/courses/${courseId}/checkout
      toast.success("Course Unlocked");
      // console.log(res);

      router.refresh();
    } catch {
      toast.error("Invalid token");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username123" {...field} />
              </FormControl>
              <FormDescription>
                This is the username you use on your institution site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input placeholder="84304-3893ur30-5839g-38hg5" {...field} />
              </FormControl>
              <FormDescription>
                This token is provided by your institution.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Validate token</Button>
      </form>
    </Form>
  );
}
