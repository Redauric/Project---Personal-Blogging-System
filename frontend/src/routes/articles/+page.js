import { PUBLIC_API_BASE_URL } from "$env/static/public";

const ARTICLES_URL = `${PUBLIC_API_BASE_URL}/articles`;

/**
 * Loads all articles from the API.
 *
 * Fetches the list of articles authored by all users from the server and returns them for use in the application.
 *
 * @param {Object} context - The context object containing various properties.
 * @param {Function} context.fetch - The fetch function to make API requests.
 * @returns {Promise<Object>} An object containing the articles.
 */

export async function load({ fetch }) {
  const response = await fetch(ARTICLES_URL);
  const articles = await response.json();
  return { articles };
}
