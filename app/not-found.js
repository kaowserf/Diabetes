import Link from 'next/link';

export const viewport = {
  themeColor: '#1a73e8',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find the page you were looking for. It might have been moved or deleted.
      </p>
      <Link 
        href="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
} 