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
        
        // Common blog elements to preserve
        const preservedElements = [
          // Text formatting
          'P', 'STRONG', 'EM', 'B', 'I', 'U', 'MARK', 'SUP', 'SUB', 'SMALL', 'DEL', 'INS',
          // Headers
          'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
          // Lists
          'UL', 'OL', 'LI', 'DL', 'DT', 'DD',
          // Tables
          'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD',
          // Code
          'CODE', 'PRE', 'KBD', 'SAMP',
          // Quotes and citations
          'BLOCKQUOTE', 'Q', 'CITE',
          // Media and figures
          'IMG', 'FIGURE', 'FIGCAPTION',
          // Other structural elements
          'DIV', 'SPAN', 'HR', 'BR',
          // Definition and details
          'DFN', 'ABBR', 'DETAILS', 'SUMMARY',
          // Links and references
          'A'
        ]
        
        if (node.tagName === 'A') {
          const href = node.getAttribute('href')
          if (href) {
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
            const absoluteUrl = new URL(src, url).href
            const alt = node.getAttribute('alt') || ''
            const title = node.getAttribute('title') || ''
            return `<img src="${absoluteUrl}" alt="${alt}" title="${title}" loading="lazy" />`
          }
          return ''
        }

        if (preservedElements.includes(node.tagName)) {
          const innerContent = Array.from(node.childNodes)
            .map(child => processNode(child))
            .join('')
          
          // Preserve class names and other relevant attributes
          const attrs = Array.from(node.attributes || [])
            .filter(attr => ['class', 'id', 'lang', 'dir'].includes(attr.name))
            .map(attr => `${attr.name}="${attr.value}"`)
            .join(' ')
          
          const attrString = attrs ? ` ${attrs}` : ''
          
          return `<${node.tagName.toLowerCase()}${attrString}>${innerContent}</${node.tagName.toLowerCase()}>`
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

    console.log('Successfully parsed article with enhanced element support')

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
