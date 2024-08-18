
export const addSuffixToBackendURL = (suffix) => {
    // for now dirty solution
    
    //return import.meta.env.VITE_BACKEND_URL + suffix;
    return "http://localhost:8000/" + suffix;
}
