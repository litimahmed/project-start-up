import { Award, Leaf, Timer, Sparkles, Crown, Fish } from 'lucide-react';

export type BadgeType = 
  | 'chef-selection' 
  | 'seasonal' 
  | 'award' 
  | 'limited' 
  | 'plant-based' 
  | 'sustainable';

interface MenuBadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md';
}

const badgeConfig: Record<BadgeType, { 
  label: string; 
  icon: typeof Award;
  className: string;
}> = {
  'chef-selection': {
    label: 'Sélection du Chef',
    icon: Crown,
    className: 'bg-gradient-to-r from-gold/20 to-gold/10 border-gold/40 text-gold backdrop-blur-sm',
  },
  'seasonal': {
    label: 'De Saison',
    icon: Sparkles,
    className: 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400 backdrop-blur-sm',
  },
  'award': {
    label: 'Primé',
    icon: Award,
    className: 'bg-amber-900/20 border-amber-500/40 text-amber-400 backdrop-blur-sm',
  },
  'limited': {
    label: 'Édition Limitée',
    icon: Timer,
    className: 'bg-burgundy/20 border-burgundy/40 text-burgundy backdrop-blur-sm',
  },
  'plant-based': {
    label: 'Végétal',
    icon: Leaf,
    className: 'bg-green-900/20 border-green-500/30 text-green-400 backdrop-blur-sm',
  },
  'sustainable': {
    label: 'Pêche Durable',
    icon: Fish,
    className: 'bg-sky-900/20 border-sky-400/30 text-sky-400 backdrop-blur-sm',
  },
};

export const MenuBadge = ({ type, size = 'sm' }: MenuBadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;
  
  const sizeClasses = size === 'sm' 
    ? 'px-3 py-1.5 text-[9px] gap-1.5'
    : 'px-4 py-2 text-[10px] gap-2';
  
  const iconSize = size === 'sm' ? 10 : 12;

  return (
    <div 
      className={`
        inline-flex items-center ${sizeClasses}
        border
        tracking-[0.2em] uppercase font-medium
        transition-all duration-300
        hover:scale-105
        ${config.className}
      `}
    >
      <Icon size={iconSize} className="opacity-80" />
      <span>{config.label}</span>
    </div>
  );
};

export const MenuBadges = ({ badges, size = 'sm' }: { badges?: BadgeType[]; size?: 'sm' | 'md' }) => {
  if (!badges || badges.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <MenuBadge key={badge} type={badge} size={size} />
      ))}
    </div>
  );
};

export default MenuBadge;
