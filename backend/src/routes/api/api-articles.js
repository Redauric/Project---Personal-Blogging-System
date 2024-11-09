import express from "express";
import { requiresAuthentication } from "../../middleware/auth-middleware.js";
import { getArticles } from "../../data/articles-dao.js";
import { getCommentsForArticle, createComment } from "../../data/comments-dao.js";

const router = express.Router();

/**
 * API endpoint to retrieve a list of all articles.
 * No authentication is required to access this endpoint.
 *
 * @route GET /articles
 * @returns {Array<Object>} List of articles.
 * @throws {500} Internal server error if fetching articles fails.
 */
router.get("/", async (req, res) => {
  try {
    const articles = await getArticles();
    return res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to retrieve a specific article by its id.
 * No authentication is required to access this endpoint.
 *
 * @route GET /articles/:articleId
 * @param {string} articleId - The id of the article to retrieve.
 * @returns {Object} The requested article object.
 * @throws {404} If the article is not found.
 * @throws {500} Internal server error if fetching the article fails.
 */
router.get("/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await getArticles(articleId);
    if (!article) {
      return res.sendStatus(404);
    }
    return res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to add a new comment to a specific article.
 * Authentication is required to access this endpoint.
 *
 * @route POST /articles/:articleId/comments
 * @param {string} articleId - The id of the article to comment on.
 * @param {string} comment_text - The text of the comment to add.
 * @returns {Object} The newly created comment object.
 * @throws {400} If comment text is not provided.
 * @throws {500} Internal server error if adding the comment fails.
 */
router.post("/:articleId/comments", requiresAuthentication, async (req, res) => {
  const { articleId } = req.params;

  const { comment_text } = req.body;

  if (!comment_text) {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const newComment = await createComment(comment_text, req.user.user_id, articleId);
    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to retrieve all comments related to a specific article.
 * No authentication is required to access this endpoint.
 *
 * @route GET /articles/:articleId/comments
 * @param {string} articleId - The id of the article whose comments to retrieve.
 * @returns {Array<Object>} List of comments for the specified article.
 * @throws {500} Internal server error if fetching comments fails.
 */
router.get("/:articleId/comments", async (req, res) => {
  const { articleId } = req.params;
  try {
    const comments = await getCommentsForArticle(articleId);
    return res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
