<script>
  import SingleArticleViewer from "$lib/components/SingleArticleViewer.svelte";
  import CommentViewer from "$lib/components/CommentViewer.svelte";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import { invalidateAll } from "$app/navigation";

  export let data;
  let article = data.article;
  $: comments = data.comments;

  const COMMENTS_URL = `${PUBLIC_API_BASE_URL}/articles/${$page.params.id}/comments`;

  let comment_text = "";
  let user_id = "";
  let article_id = article.article_id;

  // To prevent errors while logged out.
  if (data.isLoggedIn) user_id = data.user.user_id;

  /**
   * Handles the submission of a new comment.
   * Prevents the default form submission behaviour and sends a POST request to the server to create a new comment.
   *
   * @param {Event} event - The submit event triggered by the form.
   */
  async function handleSubmit(event) {
    // This line prevents any default comment's submit.
    event.preventDefault();

    let newComment = {
      comment_text,
      user_id,
      article_id
    };
    const response = await fetch(COMMENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newComment)
    });
    if (response.status === 201) invalidateAll();

    // Clearing the comments field after successful submission.
    comment_text = "";
  }
</script>

<!-- Container for content. -->
<div class="container">
  <div class="article">
    <SingleArticleViewer {article} />
  </div>
  <div class="comments">
    {#each comments as comment (comment.comment_id)}
      <CommentViewer {comment} />
    {/each}
  </div>

  <!-- Form to create a new comment. If statement to make the add comment feature disappear for non-logged in users. -->
  {#if data.isLoggedIn}
    <div class="new-comment">
      <form class="comment-form" on:submit={handleSubmit}>
        <input
          class="text-input"
          name="new-comment"
          type="text"
          placeholder="Add a comment"
          bind:value={comment_text}
        />
        <input type="submit" value="Comment" />
      </form>
    </div>
  {/if}
</div>

<style>
  .container {
    width: 1000px;
    margin: 0 auto;

    @media (max-width: 1000px) {
      width: 100%;
    }
  }

  input {
    background-color: var(--mustard);
    margin: 15px;
    border-radius: 10px;
    padding: 10px;
  }

  .text-input {
    width: 60%;
  }
</style>
