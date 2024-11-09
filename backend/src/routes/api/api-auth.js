import express from "express";
import { getUserWithCredentials } from "../../data/users-dao.js";
import { createUserJWT } from "../../utils/jwt-utils.js";

const router = express.Router();

/**
 * POST request to /auth with a valid username and password to authenticate a user.
 *
 * Return the JWT auth token set as the "authToken" HTTP-only cookie. The user's username will be sent back
 * as JSON in the response.
 *
 * If the user is already logged in, it will remove any old login details and replace the cookie with the new one.
 *
 * Sending invalid credentials will result in a 401.
 */
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Get user from database using getUserWithCredentials function, return 401 if user doesn't exist.
  const user = await getUserWithCredentials(username, password);
  if (!user) return res.sendStatus(401);

  // Create user JWT token and send it back as a HTTP-only cookie along with a 204 status.
  const jwtToken = createUserJWT(user.username);

  // Expires in 24 hours.
  const expires = new Date(Date.now() + 86400000);

  // Send the JWT token in an HTTP-only cookie named authToken which expires in 24 hours.
  return res.cookie("authToken", jwtToken, { httpOnly: true, expires }).json({ username });
});

/**
 * DELETE request to /api/auth to invalidate the authToken cookie, so the user is logged out.
 */
router.delete("/", (req, res) => {
  const expires = new Date(0);
  return res.cookie("authToken", "", { httpOnly: true, expires }).sendStatus(204);
});

export default router;
