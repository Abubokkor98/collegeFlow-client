import { Trophy, Award, Camera, FileText, BookOpen, ExternalLink } from "lucide-react";

export default function CollegeActivities({ college }) {
  return (
    <>
      {/* Events and Sports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Events */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Campus Events</h2>
          </div>

          <div className="space-y-3">
            {college.events?.map((event, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">{event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sports */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg">
              <Award className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Sports Facilities
            </h2>
          </div>

          <div className="space-y-3">
            {college.sports?.map((sport, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">{sport}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Gallery */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg">
            <Camera className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Campus Gallery</h2>
        </div>

        {college.gallery?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {college.gallery.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img}
                  alt={`Campus ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No gallery images available for this college
            </p>
          </div>
        )}
      </div>

      {/* Research Publications */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg">
            <FileText className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Research Publications
          </h2>
        </div>

        {college.researchPapers?.length > 0 ? (
          <div className="space-y-4">
            {college.researchPapers.map((paper, i) => (
              <div
                key={i}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {paper.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-400 text-sm">
                        Research Publication
                      </span>
                    </div>
                  </div>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 text-orange-400 px-4 py-2 rounded-lg border border-orange-500/20 hover:border-orange-400/30 transition-all duration-300 hover:scale-105 group/btn"
                  >
                    <span className="text-sm font-medium">Read Paper</span>
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No research papers available for this college
            </p>
          </div>
        )}
      </div>
    </>
  );
}