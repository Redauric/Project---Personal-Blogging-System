<!-- to display individual article written by this user. -->
<script>
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import SingleArticleViewer from "$lib/components/SingleArticleViewer.svelte";
  import CommentViewer from "$lib/components/CommentViewer.svelte";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";

  const COMMENTS_URL = `${PUBLIC_API_BASE_URL}/articles/${$page.params.id}/comments`;

  export let data;
  $: userArticle = data.userArticle;
  $: comments = data.comments;

  let comment_text = "";
  let user_id = data.user.user_id;
  let article_id = $page.params.id;

  /**
   * HandleSubmit function to post comment.
   */
  async function handleSubmit() {
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
  }
</script>

<div class="container">
  <div class="article">
    <SingleArticleViewer article={userArticle} />
  </div>
  <div class="comments">
    {#each comments as comment (comment.comment_id)}
      <CommentViewer {comment} />
    {/each}
  </div>

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
</div>

<style>
  input {
    background-color: var(--mustard);
    margin: 15px;
    border-radius: 10px;
  }

  .text-input {
    width: 60%;
  }

  .new-comment {
    text-align: left;
    margin: 0;

    & input {
      padding: 10px;
    }
  }
</style>
