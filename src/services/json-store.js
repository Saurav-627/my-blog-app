export const STORE_LOCAL = 'localStorage';
export const STORE_SESSION = 'sessionStorage';

const getStore = (store) => {
  if (store === STORE_LOCAL) {
    return localStorage;
  } else if (store === STORE_SESSION) {
    return sessionStorage;
  } else {
    throw new Error(`Unsupported storage type: ${store}`);
  }
}


export const loadJSON = (name, store = STORE_LOCAL) => {
  try {
    const data = getStore(store).getItem(name); // Get the item from the specified storage

    if (!data) { return null; }

    return JSON.parse(data); // Parse the JSON string
  } catch (error) {
    console.error(`Error parsing JSON for key "${name}":`, error);
    return null; // Return null if parsing fails
  }
};

export const saveJSON = (name, data, store = STORE_LOCAL) => {
  if (data === null || data === undefined) {
    getStore(store).removeItem(name); // Remove the item if data is null or undefined
    return;
  }

  try {
    const jsonData = JSON.stringify(data); // Convert data to JSON string
    getStore(store).setItem(name, jsonData);
    return data; // Optionally return the saved data
  } catch (error) {
    console.error(`Error saving JSON for key "${name}":`, error);
  }
};
