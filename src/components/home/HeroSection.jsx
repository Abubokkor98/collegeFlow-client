export default function HeroSection() {
  return (
    <section className="text-center pt-10">
      <div className="space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Find Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Perfect College
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Discover amazing colleges, explore research opportunities, and find
          your academic home with our comprehensive college finder.
        </p>
      </div>
    </section>
  );
}
