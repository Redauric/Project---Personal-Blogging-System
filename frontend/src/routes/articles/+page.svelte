<script>
  import HomepageArticleViewer from "$lib/components/HomepageArticleViewer.svelte";
  import CategoryPanel from "$lib/components/CategoryPanel.svelte";
  export let data;
  let categorySelected = "";

  /**
   * Updates the categorySelected variable when a category is clicked.
   *
   * @param e - The event object from the category click.
   */
  function handleClick(e) {
    categorySelected = e.detail;
  }
</script>

<svelte:head>
  <title>Articles</title>
</svelte:head>

<div class="container">
  <div class="category-nav">
    <CategoryPanel on:categoryClicked={handleClick} />
  </div>
  <div class="article-viewer">
    <HomepageArticleViewer articles={data.articles} category={categorySelected} />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: auto;
    grid-template-areas: "l r";
  }

  .category-nav {
    grid-area: l;
  }

  .article-viewer {
    grid-area: r;
  }

  @media (max-width: 768px) {
    .container {
      display: flex;
      flex-direction: column;
    }

    .category-nav {
      width: 100%;
    }

    .article-viewer {
      width: 100%;
    }
  }
</style>
