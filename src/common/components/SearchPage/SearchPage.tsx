import s from './SearchPage.module.css';
import { useState } from 'react';
import { Search } from '../../../common/components/Search/Search.tsx';

export const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Здесь будет логика поиска
            console.log('Searching for:', searchQuery);
            // Можно добавить отображение результатов поиска
        }
    };

    return (
        <div className={s.searchPage}>
            <div className={s.header}>
                <h1 className={s.title}>Search Results</h1>
            </div>

            <div className={s.searchSection}>
                <Search
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSearchSubmit={handleSearch}
                />
            </div>

            {!searchQuery.trim() && (
                <div className={s.placeholderText}>
                    Enter a movie title to start searching.
                </div>
            )}

            {/* Здесь можно добавить отображение результатов поиска */}
            {/* {searchQuery.trim() && <SearchResults query={searchQuery} />} */}
        </div>
    );
};