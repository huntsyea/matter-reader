import { Sidebar } from "@/components/Sidebar";
import { ArticleList } from "@/components/ArticleList";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AddArticleDialog } from "@/components/AddArticleDialog";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background w-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:px-6 sm:py-2 space-y-4 sm:space-y-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Queue</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Button variant="ghost" className="text-sm sm:flex-none flex-1">
                Resume
              </Button>
              <Button variant="ghost" className="text-sm sm:flex-none flex-1">
                Content Type <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-sm sm:flex-none flex-1">
                Sort <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="text-sm sm:flex-none flex-1">
                Filter <Filter className="ml-1 h-4 w-4" />
              </Button>
              <AddArticleDialog />
            </div>
          </div>
        </div>
        <ArticleList />
      </main>
    </div>
  );
};

export default Index;