interface ArticleContentProps {
  content: string;
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <article className="prose dark:prose-invert lg:prose-lg 
      prose-img:rounded-lg 
      prose-headings:font-serif 
      prose-p:font-sans 
      prose-p:leading-relaxed 
      prose-headings:leading-tight 
      max-w-3xl mx-auto px-6 pb-12 
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
      <div 
        className="article-content prose-headings:text-[#222222] dark:prose-headings:text-white prose-p:text-[#333333] dark:prose-p:text-zinc-300 prose-li:text-[#333333] dark:prose-li:text-zinc-300 prose-strong:text-[#222222] dark:prose-strong:text-white prose-blockquote:text-[#444444] dark:prose-blockquote:text-zinc-300 prose-blockquote:border-l-[#8E9196] dark:prose-blockquote:border-l-zinc-700 prose-code:text-[#222222] dark:prose-code:text-white prose-pre:bg-[#F1F0FB] dark:prose-pre:bg-zinc-800 prose-hr:border-[#C8C8C9] dark:prose-hr:border-zinc-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};