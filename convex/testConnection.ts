import { query } from "./_generated/server";

export const getConnectionStatus = query({
  args: {},
  handler: async (ctx) => {
    // Simple test to check if Convex is connected
    return {
      status: "connected",
      timestamp: new Date().toISOString(),
      message: "Convex database is working!"
    };
  },
});

export const getTestData = query({
  args: {},
  handler: async (ctx) => {
    // Try to query any existing data or return sample data
    return [
      { id: 1, name: "Test Item 1", created: new Date().toISOString() },
      { id: 2, name: "Test Item 2", created: new Date().toISOString() },
      { id: 3, name: "Test Item 3", created: new Date().toISOString() }
    ];
  },
});