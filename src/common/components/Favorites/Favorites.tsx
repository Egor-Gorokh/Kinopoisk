import s from './Favorites.module.css';
import { useState, useEffect } from 'react';

interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    rating: number;
    imageUrl?: string;
}

export const Favorites = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    // Загрузка избранных фильмов из localStorage (или из контекста/сторы)
    useEffect(() => {
        // Здесь можно загружать избранные фильмы из API или контекста
        // Пока используем пример данных для демонстрации
        const savedFavorites = localStorage.getItem('favoriteMovies');
        if (savedFavorites) {
            setFavoriteMovies(JSON.parse(savedFavorites));
        }
    }, []);

    const removeFromFavorites = (movieId: number) => {
        const updatedFavorites = favoriteMovies.filter(movie => movie.id !== movieId);
        setFavoriteMovies(updatedFavorites);
        localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const filledStars = Math.round(rating / 2);

        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={s.ratingStars}>
                    {i < filledStars ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    };

    return (
        <div className={s.favorites}>
            <div className={s.header}>
                <h1 className={s.title}>Favorites</h1>
            </div>

            {favoriteMovies.length === 0 ? (
                <div className={s.emptyState}>
                    <div className={s.emptyIcon}>❤️</div>
                    <h2 className={s.emptyTitle}>No favorites yet</h2>
                    <p className={s.emptyText}>
                        Add movies to favorites to see them on this page.
                    </p>
                </div>
            ) : (
                <div className={s.moviesGrid}>
                    {favoriteMovies.map((movie) => (
                        <div key={movie.id} className={s.movieCard}>
                            <div className={s.movieImage}>
                                {movie.imageUrl ? (
                                    <img
                                        src={movie.imageUrl}
                                        alt={movie.title}
                                        className={s.movieImage}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
                                        color: '#666',
                                        fontSize: '0.8rem',
                                        textAlign: 'center',
                                        padding: '0.5rem'
                                    }}>
                                        {movie.title}
                                    </div>
                                )}
                            </div>

                            <button
                                className={s.favoriteButton}
                                onClick={() => removeFromFavorites(movie.id)}
                                title="Remove from favorites"
                            >
                                <span className={s.heartIcon}>❤</span>
                            </button>

                            <div className={s.movieInfo}>
                                <h3 className={s.movieTitle}>{movie.title}</h3>
                                <p className={s.movieOriginalTitle}>{movie.originalTitle}</p>

                                <div className={s.movieRating}>
                                    <div className={s.ratingStars}>
                                        {renderStars(movie.rating)}
                                    </div>
                                    <span className={s.ratingValue}>{movie.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};