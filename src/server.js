import express from 'express';
import cors from 'cors';
import { fetchNumbers } from './services/api.js';
import { addNumbers, calculateAverage } from './services/numberService.js';

const app = express();
const PORT = process.env.PORT || 9876;

// Enable CORS for all routes
app.use(cors());

// Middleware for request timing
app.use((req, res, next) => {
  const start = Date.now();
  
  // Add a timeout to ensure responses are sent within 500ms
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      return res.status(408).json({ error: 'Request timed out' });
    }
  }, 480); // Setting timeout a bit below 500ms to allow for processing
  
  // Override res.end to clear timeout
  const originalEnd = res.end;
  res.end = function(...args) {
    clearTimeout(timeout);
    return originalEnd.apply(this, args);
  };
  
  // Continue with the request
  next();
});

// Route for number calculations
app.get('/numbers/:numberid', async (req, res) => {
  try {
    const { numberid } = req.params;
    
    // Validate the number type
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
      return res.status(400).json({ 
        error: 'Invalid number type. Use p (prime), f (fibonacci), e (even), or r (random)' 
      });
    }
    
    // Fetch numbers from the third-party server
    const numbers = await fetchNumbers(numberid);
    
    // Process the numbers and calculate the average
    const result = addNumbers(numberid, numbers);
    const avg = calculateAverage(numberid);
    
    // Format the response
    const response = {
      windowPrevState: result.windowPrevState,
      windowCurrState: result.windowCurrState,
      numbers: result.numbers,
      avg: parseFloat(avg.toFixed(2))
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 