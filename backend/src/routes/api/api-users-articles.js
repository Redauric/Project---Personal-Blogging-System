import express from "express";
import { requiresAuthentication } from "../../middleware/auth-middleware.js";
import {
  getArticles,
  getArticlesByUserId,
  createArticle,
  updateArticle,
  deleteArticle
} from "../../data/articles-dao.js";

const router = express.Router();

/**
 * API endpoint to get a list of articles written by the authenticated user.
 *
 * @route GET /users/articles
 * @returns {Array<Object>} List of articles authored by the user.
 * @throws {500} Internal server error if fetching articles fails.
 */
router.get("/", requiresAuthentication, async (req, res) => {
  try {
    const userArticles = await getArticlesByUserId(req.user.user_id);
    return res.json(userArticles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to add a new article written by the authenticated user.
 *
 * @route POST /users/articles
 * @param {Object} articleData - The data for the new article.
 * @returns {Object} The newly created article object.
 * @throws {422} If validation fails on the article data.
 * @throws {500} Internal server error if creating the article fails.
 */
router.post("/", requiresAuthentication, async (req, res) => {
  try {
    const articleData = {
      ...req.body
    };
    const newArticle = await createArticle(articleData);
    return res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    if (error instanceof yup.ValidationError) {
      return res.status(422).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to get a specific article written by the authenticated user.
 *
 * @route GET /users/articles/:articleId
 * @param {string} articleId - The id of the article to retrieve.
 * @returns {Object} The requested article object.
 * @throws {404} If the article is not found or does not belong to the user.
 * @throws {500} Internal server error if fetching the article fails.
 */
router.get("/:articleId", requiresAuthentication, async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const article = await getArticles(articleId);

    if (article && article.user_id === req.user.user_id) {
      return res.json(article);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to edit a specific article written by the authenticated user.
 *
 * @route PATCH /users/articles/:articleId
 * @param {string} articleId - The id of the article to update.
 * @param {Object} updateData - The data to update the article with.
 * @returns {204} No content if the article is updated successfully.
 * @throws {404} If the article is not found or does not belong to the user.
 * @throws {422} If validation fails on the update data.
 * @throws {500} Internal server error if updating the article fails.
 */
router.patch("/:articleId", requiresAuthentication, async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const updated = await updateArticle(articleId, req.body);

    if (updated) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error updating article:", error);
    if (error instanceof yup.ValidationError) {
      return res.status(422).json({ error: error.errors });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * API endpoint to delete a specific article written by the authenticated user.
 *
 * @route DELETE /users/articles/:articleId
 * @param {string} articleId - The id of the article to delete.
 * @returns {204} No content if the article is deleted successfully.
 * @throws {404} If the article is not found.
 * @throws {500} Internal server error if deleting the article fails.
 */
router.delete("/:articleId", requiresAuthentication, async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const deleted = await deleteArticle(articleId);

    if (deleted) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error deleting article:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
