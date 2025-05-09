import React from 'react';
import './App.css';
import AverageCalculator from './components/AverageCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator Microservice</h1>
      </header>
      <main>
        <AverageCalculator />
      </main>
      <footer>
        <p>
          This application uses a microservice architecture to calculate number averages.
          Select a number type and click "Calculate Average" to make a request.
        </p>
      </footer>
    </div>
  );
}

export default App; 