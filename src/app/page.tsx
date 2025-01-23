import Chat from '@/components/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col py-8 sm:py-12">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
          Claude Citations Demo
        </h1>
        <div className="flex-grow max-w-4xl mx-auto w-full">
          <Chat />
        </div>
      </div>
    </div>
  );
}
