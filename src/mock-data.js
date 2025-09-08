const mockData = [
  {
    kind: "calendar#event",
    etag: '"123456789"',
    id: "abcd1234",
    status: "confirmed",
    summary: "React Meetup",
    location: "Berlin, Germany",
    start: { dateTime: "2025-09-15T18:00:00+02:00" },
    end: { dateTime: "2025-09-15T20:00:00+02:00" },
  },
  {
    kind: "calendar#event",
    etag: '"987654321"',
    id: "efgh5678",
    status: "confirmed",
    summary: "Vue Workshop",
    location: "Munich, Germany",
    start: { dateTime: "2025-09-20T14:00:00+02:00" },
    end: { dateTime: "2025-09-20T16:00:00+02:00" },
  },
];

export default mockData;
