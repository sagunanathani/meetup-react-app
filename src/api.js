import { events as mockEvents } from "./mock-data.js";

// ----------------------------
// Check if token is valid
// ----------------------------
const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    return await response.json();
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
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

  if (!accessToken || tokenCheck?.error) {
    localStorage.removeItem("access_token");

    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      // Redirect to Google Auth
      const { authUrl } = await (
        await fetch(
          "https://q2wbsdt1he.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
        )
      ).json();
      window.location.href = authUrl;
      return null;
    }

    accessToken = await getToken(code);
    removeQuery();
  }

  return accessToken;
};

// ----------------------------
// Remove query params from URL
// ----------------------------
const removeQuery = () => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  window.history.pushState("", "", newurl);
};

// ----------------------------
// Fetch events with offline support
// ----------------------------
export const getEvents = async () => {
  console.log("getEvents called");

  // ----------------------------
  // Offline mode
  // ----------------------------
  if (!navigator.onLine) {
    const cachedEvents = localStorage.getItem("lastEvents");
    if (cachedEvents) {
      console.log("Offline: loading events from cache");
      return JSON.parse(cachedEvents);
    } else if (window.location.href.startsWith("http://localhost")) {
      console.log("Offline on localhost: loading mockEvents");
      localStorage.setItem("lastEvents", JSON.stringify(mockEvents));
      return mockEvents;
    } else {
      console.log("Offline with no cached events available");
      return [];
    }
  }

  // ----------------------------
  // Localhost online
  // ----------------------------
  if (window.location.href.startsWith("http://localhost")) {
    localStorage.setItem("lastEvents", JSON.stringify(mockEvents));
    return mockEvents;
  }

  // ----------------------------
  // Online deployed
  // ----------------------------
  let token = await getAccessToken();
  if (!token) return null;

  const tokenCheck = await checkToken(token);
  if (!token || tokenCheck?.error) {
    localStorage.removeItem("access_token");
    token = await getAccessToken();
    if (!token) return null;
  }

  const url = `https://q2wbsdt1he.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
  const response = await fetch(url);
  const result = await response.json();

  if (result?.events) {
    localStorage.setItem("lastEvents", JSON.stringify(result.events));
    return result.events;
  } else return null;
};
