"use client"

import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback } from "react";

interface ModalProps {
  project: {
    title: string;
    subtitle: string;
    description: string;
    images: string[];
  };
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Modal({ project, onClose, onPrevious, onNext }: ModalProps) {
  // Prevent scroll on mount
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Handle wheel event
  const handleWheel = useCallback((e: WheelEvent) => {
    e.stopPropagation();
  }, []);

  // Add wheel event listener to modal content
  useEffect(() => {
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      modalContent.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        modalContent.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 70, stiffness: 500 }}
        className="absolute inset-0 max-h-screen flex flex-col bg-black"
      >
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-4 bg-black/90 backdrop-blur-sm border-b border-white/10">
          <div className="flex space-x-2">
            <button
              onClick={onPrevious}
              className="text-white hover:text-gray-300 p-2"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={onNext}
              className="text-white hover:text-gray-300 p-2"
            >
              <ChevronRight size={32} />
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2"
          >
            <X size={32} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div 
          id="modal-content"
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0)',
            touchAction: 'pan-y pinch-zoom'
          }}
        >
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-white mb-8">{project.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {project.images.map((image, index) => (
                <div key={index} className="aspect-video bg-gray-800 relative">
                  <img
                    src={image}
                    alt={`Project image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white opacity-75 hover:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <p className="text-white text-lg mb-12">{project.description}</p>
            <h3 className="text-2xl font-bold text-white mb-6">Top picks</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="aspect-video bg-gray-800 relative">
                  <img
                    src={`https://picsum.photos/seed/${index}/400/225`}
                    alt={`Top pick ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                    <h4 className="text-white font-bold text-lg">Title goes here</h4>
                    <p className="text-sm text-gray-300">Subtitle goes here</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}