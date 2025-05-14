import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to BarberShop Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your central hub for managing barbershops.</p>
          <p className="mt-2">Navigate using the sidebar to manage barbershops, professionals, services, and themes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
