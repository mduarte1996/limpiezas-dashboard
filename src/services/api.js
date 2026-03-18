const API_URL = "https://limpiezas-api.onrender.com";

export const getServices = async () => {
  const response = await fetch(`${API_URL}/service-request`);
  const data = await response.json();
  return data;
};

export const updateServiceStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/service-request/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  return response.json();
};

export const deleteService = async (id) => {
  const response = await fetch(`${API_URL}/service-request/${id}`, {
    method: "DELETE"
  });

  return response.json();
}; 

export const createService = async (serviceData) => {
  const response = await fetch(`${API_URL}/service-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceData)
  });

  return response.json();
}; 

export const updateService = async (id, serviceData) => {
  const response = await fetch(`${API_URL}/service-request/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(serviceData)
  });

  return response.json();
}; 

export const loginUser = async (credentials) => {

  const response = await fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  return response.json();
};