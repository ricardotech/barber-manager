import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "./UserNav";
import { createSupabaseServerClient } from "@/lib/supabase/server"; // To get user data

export async function AppHeader() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <div className="md:hidden"> {/* Show trigger only on small screens if sidebar is collapsible */}
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        {/* Can add breadcrumbs or page title here */}
      </div>
      <UserNav user={user} />
    </header>
  );
}
