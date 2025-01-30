import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './components/App/App.tsx'
import {Provider} from "react-redux";
import {rootReducer} from "./reducer/reducer.ts"
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({reducer: rootReducer});


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
