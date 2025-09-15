// api.js
import { events as mockEvents } from "./mock-data.js";

// ----------------------------
// Check if token is valid
// ----------------------------
const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error checking token:", error);
    return { error: "invalid_token" };
  }
};

// ----------------------------
// Exchange authorization code for access token
// ----------------------------
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      `https://q2wbsdt1he.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { access_token } = await response.json();
    if (access_token) localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

// ----------------------------
// Refresh access token if expired or missing
// ----------------------------
export const getAccessToken = async () => {
  let accessToken = localStorage.getItem("access_token");
  let tokenCheck = accessToken && (await checkToken(accessToken));

  // No token or token invalid → handle OAuth flow
  if (!accessToken || tokenCheck?.error) {
    await localStorage.removeItem("access_token");

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      // Redirect to Google Auth
      const response = await fetch(
        "https://q2wbsdt1he.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      window.location.href = authUrl;
      return null; // stop execution while redirecting
    }

    // Exchange code for token
    accessToken = await getToken(code);

    // Remove ?code= from URL after token is stored
    removeQuery();
  }

  return accessToken;
};

// ----------------------------
// Remove query params from URL
// ----------------------------
//This prevents the ?code= parameter from staying in the URL after the token is stored.
const removeQuery = () => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  window.history.pushState("", "", newurl);
};

// ----------------------------
// Fetch events from Google Calendar API with offline support
// ----------------------------
export const getEvents = async () => {
  console.log("getEvents called");

  // ----------------------------
  // 1. Offline: load from localStorage
  // ----------------------------
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    console.log("Offline: loading events from localStorage");
    return events ? JSON.parse(events) : [];
  }

  // ----------------------------
  // 2. Localhost: return mock data
  // ----------------------------
  if (window.location.href.startsWith("http://localhost")) {
    return mockEvents;
  }

  // ----------------------------
  // 3. Online: fetch token and validate
  // ----------------------------
  let token = await getAccessToken();
  if (!token) return null; // exit if redirecting

  const tokenCheck = await checkToken(token);
  if (!token || tokenCheck?.error) {
    await localStorage.removeItem("access_token");
    token = await getAccessToken();
    if (!token) return null; // exit if still invalid
  }

  // ----------------------------
  // 4. Fetch events from API
  // ----------------------------
  const url = `https://q2wbsdt1he.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
  const response = await fetch(url);
  const result = await response.json();

  if (result?.events) {
    // Save events in localStorage for offline usage
    localStorage.setItem("lastEvents", JSON.stringify(result.events));
    return result.events;
  } else {
    return null;
  }
};
