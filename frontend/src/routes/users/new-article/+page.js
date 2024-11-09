import { goto } from "$app/navigation";
import { browser } from "$app/environment";

/**
 * Loads the necessary data to check if the user is authenticated before accessing the new article page.
 *
 * Checks the user's authentication status. If the user is not logged in, it redirects them to the login page. The function only runs in the browser environment.
 *
 * @param {Object} context - The context object containing the parent function.
 * @param {Function} context.parent - A function that returns the parent context, which includes the user's authentication status.
 */

export async function load({ parent }) {
  if (!browser) return;
  const { isLoggedIn } = await parent();
  if (!isLoggedIn) goto("/users/login", { replaceState: true });
}
