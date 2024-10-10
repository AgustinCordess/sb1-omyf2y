import React, { useState } from 'react';
import { User } from '../types';
import { Share2, Gift } from 'lucide-react';

interface InviteFriendsProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const InviteFriends: React.FC<InviteFriendsProps> = ({ user, onUpdateUser }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleInvite = () => {
    setPopupMessage('¡Enlace de invitación copiado al portapapeles!');
    setShowPopup(true);
    // Aquí iría la lógica para compartir el enlace de invitación
    navigator.clipboard.writeText(`https://tuapp.com/invite?code=${user?.name}`);
  };

  const handleSendGift = () => {
    if (user) {
      const updatedUser = {
        ...user,
        points: user.points + 100, // Recompensa por enviar regalo
      };
      onUpdateUser(updatedUser);
      setPopupMessage('Has ganado 100 monedas por enviar un regalo.');
      setShowPopup(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Invita a tus amigos</h1>
        <p className="text-lg text-gray-300">Consigue el 20% de los ingresos de tus amigos</p>
      </div>

      <button
        onClick={handleInvite}
        className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition duration-300"
      >
        <Share2 className="mr-2" size={20} />
        Invitar amigos
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Envía un regalo a un amigo</h2>
        <p className="text-gray-300 mb-4">Gana 100 monedas extra por tu primer regalo del día</p>
        <button
          onClick={handleSendGift}
          className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition duration-300"
        >
          <Gift className="mr-2" size={20} />
          Enviar regalo
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">¡Acción completada!</h2>
            <p>{popupMessage}</p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-500 rounded" onClick={() => setShowPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteFriends;