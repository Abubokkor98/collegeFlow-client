import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../components/loader/Loading";
import CollegeInformation from "../../components/myCollege/CollegeInformation";
import AddReview from "../../components/myCollege/AddReview";
import CollegeReviews from "../../components/myCollege/CollegeReviews";

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

  const handleReviewTextChange = (collegeId, value) => {
    setReviewTextMap((prev) => ({ ...prev, [collegeId]: value }));
  };

  const handleRatingChange = (collegeId, rating) => {
    setRatingMap((prev) => ({ ...prev, [collegeId]: rating }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-12 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">My College</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {admissionsLoading ? (
          <Loading />
        ) : admissions.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              You haven't applied to any colleges yet.
            </p>
            <a
              href="/colleges"
              className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
            >
              Browse Colleges
            </a>
          </div>
        ) : (
          <div className="space-y-16">
            {admissions.map((admission) => {
              const collegeReviews = reviews.filter(
                (r) => r.collegeId === admission.collegeId
              );
              const reviewText = reviewTextMap[admission.collegeId] || "";
              const rating = ratingMap[admission.collegeId] || 5;

              return (
                <div key={admission._id} className="space-y-8">
                  <CollegeInformation admission={admission} />

                  <AddReview
                    admission={admission}
                    reviewText={reviewText}
                    rating={rating}
                    onReviewTextChange={handleReviewTextChange}
                    onRatingChange={handleRatingChange}
                    onSubmit={handleAddReview}
                  />

                  <CollegeReviews reviews={collegeReviews} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
