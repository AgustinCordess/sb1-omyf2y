import React, { useState } from 'react';
import { User, Task } from '../types';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface TasksProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const socialNetworks = [
  { name: 'Telegram', icon: '📱', reward: 500 },
  { name: 'Twitter', icon: '🐦', reward: 300 },
  { name: 'Facebook', icon: '👍', reward: 400 },
  { name: 'Instagram', icon: '📷', reward: 350 },
];

const Tasks: React.FC<TasksProps> = ({ user, onUpdateUser }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCompleteTask = (task: Task) => {
    setSelectedTask(task);
    setShowPopup(true);
  };

  const confirmTaskCompletion = () => {
    if (user && selectedTask) {
      const updatedUser = {
        ...user,
        points: user.points + selectedTask.reward,
        tasks: user.tasks.map(t =>
          t.id === selectedTask.id ? { ...t, completed: true } : t
        ),
      };
      onUpdateUser(updatedUser);
      setShowPopup(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Tareas</h1>
      
      {socialNetworks.map((network, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{network.icon}</span>
            <div>
              <h3 className="font-bold">{network.name}</h3>
              <p className="text-sm text-gray-400">Síguenos y gana {network.reward} monedas</p>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
            onClick={() => handleCompleteTask({ id: index, name: network.name, description: `Seguir en ${network.name}`, reward: network.reward, completed: false })}
          >
            <ExternalLink size={16} className="mr-2" />
            Seguir
          </button>
        </div>
      ))}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Tarea completada</h2>
            <p>Has seguido a {selectedTask?.name} y ganado {selectedTask?.reward} monedas!</p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-500 rounded flex items-center justify-center" onClick={confirmTaskCompletion}>
              <CheckCircle size={16} className="mr-2" />
              Reclamar recompensa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;