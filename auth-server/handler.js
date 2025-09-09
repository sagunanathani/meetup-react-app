"use strict";

import { google } from "googleapis";
const calendar = google.calendar("v3");

const SCOPES = ["https://www.googleapis.com/auth/calendar.events.readonly"];

// Lambda environment variables
// eslint-disable-next-line no-undef
const CLIENT_ID = process.env.CLIENT_ID;
// eslint-disable-next-line no-undef
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// eslint-disable-next-line no-undef
const CALENDAR_ID = process.env.CALENDAR_ID;

// Pick redirect URI based on request origin
const pickRedirectUri = (origin) => {
  if (origin && origin.includes("localhost")) {
    return "http://localhost:5173/";
  } else {
    return "https://meetup-react-sagunanathani.vercel.app/";
  }
};

// ---------------------
// getAuthURL Lambda handler
// ---------------------
export const handler = async (event) => {
  try {
    const origin = event?.headers?.origin;
    const redirectUri = pickRedirectUri(origin);
    console.log("Using redirect URI:", redirectUri);

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      redirectUri
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authUrl }),
    };
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error }),
    };
  }
};

// ---------------------
// getAccessToken Lambda handler
// ---------------------
export const getAccessToken = async (event) => {
  try {
    const origin = event?.headers?.origin;
    const redirectUri = pickRedirectUri(origin);

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      redirectUri
    );

    const code = decodeURIComponent(event.pathParameters?.code || "");

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokens),
    };
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error }),
    };
  }
};

// ---------------------
// getCalendarEvents Lambda handler
// ---------------------
export const getCalendarEvents = async (event) => {
  try {
    const origin = event?.headers?.origin;
    const redirectUri = pickRedirectUri(origin);

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      redirectUri
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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  } catch (error) {
    console.error("Error retrieving calendar events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error }),
    };
  }
};
