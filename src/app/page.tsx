'use client';

import React, { useState, useEffect } from 'react';
import { AreaId, GameScreen, GameState } from '../types/game';
import {
  getInitialGameState,
  loadGameState,
  saveGameState,
  completeMissionReward,
} from '../lib/gameState';
import { sound } from '../lib/soundEngine';

// Components
import { Navbar } from '../components/common/Navbar';
import { SplashScreen } from '../components/onboarding/SplashScreen';
import { ProfileCreation } from '../components/onboarding/ProfileCreation';
import { StoryIntroModal } from '../components/onboarding/StoryIntroModal';
import { WorldMap } from '../components/world-map/WorldMap';
import { MissionCelebration } from '../components/missions/MissionCelebration';

// Missions
import { PantaiPenyuGame } from '../components/missions/pantai-penyu/PantaiPenyuGame';
import { LautBiruGame } from '../components/missions/laut-biru/LautBiruGame';
import { HutanHijauGame } from '../components/missions/hutan-hijau/HutanHijauGame';
import { DesaSungaiGame } from '../components/missions/desa-sungai/DesaSungaiGame';
import { KotaBersihGame } from '../components/missions/kota-bersih/KotaBersihGame';

// Extra Feature Screens & Modals
import { GuardianBase } from '../components/base/GuardianBase';
import { BadgesModal } from '../components/badges/BadgesModal';
import { KnowledgeBook } from '../components/knowledge/KnowledgeBook';
import { TanyaBumiModal } from '../components/ai-chat/TanyaBumiModal';
import { TeacherDashboard } from '../components/teacher/TeacherDashboard';
import { DailyMissionsModal } from '../components/daily/DailyMissionsModal';
import { SettingsModal } from '../components/common/SettingsModal';
import { DecisionGameModal } from '../components/decision/DecisionGameModal';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('splash');
  const [activeAreaId, setActiveAreaId] = useState<AreaId | null>(null);

  // Modals state
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDecisionOpen, setIsDecisionOpen] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    areaId: AreaId;
    stars: number;
    nextAreaUnlocked: AreaId | null;
    newBadges: string[];
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
    setCurrentScreen('mission');
  };

  // Select area from World Map
  const handleSelectArea = (areaId: AreaId) => {
    setActiveAreaId(areaId);
    setCurrentScreen('mission');
  };

  // Mission Complete trigger
  const handleMissionComplete = (stars: number, score: number) => {
    if (!activeAreaId) return;

    const { newState, nextAreaUnlocked, newBadgesUnlocked } = completeMissionReward(
      gameState,
      activeAreaId,
      stars,
      score
    );

    setGameState(newState);
    setCelebrationData({
      areaId: activeAreaId,
      stars,
      nextAreaUnlocked,
      newBadges: newBadgesUnlocked,
    });
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
          <WorldMap state={gameState} onSelectArea={handleSelectArea} />
        )}

        {/* Mission Play Area */}
        {currentScreen === 'mission' && activeAreaId === 'pantai-penyu' && (
          <PantaiPenyuGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'mission' && activeAreaId === 'laut-biru' && (
          <LautBiruGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'mission' && activeAreaId === 'hutan-hijau' && (
          <HutanHijauGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'mission' && activeAreaId === 'desa-sungai' && (
          <DesaSungaiGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {currentScreen === 'mission' && activeAreaId === 'kota-bersih' && (
          <KotaBersihGame
            onComplete={handleMissionComplete}
            onExit={() => setCurrentScreen('world-map')}
          />
        )}

        {/* Extra Feature Screens */}
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
          stars={celebrationData.stars}
          nextAreaUnlocked={celebrationData.nextAreaUnlocked}
          newBadges={celebrationData.newBadges}
          onBackToMap={handleBackToMapAfterCelebration}
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
