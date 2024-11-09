import { PUBLIC_API_BASE_URL } from "$env/static/public";

const USER_COMMENTS_URL = `${PUBLIC_API_BASE_URL}/users/comments`;

/**
 * Loads all comments written by the currently authenticated user.
 *
 * Fetches the comments authored by the logged-in user from the API.
 * Includes credentials to ensure that the user's session is validated during the request.
 *
 * @param {Object} context - The context object containing the fetch method.
 * @param {Function} context.fetch - The fetch method used to make API requests.
 * @returns {Promise<Object>} A promise that resolves to an object containing all comments written by the user.
 */
export async function load({ fetch }) {
  const response = await fetch(USER_COMMENTS_URL, { credentials: "include" });
  const userComments = await response.json();

  return { userComments };
}
