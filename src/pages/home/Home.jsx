import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import HeroSection from "../../components/home/HeroSection";
import SearchForm from "../../components/home/SearchForm";
import StatsSection from "../../components/home/StatsSection";
import FeaturedColleges from "../../components/home/FeaturedColleges";
import CampusGallery from "../../components/home/CampusGallery";
import ResearchPapers from "../../components/home/ResearchPapers";
import StudentReviews from "../../components/home/StudentReviews";
import SearchResults from "../../components/home/SearchResults";

export default function Home() {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: colleges = [], isLoading: collegeLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => axiosPublic.get("/colleges").then((res) => res.data),
  });

  const { data: galleryImages = [], isLoading: galleryLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => axiosPublic.get("/gallery-images").then((res) => res.data),
  });

  const { data: researchPapers = [], isLoading: researchPaperLoading } =
    useQuery({
      queryKey: ["research-papers"],
      queryFn: () =>
        axiosPublic.get("/research-papers").then((res) => res.data),
    });

  const { data: reviews = [], isLoading: reviewLoading } = useQuery({
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
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <HeroSection />

          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />

          <StatsSection
            colleges={colleges}
            researchPapers={researchPapers}
            reviews={reviews}
          />
        </div>

        <div className="space-y-20 mt-16">
          {searchResults.length > 0 && (
            <SearchResults results={searchResults} />
          )}

          <FeaturedColleges colleges={colleges} isLoading={collegeLoading} />

          <CampusGallery images={galleryImages} isLoading={galleryLoading} />

          <ResearchPapers
            papers={researchPapers}
            isLoading={researchPaperLoading}
          />

          <StudentReviews reviews={reviews} isLoading={reviewLoading} />
        </div>
      </main>
    </div>
  );
}
