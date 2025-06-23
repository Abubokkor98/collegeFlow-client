import CollegeCard from "../college/CollegeCard";

export default function FeaturedColleges({ colleges, isLoading }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Featured Colleges
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Explore our handpicked selection of top-rated colleges and
          universities
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-gray-600 border-t-blue-500 animate-spin"></div>
            <div className="mt-4 text-center text-gray-400">
              Loading colleges...
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.slice(0, 6).map((college) => (
            <CollegeCard key={college._id} college={college} />
          ))}
        </div>
      )}
    </section>
  );
}
