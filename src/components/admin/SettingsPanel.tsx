import { useState } from 'react';
import { Settings, Sun, Moon, Check, RotateCcw, Palette, Layout, Square, Columns, PanelLeft, CreditCard, Circle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  useAdminSettings,
  ThemeColor,
} from '@/contexts/AdminSettingsContext';

const themeColors: { id: ThemeColor; color: string; label: string }[] = [
  { id: 'gold', color: 'bg-[#D4AF37]', label: 'Or' },
  { id: 'burgundy', color: 'bg-[#722F37]', label: 'Bordeaux' },
  { id: 'champagne', color: 'bg-[#D4AF8C]', label: 'Champagne' },
];

const SettingsPanel = () => {
  const { theme, setTheme } = useTheme();
  const {
    themeColor,
    direction,
    layoutType,
    containerType,
    sidebarType,
    cardStyle,
    borderRadius,
    setThemeColor,
    setDirection,
    setLayoutType,
    setContainerType,
    setSidebarType,
    setCardStyle,
    setBorderRadius,
    resetSettings,
  } = useAdminSettings();

  const [open, setOpen] = useState(false);

  // Dynamic positioning based on direction
  const buttonPosition = direction === 'rtl' ? 'left-6' : 'right-6';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Floating Settings Button - Refined, no glow */}
      <SheetTrigger asChild>
        <button
          className={cn(
            "fixed bottom-6 z-50 w-11 h-11 bg-card/95 backdrop-blur-sm text-foreground rounded-xl shadow-md border border-border/50 transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:scale-105 hover:bg-card group",
            buttonPosition
          )}
        >
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:rotate-45" />
        </button>
      </SheetTrigger>

      <SheetContent 
        side={direction === 'rtl' ? 'left' : 'right'} 
        className="w-80 sm:w-[340px] overflow-y-auto bg-card/98 backdrop-blur-md border-l border-border/30 p-0"
      >
        {/* Elegant Header */}
        <SheetHeader className="p-6 pb-4 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary" />
              </div>
              <SheetTitle className="text-base font-semibold tracking-tight">Paramètres</SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSettings}
              className="text-xs text-muted-foreground hover:text-foreground h-8 px-2"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Réinitialiser
            </Button>
          </div>
        </SheetHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Theme Mode */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5" />
              Apparence
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  theme === 'light'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                <Sun className="w-4 h-4" />
                Clair
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  theme === 'dark'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                <Moon className="w-4 h-4" />
                Sombre
              </button>
            </div>
          </section>

          <Separator className="bg-border/30" />

          {/* Direction */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Columns className="w-3.5 h-3.5" />
              Direction
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDirection('ltr')}
                className={cn(
                  "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  direction === 'ltr'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                LTR
              </button>
              <button
                onClick={() => setDirection('rtl')}
                className={cn(
                  "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  direction === 'rtl'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                RTL
              </button>
            </div>
          </section>

          <Separator className="bg-border/30" />

          {/* Theme Colors - Luxury palette */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              Couleur du thème
            </div>
            <div className="flex gap-3">
              {themeColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setThemeColor(color.id)}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full transition-all flex items-center justify-center border-2",
                      color.color,
                      themeColor === color.id
                        ? "border-foreground scale-110 shadow-md"
                        : "border-transparent group-hover:scale-105 group-hover:shadow-sm"
                    )}
                  >
                    {themeColor === color.id && (
                      <Check className="w-4 h-4 text-white drop-shadow-sm" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    themeColor === color.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <Separator className="bg-border/30" />

          {/* Layout Type */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Layout className="w-3.5 h-3.5" />
              Mise en page
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLayoutType('vertical')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  layoutType === 'vertical'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                <PanelLeft className="w-4 h-4" />
                Vertical
              </button>
              <button
                onClick={() => setLayoutType('horizontal')}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  layoutType === 'horizontal'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                <Layout className="w-4 h-4" />
                Horizontal
              </button>
            </div>
          </section>

          <Separator className="bg-border/30" />

          {/* Container Type */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Square className="w-3.5 h-3.5" />
              Conteneur
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setContainerType('boxed')}
                className={cn(
                  "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  containerType === 'boxed'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                Encadré
              </button>
              <button
                onClick={() => setContainerType('full')}
                className={cn(
                  "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  containerType === 'full'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                Pleine largeur
              </button>
            </div>
          </section>

          <Separator className="bg-border/30" />

          {/* Sidebar Type - Only show for vertical layout */}
          {layoutType === 'vertical' && (
            <>
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <PanelLeft className="w-3.5 h-3.5" />
                  Barre latérale
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSidebarType('full')}
                    className={cn(
                      "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                      sidebarType === 'full'
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                    )}
                  >
                    Complète
                  </button>
                  <button
                    onClick={() => setSidebarType('mini')}
                    className={cn(
                      "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                      sidebarType === 'mini'
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                    )}
                  >
                    Mini
                  </button>
                </div>
              </section>

              <Separator className="bg-border/30" />
            </>
          )}

          {/* Card Style */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              Style des cartes
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCardStyle('border')}
                className={cn(
                  "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  cardStyle === 'border'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                Bordure
              </button>
              <button
                onClick={() => setCardStyle('shadow')}
                className={cn(
                  "py-2.5 px-3 rounded-lg border text-sm font-medium transition-all",
                  cardStyle === 'shadow'
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30"
                )}
              >
                Ombre
              </button>
            </div>
          </section>

          <Separator className="bg-border/30" />

          {/* Border Radius */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <Circle className="w-3.5 h-3.5" />
                Rayon des bordures
              </div>
              <span className="text-xs font-medium text-foreground bg-muted/50 px-2 py-0.5 rounded">
                {borderRadius}px
              </span>
            </div>
            <Slider
              value={[borderRadius]}
              onValueChange={(value) => setBorderRadius(value[0])}
              min={0}
              max={24}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Carré</span>
              <span>Arrondi</span>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsPanel;
