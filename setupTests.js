import "@testing-library/jest-dom";

const mockEvents = [
  {
    id: 1,
    summary: "Mock Event 1",
    location: "Berlin, Germany",
    start: { dateTime: "2025-09-10T10:00" },
    created: "2025-09-01T08:00",
  },
  {
    id: 2,
    summary: "Mock Event 2",
    location: "Munich, Germany",
    start: { dateTime: "2025-09-10T12:00" },
    created: "2025-09-01T09:00",
  },
];

// eslint-disable-next-line no-undef
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockEvents),
  })
);
