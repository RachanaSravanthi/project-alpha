import { useEffect, useRef } from 'react';

interface LazyLoadVimeoEmbedProps {
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const LazyLoadVimeoEmbed: React.FC<LazyLoadVimeoEmbedProps> = ({
  src,
  width,
  height,
  className,
}) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const loadVimeoPlayer = async () => {
      const Vimeo = await import('@vimeo/player');
      const player = new Vimeo.default.Player(`vimeo-player-${src.split('/').pop()}`, {
        url: src,
        width: width || '100%',
        height: height || '100%',
        autoplay: false,
        controls: false,
        title: false,
        byline: false,
        portrait: false,
      });
      playerRef.current = player;
    };

    loadVimeoPlayer();

    return () => {
      playerRef.current?.destroy();
    };
  }, [src, width, height]);

  return (
    <div id={`vimeo-player-${src.split('/').pop()}`} className={className}>
      {/* Placeholder or loading indicator */}
    </div>
  );
};

export default LazyLoadVimeoEmbed;