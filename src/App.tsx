import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User, Reward } from './types';
import { databaseService } from './services/DatabaseService';
import Header from './components/Header';
import Navigation from './components/Navigation';
import LoadingScreen from './pages/LoadingScreen';
import Home from './pages/Home';
import CoinStore from './pages/CoinStore';
import DailyBonuses from './pages/DailyBonuses';
import BoostsUpgrades from './pages/BoostsUpgrades';
import InviteFriends from './pages/InviteFriends';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    const initializeApp = async () => {
      await databaseService.initDB();
      const savedUser = await databaseService.getUser('DefaultUser');
      if (savedUser) {
        setUser(savedUser);
      } else {
        const newUser: User = {
          name: 'DefaultUser',
          level: 1,
          points: 0,
          pointsPerHour: 1,
          pointsPerClick: 1,
          theme: 'dark',
          soundVolume: 50,
          notifications: true,
          wallet: '',
          dailyBonuses: [],
          inventory: [],
          friends: [],
          tasks: [],
        };
        await databaseService.saveUser(newUser);
        setUser(newUser);
      }

      const savedRewards = await databaseService.getRewards();
      setRewards(savedRewards);

      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const handleUpdateUser = async (updatedUser: User) => {
    setUser(updatedUser);
    await databaseService.saveUser(updatedUser);
  };

  const handleClick = () => {
    if (user) {
      const updatedUser = {
        ...user,
        points: user.points + user.pointsPerClick,
      };
      handleUpdateUser(updatedUser);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isInitialLoad) {
    return <LoadingScreen user={user} onContinue={() => setIsInitialLoad(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header user={user} />
        <main className="flex-grow p-4 pb-20">
          <Routes>
            <Route path="/" element={<Home user={user!} rewards={rewards} handleClick={handleClick} />} />
            <Route path="/store" element={<CoinStore user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/bonuses" element={<DailyBonuses user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/boosts" element={<BoostsUpgrades user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/invite" element={<InviteFriends user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/tasks" element={<Tasks user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/settings" element={<Settings user={user} onUpdateUser={handleUpdateUser} />} />
            <Route path="/ranking" element={<Ranking user={user} />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;