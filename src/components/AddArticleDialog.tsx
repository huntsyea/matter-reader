import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AddArticleDialog = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting article URL:", url);
      
      // Call the parse-article edge function
      const { data: parsedArticle, error: parseError } = await supabase.functions.invoke('parse-article', {
        body: { url }
      });

      if (parseError) throw parseError;

      console.log("Parsed article data:", parsedArticle);

      // Insert the article into the database
      const { error: insertError } = await supabase
        .from('articles')
        .insert([{
          url,
          title: parsedArticle.title,
          content: parsedArticle.content,
          author: parsedArticle.author,
          published_date: parsedArticle.publishedDate,
          source: parsedArticle.source,
          image_url: parsedArticle.imageUrl,
        }]);

      if (insertError) throw insertError;

      toast({
        title: "Article added successfully",
        description: "Your article has been added to your reading list.",
      });

      setIsOpen(false);
      setUrl("");
    } catch (error) {
      console.error("Error adding article:", error);
      toast({
        title: "Error adding article",
        description: "There was an error adding your article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Article</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            placeholder="Enter article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Article"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};