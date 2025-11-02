import s from './FilteredMovies.module.css';
import { useState, useRef, useEffect } from 'react';

interface Movie {
    id: number;
    title: string;
    originalTitle: string;
    rating: number;
    genres: string[];
    imageUrl?: string;
}

type SortOption = 'popularity_desc' | 'popularity_asc' | 'rating_desc' | 'rating_asc' | 'release_desc' | 'release_asc' | 'title_asc' | 'title_desc';

export const FilteredMovies = () => {
    const [sortBy, setSortBy] = useState<SortOption>('popularity_desc');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Жанры для фильтрации
    const genres = [
        'Action', 'Animation', 'Crime', 'Drama', 'History',
        'Mystery', 'Science Fiction', 'Thriller', 'Comedy', 'Adventure'
    ];

    // Пример данных фильмов
    const movies: Movie[] = [
        {
            id: 1,
            title: "AFTERBURN",
            originalTitle: "Afterburn",
            rating: 6.8,
            genres: ['Action', 'Science Fiction']
        },
        {
            id: 2,
            title: "WAR OF THE WORLDS",
            originalTitle: "War of the Worlds",
            rating: 4.3,
            genres: ['Action', 'Thriller']
        },
        {
            id: 3,
            title: "OUR FAULT",
            originalTitle: "Our Fault",
            rating: 7.6,
            genres: ['Drama']
        },
        {
            id: 4,
            title: "HUNTING GROUNDS",
            originalTitle: "Hunting Grounds",
            rating: 6.4,
            genres: ['Action', 'Thriller']
        },
        {
            id: 5,
            title: "CAPTAIN HOOK",
            originalTitle: "Captain Hook - The Cursed Tides",
            rating: 4.8,
            genres: ['Adventure', 'Action']
        },
        {
            id: 6,
            title: "THE UGLY STEPSISTER",
            originalTitle: "The Ugly Stepsister",
            rating: 7.3,
            genres: ['Drama', 'Mystery']
        },
        {
            id: 7,
            title: "THE ELIXIR",
            originalTitle: "The Elixir",
            rating: 5.9,
            genres: ['Mystery', 'Thriller']
        },
        {
            id: 8,
            title: "DEMON SLAYER",
            originalTitle: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
            rating: 8.7,
            genres: ['Animation', 'Action']
        },
        {
            id: 9,
            title: "STOLEN GIRL",
            originalTitle: "Stolen Girl",
            rating: 6.2,
            genres: ['Crime', 'Drama']
        }
    ];

    const sortOptions = [
        { id: 'popularity_desc', label: 'Popularity ↓' },
        { id: 'popularity_asc', label: 'Popularity ↑' },
        { id: 'rating_desc', label: 'Rating ↓' },
        { id: 'rating_asc', label: 'Rating ↑' },
        { id: 'release_desc', label: 'Release Date ↓' },
        { id: 'release_asc', label: 'Release Date ↑' },
        { id: 'title_asc', label: 'Title A-Z' },
        { id: 'title_desc', label: 'Title Z-A' }
    ];

    // Сброс всех фильтров
    const resetFilters = () => {
        setSortBy('popularity_desc');
        setSelectedGenres([]);
        setRatingRange([0, 10]);
    };

    const toggleFavorite = (movieId: number) => {
        setFavorites(prev =>
            prev.includes(movieId)
                ? prev.filter(id => id !== movieId)
                : [...prev, movieId]
        );
    };

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre]
        );
    };

    // Обработчики для двойного ползунка
    const handleMouseDown = (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(thumb);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;

        const slider = sliderRef.current;
        const rect = slider.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 10; // 0-10 scale

        if (isDragging === 'min') {
            setRatingRange(prev => [Math.min(percentage, prev[1] - 0.1), prev[1]]);
        } else {
            setRatingRange(prev => [prev[0], Math.max(percentage, prev[0] + 0.1)]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(null);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    // Фильтрация и сортировка фильмов
    const filteredAndSortedMovies = movies
        .filter(movie => {
            // Фильтрация по жанрам
            if (selectedGenres.length > 0) {
                return selectedGenres.some(genre => movie.genres.includes(genre));
            }
            return true;
        })
        .filter(movie => movie.rating >= ratingRange[0] && movie.rating <= ratingRange[1]) // Фильтрация по рейтингу
        .sort((a, b) => {
            // Сортировка по выбранному критерию
            switch (sortBy) {
                case 'popularity_desc':
                    return b.rating - a.rating;
                case 'popularity_asc':
                    return a.rating - b.rating;
                case 'rating_desc':
                    return b.rating - a.rating;
                case 'rating_asc':
                    return a.rating - b.rating;
                case 'title_asc':
                    return a.title.localeCompare(b.title);
                case 'title_desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    // Расчет позиций для ползунков
    const minPosition = (ratingRange[0] / 10) * 100;
    const maxPosition = (ratingRange[1] / 10) * 100;

    return (
        <div className={s.filteredMovies}>
            <div className={s.header}>
                <h1 className={s.title}>Filtered Movies</h1>
            </div>

            {/* Боковая панель фильтров */}
            <div className={s.filtersSidebar}>


                {/* Сортировка */}
                <div className={`${s.filterSection} ${s.sortSection}`}>
                    <h3 className={s.sectionTitle}>Sort by</h3>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className={s.sortSelect}
                    >
                        {sortOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Жанры */}
                <div className={`${s.filterSection} ${s.genreSection}`}>
                    <h3 className={s.sectionTitle}>Genres</h3>
                    <div className={s.genresGrid}>
                        {genres.map(genre => (
                            <label key={genre} className={s.genreCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => toggleGenre(genre)}
                                />
                                <span className={s.genreLabel}>{genre}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Рейтинг */}
                <div className={`${s.filterSection} ${s.ratingSection}`}>
                    <h3 className={s.sectionTitle}>Rating</h3>
                    <div className={s.ratingRangeContainer} ref={sliderRef}>
                        <div className={s.ratingSlider} />
                        <div
                            className={s.ratingSliderFill}
                            style={{
                                left: `${minPosition}%`,
                                width: `${maxPosition - minPosition}%`
                            }}
                        />
                        <div
                            className={s.ratingThumb}
                            style={{ left: `${minPosition}%` }}
                            onMouseDown={handleMouseDown('min')}
                        />
                        <div
                            className={s.ratingThumb}
                            style={{ left: `${maxPosition}%` }}
                            onMouseDown={handleMouseDown('max')}
                        />
                    </div>
                    <div className={s.ratingValues}>
                        <span>{ratingRange[0].toFixed(1)}</span>
                        <span>{ratingRange[1].toFixed(1)}</span>
                    </div>
                </div>
                <div className={s.filtersHeader}>
                    <h2 className={s.filtersTitle}>Filters / Sort</h2>
                    <button className={s.resetButton} onClick={resetFilters}>
                        Reset filters
                    </button>
                </div>
            </div>

            {/* Сетка фильмов */}
            <div className={s.moviesContent}>
                <div className={s.moviesGrid}>
                    {filteredAndSortedMovies.map((movie) => (
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
                                        padding: '1rem'
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
                                    <span className={s.ratingValue}>{movie.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};