"use strict";

import { google } from "googleapis";
const calendar = google.calendar("v3");
import { events } from "./mockData.js";
import process from "process";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events.readonly"];

const CLIENT_ID = process?.env?.CLIENT_ID || "";
const CLIENT_SECRET = process?.env?.CLIENT_SECRET || "";
const CALENDAR_ID = process?.env?.CALENDAR_ID || "";
const USE_MOCK = process?.env?.USE_MOCK === "true";

// ---------------------
// Helpers
// ---------------------
const pickRedirectUri = (origin) => {
  if (origin && origin.includes("localhost")) {
    return "http://localhost:5173/";
  } else {
    return "https://meetup-react-sagunanathani.vercel.app/";
  }
};

const jsonResponse = (statusCode, body, origin) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

// 👈 Define useMock before any handlers
const isMockMode = (origin) => USE_MOCK || origin?.includes("localhost");

// ---------------------
// getAuthURL Lambda handler
// ---------------------
export const handler = async (event) => {
  try {
    const origin = event?.headers?.origin;

    if (isMockMode(origin)) {
      return jsonResponse(200, { authUrl: "MOCK_AUTH_URL" }, origin);
    }

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      pickRedirectUri(origin)
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return jsonResponse(200, { authUrl }, origin);
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return jsonResponse(
      500,
      { message: "Internal server error", error },
      event?.headers?.origin
    );
  }
};

// ---------------------
// getAccessToken Lambda handler
// ---------------------
export const getAccessToken = async (event) => {
  try {
    const origin = event?.headers?.origin;

    if (isMockMode(origin)) {
      return jsonResponse(200, { access_token: "MOCK_ACCESS_TOKEN" }, origin);
    }

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      pickRedirectUri(origin)
    );

    const code = decodeURIComponent(event.pathParameters?.code || "");
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    return jsonResponse(200, tokens, origin);
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return jsonResponse(
      500,
      { message: "Internal server error", error },
      event?.headers?.origin
    );
  }
};

// ---------------------
// getCalendarEvents Lambda handler (Google OR Mock)
// ---------------------
export const getCalendarEvents = async (event) => {
  try {
    const origin = event?.headers?.origin;

    if (isMockMode(origin)) {
      return jsonResponse(200, { events }, origin);
    }

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      pickRedirectUri(origin)
    );

    const access_token = decodeURIComponent(
      event.pathParameters?.access_token || ""
    );
    oAuth2Client.setCredentials({ access_token });

    const results = await calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return jsonResponse(200, { events: results.data.items }, origin);
  } catch (error) {
    console.error("Error retrieving calendar events:", error);
    return jsonResponse(
      500,
      { message: "Internal server error", error },
      event?.headers?.origin
    );
  }
};
