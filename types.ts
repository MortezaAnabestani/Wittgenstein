
export interface WordItem {
  id: string;
  text: string;
  categoryId: string;
  isSolved: boolean;
  isToken?: boolean;
  iconName?: string;
}

export interface Category {
  id: string;
  title: string;
  color: string;
  words: string[];
  icon?: string;
  isVisual?: boolean;
  isSubCategory?: boolean;
  transformsTo?: string;
  targetCategoryId?: string;
}

export interface MapCoordinates {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface LevelData {
  id: number;
  title: string;
  description?: string;
  categories: Category[]; 
  decoys?: string[]; 
  mapCoordinates?: MapCoordinates;
}

export interface ShopItem {
  id: string;
  name: string;
  cost: number;
  icon: string;
  action: 'hint' | 'time';
}

export interface FeedbackEvent {
  id: number;
  text: string;
  x: number;
  y: number;
  color?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface PlayerStats {
  level: number;
  xp: number;
  totalWins: number;
}

export interface CollectionItem {
  id: string;
  icon: string;
  name: string;
  unlockedAt: number; // timestamp
  levelId: number;
}

export interface DailyRewardState {
  lastClaimDate: string;
  streak: number;
}

export type GameStatus = 'map' | 'playing' | 'won';
export type ViewState = 'map' | 'game';
