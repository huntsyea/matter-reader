import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ArticleHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="border-b">
      <div className="flex h-14 items-center gap-4 px-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">Article</h1>
      </div>
    </div>
  );
};