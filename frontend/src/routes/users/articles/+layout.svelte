<!-- To view all articles written by this user -->

<script>
  import UsersArticleViewer from "$lib/components/UsersArticleViewer.svelte";
  export let data;
</script>

<div class="article-viewer">
  <div class="article-nav">
    <UsersArticleViewer articles={data.userArticles} />
  </div>

  <div class="container">
    <slot />
  </div>
</div>

<style>
  .article-viewer {
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-template-rows: 1fr;
    grid-template-areas: "l r";
    overflow-x: hidden;
    max-width: 100%;
  }

  .article-nav {
    grid-area: l;
  }

  .container {
    grid-area: r;
  }

  @media (max-width: 768px) {
    .article-viewer {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        "l"
        "r";
    }
    .article-nav {
      grid-area: l;
    }

    .container {
      grid-area: r;
    }
  }
</style>
