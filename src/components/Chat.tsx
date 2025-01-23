'use client';

import { useState } from 'react';
import Link from 'next/link';

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

interface Message {
  role: 'user' | 'assistant';
  blocks?: MessageBlock[];
  content?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        blocks: data.blocks
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[600px] h-full flex flex-col bg-gray-900/80 rounded-xl shadow-2xl overflow-hidden border border-white/10">
      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <div key={index} className={`flex flex-col ${message.role === 'assistant' ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === 'assistant' 
                  ? 'bg-gray-800/80 text-white/90' 
                  : 'bg-blue-600/80 text-white/90'
              }`}>
                <div className="text-sm font-medium mb-1 text-white/90">
                  {message.role === 'user' ? 'You' : 'Claude'}
                </div>
                {message.content ? (
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                ) : (
                  <div className="text-sm space-y-2">
                    {message.blocks?.map((block, blockIndex) => (
                      <div key={blockIndex} className="whitespace-pre-line">
                        {block.text}
                        {block.citation && (
                          <Link
                            href={`/documents/${block.citation.documentId}?start=${block.citation.startIndex}&end=${block.citation.endIndex}`}
                            className="inline-flex items-center ml-1 text-xs text-blue-200 hover:text-blue-100 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>[{block.citation.documentTitle}]</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-white/70">
              <div className="animate-pulse">●</div>
              <div className="animate-pulse animation-delay-200">●</div>
              <div className="animate-pulse animation-delay-400">●</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-950/50 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-800/50 border border-white/10 px-4 py-2 text-sm text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            placeholder="Ask a question..."
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent group"
            aria-label="Send message"
          >
            <svg 
              className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
} 