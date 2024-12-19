import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    console.log('Parsing article from URL:', url)

    const response = await fetch(url)
    const html = await response.text()
    console.log('Fetched HTML content')

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

    // Find the main content container
    const articleElement = doc.querySelector('article') || 
                         doc.querySelector('.article-content') || 
                         doc.querySelector('.post-content') ||
                         doc.querySelector('main')

    let content = ''
    if (articleElement) {
      // Remove unwanted elements
      articleElement.querySelectorAll('script, style, iframe, nav, header, footer, .advertisement, .social-share, .comments').forEach(el => el.remove())
      
      // Process remaining content
      const processNode = (node) => {
        if (node.nodeType === 3) { // Text node
          return node.textContent
        }
        
        if (node.tagName === 'A') {
          const href = node.getAttribute('href')
          if (href) {
            // Convert relative URLs to absolute
            const absoluteUrl = new URL(href, url).href
            const innerContent = Array.from(node.childNodes)
              .map(child => processNode(child))
              .join('')
            return `<a href="${absoluteUrl}" target="_blank" rel="noopener noreferrer">${innerContent}</a>`
          }
          return ''
        }

        if (node.tagName === 'IMG') {
          const src = node.getAttribute('src')
          if (src) {
            // Convert relative URLs to absolute
            const absoluteUrl = new URL(src, url).href
            return `<img src="${absoluteUrl}" alt="${node.getAttribute('alt') || ''}" loading="lazy" />`
          }
          return ''
        }

        // Preserve all common HTML elements
        if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 
             'UL', 'OL', 'LI', 'STRONG', 'EM', 'B', 'I', 'CODE', 
             'PRE', 'HR', 'BR', 'DIV', 'SPAN', 'FIGURE', 'FIGCAPTION'].includes(node.tagName)) {
          const innerContent = Array.from(node.childNodes)
            .map(child => processNode(child))
            .join('')
          
          // Preserve class names for certain elements
          const classAttr = node.getAttribute('class')
          const classString = classAttr ? ` class="${classAttr}"` : ''
          
          return `<${node.tagName.toLowerCase()}${classString}>${innerContent}</${node.tagName.toLowerCase()}>`
        }

        // For other elements, just process their children
        return Array.from(node.childNodes)
          .map(child => processNode(child))
          .join('')
      }

      content = processNode(articleElement)
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