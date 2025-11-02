import s from './Search.module.css';

interface SearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
    placeholder?: string;
    className?: string;
}

export const Search = ({
                           searchQuery,
                           onSearchChange,
                           onSearchSubmit,
                           placeholder = "Search for a movie",
                           className = ''
                       }: SearchProps) => {
    return (
        <div className={`${s.search} ${className}`}>
            <form className={s.searchForm} onSubmit={onSearchSubmit}>
                <div className={s.searchContainer}>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className={s.searchInput}
                    />
                    <button
                        type="submit"
                        className={s.searchButton}
                        disabled={!searchQuery.trim()}
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};