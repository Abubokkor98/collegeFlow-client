import CollegeCard from "../college/CollegeCard";
import Loading from "../loader/Loading";

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
        <Loading />
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
