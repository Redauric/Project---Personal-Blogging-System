import { PUBLIC_API_BASE_URL } from "$env/static/public";

const USER_ARTICLE_URL = `${PUBLIC_API_BASE_URL}/users/articles`;
const ARTICLES_URL = `${PUBLIC_API_BASE_URL}/articles`;

/**
 * Loads a specific article authored by a user.
 *
 * Fetches an article from the API based on the user id provided in the parameters.
 * Includes credentials for authentication in the request.
 *
 * @param {Object} context - The context object containing fetch method and route parameters.
 * @param {Function} context.fetch - The fetch method to make API requests.
 * @param {Object} context.params - The route parameters, including the user id.
 * @returns {Promise<Object>} A promise that resolves to an object containing the userArticle.
 */

export async function load({ fetch, params }) {
  const response = await fetch(`${USER_ARTICLE_URL}/${params.id}`, { credentials: "include" });
  const userArticle = await response.json();

  return { userArticle };
}
