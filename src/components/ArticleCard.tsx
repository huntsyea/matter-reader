import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface ArticleCardProps {
  title: string;
  source: string;
  author?: string;
  date: string;
  imageUrl?: string;
  type?: string;
}

export const ArticleCard = ({ title, source, author, date, imageUrl, type }: ArticleCardProps) => {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-zinc-100 hover:bg-zinc-50 px-4 cursor-pointer transition-colors">
      {type === "document" ? (
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
          <FileText className="w-4 h-4" />
        </div>
      ) : imageUrl ? (
        <img src={imageUrl} alt={title} className="w-8 h-8 rounded-full object-cover" />
      ) : (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          {title.charAt(0)}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-zinc-900 truncate">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
          {author && <span>{author}</span>}
          {author && source && <span>•</span>}
          <span>{source}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};