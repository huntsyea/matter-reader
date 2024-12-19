import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      console.log('Fetching article details for ID:', id);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      console.log('Fetched article:', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b w-full">
            <div className="flex h-14 items-center gap-4 px-6">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold">Article</h1>
            </div>
          </header>
          <div className="flex-1 overflow-auto">
            <div className="animate-pulse space-y-4 p-6 max-w-4xl mx-auto">
              <div className="h-8 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 w-1/4 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b w-full">
          <div className="flex h-14 items-center gap-4 px-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Article</h1>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <article className="prose dark:prose-invert max-w-4xl mx-auto p-6">
            {article?.image_url && (
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="mb-2">{article?.title}</h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              {article?.author && <span>{article.author}</span>}
              {article?.source && <span>• {article.source}</span>}
              {article?.published_date && (
                <span>• {new Date(article.published_date).toLocaleDateString()}</span>
              )}
            </div>
            <div className="whitespace-pre-wrap">{article?.content}</div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;