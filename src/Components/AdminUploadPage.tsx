import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import imageCompression from 'browser-image-compression';
// Initialize Firebase (replace with your config)
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

interface Project {
    id: string;
    title: string;
    category: string;
    subtitle: string;
    link: string;
    images: string[]; // Array to store Base64 strings
    iframeLink: string;
    description: string;
    tools: string;
}
export default function AdminDashboard() {
    const [project, setProject] = useState<Omit<Project, "id" | "images">>({
        title: "",
        category: "",
        subtitle: "",
        link: "",
        iframeLink: "",
        description: "",
        tools: "",
    });
    const [images, setImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeTab, setActiveTab] = useState<"upload" | "view">("upload");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const projectsRef = collection(db, "projects");
            const snapshot = await getDocs(projectsRef);
            const fetchedProjects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
            setProjects(fetchedProjects);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setMessage({ type: "error", text: "Error fetching projects. Please try again." });
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };



const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    if (e.target.files) {
        const filesArray = Array.from(e.target.files);

        const uploadPromises = filesArray.map(async (file) => {
            try {
                // Compress the image
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 2, // Larger size for better quality
                    maxWidthOrHeight: 1920, // Higher resolution for high-quality thumbnails
                    initialQuality: 0.8, // Adjust this to control quality
                    useWebWorker: true, // Improve performance
                });

                // Prepare FormData
                const formData = new FormData();
                formData.append('image', compressedFile);

                // Upload the compressed image
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Failed to upload image: ${response.statusText}`);
                }

                const data = await response.json();
                return data.data.display_url;
            } catch (error) {
                console.error('Error compressing or uploading image:', error);
                throw error;
            }
        });

        try {
            const imageUrls = await Promise.all(uploadPromises);
            setImages(imageUrls);
        } catch (error) {
            console.error('Error handling image uploads:', error);
        } finally {
            setIsUploading(false);
        }
    }
};

    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        setMessage(null);

        try {
            const projectsRef = collection(db, "projects");
            await addDoc(projectsRef, {
                ...project,
                images: images,
                // id: Date.now(),
            });

            setMessage({ type: "success", text: "Project uploaded successfully" });
            setProject({
                title: "",
                category: "",
                subtitle: "",
                link: "",
                iframeLink: "",
                description: "",
                tools: "",
            });
            setImages([]);
            fetchProjects();
        } catch (error) {
            console.error("Error uploading project:", error);
            setMessage({
                type: "error",
                text: "Error uploading project. Please try again.",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "projects", id));
            setMessage({ type: "success", text: "Project deleted successfully" });
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
            setMessage({ type: "error", text: "Error deleting project. Please try again." });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="mb-4">
                <button
                    onClick={() => setActiveTab("upload")}
                    className={`mr-2 px-4 py-2 rounded ${
                        activeTab === "upload" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                >
                    Upload Project
                </button>
                <button
                    onClick={() => setActiveTab("view")}
                    className={`px-4 py-2 rounded ${
                        activeTab === "view" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                >
                    View Projects
                </button>
            </div>
            {activeTab === "upload" && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Upload New Project</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={project.title}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={project.category}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select Category</option>
                                <option value="Motion Design">Motion Design</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="VFX for film">VFX for film</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                id="subtitle"
                                name="subtitle"
                                value={project.subtitle}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                                Project Link
                            </label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={project.link}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="iframeLink" className="block text-sm font-medium text-gray-700">
                                Iframe Link
                            </label>
                            <input
                                type="text"
                                id="iframeLink"
                                name="iframeLink"
                                value={project.iframeLink}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={project.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="tools" className="block text-sm font-medium text-gray-700">
                                Tools
                            </label>
                            <input
                                type="text"
                                id="tools"
                                name="tools"
                                value={project.tools}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                Images
                            </label>
                            <input
                                type="file"
                                id="images"
                                onChange={handleImageChange}
                                multiple
                                accept="image/*"
                                className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                            />
                            {
                                isUploading&&<h1>uploading</h1>
                            }
                        </div>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                isUploading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {isUploading ? "Uploading..." : "Upload Project"}
                        </button>
                    </form>
                </div>
            )}
            {activeTab === "view" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-2">Category: {project.category}</p>
                            <p className="text-gray-600 mb-4">Subtitle: {project.subtitle}</p>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {message && (
                <div
                    className={`mt-4 p-4 rounded-md ${
                        message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                    }`}
                >
                    {message.text}
                </div>
            )}
        </div>
    );
}
