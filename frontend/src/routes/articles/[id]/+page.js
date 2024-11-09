/**
 * Loads a single, specific article and its associated comments from the API.
 * Fetches data based on the article id provided in the parameters.
 * Makes two API calls: one to retrieve the article details and another to retrieve the comments related to that article.
 *
 * @param {Object} params - The route parameters containing the article id.
 * @returns {Promise<Object>} An object containing the article and its comments.
 */

import { PUBLIC_API_BASE_URL } from "$env/static/public";

const ARTICLES_URL = `${PUBLIC_API_BASE_URL}/articles`;

export async function load({ fetch, params }) {
  const articleResponse = await fetch(`${ARTICLES_URL}/${params.id}`);
  const commentsResponse = await fetch(`${ARTICLES_URL}/${params.id}/comments`);

  const article = await articleResponse.json();
  const comments = await commentsResponse.json();

  return { article, comments };
}
