"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Translation dictionary for all text content
const translations = {
  fr: {
    // Navbar
    home: "Accueil",
    features: "Fonctionnalités",
    screenshots: "Captures d'écran",
    faq: "FAQ",
    testimonials: "Témoignages",
    download: "Télécharger",
    contact: "Contact",
    
    // Hero section
    heroTitle: "Prenez le contrôle de votre diabète avec Diabeto",
    heroSubtitle: "Surveillez votre glycémie, suivez vos habitudes et vivez plus sainement chaque jour — le tout dans une application puissante et facile à utiliser.",
    downloadApp: "🔵 Télécharger l'application",
    learnHow: "⚪ Découvrir comment ça marche",
    
    // Features section
    featuresTitle: "Votre compagnon tout-en-un pour le diabète",
    bloodSugarMonitoring: "Suivi de la glycémie",
    bloodSugarDesc: "Enregistrez et analysez vos niveaux de glucose sanguin avec des graphiques visuels et des tendances.",
    smartReminders: "Rappels intelligents",
    smartRemindersDesc: "Ne manquez plus jamais un médicament, un repas ou un test sanguin grâce à des alertes personnalisables.",
    mealTracking: "Suivi des repas et des glucides",
    mealTrackingDesc: "Suivez facilement votre consommation alimentaire et vos niveaux de glucides.",
    activityTracking: "Intégration d'activité et de fitness",
    activityTrackingDesc: "Synchronisez avec votre traqueur d'activité pour surveiller votre activité physique et votre équilibre énergétique.",
    education: "Éducation et conseils",
    educationDesc: "Accédez à des conseils de santé, des recettes et des guides approuvés par des experts pour mieux gérer votre mode de vie.",
    shareReports: "Partager des rapports avec votre médecin",
    shareReportsDesc: "Générez des rapports de santé détaillés à partager avec votre professionnel de santé en quelques clics.",
    
    // Screenshot section
    screenshotsTitle: "Voir Diabeto en action",
    
    // Who is it for section
    whoForTitle: "Conçu pour les personnes vivant avec le diabète",
    diabetesPatients: "Patients diabétiques de type 1 et 2",
    preDiabetic: "Personnes pré-diabétiques",
    parents: "Parents gérant la condition d'un enfant",
    caregivers: "Soignants et utilisateurs soucieux de leur santé",
    healthConscious: "Toute personne souhaitant améliorer ses habitudes de santé",
    
    // Download section
    downloadTitle: "Commencez à gérer votre diabète intelligemment",
    downloadSubtitle: "Rejoignez des milliers d'utilisateurs qui vivent mieux avec Diabeto.",
    appStore: "Télécharger sur App Store",
    googlePlay: "Obtenir sur Google Play",
    getDiabeto: "🚀 Obtenir Diabeto maintenant",
    tryDemo: "🧪 Essayer la démo",
    
    // FAQ section
    faqTitle: "Questions fréquemment posées",
    q1: "Diabeto est-il gratuit à utiliser ?",
    a1: "Oui ! Diabeto est gratuit à télécharger et à utiliser avec les fonctionnalités essentielles. Une version Pro avec des outils premium est également disponible.",
    q2: "Puis-je suivre mon insuline et mes médicaments ?",
    a2: "Absolument. Diabeto vous permet d'enregistrer les médicaments, les dosages et les heures d'injection.",
    q3: "Les données sont-elles stockées en toute sécurité ?",
    a3: "Oui, toutes les données sont cryptées et stockées en toute sécurité dans le cloud. Votre confidentialité est notre priorité.",
    q4: "Puis-je utiliser Diabeto hors ligne ?",
    a4: "Oui. Toutes les fonctionnalités fonctionnent hors ligne et se synchronisent automatiquement lorsque vous vous reconnectez.",
    
    // Testimonials section
    testimonialsTitle: "Ce que disent nos utilisateurs",
    testimonial1: "Diabeto m'a redonné le contrôle de mon diabète. C'est un véritable sauveur.",
    testimonial2: "Suivre tout dans une seule application est tellement pratique et motivant.",
    
    // Footer
    footerAbout: "Votre application tout-en-un pour la gestion du diabète.",
    footerContact: "support@diabetoapp.com",
    quickLinks: "Liens rapides",
    support: "Support",
    legal: "Mentions légales",
    aboutUs: "À propos de nous",
    contactUs: "Contactez-nous",
    helpCenter: "Centre d'aide",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    copyright: "© 2024 Diabeto. Tous droits réservés.",
    developedBy: "Développé avec ❤️ par",
    
    // Language switcher
    language: "Langue",
    english: "English",
    french: "Français"
  },
  en: {
    // Navbar
    home: "Home",
    features: "Features",
    screenshots: "Screenshots",
    faq: "FAQ",
    testimonials: "Testimonials",
    download: "Download",
    contact: "Contact",
    
    // Hero section
    heroTitle: "Take Control of Your Diabetes with Diabeto",
    heroSubtitle: "Monitor your blood sugar, track your habits, and live healthier every day — all in one powerful, easy-to-use app.",
    downloadApp: "🔵 Download the App",
    learnHow: "⚪ Learn How It Works",
    
    // Features section
    featuresTitle: "Your All-in-One Diabetes Companion",
    bloodSugarMonitoring: "Blood Sugar Monitoring",
    bloodSugarDesc: "Log and analyze your blood glucose levels with visual charts and trends.",
    smartReminders: "Smart Reminders",
    smartRemindersDesc: "Never miss a medication, meal, or blood test again with customizable alerts.",
    mealTracking: "Meal & Carb Tracking",
    mealTrackingDesc: "Keep track of your food intake and carbohydrate levels with ease.",
    activityTracking: "Activity & Fitness Integration",
    activityTrackingDesc: "Sync with your fitness tracker to monitor your physical activity and energy balance.",
    education: "Education & Tips",
    educationDesc: "Access expert-approved health tips, recipes, and guides to better manage your lifestyle.",
    shareReports: "Share Reports with Your Doctor",
    shareReportsDesc: "Generate detailed health reports to share with your healthcare provider in just a few taps.",
    
    // Screenshot section
    screenshotsTitle: "See Diabeto in Action",
    
    // Who is it for section
    whoForTitle: "Built for People Living with Diabetes",
    diabetesPatients: "Type 1 & Type 2 Diabetes patients",
    preDiabetic: "Pre-diabetic individuals",
    parents: "Parents managing a child's condition",
    caregivers: "Caregivers & health-conscious users",
    healthConscious: "Anyone who wants to improve their health habits",
    
    // Download section
    downloadTitle: "Start Managing Your Diabetes the Smart Way",
    downloadSubtitle: "Join thousands of users who are living better with Diabeto.",
    appStore: "Download on App Store",
    googlePlay: "Get it on Google Play",
    getDiabeto: "🚀 Get Diabeto Now",
    tryDemo: "🧪 Try the Demo",
    
    // FAQ section
    faqTitle: "Frequently Asked Questions",
    q1: "Is Diabeto free to use?",
    a1: "Yes! Diabeto is free to download and use with essential features. A Pro version with premium tools is also available.",
    q2: "Can I track my insulin and medication?",
    a2: "Absolutely. Diabeto lets you log medications, dosages, and injection times.",
    q3: "Is the data stored securely?",
    a3: "Yes, all data is encrypted and securely stored in the cloud. Your privacy is our priority.",
    q4: "Can I use Diabeto offline?",
    a4: "Yes. All features work offline and sync automatically when you reconnect.",
    
    // Testimonials section
    testimonialsTitle: "What Our Users Say",
    testimonial1: "Diabeto gave me back control over my diabetes. It's a lifesaver.",
    testimonial2: "Tracking everything in one app is so convenient and motivating.",
    
    // Footer
    footerAbout: "Your all-in-one diabetes management app.",
    footerContact: "support@diabetoapp.com",
    quickLinks: "Quick Links",
    support: "Support",
    legal: "Legal",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    helpCenter: "Help Center",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    copyright: "© 2024 Diabeto. All rights reserved.",
    developedBy: "Developed with ❤️ by",
    
    // Language switcher
    language: "Language",
    english: "English",
    french: "Français"
  }
};

