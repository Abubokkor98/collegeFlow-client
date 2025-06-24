import { useLocation, useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../components/loader/Loading";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            Start Your Admission Process
          </h1>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
            Select a college to begin your admission application. Fill out the
            form with your details to apply.
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          {
            /* College List Grid */
          }(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {colleges.map((college) => (
                <div
                  key={college._id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold mb-2">{college.name}</h2>
                  <p className="text-gray-600 mb-4">{college.description}</p>
                  <button
                    onClick={() => handleApplyClick(college._id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
