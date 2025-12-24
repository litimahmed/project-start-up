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
  Image,
  AlertCircle,
  ChevronRight,
  MapPin,
  Phone
} from 'lucide-react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Hardcoded data
const todayStats = {
  reservations: 24,
  guests: 68,
  pendingConfirmations: 3
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
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop'
];

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
    colors: ['hsl(142, 71%, 45%)'],
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
        hollow: { size: '60%' },
        track: { background: 'hsl(var(--muted))' },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '24px',
            fontWeight: 700,
            color: 'hsl(var(--foreground))',
            offsetY: 8,
            formatter: () => `${todayStats.reservations}`
          }
        }
      }
    },
    colors: ['hsl(142, 71%, 45%)'],
    stroke: { lineCap: 'round' }
  };

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Le Jardin Enchanté</title>
        <meta name="description" content="Tableau de bord administrateur du restaurant Le Jardin Enchanté" />
      </Helmet>

      <div className="space-y-5">
        {/* ROW 1: Welcome + Stats */}
        <div className="grid grid-cols-12 gap-5">
          {/* Welcome Hero - 8 cols */}
          <Card className="col-span-12 lg:col-span-8 p-6 bg-gradient-to-br from-primary/90 to-primary border-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">{today}</p>
                <h1 className="text-2xl font-bold text-primary-foreground mt-1">
                  {greeting}, Chef
                </h1>
                <p className="text-primary-foreground/70 mt-2 text-sm">
                  Votre restaurant est prêt pour une nouvelle journée
                </p>
              </div>
              <Badge 
                variant={isOpen ? "secondary" : "outline"} 
                className={isOpen ? "bg-white/20 text-white border-0" : "border-white/30 text-white/80"}
              >
                {isOpen ? 'Ouvert' : 'Fermé'}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-6 text-primary-foreground/80 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>12 Rue de la Paix, Paris</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
            </div>
          </Card>

          {/* Today's Reservations - 2 cols */}
          <Card className="col-span-6 lg:col-span-2 p-6 flex flex-col items-center justify-center">
            <Chart
              options={radialOptions}
              series={[(todayStats.reservations / 30) * 100]}
              type="radialBar"
              height={120}
              width={120}
            />
            <p className="text-xs text-muted-foreground text-center mt-2">
              Réservations aujourd'hui
            </p>
          </Card>

          {/* Week Trend - 2 cols */}
          <Card className="col-span-6 lg:col-span-2 p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold text-foreground">+{weeklyData.percentChange}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. semaine dernière</p>
            <div className="flex items-center gap-1.5 mt-3">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{todayStats.guests} couverts prévus</span>
            </div>
          </Card>
        </div>

        {/* ROW 2: Pending Actions + Upcoming Reservations */}
        <div className="grid grid-cols-12 gap-5">
          {/* Pending Actions - 4 cols */}
          <Card className="col-span-12 lg:col-span-4 p-6 border-amber-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold text-foreground">Actions en attente</h3>
              </div>
              <Badge variant="outline" className="border-amber-500/50 text-amber-600">
                {pendingActions.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {pendingActions.map((action) => (
                <div 
                  key={action.id} 
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{action.name}</p>
                    <p className="text-xs text-muted-foreground">{action.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{action.time}</p>
                    <p className="text-xs text-muted-foreground">{action.guests} pers.</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Reservations - 8 cols */}
          <Card className="col-span-12 lg:col-span-8 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Prochaines réservations</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                Voir tout <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {upcomingReservations.map((res) => (
                <div 
                  key={res.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{res.name}</p>
                    <p className="text-xs text-muted-foreground">{res.guests} personnes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{res.time}</p>
                    <Badge 
                      variant="outline" 
                      className={res.status === 'confirmed' 
                        ? 'border-primary/50 text-primary text-xs' 
                        : 'border-amber-500/50 text-amber-600 text-xs'
                      }
                    >
                      {res.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ROW 3: Weekly Trend Chart + Performance */}
        <div className="grid grid-cols-12 gap-5">
          {/* Weekly Trend Chart - 8 cols */}
          <Card className="col-span-12 lg:col-span-8 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Tendance des réservations</h3>
              <Badge variant="secondary" className="text-xs">Cette semaine</Badge>
            </div>
            <Chart
              options={areaChartOptions}
              series={[{ name: 'Réservations', data: weeklyData.series }]}
              type="area"
              height={200}
            />
          </Card>

          {/* Performance Metrics - 4 cols */}
          <Card className="col-span-12 lg:col-span-4 p-6">
            <h3 className="font-semibold text-foreground mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Taux d'occupation</span>
                <span className="text-lg font-bold text-foreground">{performanceStats.capacity}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${performanceStats.capacity}%` }}
                />
              </div>
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">Couverts moyens/jour</span>
                  <span className="font-semibold text-foreground">{performanceStats.avgCovers}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <span className="text-sm text-muted-foreground">Revenu semaine</span>
                  <span className="font-semibold text-primary">{performanceStats.weeklyRevenue}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ROW 4: Quick Actions + Gallery */}
        <div className="grid grid-cols-12 gap-5">
          {/* Quick Action: Reservation - 3 cols */}
          <Card className="col-span-6 lg:col-span-3 p-6 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Nouvelle réservation</h4>
            <p className="text-xs text-muted-foreground mt-1">Ajouter manuellement</p>
          </Card>

          {/* Quick Action: Menu - 3 cols */}
          <Card className="col-span-6 lg:col-span-3 p-6 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">Gérer le menu</h4>
            <p className="text-xs text-muted-foreground mt-1">Plats et catégories</p>
          </Card>

          {/* Gallery Preview - 6 cols */}
          <Card className="col-span-12 lg:col-span-6 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Galerie</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                Gérer <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((img, i) => (
                <div 
                  key={i}
                  className="aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
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
