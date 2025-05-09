// Configuration for the number storage window
const WINDOW_SIZE = 10;

// State to store numbers for each number type
const storage = {
  p: [],  // Prime numbers
  f: [],  // Fibonacci numbers
  e: [],  // Even numbers
  r: []   // Random numbers
};

/**
 * Add new numbers to the storage, ensuring they are unique
 * and maintain the window size
 * @param {string} numberType - The type of numbers ('p', 'f', 'e', 'r')
 * @param {Array<number>} newNumbers - The new numbers to add
 * @returns {Object} - The previous and current state of the window
 */
export const addNumbers = (numberType, newNumbers) => {
  if (!storage[numberType]) {
    throw new Error('Invalid number type');
  }

  // Store the previous state of the window
  const windowPrevState = [...storage[numberType]];

  // Add unique numbers and maintain window size
  for (const num of newNumbers) {
    // Skip if the number already exists in the storage
    if (!storage[numberType].includes(num)) {
      if (storage[numberType].length >= WINDOW_SIZE) {
        // Remove the oldest number (at index 0)
        storage[numberType].shift();
      }
      // Add the new number
      storage[numberType].push(num);
    }
  }

  // Return the previous and current state of the window
  return {
    windowPrevState,
    windowCurrState: [...storage[numberType]],
    numbers: newNumbers
  };
};

/**
 * Calculate the average of all numbers in the storage for a given type
 * @param {string} numberType - The type of numbers ('p', 'f', 'e', 'r')
 * @returns {number} - The average of the numbers
 */
export const calculateAverage = (numberType) => {
  if (!storage[numberType] || storage[numberType].length === 0) {
    return 0;
  }

  const sum = storage[numberType].reduce((total, num) => total + num, 0);
  return sum / storage[numberType].length;
};

/**
 * Get the window size configuration
 * @returns {number} - The window size
 */
export const getWindowSize = () => WINDOW_SIZE; 