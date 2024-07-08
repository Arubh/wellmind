export const fetchPsychiatrists = async (lat, lng) => {
  const apiKey = 'P1jUsMV22SMv-lGtImQH57CIgLM5RD5k4QXwK7EuLQQ';
  const response = await fetch(`https://discover.search.hereapi.com/v1/discover?at=${lat},${lng}&q=psychiatrist&apiKey=${apiKey}`);
  if (!response.ok) {
    throw new Error('Failed to fetch psychiatrists');
  }
  return response.json();
};
