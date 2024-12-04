// apiRoutes.ts
const BASE_URL = 'http://127.0.0.1:8000/api';

const API_ROUTES = {
  GET_BUSES: `${BASE_URL}/buses/`,  // Fetch all buses
  ADD_BUS: `${BASE_URL}/buses/`,   // Add a new bus
  GET_BUS: (id: string) => `${BASE_URL}/buses/${id}/`,  // Get a specific bus by ID
  UPDATE_BUS: (id: string) => `${BASE_URL}/buses/${id}/`, // Update a specific bus
  DELETE_BUS: (id: string) => `${BASE_URL}/buses/${id}/`, // Delete a specific bus
};

export default API_ROUTES;
