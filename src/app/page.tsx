'use client';

import React, { useState, useEffect } from 'react';
import { AreaId, GameScreen, GameState } from '../types/game';
import {
  getInitialGameState,
  loadGameState,
  saveGameState,
  completeStageReward,
} from '../lib/gameState';
import { sound } from '../lib/soundEngine';

// Common & Onboarding Components
import { Navbar } from '../components/common/Navbar';
import { SplashScreen } from '../components/onboarding/SplashScreen';
import { ProfileCreation } from '../components/onboarding/ProfileCreation';
import { StoryIntroModal } from '../components/onboarding/StoryIntroModal';
import { WorldMap } from '../components/world-map/WorldMap';
import { MissionCelebration } from '../components/missions/MissionCelebration';

// 21 Stage Components across 7 Elevation Tier Areas
// Chapter 1: Pantai Penyu (Tier 1)
import { PantaiPenyuGame } from '../components/missions/pantai-penyu/PantaiPenyuGame';
import { TukikRescueStage } from '../components/missions/pantai-penyu/TukikRescueStage';
import { MangroveDefenseStage } from '../components/missions/pantai-penyu/MangroveDefenseStage';

// Chapter 2: Laut Biru (Tier 1)
import { LautBiruGame } from '../components/missions/laut-biru/LautBiruGame';
import { CoralFoodChainStage } from '../components/missions/laut-biru/CoralFoodChainStage';
import { GhostNetRescueStage } from '../components/missions/laut-biru/GhostNetRescueStage';

// Chapter 3: Hutan Hijau (Tier 2)
import { HutanHijauGame } from '../components/missions/hutan-hijau/HutanHijauGame';
import { CanopyBridgeStage } from '../components/missions/hutan-hijau/CanopyBridgeStage';
import { PeatlandHydrologyStage } from '../components/missions/hutan-hijau/PeatlandHydrologyStage';

// Chapter 4: Desa Sungai (Tier 2)
import { DesaSungaiGame } from '../components/missions/desa-sungai/DesaSungaiGame';
import { BiofiltrationLabStage } from '../components/missions/desa-sungai/BiofiltrationLabStage';
import { WaterBalanceStage } from '../components/missions/desa-sungai/WaterBalanceStage';

// Chapter 5: Kota Bersih (Tier 3)
import { KotaBersihGame } from '../components/missions/kota-bersih/KotaBersihGame';
import { CircularEconomyStage } from '../components/missions/kota-bersih/CircularEconomyStage';
import { EcoCityPlannerStage } from '../components/missions/kota-bersih/EcoCityPlannerStage';

// Chapter 6: Puncak Mahameru (Tier 4)
import { PuncakGunungStage1 } from '../components/missions/puncak-gunung/PuncakGunungStage1';
import { PuncakGunungStage2 } from '../components/missions/puncak-gunung/PuncakGunungStage2';
import { PuncakGunungStage3 } from '../components/missions/puncak-gunung/PuncakGunungStage3';

// Chapter 7: Langit Ozon (Tier 5)
import { LangitOzonStage1 } from '../components/missions/langit-ozon/LangitOzonStage1';
import { LangitOzonStage2 } from '../components/missions/langit-ozon/LangitOzonStage2';
import { LangitOzonStage3 } from '../components/missions/langit-ozon/LangitOzonStage3';

