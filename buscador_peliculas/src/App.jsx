import { useState } from 'react';
import { OMDBSearchByPage } from './services/omdb-wrapper';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query) return;
    
    setLoading(true);
    setError('');
    setSelectedId(null);
    setMovies([]);

    const resultado = await OMDBSearchByPage(query, 1);
    
    if (resultado.respuesta && resultado.datos) {
      setMovies(resultado.datos);
    } else {
      setError('Busca bien salame');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Busca una peli pibe</h1>
      
      {!selectedId && <SearchBar onSearch={handleSearch} />}
      
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && selectedId ? (
        <MovieDetail id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        !loading && !error && <MovieList movies={movies} onSelectMovie={setSelectedId} />
      )}
            <h1 className="app-atte">Atte la banda del morgan</h1>

    </div>
  );
}

export default App;