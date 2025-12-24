import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UtensilsCrossed, 
  Image, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Grid3X3,
  List,
  FolderOpen,
  Sparkles,
  ShoppingBag,
  History,
  Users,
  MessageSquare,
  Award,
  UserCog,
  CalendarClock,
  Shield,
  FileBarChart,
  TrendingUp,
  PartyPopper,
  Megaphone,
  UserPlus,
  Plug,
  ExternalLink
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: { icon: React.ElementType; label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
  { 
    icon: CalendarDays, 
    label: 'Réservations',
    children: [
      { icon: List, label: 'Toutes les réservations', path: '/admin/reservations' },
      { icon: Calendar, label: 'Calendrier', path: '/admin/reservations/calendar' },
      { icon: Grid3X3, label: 'Tables', path: '/admin/reservations/tables' },
    ]
  },
  { 
    icon: UtensilsCrossed, 
    label: 'Menu',
    children: [
      { icon: List, label: 'Articles', path: '/admin/menu' },
      { icon: FolderOpen, label: 'Catégories', path: '/admin/menu/categories' },
      { icon: Sparkles, label: 'Spécialités', path: '/admin/menu/specials' },
    ]
  },
  { 
    icon: ShoppingBag, 
    label: 'Commandes',
    children: [
      { icon: ShoppingBag, label: 'En cours', path: '/admin/orders' },
      { icon: History, label: 'Historique', path: '/admin/orders/history' },
    ]
  },
  { 
    icon: Users, 
    label: 'Clients',
    children: [
      { icon: Users, label: 'Liste', path: '/admin/customers' },
      { icon: MessageSquare, label: 'Avis', path: '/admin/customers/reviews' },
      { icon: Award, label: 'Fidélité', path: '/admin/customers/loyalty' },
    ]
  },
  { 
    icon: UserCog, 
    label: 'Personnel',
    children: [
      { icon: UserCog, label: 'Employés', path: '/admin/staff' },
      { icon: CalendarClock, label: 'Plannings', path: '/admin/staff/schedules' },
      { icon: Shield, label: 'Rôles', path: '/admin/staff/roles' },
    ]
  },
  { 
    icon: FileBarChart, 
    label: 'Rapports',
    children: [
      { icon: FileBarChart, label: 'Vue d\'ensemble', path: '/admin/reports' },
      { icon: TrendingUp, label: 'Ventes', path: '/admin/reports/sales' },
    ]
  },
  { 
    icon: Image, 
    label: 'Contenu',
    children: [
      { icon: Image, label: 'Galerie', path: '/admin/gallery' },
      { icon: PartyPopper, label: 'Événements', path: '/admin/content/events' },
      { icon: Megaphone, label: 'Promotions', path: '/admin/content/promotions' },
    ]
  },
  { 
    icon: Settings, 
    label: 'Paramètres',
    children: [
      { icon: Settings, label: 'Général', path: '/admin/settings' },
      { icon: UserPlus, label: 'Utilisateurs', path: '/admin/settings/users' },
      { icon: Plug, label: 'Intégrations', path: '/admin/settings/integrations' },
    ]
  },
];

const HorizontalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children?: { path: string }[]) => {
    if (!children) return false;
    return children.some(child => location.pathname === child.path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-sidebar border-b border-sidebar-border sticky top-0 z-30">
      <div className="px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-sidebar-foreground text-sm leading-tight">Maison le Sept</h1>
              <p className="text-primary/60 text-[10px]">Administration</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-4xl mx-4">
            {menuItems.map((item) => (
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all",
                        isParentActive(item.children)
                          ? "text-primary bg-primary/10"
                          : "text-sidebar-foreground/70 hover:text-primary hover:bg-primary/5"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="hidden xl:inline">{item.label}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    className="w-56 bg-card border border-border/50 shadow-lg rounded-xl p-1"
                  >
                    {item.children.map((child) => (
                      <DropdownMenuItem 
                        key={child.path}
                        onClick={() => navigate(child.path)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-sm",
                          isActive(child.path)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <child.icon className="w-4 h-4" />
                        {child.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path!)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-all",
                    isActive(item.path!)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                </button>
              )
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1.5 bg-primary/10 hover:bg-primary/15 rounded-lg transition-colors border border-primary/20">
                  <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-xs">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border border-border/50 shadow-lg rounded-xl p-1">
                <DropdownMenuLabel className="px-3 py-2">
                  <p className="font-medium text-foreground text-sm">Mon compte</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/30" />
                <DropdownMenuItem 
                  onClick={() => navigate('/admin/settings')}
                  className="px-3 py-2 cursor-pointer rounded-lg hover:bg-muted/50"
                >
                  <Settings className="w-4 h-4 mr-2 text-primary" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => window.open('/', '_blank')}
                  className="px-3 py-2 cursor-pointer rounded-lg hover:bg-muted/50"
                >
                  <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                  <span>Voir le site</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/30" />
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="px-3 py-2 cursor-pointer rounded-lg text-destructive focus:text-destructive hover:bg-destructive/5"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-primary/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-sidebar-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-sidebar-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-sidebar-border">
            <div className="grid grid-cols-3 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    } else if (item.children) {
                      navigate(item.children[0].path);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-all text-center",
                    (item.path && isActive(item.path)) || isParentActive(item.children)
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-primary/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HorizontalNav;
