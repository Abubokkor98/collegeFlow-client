import React from "react";
import { Link } from "react-router";
import { Star, Calendar, Trophy, Beaker, ExternalLink } from "lucide-react";

export default function CollegeCard({ college, variant = "home" }) {
  return (
    <div className="relative flex flex-col justify-between h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/30 group">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">
            {college.rating}/5
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative flex flex-col justify-between flex-grow p-6 space-y-4">
        {/* College Name */}
        <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
          {college.name}
        </h2>

        {/* Info Grid */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-white/80">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <span className="text-xs text-white/60 uppercase tracking-wider">
                Admission
              </span>
              <p className="text-sm font-medium">{college.admissionDates}</p>
            </div>
          </div>

          {variant === "home" && (
            <>
              {college.events && (
                <div className="flex items-start space-x-3 text-white/80">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-500/20 rounded-lg mt-1">
                    <Trophy className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-white/60 uppercase tracking-wider">
                      Events
                    </span>
                    <p className="text-sm font-medium">
                      {college.events.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {college.sports && (
                <div className="flex items-start space-x-3 text-white/80">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-lg mt-1">
                    <Trophy className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-white/60 uppercase tracking-wider">
                      Sports
                    </span>
                    <p className="text-sm font-medium">
                      {college.sports.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {college.researchHistory && (
                <div className="flex items-start space-x-3 text-white/80">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500/20 rounded-lg mt-1">
                    <Beaker className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-white/60 uppercase tracking-wider">
                      Research
                    </span>
                    <p className="text-sm font-medium line-clamp-2">
                      {college.researchHistory.substring(0, 80)}...
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {variant === "list" && (
            <>
              <div className="flex items-center space-x-3 text-white/80">
                <div className="flex items-center justify-center w-8 h-8 bg-orange-500/20 rounded-lg">
                  <Beaker className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <span className="text-xs text-white/60 uppercase tracking-wider">
                    Research Papers
                  </span>
                  <p className="text-sm font-medium">
                    {college.researchPapers?.length || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-white/80">
                <div className="flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-lg">
                  <Trophy className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-xs text-white/60 uppercase tracking-wider">
                    Sports Facilities
                  </span>
                  <p className="text-sm font-medium">
                    {college.sports?.length || 0}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Button Section - pushed to bottom */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link
            to={`/college/${college._id}`}
            className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group/btn"
          >
            <span>View Details</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
