import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { describe } from "vitest";
import { expect, test } from "vitest";
import App from "~/app.vue";

describe("Main App", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should be visible", async () => {
    const page = await mountSuspended(App);
    expect(page.exists()).toBe(true);
  });
});
