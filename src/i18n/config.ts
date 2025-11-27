import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

// Função para detectar idioma baseado no IP de forma assíncrona
const detectAndSetLanguageByIP = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const countryCode = data.country_code?.toLowerCase();
    
    // Mapear código do país para idioma
    const countryToLanguage: Record<string, string> = {
      'br': 'pt',
      'pt': 'pt',
      'ao': 'pt', // Angola
      'mz': 'pt', // Moçambique
      'us': 'en',
      'gb': 'en',
      'ca': 'en',
      'au': 'en',
      'es': 'es',
      'mx': 'es',
      'ar': 'es',
      'co': 'es',
      'cl': 'es',
      've': 'es',
      'pe': 'es',
    };
    
    const detectedLanguage = countryToLanguage[countryCode] || 'pt';
    
    // Só aplica se não houver preferência salva
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', detectedLanguage);
      i18n.changeLanguage(detectedLanguage);
    }
  } catch (error) {
    console.warn('Falha ao detectar localização por IP:', error);
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

// Detectar idioma por IP em segundo plano (não bloqueia a inicialização)
detectAndSetLanguageByIP();

export default i18n;
