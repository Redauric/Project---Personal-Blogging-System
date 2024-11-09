<script>
  import QuillEditor from "../../../lib/components/QuillEditor.svelte";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import { goto } from "$app/navigation";

  const BASE_URL = PUBLIC_API_BASE_URL;
  const ARTICLE_URL = `${BASE_URL}/users/articles`;
  export let data;

  let article_title = "";
  let article_subtitle = "";
  let article_text = "";
  let article_genre = "Travel";
  let article_image_url = "";
  let user_id = data.user.user_id;
  let quillIsEmpty = true;

  /**
   * Formats the current date as YYYY-MM-DD.
   * @returns {string} The formatted date string.
   */
  function formattedDate() {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }

  /**
   * Handles the submission of the article creation form.
   * Sends the article data to the server and navigates to the new article's page on success.
   */
  async function handleSubmit() {
    let article = {
      article_title,
      article_subtitle,
      article_text,
      article_genre,
      article_image_url,
      user_id,
      article_date: formattedDate()
    };
    const response = await fetch(ARTICLE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(article)
    });
    const newArticle = await response.json();
    if (response.status === 201) {
      goto(`/users/articles/${newArticle.article_id}`, { invalidateAll: true, replaceState: true });
    } else {
      console.log(response.text());
    }
  }
</script>

<div class="container">
  <form class="formContainer" on:submit={handleSubmit}>
    <h1>Create An Article</h1>
    <label for="title">What is the title? <em>(required)</em></label>
    <input
      type="text"
      name="title"
      bind:value={article_title}
      required
      placeholder="enter article title"
    />
    <label for="subtitle">What is the subtitle?</label>
    <input
      type="text"
      name="subtitle"
      bind:value={article_subtitle}
      placeholder="enter article subtitle"
    />
    <label for="imageURL">What is the imageURL for the article?</label>
    <input
      type="text"
      name="imageURL"
      bind:value={article_image_url}
      placeholder="enter URL for image you wish to display"
    />
    <label for="selectBox">Choose a genre: <em>(required)</em></label>
    <select name="selectBox" id="selectBox" bind:value={article_genre} required>
      <option value="Business">Business</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Travel">Travel</option>
      <option value="Technology">Technology</option>
      <option value="Lifestyle and Art">Lifestyle and Art</option>
      <option value="Food and Health">Food and Health</option>
    </select>
    <QuillEditor bind:article_text bind:isEmpty={quillIsEmpty} />
    <button type="submit" disabled={quillIsEmpty}>Publish</button>
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

  h1 {
    margin-bottom: 20px;
  }

  .formContainer {
    display: grid;
    width: 100%;
    grid-area: text;
    gap: 10px;
    border: 20px solid var(--mustard);
    border-radius: 40px;
    padding: 20px 40px 40px 40px;

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
    border: 5px solid var(--mustard);
    padding: 10px;
    color: var(--black);
    border-radius: var(--border-radius);
    background-color: white;
  }

  button:disabled {
    color: lightgrey;
  }

  @media (max-width: 768px) {
    .container {
      display: flex;
      flex-direction: column;
    }
  }
</style>
