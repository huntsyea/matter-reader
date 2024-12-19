import { Sidebar } from "@/components/Sidebar";
import { ArticleList } from "@/components/ArticleList";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background w-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Queue</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">
                Resume
              </Button>
              <Button variant="ghost" className="text-sm">
                Content Type <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-sm">
                Sort <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-sm">
                Filter <Filter className="ml-1 h-4 w-4" />
              </Button>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <ArticleList />
      </main>
    </div>
  );
};

export default Index;