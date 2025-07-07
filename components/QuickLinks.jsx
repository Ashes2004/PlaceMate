export default function QuickLinks() {
  const links = [
    { label: "Placement Insights", icon: "💼" },
    { label: "Resume Builder", icon: "📄" },
    { label: "Coding Challenges", icon: "</>" },
    { label: "Interview Prep", icon: "🧠" },
  ];

  return (
    <section className="px-8 mt-6">
      <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {links.map((link) => (
          <div
            key={link.label}
            className="bg-white border rounded-lg px-4 py-5 text-center shadow-sm hover:shadow-md cursor-pointer transition"
          >
            <div className="text-2xl mb-2">{link.icon}</div>
            <p className="text-sm font-medium text-gray-800">{link.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
