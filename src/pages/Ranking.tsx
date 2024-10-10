import React from 'react';
import { User } from '../types';

interface RankingProps {
  user: User | null;
}

const Ranking: React.FC<RankingProps> = ({ user }) => {
  // Aquí deberías obtener los datos de ranking de la base de datos
  const rankingData = [
    { name: 'Usuario1', points: 1000 },
    { name: 'Usuario2', points: 900 },
    { name: 'Usuario3', points: 800 },
    // ... más usuarios
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Ranking</h1>
      <div className="bg-gray-800 rounded-lg p-4">
        {rankingData.map((rankUser, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
            <span className="font-bold">{index + 1}. {rankUser.name}</span>
            <span>{rankUser.points} puntos</span>
          </div>
        ))}
      </div>
      {user && (
        <div className="bg-blue-500 rounded-lg p-4 mt-4">
          <h2 className="text-xl font-bold mb-2">Tu posición</h2>
          <p>Puntos: {user.points}</p>
          {/* Aquí deberías calcular y mostrar la posición real del usuario */}
          <p>Posición: #X</p>
        </div>
      )}
    </div>
  );
};

export default Ranking;