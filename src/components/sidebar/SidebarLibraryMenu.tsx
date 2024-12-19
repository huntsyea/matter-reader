import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Star, Highlighter, Archive, Tag } from "lucide-react";

export const SidebarLibraryMenu = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <Star className="h-4 w-4" />
            <span>Favorites</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <Highlighter className="h-4 w-4" />
            <span>Highlights</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <Archive className="h-4 w-4" />
            <span>Archive</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button
            variant="ghost"
            className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full"
          >
            <Tag className="h-4 w-4" />
            <span>Tags</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};