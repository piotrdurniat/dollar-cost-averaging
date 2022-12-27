import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      FRONTEND_URL: `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
    },
  },
});
