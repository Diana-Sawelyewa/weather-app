import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const request = useCallback(async (url) => { 
        setLoading(true); 

        try {
            const response = await fetch(url); 
            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();

        setLoading(false);
        return data; 
            
        } catch(e) {
            setLoading(false);
            setError(e.message); 
        }
    }, []);

    const clearError = useCallback(() => setError(null), []); 

    return {loading, request, error, clearError}
}