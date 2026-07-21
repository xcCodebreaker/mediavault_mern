export async function apiRequest(path, options = {}) {
  const baseUrl = "http://localhost:5000/api";
  const token = localStorage.getItem("mediavault_token");

  let headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  headers.Content_Type_ = "application/json";

  const response = await fetch(`${baseUrl}${path}`, { ...options, headers });

  if (!response.ok) {
    try {
      const data = await response.json();
      throw new Error(data.error);
    } catch (error) {
      throw new Error("An error occurred");
    }
  }

  return await response.json();
}
