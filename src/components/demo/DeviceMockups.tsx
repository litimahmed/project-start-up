import { useState } from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

const devices = [
  { id: 'desktop', label: 'Desktop', icon: Monitor, width: 'w-full max-w-4xl' },
  { id: 'tablet', label: 'Tablet', icon: Tablet, width: 'w-full max-w-md' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, width: 'w-full max-w-xs' },
];

const DeviceMockups = () => {
  const [activeDevice, setActiveDevice] = useState('desktop');

  return (
    <section className="py-24 md:py-32 bg-foreground relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Responsive Design
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-6">
            Perfect on Every Device
          </h2>
          <p className="text-background/60 text-lg max-w-2xl mx-auto">
            Meticulously crafted to look stunning on screens of all sizes.
          </p>
        </div>

        {/* Device selector */}
        <div className="flex justify-center gap-4 mb-12">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeDevice === device.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background/10 text-background/60 hover:bg-background/20 hover:text-background'
              }`}
            >
              <device.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{device.label}</span>
            </button>
          ))}
        </div>

        {/* Device mockup */}
        <div className="flex justify-center">
          <div
            className={`relative transition-all duration-500 ${
              devices.find((d) => d.id === activeDevice)?.width
            }`}
          >
            {/* Browser frame */}
            <div className="bg-background/10 rounded-t-xl p-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background/10 rounded-md px-4 py-1.5 text-sm text-background/60 text-center">
                  maison-le-sept.lovable.app
                </div>
              </div>
            </div>

            {/* Screen content */}
            <div className="relative bg-background rounded-b-xl overflow-hidden shadow-2xl">
              {/* Placeholder for actual screenshot - using gradient placeholder */}
              <div
                className={`aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center ${
                  activeDevice === 'mobile' ? 'aspect-[9/16]' : activeDevice === 'tablet' ? 'aspect-[4/3]' : ''
                }`}
              >
                <div className="text-center p-8">
                  <div className="font-serif text-2xl md:text-4xl text-foreground mb-4">
                    Maison le Sept
                  </div>
                  <p className="text-muted-foreground">
                    Live preview placeholder
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {['Home', 'Menu', 'Gallery', 'Reservations'].map((page) => (
                      <span
                        key={page}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Reflection */}
            <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-background/20 to-transparent blur-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceMockups;
