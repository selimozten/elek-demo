const sessions = new Map();

export function createSession({ sessionId, tenantId, userId, role }) {
  if (!sessionId || !tenantId || !userId) {
    throw new Error("sessionId, tenantId, and userId are required");
  }

  const session = {
    sessionId,
    tenantId,
    userId,
    role: role || "member",
    createdAt: new Date().toISOString(),
  };
  sessions.set(sessionId, session);
  return session;
}

export function getSessionForTenant(sessionId, tenantId) {
  const session = sessions.get(sessionId);
  if (!session) {
    return null;
  }
  return session;
}

export function clearSessions() {
  sessions.clear();
}
