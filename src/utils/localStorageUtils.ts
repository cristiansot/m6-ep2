export const saveToLocalStorage = <T>(key: string, data: T): void => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error("Error al guardar en LocalStorage:", error);
    }
  };
  
  export const getFromLocalStorage = <T>(key: string): T | null => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) return null;
      return JSON.parse(serializedData) as T;
    } catch (error) {
      console.error("Error al recuperar de LocalStorage:", error);
      return null;
    }
  };
  
  export const removeFromLocalStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error al eliminar de LocalStorage:", error);
    }
  };