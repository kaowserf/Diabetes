"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '../../data/blogPosts';
import ShareButtons from '../../components/ShareButtons';
import DownloadBanner from '../../components/DownloadBanner';
import { formatDate } from '../../utils/formatDate';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      const fetchedPost = getPostBySlug(slug);
      setPost(fetchedPost);
      
      // Get related posts (same category)
      if (fetchedPost) {
        const allPosts = getAllPosts();
        const related = allPosts
          .filter(p => p.category === fetchedPost.category && p.slug !== fetchedPost.slug)
          .slice(0, 3);
        setRelatedPosts(related);
      }
      
      setIsLoading(false);
    }
  }, [slug]);
  
  // Scroll to top when the post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">The blog post you're looking for doesn't exist or has been moved.</p>
        <Link href="/blog" className="btn-primary py-2 px-6 rounded-full">
          Return to Blog
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
            Diabeto
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="nav-link text-sm font-semibold leading-6">Home</Link>
            <Link href="/#features" className="nav-link text-sm font-semibold leading-6">Features</Link>
            <Link href="/blog" className="nav-link text-sm font-semibold leading-6 text-primary">Blog</Link>
            <Link href="/#contact" className="nav-link text-sm font-semibold leading-6">Contact</Link>
          </nav>
          
          <Link href="/#download" className="btn-primary nav-btn text-sm">
            Download App
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6 text-gray-500 dark:text-gray-400">
          <ol className="flex flex-wrap">
            <li className="flex items-center">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-64 sm:h-96">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.date)} • {post.readTime} min read
                  </p>
                </div>
              </div>
              
              {/* Insert Download Banner after first paragraph */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(
                    /<\/p>/, 
                    '</p><div class="my-8"><div id="download-banner-placeholder"></div></div>'
                  )
                }}
              />
              
              {/* Add the actual banner after rendering */}
              <script dangerouslySetInnerHTML={{
                __html: `
                  document.addEventListener('DOMContentLoaded', () => {
                    const placeholder = document.getElementById('download-banner-placeholder');
                    if (placeholder) {
                      placeholder.innerHTML = document.getElementById('download-banner-component').innerHTML;
                    }
                  });
                `
              }} />
              
              {/* Hidden banner component */}
              <div id="download-banner-component" style={{ display: 'none' }}>
                <DownloadBanner />
              </div>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Share Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
            </div>
            
            {/* Author Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-lg">{post.author}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Expert contributor to Diabeto Blog
                  </p>
                </div>
              </div>
            </div>
            
            {/* Download App */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md text-white p-6">
              <h3 className="text-lg font-semibold mb-3">
                Download Diabeto App
              </h3>
              <p className="mb-4 text-blue-100">
                Take control of your diabetes with our comprehensive management app.
              </p>
              <Link 
                href="/#download" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-all w-full justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Now
              </Link>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block">
                      <div className="flex items-start space-x-3 group">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={relatedPost.coverImage}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {relatedPost.readTime} min read
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Diabeto</h3>
              <p className="mb-4">Your all-in-one diabetes management app.</p>
              <p>support@diabetoapp.com</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#download" className="hover:text-white transition-colors">Download</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
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
            <p>© 2024 Diabeto. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 