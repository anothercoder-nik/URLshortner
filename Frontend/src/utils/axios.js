import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    timeout:10000, //10s
    withCredentials:true
})

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx
        return response;
    },
    (error) => {
        // Handle different types of errors
        if (error.response) {
            // The server responded with a status code outside the 2xx range
            const { status, data } = error.response;
            
            switch (status) {
                case 400:
                    console.error("Bad Request:", data);
                    break;
                case 401:
                    console.error("Unauthorized:", data);
                    // You could redirect to login page or refresh token here
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
            // The request was made but no response was received
            console.error("Network Error: No response received", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Error:", error.message);
        }

        // You can customize the error object before rejecting
        return Promise.reject({
            // isAxiosError: true,
            message: error.response?.data?.message || error.message || "Unknown error occurred",
            status: error.response?.status,
            data: error.response?.data,
            // originalError: error
        });
    }
);
export default axiosInstance