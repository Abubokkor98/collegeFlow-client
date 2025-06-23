import { Award, BookOpen, Users } from "lucide-react";

export default function StatsSection({ colleges, researchPapers, reviews }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-10">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8 text-blue-400" />
        </div>
        <div className="text-3xl font-bold text-white">{colleges.length}+</div>
        <div className="text-gray-400">Colleges</div>
      </div>
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto">
          <Award className="w-8 h-8 text-purple-400" />
        </div>
        <div className="text-3xl font-bold text-white">
          {researchPapers.length}+
        </div>
        <div className="text-gray-400">Research Papers</div>
      </div>
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto">
          <Users className="w-8 h-8 text-pink-400" />
        </div>
        <div className="text-3xl font-bold text-white">{reviews.length}+</div>
        <div className="text-gray-400">Student Reviews</div>
      </div>
    </div>
  );
}
