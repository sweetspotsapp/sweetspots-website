import React from 'react';
import { cn } from '@/lib/utils';

interface IPhoneFrameProps {
  children?: React.ReactNode;
  className?: string;
  videoSrc?: string;
  posterSrc?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function IPhoneFrame({
  children,
  className,
  videoSrc,
  posterSrc,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  size = 'md'
}: IPhoneFrameProps) {
  const sizeClasses = {
    sm: 'w-[200px] h-[400px]',
    md: 'w-[280px] h-[600px]',
    lg: 'w-[320px] h-[1000px]'
  };

  const screenSizeClasses = {
    sm: 'rounded-[28px] p-[8px]',
    md: 'rounded-[36px] p-[10px]',
    lg: 'rounded-[42px] p-[12px]'
  };

  const innerSizeClasses = {
    sm: 'rounded-[20px]',
    md: 'rounded-[26px]',
    lg: 'rounded-[30px]'
  };

  return (
    <div className={cn("relative mx-auto", sizeClasses[size], className)}>
      {/* iPhone Frame */}
      <div className={cn(
        "relative bg-black shadow-2xl h-full",
        screenSizeClasses[size]
      )}>
        {/* Dynamic Island */}
        {/* <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div> */}
        
        {/* Screen */}
        <div className={cn(
          "relative bg-black overflow-hidden h-full",
          innerSizeClasses[size]
        )}>
          {videoSrc ? (
            <video
              className="w-full h-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              controls={controls}
              playsInline
            />
          ) : (
            <div className="w-full h-full bg-white flex items-center justify-center">
              {children || (
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">No content</p>
                </div>
              )}
            </div>
          )}
          
          {/* Screen overlay for realistic effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none"></div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute -left-1 top-16 w-1 h-8 bg-gray-800 rounded-l"></div>
        <div className="absolute -left-1 top-28 w-1 h-12 bg-gray-800 rounded-l"></div>
        <div className="absolute -left-1 top-44 w-1 h-12 bg-gray-800 rounded-l"></div>
        <div className="absolute -right-1 top-20 w-1 h-16 bg-gray-800 rounded-r"></div>
      </div>
      
      {/* Reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[36px] pointer-events-none"></div>
    </div>
  );
}

// Export a simpler version for quick use
export function IPhoneVideo({ 
  src, 
  poster, 
  className,
  size = 'md',
  ...props 
}: { 
  src: string; 
  poster?: string; 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
} & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>) {
  return (
    <IPhoneFrame
      videoSrc={src}
      posterSrc={poster}
      className={className}
      size={size}
      autoPlay={props.autoPlay}
      loop={props.loop}
      muted={props.muted}
      controls={props.controls}
    />
  );
}