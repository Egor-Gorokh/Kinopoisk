import s from './MainPage.module.css';
import { useState } from 'react';
import backgroundImage from '../../../assets/images/batman.jpeg';
import { PopularMovies } from "../../../common/components/PopularMovies/PopularMovies.tsx";
import { TopRatedMovies } from "../../../common/components/TopRatedMovies/TopRatedMovies.tsx";
import { Search } from "../../../common/components/Search/Search.tsx";

export const MainPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Здесь будет логика поиска
            console.log('Searching for:', searchQuery);
            // Можно добавить навигацию на страницу поиска
        }
    };

    return (
        <>
            <div
                className={s.mainPage}
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className={s.backgroundOverlay}></div>
                <div className={s.heroSection}>
                    <h1 className={s.welcomeTitle}>WELCOME</h1>
                    <p className={s.subtitle}>Browse highlighted titles from TMDB</p>

                    <Search
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onSearchSubmit={handleSearch}
                    />
                </div>
            </div>

            <PopularMovies />
            <TopRatedMovies />
        </>
    );
};