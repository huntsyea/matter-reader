import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { parseWithReadability } from "./readabilityParser.ts";
import { extractMetadata } from "./metadataExtractor.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    console.log('Parsing article from URL:', url);

    const response = await fetch(url);
    const html = await response.text();
    console.log('Fetched HTML content');

    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (!doc) {
      throw new Error('Failed to parse HTML');
    }

    // Extract metadata first
    const metadata = extractMetadata(doc, url);
    
    // Parse content with Readability
    const article = parseWithReadability(html, url);
    if (!article) {
      throw new Error('Failed to parse article content');
    }

    const parsedData = {
      title: metadata.title,
      content: article.content,
      author: metadata.author,
      publishedDate: metadata.publishedDate,
      source: metadata.source,
      imageUrl: metadata.imageUrl,
      excerpt: article.excerpt,
      textContent: article.textContent,
      length: article.length,
    };

    console.log('Successfully parsed article with content length:', parsedData.content.length);

    return new Response(
      JSON.stringify(parsedData),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );

  } catch (error) {
    console.error('Error parsing article:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});