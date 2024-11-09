<!-- Component for the articles on homepage.  -->

<script>
  export let articles;
  export let category;
</script>

<div class="container">
  {#each articles as article (article.article_id)}
    {#if category === "All" || category === ""}
      <a href="/articles/{article.article_id}">
        <div class="article">
          <article>
            {#if article.article_image_url}
              <img
                class="img-article"
                src={article.article_image_url}
                alt={article.article_title}
                style="width: 200px, height: 200px;"
              />
            {/if}
            <div class="metadata">
              <h2>{article.article_title}</h2>
              <p>{article.article_subtitle}</p>
              <p>By: {article.username}</p>
              <p></p>
              <p>{article.article_date}</p>
            </div>
          </article>
        </div>
      </a>
    {:else if article.article_genre === category}
      <a href="/articles/{article.article_id}">
        <div class="article">
          <article>
            {#if article.article_image_url}
              <img
                class="img-article"
                src={article.article_image_url}
                alt={article.article_title}
                style="width: 200px, height: 200px;"
              />
            {/if}
            <div class="metadata">
              <h2>{article.article_title}</h2>
              <p>{article.article_subtitle}</p>
              <p>By: {article.username}</p>
              <p>{article.article_date}</p>
            </div>
          </article>
        </div>
      </a>
    {/if}
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 2em;
  }

  .article {
    padding: 10px;
    color: var(--black);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
  }

  a {
    text-decoration: none;
    text-align: center;
  }

  a:hover {
    transform: translateY(-10px);
    box-shadow: 0 5px 15px rgba(48, 48, 48, 0.4);
  }

  img {
    border-radius: 7px;
    max-width: 200px;
    max-height: 200px;
  }

  /* Alernating background colours on homepage display. */

  .container > a:nth-child(8n + 1) {
    grid-column: 1/3;
    grid-row: span 1;
    background-color: var(--orange);
    border-radius: var(--border-radius);

    & h2 {
      margin: 10px 0px;
    }
  }

  .container > a:nth-child(8n + 1) > .article > article {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: "l r";
    color: white;
  }

  .container > a:nth-child(8n + 1) > .article > article > .img-article {
    grid-area: l;
    align-self: center;
  }

  .container > a:nth-child(8n + 1) > .article > article > .metadata {
    grid-area: r;
    align-self: center;
  }

  .container > a:nth-child(8n + 2) {
    grid-column: 3;
    grid-row: span 2;
    background-color: var(--black);
    border-radius: var(--border-radius);

    & article {
      color: white;
    }
  }

  .container > a:nth-child(8n + 3) {
    grid-column: 4;
    grid-row: span 2;
    background-color: var(--mustard);
    border-radius: var(--border-radius);
  }

  .container > a:nth-child(8n + 4) {
    grid-column: 1/3;
    grid-row: span 1;
    background-color: var(--lightgrey);
    border-radius: var(--border-radius);

    & h2 {
      margin: 10px 0px;
    }
  }

  .container > a:nth-child(8n + 4) > .article > article {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: "l r";
  }

  .container > a:nth-child(8n + 4) > .article > article > .img-article {
    grid-area: l;
    align-self: center;
  }

  .container > a:nth-child(8n + 4) > .article > article > .metadata {
    grid-area: r;
    align-self: center;
  }

  .container > a:nth-child(8n + 5) {
    grid-column: 1;
    grid-row: span 2;
    background-color: var(--goldenyellow);
    border-radius: var(--border-radius);
  }

  .container > a:nth-child(8n + 6) {
    grid-column: 2;
    grid-row: span 2;
    background-color: var(--tungsten);
    border-radius: var(--border-radius);
  }

  .container > a:nth-child(8n + 7) {
    grid-column: 3/5;
    grid-row: span 1;
    background-color: var(--lightgrey);
    border-radius: var(--border-radius);

    & h2 {
      margin: 10px 0px;
    }
  }

  .container > a:nth-child(8n + 7) > .article > article {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: "l r";
  }

  .container > a:nth-child(8n + 7) > .article > article > .img-article {
    grid-area: l;
    align-self: center;
  }

  .container > a:nth-child(8n + 7) > .article > article > .metadata {
    grid-area: r;
    align-self: center;
  }

  .container > a:nth-child(8n + 8) {
    grid-column: 3/5;
    grid-row: span 1;
    background-color: var(--lightpink);
    border-radius: var(--border-radius);

    & h2 {
      margin: 10px 0px;
    }
  }

  .container > a:nth-child(8n + 8) > .article > article {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: "l r";
  }

  .container > a:nth-child(8n + 8) > .article > article > .img-article {
    grid-area: l;
    align-self: center;
  }

  .container > a:nth-child(8n + 8) > .article > article > .metadata {
    grid-area: r;
    align-self: center;
  }

  .metadata {
    text-align: left;
    padding: 0px 20px;
  }

  @media (max-width: 768px) {
    .container {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      margin: 0 30px;
    }

    img {
      max-width: 150px;
      max-height: 150px;
    }

    .container > a:nth-child(n) {
      grid-column: 1/2;
      width: 100%;
      border-radius: var(--border-radius);
    }

    .container > a:nth-child(n) > .article > article {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-areas: "l r";
    }

    .container > a:nth-child(n) > .article > article > .img-article {
      grid-area: l;
      align-self: center;
    }

    .container > a:nth-child(n) > .article > article > .metadata {
      grid-area: r;
      align-self: center;
    }
  }
</style>
