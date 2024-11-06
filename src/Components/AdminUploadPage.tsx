import { useState, ChangeEvent, FormEvent } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

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

export default function AdminUploadPage() {
  const [project, setProject] = useState<Omit<Project, "id" | "images">>({
    title: "",
    category: "",
    subtitle: "",
    link: "",
    iframeLink: "",
    description: "",
    tools: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage(null);

    try {
      // Upload images
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const imageRef = ref(
            storage,
            `project-images/${Date.now()}-${image.name}`
          );
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        })
      );

      // Add project to Firestore
      const projectsRef = collection(db, "projects");
      await addDoc(projectsRef, {
        ...project,
        images: imageUrls,
        id: Date.now(), // Using timestamp as a simple id
      });

      setMessage({ type: "success", text: "Project uploaded successfully" });

      // Reset form
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upload New Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                <option value="Motion Design">Motion Design</option>
                <option value="Graphics Design">Graphics Design</option>
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
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700"
              >
                Project Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={project.link}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="iframeLink"
                className="block text-sm font-medium text-gray-700"
              >
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
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="tools"
                className="block text-sm font-medium text-gray-700"
              >
                Tools
              </label>
              <input
                type="text"
                id="tools"
                name="tools"
                value={project.tools}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
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
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Project"}
            </button>
          </form>
        </div>
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
    </div>
  );
}
