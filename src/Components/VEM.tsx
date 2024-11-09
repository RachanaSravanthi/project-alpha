import React, { useRef } from "react";

interface VimeoEmbedProps {
    link: string;
    className?: string;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({ link, className }) => {
    // const iframeRef = useRef<HTMLIFrameElement>(null);

    // const handleMouseEnter = () => {
    //     // Start autoplay on hover by updating the src attribute with autoplay=1
    //     if (iframeRef.current) {
    //         iframeRef.current.src = `${link}?controls=1&title=0&byline=0&portrait=0&autoplay=1`;
    //     }
    // };

    // const handleMouseLeave = () => {
    //     // Remove autoplay on mouse leave to stop playback
    //     if (iframeRef.current) {
    //         iframeRef.current.src = `${link}?controls=1&title=0&byline=0&portrait=0`;
    //     }
    // };

    return (
        <iframe
            // ref={iframeRef}
            src={`${link}?controls=1&title=1&byline=1&portrait=1`}
            className={`object-cover transition-transform duration-300 w-full min-h-screen ${className}`}
            allow="autoplay; fullscreen"
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
        />
    );
};

export default VimeoEmbed;
