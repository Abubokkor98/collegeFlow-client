import { Search } from "lucide-react";

export default function SearchForm({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
