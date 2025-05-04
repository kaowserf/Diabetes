"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { initScrollAnimations, addScrollProgress } from "./scrollAnimations";

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
    french: "Français",
    
    // Video section
    videoSectionTitle: "Découvrez comment Diabeto fonctionne",
    videoButtonText: "Regarder la vidéo",
    video1Title: "Guide de démarrage avec Diabeto",
    video1Desc: "Apprenez à configurer votre application et à commencer à suivre votre glycémie en quelques minutes.",
    video2Title: "Fonctionnalités avancées de Diabeto",
    video2Desc: "Découvrez comment utiliser les rapports et les analyses pour améliorer votre gestion du diabète.",
    
    // Contact section
    contactTitle: "Contactez-nous",
    contactSubtitle: "Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question.",
    contactName: "Votre nom",
    contactEmail: "Votre email",
    contactMessage: "Votre message",
    contactSend: "Envoyer",
    contactWhatsApp: "Discuter sur WhatsApp",
    contactSuccess: "Message envoyé avec succès!",
    contactAddress: "13 Rue du Diabète, Paris, France",
    contactPhone: "+33 1 23 45 67 89",
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
    french: "Français",
    
    // Video section
    videoSectionTitle: "See How Diabeto Works",
    videoButtonText: "Watch Video",
    video1Title: "Getting Started with Diabeto",
    video1Desc: "Learn how to set up your app and start tracking your blood sugar in minutes.",
    video2Title: "Advanced Diabeto Features",
    video2Desc: "Discover how to use reports and insights to improve your diabetes management.",
    
    // Contact section
    contactTitle: "Contact Us",
    contactSubtitle: "We're here to help. Feel free to reach out with any questions.",
    contactName: "Your Name",
    contactEmail: "Your Email",
    contactMessage: "Your Message",
    contactSend: "Send Message",
    contactWhatsApp: "Chat on WhatsApp",
    contactSuccess: "Message sent successfully!",
    contactAddress: "13 Diabetes Street, New York, USA",
    contactPhone: "+1 234 567 8900",
  }
};

