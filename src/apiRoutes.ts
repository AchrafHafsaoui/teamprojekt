// apiRoutes.ts
const BASE_URL = 'http://127.0.0.1:8000/api';

const API_ROUTES = {
  GET_BUSES: `${BASE_URL}/buses/`,  // Fetch all buses
  ADD_BUS: `${BASE_URL}/buses/`,   // Add a new bus
  GET_BUS: (id: string) => `${BASE_URL}/buses/${id}/`,  // Get a specific bus by ID
  UPDATE_BUS: (id: string) => `${BASE_URL}/buses/${id}/`, // Update a specific bus
  DELETE_BUS: (id: string) => `${BASE_URL}/buses/${id}/`, // Delete a specific bus
  
  GET_STATIONS: `${BASE_URL}/stations/`,  // Fetch all charging stations
  ADD_STATION: `${BASE_URL}/stations/`,   // Add a new charging station
  GET_STATION: (id: string) => `${BASE_URL}/stations/${id}/`,  // Get a specific charging station by ID
  UPDATE_STATION: (id: string) => `${BASE_URL}/stations/${id}/`, // Update a specific charging station
  DELETE_STATION: (id: string) => `${BASE_URL}/stations/${id}/`, // Delete a specific charging station

  GET_DRIVING_SCHEDULES: `${BASE_URL}/driving-schedule/`,  // Fetch all charging stations
  ADD_DRIVING_SCHEDULE: `${BASE_URL}/driving-schedule/`,   // Add a new charging station
  GET_DRIVING_SCHEDULE: (id: string) => `${BASE_URL}/driving-schedule/${id}/`,  // Get a specific charging station by ID
  UPDATE_DRIVNG_SCHEDULE: (id: string) => `${BASE_URL}/driving-schedule/${id}/`, // Update a specific charging station
  DELETE_DRIVING_SCHEDULE: (id: string) => `${BASE_URL}/driving-schedule/${id}/`, // Delete a specific charging station

  //login url
  LOGIN: `${BASE_URL}/users/login/`,
  IS_AUTH: `${BASE_URL}/users/is_auth/`,
  REFRESH_TOKEN: `${BASE_URL}/users/access_token/refresh/`
};

export default API_ROUTES;