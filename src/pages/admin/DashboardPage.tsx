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
  Utensils
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
  series: [18, 22, 20, 28, 24, 32, 24]
};

const pendingActions = [
  { id: 1, type: 'Confirmation requise', name: 'Martin L.', time: '19:00', guests: 4 },
  { id: 2, type: 'Confirmation requise', name: 'Dubois M.', time: '20:30', guests: 2 },
  { id: 3, type: 'Demande spéciale', name: 'Bernard P.', time: '19:30', guests: 6 }
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
  weeklyRevenue: '€8,450'
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
      parentHeightOffset: 0
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100]
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
    grid: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val) => `${val} réservations` }
    }
  };

  const radialOptions: ApexOptions = {
    chart: { type: 'radialBar' },
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        track: { background: 'hsl(var(--muted))' },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '28px',
            fontWeight: 700,
            color: 'hsl(var(--foreground))',
            offsetY: 10,
            formatter: () => `${todayStats.reservations}`
          }
        }
      }
    },
    colors: ['hsl(46, 95%, 58%)'],
    stroke: { lineCap: 'round' }
  };

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

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Réservations', value: todayStats.reservations, icon: Calendar, color: 'text-primary' },
            { label: 'Couverts prévus', value: todayStats.guests, icon: Users, color: 'text-emerald-500' },
            { label: 'Tables actives', value: todayStats.tables, icon: Utensils, color: 'text-blue-500' },
            { label: 'En attente', value: todayStats.pendingConfirmations, icon: Clock, color: 'text-amber-500' }
          ].map((stat, i) => (
            <Card 
              key={i} 
              className="p-4 md:p-5 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
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

          {/* Today's Reservations Radial */}
          <Card className="col-span-6 md:col-span-3 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm">
            <Chart
              options={radialOptions}
              series={[(todayStats.reservations / 30) * 100]}
              type="radialBar"
              height={140}
              width={140}
            />
            <p className="text-sm font-medium text-foreground mt-2">Aujourd'hui</p>
            <p className="text-xs text-muted-foreground">sur 30 disponibles</p>
          </Card>

          {/* Week Trend */}
          <Card className="col-span-6 md:col-span-4 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">+{weeklyData.percentChange}%</p>
                <p className="text-xs text-muted-foreground">vs. semaine dernière</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Couverts prévus</span>
                <span className="font-semibold text-foreground">{todayStats.guests}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full w-[68%] transition-all duration-500" />
              </div>
            </div>
          </Card>

          {/* Pending Actions */}
          <Card className="col-span-12 md:col-span-7 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Actions en attente</h3>
                  <p className="text-xs text-muted-foreground">{pendingActions.length} éléments nécessitent votre attention</p>
                </div>
              </div>
              <Badge className="bg-amber-500/10 text-amber-600 border-0 rounded-full">
                {pendingActions.length} urgent
              </Badge>
            </div>
            <div className="space-y-2">
              {pendingActions.map((action) => (
                <div 
                  key={action.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-amber-600">{action.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{action.name}</p>
                      <p className="text-xs text-muted-foreground">{action.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{action.time}</p>
                      <p className="text-xs text-muted-foreground">{action.guests} personnes</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Second Bento Row */}
        <div className="grid grid-cols-12 gap-5">
          {/* Upcoming Reservations - 7 cols */}
          <Card className="col-span-12 lg:col-span-7 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
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
            <div className="space-y-2">
              {upcomingReservations.map((res) => (
                <div 
                  key={res.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-200 cursor-pointer group"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{res.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{res.name}</p>
                    <p className="text-xs text-muted-foreground">{res.guests} personnes</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-sm font-bold text-foreground">{res.time}</p>
                      <Badge 
                        className={`text-xs border-0 rounded-full ${res.status === 'confirmed' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-amber-500/10 text-amber-600'
                        }`}
                      >
                        {res.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </Badge>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly Chart - 5 cols */}
          <Card className="col-span-12 lg:col-span-5 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Tendance hebdomadaire</h3>
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

        {/* Third Row: Performance + Quick Actions + Gallery */}
        <div className="grid grid-cols-12 gap-5">
          {/* Performance Metrics */}
          <Card className="col-span-12 md:col-span-4 p-5 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <h3 className="font-semibold text-foreground mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Taux d'occupation</span>
                  <span className="text-lg font-bold text-foreground">{performanceStats.capacity}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500" 
                    style={{ width: `${performanceStats.capacity}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground">Couverts/jour</p>
                  <p className="text-xl font-bold text-foreground mt-1">{performanceStats.avgCovers}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <p className="text-xs text-muted-foreground">Revenu</p>
                  <p className="text-xl font-bold text-primary mt-1">{performanceStats.weeklyRevenue}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-4">
            <Card className="p-5 rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Nouvelle</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Réservation</p>
            </Card>

            <Card className="p-5 rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 hover:from-emerald-500/10 hover:to-emerald-500/20">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <UtensilsCrossed className="h-6 w-6 text-emerald-500" />
              </div>
              <h4 className="font-semibold text-foreground">Gérer</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Le menu</p>
            </Card>
          </div>

          {/* Gallery Preview - Bento Style */}
          <Card className="col-span-12 md:col-span-4 p-4 rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Galerie</h3>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 rounded-full h-8 text-xs">
                Gérer <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden aspect-square group cursor-pointer">
                <img 
                  src={galleryImages[0]} 
                  alt="Gallery featured"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
