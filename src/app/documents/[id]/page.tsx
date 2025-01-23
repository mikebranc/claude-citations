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
      <span className="bg-yellow-500/20 text-white px-0.5 rounded">
        {content.slice(startIndex, endIndex)}
      </span>
      {content.slice(endIndex)}
    </>
  ) : (
    content
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-sky-200 to-teal-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col py-8 sm:py-12">
        <div className="max-w-4xl mx-auto w-full">
          <Link 
            href="/" 
            className="inline-flex items-center mb-6 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Chat
          </Link>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl overflow-hidden border border-white/10">
            <div className="p-6 sm:p-8">
              <h1 className="text-3xl font-bold mb-6 text-white/90">
                {document.title}
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  {highlightedContent}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 