import express from "express";
import { requiresAuthentication } from "../../middleware/auth-middleware.js";
import { getUserWithUsername, createUser, updateUser, deleteUser } from "../../data/users-dao.js";

const router = express.Router();

/**
 * API endpoint to check username availability.
 *
 * @route GET /check-username/:username
 * @param {string} username - The username to check for availability.
 * @returns {Object} { available: boolean } - Indicates whether the username is available.
 * @throws {500} Internal server error if there is an issue checking the username.
 */
router.get("/check-username/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const user = await getUserWithUsername(username);
    return res.json({ available: !user });
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to get user info for the currently authenticated user.
 *
 * @route GET /users
 * @returns {Object} User details of the authenticated user.
 * @throws {401} If authentication fails.
 */
router.get("/", requiresAuthentication, (req, res) => {
  return res.json(req.user);
});

/**
 * API endpoint to update the details of the authenticated user.
 *
 * @route PATCH /users
 * @returns {204} No content if the user info is updated successfully.
 * @throws {401} If there is an authentication error.
 * @throws {422} If the provided update information is invalid.
 * @throws {404} If the user to be updated is not found.
 */
router.patch("/", requiresAuthentication, async (req, res) => {
  try {
    const isUpdated = await updateUser(req.user.user_id, req.body);
    return res.sendStatus(isUpdated ? 204 : 404);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.sendStatus(422);
  }
});

/**
 * API endpoint to create a new user.
 *
 * @route POST /users
 * @returns {Object} The newly created user object.
 * @throws {409} If the username already exists.
 * @throws {500} Internal server error if user creation fails.
 */
router.post("/", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.message === "Username already exists, please choose another username") {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to delete the authenticated user.
 *
 * @route DELETE /users
 * @returns {204} No content if the user is deleted successfully.
 * @throws {401} If there is an authentication error.
 * @throws {404} If the user to be deleted is not found.
 * @throws {500} Internal server error if deleting the user fails.
 */
router.delete("/", requiresAuthentication, async (req, res) => {
  try {
    const deleted = await deleteUser(req.user.user_id);
    if (deleted) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
