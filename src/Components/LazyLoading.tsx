import React, { useEffect, useRef } from 'react';

interface VimeoEmbedProps {
  src: string;
  width: string;
  height: string;
  className?: string;
  [propName: string]: any;
}

const LazyLoadVimeoEmbed: React.FC<VimeoEmbedProps> = ({
  src,
  width,
  height,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = document.createElement('iframe');

            // Set the iframe source with necessary parameters to hide all UI elements
            iframe.src = `${src}?background=1&muted=1`;
            iframe.width = width;
            iframe.height = height;
            iframe.className = className || '';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'true');

            containerRef.current!.appendChild(iframe);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [src, width, height, className]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        // Start autoplay on hover by updating the src attribute
        const iframe = containerRef.current?.querySelector('iframe');
        if (iframe) {
          iframe.src = `${src}?background=1&muted=1&autoplay=1`;
        }
      }}
      onMouseLeave={() => {
        // Stop autoplay on hover out by resetting the src attribute
        const iframe = containerRef.current?.querySelector('iframe');
        if (iframe) {
          iframe.src = `${src}?background=1&muted=1`;
        }
      }}
      {...props}
    />
  );
};

export default LazyLoadVimeoEmbed;
