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
      prose-code:rounded">
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};