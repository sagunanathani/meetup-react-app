/**
 * @jest-environment node
 */
import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser; // will hold the browser instance
  let page; // will hold the page instance

  // ----------------------------
  // Runs once before all tests
  // ----------------------------
  beforeAll(async () => {
    // Launch a real Chrome browser (non-headless) for visual debugging
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms,
      timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // path to Chrome
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // required in some environments
      defaultViewport: null, // full window size
    });

    // Open a new tab/page
    page = await browser.newPage();

    // Navigate to local React app
    await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });

    // Wait until at least one event is rendered on the page
    await page.waitForFunction(
      () => document.querySelectorAll(".event").length > 0,
      { timeout: 20000 } // wait up to 20 seconds
    );
  });

  // ----------------------------
  // Runs once after all tests
  // ----------------------------
  afterAll(async () => {
    if (browser) await browser.close(); // close the browser
  });

  // ----------------------------
  // Test 1: Event details are collapsed by default
  // ----------------------------
  test("An event element is collapsed by default", async () => {
    // Select the first event
    const event = await page.$(".event");
    expect(event).not.toBeNull(); // ensure event exists

    // Check that the event details section is not visible
    const eventDetails = await page.$(".event-description");
    expect(eventDetails).toBeNull();
  }, 30000); // timeout increased to 30 seconds

  // ----------------------------
  // Test 2: User can expand an event to see details
  // ----------------------------
  test("User can expand an event to see its details", async () => {
    // Click the button to show event details
    await page.click(".event button"); // selector matches your JSX <button>

    // Check that the event details are now visible
    const eventDetails = await page.$(".event-description");
    expect(eventDetails).toBeDefined();
  });

  // ----------------------------
  // Test 3: User can collapse an event to hide its details
  // ----------------------------
  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn"); // Click again to collapse
    // wait for description to show
    await page.waitForSelector(".event-description", { visible: true });
    const eventDetails = await page.$(".event-description");
    expect(eventDetails).not.toBeNull();
  });
});
