const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		baseUrl: "http://localhost:3000",
		specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
		viewportHeight: 1080,
		viewportWidth: 1920,
		excludeSpecPattern: ["**/1-getting-started", "**/2-advanced-examples"],
		defaultCommandTimeout: 10000,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		retries: 2,
		env: {
			REACT_APP_POCKETBASE_TEST_URL: process.env.REACT_APP_POCKETBASE_TEST_URL,
		},
	},
});
