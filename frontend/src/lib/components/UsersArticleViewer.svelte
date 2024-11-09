<!-- Component for the My Articles page when the user is logged in.  -->

<script>
  import { page } from "$app/stores";
  export let articles;
  $: path = $page.url.pathname;
</script>

<div class="container">
  {#each articles as article (article.article_id)}
    <a href="/users/articles/{article.article_id}">
      <div class="article">
        <article class:active={path === `/users/articles/${article.article_id}`}>
          <div class="left">
            {#if article.article_image_url}
              <img src={article.article_image_url} alt={article.article_title} />
            {/if}
          </div>
          <div class="right">
            <p><b>{article.article_title}</b></p>
            <p class="reduce">{article.article_subtitle}</p>
            <p class="reduce">{article.article_date}</p>
          </div>
        </article>
      </div>
    </a>
  {/each}
</div>

<style>
  article {
    display: grid;
    grid-template-columns: auto 1fr;
    border: 3px solid var(--mustard);
    border-radius: 25px;
    padding: 10px;
    margin: 20px;
    overflow-wrap: break-word;
    column-gap: 20px;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: black;
  }

  img {
    max-height: 125px;
    border-radius: 10px;
  }

  .reduce {
    font-size: 0.8rem;
  }

  .active {
    background-color: var(--mustard);
  }
</style>
