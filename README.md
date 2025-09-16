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

Replace the Following Placeholders:
in "package.json": GITHUB_USERNAME (1 occurrence).
in "static-site-test/index.html", replace:
GET_AUTH_URL (1 occurrence).
GET_ACCESS_TOKEN_URL (1 occurrence). Note: paste the url without "/{code}"
GET_EVENTS_URL (1 occurrence). Note: paste the url without "/{access_token}"
in "auth-server/handler.js": GITHUB_USERNAME (1 occurrence).
Add Missing Config
You can refer to Exercise 4.3 if you need specific instructions on how to re-create the missing "auth-server/config.json" file. Here are some quick steps, however, if you got stuck, refer to exercise 4.3.

create "config.json" file inside the "auth-server" folder.
add necessery Google Calendar API credentials:
CLIENT_ID (get its value from your Google Calendar API credentials file)
CLIENT_SECRET (get it from your Google Calendar API credentials file)
CALENDAR_ID (set its value to this string: "fullstackwebdev@careerfoundry.com")
Note that this demo repo contains a sample solution for the Exercise 4.4 task

testing>

🧪 Testing Approaches: TDD vs BDD
✅ Test-Driven Development (TDD)
Used by: Developers
Focus: Code correctness (unit & integration tests)
Process: Red → Green → Refactor
Frameworks: Jest, Mocha, JUnit, NUnit
Example in this project: Testing that <Event /> renders a “Show details” button before writing the component.

🤝 Behavior-Driven Development (BDD)
Used by: Developers + Non-developers (QA, PMs, Business Analysts)
Focus: User behavior & application features
Process: Feature → Scenario (Given-When-Then) → Code
Frameworks: Cucumber, Jasmine, RSpec, Behave, Puppeteer/Playwright (for E2E)
Example in this project:
Scenario:
Given a user is on the events page
When they click "Show details"
Then the event details are displayed

⚡ In this project:
TDD is applied with Jest for unit & snapshot testing.
BDD is applied with Puppeteer for end-to-end user scenarios.

Unit Testing for Features 1-3 (_exercise:4.4_)

- Feature 1: EventList and Event components tested for rendering and toggle details
- Feature 2: Event info (title, time, location) and show/hide details functionality tested
- Feature 3: NumberOfEvents component tested for default value and input changes
- Coverage improved to 82-100% for all components

Integration Testing Feature 3: Implement specify number of events functionality (_exercise:4.5_)

- Added integration test for NumberOfEvents and EventList to ensure the number
  of events displayed matches the user input (Feature 3).
- Updated App.jsx to include state `currentNOE` (current number of events).
- Passed setter function to NumberOfEvents component to update event count.
- Modified useEffect to fetch events whenever `currentCity` or `currentNOE` changes.
- Updated NumberOfEvents component to handle user input and trigger state update.
- Verified functionality manually: changing number of events updates EventList correctly.
- Applied CSS styling to center event box and improve readability.
- All tests passing successfully.

Acceptance testing Feature 1: implement acceptance tests for city search and event filtering (_exercise:4.6_)
This is structured to clearly indicate:

1. Scope: Acceptance testing for city search and event filtering.
2. Details: User flows tested (typing, suggestions, selecting city, event list updates).
3. Fixes: Use of screen API and act(...) for React warnings.
4. Tools: jest-cucumber, React Testing Library, mock data.

create a new “features” folder inside “src” folder to hold all of your Gherkin files (similar to the “tests” folder created for Jest test files) - Creating Gherkin Files for Each Feature
npm install jest-cucumber --save-dev

- Added jest-cucumber feature tests for filtering events by city
- Tested user interactions: typing in city textbox, viewing suggestions, and selecting a city
- Integrated mock event data to simulate API responses
- Updated tests to use React Testing Library's screen API to avoid AppDOM undefined errors
- Ensured that event lists update correctly based on selected city
- Wrapped async interactions in act(...) to suppress React state update warnings

End-to-End Testing Feature 2: "Show/Hide Event Details": (_exercise:4.6_)
end-to-end test files in the same “tests” folder as your Jest files (rather than separating them) - ”EndToEnd.test.js”
npm install --save-dev puppeteer

Add end-to-end testing with Puppeteer:

- Integrated Puppeteer as the framework for end-to-end (E2E) testing.
- Implemented scenarios for event details toggle:
  Scenario 1: An event element is collapsed by default.
  Scenario 2: User can expand an event to see details.
  Scenario 3: User can collapse an event to hide details.
- Configured Jest with increased timeout to support real browser runs.
- Added setupTests.js to filter noisy console warnings during test execution.
- Verified tests with both headless (fast) and non-headless (debug) modes.

Task
feat: Add BDD acceptance tests for Features 2 & 3 in Meet App

- Feature 2 (Show/Hide Event Details):

  - Added showHideAnEventsDetails.feature with scenarios.
  - Implemented showHideAnEventsDetails.test.js using jest-cucumber.
  - Tested default collapsed state, expand/collapse functionality.

- Feature 3 (Specify Number of Events):

  - Added specifyNumberOfEvents.feature with scenarios.
  - Implemented acceptance tests for default number of events and user-specified number.

