const API_KEY = 'fec15366a25844f8bf372a05a96b734a';
const BASE_URL = 'https://newsapi.org/v2/top-headlines?language=en&category=health&pageSize=6&apiKey=' + API_KEY;

export const fetchNews = async (page = 1) => {
  const response = await fetch(`${BASE_URL}&page=${page}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
