import React, { useRef } from 'react';

interface VimeoEmbedProps {
  iframeLink: string;
  className?: string;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({ iframeLink, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMouseEnter = () => {
    // Start autoplay on hover by updating the src attribute with autoplay=1
    if (iframeRef.current) {
      iframeRef.current.src = `${iframeLink}?controls=0&title=0&byline=0&portrait=0&autoplay=1`;
    }
  };

  const handleMouseLeave = () => {
    // Remove autoplay on mouse leave to stop playback
    if (iframeRef.current) {
      iframeRef.current.src = `${iframeLink}?controls=0&title=0&byline=0&portrait=0`;
    }
  };

  return (
    <iframe
      ref={iframeRef}
      src={`${iframeLink}?controls=0&title=0&byline=0&portrait=0`}
      className={`w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110 ${className}`}
      allow="autoplay; fullscreen"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default VimeoEmbed;
