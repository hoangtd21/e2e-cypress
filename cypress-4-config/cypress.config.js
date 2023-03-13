import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // setting baseURL for visit page
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
