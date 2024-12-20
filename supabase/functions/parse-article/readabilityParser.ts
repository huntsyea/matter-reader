import { Readability } from "@mozilla/readability";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

export interface ParsedArticle {
  title: string;
  content: string;
  textContent: string;
  length: number;
  excerpt: string;
  siteName: string;
}

export const parseWithReadability = (html: string, url: string): ParsedArticle | null => {
  console.log('Parsing article with Readability');
  const doc = new DOMParser().parseFromString(html, 'text/html');
  
  if (!doc) {
    console.error('Failed to parse HTML');
    return null;
  }

  // Set the document's location to help Readability resolve relative URLs
  doc.location = url;
  
  const reader = new Readability(doc);
  const article = reader.parse();
  
  if (!article) {
    console.error('Readability failed to parse article');
    return null;
  }

  console.log('Successfully parsed article with Readability');
  return article;
};