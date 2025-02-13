import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import Lenis from "@studio-freight/lenis";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
// import Footer from "./Components/Footer";
import Footer2 from "./Components/Footer2";
import ScrollToTopButton from "./Components/ScrollButton";

interface Project {
    id: string;
    title: string;
    category: string;
    subtitle: string;
    link: string;
    images: string[];
    iframeLink: string;
    description: string;
    tools: string;
}

interface AppContext {
    isLoaded: boolean;
    scrollTo: (id: string) => void;
    projectData: Project[];
    fadeIn: object;
    staggerChildren: object;
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [projectData, setProjectData] = useState<Project[]>([]); // Typed project data
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(query(collection(db, "projects"), orderBy("index"))); 
                const projects = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Project[];
                setProjectData(projects);
                setIsLoaded(true);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();

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
            
            if(element.id==="work")
            {
                const isMobile = window.innerWidth <= 768; // Check if it's a mobile screen
                const offset = isMobile ? 200 : 200; // Adjusted offset for mobile screens
          
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset; // Use window.scrollY instead of pageYOffset
          
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                });

            }
            else{

                lenisRef.current?.scrollTo(element, { immediate: false });
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter pt-20 lg:pt-16">
            <Header isLoaded={isLoaded} scrollTo={scrollTo} />
            <Outlet
                context={
                    {
                        isLoaded,
                        scrollTo,
                        projectData,
                        fadeIn,
                        staggerChildren,
                    } as AppContext
                } // Provide context type
            />
            <Footer2 isLoaded={isLoaded} />
                 <ScrollToTopButton/>
        </div>
    );
};

export default App;
