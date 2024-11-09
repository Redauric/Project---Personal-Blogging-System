import { PUBLIC_API_BASE_URL } from "$env/static/public";

const USER_ARTICLE_URL = `${PUBLIC_API_BASE_URL}/users/articles`;
const ARTICLES_URL = `${PUBLIC_API_BASE_URL}/articles`;

/**
 * Loads the details of a specific article and its associated comments.
 *
 * Fetches the article data and its comments from the API based on the article id provided in the parameters. It includes credentials for authentication in the requests.
 *
 * @param {Object} context - The context object containing the fetch method and route parameters.
 * @param {Function} context.fetch - The fetch method to make API requests.
 * @param {Object} context.params - The route parameters, including the article id.
 * @returns {Promise<Object>} A promise that resolves to an object containing the userArticle and its associated comments.
 */

export async function load({ fetch, params }) {
  const response = await fetch(`${USER_ARTICLE_URL}/${params.id}`, { credentials: "include" });
  const userArticle = await response.json();

  const commentsResponse = await fetch(`${ARTICLES_URL}/${params.id}/comments`);
  const comments = await commentsResponse.json();

  return { userArticle, comments };
}
