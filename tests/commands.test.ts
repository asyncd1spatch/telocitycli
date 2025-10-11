import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { main } from "../src/main";
import { initTest, setupTestEnvironment, teardownTestEnvironment, withCapturedConsole } from "./testutils";

type TestEnvironment = Awaited<ReturnType<typeof setupTestEnvironment>>;

describe("Commands", () => {
  let testEnv: TestEnvironment;

  beforeAll(async () => {
    await initTest();
    testEnv = await setupTestEnvironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment(testEnv);
  });

  describe("Sanity checks", () => {
    test.serial("HelpCommand shows generic help", async () => {
      process.env["LC_ALL"] = "en_US.UTF-8";
      process.env["LANG"] = "en_US.UTF-8";
      const output = await withCapturedConsole(async () => {
        await main(["help"], false);
      });
      expect(output).toMatch(/A scaffold for making CLIs scripts./);
    });
  });
});
