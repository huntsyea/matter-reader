import { Home, InboxIcon, Search, Star, Highlighter, Archive, Tag, BookMarked, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <>
      <ShadcnSidebar className="border-r">
        <SidebarHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <BookMarked className="h-8 w-8" />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <div className="flex flex-col gap-2 p-4">
            <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            
            <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
              <BookMarked className="h-4 w-4" />
              <span>Queue</span>
            </Button>
            
            <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
              <InboxIcon className="h-4 w-4" />
              <span>Inbox</span>
            </Button>

            <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Button>

            <div className="mt-8">
              <h2 className="text-sm font-semibold mb-4 px-2 text-muted-foreground">Library</h2>
              
              <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
                <Star className="h-4 w-4" />
                <span>Favorites</span>
              </Button>

              <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
                <Highlighter className="h-4 w-4" />
                <span>Highlights</span>
              </Button>

              <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
                <Archive className="h-4 w-4" />
                <span>Archive</span>
              </Button>

              <Button variant="ghost" className="justify-start gap-2 mb-2 text-foreground hover:bg-accent w-full">
                <Tag className="h-4 w-4" />
                <span>Tags</span>
              </Button>
            </div>
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              className="justify-start gap-2 w-full text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
            <div className="bg-accent/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Get your reading superpowers</h3>
              <p className="text-sm text-muted-foreground mb-4">Read better with Matter Premium</p>
              <Button variant="outline" className="w-full">
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