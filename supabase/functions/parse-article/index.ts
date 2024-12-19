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

    // Enhanced content extraction
    const possibleContentSelectors = [
      'article',
      '[role="article"]',
      '.article-content',
      '.post-content',
      '.entry-content',
      '.content',
      'main',
      '.main',
      '#main-content',
      '.blog-post',
      '.post',
      '.article',
      '.story-content'
    ];

    let mainContent = null;
    for (const selector of possibleContentSelectors) {
      const element = doc.querySelector(selector);
      if (element && element.textContent.trim().length > 100) {
        mainContent = element;
        break;
      }
    }

    // If no main content container found, try to find the largest text container
    if (!mainContent) {
      console.log('No main content found with selectors, searching for largest text container');
      const allElements = doc.querySelectorAll('div, section, main');
      let maxTextLength = 0;
      
      allElements.forEach(element => {
        const textLength = element.textContent.trim().length;
        if (textLength > maxTextLength && textLength > 500) {
          maxTextLength = textLength;
          mainContent = element;
        }
      });
    }

    let content = '';
    if (mainContent) {
      console.log('Found main content container');
      
      // Remove unwanted elements
      const unwantedSelectors = [
        'script', 'style', 'iframe', 'nav', 'header', 'footer',
        '.advertisement', '.social-share', '.comments', '.sidebar',
        '.nav', '.menu', '.footer', '.header', '.ad', '.share',
        '.related-posts', '.newsletter', '.subscription'
      ];
      
      unwantedSelectors.forEach(selector => {
        mainContent.querySelectorAll(selector).forEach(el => el.remove());
      });
      
      // Process remaining content
      const processNode = (node) => {
        if (node.nodeType === 3) { // Text node
          return node.textContent;
        }
        
        // Common blog elements to preserve
        const preservedElements = [
          'P', 'STRONG', 'EM', 'B', 'I', 'U', 'MARK', 'SUP', 'SUB', 'SMALL', 'DEL', 'INS',
          'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
          'UL', 'OL', 'LI', 'DL', 'DT', 'DD',
          'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD',
          'CODE', 'PRE', 'KBD', 'SAMP',
          'BLOCKQUOTE', 'Q', 'CITE',
          'IMG', 'FIGURE', 'FIGCAPTION',
          'DIV', 'SPAN', 'HR', 'BR',
          'DFN', 'ABBR', 'DETAILS', 'SUMMARY',
          'A'
        ];
        
        if (node.tagName === 'A') {
          const href = node.getAttribute('href');
          if (href) {
            try {
              const absoluteUrl = new URL(href, url).href;
              const innerContent = Array.from(node.childNodes)
                .map(child => processNode(child))
                .join('');
              return `<a href="${absoluteUrl}" target="_blank" rel="noopener noreferrer">${innerContent}</a>`;
            } catch (e) {
              console.log('Error processing link:', e);
              return '';
            }
          }
          return '';
        }

        if (node.tagName === 'IMG') {
          const src = node.getAttribute('src');
          if (src) {
            try {
              const absoluteUrl = new URL(src, url).href;
              const alt = node.getAttribute('alt') || '';
              const title = node.getAttribute('title') || '';
              return `<img src="${absoluteUrl}" alt="${alt}" title="${title}" loading="lazy" />`;
            } catch (e) {
              console.log('Error processing image:', e);
              return '';
            }
          }
          return '';
        }

        if (preservedElements.includes(node.tagName)) {
          const innerContent = Array.from(node.childNodes)
            .map(child => processNode(child))
            .join('');
          
          const attrs = Array.from(node.attributes || [])
            .filter(attr => ['class', 'id', 'lang', 'dir'].includes(attr.name))
            .map(attr => `${attr.name}="${attr.value}"`)
            .join(' ');
          
          const attrString = attrs ? ` ${attrs}` : '';
          
          return `<${node.tagName.toLowerCase()}${attrString}>${innerContent}</${node.tagName.toLowerCase()}>`;
        }

        // For other elements, just process their children
        return Array.from(node.childNodes)
          .map(child => processNode(child))
          .join('');
      };

      content = processNode(mainContent);
      console.log('Successfully processed content, length:', content.length);
    } else {
      console.log('No suitable content container found');
    }

    const parsedData = {
      title,
      content,
      author,
      publishedDate,
      source,
      imageUrl
    };

    console.log('Successfully parsed article with content length:', content.length);

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