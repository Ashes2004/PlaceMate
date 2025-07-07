export default function WelcomeSection({ name = "Ashes" }) {
  return (
    <section className="px-8 py-4">
      <div className="mb-4">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
          Welcome back, <span className="text-blue-600">{name}</span> 👋
        </h2>
        <p className="text-lg font-medium text-gray-700">
          PlaceMate — Your Personal Career Companion
        </p>
      </div>

      <p className="text-gray-600 text-base max-w-3xl leading-relaxed">
        Dive into a smarter way of preparing for placements. Get curated resume tips, explore shared experiences from top achievers, and challenge yourself with real coding tasks. Everything you need for your placement journey — all in one place.
      </p>
    </section>
  );
}
