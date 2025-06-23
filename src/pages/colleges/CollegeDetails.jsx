import { Link, useNavigate, useParams } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  Calendar,
  Trophy,
  Beaker,
  ExternalLink,
  MapPin,
  Users,
  Award,
  BookOpen,
  Camera,
  FileText,
} from "lucide-react";

export default function CollegeDetails() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    data: college,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["college", id],
    queryFn: () => axiosPublic.get(`/college/${id}`).then((res) => res.data),
  });

  const handleApplyClick = () => {
    navigate(`/admission/${college._id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-gray-600 border-t-blue-500 animate-spin mx-auto mb-4"></div>
          </div>
          <p className="text-gray-300 text-lg">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (isError || !college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            College not found
          </h2>
          <Link
            to="/colleges"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Browse Colleges</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
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
                  onClick={handleApplyClick}
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
      </div>
    </div>
  );
}
