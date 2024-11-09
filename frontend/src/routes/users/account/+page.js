import { goto } from "$app/navigation";
import { browser } from "$app/environment";

/**
 * Loads user details and handles redirection based on authentication status.
 *
 * Checks if the user is logged in. If not logged in and the user tries to access account details, it redirects them to the articles page.
 *
 * @param {Object} context - The context object containing various properties.
 * @param {Function} context.parent - A function that retrieves the parent context, which includes the user's authentication status.
 * @returns {Promise<void>} A promise that resolves when the check is complete.
 */
export async function load({ parent }) {
  if (!browser) return;
  const { isLoggedIn } = await parent();
  if (!isLoggedIn) goto("/articles", { replaceState: true });
}
