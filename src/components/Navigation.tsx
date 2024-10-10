import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../types';
import { Home, Gift, Settings, BarChart2, UserPlus, CheckSquare } from 'lucide-react';

const navItems: NavItem[] = [
  { id: 1, name: 'Inicio', icon: 'Home', path: '/' },
  { id: 2, name: 'Tareas', icon: 'CheckSquare', path: '/tasks' },
  { id: 3, name: 'Bonificaciones', icon: 'Gift', path: '/bonuses' },
  { id: 4, name: 'Ranking', icon: 'BarChart2', path: '/ranking' },
  { id: 5, name: 'Configuración', icon: 'Settings', path: '/settings' },
];

const iconComponents = {
  Home,
  CheckSquare,
  Gift,
  BarChart2,
  Settings,
};

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 fixed bottom-0 left-0 right-0">
      <ul className="flex justify-between">
        {navItems.map((item) => (
          <li key={item.id} className="w-1/5">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                } hover:text-white`
              }
            >
              {React.createElement(iconComponents[item.icon as keyof typeof iconComponents], { size: 24 })}
              <span className="text-xs mt-1">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;