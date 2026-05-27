import { requireUser, sendError } from './_lib/auth.js';

export default async function handler(req, res) {
  try {
    const { userId } = await requireUser(req);
    return res.status(200).json({ userId });
  } catch (e) {
    sendError(res, e);
  }
}
