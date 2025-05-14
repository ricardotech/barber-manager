
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Settings, Download } from "lucide-react";

export default function PlatformBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Billing</h1>
        <p className="text-muted-foreground">
          Manage payment gateway and view subscription billing. (For Platform Admin)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" /> Payment Gateway Configuration
          </CardTitle>
          <CardDescription>Connect and manage your payment processor (e.g., Stripe, PayPal).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h4 className="font-medium">Stripe Integration</h4>
                <p className="text-sm text-muted-foreground">Status: <span className="text-green-500">Connected</span></p>
                <p className="text-xs text-muted-foreground">Account ID: acct_xxxxxxxxxxxxxx</p>
            </div>
          <Button variant="outline" disabled>
            <Settings className="mr-2 h-4 w-4" /> Configure Stripe
          </Button>
          <p className="text-sm text-muted-foreground">
            This section will allow platform administrators to set up how they receive payments from barbershop owners.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" /> Tenant Subscriptions Overview
                    </CardTitle>
                    <CardDescription>Summary of active subscriptions and recent payments across the platform.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="mt-2 sm:mt-0" disabled>
                    <Download className="mr-2 h-4 w-4" /> Export Data
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left font-medium text-muted-foreground">Tenant ID</th>
                        <th className="p-2 text-left font-medium text-muted-foreground">Plan</th>
                        <th className="p-2 text-left font-medium text-muted-foreground">Status</th>
                        <th className="p-2 text-left font-medium text-muted-foreground">Next Billing</th>
                        <th className="p-2 text-right font-medium text-muted-foreground">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="p-2">tenant_abc123</td>
                        <td className="p-2">Pro Plan</td>
                        <td className="p-2 text-green-500">Active</td>
                        <td className="p-2">2024-07-15</td>
                        <td className="p-2 text-right">$49.00</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2">tenant_xyz789</td>
                        <td className="p-2">Basic Plan</td>
                        <td className="p-2 text-yellow-500">Past Due</td>
                        <td className="p-2">2024-06-20</td>
                        <td className="p-2 text-right">$19.00</td>
                    </tr>
                </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground pt-4">
            A filterable and sortable table of tenant subscriptions, payment statuses, and billing history will be shown here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