// Extra Feature Screens & Modals
import { GuardianBase } from '../components/base/GuardianBase';
import { BadgesModal } from '../components/badges/BadgesModal';
import { KnowledgeBook } from '../components/knowledge/KnowledgeBook';
import { TanyaBumiModal } from '../components/ai-chat/TanyaBumiModal';
import { TeacherDashboard } from '../components/teacher/TeacherDashboard';
import { DailyMissionsModal } from '../components/daily/DailyMissionsModal';
import { SettingsModal } from '../components/common/SettingsModal';
import { DecisionGameModal } from '../components/decision/DecisionGameModal';
import { GuardianLicenseModal } from '../components/license/GuardianLicenseModal';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('splash');
  const [activeAreaId, setActiveAreaId] = useState<AreaId | null>(null);
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);

  // Modals state
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDecisionOpen, setIsDecisionOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    areaId: AreaId;
    stageNumber: number;
    stars: number;
    nextStageUnlocked: number | null;
    nextAreaUnlocked: AreaId | null;
    newBadges: string[];
    newTierUnlocked: number | null;
  } | null>(null);

  // Load game state from local storage
  useEffect(() => {
    const saved = loadGameState();
    setGameState(saved);
    sound.setEnabled(saved.settings.soundEnabled);
    setIsLoaded(true);
  }, []);

  // Save changes
  const updateGameState = (updater: (prev: GameState) => GameState) => {
    setGameState(prev => {
      const next = updater(prev);
      saveGameState(next);
      return next;
    });
  };

  const handleToggleSound = () => {
    const nextSound = !gameState.settings.soundEnabled;
    sound.setEnabled(nextSound);
    if (nextSound) sound.playPop();
    updateGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, soundEnabled: nextSound },
    }));
  };

  // Start adventure flow
  const handleStartGame = () => {
    if (!gameState.player) {
      setCurrentScreen('onboarding');
    } else {
      setCurrentScreen('world-map');
    }
  };

  // Profile creation complete
  const handleProfileCreated = (name: string, avatarId: string) => {
    updateGameState(prev => ({
      ...prev,
      player: {
        name,
        avatarId,
        createdAt: Date.now(),
      },
    }));
    setCurrentScreen('story-intro');
  };

  // Start first mission from emergency call
  const handleStartFirstMission = () => {
    setActiveAreaId('pantai-penyu');
    setActiveStageNumber(1);
    setCurrentScreen('mission');
  };

  // Select area & stage from World Map
  const handleSelectStage = (areaId: AreaId, stageNumber: number) => {
    setActiveAreaId(areaId);
    setActiveStageNumber(stageNumber);
    setCurrentScreen('mission');
  };

  // Stage Mission Complete trigger
  const handleMissionComplete = (stars: number, score: number) => {
    if (!activeAreaId) return;

    const {
      newState,
      nextStageUnlocked,
      nextAreaUnlocked,
      newBadgesUnlocked,
      newTierUnlocked,
    } = completeStageReward(
      gameState,
      activeAreaId,
      activeStageNumber,
      stars,
      score
    );

    setGameState(newState);
    setCelebrationData({
      areaId: activeAreaId,
      stageNumber: activeStageNumber,
      stars,
      nextStageUnlocked,
      nextAreaUnlocked,
      newBadges: newBadgesUnlocked,
      newTierUnlocked,
    });
  };

  // Advance to next stage directly from celebration
  const handleNextStage = () => {
    if (!celebrationData?.nextStageUnlocked || !activeAreaId) return;
    const nextLvl = celebrationData.nextStageUnlocked;
    setCelebrationData(null);
    setActiveStageNumber(nextLvl);
    setCurrentScreen('mission');
  };

  // Return to World Map after celebration
  const handleBackToMapAfterCelebration = () => {
    setCelebrationData(null);
    setActiveAreaId(null);
    setCurrentScreen('world-map');
  };

  // Reset Progress for fresh player
  const handleResetProgress = () => {
    const fresh = getInitialGameState();
    setGameState(fresh);
    saveGameState(fresh);
    sound.playSuccess();
    setCurrentScreen('splash');
  };

  // Claim daily mission reward
  const handleClaimDaily = (missionId: string) => {
    sound.playSuccess();
    updateGameState(prev => {
      const mission = prev.dailyMissions.find(m => m.id === missionId);
      if (!mission || mission.claimed) return prev;

      const updatedMissions = prev.dailyMissions.map(m =>
        m.id === missionId ? { ...m, claimed: true, completed: true } : m
      );

      return {
        ...prev,
        ecoPoints: prev.ecoPoints + mission.rewardPoints,
        xp: prev.xp + mission.rewardXp,
        dailyMissions: updatedMissions,
      };
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-black text-xl">
        <span className="animate-spin text-4xl mr-3">🌍</span>
        <span>Memuat Dunia Penjaga Bumi...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-game antialiased">
      {/* Persistent Navbar */}
      <Navbar
        state={gameState}
        currentScreen={currentScreen}
        onNavigate={screen => {
          setCelebrationData(null);
          setCurrentScreen(screen);
        }}
        onToggleSound={handleToggleSound}
        onOpenTeacher={() => setCurrentScreen('teacher')}
      />

      {/* Main Game Screen Routing */}
      <main className="flex-1 flex flex-col relative">
        {currentScreen === 'splash' && (
          <SplashScreen
            hasPlayer={!!gameState.player}
            onStart={handleStartGame}
            onNavigate={screen => setCurrentScreen(screen)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenDaily={() => setIsDailyOpen(true)}
          />
        )}

        {currentScreen === 'onboarding' && (
          <ProfileCreation onComplete={handleProfileCreated} />
        )}

        {currentScreen === 'story-intro' && (
          <StoryIntroModal
            playerName={gameState.player?.name || 'Guardian'}
            onStartMission={handleStartFirstMission}
          />
        )}

        {currentScreen === 'world-map' && (
          <WorldMap
            state={gameState}
            onSelectStage={handleSelectStage}
            onOpenLicense={() => setCurrentScreen('license')}
          />
        )}

        {/* 21 Progressive Stages across 7 Elevation Tier Areas */}
        {/* Chapter 1: Pantai Penyu (Tier 1) */}
        {currentScreen === 'mission' && activeAreaId === 'pantai-penyu' && activeStageNumber === 1 && (
          <PantaiPenyuGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'pantai-penyu' && activeStageNumber === 2 && (
          <TukikRescueStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'pantai-penyu' && activeStageNumber === 3 && (
          <MangroveDefenseStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Chapter 2: Laut Biru (Tier 1) */}
        {currentScreen === 'mission' && activeAreaId === 'laut-biru' && activeStageNumber === 1 && (
          <LautBiruGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'laut-biru' && activeStageNumber === 2 && (
          <CoralFoodChainStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'laut-biru' && activeStageNumber === 3 && (
          <GhostNetRescueStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Chapter 3: Hutan Hijau (Tier 2) */}
        {currentScreen === 'mission' && activeAreaId === 'hutan-hijau' && activeStageNumber === 1 && (
          <HutanHijauGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'hutan-hijau' && activeStageNumber === 2 && (
          <CanopyBridgeStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'hutan-hijau' && activeStageNumber === 3 && (
          <PeatlandHydrologyStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Chapter 4: Desa Sungai (Tier 2) */}
        {currentScreen === 'mission' && activeAreaId === 'desa-sungai' && activeStageNumber === 1 && (
          <DesaSungaiGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'desa-sungai' && activeStageNumber === 2 && (
          <BiofiltrationLabStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'desa-sungai' && activeStageNumber === 3 && (
          <WaterBalanceStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Chapter 5: Kota Bersih (Tier 3) */}
        {currentScreen === 'mission' && activeAreaId === 'kota-bersih' && activeStageNumber === 1 && (
          <KotaBersihGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'kota-bersih' && activeStageNumber === 2 && (
          <CircularEconomyStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'kota-bersih' && activeStageNumber === 3 && (
          <EcoCityPlannerStage
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Chapter 6: Puncak Mahameru (Tier 4) */}
        {currentScreen === 'mission' && activeAreaId === 'puncak-gunung' && activeStageNumber === 1 && (
          <PuncakGunungStage1
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'puncak-gunung' && activeStageNumber === 2 && (
          <PuncakGunungStage2
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'puncak-gunung' && activeStageNumber === 3 && (
          <PuncakGunungStage3
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Chapter 7: Langit Ozon (Tier 5) */}
        {currentScreen === 'mission' && activeAreaId === 'langit-ozon' && activeStageNumber === 1 && (
          <LangitOzonStage1
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'langit-ozon' && activeStageNumber === 2 && (
          <LangitOzonStage2
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}
        {currentScreen === 'mission' && activeAreaId === 'langit-ozon' && activeStageNumber === 3 && (
          <LangitOzonStage3
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Extra Feature Screens */}
        {currentScreen === 'license' && (
          <GuardianLicenseModal
            state={gameState}
            onClose={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'base' && (
          <GuardianBase
            state={gameState}
            onUpdateState={updateGameState}
            onBackToMap={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'badges' && (
          <BadgesModal
            state={gameState}
            onClose={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'knowledge' && (
          <KnowledgeBook
            state={gameState}
            onClose={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'ai-chat' && (
          <TanyaBumiModal onClose={() => setCurrentScreen('world-map')} />
        )}

        {currentScreen === 'teacher' && (
          <TeacherDashboard
            state={gameState}
            onClose={() => setCurrentScreen('world-map')}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Mission Celebration Overlay */}
      {celebrationData && (
        <MissionCelebration
          areaId={celebrationData.areaId}
          stageNumber={celebrationData.stageNumber}
          stars={celebrationData.stars}
          nextStageUnlocked={celebrationData.nextStageUnlocked}
          nextAreaUnlocked={celebrationData.nextAreaUnlocked}
          newBadges={celebrationData.newBadges}
          newTierUnlocked={celebrationData.newTierUnlocked}
          onBackToMap={handleBackToMapAfterCelebration}
          onNextStage={handleNextStage}
        />
      )}

      {/* Daily Missions Modal */}
      {isDailyOpen && (
        <DailyMissionsModal
          state={gameState}
          onClaim={handleClaimDaily}
          onClose={() => setIsDailyOpen(false)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          state={gameState}
          onToggleSound={handleToggleSound}
          onOpenDecisionGame={() => setIsDecisionOpen(true)}
          onResetProgress={handleResetProgress}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* AI Decision Game Modal */}
      {isDecisionOpen && (
        <DecisionGameModal
          onSuccess={(points, xp) => {
            updateGameState(prev => ({
              ...prev,
              ecoPoints: prev.ecoPoints + points,
              xp: prev.xp + xp,
            }));
          }}
          onClose={() => setIsDecisionOpen(false)}
        />
      )}
    </div>
  );
}
