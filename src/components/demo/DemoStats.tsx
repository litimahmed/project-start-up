import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const pages = [
  { title: 'Homepage', path: '/' },
  { title: 'Menu Page', path: '/menu' },
  { title: 'Gallery', path: '/gallery' },
  { title: 'Reservations', path: '/reservations' },
  { title: 'Admin Dashboard', path: '/admin' },
  { title: 'Confirmation', path: '/reservation-confirmation' },
];

const DemoStats = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-foreground relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Stats header */}
        <div className="text-center mb-16">
          {/* Large number */}
          <div className="font-serif text-8xl md:text-9xl lg:text-[12rem] text-primary/20 leading-none mb-4">
            7+
          </div>
          <div className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Inner Pages</div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background mb-4 max-w-3xl mx-auto">
            DOZENS OF INNER PAGES THAT PRECISELY FIT YOUR PURPOSE
          </h2>
          
          <p className="text-background/50 text-base max-w-2xl mx-auto">
            You can easily create your own unique website. The inner pages have been carefully designed and 
            arranged so that you can fully and easily adapt your portfolio for your needs.
          </p>
        </div>

        {/* Pages showcase */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {pages.map((page) => (
            <button
              key={page.title}
              onClick={() => navigate(page.path)}
              className="group flex items-center gap-2 px-6 py-4 bg-background/5 border border-background/10 
                         rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              {/* Preview placeholder */}
              <div className="w-16 h-12 bg-background/10 rounded overflow-hidden flex items-center justify-center">
                <span className="text-[8px] text-background/40 font-medium">{page.title}</span>
              </div>
              
              <div className="text-left">
                <div className="text-background text-sm font-medium group-hover:text-primary transition-colors">
                  {page.title}
                </div>
              </div>
              
              <ArrowRight className="w-4 h-4 text-background/40 group-hover:text-primary 
                                     group-hover:translate-x-1 transition-all ml-2" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoStats;
