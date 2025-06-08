export const BACKEND_URL = 'http://localhost:8000'; // Change to your deployed backend URL when ready

export async function trackUserBehavior(userId, action, category) {
  await fetch(`${BACKEND_URL}/track-behavior`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, action, category }),
  });
}

export async function fetchRecommendations(userId) {
  const res = await fetch(`${BACKEND_URL}/recommend-products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  return res.json();
}
