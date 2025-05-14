"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Barbershop } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { createBarbershop, updateBarbershop } from "@/actions/barbershops";
import { useRouter } from "next/navigation";
import React from "react";

const barbershopFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().optional(),
  phone: z.string().optional(),
  logo_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  opening_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM)"}).optional(),
  closing_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM)"}).optional(),
  appointment_duration_minutes: z.coerce.number().int().positive().optional(),
  // Theme fields can be added later
});

type BarbershopFormValues = z.infer<typeof barbershopFormSchema>;

interface BarbershopFormProps {
  initialData?: Barbershop; // For editing
}

export function BarbershopForm({ initialData }: BarbershopFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<BarbershopFormValues>({
    resolver: zodResolver(barbershopFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
      logo_url: initialData?.logo_url || "",
      opening_time: initialData?.opening_time || "09:00",
      closing_time: initialData?.closing_time || "20:00",
      appointment_duration_minutes: initialData?.appointment_duration_minutes || 30,
    },
  });

  async function onSubmit(values: BarbershopFormValues) {
    setIsLoading(true);
    let result;
    if (initialData) {
      result = await updateBarbershop(initialData.id, values);
    } else {
      result = await createBarbershop(values);
    }

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: `Barbershop ${initialData ? 'updated' : 'created'} successfully.`,
      });
      router.push("/app/barbershops");
      router.refresh(); // Ensure data is fresh on the list page
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Barbershop" : "New Barbershop Details"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Greco Barbearia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/logo.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="opening_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Time (HH:MM)</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="closing_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing Time (HH:MM)</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointment_duration_minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slot Duration (min)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Placeholder for theme editor section */}
            {/* <div className="space-y-2 pt-4">
              <h3 className="text-lg font-medium">Theme Configuration</h3>
              <p className="text-sm text-muted-foreground">Customize mobile app appearance.</p>
            </div> */}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (initialData ? "Saving..." : "Creating...") : (initialData ? "Save Changes" : "Create Barbershop")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
