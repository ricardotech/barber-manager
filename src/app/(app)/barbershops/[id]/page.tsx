
import { BarbershopForm } from "@/components/barbershops/BarbershopForm";
import { ThemeEditorForm } from "@/components/barbershops/ThemeEditorForm";
import { getBarbershopById } from "@/actions/barbershops";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface BarbershopDetailPageProps {
  params: { id: string };
}

export default async function BarbershopDetailPage({ params }: BarbershopDetailPageProps) {
  const barbershop = await getBarbershopById(params.id);

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage: {barbershop.name}</h1>
        <p className="text-muted-foreground">
          Update details, services, professionals, schedule, and theme for this barbershop.
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="services" disabled>Services</TabsTrigger>
          <TabsTrigger value="professionals" disabled>Professionals</TabsTrigger>
          <TabsTrigger value="schedule" disabled>Schedule</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <BarbershopForm initialData={barbershop} />
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Management</CardTitle>
              <CardDescription>Add, edit, or remove services offered by this barbershop.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Service management UI will be here.</p>
              {/* Placeholder for ServiceList and ServiceForm components */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professionals">
           <Card>
            <CardHeader>
              <CardTitle>Professionals Management</CardTitle>
              <CardDescription>Manage the barbers working at this shop.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Professional management UI will be here.</p>
              {/* Placeholder for ProfessionalList and ProfessionalForm components */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
           <Card>
            <CardHeader>
              <CardTitle>Schedule & Availability</CardTitle>
              <CardDescription>Set working hours and manage availability.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Schedule management UI will be here.</p>
              {/* Placeholder for ScheduleManager component */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
           <ThemeEditorForm barbershopId={barbershop.id} initialData={barbershop.theme} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
