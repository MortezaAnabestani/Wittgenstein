
export const storage = {
  getItem: (key: string): string | null => {
    try {
      // Accessing window.localStorage can throw a SecurityError in some iframe/privacy contexts
      // We wrap the property access itself in a try-catch
      const store = window.localStorage;
      return store.getItem(key);
    } catch (e) {
      // Return null implies no saved data, which allows the app to continue using default state
      console.warn('Storage read blocked:', e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      const store = window.localStorage;
      store.setItem(key, value);
    } catch (e) {
      console.warn('Storage write blocked:', e);
      // We essentially ignore write errors so the user can still play, just without persistence
    }
  },
  removeItem: (key: string): void => {
    try {
      const store = window.localStorage;
      store.removeItem(key);
    } catch (e) {
      // Ignore
    }
  }
};
