import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value != null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
};
