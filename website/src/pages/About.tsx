import AboutSection from "../components/About";

export default function About() {
  return (
    <div className="pt-20">
      <AboutSection />
      <section className="py-20 bg-slate-50 border-t">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Support Our Cause</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Sema Salama is a community-driven initiative. We are always looking for
            volunteers, data contributors, and partners to help make the internet
            safer for everyone.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
}