export default function Home() {
  // Default language is French
  const [language, setLanguage] = useState('fr');
  const t = translations[language];
  
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Language Switcher - Fixed on screen */}
      <div className="fixed right-4 top-24 z-[100]">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-primary"
        >
          <span className="text-sm font-medium">
            {language === 'fr' ? translations.fr.english : translations.en.french}
          </span>
          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300">
            {language === 'fr' 
              ? <div className="bg-blue-500 w-full h-1/3"></div> 
              : <div className="flex flex-col h-full">
                  <div className="bg-blue-500 w-full h-1/3"></div>
                  <div className="bg-white w-full h-1/3"></div>
                  <div className="bg-red-500 w-full h-1/3"></div>
                </div>
            }
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-6 lg:px-8 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex lg:flex-1">
          <span className="text-2xl font-bold text-primary">Diabeto</span>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="#" className="nav-link text-sm font-semibold leading-6">{t.home}</Link>
          <Link href="#features" className="nav-link text-sm font-semibold leading-6">{t.features}</Link>
          <Link href="#screenshots" className="nav-link text-sm font-semibold leading-6">{t.screenshots}</Link>
          <Link href="#faq" className="nav-link text-sm font-semibold leading-6">{t.faq}</Link>
          <Link href="#testimonials" className="nav-link text-sm font-semibold leading-6">{t.testimonials}</Link>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link href="#contact" className="btn-secondary nav-btn text-sm">{t.contact}</Link>
          <Link href="#download" className="btn-primary nav-btn text-sm">{t.download}</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#download" className="btn-primary nav-btn">
                {t.downloadApp}
              </Link>
              <Link href="#how-it-works" className="btn-secondary nav-btn">
                {t.learnHow}
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="hero-image-container w-[300px] h-[520px]">
              <div className="relative w-full h-full animate-float hero-image">
                <Image
                  src="/mainimg.png"
                  alt="Diabeto App Screenshot"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t.featuresTitle}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-start space-y-4">
              <div className="text-4xl">📈</div>
              <h3 className="text-xl font-semibold">{t.bloodSugarMonitoring}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.bloodSugarDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4">
              <div className="text-4xl">🕒</div>
              <h3 className="text-xl font-semibold">{t.smartReminders}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.smartRemindersDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4">
              <div className="text-4xl">🍽️</div>
              <h3 className="text-xl font-semibold">{t.mealTracking}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.mealTrackingDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4">
              <div className="text-4xl">🏃</div>
              <h3 className="text-xl font-semibold">{t.activityTracking}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.activityTrackingDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4">
              <div className="text-4xl">📚</div>
              <h3 className="text-xl font-semibold">{t.education}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.educationDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4">
              <div className="text-4xl">👨‍⚕️</div>
              <h3 className="text-xl font-semibold">{t.shareReports}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.shareReportsDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section id="screenshots" className="section bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t.screenshotsTitle}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Image 
              src="/s1.png" 
              alt="Blood Sugar Tracking" 
              width={250} 
              height={400}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
            <Image 
              src="/s2.png" 
              alt="Meal Tracking" 
              width={250} 
              height={400}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
            <Image 
              src="/s3.png" 
              alt="Activity Monitoring" 
              width={250} 
              height={400}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
            <Image 
              src="/s4.png" 
              alt="Health Reports" 
              width={250} 
              height={400}
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section id="who-for" className="section bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t.whoForTitle}</h2>
          
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {t.diabetesPatients}
              </li>
              <li className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {t.preDiabetic}
              </li>
              <li className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {t.parents}
              </li>
              <li className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {t.caregivers}
              </li>
              <li className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {t.healthConscious}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="download" className="section bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t.downloadTitle}</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">{t.downloadSubtitle}</p>
          
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            <Link href="#" className="flex items-center gap-3 bg-black text-white btn-primary nav-btn hover:bg-gray-800 px-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-7 h-7 fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              {t.appStore}
            </Link>
            <Link href="#" className="flex items-center gap-3 bg-black text-white btn-primary nav-btn hover:bg-gray-800 px-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-7 fill-current">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              {t.googlePlay}
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link href="#" className="bg-white text-blue-600 btn-primary nav-btn hover:bg-gray-100">
              {t.getDiabeto}
            </Link>
            <Link href="#" className="bg-transparent border-2 border-white text-white btn-primary nav-btn hover:bg-blue-700">
              {t.tryDemo}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t.faqTitle}</h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t.q1}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.a1}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t.q2}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.a2}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t.q3}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.a3}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t.q4}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.a4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t.testimonialsTitle}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Image 
                  src="/profile-pic (8).png" 
                  alt="User Avatar" 
                  width={60} 
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Rachel</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Type 2 Diabetic</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{t.testimonial1}"
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 w-[60px] h-[60px] rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                  L
                </div>
                <div>
                  <h3 className="font-semibold">Luis</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "{t.testimonial2}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          {/* Top section with columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Diabeto</h3>
              <p className="text-gray-400 mb-4">{t.footerAbout}</p>
              <p className="text-gray-400 flex items-center gap-2">
                <span>📧</span> {t.footerContact}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">{t.home}</Link></li>
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">{t.features}</Link></li>
                <li><Link href="#screenshots" className="text-gray-400 hover:text-white transition-colors">{t.screenshots}</Link></li>
                <li><Link href="#download" className="text-gray-400 hover:text-white transition-colors">{t.download}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.support}</h3>
              <ul className="space-y-2">
                <li><Link href="#faq" className="text-gray-400 hover:text-white transition-colors">{t.faq}</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">{t.contactUs}</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">{t.helpCenter}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.legal}</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">{t.aboutUs}</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">{t.privacyPolicy}</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">{t.termsOfService}</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Social media icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          </div>
          
          {/* Horizontal rule */}
          <hr className="border-gray-800 mb-8" />
          
          {/* Copyright and credits */}
          <div className="md:flex md:justify-between md:items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              {t.copyright}
            </p>
            <p className="text-gray-400 text-center md:text-right">
              {t.developedBy} <Link href="https://wa.link/uske6b" target="_blank" className="text-blue-400 hover:text-blue-300 transition-colors">kaoserpro</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
