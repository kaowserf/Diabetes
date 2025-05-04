'use client';

// This function initializes scroll animations 
export function initScrollAnimations() {
  if (typeof window !== 'undefined') {
    // Options for the Intersection Observer
    const options = {
      root: null, // viewport is root
      rootMargin: '0px',
      threshold: 0.1 // trigger when 10% of the element is visible
    };

    // Create observer instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If element is in view, add the visible class to trigger animation
          entry.target.classList.add('scroll-visible');
          
          // Once animation is triggered, we can stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all elements with animation classes
    setTimeout(() => {
      const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-scale-in, .scroll-slide-left, .scroll-slide-right'
      );
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    }, 100); // Small delay to ensure DOM is fully loaded

    // Apply parallax effect to elements with the parallax class
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// This function adds a scroll progress indicator
export function addScrollProgress() {
  if (typeof window !== 'undefined') {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
} 