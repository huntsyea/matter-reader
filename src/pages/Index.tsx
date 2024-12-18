import { Sidebar } from "@/components/Sidebar";
import { ArticleList } from "@/components/ArticleList";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <ArticleList />
      </main>
    </div>
  );
};

export default Index;