/**
 * @jest-environment node
 */
import puppeteer from "puppeteer";

// ----------------------------
// End-to-End Tests for Show/Hide Event Details
// ----------------------------
describe("show/hide an event details", () => {
  let browser; // Puppeteer browser instance
  let page; // Puppeteer page/tab instance

  // ----------------------------
  // Runs once before all tests
  // Launches the browser and navigates to the app
  // ----------------------------
  beforeAll(async () => {
    jest.setTimeout(60000); // 🔹 Increase timeout for Puppeteer setup
    browser = await puppeteer.launch({
      headless: false, // 🔹 Set false to see browser UI (debugging)
      slowMo: 250, // 🔹 Slow down each operation by 250ms
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required in some environments
      defaultViewport: null, // 🔹 Full window size
    });

    // Open a new tab
    page = await browser.newPage();

    // Navigate to the local React app
    await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });

    // Wait until at least one event is rendered on the page
    await page.waitForSelector(".event");
  }, 30000);

  // ----------------------------
  // Runs once after all tests
  // Closes the browser to free resources
  // ----------------------------
  afterAll(async () => {
    if (browser) await browser.close();
  });

  // ----------------------------
  // Test 1: Event details are collapsed by default
  // ----------------------------
  test("Event details are collapsed by default", async () => {
    // 🔹 Select the event details element
    const eventDetails = await page.$(".event-description");

    // 🔹 Check visibility if the element exists
    if (eventDetails) {
      const visible = await eventDetails.evaluate(
        (el) => window.getComputedStyle(el).display !== "none"
      );
      expect(visible).toBe(false); // should be hidden by default
    } else {
      expect(eventDetails).toBeNull(); // no element in DOM
    }
  }, 30000);

  // ----------------------------
  // Test 2: User can expand an event to see its details
  // ----------------------------
  test("User can expand an event to see its details", async () => {
    // 🔹 Wait until the button is visible, then click it
    await page.waitForSelector(".event button", { visible: true });
    await page.click(".event button");

    // 🔹 Wait for the details to appear
    await page.waitForSelector(".event-description", { visible: true });

    // 🔹 Ensure the details are now visible
    const eventDetails = await page.$(".event-description");
    expect(eventDetails).not.toBeNull();
  }, 30000);

  // ----------------------------
  // Test 3: User can collapse an event to hide its details
  // ----------------------------
  test("User can collapse an event to hide its details", async () => {
    // 🔹 Click the collapse button
    await page.waitForSelector(".event .details-btn", { visible: true });
    await page.click(".event .details-btn");

    // 🔹 Wait until details are hidden
    await page.waitForFunction(
      () =>
        !document.querySelector(".event-description") ||
        document.querySelector(".event-description").offsetParent === null
    );

    // 🔹 Check the visibility state
    const eventDetails = await page.$(".event-description");
    const visible = eventDetails
      ? await eventDetails.evaluate(
          (el) => window.getComputedStyle(el).display !== "none"
        )
      : false;
    expect(visible).toBe(false); // should be hidden after collapsing
  }, 60000);
});

// ----------------------------
// Filter Events by City (Optimized)
// ----------------------------
describe("Filter events by city", () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(60000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: null,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });
    await page.waitForSelector(".event");
  }, 40000);

  afterAll(async () => {
    if (browser) await browser.close();
  });

  test("By default, all events are displayed", async () => {
    const eventsCount = await page.$$eval(".event", (events) => events.length);
    expect(eventsCount).toBeGreaterThan(0);
  });
});
