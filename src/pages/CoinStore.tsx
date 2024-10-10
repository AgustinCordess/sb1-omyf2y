import React, { useState } from 'react';
import { User, PurchasableReward } from '../types';
import { Coins, Zap, Package } from 'lucide-react';

interface CoinStoreProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const categories = [
  { id: 'coins', name: 'Monedas', icon: Coins },
  { id: 'boosts', name: 'Refuerzos', icon: Zap },
  { id: 'packs', name: 'Packs especiales', icon: Package },
];

const CoinStore: React.FC<CoinStoreProps> = ({ user, onUpdateUser }) => {
  const [activeCategory, setActiveCategory] = useState('coins');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PurchasableReward | null>(null);

  const handlePurchase = (item: PurchasableReward) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const confirmPurchase = () => {
    if (user && selectedItem) {
      const updatedUser = {
        ...user,
        points: user.points - selectedItem.cost,
        pointsPerHour: user.pointsPerHour + selectedItem.pointsPerHourIncrease,
      };
      onUpdateUser(updatedUser);
      setShowPopup(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Tienda</h1>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {React.createElement(category.icon, { size: 20 })}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold">100 Monedas</h3>
            <p className="text-sm text-gray-400">Aumenta tus monedas</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={() => handlePurchase({ id: 1, name: '100 Monedas', description: 'Aumenta tus monedas', cost: 100, pointsPerHourIncrease: 0 })}
          >
            $0.99
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Confirmar compra</h2>
            <p>¿Estás seguro de que quieres comprar {selectedItem?.name}?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-600 rounded" onClick={() => setShowPopup(false)}>Cancelar</button>
              <button className="px-4 py-2 bg-blue-500 rounded" onClick={confirmPurchase}>Comprar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinStore;