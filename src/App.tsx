import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLoader from "@/components/shared/PageLoader";

// Lazy load all pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const MenuCategoryPage = lazy(() => import("./pages/MenuCategoryPage"));
const MenuItemDetailPage = lazy(() => import("./pages/MenuItemDetailPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ReservationsPage = lazy(() => import("./pages/ReservationsPage"));
const ReservationConfirmationPage = lazy(() => import("./pages/ReservationConfirmationPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages - lazy loaded
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const AdminReservationsPage = lazy(() => import("./pages/admin/ReservationsPage"));
const AdminMenuPage = lazy(() => import("./pages/admin/MenuPage"));
const AdminGalleryPage = lazy(() => import("./pages/admin/GalleryPage"));
const AdminSettingsPage = lazy(() => import("./pages/admin/SettingsPage"));

// Admin - Reservations
const AdminCalendarPage = lazy(() => import("./pages/admin/reservations/CalendarPage"));
const AdminTablesPage = lazy(() => import("./pages/admin/reservations/TablesPage"));

// Admin - Menu
const AdminCategoriesPage = lazy(() => import("./pages/admin/menu/CategoriesPage"));
const AdminSpecialsPage = lazy(() => import("./pages/admin/menu/SpecialsPage"));

// Admin - Orders
const AdminOrdersPage = lazy(() => import("./pages/admin/orders/OrdersPage"));
const AdminOrdersHistoryPage = lazy(() => import("./pages/admin/orders/HistoryPage"));

// Admin - Customers
const AdminCustomersPage = lazy(() => import("./pages/admin/customers/CustomersPage"));
const AdminReviewsPage = lazy(() => import("./pages/admin/customers/ReviewsPage"));
const AdminLoyaltyPage = lazy(() => import("./pages/admin/customers/LoyaltyPage"));

// Admin - Staff
const AdminStaffPage = lazy(() => import("./pages/admin/staff/StaffPage"));
const AdminSchedulesPage = lazy(() => import("./pages/admin/staff/SchedulesPage"));
const AdminRolesPage = lazy(() => import("./pages/admin/staff/RolesPage"));

// Admin - Reports
const AdminReportsPage = lazy(() => import("./pages/admin/reports/ReportsPage"));
const AdminSalesPage = lazy(() => import("./pages/admin/reports/SalesPage"));

// Admin - Content
const AdminEventsPage = lazy(() => import("./pages/admin/content/EventsPage"));
const AdminPromotionsPage = lazy(() => import("./pages/admin/content/PromotionsPage"));

// Admin - Settings
const AdminUsersPage = lazy(() => import("./pages/admin/settings/UsersPage"));
const AdminIntegrationsPage = lazy(() => import("./pages/admin/settings/IntegrationsPage"));

// Configure QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Minimal loading fallback
const RouteLoader = () => (
  <div className="min-h-screen bg-charcoal flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <TooltipProvider>
              <PageLoader onLoadComplete={() => setIsLoaded(true)} />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Suspense fallback={<RouteLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/menu/:category" element={<MenuCategoryPage />} />
                    <Route path="/menu/:category/:slug" element={<MenuItemDetailPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/reservations" element={<ReservationsPage />} />
                    <Route path="/reservations/confirmation" element={<ReservationConfirmationPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboardPage />} />
                      
                      {/* Reservations */}
                      <Route path="reservations" element={<AdminReservationsPage />} />
                      <Route path="reservations/calendar" element={<AdminCalendarPage />} />
                      <Route path="reservations/tables" element={<AdminTablesPage />} />
                      
                      {/* Menu */}
                      <Route path="menu" element={<AdminMenuPage />} />
                      <Route path="menu/categories" element={<AdminCategoriesPage />} />
                      <Route path="menu/specials" element={<AdminSpecialsPage />} />
                      
                      {/* Orders */}
                      <Route path="orders" element={<AdminOrdersPage />} />
                      <Route path="orders/history" element={<AdminOrdersHistoryPage />} />
                      
                      {/* Customers */}
                      <Route path="customers" element={<AdminCustomersPage />} />
                      <Route path="customers/reviews" element={<AdminReviewsPage />} />
                      <Route path="customers/loyalty" element={<AdminLoyaltyPage />} />
                      
                      {/* Staff */}
                      <Route path="staff" element={<AdminStaffPage />} />
                      <Route path="staff/schedules" element={<AdminSchedulesPage />} />
                      <Route path="staff/roles" element={<AdminRolesPage />} />
                      
                      {/* Reports */}
                      <Route path="reports" element={<AdminReportsPage />} />
                      <Route path="reports/sales" element={<AdminSalesPage />} />
                      
                      {/* Content */}
                      <Route path="gallery" element={<AdminGalleryPage />} />
                      <Route path="content/events" element={<AdminEventsPage />} />
                      <Route path="content/promotions" element={<AdminPromotionsPage />} />
                      
                      {/* Settings */}
                      <Route path="settings" element={<AdminSettingsPage />} />
                      <Route path="settings/users" element={<AdminUsersPage />} />
                      <Route path="settings/integrations" element={<AdminIntegrationsPage />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;