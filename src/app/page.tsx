import Chat from '@/components/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-sky-200 to-teal-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col py-8 sm:py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Claude Citations Demo
        </h1>
        <div className="flex-grow max-w-4xl mx-auto w-full">
          <Chat />
        </div>
      </div>
    </div>
  );
}
