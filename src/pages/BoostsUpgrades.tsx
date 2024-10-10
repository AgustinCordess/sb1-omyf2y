import React, { useState, useEffect } from 'react';
import { User, PurchasableReward } from '../types';
import { Zap, DollarSign, Gift } from 'lucide-react';
import { databaseService } from '../services/DatabaseService';

interface BoostsUpgradesProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const categories = [
  { id: 'free', name: 'Gratis', icon: Gift },
  { id: 'paid', name: 'Pagados', icon: DollarSign },
];

const BoostsUpgrades: React.FC<BoostsUpgradesProps> = ({ user, onUpdateUser }) => {
  const [activeCategory, setActiveCategory] = useState('free');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBoost, setSelectedBoost] = useState<PurchasableReward | null>(null);
  const [boosts, setBoosts] = useState<PurchasableReward[]>([]);

  useEffect(() => {
    const loadBoosts = async () => {
      const savedBoosts = await databaseService.getPurchasableRewards();
      setBoosts(savedBoosts);
    };
    loadBoosts();
  }, []);

  const handleSelectBoost = (boost: PurchasableReward) => {
    setSelectedBoost(boost);
    setShowPopup(true);
  };

  const confirmBoost = (action: 'buy' | 'watch') => {
    if (user && selectedBoost) {
      let updatedUser = { ...user };
      if (action === 'buy') {
        updatedUser.points -= selectedBoost.cost;
      }
      updatedUser.pointsPerHour += selectedBoost.pointsPerHourIncrease;
      onUpdateUser(updatedUser);
    }
    setShowPopup(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mejoras y refuerzos</h1>
      
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon size={20} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {boosts.filter(boost => boost.cost === 0 ? activeCategory === 'free' : activeCategory === 'paid').map((boost) => (
          <div key={boost.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Zap size={24} className="text-yellow-400" />
              <div>
                <h3 className="font-bold">{boost.name}</h3>
                <p className="text-sm text-gray-400">{boost.description}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
              onClick={() => handleSelectBoost(boost)}
            >
              {boost.cost === 0 ? 'Ver anuncio' : `${boost.cost} monedas`}
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Confirmar acción</h2>
            <p>¿Quieres {selectedBoost?.cost === 0 ? 'ver un anuncio' : 'comprar'} para obtener {selectedBoost?.name}?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-600 rounded" onClick={() => setShowPopup(false)}>Cancelar</button>
              <button
                className="px-4 py-2 bg-blue-500 rounded"
                onClick={() => confirmBoost(selectedBoost?.cost === 0 ? 'watch' : 'buy')}
              >
                {selectedBoost?.cost === 0 ? 'Ver anuncio' : 'Comprar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoostsUpgrades;