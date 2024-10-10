import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="font-bold">{user.name}</span>
        <span className="text-sm text-gray-400">Nivel {user.level}</span>
      </div>
      <div className="text-right">
        <div className="font-bold">{user.points.toLocaleString()} puntos</div>
        <div className="text-sm text-gray-400">{user.pointsPerHour}/hora</div>
      </div>
    </header>
  );
};

export default Header;