import { useLocation, useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AdmissionCollegeList() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => axiosPublic.get("/colleges").then((res) => res.data),
  });

  const handleApplyClick = (collegeId) => {
    if (!user) {
      toast.error("Please login to apply");
      navigate("/login", { state: { from: location } });
      return;
    }
    navigate(`/admission/${collegeId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
        <span className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
        <p className="mt-4 text-gray-300">Loading colleges...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">Start Your Admission Process</h1>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
            Select a college to begin your admission application. Fill out the
            form with your details to apply.
          </p>
        </div>

        {/* College List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <div
              key={college._id}
              className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 text-white">
                <h2 className="text-xl font-semibold line-clamp-2">{college.name}</h2>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Admission Dates:</span>{" "}
                  {college.admissionDates}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleApplyClick(college._id)}
                    className="relative block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Apply Now
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
