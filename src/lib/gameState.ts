import { AreaId, GameState, PlayerProfile } from '../types/game';
import { DAILY_MISSIONS_DEFAULT } from './missionData';

const STORAGE_KEY = 'penjaga_bumi_save_v1';

export const LEVEL_TIERS = [
  { level: 1, title: 'Guardian Pemula', minXp: 0, maxXp: 200 },
  { level: 2, title: 'Sahabat Alam', minXp: 200, maxXp: 500 },
  { level: 3, title: 'Penjaga Satwa', minXp: 500, maxXp: 900 },
  { level: 4, title: 'Penjaga Laut', minXp: 900, maxXp: 1400 },
  { level: 5, title: 'Pelindung Hutan', minXp: 1400, maxXp: 2000 },
  { level: 6, title: 'Pahlawan Bumi', minXp: 2000, maxXp: 2700 },
  { level: 7, title: 'Earth Guardian', minXp: 2700, maxXp: 99999 },
];

export function getLevelInfo(xp: number) {
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      const tier = LEVEL_TIERS[i];
      const nextTier = LEVEL_TIERS[i + 1] || tier;
      const currentTierXp = xp - tier.minXp;
      const requiredXp = nextTier.minXp - tier.minXp;
      const progressPercent = tier.level === 7 ? 100 : Math.min(100, Math.round((currentTierXp / requiredXp) * 100));
      return {
        level: tier.level,
        title: tier.title,
        currentTierXp,
        requiredXp,
        progressPercent,
      };
    }
  }
  return {
    level: 1,
    title: LEVEL_TIERS[0].title,
    currentTierXp: xp,
    requiredXp: 200,
    progressPercent: 0,
  };
}

export function getInitialGameState(): GameState {
  return {
    player: null,
    xp: 0,
    level: 1,
    ecoPoints: 50,
    earthHealth: 20, // initial gloomy 20%
    unlockedAreas: ['pantai-penyu'],
    completedMissions: {},
    completedStages: {},
    currentAreaId: null,
    currentStageNumber: 1,
    badges: [],
    knowledgeCards: ['kc-penyu', 'kc-karang'],
    baseDecorations: [],
    dailyMissions: DAILY_MISSIONS_DEFAULT,
    settings: {
      soundEnabled: true,
      musicEnabled: true,
      speechVolume: 1,
    },
    teacherAnalytics: {
      sessionsCount: 1,
      totalPlayMinutes: 1,
      trashCollected: 0,
      animalsHelped: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      topicMastery: {
        'Lingkungan Laut': 3,
        'Pemilahan Sampah': 2.5,
        'Habitat Hewan': 3,
        'Pencemaran Air': 2,
        'Energi Bersih': 2.5,
        'Berpikir Kritis & Ekosistem': 3,
      },
    },
  };
}

export function loadGameState(): GameState {
  if (typeof window === 'undefined') return getInitialGameState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialGameState();
    const parsed = JSON.parse(raw);
    return {
      ...getInitialGameState(),
      ...parsed,
      completedStages: parsed.completedStages || {},
      currentStageNumber: parsed.currentStageNumber || 1,
    };
  } catch {
    return getInitialGameState();
  }
}

export function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

const NEXT_AREA_MAP: Record<AreaId, AreaId | null> = {
  'pantai-penyu': 'laut-biru',
  'laut-biru': 'hutan-hijau',
  'hutan-hijau': 'desa-sungai',
  'desa-sungai': 'kota-bersih',
  'kota-bersih': null,
};

const AREA_HEALTH_MAP: Record<AreaId, number> = {
  'pantai-penyu': 35,
  'laut-biru': 50,
  'hutan-hijau': 70,
  'desa-sungai': 85,
  'kota-bersih': 100,
};

const AREA_BADGE_MAP: Record<AreaId, string> = {
  'pantai-penyu': 'badge-penyu',
  'laut-biru': 'badge-laut',
  'hutan-hijau': 'badge-hutan',
  'desa-sungai': 'badge-sungai',
  'kota-bersih': 'badge-daurulang',
};

const AREA_CARD_MAP: Record<AreaId, string[]> = {
  'pantai-penyu': ['kc-penyu'],
  'laut-biru': ['kc-karang'],
  'hutan-hijau': ['kc-pohon'],
  'desa-sungai': ['kc-sungai'],
  'kota-bersih': ['kc-sampah-organik', 'kc-sampah-plastik'],
};

