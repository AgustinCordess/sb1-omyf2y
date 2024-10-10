import React from 'react';
import { User } from '../types';
import { Share2 } from 'lucide-react';

interface InviteFriendsPageProps {
  user: User;
  onInvite: () => void;
}

const InviteFriendsPage: React.FC<InviteFriendsPageProps> = ({ user, onInvite }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Invita a tus amigos</h1>
      <p className="text-gray-300">
        ¡Invita a tus amigos y gana 1000 puntos por cada amigo que se una!
      </p>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Tu código de invitación</h2>
        <p className="text-lg font-mono bg-gray-700 p-2 rounded">{user.name.toUpperCase()}-FRIEND</p>
      </div>
      <button
        onClick={onInvite}
        className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        <Share2 className="mr-2" size={20} />
        Compartir enlace de invitación
      </button>
    </div>
  );
};

export default InviteFriendsPage;