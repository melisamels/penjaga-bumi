export type AreaId = 
  | 'pantai-penyu' 
  | 'laut-biru' 
  | 'hutan-hijau' 
  | 'desa-sungai' 
  | 'kota-bersih'
  | 'puncak-gunung'
  | 'langit-ozon';

export type GameScreen = 
  | 'splash' 
  | 'onboarding' 
  | 'story-intro' 
  | 'world-map' 
  | 'mission' 
  | 'base' 
  | 'knowledge' 
  | 'badges' 
  | 'daily' 
  | 'teacher' 
  | 'ai-chat' 
  | 'decision-game'
  | 'license';

export type StageDifficulty = 'mudah' | 'menengah' | 'berpikir';

export interface AreaStage {
  id: string; // e.g. 'pantai-penyu-1'
  areaId: AreaId;
  stageNumber: number; // 1, 2, 3
  title: string;
  subtitle: string;
  difficulty: StageDifficulty;
  thinkingSkill: string;
  description: string;
  icon: string;
}

export interface GuardianTier {
  tierLevel: number; // 1 to 5
  title: string;
  subtitle: string;
  requiredStages: number;
  badgeIcon: string;
  accentColor: string;
  description: string;
}

export interface PlayerProfile {
  name: string;
  avatarId: string;
  createdAt: number;
}

export interface AvatarInfo {
  id: string;
  name: string;
  description: string;
  hairColor: string;
  shirtColor: string;
  skinTone: string;
  accessory?: string;
}

export interface CompletedMissionData {
  stars: number;
  completedAt: number;
  highScore: number;
}

export interface CompletedStageData {
  stars: number;
  completedAt: number;
  score: number;
}

export interface BaseItem {
  id: string;
  name: string;
  category: 'flora' | 'fauna' | 'energy' | 'water';
  cost: number;
  icon: string;
  description: string;
  placed: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  areaRequired?: AreaId;
  unlocked: boolean;
}

export interface KnowledgeCard {
  id: string;
  title: string;
  subtitle: string;
  category: 'Laut' | 'Hutan' | 'Sungai' | 'Kota' | 'Satwa' | 'Gunung' | 'Atmosfer';
  icon: string;
  summary: string;
  funFact: string;
  unlocked: boolean;
}

export interface DailyMission {
  id: string;
  title: string;
  target: number;
  current: number;
  rewardPoints: number;
  rewardXp: number;
  completed: boolean;
  claimed: boolean;
}

export interface TeacherAnalytics {
  sessionsCount: number;
  totalPlayMinutes: number;
  trashCollected: number;
  animalsHelped: number;
  questionsAnswered: number;
  correctAnswers: number;
  topicMastery: {
    'Lingkungan Laut': number;
    'Pemilahan Sampah': number;
    'Habitat Hewan': number;
    'Pencemaran Air': number;
    'Energi Bersih': number;
    'Berpikir Kritis & Ekosistem'?: number;
  };
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  speechVolume: number;
}

export interface GameState {
  player: PlayerProfile | null;
  xp: number;
  level: number;
  guardianTier: number; // 1 to 5
  ecoPoints: number;
  earthHealth: number; // 20 - 100
  unlockedAreas: AreaId[];
  completedMissions: Partial<Record<AreaId, CompletedMissionData>>;
  completedStages: Record<string, CompletedStageData>; // key: `${areaId}-${stageNumber}`
  currentAreaId: AreaId | null;
  currentStageNumber: number; // 1, 2, 3
  badges: string[];
  knowledgeCards: string[];
  baseDecorations: string[];
  dailyMissions: DailyMission[];
  settings: GameSettings;
  teacherAnalytics: TeacherAnalytics;
}

export interface DecisionScenario {
  id: string;
  title: string;
  situation: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    ecoImpact: string;
  }[];
}
