import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AverageCalculator.css';

const AverageCalculator = () => {
  // State to store the calculation results
  const [result, setResult] = useState(null);
  // State to track loading status
  const [loading, setLoading] = useState(false);
  // State to store any error messages
  const [error, setError] = useState(null);
  // Selected number type
  const [selectedType, setSelectedType] = useState('p');

  // Function to fetch calculations for a specific number type
  const fetchCalculation = async (numberType) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberType}`, {
        timeout: 500 // 500ms timeout as per requirement
      });
      
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching calculation:', error);
      setError('Failed to fetch calculation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle number type selection
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Handle calculation button click
  const handleCalculate = () => {
    fetchCalculation(selectedType);
  };

  // Format arrays for display
  const formatArray = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      return '[ ]';
    }
    return `[ ${arr.join(', ')} ]`;
  };

  return (
    <div className="calculator-container">
      <h1>Average Calculator</h1>
      
      <div className="control-panel">
        <div className="select-container">
          <label htmlFor="numberType">Number Type:</label>
          <select 
            id="numberType" 
            value={selectedType} 
            onChange={handleTypeChange}
            disabled={loading}
          >
            <option value="p">Prime (p)</option>
            <option value="f">Fibonacci (f)</option>
            <option value="e">Even (e)</option>
            <option value="r">Random (r)</option>
          </select>
        </div>
        
        <button 
          className="calculate-btn"
          onClick={handleCalculate}
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate Average'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {result && (
        <div className="result-container">
          <h2>Calculation Result</h2>
          
          <div className="result-item">
            <div className="result-label">Window Previous State:</div>
            <div className="result-value">{formatArray(result.windowPrevState)}</div>
          </div>
          
          <div className="result-item">
            <div className="result-label">Window Current State:</div>
            <div className="result-value">{formatArray(result.windowCurrState)}</div>
          </div>
          
          <div className="result-item">
            <div className="result-label">Numbers From API:</div>
            <div className="result-value">{formatArray(result.numbers)}</div>
          </div>
          
          <div className="result-item highlight">
            <div className="result-label">Average:</div>
            <div className="result-value">{result.avg}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator; 