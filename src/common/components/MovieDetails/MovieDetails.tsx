import s from './MovieDetails.module.css';
import {  useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
  //  useGetMovieImagesQuery,
    useGetMovieRecommendationsQuery,
    useGetMovieVideosQuery
} from '../../../features/movies/api/moviesApi.ts';
import { toggleFavorite, selectIsFavorite } from "../../../features/favorites/favoritesSlice.ts";

// Интерфейсы для типизации
interface Genre {
    id: number;
    name: string;
}

interface Person {
    id: number;
    name: string;
    job: string;
    character: string;
    profile_path?: string;
}

interface Video {
    id: string;
    key: string;
    name: string;
    type: string;
    site: string;
}

/*interface Image {
    file_path: string;
}*/

interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    budget: number;
    revenue: number;
    genres: Genre[];
}

interface Credits {
    cast: Person[];
    crew: Person[];
}

/*interface Images {
    backdrops: Image[];
    posters: Image[];
}*/

interface Recommendations {
    results: Movie[];
}

interface Videos {
    results: Video[];
}

export const MovieDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movieId = parseInt(id!);

    // Проверяем в Redux состоянии, есть ли фильм в избранных
    const isFavorite = useSelector(selectIsFavorite(movieId));

    // Запросы для получения данных о фильме
    const { data: movie, isLoading: movieLoading, error: movieError } = useGetMovieDetailsQuery(movieId);
    const { data: credits } = useGetMovieCreditsQuery(movieId);
   // const { data: images } = useGetMovieImagesQuery(movieId);
    const { data: recommendations } = useGetMovieRecommendationsQuery(movieId);
    const { data: videos } = useGetMovieVideosQuery(movieId);

    // Проверяем есть ли трейлер
    const trailer = (videos as Videos)?.results?.find((video: Video) =>
        video.type === 'Trailer' && video.site === 'YouTube'
    );

    const toggleFavoriteHandler = () => {
        dispatch(toggleFavorite(movieId));
    };

    const handleGoBack = () => {
        navigate(-1); // Возврат на предыдущую страницу
    };

    const formatRuntime = (minutes: number) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatCurrency = (amount: number) => {
        if (!amount || amount === 0) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

    // Скролл к верху при загрузке
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [movieId]);

    if (movieLoading) {
        return <div className={s.loading}>Loading movie details...</div>;
    }

    if (movieError || !movie) {
        return (
            <div className={s.error}>
                <h2>Error loading movie details</h2>
                <p>Please try again later.</p>
                <button onClick={handleGoBack} className={s.backButton}>
                    Go Back
                </button>
            </div>
        );
    }

    const typedMovie = movie as Movie;
    const typedCredits = credits as Credits;
   /* const typedImages = images as Images;*/
    const typedRecommendations = recommendations as Recommendations;

    const director = typedCredits?.crew?.find((person: Person) => person.job === 'Director');
    const mainCast = typedCredits?.cast?.slice(0, 12) || [];
 /*   const backdrops = typedImages?.backdrops?.slice(0, 10) || [];
    const posters = typedImages?.posters?.slice(0, 10) || [];*/
    const recommendationMovies = typedRecommendations?.results?.slice(0, 8) || [];

    return (
        <div className={s.movieDetails}>
            {/* Hero секция с бэкдропом и основной информацией */}
            <div className={s.movieHero}>
                {typedMovie.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w1280${typedMovie.backdrop_path}`}
                        alt={typedMovie.title}
                        className={s.backdropImage}
                    />
                ) : (
                    <div className={s.backdropPlaceholder}></div>
                )}
                <div className={s.heroOverlay}></div>

                {/* Кнопка назад в правом верхнем углу */}
                <button className={s.backButton} onClick={handleGoBack}>
                    ← Back
                </button>

                <div className={s.heroContent}>
                    <div className={s.posterContainer}>
                        <img
                            src={typedMovie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${typedMovie.poster_path}`
                                : '/placeholder-poster.jpg'
                            }
                            alt={typedMovie.title}
                            className={s.poster}
                        />
                    </div>

                    <div className={s.movieInfo}>
                        <h1 className={s.movieTitle}>{typedMovie.title}</h1>
                        {typedMovie.original_title !== typedMovie.title && (
                            <p className={s.movieOriginalTitle}>{typedMovie.original_title}</p>
                        )}

                        <div className={s.actions}>
                            {trailer && (
                                <button
                                    className={`${s.actionButton} ${s.watchTrailer}`}
                                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                                >
                                    <span>▶</span>
                                    Watch Trailer
                                </button>
                            )}
                            <button
                                className={`${s.actionButton} ${s.addToFavorites} ${isFavorite ? s.favoriteActive : ''}`}
                                onClick={toggleFavoriteHandler}
                            >
                                <span>{isFavorite ? '❤' : '🤍'}</span>
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>

                        <div className={s.movieMeta}>
                            <div className={s.metaItem}>
                                <span className={s.metaLabel}>Release Date</span>
                                <span className={s.metaValue}>{formatDate(typedMovie.release_date)}</span>
                            </div>

                            <div className={s.metaItem}>
                                <span className={s.metaLabel}>Rating</span>
                                <div className={s.rating}>
                                    <div className={s.ratingStars}>
                                        {renderStars(typedMovie.vote_average)}
                                    </div>
                                    <span>{typedMovie.vote_average.toFixed(1)}/10</span>
                                </div>
                            </div>

                            <div className={s.metaItem}>
                                <span className={s.metaLabel}>Runtime</span>
                                <span className={s.metaValue}>{formatRuntime(typedMovie.runtime)}</span>
                            </div>

                            {typedMovie.budget > 0 && (
                                <div className={s.metaItem}>
                                    <span className={s.metaLabel}>Budget</span>
                                    <span className={s.metaValue}>{formatCurrency(typedMovie.budget)}</span>
                                </div>
                            )}

                            {typedMovie.revenue > 0 && (
                                <div className={s.metaItem}>
                                    <span className={s.metaLabel}>Revenue</span>
                                    <span className={s.metaValue}>{formatCurrency(typedMovie.revenue)}</span>
                                </div>
                            )}

                            {director && (
                                <div className={s.metaItem}>
                                    <span className={s.metaLabel}>Director</span>
                                    <span className={s.metaValue}>{director.name}</span>
                                </div>
                            )}
                        </div>

                        <div className={s.genres}>
                            {typedMovie.genres?.map((genre: Genre) => (
                                <span key={genre.id} className={s.genre}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className={s.overview}>{typedMovie.overview || 'No overview available.'}</p>
                    </div>
                </div>
            </div>

            {/* Основной контент */}
            <div className={s.movieContent}>
                {/* Актерский состав */}
                {mainCast.length > 0 && (
                    <section className={s.section}>
                        <h2 className={s.sectionTitle}>Cast</h2>
                        <div className={s.castGrid}>
                            {mainCast.map((actor: Person) => (
                                <div key={actor.id} className={s.castCard}>
                                    <img
                                        src={actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : '/placeholder-actor.jpg'
                                        }
                                        alt={actor.name}
                                        className={s.castPhoto}
                                        onError={(e) => {
                                            e.currentTarget.src = '/placeholder-actor.jpg';
                                        }}
                                    />
                                    <div className={s.castInfo}>
                                        <div className={s.castName}>{actor.name}</div>
                                        <div className={s.castCharacter}>{actor.character}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Рекомендации */}
                {recommendationMovies.length > 0 && (
                    <section className={s.section}>
                        <h2 className={s.sectionTitle}>Recommendations</h2>
                        <div className={s.recommendationsGrid}>
                            {recommendationMovies.map((recommendation: Movie) => (
                                <div
                                    key={recommendation.id}
                                    className={s.recommendationCard}
                                    onClick={() => navigate(`/movie/${recommendation.id}`)}
                                >
                                    <img
                                        src={recommendation.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${recommendation.poster_path}`
                                            : '/placeholder-poster.jpg'
                                        }
                                        alt={recommendation.title}
                                        className={s.recommendationPoster}
                                        onError={(e) => {
                                            e.currentTarget.src = '/placeholder-poster.jpg';
                                        }}
                                    />
                                    <div className={s.recommendationInfo}>
                                        <div className={s.recommendationTitle}>{recommendation.title}</div>
                                        <div className={s.recommendationRating}>
                                            <div className={s.ratingStars}>
                                                {renderStars(recommendation.vote_average)}
                                            </div>
                                            <span>{recommendation.vote_average.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};