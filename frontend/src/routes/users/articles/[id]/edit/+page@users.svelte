<script>
  import QuillEditor from "$lib/components/QuillEditor.svelte";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import { goto } from "$app/navigation";
  const BASE_URL = PUBLIC_API_BASE_URL;
  const ARTICLE_URL = `${BASE_URL}/users/articles`;
  export let data;
  const article = data.userArticle;

  let article_title = article.article_title;
  let article_subtitle = article.article_subtitle;
  let article_text = article.article_text;
  let article_genre = article.article_genre;
  let article_image_url = article.article_image_url;
  let user_id = data.user.user_id;

  /**
   * Handles cancel action.
   */
  function handleCancel() {
    window.location.href = `/users/articles/${article.article_id}`;
  }

  /**
   * Handles form submisstion and updates the article.
   */
  async function handleSubmit() {
    let editedArticle = {
      article_title,
      article_subtitle,
      article_text,
      article_genre,
      article_image_url,
      user_id,
      article_date: article.article_date,
      article_id: article.article_id
    };
    const response = await fetch(`${ARTICLE_URL}/${article.article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(editedArticle)
    });
    if (response.status === 204) {
      goto(`/users/articles/${article.article_id}`, true);
    } else {
      console.log(await response.text());
    }
  }
</script>

<div class="container">
  <form class="formContainer">
    <h1>Editing My Article</h1>
    <label for="title">Title: </label>
    <input type="text" name="title" bind:value={article_title} />
    <label for="subtitle">Subtitle: </label>
    <input type="text" name="subtitle" bind:value={article_subtitle} />
    <label for="imageURL">ImageURL: </label>
    <input type="text" name="imageURL" bind:value={article_image_url} />
    <label for="selectBox">Genre: </label>
    <select name="selectBox" id="selectBox" bind:value={article_genre}>
      <option value="Business">Business</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Travel">Travel</option>
      <option value="Technology">Technology</option>
      <option value="Lifestyle and Art">Lifestyle and Art</option>
      <option value="Food and Health">Food and Health</option>
    </select>
    <QuillEditor bind:article_text />
    <button on:click={handleCancel}><b>Cancel</b></button>
    <button type="submit" on:click={handleSubmit}><b>Save Changes</b></button>
  </form>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: ". text text text .";
    text-align: center;
    justify-content: center;
  }

  .formContainer {
    display: grid;
    width: 100%;
    grid-area: text;
    gap: 10px;
    border: 20px solid var(--mustard);
    padding: 40px;
    border-radius: 40px;

    & input {
      width: 100%;
      padding: 10px;
      border-radius: 7px;
      background-color: var(--mustard);
    }

    & select {
      padding: 10px;
      border-radius: 7px;
      background-color: var(--mustard);
    }

    & label {
      justify-self: left;
    }
  }

  button {
    padding: 10px;
    border-radius: 10px;
    border: 5px solid var(--mustard);
    background-color: white;
  }

  h1 {
    margin: 0px;
  }

  @media (max-width: 768px) {
    .container {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
  }
</style>
