import { goto } from "$app/navigation";
import { browser } from "$app/environment";

/**
 * Loads the necessary data to check if the user is already authenticated before accessing the sign-up page.
 *
 * Checks the user's authentication status. If the user is already logged in, it redirects them to the home page instead of allowing access to the sign-up page.
 * The function only runs in the browser environment.
 *
 * @param {Object} context - The context object containing the parent function.
 * @param {Function} context.parent - A function that returns the parent context, which includes the user's authentication status.
 */

export async function load({ parent }) {
  if (!browser) return;
  const { isLoggedIn } = await parent();
  if (isLoggedIn) goto("/articles", { replaceState: true });
}
