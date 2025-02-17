
// authentication for admin

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }: { element: JSX.Element }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, [auth]);

    if (isAuthenticated === null) return <div>Loading...</div>; // Optional loading state

    return isAuthenticated ? element : <Navigate to="/admin" replace />;
}

export default PrivateRoute