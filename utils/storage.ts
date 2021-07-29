import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  static clear() {
    AsyncStorage.clear();
  }

  static async remove(storageKey: string, filter: object) {
    const rawList = await AsyncStorage.getItem(storageKey);

    if (!rawList) return;

    const list: object[] = JSON.parse(rawList);

    // Filter out the item we wanna remove
    AsyncStorage.setItem(
      storageKey,
      JSON.stringify(list.filter((item) => !compareTwoObject(item, filter)))
    );
  }

  static async create(storageKey: string, value: object) {
    const rawList = await AsyncStorage.getItem(storageKey);

    if (!rawList) {
      return AsyncStorage.setItem(
        storageKey,
        JSON.stringify([value]) // Save value in array
      );
    }

    const list = JSON.parse(rawList);

    list.push(value);

    AsyncStorage.setItem(storageKey, JSON.stringify(list));
  }

  static async findOne<T extends {}>(
    storageKey: string,
    filter = {}
  ): Promise<T | undefined> {
    const rawList = await AsyncStorage.getItem(storageKey);

    if (!rawList) return undefined;

    const parsedList: T[] = JSON.parse(rawList);

    if (isObjectEmpty(filter)) {
      return parsedList[0];
    }

    return parsedList.find((item) => compareTwoObject(item, filter));
  }

  static async find<T>(
    storageKey: string,
    filter = {}
  ): Promise<T[] | undefined> {
    const rawList = await AsyncStorage.getItem(storageKey);

    if (!rawList) return undefined;

    const parsedList: T[] = JSON.parse(rawList);

    if (isObjectEmpty(filter)) {
      return parsedList;
    }

    return parsedList.filter((item) => compareTwoObject(item, filter));
  }

  static async update(storageKey: string, filter: object, value: object) {
    await this.remove(storageKey, filter);

    const item = await this.findOne(storageKey, filter);

    const updatedItem = { ...item, ...value };

    return this.create(storageKey, updatedItem);
  }

  static async has(storageKey: string, filter: object) {
    const item = await this.findOne(storageKey, filter);

    if (!item) return false;

    return !isObjectEmpty(item);
  }
}

const isObjectEmpty = (obj: object) => JSON.stringify(obj) === "{}";

// check if object one contains all property and value of object two.
const compareTwoObject = <T, U extends keyof T>(obj1: T, obj2: T) => {
  let isComparedCount = 0;

  const entries = Object.entries(obj2);

  for (const [key, value] of entries) {
    if (obj1[key as U] === value) {
      isComparedCount++;
    }
  }

  return isComparedCount === entries.length;
};

export default Storage;
