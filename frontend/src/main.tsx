import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/HomePage';
import './styles.css';
import { LanguageProvider } from './i18n';

createRoot(document.getElementById('root')!).render(<StrictMode><LanguageProvider><HomePage /></LanguageProvider></StrictMode>);
