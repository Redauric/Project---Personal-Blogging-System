<!-- Component for the single article page.  -->

<script>
  export let article;
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  $: path = $page.url.pathname;
  const BASE_URL = PUBLIC_API_BASE_URL;
  const USER_URL = `${BASE_URL}/users`;

  /**
   * Handles deletion of the current article.
   * If successful, navigates back to the user's articles page.
   */
  async function handleDelete() {
    const response = await fetch(`${USER_URL}/articles/${article.article_id}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (response.status === 204) {
      goto("/users/articles", { invalidateAll: true, replaceState: true });
    } else {
      console.log(`Unexpected status code received: ${response.status}`);
    }
  }

  /**
   * Navigates to the edit page for the current article.
   */
  function handleEdit() {
    goto(`/users/articles/${article.article_id}/edit`);
  }
</script>

<svelte:head>
  <title>{article.article_title}</title>
</svelte:head>

<div class="article">
  <div class="left">
    {#if article.article_image_url}
      <img src={article.article_image_url} alt={article.article_title} />
    {/if}
    <h1>{article.article_title}</h1>
    <p>{article.article_genre}</p>
    <p><img src={article.user_avatar_url} alt="user avatar" style="width: 100px;" /></p>
    <p>By {article.username}</p>
    <p>{article.article_date}</p>
  </div>
  <div class="right">
    {#if path === `/users/articles/${article.article_id}`}
      <div class="icons">
        <button class="description" on:click={handleEdit}
          ><img
            src={`${PUBLIC_IMAGES_URL}/edit-icon.png`}
            style="height: 30px"
            alt="edit icon"
          /><span class="description-text">Edit article</span></button
        >
        <button class="description" on:click={handleDelete}>
          <img src={`${PUBLIC_IMAGES_URL}/delete-icon.png`} style="height: 30px" alt="edit icon" />
          <span class="description-text">Delete article</span>
        </button>
      </div>
    {/if}
    <h2>{article.article_subtitle}</h2>
    <p>{@html article.article_text}</p>
  </div>
</div>

<style>
  .article {
    border: 20px solid var(--mustard);
    border-radius: 40px;
    margin: 10px;
    overflow-wrap: break-word;
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .left {
    padding: 20px;
    text-align: center;
    max-width: 300px;
  }

  .right {
    display: grid;
    grid-template-columns: 1fr;
    padding: 20px;
    border-left: 2px solid var(--mustard);
  }

  .icons {
    justify-self: end;
    top: 10px;
    right: 10px;

    & button {
      padding: 10px;
      margin: 10px;
      background-color: var(--mustard);
      border-radius: var(--border-radius);
    }
  }

  .description {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .description-text {
    visibility: hidden;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .description:hover .description-text {
    visibility: visible;
  }

  @media (max-width: 768px) {
    .article {
      grid-template-columns: 1fr;
    }

    .left {
      justify-self: center;
    }
  }
</style>
