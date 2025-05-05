"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function DownloadBanner() {
  return (
    <div className="my-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl overflow-hidden shadow-xl">
      <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-2/3 text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            Take Control of Your Diabetes with My Diabeto App
          </h3>
          <p className="mb-5 text-blue-50">
            My Diabeto calculates your blood sugar level in real time based on your activity. Enter your initial reading and the app continuously updates your levels - helping you avoid constant injections.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="https://apps.apple.com/fr/app/my-diabeto/id6737922193?ign-itscg=30200&ign-itsct=apps_box_link&mttnsubad=6737922193&platform=iphone" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full inline-flex items-center transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download App
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-full inline-flex items-center transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <div className="relative w-[120px] h-[200px] md:w-[150px] md:h-[250px] animate-float">
            <Image
              src="/diaweblogo.jpg"
              alt="My Diabeto App"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 