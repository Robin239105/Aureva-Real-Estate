import { createClerkClient, verifyToken } from '@clerk/backend';

const secretKey = process.env.CLERK_SECRET_KEY;
const publishableKey = process.env.CLERK_PUBLISHABLE_KEY || process.env.VITE_CLERK_PUBLISHABLE_KEY;

export const clerk = secretKey ? createClerkClient({ secretKey, publishableKey }) : null;

/**
 * Require a signed-in Clerk user for the request. Returns the userId.
 * Throws (handled by caller) if missing or invalid.
 *
 * Reads `Authorization: Bearer <token>` (session JWT minted by @clerk/clerk-react
 * via `getToken()`).
 */
export async function requireUser(req) {
  if (!secretKey) throw httpError(503, 'Clerk is not configured on the server');
  const header = req.headers.authorization || req.headers.get?.('authorization');
  if (!header || !header.startsWith('Bearer ')) throw httpError(401, 'Missing bearer token');
  const token = header.slice(7);
  try {
    const payload = await verifyToken(token, { secretKey });
    if (!payload?.sub) throw httpError(401, 'Invalid token');
    return { userId: payload.sub, claims: payload };
  } catch (e) {
    throw httpError(401, 'Invalid or expired session');
  }
}

export function httpError(status, message) {
  const err = new Error(message);
  err.statusCode = status;
  return err;
}

export function sendError(res, err) {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal error' });
}
