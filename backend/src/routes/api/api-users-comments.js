import express from "express";
import { requiresAuthentication } from "../../middleware/auth-middleware.js";
import { updateComment, deleteComment, getCommentsByUserId } from "../../data/comments-dao.js";

const router = express.Router();

/**
 * API endpoint to get all comments made by the authenticated user.
 *
 * @route GET /users/comments
 * @returns {Array<Object>} List of comments authored by the user.
 * @throws {500} Internal server error if fetching comments fails.
 */
router.get("/", requiresAuthentication, async (req, res) => {
  try {
    const userComments = await getCommentsByUserId(req.user.user_id);
    return res.json(userComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to update a specific comment made by the authenticated user.
 *
 * @route PATCH /users/comments/:commentId
 * @param {string} commentId - The id of the comment to update.
 * @param {Object} commentData - The new data for the comment.
 * @returns {204} No content if the comment is updated successfully.
 * @throws {400} If the updated comment text is missing.
 * @throws {404} If the comment is not found or does not belong to the user.
 * @throws {500} Internal server error if updating the comment fails.
 */
router.patch("/:commentId", requiresAuthentication, async (req, res) => {
  const commentId = req.params.commentId;
  const { comment_text } = req.body;

  if (!comment_text) {
    return res.status(400).json({ error: "Comment text is required." });
  }

  try {
    const updated = await updateComment(commentId, comment_text, req.user.user_id);
    if (updated) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to delete a specific comment written by the authenticated user.
 *
 * @route DELETE /users/comments/:commentId
 * @param {string} commentId - The id of the comment to delete.
 * @returns {204} No content if the comment is deleted successfully.
 * @throws {404} If the comment is not found.
 * @throws {500} Internal server error if deleting the comment fails.
 */
router.delete("/:commentId", requiresAuthentication, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const deleted = await deleteComment(commentId, req.user.user_id);
    if (deleted) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
