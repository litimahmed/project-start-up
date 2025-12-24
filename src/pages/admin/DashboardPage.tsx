import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp,
  Plus,
  UtensilsCrossed,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Star,
  ArrowUpRight,
  Utensils,
  DollarSign,
  Activity
} from 'lucide-react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Hardcoded data
const todayStats = {
  reservations: 24,
  guests: 68,
  pendingConfirmations: 3,
  tables: 18
};

const weeklyData = {
  percentChange: 12,
  series: [18, 22, 20, 28, 24, 32, 24],
  guestsTrend: [45, 52, 48, 62, 58, 72, 68]
};

const pendingActions = [
  { id: 1, type: 'Confirmation requise', name: 'Martin L.', time: '19:00', guests: 4, urgent: true },
  { id: 2, type: 'Confirmation requise', name: 'Dubois M.', time: '20:30', guests: 2, urgent: true },
  { id: 3, type: 'Demande spéciale', name: 'Bernard P.', time: '19:30', guests: 6, urgent: false }
];

const upcomingReservations = [
  { id: 1, name: 'Sophie Martin', time: '12:00', guests: 2, status: 'confirmed' },
  { id: 2, name: 'Pierre Durand', time: '12:30', guests: 4, status: 'confirmed' },
  { id: 3, name: 'Marie Claire', time: '13:00', guests: 3, status: 'pending' },
  { id: 4, name: 'Jean Dupont', time: '13:30', guests: 2, status: 'confirmed' }
];

const performanceStats = {
  capacity: 78,
  avgCovers: 42,
  weeklyRevenue: 8450,
  satisfaction: 92
};

const galleryImages = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop'
];

const featuredDish = {
  name: 'Filet de Bœuf Wellington',
  description: 'Notre chef vous recommande',
  price: '€48',
  image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
};

// Mini sparkline component
const MiniSparkline = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 24;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Guest dots component
const GuestDots = ({ count, max = 6 }: { count: number, max?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <div 
        key={i} 
        className={`w-1.5 h-1.5 rounded-full transition-all ${
          i < count ? 'bg-current' : 'bg-current/20'
        }`}
      />
    ))}
  </div>
);

