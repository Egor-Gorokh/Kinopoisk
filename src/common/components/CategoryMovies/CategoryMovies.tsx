import s from './CategoryMovies.module.css';
import { useState } from 'react';

interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    rating: number;
    imageUrl?: string;
}

type TabType = 'popular' | 'top-rated' | 'upcoming' | 'now-playing';

export const CategoryMovies = () => {
    const [activeTab, setActiveTab] = useState<TabType>('popular');
    const [favorites, setFavorites] = useState<number[]>([]);

    // Данные для разных вкладок
    const moviesData: Record<TabType, Movie[]> = {
        'popular': [
            { id: 1, title: "AFTERBURN", originalTitle: "Afterburn", rating: 6.8 },
            { id: 2, title: "WAR OF WORLDS", originalTitle: "War of the Worlds", rating: 4.3 },
            { id: 3, title: "TOMMY O'DONNELL", originalTitle: "Tommy O'Donnell", rating: 4.3 },
            { id: 4, title: "OUR FAULT", originalTitle: "Our Fault", rating: 7.6 },
            { id: 5, title: "HUNTING GROUNDS", originalTitle: "Hunting Grounds", rating: 6.4 },
            { id: 6, title: "CAPTAIN HOOK", originalTitle: "Captain Hook - The Cursed Tides", rating: 4.8 }
        ],
        'top-rated': [
            { id: 7, title: "THE GODFATHER", originalTitle: "The Godfather", rating: 9.2 },
            { id: 8, title: "THE SHAWSHANK", originalTitle: "The Shawshank Redemption", rating: 9.3 },
            { id: 9, title: "THE DARK KNIGHT", originalTitle: "The Dark Knight", rating: 9.0 },
            { id: 10, title: "PULP FICTION", originalTitle: "Pulp Fiction", rating: 8.9 },
            { id: 11, title: "FIGHT CLUB", originalTitle: "Fight Club", rating: 8.8 },
            { id: 12, title: "INCEPTION", originalTitle: "Inception", rating: 8.7 }
        ],
        'upcoming': [
            { id: 13, title: "THE UGLY STEPSISTER", originalTitle: "The Ugly Stepsister", rating: 7.3 },
            { id: 14, title: "THE ELIXIR", originalTitle: "The Elixir", rating: 5.9 },
            { id: 15, title: "AVATAR 3", originalTitle: "Avatar 3", rating: 0.0 },
            { id: 16, title: "SPIDER-MAN 4", originalTitle: "Spider-Man 4", rating: 0.0 },
            { id: 17, title: "BLADE RUNNER 3", originalTitle: "Blade Runner 3", rating: 0.0 },
            { id: 18, title: "STAR WARS", originalTitle: "Star Wars: New Jedi", rating: 0.0 }
        ],
        'now-playing': [
            { id: 19, title: "DUNE: PART TWO", originalTitle: "Dune: Part Two", rating: 8.5 },
            { id: 20, title: "OPPENHEIMER", originalTitle: "Oppenheimer", rating: 8.4 },
            { id: 21, title: "BARBIE", originalTitle: "Barbie", rating: 7.0 },
            { id: 22, title: "JOHN WICK 4", originalTitle: "John Wick: Chapter 4", rating: 7.8 },
            { id: 23, title: "GUARDIANS 3", originalTitle: "Guardians of the Galaxy Vol. 3", rating: 7.9 },
            { id: 24, title: "FAST X", originalTitle: "Fast X", rating: 5.8 }
        ]
    };

    const toggleFavorite = (movieId: number) => {
        setFavorites(prev =>
            prev.includes(movieId)
                ? prev.filter(id => id !== movieId)
                : [...prev, movieId]
        );
    };

    const tabs = [
        { id: 'popular', label: 'Popular Movies' },
        { id: 'top-rated', label: 'Top Rated Movies' },
        { id: 'upcoming', label: 'Upcoming Movies' },
        { id: 'now-playing', label: 'Now Playing Movies' }
    ];

    return (
        <div className={s.categoryMovies}>
            <div className={s.header}>
                <h1 className={s.title}>Category Movies</h1>

                <div className={s.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`${s.tab} ${activeTab === tab.id ? s.active : ''}`}
                            onClick={() => setActiveTab(tab.id as TabType)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={s.moviesGrid}>
                {moviesData[activeTab].map((movie) => (
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
                                    fontSize: '0.7rem',
                                    textAlign: 'center',
                                    padding: '0.5rem'
                                }}>
                                    {movie.title}
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
                                <span className={s.ratingValue}>{movie.rating > 0 ? `${movie.rating}/10` : 'Coming Soon'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};