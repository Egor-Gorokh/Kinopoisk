import s from './TopRatedMovies.module.css';
import { useState } from 'react';

interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    rating: number;
    imageUrl?: string;
}

export const TopRatedMovies = () => {
    const [favorites, setFavorites] = useState<number[]>([]);

    // Пример данных топ-рейтинговых фильмов
    const movies: Movie[] = [
        {
            id: 1,
            title: "THE GODFATHER",
            originalTitle: "The Godfather",
            rating: 9.2,
        },
        {
            id: 2,
            title: "THE SHAWSHANK",
            originalTitle: "The Shawshank Redemption",
            rating: 9.3,
        },
        {
            id: 3,
            title: "THE DARK KNIGHT",
            originalTitle: "The Dark Knight",
            rating: 9.0,
        },
        {
            id: 4,
            title: "PULP FICTION",
            originalTitle: "Pulp Fiction",
            rating: 8.9,
        },
        {
            id: 5,
            title: "FIGHT CLUB",
            originalTitle: "Fight Club",
            rating: 8.8,
        },
        {
            id: 6,
            title: "INCEPTION",
            originalTitle: "Inception",
            rating: 8.7,
        }
    ];

    const handleViewMore = () => {
        // Логика для загрузки больше фильмов
        console.log('Loading more movies...');
    };

    const toggleFavorite = (movieId: number) => {
        setFavorites(prev =>
            prev.includes(movieId)
                ? prev.filter(id => id !== movieId)
                : [...prev, movieId]
        );
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const filledStars = Math.round(rating / 2); // Конвертируем 10-балльную систему в 5-звездочную

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
        <div className={s.topRatedMovies}>
            <div className={s.header}>
                <h1 className={s.title}>Top Rated Movies</h1>
                <button className={s.viewMore} onClick={handleViewMore}>
                    View more
                </button>
            </div>

            <div className={s.moviesGrid}>
                {movies.map((movie) => (
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
                                    textAlign: 'center'
                                }}>
                                    No Image
                                </div>
                            )}
                        </div>

                        <button
                            className={`${s.favoriteButton} ${favorites.includes(movie.id) ? s.active : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(movie.id);
                            }}
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
        </div>
    );
};