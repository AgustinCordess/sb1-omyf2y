import React from 'react';
import { Link } from 'react-router-dom';

interface LevelUpPopupProps {
  newLevel: number;
  onClose: () => void;
}

const LevelUpPopup: React.FC<LevelUpPopupProps> = ({ newLevel, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-4/5 max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">¡Felicidades!</h2>
        <p className="text-xl mb-6">Has subido al nivel {newLevel}</p>
        <div className="w-64 h-64 mx-auto mb-6">
          <img
            src={`/src/images/Personaje-Lvl-${newLevel}.png`}
            alt={`Nivel ${newLevel}`}
            className="w-full h-full object-contain"
          />
        </div>
        <Link
          to="/"
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block"
        >
          Continuar
        </Link>
      </div>
    </div>
  );
};

export default LevelUpPopup;