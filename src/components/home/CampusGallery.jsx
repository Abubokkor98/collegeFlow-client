import { BookOpen } from "lucide-react";
import Loading from "../loader/Loading";

export default function CampusGallery({ images, isLoading }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Campus Gallery</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Take a virtual tour of beautiful college campuses
        </p>
      </div>

      {isLoading ? (
        <Loading />
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.slice(0, 8).map((img, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white font-medium">
                  Campus View {idx + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-12 h-12 text-gray-500" />
          </div>
          <p className="text-gray-400">
            No gallery images available at the moment.
          </p>
        </div>
      )}
    </section>
  );
}
