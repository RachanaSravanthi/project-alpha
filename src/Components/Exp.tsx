import { useEffect, useRef, useState } from "react";

const Exp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const timelineRef = useRef(null);

    const experiences = [
        {
            period: "Nov 2023 - Present",
            company: "Adfuel Media",
            role: "Multimedia Designer",
        },
        {
            period: "Aug 2022 - Sept 2023",
            company: "DNEG",
            role: "Lighting Technical Director",
        },
        {
            period: "Jan 2021 - July 2021",
            company: "Elite Crest Technologies",
            role: "Graphic Designer",
        },
        {
            period: "Aug 2020 - Dec 2020",
            company: "Shunya",
            role: "Motion graphic Designer",
        },
        {
            period: "July 2017 - Aug 2020",
            company: "Freelance",
            role: "Graphic Designer",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }

        return () => {
            if (timelineRef.current) {
                observer.unobserve(timelineRef.current);
            }
        };
    }, []);
    return (
        <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg" ref={timelineRef}>
            <div className="relative">
                {/* Animated vertical line */}
                <div
                    className={`absolute left-[15px] top-[24px] w-[2px] bg-orange-500 transition-all duration-1000 ease-out ${
                        isVisible ? "h-full" : "h-0"
                    }`}
                />

                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="flex gap-4 mb-8 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                        style={{
                            animationDelay: `${index * 200}ms`,
                            animationFillMode: "forwards",
                            animation: isVisible ? "fadeInUp 0.5s ease-out forwards" : "none",
                        }}
                    >
                   
                        <div className="relative w-8 h-8 shrink-0">
                            <div className="absolute top-[14px] left-[14px] w-4 h-4 rounded-full bg-orange-500" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-2">
                            <h3 className="font-bold text-lg text-orange-500">{exp.company}</h3>
                            <p className="text-gray-700 font-medium">{exp.role}</p>
                            <p className="text-sm text-gray-500 mt-1">{exp.period}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Exp;
