"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Settings, Scissors } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"; // Using the ShadCN sidebar
import { cn } from "@/lib/utils";

const navItems = [
  // { href: "/app/dashboard", label: "Dashboard", icon: Home }, // Future
  { href: "/app/barbershops", label: "Barbershops", icon: Store },
  // { href: "/app/settings", label: "Settings", icon: Settings }, // Future
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon"> {/* Allow collapsing to icons */}
      <SidebarHeader className="p-4">
        <Link href="/app/barbershops" className="flex items-center gap-2">
          <Scissors className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Manager
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