// Circular progress ring component
const CircularProgress = ({ 
  value, 
  size = 80, 
  strokeWidth = 8,
  color = 'hsl(var(--primary))',
  trackColor = 'hsl(var(--muted))',
  children 
}: { 
  value: number, 
  size?: number, 
  strokeWidth?: number,
  color?: string,
  trackColor?: string,
  children?: React.ReactNode 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const isOpen = currentHour >= 11 && currentHour < 23;
  const today = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const areaChartOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: false },
      parentHeightOffset: 0,
      animations: {
        enabled: true,
        speed: 800
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: 'hsl(46, 95%, 58%)', opacity: 0.4 },
          { offset: 50, color: 'hsl(46, 95%, 58%)', opacity: 0.2 },
          { offset: 100, color: 'hsl(46, 95%, 58%)', opacity: 0 }
        ]
      }
    },
    colors: ['hsl(46, 95%, 58%)'],
    xaxis: {
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      labels: { style: { colors: 'hsl(var(--muted-foreground))', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { show: false },
    grid: { 
      show: true,
      borderColor: 'hsl(var(--border))',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 0, bottom: 0, left: 0 }
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => `${val} réservations` }
    },
    markers: {
      size: 0,
      hover: { size: 6 }
    }
  };

  // Color configurations for stat cards
  const statConfigs = [
    { 
      label: 'Réservations', 
      value: todayStats.reservations, 
      icon: Calendar, 
      trend: '+12%',
      trendUp: true,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: weeklyData.series,
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      overlayColor: 'from-amber-600/90 via-amber-500/85 to-orange-500/80'
    },
    { 
      label: 'Couverts prévus', 
      value: todayStats.guests, 
      icon: Users,
      trend: '+8%',
      trendUp: true,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: weeklyData.guestsTrend,
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      overlayColor: 'from-emerald-600/90 via-emerald-500/85 to-teal-500/80'
    },
    { 
      label: 'Tables actives', 
      value: todayStats.tables, 
      icon: Utensils,
      trend: '75%',
      trendUp: true,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: [14, 16, 15, 18, 17, 19, 18],
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&h=400&fit=crop',
      overlayColor: 'from-blue-600/90 via-blue-500/85 to-indigo-500/80'
    },
    { 
      label: 'En attente', 
      value: todayStats.pendingConfirmations, 
      icon: AlertCircle,
      trend: 'urgent',
      trendUp: false,
      iconBg: 'bg-white/20 backdrop-blur-sm',
      iconColor: 'text-white',
      sparkData: [2, 4, 3, 5, 2, 4, 3],
      sparkColor: '#ffffff',
      bgImage: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&h=400&fit=crop',
      overlayColor: 'from-rose-600/90 via-rose-500/85 to-pink-500/80'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Le Jardin Enchanté</title>
        <meta name="description" content="Tableau de bord administrateur du restaurant Le Jardin Enchanté" />
      </Helmet>

      <div className="space-y-6">
        {/* Hero Banner - Full Width */}
        <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=600&fit=crop"
            alt="Restaurant interior"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm font-medium capitalize">{today}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-1 font-serif">
                  {greeting}, Chef
                </h1>
                <p className="text-white/60 mt-2 text-sm md:text-base max-w-md">
                  Prêt pour une nouvelle journée exceptionnelle au restaurant
                </p>
              </div>
              <Badge 
                className={`${isOpen 
                  ? 'bg-emerald-500/90 hover:bg-emerald-500 text-white' 
                  : 'bg-white/20 text-white/80'
                } rounded-full px-4 py-1.5 text-sm font-medium border-0 shadow-lg`}
              >
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isOpen ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                {isOpen ? 'Ouvert' : 'Fermé'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats Row with Background Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statConfigs.map((stat, i) => (
            <Card 
              key={i} 
              className="relative p-5 rounded-2xl border-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer min-h-[140px]"
            >
              {/* Background image */}
              <img 
                src={stat.bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.overlayColor}`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-12 w-12 rounded-2xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trendUp 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {stat.trend}
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white tracking-tight drop-shadow-md">{stat.value}</p>
                    <p className="text-xs text-white/80 mt-1">{stat.label}</p>
                  </div>
                  <MiniSparkline data={stat.sparkData} color={stat.sparkColor} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-12 gap-5">
          {/* Featured Dish Card - 5 cols, tall */}
          <Card className="col-span-12 md:col-span-5 row-span-2 relative overflow-hidden rounded-3xl border-0 group cursor-pointer min-h-[380px]">
            <img 
              src={featuredDish.image}
              alt={featuredDish.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground border-0 rounded-full px-3 py-1 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1.5" />
                Plat du jour
              </Badge>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div className="flex items-center gap-1 mb-2">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">{featuredDish.name}</h3>
              <p className="text-white/70 text-sm mt-1">{featuredDish.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-primary">{featuredDish.price}</span>
                <Button size="sm" className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                  Voir détails <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Performance Gauges - Visual Circular Metrics */}
          <Card className="col-span-12 md:col-span-7 p-6 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Performance</h3>
                  <p className="text-xs text-muted-foreground">Métriques en temps réel</p>
                </div>
              </div>
              <Badge className="bg-violet-500/10 text-violet-600 border-0 rounded-full">Live</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {/* Capacity Ring */}
              <div className="flex flex-col items-center">
                <CircularProgress 
                  value={performanceStats.capacity} 
                  size={90}
                  strokeWidth={8}
                  color="hsl(262, 83%, 58%)"
                  trackColor="hsl(var(--muted))"
                >
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{performanceStats.capacity}%</p>
                  </div>
                </CircularProgress>
                <p className="text-xs text-muted-foreground mt-3">Occupation</p>
              </div>
              
              {/* Covers Ring */}
              <div className="flex flex-col items-center">
                <CircularProgress 
                  value={(performanceStats.avgCovers / 60) * 100} 
                  size={90}
                  strokeWidth={8}
                  color="hsl(142, 70%, 45%)"
                  trackColor="hsl(var(--muted))"
                >
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{performanceStats.avgCovers}</p>
                  </div>
                </CircularProgress>
                <p className="text-xs text-muted-foreground mt-3">Couverts/jour</p>
              </div>
              
              {/* Satisfaction Ring */}
              <div className="flex flex-col items-center">
                <CircularProgress 
                  value={performanceStats.satisfaction} 
                  size={90}
                  strokeWidth={8}
                  color="hsl(46, 95%, 58%)"
                  trackColor="hsl(var(--muted))"
                >
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground">{performanceStats.satisfaction}%</p>
                  </div>
                </CircularProgress>
                <p className="text-xs text-muted-foreground mt-3">Satisfaction</p>
              </div>
            </div>
            
            {/* Revenue highlight */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenu hebdomadaire</p>
                  <p className="text-2xl font-bold text-foreground">€{performanceStats.weeklyRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-emerald-500/10 text-emerald-600 border-0 rounded-full">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15%
                </Badge>
              </div>
            </div>
          </Card>

          {/* Timeline-style Pending Actions */}
          <Card className="col-span-12 md:col-span-7 p-6 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Actions en attente</h3>
                  <p className="text-xs text-muted-foreground">Nécessitent votre attention</p>
                </div>
              </div>
              <Badge className="bg-rose-500/10 text-rose-500 border-0 rounded-full animate-pulse">
                {pendingActions.filter(a => a.urgent).length} urgent
              </Badge>
            </div>
            
            {/* Timeline layout */}
            <div className="relative pl-6">
              {/* Vertical timeline line */}
              <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent" />
              
              <div className="space-y-4">
                {pendingActions.map((action, index) => (
                  <div 
                    key={action.id} 
                    className="relative flex items-center gap-4 p-4 rounded-xl bg-card/80 hover:bg-card transition-all duration-300 cursor-pointer group border border-transparent hover:border-amber-500/20"
                  >
                    {/* Timeline dot with pulse for urgent */}
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        action.urgent 
                          ? 'bg-rose-500 border-rose-500/30' 
                          : 'bg-amber-500 border-amber-500/30'
                      } flex items-center justify-center`}>
                        {action.urgent && (
                          <div className="absolute w-4 h-4 rounded-full bg-rose-500/50 animate-ping" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 flex items-center gap-4">
                      {/* Time block */}
                      <div className={`h-14 w-16 rounded-xl ${
                        action.urgent 
                          ? 'bg-gradient-to-br from-rose-500/20 to-rose-600/10' 
                          : 'bg-gradient-to-br from-amber-500/20 to-amber-600/10'
                      } flex flex-col items-center justify-center`}>
                        <p className={`text-lg font-bold ${action.urgent ? 'text-rose-500' : 'text-amber-500'}`}>
                          {action.time}
                        </p>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{action.name}</p>
                          <Badge className="text-[10px] bg-muted text-muted-foreground border-0 rounded-full h-5">
                            {action.type}
                          </Badge>
                        </div>
                        <div className={`flex items-center gap-2 mt-1.5 ${action.urgent ? 'text-rose-500' : 'text-amber-600'}`}>
                          <GuestDots count={action.guests} />
                          <span className="text-xs">{action.guests} personnes</span>
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Actions - Enhanced with mesh gradients */}
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-4">
            <Card className="relative p-6 rounded-2xl border-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group">
              {/* Mesh gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-amber-400/10 to-orange-500/20 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-primary/30 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Plus className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Nouvelle</h4>
                <p className="text-sm text-muted-foreground mt-0.5">Réservation</p>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>

            <Card className="relative p-6 rounded-2xl border-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group">
              {/* Mesh gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-400/10 to-cyan-500/20 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/30 via-transparent to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/30 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-lg">
                  <UtensilsCrossed className="h-7 w-7 text-emerald-500" />
                </div>
                <h4 className="text-lg font-bold text-foreground">Gérer</h4>
                <p className="text-sm text-muted-foreground mt-0.5">Le menu</p>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          </div>
        </div>

        {/* Second Bento Row */}
        <div className="grid grid-cols-12 gap-5">
          {/* Upcoming Reservations - Visual time blocks */}
          <Card className="col-span-12 lg:col-span-7 p-6 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Prochaines réservations</h3>
                  <p className="text-xs text-muted-foreground">Service du midi</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 rounded-full">
                Voir tout <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            {/* Time slot blocks */}
            <div className="space-y-3">
              {upcomingReservations.map((res) => (
                <div 
                  key={res.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-card/80 hover:bg-card transition-all duration-200 cursor-pointer group border border-transparent hover:border-primary/20"
                >
                  {/* Visual time block */}
                  <div className={`h-14 w-20 rounded-xl ${
                    res.status === 'confirmed' 
                      ? 'bg-gradient-to-br from-primary/20 to-amber-500/10' 
                      : 'bg-gradient-to-br from-amber-500/20 to-orange-500/10'
                  } flex flex-col items-center justify-center`}>
                    <Clock className={`h-3.5 w-3.5 mb-0.5 ${res.status === 'confirmed' ? 'text-primary' : 'text-amber-500'}`} />
                    <p className={`text-sm font-bold ${res.status === 'confirmed' ? 'text-primary' : 'text-amber-500'}`}>{res.time}</p>
                  </div>
                  
                  {/* Avatar stack placeholder */}
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(res.guests, 3) }).map((_, i) => (
                      <div 
                        key={i} 
                        className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-card flex items-center justify-center text-[10px] font-medium text-muted-foreground"
                      >
                        {res.name.charAt(0)}
                      </div>
                    ))}
                    {res.guests > 3 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        +{res.guests - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{res.name}</p>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <GuestDots count={res.guests} />
                      <span className="text-xs">{res.guests} personnes</span>
                    </div>
                  </div>
                  
                  <Badge 
                    className={`text-xs border-0 rounded-full ${
                      res.status === 'confirmed' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {res.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                  </Badge>
                  
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Chart - Enhanced */}
          <Card className="col-span-12 lg:col-span-5 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-primary/5 via-transparent to-amber-400/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Tendance hebdomadaire</h3>
              </div>
              <Badge className="bg-muted text-muted-foreground border-0 rounded-full text-xs">Cette semaine</Badge>
            </div>
            <Chart
              options={areaChartOptions}
              series={[{ name: 'Réservations', data: weeklyData.series }]}
              type="area"
              height={180}
            />
          </Card>
        </div>

        {/* Third Row: Gallery */}
        <div className="grid grid-cols-12 gap-5">
          {/* Gallery Preview - Bento Style */}
          <Card className="col-span-12 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-fuchsia-500" />
                </div>
                <h3 className="font-semibold text-foreground">Galerie</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 rounded-full h-8 text-xs">
                Gérer <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden aspect-square group cursor-pointer">
                <img 
                  src={galleryImages[0]} 
                  alt="Gallery featured"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">Featured</Badge>
                </div>
              </div>
              {galleryImages.slice(1).map((img, i) => (
                <div 
                  key={i}
                  className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              ))}
              {/* Add more placeholder */}
              <div className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
