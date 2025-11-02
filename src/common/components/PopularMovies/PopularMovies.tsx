import s from './PopularMovies.module.css';
import { useState } from 'react';

interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    rating: number;
    imageUrl?: string;
}

export const PopularMovies = () => {
    const [favorites, setFavorites] = useState<number[]>([]);

    // Пример данных фильмов
    const movies: Movie[] = [
        {
            id: 1,
            title: "AFTERBURN",
            originalTitle: "Afterburn",
            rating: 6.8,
        },
        {
            id: 2,
            title: "WARNOT",
            originalTitle: "War of the Worlds",
            rating: 4.3,
        },
        {
            id: 3,
            title: "Our Fault",
            originalTitle: "Our Fault",
            rating: 7.2,
        },
        {
            id: 4,
            title: "HUNTING GROUNDS",
            originalTitle: "Hunting Grounds",
            rating: 5.9,
        },
        {
            id: 5,
            title: "CAPTAIN HOOK",
            originalTitle: "Captain Hook - The Cursed Tides",
            rating: 6.5,
        },
        {
            id: 6,
            title: "Demon Slayer",
            originalTitle: "Demon Slayer: Infinity Castle",
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
        <div className={s.popularMovies}>
            <div className={s.header}>
                <h1 className={s.title}>Popular Movies</h1>
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