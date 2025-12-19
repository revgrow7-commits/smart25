import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

// Função para detectar idioma baseado no navegador (mais confiável que IP)
const detectAndSetLanguage = () => {
  try {
    // Só aplica se não houver preferência salva
    if (!localStorage.getItem('language')) {
      const browserLang = navigator.language?.toLowerCase() || 'pt';
      
      let detectedLanguage = 'pt'; // Default
      
      if (browserLang.startsWith('pt')) {
        detectedLanguage = 'pt';
      } else if (browserLang.startsWith('es')) {
        detectedLanguage = 'es';
      } else if (browserLang.startsWith('en')) {
        detectedLanguage = 'en';
      }
      
      localStorage.setItem('language', detectedLanguage);
      i18n.changeLanguage(detectedLanguage);
    }
  } catch {
    // Silently fail - use default language
  }
};

// Obter idioma inicial de forma síncrona
const savedLanguage = localStorage.getItem('language') || 'pt';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es }
    },
    lng: savedLanguage,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Detectar idioma pelo navegador (mais rápido e confiável)
detectAndSetLanguage();

export default i18n;
