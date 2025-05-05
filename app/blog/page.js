"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogCard from '../components/BlogCard';
import { getAllPosts } from '../data/blogPosts';

// Create a client component that uses useSearchParams
function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allPosts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Language state
  const [language, setLanguage] = useState('fr');

  // Extract unique categories from posts - moved to the top before any useEffect
  const categories = ['All', ...new Set(allPosts.map(post => post.category))];

  // Translations
  const translations = {
    en: {
      home: "Home",
      features: "Features",
      blog: "Blog",
      contact: "Contact",
      downloadApp: "Download App",
      blogTitle: "My Diabeto Blog",
      blogSubtitle: "avec la montre et téléphone c'est très parlant et percutant",
      searchPlaceholder: "Search articles...",
      filterByCategory: "Filter by Category",
      allArticles: "All Articles",
      articles: "articles",
      article: "article",
      showing: "Showing",
      noArticlesFound: "No articles found",
      tryAdjusting: "Try adjusting your search or category selection",
      resetFilters: "Reset filters",
      subscribeNewsletter: "Subscribe to Our Newsletter",
      newsletterDescription: "Get the latest articles, tips, and resources delivered straight to your inbox.",
      emailPlaceholder: "Your email address",
      subscribe: "Subscribe",
      quickLinks: "Quick Links",
      categories: "Categories",
      followUs: "Follow Us",
      copyright: "© 2024 My Diabeto. All rights reserved.",
      french: "Français",
      english: "English",
    },
    fr: {
      home: "Accueil",
      features: "Fonctionnalités",
      blog: "Blog",
      contact: "Contact",
      downloadApp: "Télécharger l'App",
      blogTitle: "Blog My Diabeto",
      blogSubtitle: "avec la montre et téléphone c'est très parlant et percutant",
      searchPlaceholder: "Rechercher des articles...",
      filterByCategory: "Filtrer par Catégorie",
      allArticles: "Tous les Articles",
      articles: "articles",
      article: "article",
      showing: "Affichage de",
      noArticlesFound: "Aucun article trouvé",
      tryAdjusting: "Essayez d'ajuster votre recherche ou votre sélection de catégorie",
      resetFilters: "Réinitialiser les filtres",
      subscribeNewsletter: "Abonnez-vous à Notre Newsletter",
      newsletterDescription: "Recevez les derniers articles, conseils et ressources directement dans votre boîte mail.",
      emailPlaceholder: "Votre adresse email",
      subscribe: "S'abonner",
      quickLinks: "Liens Rapides",
      categories: "Catégories",
      followUs: "Suivez-nous",
      copyright: "© 2024 My Diabeto. Tous droits réservés.",
      french: "Français",
      english: "English",
    }
  };
  
  // Get translations based on current language
  const t = translations[language];

  // Load the saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      console.log('Loaded saved language preference:', savedLanguage);
    }
  }, []);

  // Update document title and save language preference
  useEffect(() => {
    console.log('Language changed to:', language);
    localStorage.setItem('preferredLanguage', language);
    document.title = language === 'fr' ? 'Blog My Diabeto' : 'My Diabeto Blog';
  }, [language]);

  // Function to toggle language
  const toggleLanguage = () => {
    console.log('Toggling language from', language);
    setLanguage(prevLang => prevLang === 'fr' ? 'en' : 'fr');
  };
  
  // Effect to handle URL query parameters
  useEffect(() => {
    const categoryParam = searchParams?.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams, categories]);
  
  // Filter posts based on category and search query
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle category change with URL update
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Update URL without page reload
    const params = new URLSearchParams();
    if (category !== 'All') {
      params.set('category', category);
    }
    
    const newUrl = `/blog${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
            My Diabeto
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="nav-link text-sm font-semibold leading-6">{t.home}</Link>
            <Link href="/#features" className="nav-link text-sm font-semibold leading-6">{t.features}</Link>
            <Link href="/blog" className="nav-link text-sm font-semibold leading-6 text-primary">{t.blog}</Link>
            <Link href="/#contact" className="nav-link text-sm font-semibold leading-6">{t.contact}</Link>
          </nav>
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            data-current-lang={language}
            className={`lang-switcher flex items-center gap-2 bg-white dark:bg-gray-800 border-2 ${language === 'fr' ? 'border-blue-500' : 'border-red-500'} rounded-full px-3 py-2 shadow-md hover:shadow-lg transition-all transform active:scale-95 mr-2`}
          >
            <span className="text-sm font-medium">
              {language === 'fr' ? translations.fr.english : translations.en.french}
            </span>
            <div className={`lang-icon w-5 h-5 rounded-full overflow-hidden border ${language === 'fr' ? 'border-blue-500' : 'border-red-500'}`}>
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
          
          <Link href="https://apps.apple.com/fr/app/my-diabeto/id6737922193?ign-itscg=30200&ign-itsct=apps_box_link&mttnsubad=6737922193&platform=iphone" target="_blank" rel="noopener noreferrer" className="btn-primary nav-btn text-sm">
            {t.downloadApp}
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16 px-4 hero-section">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.blogTitle}</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            {t.blogSubtitle}
          </p>
          
          {/* Search Bar with Enhanced Visibility */}
          <div className="relative max-w-xl mx-auto transform hover:scale-105 transition-transform duration-300">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 rounded-full text-gray-800 focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg border-2 border-blue-200 newsletter-input"
            />
            <div className="absolute top-0 right-0 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Tabs - Enhanced */}
      <div className="bg-white dark:bg-gray-800 shadow-md py-6 px-4 sticky top-[72px] z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">{t.filterByCategory}</h2>
          <div className="flex gap-2 overflow-x-auto flex-nowrap justify-start md:justify-center pb-2 category-tabs-container">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`category-tab px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm flex-shrink-0 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white transform scale-110 shadow-md active'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {activeCategory === 'All' ? t.allArticles : `${activeCategory} ${t.articles}`}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.showing} {filteredPosts.length} {filteredPosts.length === 1 ? t.article : t.articles}
          </p>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">{t.noArticlesFound}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t.tryAdjusting}
            </p>
            <button 
              onClick={() => { 
                setSearchQuery(''); 
                handleCategoryChange('All');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>
      
      {/* Newsletter Signup */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.subscribeNewsletter}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.newsletterDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 border focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button className="btn-primary py-3 px-6 rounded-lg">
              {t.subscribe}
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">My Diabeto</h3>
              <p className="mb-4">Your all-in-one diabetes management app.</p>
              <p>support@diabetoapp.com</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.quickLinks}</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white transition-colors">{t.home}</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">{t.blog}</Link></li>
                <li><Link href="/#features" className="hover:text-white transition-colors">{t.features}</Link></li>
                <li><Link href="https://apps.apple.com/fr/app/my-diabeto/id6737922193?ign-itscg=30200&ign-itsct=apps_box_link&mttnsubad=6737922193&platform=iphone" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t.downloadApp}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.categories}</h4>
              <ul className="space-y-2">
                {categories.filter(cat => cat !== 'All').map(category => (
                  <li key={category}>
                    <button
                      onClick={() => {
                        handleCategoryChange(category);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.followUs}</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main page component with Suspense boundary
export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Blog...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
} 