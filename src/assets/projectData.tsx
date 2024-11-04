interface Project {
    id: number;
    title: string;
    category: string;
    subtitle: string;
    link: string;
    images: string[];
    description: string;
}

export const projectData: Project[] = [
    {
        id: 1,
        title: "VFX Film Showreel",
        category: "VFX for film",
        subtitle: "Test",
        link: "link",
        images: [
            "https://drive.google.com/file/d/13WoPHOqUTzvT0ngaZ5-A50LXsPprcfsh/preview",
            "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg",
        ],
        description:
            "This show reel showcases selected CG lighting work from Hollywood feature films and television series, including Shazam! Fury of the Gods, The Gilded Age and the lost city. Featured scenes highlight my contributions in setting up complex 3D environments and meticulously crafting the lighting to achieve visual continuity across sequences.  Each scene was rendered with precision to ensure seamless integration with surrounding shots, maintaining consistency and enhancing the storytelling impact.  This reel reflects a refined approach to 3D lighting and scene setup, emphasizing quality and cohesion in every frame. Additionally, My responsibilities included compositing the shots to ensure visual coherence and quality before passing them on for final compositing and color grading.",
    },
];
