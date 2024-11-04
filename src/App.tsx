import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { Outlet } from "react-router-dom";
import { projectData } from "./assets/projectData";

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

   
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            lenisRef.current?.scrollTo(element, { immediate: false });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
            <Header isLoaded={isLoaded} scrollTo={scrollTo} />
            <Outlet
                context={{
                    isLoaded,
                    scrollTo,
                    projectData,
                    fadeIn,
                    staggerChildren,
                }}
            />
            <Footer isLoaded={isLoaded} />
        </div>
    );
};

export default App;
