import { useState, useEffect } from 'react';
import { OMDBGetByImdbID } from '../services/omdb-wrapper';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import './MovieDetail.css';

const MovieDetail = ({ id, onBack }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const resultado = await OMDBGetByImdbID(id);
      
      if (resultado.respuesta && resultado.datos) {
        setDetail(resultado.datos);
      } else {
        setError('No pudimos cargar los detalles, perdon compa');
      }
      
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div><ErrorMessage message={error} /><button className="back-button" onClick={onBack}>Volver</button></div>;
  if (!detail) return null;

  const posterUrl = detail.Poster !== 'N/A' ? detail.Poster : 'https://via.placeholder.com/300x450?text=Sin+Imagen';

  return (
    <div className="detail-container">
      <button className="back-button" onClick={onBack}>
        ← Volver a resultados
      </button>

      <div className="detail-content">
        <img src={posterUrl} alt={detail.Title} className="detail-poster" />
        
        <div className="detail-info">
          <h2>{detail.Title} ({detail.Year})</h2>
          <p><strong>Género:</strong> {detail.Genre}</p>
          <p><strong>Director:</strong> {detail.Director}</p>
          <p><strong>Actores principales:</strong> {detail.Actors}</p>
          <p><strong>Sinopsis:</strong> {detail.Plot}</p>
          <p><strong>Duración:</strong> {detail.Runtime}</p>
          <p><strong>Idioma:</strong> {detail.Language}</p>
          <p><strong>País:</strong> {detail.Country}</p>
          <p><strong>Puntaje IMDb:</strong> ⭐ {detail.imdbRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;