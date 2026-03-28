const API_URL = process.env.REACT_APP_API_URL;

export const generateLink = async () => {
  try {
    const res = await fetch(`${API_URL}/generate-link`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching link:", err);
    return null;
  }
};