import React, { useState, useEffect } from 'react';
import { Squirrel } from 'lucide-react';

interface LoadingScreenProps {
  user?: {
    points: number;
    level: number;
  } | null;
  onContinue?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ user, onContinue }) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTouched(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleInteraction = () => {
    setTouched(true);
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-between p-4"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <div className="w-full h-1/4 flex items-center justify-center">
        <div className="text-center">
          <Squirrel size={60} className="text-blue-500 mb-2 mx-auto" />
          <h1 className="text-4xl font-bold text-white">RaccooN</h1>
        </div>
      </div>
      
      <div className="w-full h-2/5 flex items-center justify-center">
        <img
          src="/src/images/Personaje-Lvl-1.png"
          alt="RaccooN Character"
          className="w-full h-full object-contain"
        />
      </div>
      
      {user && (
        <div className="w-full flex justify-end">
          <div className="bg-gray-800 p-2 rounded-lg text-white text-right">
            <p>Tokens: {user.points}</p>
            <p>Nivel: {user.level}</p>
          </div>
        </div>
      )}
      
      <p className={`mt-4 text-white text-lg transition-opacity duration-500 ${touched ? 'opacity-0' : 'opacity-100'}`}>
        Desliza o pulsa para continuar
      </p>
    </div>
  );
};

export default LoadingScreen;