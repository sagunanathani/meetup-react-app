"use strict";

import { google } from "googleapis";
// eslint-disable-next-line no-unused-vars
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.readonly"];

// eslint-disable-next-line no-undef, no-unused-vars
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

const redirect_uris = ["https://meetup-react-sagunanathani.vercel.app/"];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// ✅ Lambda-compatible handler for getAuthURL
export const handler = async () => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authUrl }),
    };
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

// ✅ Lambda-compatible handler for getAccessToken
export const getAccessToken = async (event) => {
  try {
    const code = decodeURIComponent(event.pathParameters?.code || "");

    const tokenResponse = await new Promise((resolve, reject) => {
      oAuth2Client.getToken(code, (error, tokens) => {
        if (error) {
          return reject(error);
        }
        return resolve(tokens);
      });
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenResponse),
    };
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error }),
    };
  }
};

export const getCalendarEvents = async (event) => {
  try {
    const access_token = decodeURIComponent(
      event.pathParameters?.access_token || ""
    );
    oAuth2Client.setCredentials({ access_token });

    const results = await new Promise((resolve, reject) => {
      calendar.events.list(
        {
          calendarId: CALENDAR_ID,
          auth: oAuth2Client,
          timeMin: new Date().toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
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
