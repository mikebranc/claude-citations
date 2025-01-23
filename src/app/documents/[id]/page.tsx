import { documents } from "@/data/documents";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DocumentPage({ 
  params,
  searchParams
}: Props) {
  // Await both params and searchParams
  const { id } = await params;
  const { start, end } = await searchParams;

  const document = documents.find((doc) => doc.id === id);

  // Parse the search params, handling both string and array cases
  const startIndex = start ? parseInt(Array.isArray(start) ? start[0] : start) : undefined;
  const endIndex = end ? parseInt(Array.isArray(end) ? end[0] : end) : undefined;

  if (!document) {
    notFound();
  }

  const content = document.content;
  const highlightedContent = startIndex !== undefined && endIndex !== undefined ? (
    <>
      {content.slice(0, startIndex)}
      <span className="bg-yellow-200 dark:bg-yellow-900">
        {content.slice(startIndex, endIndex)}
      </span>
      {content.slice(endIndex)}
    </>
  ) : (
    content
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center mb-6 text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Chat
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {document.title}
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {highlightedContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 