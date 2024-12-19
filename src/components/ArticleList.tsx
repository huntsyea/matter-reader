import { ArticleCard } from "./ArticleCard";

const MOCK_ARTICLES = [
  {
    title: "OpenAI debuts GPT-4o 'omni' model n...",
    source: "TechCrunch",
    author: "John Gruber",
    date: "May 13",
    imageUrl: "https://techcrunch.com/wp-content/uploads/2019/03/openai-1.png"
  },
  {
    title: "HBRs 10 Must Reads 2024 The Definiti...",
    source: "PDF",
    date: "2023",
    type: "document"
  },
  {
    title: "The Second Mountain",
    source: "optimize.me",
    author: "About the author",
    date: "2022"
  },
  {
    title: "The Gary Halbert Letter",
    source: "thegaryhalbert.com",
    date: "2005"
  },
  {
    title: "The Nothingness of Money",
    author: "Lawrence Yeo",
    source: "More To That",
    date: "2021"
  }
];

export const ArticleList = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {MOCK_ARTICLES.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  );
};