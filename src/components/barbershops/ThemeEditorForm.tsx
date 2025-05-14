
"use client";

import React from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BarbershopTheme } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { updateBarbershop } from "@/actions/barbershops";
import { useRouter } from "next/navigation";

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

const themeFormSchema = z.object({
  primary_color: z.string().regex(hexColorRegex, "Invalid hex color").optional().or(z.literal('')).nullable(),
  secondary_color: z.string().regex(hexColorRegex, "Invalid hex color").optional().or(z.literal('')).nullable(),
  accent_color: z.string().regex(hexColorRegex, "Invalid hex color").optional().or(z.literal('')).nullable(),
  logo_mobile_url: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')).nullable(),
});

type ThemeFormValues = z.infer<typeof themeFormSchema>;

interface ThemeEditorFormProps {
  barbershopId: string;
  initialData?: BarbershopTheme | null;
}

const DEFAULT_THEME_VALUES: ThemeFormValues = {
  primary_color: "#0A84FF",
  secondary_color: "#6CB2FF",
  accent_color: "#FF9500",
  logo_mobile_url: "",
};

export function ThemeEditorForm({ barbershopId, initialData }: ThemeEditorFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeFormSchema),
    defaultValues: initialData ? {
        primary_color: initialData.primary_color || DEFAULT_THEME_VALUES.primary_color,
        secondary_color: initialData.secondary_color || DEFAULT_THEME_VALUES.secondary_color,
        accent_color: initialData.accent_color || DEFAULT_THEME_VALUES.accent_color,
        logo_mobile_url: initialData.logo_mobile_url || DEFAULT_THEME_VALUES.logo_mobile_url,
    } : DEFAULT_THEME_VALUES,
  });

  async function onSubmit(values: ThemeFormValues) {
    setIsLoading(true);
    
    const result = await updateBarbershop(barbershopId, { theme: values });

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Theme updated successfully.",
      });
      router.refresh(); // Refresh data for the current page
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile App Theme</CardTitle>
        <CardDescription>Customize colors and logo for the mobile app experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="primary_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input type="color" {...field} value={field.value || "#000000"} className="w-16 h-10 p-1" />
                      </FormControl>
                      <FormControl>
                        <Input type="text" placeholder="#0A84FF" {...field} value={field.value || ""} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondary_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Color</FormLabel>
                     <div className="flex items-center gap-2">
                        <FormControl>
                            <Input type="color" {...field} value={field.value || "#000000"} className="w-16 h-10 p-1" />
                        </FormControl>
                        <FormControl>
                            <Input type="text" placeholder="#6CB2FF" {...field} value={field.value || ""} />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accent_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accent Color</FormLabel>
                    <div className="flex items-center gap-2">
                        <FormControl>
                            <Input type="color" {...field} value={field.value || "#000000"} className="w-16 h-10 p-1" />
                        </FormControl>
                        <FormControl>
                            <Input type="text" placeholder="#FF9500" {...field} value={field.value || ""}/>
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="logo_mobile_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile App Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/mobile-logo.png" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving Theme..." : "Save Theme"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
