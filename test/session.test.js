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

test("does not return a session across tenants", () => {
  createSession({
    sessionId: "s-1",
    tenantId: "tenant-a",
    userId: "user-1",
  });

  assert.equal(getSessionForTenant("missing", "tenant-b"), null);
});
