export async function apiRequest(path, options = {}) {
  const baseUrl = "http://localhost:5000";
  const fullPath = path.startsWith("/api") ? path : `/api${path}`;
  const token = localStorage.getItem("mediavault_token");

  let headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${fullPath}`, { ...options, headers });

  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const data = await response.json();
      if (data && data.error) {
        errorMessage = data.error;
      }
    } catch {
      // Fallback if response is not JSON
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}
