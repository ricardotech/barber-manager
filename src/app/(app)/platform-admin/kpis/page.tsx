
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChartBig, Users, DollarSign } from "lucide-react";

export default function PlatformKpisPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform KPIs</h1>
          <p className="text-muted-foreground">
            Key Performance Indicators for the BarberShop Manager platform. (For Platform Admin)
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Active Users (MAU)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-ai-hint="number statistic">N/A</div>
            <p className="text-xs text-muted-foreground">
              Total active users this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue (MRR)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-ai-hint="currency value">N/A</div>
            <p className="text-xs text-muted-foreground">
              Current monthly recurring revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribed Barbershops</CardTitle>
            <BarChartBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-ai-hint="count shops">N/A</div>
            <p className="text-xs text-muted-foreground">
              Total number of paying barbershops
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Growth / Revenue Trends</CardTitle>
          <CardDescription>Charts displaying platform growth over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed rounded-md" data-ai-hint="line chart">
            <p className="text-muted-foreground">Charts and detailed analytics will be displayed here.</p>
          </div>
          {/* Placeholder for charts, e.g., using ShadCN charts */}
        </CardContent>
      </Card>
    </div>
  );
}
