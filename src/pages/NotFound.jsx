import { Link } from "react-router";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-6">
      <div className="relative text-center max-w-lg mx-auto">
        {/* Decorative Glow */}
        <div className="absolute -inset-2 opacity-25 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur-lg"></div>

        {/* Main Content */}
        <div className="relative bg-white/5 backdrop-blur-md border border-gray-700 rounded-lg p-8 shadow-xl">
          <h1 className="text-8xl font-extrabold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-8">
            The page you’re looking for doesn’t exist or has been moved. Don’t worry, let’s get you back on track.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            Go Back Home
          </Link>
        </div>

        {/* Assistance Card */}
        <div className="mt-10 bg-white/10 border border-gray-700 rounded-lg p-6 shadow-lg flex items-start space-x-4">
          <Compass className="text-blue-400 w-10 h-10 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-white">Need Assistance?</h3>
            <p className="text-gray-400 mt-2">
              Sometimes, it's easy to feel lost. Let us guide you back and help you explore more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
