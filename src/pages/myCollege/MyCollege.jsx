import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function MyCollege() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviewTextMap, setReviewTextMap] = useState({});
  const [ratingMap, setRatingMap] = useState({});

  const { data: admissions = [], isLoading: admissionsLoading } = useQuery({
    queryKey: ["my-admissions", user?.email],
    queryFn: () => axiosSecure.get("/my-admissions").then((res) => res.data),
    enabled: !!user,
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: () => axiosSecure.get("/reviews").then((res) => res.data),
  });

  const handleAddReview = async (e, admission) => {
    e.preventDefault();
    const reviewText = reviewTextMap[admission.collegeId] || "";
    const rating = ratingMap[admission.collegeId] || 5;

    if (!user) {
      toast.error("Please login to add a review");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    const reviewData = {
      collegeId: admission.collegeId,
      collegeName: admission.collegeName,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      rating,
      comment: reviewText,
      date: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/add-review", reviewData);
      setReviewTextMap((prev) => ({ ...prev, [admission.collegeId]: "" }));
      toast.success("Review added successfully!");
      refetchReviews();
    } catch (error) {
      console.error("Failed to add review:", error);
      toast.error("Failed to add review");
    }
  };

  if (admissionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <p className="text-white text-lg">Loading your college information...</p>
      </div>
    );
  }

  if (admissions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <div className="text-center">
          <h1 className="text-3xl text-white font-bold mb-4">My College</h1>
          <p className="text-gray-300 mb-6">You haven’t applied to any colleges yet.</p>
          <a
            href="/colleges"
            className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
          >
            Browse Colleges
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-8">
      <div className="container mx-auto space-y-16">
        {admissions.map((admission) => {
          const collegeReviews = reviews.filter((r) => r.collegeId === admission.collegeId);
          const reviewText = reviewTextMap[admission.collegeId] || "";
          const rating = ratingMap[admission.collegeId] || 5;

          return (
            <div key={admission._id} className="space-y-8">
              {/* College Header */}
              <div className="text-center mb-2">
                <h1 className="text-4xl font-bold text-white">{admission.collegeName}</h1>
                <p className="text-gray-400 mt-2">Your selected college</p>
              </div>

              {/* Admission Details */}
              <section className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Admission Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
                  <p><span className="font-semibold text-white">Name:</span> {admission.candidate_name}</p>
                  <p><span className="font-semibold text-white">Email:</span> {admission.candidate_email}</p>
                  <p><span className="font-semibold text-white">Subject:</span> {admission.subject}</p>
                  <p>
                    <span className="font-semibold text-white">Status:</span>{" "}
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      admission.status === "approved" ? "bg-green-500" : "bg-yellow-500"
                    }`}>
                      {admission.status}
                    </span>
                  </p>
                </div>
              </section>

              {/* Add Review */}
              <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Add a Review</h2>
                <form onSubmit={(e) => handleAddReview(e, admission)} className="space-y-6">
                  <div>
                    <label className="text-gray-300 block mb-2">Your Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setRatingMap((prev) => ({
                              ...prev,
                              [admission.collegeId]: star,
                            }))
                          }
                          className={`w-8 h-8 rounded-full transition-colors ${
                            rating >= star ? "bg-yellow-400" : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-2">Your Review</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) =>
                        setReviewTextMap((prev) => ({
                          ...prev,
                          [admission.collegeId]: e.target.value,
                        }))
                      }
                      className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Share your experience with this college..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Submit Review
                  </button>
                </form>
              </section>

              {/* College Reviews */}
              <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">College Reviews</h2>
                {collegeReviews.length > 0 ? (
                  <div className="space-y-4">
                    {collegeReviews.map((review) => (
                      <div key={review._id} className="p-4 bg-gray-800 rounded-xl">
                        <h3 className="font-semibold text-white">{review.reviewerName || "Anonymous"}</h3>
                        <p className="text-gray-400">{review.comment}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">No reviews available for this college</p>
                )}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}
