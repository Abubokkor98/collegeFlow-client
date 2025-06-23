import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CollegeCard from "../../components/college/CollegeCard";

export default function Colleges() {
  const axiosPublic = useAxiosPublic();

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => axiosPublic.get("/colleges").then((res) => res.data),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            Explore Colleges
          </h1>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
            Browse through our curated list of colleges and universities. Find the perfect institution that aligns with your academic aspirations and personal interests.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <span className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
              <p className="text-gray-300">Loading colleges...</p>
            </div>
          </div>
        ) : (
          /* College Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <CollegeCard key={college._id} college={college} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
