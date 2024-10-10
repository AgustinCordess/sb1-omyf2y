import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { User, Reward, PurchasableReward, Task, DailyBonus, InventoryItem, Friend } from '../types';

interface MyDB extends DBSchema {
  users: {
    key: string;
    value: User;
    indexes: { 'by-wallet': string };
  };
  rewards: {
    key: number;
    value: Reward;
  };
  purchasableRewards: {
    key: number;
    value: PurchasableReward;
  };
  tasks: {
    key: number;
    value: Task;
  };
  dailyBonuses: {
    key: number;
    value: DailyBonus;
  };
  inventoryItems: {
    key: number;
    value: InventoryItem;
  };
  friends: {
    key: string;
    value: Friend;
  };
}

class DatabaseService {
  private db: IDBPDatabase<MyDB> | null = null;

  async initDB() {
    this.db = await openDB<MyDB>('raccoon-clicker', 1, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'name' });
        db.createObjectStore('rewards', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('purchasableRewards', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('dailyBonuses', { keyPath: 'day' });
        db.createObjectStore('inventoryItems', { keyPath: 'id', autoIncrement: true });
        db.createObjectStore('friends', { keyPath: 'id' });
      },
    });

    // Initialize default data if not exists
    await this.initializeDefaultData();
  }

  async initializeDefaultData() {
    const dailyBonuses = await this.getDailyBonuses();
    if (dailyBonuses.length === 0) {
      const defaultBonuses = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        reward: (i + 1) * 10,
        claimed: false
      }));
      await this.saveDailyBonuses(defaultBonuses);
    }

    const tasks = await this.getTasks();
    if (tasks.length === 0) {
      const defaultTasks = [
        { id: 1, name: 'Seguir en Twitter', description: 'Síguenos y gana 300 monedas', reward: 300, completed: false },
        { id: 2, name: 'Seguir en Facebook', description: 'Síguenos y gana 400 monedas', reward: 400, completed: false },
        { id: 3, name: 'Seguir en Instagram', description: 'Síguenos y gana 350 monedas', reward: 350, completed: false },
      ];
      await this.saveTasks(defaultTasks);
    }

    const boosts = await this.getPurchasableRewards();
    if (boosts.length === 0) {
      const defaultBoosts = [
        { id: 1, name: 'Boost de energía', description: '+5 puntos/hora durante 1 hora', cost: 100, pointsPerHourIncrease: 5 },
        { id: 2, name: 'Boost de velocidad', description: '+10 puntos/click durante 30 minutos', cost: 200, pointsPerHourIncrease: 0 },
        { id: 3, name: 'Boost de productividad', description: '+20% de puntos en todas las acciones por 2 horas', cost: 300, pointsPerHourIncrease: 0 },
        { id: 4, name: 'Boost de suerte', description: 'Doble probabilidad de bonificaciones por 1 hora', cost: 250, pointsPerHourIncrease: 0 },
        { id: 5, name: 'Boost de resistencia', description: '+15 puntos/hora permanentemente', cost: 1000, pointsPerHourIncrease: 15 },
        { id: 6, name: 'Boost supremo', description: 'Triplica todos tus puntos durante 1 hora', cost: 500, pointsPerHourIncrease: 0 },
      ];
      await this.savePurchasableRewards(defaultBoosts);
    }
  }

  async getUser(name: string): Promise<User | undefined> {
    if (!this.db) await this.initDB();
    return this.db!.get('users', name);
  }

  async saveUser(user: User) {
    if (!this.db) await this.initDB();
    await this.db!.put('users', user);
  }

  async getRewards(): Promise<Reward[]> {
    if (!this.db) await this.initDB();
    return this.db!.getAll('rewards');
  }

  async saveRewards(rewards: Reward[]) {
    if (!this.db) await this.initDB();
    const tx = this.db!.transaction('rewards', 'readwrite');
    await Promise.all(rewards.map(reward => tx.store.put(reward)));
    await tx.done;
  }

  async getPurchasableRewards(): Promise<PurchasableReward[]> {
    if (!this.db) await this.initDB();
    return this.db!.getAll('purchasableRewards');
  }

  async savePurchasableRewards(rewards: PurchasableReward[]) {
    if (!this.db) await this.initDB();
    const tx = this.db!.transaction('purchasableRewards', 'readwrite');
    await Promise.all(rewards.map(reward => tx.store.put(reward)));
    await tx.done;
  }

  async getTasks(): Promise<Task[]> {
    if (!this.db) await this.initDB();
    return this.db!.getAll('tasks');
  }

  async saveTasks(tasks: Task[]) {
    if (!this.db) await this.initDB();
    const tx = this.db!.transaction('tasks', 'readwrite');
    await Promise.all(tasks.map(task => tx.store.put(task)));
    await tx.done;
  }

  async getDailyBonuses(): Promise<DailyBonus[]> {
    if (!this.db) await this.initDB();
    return this.db!.getAll('dailyBonuses');
  }

  async saveDailyBonuses(bonuses: DailyBonus[]) {
    if (!this.db) await this.initDB();
    const tx = this.db!.transaction('dailyBonuses', 'readwrite');
    await Promise.all(bonuses.map(bonus => tx.store.put(bonus)));
    await tx.done;
  }

  async getInventoryItems(): Promise<InventoryItem[]> {
    if (!this.db) await this.initDB();
    return this.db!.getAll('inventoryItems');
  }

  async saveInventoryItems(items: InventoryItem[]) {
    if (!this.db) await this.initDB();
    const tx = this.db!.transaction('inventoryItems', 'readwrite');
    await Promise.all(items.map(item => tx.store.put(item)));
    await tx.done;
  }

  async getFriends(): Promise<Friend[]> {
    if (!this.db) await this.initDB();
    return this.db!.getAll('friends');
  }

  async saveFriends(friends: Friend[]) {
    if (!this.db) await this.initDB();
    const tx = this.db!.transaction('friends', 'readwrite');
    await Promise.all(friends.map(friend => tx.store.put(friend)));
    await tx.done;
  }
}

export const databaseService = new DatabaseService();