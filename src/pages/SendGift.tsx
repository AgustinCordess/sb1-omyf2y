import React, { useState } from 'react';
import { User } from '../types';
import { Gift } from 'lucide-react';

interface SendGiftProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const SendGift: React.FC<SendGiftProps> = ({ user, onUpdateUser }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSendGift = () => {
    if (user) {
      const updatedUser = {
        ...user,
        points: user.points + 100, // Recompensa por enviar regalo
      };
      onUpdateUser(updatedUser);
      setShowPopup(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="h-1/4 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Envía un regalo a un amigo</h1>
      </div>

      <p className="text-lg text-gray-300 text-center">
        Gana 100 monedas extra por tu primer regalo del día
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleSendGift}
          className="flex items-center justify-center w-4/5 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-full transition duration-300"
        >
          <Gift className="mr-2" size={24} />
          Enviar regalo
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-4/5 max-w-md">
            <h2 className="text-xl font-bold mb-4">¡Regalo enviado!</h2>
            <p>Has ganado 100 monedas por tu acción.</p>
            <button 
              className="mt-4 w-full px-4 py-2 bg-blue-500 rounded"
              onClick={() => setShowPopup(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendGift;