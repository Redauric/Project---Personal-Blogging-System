// Disable server-side rendering.
export const ssr = false;

/**
 * Parent load function to check the user's authentication status.
 *
 * Fetches user data from the server and determines if a user is logged in.
 * This is a parent load function, allowing all child routes to access the returned user data and authentication status.
 *
 * @param {Object} context - The context object containing the fetch function.
 * @param {Function} context.fetch - The fetch function to make API requests.
 * @returns {Object} An object containing the user data and the authentication status.
 * @returns {boolean} return.isLoggedIn - Indicates whether the user is currently logged in.
 * @returns {Object|null} return.user - The user object if logged in; null otherwise.
 */

import { PUBLIC_API_BASE_URL } from "$env/static/public";
const BASE_URL = PUBLIC_API_BASE_URL;
const USER_URL = `${BASE_URL}/users`;

export async function load({ fetch }) {
  const response = await fetch(USER_URL, { credentials: "include" });
  if (response.status === 401) return { isLoggedIn: false };

  const user = await response.json();
  const isLoggedIn = !!user;
  return { user, isLoggedIn };
}
