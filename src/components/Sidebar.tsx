import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BookMarked } from "lucide-react";
import { SidebarMainMenu } from "./sidebar/SidebarMainMenu";
import { SidebarLibraryMenu } from "./sidebar/SidebarLibraryMenu";
import { SidebarPremiumCard } from "./sidebar/SidebarPremiumCard";

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
              <SidebarMainMenu />
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-sm font-semibold text-zinc-400">
              Library
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarLibraryMenu />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <SidebarPremiumCard />
        </SidebarFooter>
      </ShadcnSidebar>
      <SidebarRail />
    </>
  );
};