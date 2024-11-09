import { getUsernameFromJWT } from "../utils/jwt-utils.js";
import { getUserWithUsername } from "../data/users-dao.js";

/**
 * Get the auth JWT from req.cookies.authToken, verify it, find the matching user, and add it to req.user.
 *
 * If any of those processes fail, a 401 status will be returned. Otherwise, the next() function will be called to continue executing
 * the route handlers.
 */
export async function requiresAuthentication(req, res, next) {
  if (!req.cookies.authToken) return res.sendStatus(401);

  try {
    const username = getUsernameFromJWT(req.cookies.authToken);
    const user = await getUserWithUsername(username);
    if (!user) return res.sendStatus(401);
    req.user = user;
    return next();
  } catch {
    return res.sendStatus(401);
  }
}