export default function Home() {
  // Default language is French
  const [language, setLanguage] = useState('fr');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const t = translations[language];
  
  // Initialize scroll animations when component mounts
  useEffect(() => {
    initScrollAnimations();
    addScrollProgress();
  }, []);
  
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend or email service
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('');
      e.target.reset();
    }, 3000);
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center">
          <span className="text-xl sm:text-2xl font-bold text-primary">Diabeto</span>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="#" className="nav-link text-sm font-semibold leading-6">{t.home}</Link>
          <Link href="#features" className="nav-link text-sm font-semibold leading-6">{t.features}</Link>
          <Link href="#screenshots" className="nav-link text-sm font-semibold leading-6">{t.screenshots}</Link>
          <Link href="#faq" className="nav-link text-sm font-semibold leading-6">{t.faq}</Link>
          <Link href="#testimonials" className="nav-link text-sm font-semibold leading-6">{t.testimonials}</Link>
        </div>
        
        {/* Desktop Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Link href="#contact" className="btn-secondary nav-btn text-sm">{t.contact}</Link>
          <Link href="#download" className="btn-primary nav-btn text-sm">{t.download}</Link>
          <button 
            onClick={toggleLanguage}
            className="lang-switcher flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-primary rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-all"
          >
            <span className="text-sm font-medium">
              {language === 'fr' ? translations.fr.english : translations.en.french}
            </span>
            <div className="lang-icon w-5 h-5 rounded-full overflow-hidden border border-gray-300">
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
        
        {/* Mobile Language Switcher & Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={toggleLanguage}
            className="lang-switcher flex items-center gap-1 bg-white dark:bg-gray-800 border-2 border-primary rounded-full px-2 py-1 shadow-md"
          >
            <span className="text-xs font-medium sr-only sm:not-sr-only">
              {language === 'fr' ? translations.fr.english : translations.en.french}
            </span>
            <div className="lang-icon w-4 h-4 rounded-full overflow-hidden border border-gray-300">
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
          
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden fixed top-[61px] left-0 right-0 bg-white dark:bg-gray-900 z-40 shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="p-4 space-y-3">
          <Link href="#" className="block py-2 text-base font-medium text-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded">{t.home}</Link>
          <Link href="#features" className="block py-2 text-base font-medium text-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={toggleMobileMenu}>{t.features}</Link>
          <Link href="#screenshots" className="block py-2 text-base font-medium text-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={toggleMobileMenu}>{t.screenshots}</Link>
          <Link href="#faq" className="block py-2 text-base font-medium text-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={toggleMobileMenu}>{t.faq}</Link>
          <Link href="#testimonials" className="block py-2 text-base font-medium text-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded" onClick={toggleMobileMenu}>{t.testimonials}</Link>
          
          <div className="pt-4 grid grid-cols-2 gap-3">
            <Link href="#contact" className="btn-secondary nav-btn text-sm py-3 text-center" onClick={toggleMobileMenu}>{t.contact}</Link>
            <Link href="#download" className="btn-primary nav-btn text-sm py-3 text-center" onClick={toggleMobileMenu}>{t.download}</Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-center md:text-left scroll-slide-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
              <Link href="#download" className="btn-primary nav-btn text-sm sm:text-base px-4 sm:px-6">
                {t.downloadApp}
              </Link>
              <Link href="#how-it-works" className="btn-secondary nav-btn text-sm sm:text-base px-4 sm:px-6">
                {t.learnHow}
              </Link>
            </div>
          </div>
          <div className="flex justify-center mt-8 md:mt-0 scroll-slide-right">
            <div className="hero-image-container w-[220px] sm:w-[280px] md:w-[300px] h-[380px] sm:h-[480px] md:h-[520px]">
              <div className="relative w-full h-full animate-float hero-image">
                <Image
                  src="/logo.jpeg"
                  alt="Diabeto Logo"
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
      <section id="features" className="section py-12 sm:py-16 px-4 sm:px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16 scroll-fade-in">{t.featuresTitle}</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="flex flex-col items-start space-y-4 hover-card p-6 rounded-lg scroll-fade-in">
              <div className="text-4xl feature-icon">📈</div>
              <h3 className="text-xl font-semibold">{t.bloodSugarMonitoring}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.bloodSugarDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4 hover-card p-6 rounded-lg scroll-fade-in">
              <div className="text-4xl feature-icon">🕒</div>
              <h3 className="text-xl font-semibold">{t.smartReminders}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.smartRemindersDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4 hover-card p-6 rounded-lg scroll-fade-in">
              <div className="text-4xl feature-icon">🍽️</div>
              <h3 className="text-xl font-semibold">{t.mealTracking}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.mealTrackingDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4 hover-card p-6 rounded-lg scroll-fade-in">
              <div className="text-4xl feature-icon">🏃</div>
              <h3 className="text-xl font-semibold">{t.activityTracking}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.activityTrackingDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4 hover-card p-6 rounded-lg scroll-fade-in">
              <div className="text-4xl feature-icon">📚</div>
              <h3 className="text-xl font-semibold">{t.education}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.educationDesc}</p>
            </div>
            
            <div className="flex flex-col items-start space-y-4 hover-card p-6 rounded-lg scroll-fade-in">
              <div className="text-4xl feature-icon">👨‍⚕️</div>
              <h3 className="text-xl font-semibold">{t.shareReports}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.shareReportsDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Section with parallax effect */}
      <section id="screenshots" className="section bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 scroll-fade-in">{t.screenshotsTitle}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-500 hover-card scroll-scale-in">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <p className="text-white font-medium text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Blood Sugar Tracking</p>
              </div>
              <Image 
                src="/s1.png" 
                alt="Blood Sugar Tracking" 
                width={250} 
                height={400}
                className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1 parallax-element"
                data-speed="0.1"
              />
            </div>
            
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-500 hover-card scroll-scale-in">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <p className="text-white font-medium text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Meal Tracking</p>
              </div>
              <Image 
                src="/s2.png" 
                alt="Meal Tracking" 
                width={250} 
                height={400}
                className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1 parallax-element"
                data-speed="0.15"
              />
            </div>
            
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-500 hover-card scroll-scale-in">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <p className="text-white font-medium text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Activity Monitoring</p>
              </div>
              <Image 
                src="/s3.png" 
                alt="Activity Monitoring" 
                width={250} 
                height={400}
                className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1 parallax-element"
                data-speed="0.2"
              />
            </div>
            
            <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-500 hover-card scroll-scale-in">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <p className="text-white font-medium text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Health Reports</p>
              </div>
              <Image 
                src="/s4.png" 
                alt="Health Reports" 
                width={250} 
                height={400}
                className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1 parallax-element"
                data-speed="0.25"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section id="who-for" className="section bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 scroll-fade-in">{t.whoForTitle}</h2>
          
          <div className="max-w-3xl mx-auto scroll-slide-left">
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

      {/* YouTube Video Section */}
      <section id="videos" className="section py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16 animate-reveal">{t.videoSectionTitle}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Video 1 */}
            <div className="flex flex-col space-y-4 hover-card rounded-lg overflow-hidden animate-reveal delay-1">
              <div className="relative pb-[56.25%] bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/gBxFaQvT6ss" 
                  title={t.video1Title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-b-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{t.video1Title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{t.video1Desc}</p>
                <button className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {t.videoButtonText}
                </button>
              </div>
            </div>
            
            {/* Video 2 */}
            <div className="flex flex-col space-y-4 hover-card rounded-lg overflow-hidden animate-reveal delay-2">
              <div className="relative pb-[56.25%] bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/gBxFaQvT6ss" 
                  title={t.video2Title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-b-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{t.video2Title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{t.video2Desc}</p>
                <button className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {t.videoButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="download" className="section py-12 sm:py-16 px-4 sm:px-6 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t.downloadTitle}</h2>
          <p className="text-base sm:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">{t.downloadSubtitle}</p>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 max-w-3xl mx-auto">
            <Link href="#" className="flex items-center justify-center gap-3 bg-black text-white btn-primary nav-btn hover:bg-gray-800 px-4 sm:px-6 py-3 w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 sm:w-7 sm:h-7 fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="text-sm sm:text-base">{t.appStore}</span>
            </Link>
            <Link href="#" className="flex items-center justify-center gap-3 bg-black text-white btn-primary nav-btn hover:bg-gray-800 px-4 sm:px-6 py-3 w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 sm:w-7 sm:h-7 fill-current">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              <span className="text-sm sm:text-base">{t.googlePlay}</span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <Link href="#" className="bg-white text-blue-600 btn-primary nav-btn hover:bg-gray-100 w-full sm:w-auto py-3">
              {t.getDiabeto}
            </Link>
            <Link href="#" className="bg-transparent border-2 border-white text-white btn-primary nav-btn hover:bg-blue-700 w-full sm:w-auto py-3">
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
                {`"${t.testimonial1}"`}
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
                {`"${t.testimonial2}"`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section py-12 sm:py-16 px-4 sm:px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">{t.contactTitle}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">{t.contactSubtitle}</p>
          
          <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 animate-reveal">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.contactName}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.contactEmail}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.contactMessage}
                  </label>
                  <textarea 
                    id="message" 
                    rows="5"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <button type="submit" className="btn-primary nav-btn px-6 py-3 w-full sm:w-auto">
                    {t.contactSend}
                  </button>
                  {formStatus === 'success' && (
                    <div className="ml-4 text-green-600 dark:text-green-400">
                      {t.contactSuccess}
                    </div>
                  )}
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6 animate-reveal delay-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-xl mb-4 text-primary">Diabeto</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1 1 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t.contactAddress}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t.footerContact}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{t.contactPhone}</span>
                  </li>
                </ul>
              </div>
              
              <a 
                href="https://wa.link/uske6b" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.contactWhatsApp}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          {/* Top section with columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 sm:mb-12">
            <div className="animate-reveal">
              <h3 className="text-xl font-bold mb-4">Diabeto</h3>
              <p className="text-gray-400 mb-4">{t.footerAbout}</p>
              <p className="text-gray-400 flex items-center gap-2">
                <span>📧</span> {t.footerContact}
              </p>
            </div>
            
            <div className="animate-reveal delay-1">
              <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 footer-link">{t.home}</Link></li>
                <li><Link href="#features" className="text-gray-400 footer-link">{t.features}</Link></li>
                <li><Link href="#screenshots" className="text-gray-400 footer-link">{t.screenshots}</Link></li>
                <li><Link href="#download" className="text-gray-400 footer-link">{t.download}</Link></li>
              </ul>
            </div>
            
            <div className="animate-reveal delay-2">
              <h3 className="text-lg font-semibold mb-4">{t.support}</h3>
              <ul className="space-y-2">
                <li><Link href="#faq" className="text-gray-400 footer-link">{t.faq}</Link></li>
                <li><Link href="#contact" className="text-gray-400 footer-link">{t.contactUs}</Link></li>
                <li><Link href="#" className="text-gray-400 footer-link">{t.helpCenter}</Link></li>
              </ul>
            </div>
            
            <div className="animate-reveal delay-3">
              <h3 className="text-lg font-semibold mb-4">{t.legal}</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 footer-link">{t.aboutUs}</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 footer-link">{t.privacyPolicy}</Link></li>
                <li><Link href="#" className="text-gray-400 footer-link">{t.termsOfService}</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Social media icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <Link href="#" className="text-gray-400 social-icon">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 social-icon">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 social-icon">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          </div>
          
          {/* Horizontal rule */}
          <hr className="border-gray-800 mb-8" />
          
          {/* Copyright and credits */}
          <div className="md:flex md:justify-between md:items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0 animate-reveal">
              {t.copyright}
            </p>
            <p className="text-gray-400 text-center md:text-right animate-reveal delay-1">
              {t.developedBy} <Link href="https://wa.link/uske6b" target="_blank" className="text-blue-400 hover:text-blue-300 transition-colors footer-link">kaoserpro</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
