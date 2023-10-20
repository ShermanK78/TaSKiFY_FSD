// Import the connectToMongoDB function from the 'db' module
const { connectToMongoDB } = require('./db');

// Mock console.log
const originalConsoleLog = console.log; // Store the original console.log function
const logs = []; // Create an array to capture log messages
console.log = (message) => {
  logs.push(message); // Override console.log to capture log messages in the 'logs' array
};

// Describe a test suite for MongoDB Connection
describe('MongoDB Connection', () => {
  it('should log "MongoDB connected successfully"', async () => {
    // Run the 'connectToMongoDB' function asynchronously
    await connectToMongoDB();

    // Expect the 'logs' array to contain the message 'MongoDB connected successfully'
    expect(logs).toContain('MongoDB connected successfully');
  });
});

// Restore the original console.log function after the tests
afterAll(() => {
  console.log = originalConsoleLog; // Restore the original console.log function
});
