
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import {Outlet} from "react-router-dom"

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
    { title: "Project 1", subtitle: "VFX" },
    { title: "Project 2", subtitle: "2D Design" },
    { title: "Project 3", subtitle: "3D Design" },
    { title: "Project 4", subtitle: "Film" },
    { title: "Project 5", subtitle: "Animation" },
    { title: "Project 6", subtitle: "Concept Art" },
    { title: "Project 7", subtitle: "Motion Graphics" },
    { title: "Project 8", subtitle: "Visual Effects" },
    { title: "Project 9", subtitle: "Digital Art" },
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
