interface ArticleHeroProps {
  title: string;
  author?: string;
  source?: string;
  publishedDate?: string;
  imageUrl?: string;
}

export const ArticleHero = ({ title, author, source, publishedDate, imageUrl }: ArticleHeroProps) => {
  const headerImage = imageUrl || null;
  
  return (
    <div className={`relative w-full ${headerImage ? 'h-[60vh]' : 'h-[40vh]'} mb-12`}>
      {headerImage ? (
        <>
          <img 
            src={headerImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-[#1A1F2C]/70 to-transparent"
            style={{ mixBlendMode: 'multiply' }}
          />
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#403E43] to-[#1A1F2C]" />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 max-w-3xl mx-auto text-white">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 text-sm sm:text-base text-zinc-200">
          {author && <span>{author}</span>}
          {author && source && <span>•</span>}
          {source && <span>{source}</span>}
          {((author || source) && publishedDate) && <span>•</span>}
          {publishedDate && (
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};