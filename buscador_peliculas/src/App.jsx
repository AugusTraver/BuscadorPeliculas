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
      setError('No se encontraron resultados para tu búsqueda.');
    }
    
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Buscador de Películas</h1>
      
      {!selectedId && <SearchBar onSearch={handleSearch} />}
      
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && selectedId ? (
        <MovieDetail id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        !loading && !error && <MovieList movies={movies} onSelectMovie={setSelectedId} />
      )}
    </div>
  );
}

export default App;