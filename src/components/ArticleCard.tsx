import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  title: string;
  source: string;
  author?: string;
  date: string;
  imageUrl?: string;
  type?: string;
}

export const ArticleCard = ({ id, title, source, author, date, imageUrl, type }: ArticleCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/article/${id}`)}
      className="flex items-start gap-3 sm:gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 px-3 sm:px-4 cursor-pointer transition-colors"
    >
      {type === "document" ? (
        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
          <FileText className="w-4 h-4" />
        </div>
      ) : imageUrl ? (
        <img src={imageUrl} alt={title} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
          {title.charAt(0)}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">{title}</h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {author && <span>{author}</span>}
          {author && source && <span className="hidden sm:inline">•</span>}
          {source && <span>{source}</span>}
          {((author || source) && date) && <span className="hidden sm:inline">•</span>}
          {date && <span>{date}</span>}
        </div>
      </div>
    </div>
  );
};