import axios, { AxiosInstance, AxiosResponse } from 'axios';
import API_ROUTES from '../../src/apiRoutes'; // Import routes

// Define types for tokens
interface Tokens {
  access: string;
}

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Base URL is already in API_ROUTES
  withCredentials: true, 
});

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string> => {
  try {
    const response: AxiosResponse<Tokens> = await axios.post(API_ROUTES.REFRESH_TOKEN, null , { withCredentials: true });

    const { access } = response.data;

    console.log("123"+access)

    return access;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

// Request Interceptor: Attach access token in the body
apiClient.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem('access token');
    if (access && config.headers) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // Pass successful responses through
  async (error) => {
    const originalRequest = error.config;

    // If access token expired and request is not already retried
    if (((error.response?.status === 400 && error.response?.data.error === "Token is invalid or expired") ||(error.response?.status === 403 && error.response?.data.error === "Access token has expired") || (error.response?.status === 400 && error.response?.data.detail === "Access token and role are required")) && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried
      try {
        const access = await refreshAccessToken(); // Refresh token
        console.log(access)

            // Update tokens in storage
        localStorage.setItem('access token', access);

        if (originalRequest.headers) {
          console.log("header func")
          originalRequest.headers.Authorization = `Bearer ${access}`; // Add it to the failed request
        }

        return apiClient(originalRequest); // Retry original request
      } catch (refreshError) {
        alert(refreshError)
        console.error('Redirecting to login due to refresh failure.');
        localStorage.removeItem('access token'); 
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
