import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    console.log("Parsing article URL:", url);

    // Fetch the article HTML
    const response = await fetch(url)
    const html = await response.text()
    
    // Parse the HTML
    const doc = new DOMParser().parseFromString(html, 'text/html')
    if (!doc) throw new Error('Failed to parse HTML')

    // Extract metadata
    const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                 doc.querySelector('title')?.textContent ||
                 ''

    const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') ||
                  doc.querySelector('meta[property="article:author"]')?.getAttribute('content') ||
                  ''

    const publishedDate = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                         doc.querySelector('time')?.getAttribute('datetime') ||
                         null

    const imageUrl = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                    doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
                    ''

    const source = new URL(url).hostname.replace('www.', '')

    // Extract main content (this is a simple implementation)
    const article = doc.querySelector('article') ||
                   doc.querySelector('main') ||
                   doc.querySelector('.content') ||
                   doc.querySelector('.article-content')

    let content = ''
    if (article) {
      // Remove unwanted elements
      article.querySelectorAll('script, style, nav, header, footer, .ad, .advertisement').forEach(el => el.remove())
      content = article.textContent || ''
    }

    // Clean up the content
    content = content.trim()
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .substring(0, 10000) // Limit content length

    console.log("Parsed article data:", { title, author, publishedDate, source, imageUrl });

    return new Response(
      JSON.stringify({
        title,
        content,
        author,
        publishedDate,
        source,
        imageUrl,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error("Error parsing article:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})