export default function CollegeReviews({ reviews }) {
  return (
    <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">College Reviews</h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="p-4 bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-white">
                {review.reviewerName || "Anonymous"}
              </h3>
              <p className="text-gray-400">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          No reviews available for this college
        </p>
      )}
    </section>
  );
}
