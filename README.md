# Meetup React App (React + Vite)

This is a progressive React single-page application (SPA) built with **Vite**.  
The app allows users to browse and filter upcoming events by city, view details, specify number of events, work offline, add shortcuts, and visualize event data with charts.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## 🚀 Development & deployment quick commands:

```bash
# Create project
npm create vite@5.3.0
# Select: React / JavaScript + SWC

cd meetup-react-app
npm install
npm run dev   # Dev server at http://localhost:5173

# Build for production
npm run build
npm run preview

# Git setup
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/sagunanathani/meetup-react-app.git
git push -u origin main

## 📌 App Key Features & User Stories

### 1. Filter Events by City
- **User Story:**
  As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.
- **Scenarios:**
  1. When the user hasn’t searched for a specific city, show upcoming events from all cities.
     - **Given** the user hasn’t searched for any city
     - **When** the user opens the app
     - **Then** the user should see a list of upcoming events
  2. User should see a list of suggestions when they search for a city.
     - **Given** the main page is open
     - **When** the user starts typing in the city textbox
     - **Then** the user should receive a list of cities (suggestions) that match what they’ve typed
  3. User can select a city from the suggested list.
     - **Given** the user was typing “Berlin” in the city textbox AND the list of suggested cities is showing
     - **When** the user selects a city (e.g., “Berlin, Germany”) from the list
     - **Then** their city should be changed to that city AND the user should receive a list of upcoming events in that city

---

### 2. Show/Hide Event Details
- **User Story:**
  As a user, I should be able to show or hide event details so that details are not always hidden or displayed.
- **Scenarios:**
  1. User wants to see event details by clicking a button.
     - **Given** the user wanted to see event details
     - **When** they click the "Show Details" button
     - **Then** the user should see more details about the event
  2. User wants to hide event details by clicking a button.
     - **Given** the user wanted to see less information about an event
     - **When** they click the "Hide Details" button
     - **Then** details will be hidden

---

### 3. Specify Number of Events
- **User Story:**
  As a user, I should be able to specify the number of events so that the right amount of events will be displayed.
- **Scenarios:**
  1. User wants to specify how many events to display.
     - **Given** the user specified a number of events
     - **When** searching for events
     - **Then** the right amount of events will be displayed
  2. User didn’t provide a number of events to display.
     - **Given** the user didn’t provide a number
     - **When** they searched for events
     - **Then** all events meeting other criteria should be displayed

---

### 4. Use the App When Offline
- **User Story:**
  As a user, I want to use the app offline so that the app is available without an internet connection.
- **Scenarios:**
  1. User wants to use the app but has no internet connection.
     - **Given** the user previously stored the current state of the app on their device
     - **When** they lose internet access
     - **Then** the user will still be able to use the stored state of the app

---

### 5. Add an App Shortcut to the Home Screen
- **User Story:**
  As a user, I can add an app shortcut to the home screen so that I can access the app quickly.
- **Note:**
  This is handled by the operating system/browser and cannot be tested programmatically.

---

### 6. Display Charts Visualizing Event Details
- **User Story:**
  As a user, I can view charts visualizing event details so that I can easily understand the event data.
- **Scenarios:**
  1. Show a chart on the event details page.
     - **Given** I am on the event details page
     - **When** I view the event details
     - **Then** I should see a chart visualizing the event data
  2. Show a chart for a selected event.
     - **Given** I have selected a specific event
     - **When** I navigate to the event details page
     - **Then** I should see a chart that displays the event's data in a visual format
```

🧩 How I’ll Use Serverless Functions in the Meet App:

- Frontend: React or similar framework
- OAuth Layer: Google OAuth 2.0
- Backend Functions: AWS Lambda
- API Gateway: To trigger Lambda functions
- Database (if needed): DynamoDB or Firebase
- Event Source: Google Calendar API

In the Meet App, serverless functions are a core part of the backend architecture. I’m using AWS Lambda to handle backend logic without maintaining a traditional server. These functions are triggered by user actions and API requests, allowing the app to scale automatically and remain cost-efficient.
Specifically, I’ll use serverless functions to:

- Fetch event data from the Google Calendar API securely using OAuth2.
- Process search queries based on city input and return filtered event results.
- Handle data visualization logic, such as aggregating event genres and locations for chart rendering.
- Support offline functionality by caching responses and serving them when the user is disconnected.
  This approach ensures that the app remains lightweight, fast, and responsive across devices. Serverless architecture also simplifies deployment and maintenance, allowing me to focus on building features rather than managing infrastructure.
