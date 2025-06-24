export default function AddReview({
  admission,
  reviewText,
  rating,
  onReviewTextChange,
  onRatingChange,
  onSubmit,
}) {
  return (
    <section className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Add a Review</h2>
      <form onSubmit={(e) => onSubmit(e, admission)} className="space-y-6">
        <div>
          <label className="text-gray-300 block mb-2">Your Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => onRatingChange(admission.collegeId, star)}
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
              onReviewTextChange(admission.collegeId, e.target.value)
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
  );
}
