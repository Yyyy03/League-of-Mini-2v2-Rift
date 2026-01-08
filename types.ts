export type Vector2 = { x: number; y: number };

export enum UnitType {
  CHAMPION = 'CHAMPION',
  MINION = 'MINION',
  TURRET = 'TURRET',
  NEXUS = 'NEXUS',
}

export enum Team {
  ORDER = 'ORDER', // Blue/Green (Player)
  CHAOS = 'CHAOS', // Red (Enemy)
}

export enum DamageType {
  PHYSICAL = 'PHYSICAL',
  MAGIC = 'MAGIC',
  TRUE = 'TRUE',
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name or placeholder
  cooldownMax: number;
  damage?: number;
  range: number;
  cost: number;
  type: 'skillshot' | 'target' | 'self';
  color: string;
}

export interface Stats {
  maxHp: number;
  hp: number;
  maxMana: number;
  mana: number;
  ad: number; // Attack Damage
  ap: number; // Ability Power
  armor: number;
  mr: number; // Magic Resist
  attackRange: number;
  moveSpeed: number;
  attackSpeed: number; // Attacks per second
}

export interface Item {
  id: string;
  name: string;
  cost: number;
  stats: Partial<Stats>;
  icon: string;
  description: string;
}

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  team: Team;
  position: Vector2;
  stats: Stats;
  targetId: string | null;
  lastAttackTime: number;
  isDead: boolean;
  avatarUrl: string;
  role?: 'Fighter' | 'Mage' | 'Marksman' | 'Assassin' | 'Tank';
  abilities: Ability[];
  items: string[]; // List of item IDs
  cooldowns: Record<string, number>; // abilityId -> timestamp when ready
  level: number;
  gold: number;
  respawnTimer: number;
  isRecalling?: boolean;
  recallTimer?: number;
}

export interface Projectile {
  id: string;
  position: Vector2;
  targetId: string | null; // If null, it's a skillshot traveling to targetPos
  targetPos: Vector2;
  speed: number;
  damage: number;
  ownerId: string;
  team: Team;
  radius: number;
  color: string;
  type: 'auto' | 'ability';
}

export interface GameState {
  units: Unit[];
  projectiles: Projectile[];
  time: number;
  gameStatus: 'LOBBY' | 'PLAYING' | 'VICTORY' | 'DEFEAT';
}