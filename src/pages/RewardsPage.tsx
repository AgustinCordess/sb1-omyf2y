import React from 'react';
import { Reward, PurchasableReward, User } from '../types';
import { Gift, Star } from 'lucide-react';

interface RewardsPageProps {
  rewards: Reward[];
  purchasableRewards: PurchasableReward[];
  user: User;
  onPurchaseReward: (rewardId: number) => void;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ rewards, purchasableRewards, user, onPurchaseReward }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Recompensas Diarias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
              <Gift className="text-yellow-500" size={24} />
              <div>
                <h3 className="font-bold">{reward.name}</h3>
                <p className="text-sm text-gray-400">
                  Tiempo restante: {Math.floor(reward.timeRemaining / 3600)}h {Math.floor((reward.timeRemaining % 3600) / 60)}m
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recompensas Comprables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchasableRewards.map((reward) => (
            <div key={reward.id} className="bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="text-yellow-500" size={24} />
                  <h3 className="font-bold">{reward.name}</h3>
                </div>
                <p className="text-sm mb-2">{reward.description}</p>
                <p className="text-sm text-gray-400">Costo: {reward.cost} puntos</p>
                <p className="text-sm text-green-400">+{reward.pointsPerHourIncrease} puntos/hora</p>
              </div>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPurchaseReward(reward.id)}
                disabled={user.points < reward.cost}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;