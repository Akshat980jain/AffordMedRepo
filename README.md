# Average Calculator Microservice

A React-based Average Calculator application with a microservice architecture. This application fetches different types of numbers (prime, fibonacci, even, or random) from a third-party API, maintains a sliding window of unique numbers, and calculates their average.

## Features

- Fetch different types of numbers from a third-party API
- Maintain a sliding window of unique numbers (window size: 10)
- Calculate the average of numbers in the window
- Fast response time (under 500ms)
- User-friendly interface

## Architecture

The application consists of:

1. **React Frontend**: Provides a user interface for interacting with the microservice
2. **Express Microservice**: Handles fetching numbers from the third-party API, maintains the number window, and calculates averages

## API Endpoints

The microservice exposes the following REST API endpoint:

- `GET /numbers/:numberid`: Fetch numbers of a specific type, update the window, and calculate the average
  - `numberid` can be one of the following:
    - `p`: Prime numbers
    - `f`: Fibonacci numbers
    - `e`: Even numbers
    - `r`: Random numbers

## Response Format

The API response follows this format:

```json
{
  "windowPrevState": [1, 2, 3],
  "windowCurrState": [1, 2, 3, 4, 5],
  "numbers": [3, 4, 5],
  "avg": 3.00
}
```

Where:
- `windowPrevState`: The state of the window before the current request
- `windowCurrState`: The state of the window after the current request
- `numbers`: The numbers received from the third-party API
- `avg`: The average of numbers in the current window

## Setup and Running

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To run both the frontend and backend concurrently:

```
npm run dev
```

To run only the frontend:

```
npm start
```

To run only the backend:

```
npm run server
```

The frontend will be available at http://localhost:3000
The backend microservice will be running on http://localhost:9876

## Testing

You can test the API directly with these example URLs:

- Prime Numbers: http://localhost:9876/numbers/p
- Fibonacci Numbers: http://localhost:9876/numbers/f
- Even Numbers: http://localhost:9876/numbers/e
- Random Numbers: http://localhost:9876/numbers/r

## Third-Party API

The application relies on the following third-party APIs:

- Prime Numbers: http://20.244.56.144/evaluation-service/primes
- Fibonacci Numbers: http://20.244.56.144/evaluation-service/fibo
- Even Numbers: http://20.244.56.144/evaluation-service/even
- Random Numbers: http://20.244.56.144/evaluation-service/rand 