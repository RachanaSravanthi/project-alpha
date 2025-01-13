import React from "react";

interface VideoEmbedProps {
    link: string;
    className?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ link, className }) => {
    // Function to determine video source
    const getVideoSource = (url: string) => {
        if (!url) return null;
        // Google Drive handling
        if (url.includes('drive.google.com')) {
            let driveId = '';
            
            // Handle preview link format
            if (url.includes('/preview')) {
                driveId = url.split('/file/d/')[1]?.split('/preview')[0];
            }
            // Handle /file/d/ format
            else if (url.includes('/file/d/')) {
                driveId = url.split('/file/d/')[1]?.split('/')[0];
            }
            // Handle id= format
            else if (url.includes('id=')) {
                driveId = url.split('id=')[1]?.split('&')[0];
            }

            if (driveId) {
                // Always use preview for Drive content
                return {
                    type: 'drive',
                    embedUrl: `https://drive.google.com/file/d/${driveId}/preview`
                };
            }
        }
        // Vimeo handling
        if (url.includes('vimeo.com')) {
            const vimeoId = url.split('/').pop()?.split('?')[0];
            return {
                type: 'vimeo',
                embedUrl: `https://player.vimeo.com/video/${vimeoId}`
            };
        }
        
        // YouTube handling
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            let youtubeId = '';
            
            // Handle youtu.be short links
            if (url.includes('youtu.be')) {
                youtubeId = url.split('/').pop()?.split('?')[0] || '';
            } 
            // Handle full YouTube URLs
            else if (url.includes('youtube.com/watch')) {
                try {
                    const urlParams = new URL(url);
                    youtubeId = urlParams.searchParams.get('v') || '';
                } catch (error) {
                    console.error('Invalid YouTube URL', error);
                    return null;
                }
            } 
            // Handle embed links
            else if (url.includes('youtube.com/embed/')) {
                youtubeId = url.split('/embed/')[1]?.split('?')[0] || '';
            }
            
            return {
                type: 'youtube',
                embedUrl: youtubeId 
                    ? `https://www.youtube.com/embed/${youtubeId}` 
                    : null
            };
        }
        
        return null;
    };

    const videoSource = getVideoSource(link);

    if (!videoSource || !videoSource.embedUrl) {
        return null; // No video to display
    }

    return (
        <iframe
            src={`${videoSource.embedUrl}?controls=1&modestbranding=1`}
            className={`object-cover transition-transform duration-300 w-full min-h-screen ${className}`}
            allow="autoplay; fullscreen; encrypted-media"
            title={`${videoSource.type} video`}
            frameBorder="0"
        />
    );
};

export default VideoEmbed;