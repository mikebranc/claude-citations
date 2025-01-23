import { documents } from '@/data/documents';
import { NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';

interface TextBlock {
  type: 'text';
  text: string;
  citations?: Array<{
    quote: string;
    document_index: number;
    start_char_index: number;
    end_char_index: number;
  }>;
}

interface MessageBlock {
  text: string;
  citation?: {
    documentId: string;
    documentTitle: string;
    citedText: string;
    startIndex: number;
    endIndex: number;
  };
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Format documents for Claude's API
    const formattedDocs = documents.map(doc => ({
      type: "document",
      source: {
        type: "text",
        media_type: "text/plain",
        data: doc.content
      },
      title: doc.title,
      context: `This is document ${doc.id}`,
      citations: { enabled: true }
    }));

    const content = [
      ...formattedDocs,
      {
        type: "text",
        text: message
      }
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': ANTHROPIC_API_KEY!,
        'Anthropic-Version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: content
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch from Claude API');
    }

    const data = await response.json();
    console.log('Claude Response:', JSON.stringify(data, null, 2));
    
    // Process text blocks and citations together
    const messageBlocks: MessageBlock[] = [];
    
    data.content.forEach((block: TextBlock) => {
      if (block.type === 'text') {
        if (block.citations && block.citations.length > 0) {
          // For cited text, create a block with citation
          block.citations.forEach(citation => {
            const doc = documents[citation.document_index];
            messageBlocks.push({
              text: block.text,
              citation: {
                documentId: doc.id,
                documentTitle: doc.title,
                citedText: citation.quote,
                startIndex: citation.start_char_index,
                endIndex: citation.end_char_index
              }
            });
          });
        } else {
          // For uncited text, create a block without citation
          messageBlocks.push({ text: block.text });
        }
      }
    });

    return NextResponse.json({
      blocks: messageBlocks
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 