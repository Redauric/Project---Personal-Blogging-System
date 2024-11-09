import { getDatabase } from "./database.js";
import * as yup from "yup";

/**
 * Schema to define a valid create comment request.
 * The request must have text, user id and article id.
 */
export const createCommentSchema = yup.object({
  comment_text: yup.string().required().min(1).max(500),
  user_id: yup.number().required(),
  article_id: yup.number().required()
});

/**
 * Creates a new comment and returns it.
 * @param {string} comment_text - The text of the comment.
 * @param {number} user_id - The id of the user creating the comment.
 * @param {number} article_id - The id of the article the comment belongs to.
 * @returns {Promise<object>} The created comment object, including its id.
 */
export async function createComment(comment_text, user_id, article_id) {
  await createCommentSchema.validate({ comment_text, user_id, article_id });

  const db = await getDatabase();
  const dbResult = await db.run(
    "INSERT INTO Comments (comment_text, user_id, article_id) VALUES (?, ?, ?)",
    comment_text,
    user_id,
    article_id
  );

  return { id: dbResult.lastID, comment_text, user_id, article_id };
}

/**
 * Updates an existing comment and returns it.
 * @param {number} comment_id - The id of the comment to update.
 * @param {string} comment_text - The new text for the comment.
 * @param {number} user_id - The id of the user updating the comment.
 * @returns {Promise<boolean>} True if the comment was updated, false if not.
 */
export async function updateComment(comment_id, comment_text, user_id) {
  const db = await getDatabase();

  const comment = await db.get(
    "SELECT * FROM Comments WHERE comment_id = ? AND user_id = ?",
    comment_id,
    user_id
  );

  if (!comment) {
    return false;
  }

  const dbResult = await db.run(
    "UPDATE Comments SET comment_text = ? WHERE comment_id = ?",
    comment_text,
    comment_id
  );

  return dbResult.changes > 0;
}

/**
 * Deletes a comment.
 * @param {number} comment_id - The id of the comment to delete.
 * @param {number} user_id - The id of the user attempting to delete the comment.
 * @returns {Promise<boolean>} True if the comment was deleted, false if not.
 */
export async function deleteComment(comment_id, user_id) {
  const db = await getDatabase();
  const comment = await db.get(
    "SELECT * FROM Comments WHERE comment_id = ? AND user_id = ?",
    comment_id,
    user_id
  );

  if (!comment) {
    return false;
  }

  const dbResult = await db.run("DELETE FROM Comments WHERE comment_id = ?", comment_id);
  return dbResult.changes > 0;
}

/**
 * Gets all comments for a specific article, including the username.
 * @param {number} article_id - The id of the article for which to retrieve comments.
 * @returns {Promise<Array>} An array of comments for the article.
 */
export async function getCommentsForArticle(article_id) {
  const db = await getDatabase();
  return await db.all(
    `SELECT c.*, u.username, u.user_avatar_url
     FROM Comments c 
     JOIN Users u ON c.user_id = u.user_id 
     WHERE c.article_id = ?`,
    article_id
  );
}

/**
 * Gets all comments made by a specific user, including the article title.
 * @param {number} user_id - The id of the user whose comments are to be retrieved.
 * @returns {Promise<Array>} An array of comments made by the user.
 */
export async function getCommentsByUserId(user_id) {
  const db = await getDatabase();
  return await db.all(
    `SELECT c.*, a.article_title 
     FROM Comments c 
     JOIN Articles a ON c.article_id = a.article_id 
     WHERE c.user_id = ?`,
    user_id
  );
}
