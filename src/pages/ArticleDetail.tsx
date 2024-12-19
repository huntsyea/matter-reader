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
      <div className="flex h-screen bg-background w-full">
        <Sidebar />
        <div className="flex-1">
          <div className="border-b">
            <div className="flex h-14 items-center gap-4 px-6">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-semibold">Article</h1>
            </div>
          </div>
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
        <div className="border-b">
          <div className="flex h-14 items-center gap-4 px-6">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Article</h1>
          </div>
        </div>
        <div className="overflow-auto bg-[#FCFCFC] dark:bg-zinc-900 min-h-full">
          <article className="prose dark:prose-invert lg:prose-lg 
            prose-img:rounded-lg 
            prose-headings:font-serif 
            prose-p:font-sans 
            prose-p:leading-relaxed 
            prose-headings:leading-tight 
            max-w-3xl mx-auto px-6 py-12 
            prose-a:text-blue-600 
            dark:prose-a:text-blue-400 
            prose-img:mx-auto 
            prose-img:max-h-[70vh] 
            prose-img:w-auto 
            prose-a:no-underline 
            prose-a:border-b 
            prose-a:border-dotted 
            prose-a:border-blue-600/50 
            dark:prose-a:border-blue-400/50 
            hover:prose-a:border-blue-600 
            dark:hover:prose-a:border-blue-400
            prose-hr:border-zinc-200
            dark:prose-hr:border-zinc-700
            prose-blockquote:border-l-4
            prose-blockquote:border-zinc-300
            dark:prose-blockquote:border-zinc-600
            prose-blockquote:pl-4
            prose-blockquote:italic
            prose-code:bg-zinc-100
            dark:prose-code:bg-zinc-800
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:rounded
            prose-pre:bg-zinc-100
            dark:prose-pre:bg-zinc-800
            prose-pre:p-4
            prose-pre:rounded-lg
            prose-table:border-collapse
            prose-table:w-full
            prose-td:border
            prose-td:border-zinc-200
            dark:prose-td:border-zinc-700
            prose-td:p-2
            prose-th:border
            prose-th:border-zinc-200
            dark:prose-th:border-zinc-700
            prose-th:p-2
            prose-th:bg-zinc-100
            dark:prose-th:bg-zinc-800
            prose-ul:list-disc
            prose-ol:list-decimal
            prose-li:marker:text-zinc-400
            dark:prose-li:marker:text-zinc-500
            prose-strong:font-semibold
            prose-strong:text-zinc-900
            dark:prose-strong:text-zinc-100
            prose-em:italic
            prose-em:text-zinc-800
            dark:prose-em:text-zinc-200
            prose-mark:bg-yellow-100
            dark:prose-mark:bg-yellow-900/30
            prose-small:text-sm
            prose-small:text-zinc-500
            dark:prose-small:text-zinc-400
            prose-figcaption:text-center
            prose-figcaption:text-sm
            prose-figcaption:text-zinc-500
            dark:prose-figcaption:text-zinc-400
            prose-kbd:bg-zinc-100
            dark:prose-kbd:bg-zinc-800
            prose-kbd:px-1.5
            prose-kbd:py-0.5
            prose-kbd:rounded
            prose-kbd:text-sm
            prose-abbr:border-b
            prose-abbr:border-dotted
            prose-abbr:cursor-help">
            {article?.image_url && (
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full aspect-[2/1] object-cover rounded-lg mb-8 shadow-sm"
              />
            )}
            <h1 className="mb-2 font-serif text-[#222222] dark:text-white !mt-0">{article?.title}</h1>
            <div className="flex items-center gap-2 text-sm text-[#8E9196] dark:text-zinc-400 mb-8 !mt-0">
              {article?.author && <span>{article.author}</span>}
              {article?.source && <span>• {article.source}</span>}
              {article?.published_date && (
                <span>• {new Date(article.published_date).toLocaleDateString()}</span>
              )}
            </div>
            <div 
              className="article-content prose-headings:text-[#222222] dark:prose-headings:text-white prose-p:text-[#333333] dark:prose-p:text-zinc-300 prose-li:text-[#333333] dark:prose-li:text-zinc-300 prose-strong:text-[#222222] dark:prose-strong:text-white prose-blockquote:text-[#444444] dark:prose-blockquote:text-zinc-300 prose-blockquote:border-l-[#8E9196] dark:prose-blockquote:border-l-zinc-700 prose-code:text-[#222222] dark:prose-code:text-white prose-pre:bg-[#F1F0FB] dark:prose-pre:bg-zinc-800 prose-hr:border-[#C8C8C9] dark:prose-hr:border-zinc-700"
              dangerouslySetInnerHTML={{ __html: article?.content || '' }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;