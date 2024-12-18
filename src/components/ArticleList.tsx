import { ArticleCard } from "./ArticleCard";

const MOCK_ARTICLES = [
  {
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development, from WebAssembly to Edge Computing.",
    source: "TechCrunch",
    date: "2h ago",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    title: "Understanding Modern JavaScript",
    excerpt: "A deep dive into the modern JavaScript ecosystem and how it has evolved over the years.",
    source: "Dev.to",
    date: "4h ago"
  },
  {
    title: "Building Scalable Applications",
    excerpt: "Learn the best practices for building scalable applications that can handle millions of users.",
    source: "Medium",
    date: "6h ago",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
  }
];

export const ArticleList = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
      {MOCK_ARTICLES.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  );
};