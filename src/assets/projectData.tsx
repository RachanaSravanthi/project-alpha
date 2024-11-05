interface Project {
    id: number;
    title: string;
    category: string;
    subtitle: string;
    link: string;
    images: string[];
    iframeLink: string;
    description: string;
    tools: string;
}

export const projectData: Project[] = [
    {
        id: 1,
        title: "VFX Film Showreel",
        category: "2D Design",
        subtitle: "Test",
        link: "link",
        images: [
            "https://drive.google.com/file/d/13WoPHOqUTzvT0ngaZ5-A50LXsPprcfsh/preview",
            "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg",
        ],
        iframeLink: "https://player.vimeo.com/video/1026338508?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
        description:
            "This show reel showcases selected CG lighting work from Hollywood feature films and television series, including Shazam! Fury of the Gods, The Gilded Age and the lost city. Featured scenes highlight my contributions in setting up complex 3D environments and meticulously crafting the lighting to achieve visual continuity across sequences.  Each scene was rendered with precision to ensure seamless integration with surrounding shots, maintaining consistency and enhancing the storytelling impact.  This reel reflects a refined approach to 3D lighting and scene setup, emphasizing quality and cohesion in every frame. Additionally, My responsibilities included compositing the shots to ensure visual coherence and quality before passing them on for final compositing and color grading.",
        tools: "Clarisse, Maya, Houdini, Nuke",
    },
    {
        id: 2,
        title: "Destruction Project",
        category: "2D Design",
        subtitle: "Test",
        link: "link",
        images: [
            "https://drive.google.com/file/d/13WoPHOqUTzvT0ngaZ5-A50LXsPprcfsh/preview",
            "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg",
        ],
        iframeLink: "https://player.vimeo.com/video/1026347547?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
        description:
            "For this destruction VFX project, high-resolution 4K footage was captured using a Blackmagic camera in handheld style. The footage was then tracked in PFTrack, and exported to Maya where the set was accurately reconstructed with precise measurements, which was then exported to Houdini for advanced rigid body dynamics and fluid simulations. Material fracturing was conducted along with detailed debris and smoke simulations to heighten the destruction effect. Scene relighting, along with detailed texturing, was carried out before rendering. Finally, the shot was composited in Nuke, seamlessly integrating all elements for a refined and impactful visual effect.",
        tools: "",
    },
    {
        id: 3,
        title: "Digital Matte Painting",
        category: "2D Design",
        subtitle: "Test",
        link: "link",
        images: [
            "https://drive.google.com/file/d/13WoPHOqUTzvT0ngaZ5-A50LXsPprcfsh/preview",
            "https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg",
        ],
        iframeLink: "https://player.vimeo.com/video/1026352387?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
        description:
            "For this matte painting project, footage of an actor filmed on a green screen with a Blackmagic camera was carefully keyed to ensure clean edges. High-resolution background images were then selected and imported into Nuke. Using a 3D camera setup, a scene was created with images projected along the Z-axis onto various planes, establishing depth and perspective. To further enhance the scene, specific foreground elements like a side chain and bench were modeled in Maya and exported as 2D layers. All elements were composited in Nuke, where they were integrated to achieve a polished, seamless final output.",
        tools: "",
    },
];
