import { Home, InboxIcon, Search, Star, Highlighter, Archive, Tag, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-zinc-900 text-white p-4 flex flex-col min-h-screen">
      <div className="flex items-center gap-2 mb-8">
        <BookMarked className="h-8 w-8" />
      </div>
      
      <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
        <Home className="h-4 w-4" />
        Home
      </Button>
      
      <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
        <BookMarked className="h-4 w-4" />
        Queue
      </Button>
      
      <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
        <InboxIcon className="h-4 w-4" />
        Inbox
      </Button>

      <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
        <Search className="h-4 w-4" />
        Search
      </Button>

      <div className="mt-8">
        <h2 className="text-sm font-semibold mb-4 px-2 text-zinc-400">Library</h2>
        
        <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
          <Star className="h-4 w-4" />
          Favorites
        </Button>

        <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
          <Highlighter className="h-4 w-4" />
          Highlights
        </Button>

        <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
          <Archive className="h-4 w-4" />
          Archive
        </Button>

        <Button variant="ghost" className="justify-start gap-2 mb-2 text-white hover:bg-zinc-800 w-full">
          <Tag className="h-4 w-4" />
          Tags
        </Button>
      </div>

      <div className="mt-auto">
        <div className="border-t border-zinc-800 pt-4">
          <div className="bg-zinc-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Get your reading superpowers</h3>
            <p className="text-sm text-zinc-400 mb-4">Read better with Matter Premium</p>
            <Button variant="outline" className="w-full text-white border-zinc-700 hover:bg-zinc-700">
              Go Premium →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};