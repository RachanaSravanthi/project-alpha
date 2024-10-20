
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { Outlet } from "react-router-dom"

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchInertiaMultiplier: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    setIsLoaded(true);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };


  const projectData = [
    { title: "Project 1", category: "VFX for film", subtitle: "VFX", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 2", category: "Motion Design", subtitle: "2D Design", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 3", category: "Motion Design", subtitle: "3D Design", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 4", category: "VFX for film", subtitle: "Film", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 5", category: "Graphics Design", subtitle: "Animation", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 6", category: "Graphics Design", subtitle: "Concept Art", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 6", category: "Graphics Design", subtitle: "Concept Art", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 7", category: "Graphics Design", subtitle: "Motion Graphics", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 8", category: "Motion Design", subtitle: "Visual Effects", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 9", category: "VFX for film", subtitle: "Digital Art", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 9", category: "VFX for film", subtitle: "Digital Art", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
    { title: "Project 9", category: "VFX for film", subtitle: "Digital Art", images: ["https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg", "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"], description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio necessitatibus aspernatur laboriosam? Iste commodi explicabo repellat quaerat laborum? Dignissimos odit velit totam excepturi unde quibusdam eligendi vero ad aliquid blanditiis." },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      lenisRef.current?.scrollTo(element, { immediate: false });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
      <Header isLoaded={isLoaded} scrollTo={scrollTo} />
      <Outlet context={{
        isLoaded,
        scrollTo,
        projectData,
        fadeIn,
        staggerChildren
      }} />
      <Footer isLoaded={isLoaded} />
    </div>
  );
};

export default App;
