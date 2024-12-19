import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("Fetching articles...");
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        console.log("Fetched articles:", data);
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast({
          title: "Error loading articles",
          description: "There was an error loading your articles. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400">
            No articles yet. Add your first article using the + button above.
          </p>
        </div>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))
      )}
    </div>
  );
};