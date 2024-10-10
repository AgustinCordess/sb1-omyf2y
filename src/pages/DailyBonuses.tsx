import React, { useState, useEffect } from 'react';
import { User, DailyBonus, Task, PurchasableReward } from '../types';
import { Calendar, Gift, CheckSquare, Zap } from 'lucide-react';
import { databaseService } from '../services/DatabaseService';

interface DailyBonusesProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
}

const DailyBonuses: React.FC<DailyBonusesProps> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'tasks' | 'boosts'>('daily');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<DailyBonus | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boosts, setBoosts] = useState<PurchasableReward[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedTasks = await databaseService.getTasks();
      const loadedBoosts = await databaseService.getPurchasableRewards();
      setTasks(loadedTasks);
      setBoosts(loadedBoosts);
    };
    loadData();
  }, []);

  const handleClaimBonus = (bonus: DailyBonus) => {
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastClaimedBonus = user.dailyBonuses.find(b => b.claimed);
    const lastClaimedDay = lastClaimedBonus ? lastClaimedBonus.day : 0;

    if (bonus.day !== lastClaimedDay + 1) {
      alert("Debes reclamar las bonificaciones en orden.");
      return;
    }

    setSelectedBonus(bonus);
    setShowPopup(true);
  };

  const confirmClaim = () => {
    if (user && selectedBonus) {
      const updatedUser = {
        ...user,
        points: user.points + selectedBonus.reward,
        dailyBonuses: user.dailyBonuses.map(bonus =>
          bonus.day === selectedBonus.day ? { ...bonus, claimed: true } : bonus
        ),
      };
      onUpdateUser(updatedUser);
      setShowPopup(false);
    }
  };

  const handleCompleteTask = (task: Task) => {
    if (user) {
      const updatedUser = {
        ...user,
        points: user.points + task.reward,
        tasks: user.tasks.map(t =>
          t.id === task.id ? { ...t, completed: true } : t
        ),
      };
      onUpdateUser(updatedUser);
      setShowPopup(true);
      setSelectedBonus({ day: 0, reward: task.reward, claimed: true }); // Usamos el mismo popup para tareas
    }
  };

  const renderDailyBonuses = () => (
    <div className="grid grid-cols-7 gap-2">
      {user?.dailyBonuses.map((bonus, index) => (
        <div
          key={index}
          className={`aspect-square flex flex-col items-center justify-center rounded-lg ${
            bonus.claimed ? 'bg-gray-700' : 'bg-blue-500 cursor-pointer'
          } ${bonus.day % 7 === 0 ? 'border-2 border-yellow-400' : ''}`}
          onClick={() => !bonus.claimed && handleClaimBonus(bonus)}
        >
          <span className="text-sm">{bonus.day}</span>
          <Gift size={16} />
          <span className="text-xs">{bonus.reward}</span>
        </div>
      ))}
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold">{task.name}</h3>
            <p className="text-sm text-gray-400">{task.description}</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={() => handleCompleteTask(task)}
            disabled={task.completed}
          >
            {task.completed ? 'Completado' : 'Completar'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderBoosts = () => (
    <div className="space-y-4">
      {boosts.map((boost) => (
        <div key={boost.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold">{boost.name}</h3>
            <p className="text-sm text-gray-400">{boost.description}</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={() => {/* Lógica para comprar boost */}}
          >
            {boost.cost} monedas
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-full ${activeTab === 'daily' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('daily')}
        >
          <Calendar size={20} />
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === 'tasks' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('tasks')}
        >
          <CheckSquare size={20} />
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeTab === 'boosts' ? 'bg-blue-500' : 'bg-gray-700'}`}
          onClick={() => setActiveTab('boosts')}
        >
          <Zap size={20} />
        </button>
      </div>

      {activeTab === 'daily' && renderDailyBonuses()}
      {activeTab === 'tasks' && renderTasks()}
      {activeTab === 'boosts' && renderBoosts()}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Reclamar bonificación</h2>
            <p>Has ganado {selectedBonus?.reward} monedas!</p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-500 rounded" onClick={confirmClaim}>Reclamar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyBonuses;