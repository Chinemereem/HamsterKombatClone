import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const storeLastClaimTime = async () => {
  try {
    const currentTime = new Date().getTime();
    await AsyncStorage.setItem('lastClaimTime', currentTime.toString());
  } catch (error) {
    console.error('Error storing last claim time:', error);
  }
};
export const getLastClaimTime = async () => {
  try {
    const lastClaimTime = await AsyncStorage.getItem('lastClaimTime');
    return lastClaimTime ? parseInt(lastClaimTime, 10) : null;
  } catch (error) {
    console.error('Error retrieving last claim time:', error);
    return null;
  }
};
export const storeConsecutiveDays = async days => {
  try {
    await AsyncStorage.setItem('consecutiveDays', days.toString());
  } catch (error) {
    console.error('Error storing consecutive days:', error);
  }
};
export const storeConsecutiveDates = async (dates) => {
  try {
    await AsyncStorage.setItem('consecutiveDates', JSON.stringify(dates));
  } catch (error) {
    console.error('Error storing consecutive dates:', error);
  }
};
export const getConsecutiveDays = async () => {
  try {
    const consecutiveDays = await AsyncStorage.getItem('consecutiveDays');
    return consecutiveDays ? parseInt(consecutiveDays, 10) : 0;
  } catch (error) {
    console.error('Error retrieving consecutive days:', error);
    return 0;
  }
};
export const getNextClaimTime = async () => {
  const lastClaimTime = await getLastClaimTime();
  if (!lastClaimTime) {
    return null;
  }

  const nextClaimTime = new Date(lastClaimTime + 24 * 60 * 60 * 1000); // 24 hours later
  return nextClaimTime;
};

export const getConsecutiveDates = async () => {
  try {
    const dates = await AsyncStorage.getItem('consecutiveDates');
    return dates ? JSON.parse(dates) : [];
  } catch (error) {
    console.error('Error retrieving consecutive dates:', error);
    return [];
  }
};

