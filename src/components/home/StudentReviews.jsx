import { Star, Users } from "lucide-react";
import Loading from "../loader/Loading";

export default function StudentReviews({ reviews, isLoading }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Student Reviews</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Hear what students have to say about their college experiences
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : reviews.length > 0 ? (
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
  );
}
