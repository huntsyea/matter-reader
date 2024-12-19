import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, InboxIcon, Search, Star, Highlighter, Archive, Tag, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <>
      <ShadcnSidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <BookMarked className="h-8 w-8 text-white" />
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <BookMarked className="h-4 w-4" />
                      <span>Queue</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <InboxIcon className="h-4 w-4" />
                      <span>Inbox</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <Search className="h-4 w-4" />
                      <span>Search</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-sm font-semibold text-zinc-400">
              Library
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <Star className="h-4 w-4" />
                      <span>Favorites</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <Highlighter className="h-4 w-4" />
                      <span>Highlights</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <Archive className="h-4 w-4" />
                      <span>Archive</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
                      <Tag className="h-4 w-4" />
                      <span>Tags</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <div className="border-t border-zinc-800 pt-4">
            <div className="bg-zinc-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-white">Get your reading superpowers</h3>
              <p className="text-sm text-zinc-400 mb-4">Read better with Matter Premium</p>
              <Button variant="outline" className="w-full text-white border-zinc-700 hover:bg-zinc-700">
                Go Premium →
              </Button>
            </div>
          </div>
        </SidebarFooter>
      </ShadcnSidebar>
      <SidebarRail />
    </>
  );
};