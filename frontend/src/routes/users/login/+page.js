import { goto } from "$app/navigation";
import { browser } from "$app/environment";

/**
 * Loads the initial state of the page.
 * Redirects the user to the articles page if they are logged in.
 *
 * @param {Object} param - The parameters object.
 * @param {Function} param.parent - A function to retrieve the parent context, which includes the user's login status.
 *
 * @returns {Promise<void>} A promise that resolves when the load function completes.
 */
export async function load({ parent }) {
  if (!browser) return;
  const { isLoggedIn } = await parent();
  if (isLoggedIn) {
    goto("/articles", true);
  }
}
