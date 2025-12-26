const technologies = [
  { name: 'React 18', category: 'Frontend', color: 'from-blue-500/20 to-blue-600/20' },
  { name: 'TypeScript', category: 'Language', color: 'from-blue-600/20 to-blue-700/20' },
  { name: 'Tailwind CSS', category: 'Styling', color: 'from-cyan-500/20 to-cyan-600/20' },
  { name: 'Supabase', category: 'Backend', color: 'from-green-500/20 to-green-600/20' },
  { name: 'Vite', category: 'Build Tool', color: 'from-purple-500/20 to-purple-600/20' },
  { name: 'React Query', category: 'Data Fetching', color: 'from-red-500/20 to-red-600/20' },
  { name: 'React Router', category: 'Routing', color: 'from-pink-500/20 to-pink-600/20' },
  { name: 'Radix UI', category: 'Components', color: 'from-gray-500/20 to-gray-600/20' },
  { name: 'Framer Motion', category: 'Animations', color: 'from-purple-400/20 to-purple-500/20' },
  { name: 'React Hook Form', category: 'Forms', color: 'from-pink-400/20 to-pink-500/20' },
  { name: 'Zod', category: 'Validation', color: 'from-indigo-500/20 to-indigo-600/20' },
  { name: 'Lucide Icons', category: 'Icons', color: 'from-orange-500/20 to-orange-600/20' },
];

const TechStack = () => {
  return (
    <section className="py-24 md:py-32 bg-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Built With Best-in-Class
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-6">
            Modern Tech Stack
          </h2>
          <p className="text-background/60 text-lg max-w-2xl mx-auto">
            Powered by cutting-edge technologies for performance, scalability, and developer experience.
          </p>
        </div>

        {/* Tech grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`group relative px-6 py-4 rounded-xl bg-gradient-to-br ${tech.color} backdrop-blur-sm
                          border border-background/10 hover:border-primary/50 transition-all duration-300
                          hover:scale-105 hover:shadow-lg hover:shadow-primary/10`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />

              <div className="relative text-center">
                <div className="font-medium text-background group-hover:text-primary transition-colors duration-300">
                  {tech.name}
                </div>
                <div className="text-xs text-background/50 mt-1">{tech.category}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: '100', label: 'Lighthouse Score', suffix: '%' },
            { number: '< 2', label: 'Second Load Time', suffix: 's' },
            { number: '0', label: 'Accessibility Issues', suffix: '' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-primary mb-2">
                {stat.number}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-background/60 text-sm tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
