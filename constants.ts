import { Unit, UnitType, Team, DamageType, Ability, Item } from './types';

// Map Configuration
export const MAP_WIDTH = 2000;
export const MAP_HEIGHT = 1200;
export const LANE_Y = MAP_HEIGHT / 2;

// Colors
export const COLORS = {
  ORDER_HP: '#22c55e', // Green-500
  CHAOS_HP: '#ef4444', // Red-500
  MANA: '#3b82f6', // Blue-500
  GOLD: '#eab308', // Yellow-500
  HEXTECH_BLUE: '#0ac8b9',
  HEXTECH_GOLD: '#c8aa6e',
  DARK_BG: '#091428',
};

// Items
export const ITEMS: Item[] = [
  {
    id: 'long_sword',
    name: '长剑',
    cost: 350,
    stats: { ad: 10 },
    icon: 'Sword',
    description: '+10 攻击力'
  },
  {
    id: 'boots',
    name: '草鞋',
    cost: 300,
    stats: { moveSpeed: 25 },
    icon: 'Footprints',
    description: '+25 移动速度'
  },
  {
    id: 'amp_tome',
    name: '增幅典籍',
    cost: 400,
    stats: { ap: 20 },
    icon: 'Zap',
    description: '+20 法术强度'
  },
  {
    id: 'ruby_crystal',
    name: '红水晶',
    cost: 400,
    stats: { maxHp: 150 },
    icon: 'Heart',
    description: '+150 生命值'
  },
  {
    id: 'cloth_armor',
    name: '布甲',
    cost: 300,
    stats: { armor: 15 },
    icon: 'Shield',
    description: '+15 护甲'
  },
  {
    id: 'dagger',
    name: '短剑',
    cost: 300,
    stats: { attackSpeed: 0.12 },
    icon: 'Sword', 
    description: '+12% 攻击速度'
  }
];

// Champions
export const CHAMPIONS: Partial<Unit>[] = [
  {
    name: '盖伦兹',
    role: 'Fighter',
    avatarUrl: 'https://picsum.photos/id/10/200/200',
    stats: {
      maxHp: 2000, hp: 2000, maxMana: 0, mana: 0,
      ad: 120, ap: 0, armor: 60, mr: 50,
      attackRange: 150, moveSpeed: 280, attackSpeed: 0.8
    },
    abilities: [
      { id: 'q', name: '致命打击', description: '获得加速并强化下一次攻击。', icon: 'Sword', cooldownMax: 6000, range: 150, cost: 0, type: 'self', color: '#eab308' },
      { id: 'r', name: '德玛西亚正义', description: '对目标造成巨额斩杀伤害。', icon: 'Sword', cooldownMax: 30000, range: 400, cost: 0, type: 'target', color: '#fbbf24' }
    ]
  },
  {
    name: '拉克丝娜',
    role: 'Mage',
    avatarUrl: 'https://picsum.photos/id/20/200/200',
    stats: {
      maxHp: 1200, hp: 1200, maxMana: 800, mana: 800,
      ad: 60, ap: 150, armor: 30, mr: 35,
      attackRange: 550, moveSpeed: 260, attackSpeed: 0.65
    },
    abilities: [
      { id: 'q', name: '光之束缚', description: '禁锢直线上的敌人。', icon: 'Zap', cooldownMax: 8000, range: 900, cost: 60, type: 'skillshot', color: '#fef08a' },
      { id: 'r', name: '终极闪光', description: '发射巨大的激光束。', icon: 'Sun', cooldownMax: 25000, range: 1500, cost: 100, type: 'skillshot', color: '#fde047' }
    ]
  },
  {
    name: '艾希',
    role: 'Marksman',
    avatarUrl: 'https://picsum.photos/id/30/200/200',
    stats: {
      maxHp: 1300, hp: 1300, maxMana: 500, mana: 500,
      ad: 140, ap: 0, armor: 35, mr: 30,
      attackRange: 600, moveSpeed: 270, attackSpeed: 1.1
    },
    abilities: [
      { id: 'q', name: '射手专注', description: '短时间内增加攻击速度。', icon: 'Crosshair', cooldownMax: 10000, range: 0, cost: 40, type: 'self', color: '#60a5fa' },
      { id: 'r', name: '魔法水晶箭', description: '全图范围的眩晕箭矢。', icon: 'Snowflake', cooldownMax: 40000, range: 2000, cost: 100, type: 'skillshot', color: '#93c5fd' }
    ]
  },
  {
    name: '劫',
    role: 'Assassin',
    avatarUrl: 'https://picsum.photos/id/40/200/200',
    stats: {
      maxHp: 1500, hp: 1500, maxMana: 200, mana: 200, // Energy
      ad: 160, ap: 0, armor: 40, mr: 40,
      attackRange: 150, moveSpeed: 310, attackSpeed: 0.9
    },
    abilities: [
      { id: 'q', name: '手里剑', description: '投掷一枚锋利的手里剑。', icon: 'Target', cooldownMax: 5000, range: 700, cost: 40, type: 'skillshot', color: '#ef4444' },
      { id: 'r', name: '死亡印记', description: '冲向敌人并引爆印记。', icon: 'Skull', cooldownMax: 35000, range: 500, cost: 0, type: 'target', color: '#7f1d1d' }
    ]
  }
];

export const INITIAL_TOWERS: Partial<Unit>[] = [
  {
    name: '秩序方防御塔',
    type: UnitType.TURRET,
    team: Team.ORDER,
    position: { x: 300, y: LANE_Y },
    stats: { maxHp: 3000, hp: 3000, maxMana: 0, mana: 0, ad: 200, ap: 0, armor: 100, mr: 100, attackRange: 700, moveSpeed: 0, attackSpeed: 0.8 },
    avatarUrl: '',
    isDead: false,
    abilities: [],
    cooldowns: {}
  },
  {
    name: '混沌方防御塔',
    type: UnitType.TURRET,
    team: Team.CHAOS,
    position: { x: MAP_WIDTH - 300, y: LANE_Y },
    stats: { maxHp: 3000, hp: 3000, maxMana: 0, mana: 0, ad: 200, ap: 0, armor: 100, mr: 100, attackRange: 700, moveSpeed: 0, attackSpeed: 0.8 },
    avatarUrl: '',
    isDead: false,
    abilities: [],
    cooldowns: {}
  }
];

export const NEXUS_HP = 5000;