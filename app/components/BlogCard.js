"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../utils/formatDate";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative w-full h-48">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
        />
        {post.category && (
          <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {formatDate(post.date)}
          </span>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="mt-auto pt-4">
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 