export function isStageUnlocked(state: GameState, areaId: AreaId, stageNumber: number): boolean {
  if (!state.unlockedAreas.includes(areaId)) return false;
  if (stageNumber === 1) return true;
  // If whole area was completed previously
  if (state.completedMissions[areaId]) return true;
  // Check previous stage
  const prevStageKey = `${areaId}-${stageNumber - 1}`;
  return !!state.completedStages?.[prevStageKey];
}

export function completeStageReward(
  state: GameState,
  areaId: AreaId,
  stageNumber: number,
  starsEarned = 3,
  scoreEarned = 100
): {
  newState: GameState;
  nextStageUnlocked: number | null;
  nextAreaUnlocked: AreaId | null;
  newBadgesUnlocked: string[];
} {
  const stageKey = `${areaId}-${stageNumber}`;
  const existingStage = state.completedStages?.[stageKey];
  const bestStars = Math.max(starsEarned, existingStage?.stars || 0);

  const xpReward = stageNumber === 1 ? 120 : stageNumber === 2 ? 180 : 250;
  const pointsReward = stageNumber === 1 ? 60 : stageNumber === 2 ? 90 : 120;

  const newXp = state.xp + xpReward;
  const newLevelInfo = getLevelInfo(newXp);
  const newPoints = state.ecoPoints + pointsReward;

  const updatedCompletedStages = {
    ...(state.completedStages || {}),
    [stageKey]: {
      stars: bestStars,
      completedAt: Date.now(),
      score: Math.max(scoreEarned, existingStage?.score || 0),
    },
  };

  let nextStageUnlocked: number | null = null;
  if (stageNumber < 3) {
    nextStageUnlocked = stageNumber + 1;
  }

  let nextArea: AreaId | null = null;
  const newlyUnlockedBadges: string[] = [];
  const badges = new Set<string>(state.badges);
  const unlocked = new Set<AreaId>(state.unlockedAreas);
  let newEarthHealth = state.earthHealth;

  const completedMissions = { ...state.completedMissions };

  // If completing stage 3, area is fully conquered!
  if (stageNumber === 3) {
    const targetHealth = AREA_HEALTH_MAP[areaId];
    newEarthHealth = Math.max(state.earthHealth, targetHealth);

    nextArea = NEXT_AREA_MAP[areaId];
    if (nextArea) {
      unlocked.add(nextArea);
    }

    const areaBadge = AREA_BADGE_MAP[areaId];
    if (areaBadge && !badges.has(areaBadge)) {
      badges.add(areaBadge);
      newlyUnlockedBadges.push(areaBadge);
    }

    completedMissions[areaId] = {
      stars: bestStars,
      completedAt: Date.now(),
      highScore: Math.max(scoreEarned, completedMissions[areaId]?.highScore || 0),
    };

    const allFive = (['pantai-penyu', 'laut-biru', 'hutan-hijau', 'desa-sungai', 'kota-bersih'] as AreaId[]).every(
      id => !!completedMissions[id]
    );
    if (allFive && !badges.has('badge-earth-guardian')) {
      badges.add('badge-earth-guardian');
      newlyUnlockedBadges.push('badge-earth-guardian');
    }
  }

  // Knowledge cards
  const cards = new Set<string>(state.knowledgeCards);
  const areaCards = AREA_CARD_MAP[areaId] || [];
  areaCards.forEach(c => cards.add(c));

  // Analytics
  const teacherAnalytics = { ...state.teacherAnalytics };
  teacherAnalytics.trashCollected += 5;
  teacherAnalytics.animalsHelped += 1;
  teacherAnalytics.questionsAnswered += 2;
  teacherAnalytics.correctAnswers += 2;

  if (stageNumber >= 2) {
    teacherAnalytics.topicMastery['Berpikir Kritis & Ekosistem'] = Math.min(
      5,
      (teacherAnalytics.topicMastery['Berpikir Kritis & Ekosistem'] || 3) + 0.4
    );
  }

  const newState: GameState = {
    ...state,
    xp: newXp,
    level: newLevelInfo.level,
    ecoPoints: newPoints,
    earthHealth: newEarthHealth,
    unlockedAreas: Array.from(unlocked),
    completedMissions,
    completedStages: updatedCompletedStages,
    badges: Array.from(badges),
    knowledgeCards: Array.from(cards),
    teacherAnalytics,
  };

  saveGameState(newState);
  return {
    newState,
    nextStageUnlocked,
    nextAreaUnlocked: nextArea,
    newBadgesUnlocked: newlyUnlockedBadges,
  };
}

export function completeMissionReward(
  state: GameState,
  areaId: AreaId,
  starsEarned = 3,
  scoreEarned = 100
) {
  // Backwards compatible wrapper around completeStageReward for stage 1
  return completeStageReward(state, areaId, 1, starsEarned, scoreEarned);
}
