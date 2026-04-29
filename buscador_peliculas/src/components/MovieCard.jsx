import './MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=Sin+Imagen';

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterUrl} alt={movie.Title} className="movie-poster" />
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-info">{movie.Year} • {movie.Type}</p>
    </div>
  );
};

export default MovieCard;