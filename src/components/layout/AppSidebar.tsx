"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Scissors, BarChartBig, ListChecks, CreditCard, LayoutDashboard } from "lucide-react"; // Added LayoutDashboard
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"; 
import { cn } from "@/lib/utils";

const mainNavItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard }, // Added Dashboard
  { href: "/app/barbershops", label: "My Barbershops", icon: Store },
  // { href: "/app/settings", label: "Settings", icon: Settings }, // Future
];

const platformAdminNavItems = [
  { href: "/app/platform-admin/kpis", label: "Platform KPIs", icon: BarChartBig },
  { href: "/app/platform-admin/plans", label: "Manage Plans", icon: ListChecks },
  { href: "/app/platform-admin/billing", label: "Platform Billing", icon: CreditCard },
];


export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon"> {/* Allow collapsing to icons */}
      <SidebarHeader className="p-4">
        <Link href="/app/dashboard" className="flex items-center gap-2"> {/* Changed href to /app/dashboard */}
          <Scissors className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Manager
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  className={cn(
                    "w-full justify-start",
                    // Simplified active state: exact match for dashboard, startsWith for others (like /app/barbershops and /app/barbershops/[id])
                    pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                    item.href !== "/app/dashboard" && pathname.startsWith(item.href) && pathname !== "/app/dashboard" && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  isActive={pathname === item.href || (item.href !== "/app/dashboard" && pathname.startsWith(item.href) && pathname !== "/app/dashboard")}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Platform Admin Section - In a real app, this would be conditionally rendered based on user role */}
        <SidebarSeparator className="my-2" />
        
        <SidebarGroupLabel className="px-4 pt-2 text-xs font-medium uppercase text-sidebar-foreground/70 group-data-[collapsible=icon]:pt-2 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:text-center group-data-[collapsible=icon]:pb-1">
            <span className="group-data-[collapsible=icon]:hidden">Platform</span>
        </SidebarGroupLabel>
        <SidebarMenu>
          {platformAdminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  className={cn(
                    "w-full justify-start",
                    pathname.startsWith(item.href) && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  isActive={pathname.startsWith(item.href)}
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
