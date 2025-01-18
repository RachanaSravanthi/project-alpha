import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import VimeoEmbed from "./VEM";

interface ModalProps {
  project: {
    id: number;
    title: string;
    category: string;
    subtitle: string;
    link: string;
    images: string[];
    iframeLink: string;
    description: string;
    tools: string;
  };
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Modal({
  project,
  onClose,
  onPrevious,
  onNext,
}: ModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent) {
      modalContent.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        modalContent.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 70, stiffness: 500 }}
        className="absolute inset-0 flex flex-col bg-black"
      >
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

        <div
          id="modal-content"
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0)",
            touchAction: "pan-y pinch-zoom",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                {project.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400">
                {project.subtitle}
              </p>
            </div>

            <div className="mb-12">
              {project.iframeLink.includes("appwrite") ? (
                <img
                  src={project.iframeLink}
                  alt="Project visual"
                  className="w-full h-full object-cover"
                />
              ) : (
               
                <VimeoEmbed link={project.iframeLink} />
              )}

              {/* Split the description into paragraphs */}
              {project.description
                .split("\n") // Split by newline to create multiple paragraphs
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-white text-lg leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* <div className="mb-12">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Project Gallery</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {project.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                                        onClick={() => setActiveImage(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`Project image ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div> */}

            {activeImage !== 0 && (
              <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center">
                <button
                  onClick={() => setActiveImage(0)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
                >
                  <X size={32} />
                </button>
                <img
                  src={project.images[activeImage - 1]}
                  alt={`Full size project image ${activeImage}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            {/* <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">Tools Used</h2>
                            <p className="text-white text-lg">{project.tools}</p>
                        </div> */}

            {project.link && (
              <div className="mt-8">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Visit Project
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
