import s from './Footer.module.css';
//import { useTheme } from '../ThemeContext/ThemeContext.tsx';

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.footerContent}>
                © 2025 Kinopoisk Demo · Data courtesy of <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>
            </div>
        </footer>
    );
};