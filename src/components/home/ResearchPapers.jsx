import { Award } from "lucide-react";
import Loading from "../loader/Loading";

export default function ResearchPapers({ papers, isLoading }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Featured Research
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Discover groundbreaking research from leading academic institutions
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : papers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {papers.slice(0, 6).map((paper, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                    Research
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-blue-400 font-medium">
                    {paper.collegeName}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <span>Read Paper</span>
                    <Award className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-12 h-12 text-gray-500" />
          </div>
          <p className="text-gray-400">
            No research papers available at the moment.
          </p>
        </div>
      )}
    </section>
  );
}
