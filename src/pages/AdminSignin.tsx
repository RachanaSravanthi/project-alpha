import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Helmet} from "react-helmet-async";

export default function AdminSignin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSigningIn(true);
        setMessage(null);

        try {
            // Attempt to sign in using Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            setMessage({ type: "success", text: "Sign in successful!" });
            navigate("/adminUploadPage");
        } catch (error) {
            // Handle specific Firebase Auth errors
            if (error instanceof Error) {
                setMessage({ type: "error", text: error.message });
            } else {
                setMessage({ type: "error", text: "Sign in failed. Please try again." });
            }
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Helmet>
              <title>Admin signin</title>
              <meta name="description" content="Admin signin to authenticate admin" />
              <meta property="og:title" content="Admin signin Page | Rachana sravanthi" />
              <meta property="og:description" content="Admin signin to authenticate admin" />
          </Helmet>
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md text-gray-900 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border rounded-md text-gray-900 focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                        >
                            {isSigningIn ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>
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
        </div>
    );
}
