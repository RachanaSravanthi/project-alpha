
// Modal page opens when click on work 
import { motion } from "framer-motion"; // Import motion components for animations
import { X, ChevronLeft, ChevronRight } from "lucide-react"; // Import icons for close and navigation buttons
import { useEffect, useCallback, useState } from "react"; // Import hooks for component logic
import VimeoEmbed from "./VEM"; // Import a custom VimeoEmbed component to render Vimeo videos

// Interface for project props passed to the modal
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
    thumbnail: string;
  };
  onClose: () => void; // Function to close the modal
  onPrevious: () => void; // Function to navigate to previous project
  onNext: () => void; // Function to navigate to next project
}

export default function Modal({
  project,
  onClose,
  onPrevious,
  onNext,
}: ModalProps) {
  const [activeImage, setActiveImage] = useState(0); // State to manage the active image for fullscreen view

  // Disable body scroll when the modal is open and restore when closed
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; // Prevent body scrolling
    return () => {
      document.body.style.overflow = originalStyle; // Restore original scroll behavior on modal close
    };
  }, []);

  // Prevent wheel scrolling inside the modal content
  const handleWheel = useCallback((e: WheelEvent) => {
    e.stopPropagation(); // Stop the event from propagating, which would cause scrolling
  }, []);

  // Add and remove the wheel event listener for modal content
  useEffect(() => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent) {
      modalContent.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        modalContent.removeEventListener("wheel", handleWheel); // Clean up the event listener on modal close
      };
    }
  }, [handleWheel]);

  return (
    <div className="fixed inset-0 z-50 bg-black"> {/* Fullscreen overlay for modal */}
      {/* Modal background with a semi-transparent black overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal main container with sliding animation */}
      <motion.div
        initial={{ y: "100%" }} // Start below the screen
        animate={{ y: 0 }} // Slide into view
        exit={{ y: "100%" }} // Slide out when closing
        transition={{ type: "spring", damping: 70, stiffness: 500 }} // Smooth spring transition
        className="absolute inset-0 flex flex-col bg-black"
      >
        {/* Top section of the modal with navigation and close buttons */}
        <div className="flex justify-between items-center p-4 bg-black/90 backdrop-blur-sm border-b border-white/10">
          <div className="flex space-x-2">
            {/* Previous and Next buttons for navigating through projects */}
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
          {/* Close button to close the modal */}
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 p-2"
          >
            <X size={32} />
          </button>
        </div>

        {/* Modal content area */}
        <div
          id="modal-content" // ID used for adding event listeners
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{
            WebkitOverflowScrolling: "touch", // Enable smooth scrolling on touch devices
            scrollbarWidth: "thin", // Thin scrollbar for better aesthetics
            scrollbarColor: "rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0)", // Custom scrollbar colors
            touchAction: "pan-y pinch-zoom", // Allow scrolling and pinch zoom
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Title and subtitle section */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                {project.title} {/* Project title */}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400">
                {project.subtitle} {/* Project subtitle */}
              </p>
            </div>

            {/* Project display section (iframe or image) */}
            <div className="mb-12">
              {/* Check if the iframe link is from appwrite, and display image or video accordingly */}
              {project.iframeLink.includes("appwrite") ? (
                <img
                  src={project.iframeLink} // Display image
                  alt="Project visual"
                  className="w-full h-full object-cover"
                />
              ) : (
                <VimeoEmbed link={project.iframeLink} /> // Display Vimeo embed video
              )}

              {/* Display project description */}
              {project.description
                .split("\n") // Split description into paragraphs by newline character
                .map((paragraph, index) => (
                  <p
                    key={index} // Key for each paragraph
                    className="text-white text-lg leading-relaxed mb-4"
                  >
                    {paragraph} {/* Render each paragraph */}
                  </p>
                ))}
            </div>

            {/* Fullscreen image viewer */}
            {activeImage !== 0 && (
              <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center">
                {/* Close fullscreen image viewer */}
                <button
                  onClick={() => setActiveImage(0)} // Reset active image when closing
                  className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
                >
                  <X size={32} />
                </button>
                {/* Display the full-size image */}
                <img
                  src={project.images[activeImage - 1]} // Get the image from the active index
                  alt={`Full size project image ${activeImage}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            {/* Link to visit the project */}
            {project.link && (
              <div className="mt-8">
                <a
                  href={project.link} // External project link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Visit Project {/* Call-to-action button */}
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
