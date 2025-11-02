
import {createRoot} from 'react-dom/client'
import './index.css'
import App from '../src/app/ui/App/App.tsx'
import {store} from "./app/model/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from './common/components/ThemeContext/ThemeContext.tsx'
//import { ThemeProvider } from 'common/'
createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
            <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
)
