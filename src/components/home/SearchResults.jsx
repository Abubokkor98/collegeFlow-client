import CollegeCard from "../college/CollegeCard";

export default function SearchResults({ results }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Search Results</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </section>
  );
}
