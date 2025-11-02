import {ToastContainer} from "react-toastify";
import {Routing} from '../../../common/routing/Routing.tsx'
import s from './App.module.css'
import {Header} from "../../../common/components/Header/Header.tsx";
import {Footer} from "../../../common/components/Footer/Footer.tsx";
import { useTheme } from '../../../common/components/ThemeContext/ThemeContext.tsx';

function App() {
    const { isDarkTheme } = useTheme();

    return (
        <div className={`${s.appContainer} ${isDarkTheme ? s.darkTheme : s.lightTheme}`}>
            <Header />
            <div className={s.layout}>
                <Routing />
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default App