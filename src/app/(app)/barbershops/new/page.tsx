import { BarbershopForm } from "@/components/barbershops/BarbershopForm";

export default function NewBarbershopPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Barbershop</h1>
        <p className="text-muted-foreground">
          Fill in the details to add a new barbershop to the platform.
        </p>
      </div>
      <BarbershopForm />
    </div>
  );
}
