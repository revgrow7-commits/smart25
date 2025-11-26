import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

// Função para detectar idioma baseado no IP
const detectLanguageByIP = async (): Promise<string> => {
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
    
    return countryToLanguage[countryCode] || 'pt';
  } catch (error) {
    console.warn('Falha ao detectar localização por IP:', error);
    return 'pt';
  }
};

// Inicializar idioma
const initializeLanguage = async () => {
  const savedLanguage = localStorage.getItem('language');
  
  let initialLanguage = 'pt';
  
  if (savedLanguage) {
    initialLanguage = savedLanguage;
  } else {
    // Detectar idioma por IP apenas se não houver preferência salva
    initialLanguage = await detectLanguageByIP();
    localStorage.setItem('language', initialLanguage);
  }
  
  i18n.changeLanguage(initialLanguage);
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es }
    },
    lng: 'pt', // Idioma inicial temporário
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Inicializar o idioma após a configuração
initializeLanguage();

export default i18n;
