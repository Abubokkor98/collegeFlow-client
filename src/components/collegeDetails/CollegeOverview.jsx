import { Star, Calendar, MapPin, Users, Beaker, ExternalLink } from "lucide-react";

export default function CollegeOverview({ college, onApplyClick }) {
  return (
    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>

      <div className="relative flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-2/5 relative overflow-hidden">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

          {/* Rating Badge */}
          <div className="absolute top-6 right-6 flex items-center space-x-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">
              {college.rating}/5
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-3/5 p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {college.name}
            </h1>
            <div className="flex items-center space-x-2 text-blue-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                Premier Educational Institution
              </span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Admission Dates
                </span>
                <p className="text-white font-medium">
                  {college.admissionDates}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Admission Process
                </span>
                <p className="text-white font-medium">
                  {college.admissionProcess}
                </p>
              </div>
            </div>
          </div>

          {/* Research History */}
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mt-1">
              <Beaker className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Research Excellence
              </span>
              <p className="text-gray-300 leading-relaxed">
                {college.researchHistory}
              </p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="pt-4">
            <button
              onClick={onApplyClick}
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-3 group"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />

              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}