- Tests use React Testing Library queries (queryByRole, within) and waitFor for async handling.
- Bonus Feature 1 E2E tests temporarily excluded for faster test runs.

(_exercise:4.7_)
Monitoring & CI/CD
This project is monitored using Atatus, which provides insights into performance, errors, and abnormal activity across different browsers and operating systems. The integration ensures that the app’s behavior is tracked in real time, helping identify and resolve potential issues quickly.

Task 4.7 Summary:
Created a trial account on Atatus and set up a new project for the Meetup Events App.
Integrated Atatus into the app following the official instructions.
Deployed the app to the production environment for live monitoring.
Collected data by visiting the app across multiple browsers and devices.
Reviewed Atatus dashboard reports to analyze:
Loading and response times.
Errors and abnormal activity.
Differences in performance across browsers/OS.
Documented findings, screenshots, and resolutions in a PDF report.
Reflected on CI/CD practices, including:
CI (Continuous Integration): Automates testing and integration of code changes.
CD (Continuous Deployment/Delivery): Automates deployment of verified code to production.
Advantages include faster feedback, early detection of issues, and consistent deployment practices.
CI/CD could be applied during the development of the Meetup Events App to automate tests and deploy updates seamlessly.

(_exercise:4.8_)
Task 4.8: Alerts Implementation
In this task, we implemented alerts in the Meetup Events App using object-oriented principles, providing real-time feedback to users for various scenarios.

Alerts Implemented

1. InfoAlert
   Purpose: Inform users of minor issues, such as entering an invalid city name during search.
   Appearance: Usually displayed in blue.
   Implementation: Tied to a state variable (infoAlert) in App.jsx. Renders dynamically when the state is non-empty.

2. ErrorAlert
   Purpose: Warn users when entering an invalid number of events (negative number, zero, or non-numeric input).
   Appearance: Displayed in red.
   Implementation:
   Tied to a state variable (errorText) in App.jsx.
   Setter function passed to NumberOfEvents component.
   Logic uses isNaN(value) or (value <= 0) to determine when to display the error.
   Automatically hides the alert when valid input is provided.

Implementation Steps
Created the ErrorAlert component extending the base Alert class, alongside InfoAlert.
Imported ErrorAlert into App.jsx and rendered it after InfoAlert inside the same alerts-container.
Updated the NumberOfEvents component to use the setter function for errorText, ensuring alerts show correctly for invalid input.
Verified functionality by running tests and fixing failing unit tests in NumberOfEvents.test.js.
Checked alerts work locally by entering invalid values and confirming proper alert messages.
Deployed the updated app to Vercel and ensured alerts function in the production environment.

Results
Users receive immediate visual feedback for invalid city search or number of events input.
Improves UX and reduces invalid input issues.
Fully tested to ensure correct rendering and logic handling.

(_exercise:4.9_)
Task 4.9: Converting the App into a PWA
The Meetup Events App has been upgraded into a Progressive Web Application (PWA), allowing users to install it on their devices and use it offline.

Steps Implemented

1. Manifest Configuration
   Customized manifest.json with app name, icons, colors, and theme.
   Ensures proper app display when installed on a device.

2. Service Worker
   Registered a service worker to cache assets and event data.
   Enables offline use of the app, even when no internet connection is available.

3. Offline Functionality
   Cached the list of events using localStorage.
   When offline, the app loads events from the cache, ensuring continuous usability.

4. WarningAlert Component
   Implemented WarningAlert in src/components/Alert.jsx.
   Notifies users when the displayed list is loaded from the cache and may not be up to date.
   Uses the Online State API (navigator.onLine) to detect online/offline status.
   Integrated into App.jsx alongside InfoAlert and ErrorAlert.

5. Testing & Deployment
   Verified offline functionality by disabling the network in browsers and ensuring cached events display correctly.
   Deployed the app with all PWA functionality enabled.

(_exercise:4.10_)
Task 4.10: Implementing Charts & Data Visualization
The Meetup Events App now includes interactive charts that help users understand event distribution and popularity. Two types of charts are implemented: a scatterplot for events per city, and a pie chart for event topics/genres.

Scatterplot: Events by City
Implemented using the Recharts ScatterChart component.
Displays the number of events in each city dynamically.
Placed inside a responsive charts-container in App.jsx.
Fully responsive and adjusts automatically when the browser window changes size.
Helps users quickly see which cities have the most events.

Pie Chart: Event Genres
Implemented using the Recharts PieChart component.
Displays the popularity of event topics such as React, JavaScript, Node, jQuery, and Angular.
Dynamically calculates the number of events per genre using the summary field from event data.
Includes customized labels that show both genre name and percentage of total events.
Uses the Cell component to assign distinct colors to each pie slice.
Includes a legend to clarify which color corresponds to which genre.

Implementation Highlights
Created EventGenresChart.jsx for the pie chart.
Passed events from App.jsx as props to both chart components.
Used useEffect() to update chart data when events change.
charts-container uses CSS grid for responsive side-by-side layout:
Fully responsive on desktop, tablet, and mobile devices.

Bonus Features
Custom Colors for pie chart slices using <Cell fill={colors[index]} />.
Legend positioned at the bottom of the chart for better clarity.
