import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    console.log('Parsing article from URL:', url)

    // Fetch the article HTML
    const response = await fetch(url)
    const html = await response.text()
    console.log('Fetched HTML content')

    // Parse the HTML using Deno DOM
    const doc = new DOMParser().parseFromString(html, 'text/html')
    if (!doc) {
      throw new Error('Failed to parse HTML')
    }

    // Extract metadata
    const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                 doc.querySelector('title')?.textContent || 
                 'Untitled'

    const author = doc.querySelector('meta[name="author"]')?.getAttribute('content') || 
                  doc.querySelector('meta[property="article:author"]')?.getAttribute('content') || 
                  null

    const publishedDate = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') || 
                         null

    const source = new URL(url).hostname

    const imageUrl = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || 
                    null

    // Extract main content (this is a simple implementation)
    const articleElement = doc.querySelector('article') || 
                         doc.querySelector('.article-content') || 
                         doc.querySelector('.post-content') ||
                         doc.querySelector('main')

    let content = ''
    if (articleElement) {
      // Remove script tags
      articleElement.querySelectorAll('script').forEach(script => script.remove())
      content = articleElement.textContent?.trim() || ''
    }

    // Limit content length if needed
    const maxLength = 5000
    if (content.length > maxLength) {
      content = content.substring(0, maxLength) + '...'
    }

    const parsedData = {
      title,
      content,
      author,
      publishedDate,
      source,
      imageUrl
    }

    console.log('Successfully parsed article:', parsedData)

    return new Response(
      JSON.stringify(parsedData),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )

  } catch (error) {
    console.error('Error parsing article:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})