import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, BookMarked, InboxIcon, Search } from "lucide-react";

export const SidebarMainMenu = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <BookMarked className="h-4 w-4" />
            <span>Queue</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <InboxIcon className="h-4 w-4" />
            <span>Inbox</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};