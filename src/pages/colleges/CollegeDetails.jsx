import { Link, useNavigate, useParams } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import CollegeOverview from "../../components/collegeDetails/CollegeOverview";
import CollegeActivities from "../../components/collegeDetails/CollegeActivities";
import Loading from "../../components/loader/Loading";

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
    return <Loading />;
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
        <CollegeOverview college={college} onApplyClick={handleApplyClick} />
        <CollegeActivities college={college} />
      </div>
    </div>
  );
}
