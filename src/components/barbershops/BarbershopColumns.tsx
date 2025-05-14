"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { BarbershopRow } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { deleteBarbershop } from "@/actions/barbershops"; // For delete action
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<BarbershopRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <div className="font-medium">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const barbershop = row.original;
      // const { toast } = useToast();
      // const router = useRouter();

      // const handleDelete = async () => {
      //   if (!confirm(\`Are you sure you want to delete ${barbershop.name}?\`)) return;
      //   const result = await deleteBarbershop(barbershop.id);
      //   if (result.error) {
      //     toast({ title: "Error", description: result.error, variant: "destructive" });
      //   } else {
      //     toast({ title: "Success", description: "Barbershop deleted." });
      //     router.refresh(); // Refresh data
      //   }
      // };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/app/barbershops/${barbershop.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                View/Edit
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
