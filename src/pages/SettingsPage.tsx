import React, { useState } from 'react';
import { User } from '../types';
import { Volume2, Sun, Moon, Bell, BellOff, Wallet } from 'lucide-react';

interface SettingsPageProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [soundVolume, setSoundVolume] = useState(user.soundVolume);
  const [theme, setTheme] = useState(user.theme);
  const [notifications, setNotifications] = useState(user.notifications);
  const [wallet, setWallet] = useState(user.wallet);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      soundVolume,
      theme,
      notifications,
      wallet,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configuración</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div>
          <label htmlFor="soundVolume" className="block text-sm font-medium text-gray-300">
            Volumen de sonido
          </label>
          <div className="flex items-center mt-1">
            <Volume2 size={20} className="text-gray-400 mr-2" />
            <input
              type="range"
              id="soundVolume"
              min="0"
              max="100"
              value={soundVolume}
              onChange={(e) => setSoundVolume(Number(e.target.value))}
              className="w-full"
            />
            <span className="ml-2 text-gray-300">{soundVolume}%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Tema</label>
          <div className="mt-1 flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-2 rounded-md ${theme === 'light' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <Sun size={20} />
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-md ${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              <Moon size={20} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Notificaciones</label>
          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className="mt-1 p-2 rounded-md bg-gray-700"
          >
            {notifications ? <Bell size={20} /> : <BellOff size={20} />}
          </button>
        </div>

        <div>
          <label htmlFor="wallet" className="block text-sm font-medium text-gray-300">
            Dirección de billetera
          </label>
          <div className="flex items-center mt-1">
            <Wallet size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              id="wallet"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              placeholder="0x..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;