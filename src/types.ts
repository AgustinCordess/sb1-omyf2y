export interface User {
  name: string;
  level: number;
  points: number;
  pointsPerHour: number;
  pointsPerClick: number;
  theme: 'light' | 'dark';
  soundVolume: number;
  notifications: boolean;
  wallet: string;
  dailyBonuses: DailyBonus[];
  inventory: InventoryItem[];
  friends: Friend[];
  tasks: Task[];
}

export interface DailyBonus {
  day: number;
  reward: number;
  claimed: boolean;
}

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
}

export interface Friend {
  id: string;
  name: string;
  level: number;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  reward: number;
  completed: boolean;
}

export interface Reward {
  id: number;
  name: string;
  icon: string;
  timeRemaining: number;
}

export interface PurchasableReward {
  id: number;
  name: string;
  description: string;
  cost: number;
  pointsPerHourIncrease: number;
}

export interface NavItem {
  id: number;
  name: string;
  icon: string;
  path: string;
}