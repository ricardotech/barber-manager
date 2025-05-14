import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { BarbershopClientPage } from "@/components/barbershops/BarbershopClientPage";
import { getBarbershops } from "@/actions/barbershops";

export default async function BarbershopsPage() {
  const barbershops = await getBarbershops();

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Barbershops</h1>
          <p className="text-muted-foreground">
            Manage all your registered barbershops here.
          </p>
        </div>
        <Link href="/app/barbershops/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Barbershop
          </Button>
        </Link>
      </div>
      <BarbershopClientPage initialData={barbershops} />
    </div>
  );
}
