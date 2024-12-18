import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  source: string;
  date: string;
  imageUrl?: string;
}

export const ArticleCard = ({ title, excerpt, source, date, imageUrl }: ArticleCardProps) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{source}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="mt-4 rounded-md w-full h-48 object-cover"
          />
        )}
      </CardContent>
    </Card>
  );
};