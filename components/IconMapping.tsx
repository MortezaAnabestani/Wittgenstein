
import React from 'react';
import { 
  Palette, Car, CloudRain, Flower2, Music, Camera, 
  Shapes, Trophy, Banknote, Apple, HelpCircle,
  Bed, Lamp, Armchair, Home, Zap
} from 'lucide-react';

interface IconProps {
  name?: string;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  'Palette': Palette,
  'Car': Car,
  'CloudRain': CloudRain,
  'Flower2': Flower2,
  'Music': Music,
  'Camera': Camera,
  'Shapes': Shapes,
  'Trophy': Trophy,
  'Banknote': Banknote,
  'Apple': Apple,
  'Bed': Bed,
  'Lamp': Lamp,
  'Armchair': Armchair,
  'Home': Home,
  'Zap': Zap
};

export const IconMapping: React.FC<IconProps> = ({ name, size = 24, className }) => {
  if (!name) return null;
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent size={size} className={className} />;
};
