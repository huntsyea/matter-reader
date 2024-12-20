import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

export interface ArticleMetadata {
  title: string;
  author: string | null;
  publishedDate: string | null;
  source: string;
  imageUrl: string | null;
}

export const extractMetadata = (doc: Document, url: string): ArticleMetadata => {
  const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                doc.querySelector('title')?.textContent || 
                'Untitled';

  const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || 
                doc.querySelector('meta[property="article:author"]')?.getAttribute('content') || 
                null;

  const publishedDate = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') || 
                       null;

  const source = new URL(url).hostname;

  const imageUrl = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || 
                  null;

  return {
    title,
    author,
    publishedDate,
    source,
    imageUrl
  };
};