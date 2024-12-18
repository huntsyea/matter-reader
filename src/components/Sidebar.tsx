import { Home, BookMarked, Settings, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-background border-r border-border p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <BookMarked className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">RSS Reader</h1>
      </div>
      
      <Button variant="ghost" className="justify-start gap-2 mb-2">
        <Home className="h-4 w-4" />
        Home
      </Button>
      
      <Button variant="ghost" className="justify-start gap-2 mb-2">
        <BookMarked className="h-4 w-4" />
        Saved
      </Button>
      
      <Button variant="ghost" className="justify-start gap-2 mb-2">
        <Settings className="h-4 w-4" />
        Settings
      </Button>

      <div className="mt-8">
        <h2 className="text-sm font-semibold mb-2 px-2">FEEDS</h2>
        <Button variant="outline" className="w-full justify-start gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Feed
        </Button>
      </div>
    </div>
  );
};