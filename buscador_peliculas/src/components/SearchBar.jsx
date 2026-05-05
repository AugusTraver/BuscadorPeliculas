import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Escribi aca nene" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      <button 
        onClick={() => onSearch(inputValue)}
        className="search-button"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;