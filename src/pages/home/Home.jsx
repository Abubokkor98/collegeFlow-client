import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CollegeCard from "../../components/college/CollegeCard";
import { Search, Star, Users, BookOpen, Award } from "lucide-react";

export default function Home() {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => axiosPublic.get("/colleges").then((res) => res.data),
  });

  const { data: galleryImages = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => axiosPublic.get("/gallery-images").then((res) => res.data),
  });

  const { data: researchPapers = [] } = useQuery({
    queryKey: ["research-papers"],
    queryFn: () => axiosPublic.get("/research-papers").then((res) => res.data),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => axiosPublic.get("/reviews").then((res) => res.data),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) return setSearchResults([]);

    const results = colleges.filter((college) =>
      college.name.toLowerCase().includes(term)
    );
    setSearchResults(results);
    if (!results.length) toast.error("No colleges found with that name");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Hero Section */}
        <section className="text-center py-20">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Find Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Perfect College
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover amazing colleges, explore research opportunities, and find your academic home with our comprehensive college finder.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto mt-10"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search colleges by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
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
                <div className="text-3xl font-bold text-white">{researchPapers.length}+</div>
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
          </div>
        </section>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Search Results</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((college) => (
                <CollegeCard key={college._id} college={college} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Colleges */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Colleges</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Explore our handpicked selection of top-rated colleges and universities
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-gray-600 border-t-blue-500 animate-spin"></div>
                <div className="mt-4 text-center text-gray-400">Loading colleges...</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {colleges.slice(0, 6).map((college) => (
                <CollegeCard key={college._id} college={college} />
              ))}
            </div>
          )}
        </section>

        {/* Campus Gallery */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Campus Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Take a virtual tour of beautiful college campuses
            </p>
          </div>
          
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {galleryImages.slice(0, 8).map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white font-medium">Campus View {idx + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-12 h-12 text-gray-500" />
              </div>
              <p className="text-gray-400">No gallery images available at the moment.</p>
            </div>
          )}
        </section>

        {/* Research Papers */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Research</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Discover groundbreaking research from leading academic institutions
            </p>
          </div>
          
          {researchPapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchPapers.slice(0, 6).map((paper, index) => (
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
              <p className="text-gray-400">No research papers available at the moment.</p>
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Student Reviews</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Hear what students have to say about their college experiences
            </p>
          </div>
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.slice(0, 6).map((review) => (
                <div
                  key={review._id}
                  className="group relative p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
                        {review.reviewerName?.charAt(0) || "A"}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {review.reviewerName || "Anonymous"}
                        </p>
                        <div className="flex space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <blockquote className="text-gray-300 italic leading-relaxed">
                      "{review.comment}"
                    </blockquote>
                    
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-400">
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                      <span className="text-blue-400 font-medium">
                        {review.collegeName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-500" />
              </div>
              <p className="text-gray-400">No reviews available at the moment.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}