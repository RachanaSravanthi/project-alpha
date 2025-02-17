
// Admin side page,to uplaod work


import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

import { Client, Storage, ID } from "appwrite";
import {Helmet} from "react-helmet-async";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("678bd7d60025ef83c25e");

// 678bd7d60025ef83c25e
// 678bd9bb00157c42800e

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

const storage = new Storage(client);

interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  link: string;
  images: string[]; // Array to store Base64 strings
  iframeLink: string;
  description: string;
  thumbnail: string;
  index: number;
}
export default function AdminDashboard() {
  const [project, setProject] = useState<Omit<Project, "id" | "images">>({
    title: "",
    category: "",
    subtitle: "",
    link: "",
    iframeLink: "",
    description: "",
    thumbnail: "",
    index: 0,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedThumbnail,setSelectedThumbnail]=useState<File |null>(null)
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"upload" | "view">("upload");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectsRef = collection(db, "projects");
      const snapshot = await getDocs(projectsRef);
      const fetchedProjects = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Project)
      );
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMessage({
        type: "error",
        text: "Error fetching projects. Please try again.",
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleThumbnailImageChange=(e: ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files && e.target.files[0]) {
      setSelectedThumbnail(e.target.files[0]);
    }
  }



  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log("started uploading image");

      // const fileName = `${Date.now()}_${file.name}`;

      // Create a promise to upload the file to Appwrite
      const promise = storage.createFile(
        "678bd9bb00157c42800e", // Replace with your bucket ID
        ID.unique(), // Unique ID for the file
        file // File to be uploaded
      );

      // Handle the response from the promise
      const uploadedFile = await promise;
      console.log("after", uploadedFile);

      // Use getFileDownload to get the file URL (this returns a string)

      const viewUrl = await storage.getFileView(
        "678bd9bb00157c42800e",
        uploadedFile.$id
      );
      // Return the file URL
      console.log("file", uploadedFile);
      console.log("url", viewUrl);
      return viewUrl; // Return the URL directly as it's a string
    } catch (error) {
      console.error("Error uploading image to Appwrite:", error);
      throw new Error("Error uploading image");
    }
  };

  //to get thumbnail and embedded url
  const extractURL = (url: string): string[] | null => {
    // Updated regex to correctly capture only the video ID
    const youtubeRegex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&?]+)/;
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const driveRegex = /drive\.google\.com\/file\/d\/([^/]+)/;
    let match;
    if ((match = youtubeRegex.exec(url))) {
      return [
        `https://i.ytimg.com/vi/${match[1]}/maxresdefault.jpg`,
        `https://www.youtube.com/embed/${match[1]}`,
      ];
    } else if ((match = vimeoRegex.exec(url))) {
      return [
        `https://vumbnail.com/${match[1]}.jpg`,
        `https://player.vimeo.com/video/${match[1]}`,
      ]; // Using a public service for Vimeo thumbnails
    } else if ((match = driveRegex.exec(url))) {
      const previewUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
      return [previewUrl, previewUrl];
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage(null);

    let imageUrl = "";
    let iframeUrl = "";
    let thumbnailUrl="";

    
      if (selectedImage) {
        // If image is selected, upload it and use it for both images and iframeLink
        imageUrl = await uploadImage(selectedImage);
        console.log(imageUrl);
        iframeUrl = imageUrl;
      } else if (project.link) {
        // If no image but link is provided, extract URLs
        const urls = extractURL(project.link);
        if (!urls) {
          setMessage({
            type: "error",
            text: "Invalid project link. Please provide a valid YouTube or Vimeo URL or upload an image.",
          });
          setIsUploading(false);
          return;
        }
        [imageUrl, iframeUrl] = urls;
      }

      if (selectedThumbnail) {
        // If image is selected, upload it and use it for both images and iframeLink
        thumbnailUrl = await uploadImage(selectedThumbnail);
      }

     

    try {
      const projectsRef = collection(db, "projects");
      const snapshot = await getDocs(projectsRef);
      const fetchedProjects = snapshot.docs.map((doc) => doc.data() as Project);

      // Determine the next index value
      const lastIndex =
        fetchedProjects.length > 0
          ? Math.max(...fetchedProjects.map((proj) => proj.index || 0))
          : -1; // If no projects exist, start from -1
      const nextIndex = lastIndex + 1;
      await addDoc(projectsRef, {
        ...project,
        iframeLink: iframeUrl,
        images: [imageUrl],
        index: nextIndex,
        thumbnail:thumbnailUrl,
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
        thumbnail: "",
        index: nextIndex,
      });
      setSelectedImage(null);
      setSelectedThumbnail(null)
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
      setMessage({
        type: "error",
        text: "Error deleting project. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
       <Helmet>
        SEO
              <title>AdminUpload Page</title>
              <meta name="description" content="AdminUpload page to upload works" />
              <meta property="og:title" content="AdminUpload Page | Rachana sravanthi" />
              <meta property="og:description" content="AdminUpload page to upload works" />
          </Helmet>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("upload")}
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "upload"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Upload Project
        </button>
        <button
          onClick={() => setActiveTab("view")}
          className={`px-4 py-2 rounded ${
            activeTab === "view"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
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
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
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
                <option value="Graphic Design">Graphic Design</option>
                <option value="VFX for film">VFX for film</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700"
              >
                Project Link (Optional if image is uploaded)
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
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Project Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="tools"
                className="block text-sm font-medium text-gray-700"
              >
                Coustom Thumbnail(Optional)
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleThumbnailImageChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
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
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
