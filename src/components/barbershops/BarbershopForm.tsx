
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Barbershop } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { createBarbershop, updateBarbershop } from "@/actions/barbershops";
import { useRouter } from "next/navigation";
import React from "react";

const barbershopFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  logo_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')).nullable(),
  opening_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM)"}).optional().or(z.literal('')).nullable(),
  closing_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format (HH:MM)"}).optional().or(z.literal('')).nullable(),
  appointment_duration_minutes: z.coerce.number().int().positive().optional().nullable(),
});

type BarbershopFormValues = z.infer<typeof barbershopFormSchema>;

interface BarbershopFormProps {
  initialData?: Barbershop; 
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
      appointment_duration_minutes: initialData?.appointment_duration_minutes === null ? undefined : initialData?.appointment_duration_minutes || 30,
    },
  });

  async function onSubmit(values: BarbershopFormValues) {
    setIsLoading(true);
    let result;

    // Ensure empty strings are converted to nulls for optional fields
    const processedValues = {
      ...values,
      address: values.address || null,
      phone: values.phone || null,
      logo_url: values.logo_url || null,
      opening_time: values.opening_time || null,
      closing_time: values.closing_time || null,
      appointment_duration_minutes: values.appointment_duration_minutes === undefined ? null : values.appointment_duration_minutes,
    };

    if (initialData) {
      result = await updateBarbershop(initialData.id, processedValues);
    } else {
      result = await createBarbershop(processedValues);
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
      router.push("//barbershops");
      router.refresh(); 
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Barbershop Details" : "New Barbershop Details"}</CardTitle>
        <CardDescription>
            {initialData ? "Update the core information for this barbershop." : "Fill in the essential information to register a new barbershop."}
        </CardDescription>
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
                    <Input placeholder="e.g., Modern Cuts" {...field} />
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
                    <Textarea placeholder="123 Main St, Anytown, USA" {...field} value={field.value ?? ""} />
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
                    <Input placeholder="(555) 123-4567" {...field} value={field.value ?? ""} />
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
                  <FormLabel>Main Logo URL (for web/general use)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/logo.png" {...field} value={field.value ?? ""} />
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
                    <FormLabel>Opening Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} value={field.value ?? ""} />
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
                    <FormLabel>Closing Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} value={field.value ?? ""} />
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
                    <FormLabel>Default Slot Duration (min)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="30" {...field} 
                       value={field.value === null || field.value === undefined ? '' : String(field.value)}
                       onChange={e => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (initialData ? "Saving Changes..." : "Creating Barbershop...") : (initialData ? "Save Changes" : "Create Barbershop")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
