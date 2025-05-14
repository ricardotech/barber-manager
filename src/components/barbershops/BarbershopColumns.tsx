
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
import { deleteBarbershop } from "@/actions/barbershops"; 
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React from "react"; // Required for useToast and useRouter hooks

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
    cell: ({ row }) => {
        const address = row.getValue("address") as string | undefined | null;
        return address ? <div className="truncate max-w-xs">{address}</div> : <span className="text-muted-foreground">N/A</span>;
    }
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
        const phone = row.getValue("phone") as string | undefined | null;
        return phone || <span className="text-muted-foreground">N/A</span>;
    }
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
      const { toast } = useToast();
      const router = useRouter();
      const [isDeleting, setIsDeleting] = React.useState(false);

      const handleDelete = async () => {
        if (isDeleting) return;
        if (!confirm(`Are you sure you want to delete ${barbershop.name}? This action cannot be undone.`)) return;
        
        setIsDeleting(true);
        const result = await deleteBarbershop(barbershop.id);
        if (result.error) {
          toast({ title: "Error deleting barbershop", description: result.error, variant: "destructive" });
        } else {
          toast({ title: "Success", description: `Barbershop "${barbershop.name}" deleted successfully.` });
          router.refresh(); // Refresh data on the page
        }
        setIsDeleting(false);
      };

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
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleDelete} 
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
