import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://clipli.sbs",
    timeout: 10000,
    withCredentials: true
})


// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error("Bad Request:", data);
                    break;
                case 401:
                    console.error("Unauthorized:", data);
                    break;
                case 403:
                    console.error("Forbidden:", data);
                    break;
                case 404:
                    console.error("Not Found:", data);
                    break;
                case 500:
                    console.error("Server Error:", data);
                    break;
                default:
                    console.error(`Error (${status}):`, data);
            }
        } else if (error.request) {
            console.error("Network Error: No response received", error.request);
        } else {
            console.error("Axios Config Error:", error.message);
        }

        return Promise.reject({
            message: error.response?.data?.message || error.message || "Unknown error occurred",
            status: error.response?.status || null,
            data: error.response?.data || null,
        });
    }
);

export default axiosInstance;
