import { describe, it, expect } from "vitest";
import { hashPassword, comparePassword } from "../../src/utils/password";

describe("password utils", () => {
  it("should hash a password and verify it", async () => {
    const password = "mySecret123";
    const hashed = await hashPassword(password);

    expect(hashed).not.toBe(password);
    expect(await comparePassword(password, hashed)).toBe(true);
  });

  it("should return false for wrong password", async () => {
    const hashed = await hashPassword("correct");
    expect(await comparePassword("wrong", hashed)).toBe(false);
  });
});