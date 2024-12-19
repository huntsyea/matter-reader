import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { JSDOM } from "https://esm.sh/jsdom@22.1.0"

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

    // Parse the HTML using JSDOM
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract metadata
    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                 document.querySelector('title')?.textContent || 
                 'Untitled'

    const author = document.querySelector('meta[name="author"]')?.getAttribute('content') || 
                  document.querySelector('meta[property="article:author"]')?.getAttribute('content') || 
                  null

    const publishedDate = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content') || 
                         null

    const source = new URL(url).hostname

    const imageUrl = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || 
                    null

    // Extract main content (this is a simple implementation)
    const articleElement = document.querySelector('article') || 
                         document.querySelector('.article-content') || 
                         document.querySelector('.post-content') ||
                         document.querySelector('main')

    let content = ''
    if (articleElement) {
      // Remove script tags and other unwanted elements
      articleElement.querySelectorAll('script, style, nav, header, footer').forEach(el => el.remove())
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