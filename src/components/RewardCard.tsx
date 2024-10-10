import React from 'react';
import { Reward } from '../types';
import { Gift } from 'lucide-react';

interface RewardCardProps {
  reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
      <Gift size={24} className="text-yellow-500 mb-2" />
      <h3 className="font-bold mb-1">{reward.name}</h3>
      <p className="text-sm text-gray-400">
        {Math.floor(reward.timeRemaining / 3600)}h {Math.floor((reward.timeRemaining % 3600) / 60)}m
      </p>
    </div>
  );
};

export default RewardCard;