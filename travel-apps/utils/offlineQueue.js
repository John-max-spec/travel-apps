import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'offlineQueue';

export const getQueue = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const addToQueue = async (action) => {
  const q = await getQueue();
  q.push(action);
  await AsyncStorage.setItem(KEY, JSON.stringify(q));
};

export const clearQueue = async () => {
  await AsyncStorage.removeItem(KEY);
};

export const syncQueue = async (url, axios) => {
  const q = await getQueue();
  if (q.length === 0) return;

  for (let act of q) {
    try {
      if (act.type === 'DELETE') await axios.delete(`${url}/api/trips/${act.id}`);
      if (act.type === 'UPDATE') await axios.put(`${url}/api/trips/${act.trip._id}`, act.trip);
    } catch {}
  }
  await clearQueue();
};