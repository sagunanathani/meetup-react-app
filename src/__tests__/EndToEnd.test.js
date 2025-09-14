/**
 * @jest-environment node
 */
import puppeteer from "puppeteer";
import process from "process";

// ----------------------------
// Increase timeout for all tests in this file
// ----------------------------
jest.setTimeout(120000); // 2 minutes for slow environments
process.env.REACT_APP_USE_MOCK = "true"; // Force mock data

// ----------------------------
// Show/Hide Event Details Tests
// ----------------------------
describe("Show/Hide Event Details & Filter Events", () => {
  let browser;
  let page;

  // ----------------------------
  // Runs once before all tests
  // Launch Puppeteer browser and navigate to app
  // ----------------------------
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // change to true in CI environments
      slowMo: 50, // slow down actions to see what happens
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: null,
    });

    page = await browser.newPage();
    await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });

    // Wait until at least one event is rendered
    await page.waitForSelector(".event", { timeout: 60000 });
  });

  // ----------------------------
  // Runs once after all tests
  // ----------------------------
  afterAll(async () => {
    if (browser) await browser.close();
  });

  // ----------------------------
  // Test 1: Event details are collapsed by default
  // ----------------------------
  test("Event details are collapsed by default", async () => {
    const eventDetails = await page.$(".event-description");

    if (eventDetails) {
      const visible = await eventDetails.evaluate(
        (el) => window.getComputedStyle(el).display !== "none"
      );
      expect(visible).toBe(false);
    } else {
      expect(eventDetails).toBeNull();
    }
  });

  // ----------------------------
  // Test 2: User can expand an event to see its details
  // ----------------------------
  test("User can expand an event to see its details", async () => {
    await page.waitForSelector(".event button", { visible: true });
    await page.click(".event button");

    await page.waitForSelector(".event-description", { visible: true });

    const eventDetails = await page.$(".event-description");
    expect(eventDetails).not.toBeNull();
  });

  // ----------------------------
  // Test 3: User can collapse an event to hide its details
  // ----------------------------
  test("User can collapse an event to hide its details", async () => {
    await page.waitForSelector(".event .details-btn", { visible: true });
    await page.click(".event .details-btn");

    await page.waitForFunction(
      () =>
        !document.querySelector(".event-description") ||
        document.querySelector(".event-description").offsetParent === null,
      { timeout: 60000 }
    );

    const eventDetails = await page.$(".event-description");
    const visible = eventDetails
      ? await eventDetails.evaluate(
          (el) => window.getComputedStyle(el).display !== "none"
        )
      : false;
    expect(visible).toBe(false);
  });

  // ----------------------------
  // Test 4: By default, all events are displayed
  // ----------------------------
  test("By default, all events are displayed", async () => {
    const eventsCount = await page.$$eval(".event", (events) => events.length);
    expect(eventsCount).toBeGreaterThan(0);
  });
});
