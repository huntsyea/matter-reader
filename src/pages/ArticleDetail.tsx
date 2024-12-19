import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleContent } from "@/components/article/ArticleContent";

const ArticleDetail = () => {
  const { id } = useParams();

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

  // Function to extract the first image from content if no main image
  const extractFirstImage = (content: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content?.match(imgRegex);
    return match ? match[1] : null;
  };

  // Get the header image (main image or first content image)
  const headerImage = article?.image_url || (article?.content ? extractFirstImage(article.content) : null);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-background w-full">
        <Sidebar />
        <div className="flex-1">
          <ArticleHeader />
          <div className="overflow-auto">
            <div className="animate-pulse space-y-4 p-6 max-w-3xl mx-auto">
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
    <div className="flex h-screen bg-background w-full">
      <Sidebar />
      <div className="flex-1">
        <ArticleHeader />
        <div className="overflow-auto bg-[#FCFCFC] dark:bg-zinc-900 min-h-full">
          <ArticleHero
            title={article?.title || ''}
            author={article?.author}
            source={article?.source}
            publishedDate={article?.published_date}
            imageUrl={headerImage}
          />
          <ArticleContent content={article?.content || ''} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;