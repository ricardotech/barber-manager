
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks, PlusCircle } from "lucide-react";

export default function ManagePlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Subscription Plans</h1>
          <p className="text-muted-foreground">
            Define and manage subscription plans for barbershop owners. (For Platform Admin)
          </p>
        </div>
        <Button disabled>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plans</CardTitle>
          <CardDescription>Overview of available subscription plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example Plan Structure - to be replaced with dynamic data and a table */}
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">Basic Plan</h3>
                <span className="text-xl font-bold text-primary">$19/mo</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Limited features, suitable for small shops.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Manage 1 Barbershop</li>
                <li>Up to 3 Professionals</li>
                <li>Basic Theming</li>
                <li>Community Support</li>
              </ul>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" disabled>Edit Plan</Button>
                <Button variant="destructive" size="sm" disabled>Delete Plan</Button>
              </div>
            </div>

             <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">Pro Plan</h3>
                <span className="text-xl font-bold text-primary">$49/mo</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Advanced features for growing businesses.
              </p>
               <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Manage up to 5 Barbershops</li>
                <li>Up to 10 Professionals per shop</li>
                <li>Full Theming Options</li>
                <li>Analytics Dashboard</li>
                <li>Priority Email Support</li>
              </ul>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" disabled>Edit Plan</Button>
                <Button variant="destructive" size="sm" disabled>Delete Plan</Button>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground pt-4">
              Full plan management UI (creation, editing, feature toggles) will be implemented here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
