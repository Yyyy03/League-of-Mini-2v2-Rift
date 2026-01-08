import React, { useState } from 'react';
import Lobby from './components/Lobby';
import GameArena from './components/GameArena';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'LOBBY' | 'GAME'>('LOBBY');
  const [selectedChampion, setSelectedChampion] = useState<number>(0);

  const handleStartGame = (champIndex: number) => {
    setSelectedChampion(champIndex);
    setGameState('GAME');
  };

  const handleExitGame = () => {
    setGameState('LOBBY');
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {gameState === 'LOBBY' && <Lobby onStart={handleStartGame} />}
      {gameState === 'GAME' && <GameArena playerChampionIndex={selectedChampion} onExit={handleExitGame} />}
    </div>
  );
};

export default App;