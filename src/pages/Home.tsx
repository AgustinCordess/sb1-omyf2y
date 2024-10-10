import React from 'react';
import ProgressBar from '../components/ProgressBar';
import ClickerCircle from '../components/ClickerCircle';
import RewardCard from '../components/RewardCard';
import { User, Reward } from '../types';

interface HomeProps {
  user: User;
  rewards: Reward[];
  handleClick: () => void;
}

const LEVELS = ['Bronce', 'Plata', 'Oro', 'Platino', 'Diamante', 'Maestro', 'Gran Maestro', 'Leyenda', 'Mítico', 'Divino'];

const Home: React.FC<HomeProps> = ({ user, rewards, handleClick }) => {
  const pointsForNextLevel = (user.level + 1) * 1000;
  const progress = (user.points / pointsForNextLevel) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Nivel: {LEVELS[user.level - 1]}</h2>
        <ProgressBar progress={progress} />
      </div>
      <ClickerCircle onClick={handleClick} />
      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
};

export default Home;