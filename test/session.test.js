import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { clearSessions, createSession, getSessionForTenant } from "../src/session.js";

beforeEach(() => {
  clearSessions();
});

test("returns a session for its own tenant", () => {
  createSession({
    sessionId: "s-1",
    tenantId: "tenant-a",
    userId: "user-1",
  });

  assert.equal(getSessionForTenant("s-1", "tenant-a")?.userId, "user-1");
});

test("demonstrates the tenant-boundary regression used by the review fixture", () => {
  createSession({
    sessionId: "s-1",
    tenantId: "tenant-a",
    userId: "user-1",
  });

  assert.equal(getSessionForTenant("s-1", "tenant-b")?.userId, "user-1");
});
