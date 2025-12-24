import { useState } from 'react';
import { Settings, X, Sun, Moon, Check, RotateCcw } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  useAdminSettings,
  ThemeColor,
  Direction,
  LayoutType,
  ContainerType,
  SidebarType,
  CardStyle,
} from '@/contexts/AdminSettingsContext';

const themeColors: { id: ThemeColor; color: string; label: string }[] = [
  { id: 'yellow', color: 'bg-[#facb2e]', label: 'Jaune' },
  { id: 'blue', color: 'bg-[#5d87ff]', label: 'Bleu' },
  { id: 'purple', color: 'bg-[#7352ff]', label: 'Violet' },
  { id: 'green', color: 'bg-[#02b2aa]', label: 'Vert' },
  { id: 'red', color: 'bg-[#f3704d]', label: 'Rouge' },
  { id: 'cyan', color: 'bg-[#28b7c4]', label: 'Cyan' },
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

  return (
    <TooltipProvider>
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Floating Settings Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <button
                className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 animate-pulse hover:animate-none"
              >
                <Settings className="w-6 h-6" />
              </button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Paramètres d'affichage</p>
          </TooltipContent>
        </Tooltip>

        <SheetContent side="right" className="w-80 sm:w-96 overflow-y-auto bg-card border-l border-border">
          <SheetHeader className="pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">Paramètres</SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSettings}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Réinitialiser
              </Button>
            </div>
          </SheetHeader>

          <div className="py-6 space-y-8">
            {/* Theme Option (Light/Dark) */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Option de thème</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all",
                    theme === 'light'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  <Sun className="w-5 h-5" />
                  <span className="text-sm font-medium">Clair</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all",
                    theme === 'dark'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  <Moon className="w-5 h-5" />
                  <span className="text-sm font-medium">Sombre</span>
                </button>
              </div>
            </div>

            {/* Theme Direction (LTR/RTL) */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Direction du thème</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setDirection('ltr')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    direction === 'ltr'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  LTR
                </button>
                <button
                  onClick={() => setDirection('rtl')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    direction === 'rtl'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  RTL
                </button>
              </div>
            </div>

            {/* Theme Colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Couleurs du thème</h3>
              <div className="flex gap-2 flex-wrap">
                {themeColors.map((color) => (
                  <Tooltip key={color.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setThemeColor(color.id)}
                        className={cn(
                          "w-10 h-10 rounded-full transition-all flex items-center justify-center",
                          color.color,
                          themeColor === color.id
                            ? "ring-2 ring-offset-2 ring-foreground ring-offset-background scale-110"
                            : "hover:scale-105"
                        )}
                      >
                        {themeColor === color.id && (
                          <Check className="w-5 h-5 text-white drop-shadow-md" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Layout Type (Vertical/Horizontal) */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Type de mise en page</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setLayoutType('vertical')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    layoutType === 'vertical'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Vertical
                </button>
                <button
                  onClick={() => setLayoutType('horizontal')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    layoutType === 'horizontal'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Horizontal
                </button>
              </div>
            </div>

            {/* Container Option (Boxed/Full) */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Option de conteneur</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setContainerType('boxed')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    containerType === 'boxed'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Encadré
                </button>
                <button
                  onClick={() => setContainerType('full')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    containerType === 'full'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Pleine largeur
                </button>
              </div>
            </div>

            {/* Sidebar Type (Full/Mini) */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Type de barre latérale</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setSidebarType('full')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    sidebarType === 'full'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Complète
                </button>
                <button
                  onClick={() => setSidebarType('mini')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    sidebarType === 'mini'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Mini
                </button>
              </div>
            </div>

            {/* Card Style (Border/Shadow) */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Style des cartes</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setCardStyle('border')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    cardStyle === 'border'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Bordure
                </button>
                <button
                  onClick={() => setCardStyle('shadow')}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium",
                    cardStyle === 'shadow'
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  Ombre
                </button>
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Rayon des bordures</h3>
                <span className="text-sm text-muted-foreground">{borderRadius}px</span>
              </div>
              <Slider
                value={[borderRadius]}
                onValueChange={(value) => setBorderRadius(value[0])}
                min={0}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0px</span>
                <span>24px</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
};

export default SettingsPanel;
