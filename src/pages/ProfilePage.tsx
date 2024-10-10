import React from 'react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p>Nombre: {user.name}</p>
        <p>Nivel: {user.level}</p>
        <p>Puntos: {user.points.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProfilePage;