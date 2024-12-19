import { Button } from "@/components/ui/button";

export const SidebarPremiumCard = () => {
  return (
    <div className="border-t border-zinc-800 pt-4">
      <div className="bg-zinc-800 rounded-lg p-4">
        <h3 className="font-semibold mb-2 text-white">
          Get your reading superpowers
        </h3>
        <p className="text-sm text-zinc-400 mb-4">Read better with Matter Premium</p>
        <Button
          variant="outline"
          className="w-full text-white border-zinc-700 hover:bg-zinc-700"
        >
          Go Premium →
        </Button>
      </div>
    </div>
  );
};