<script>
  export let data;
  import { goto } from "$app/navigation";
  import { invalidateAll } from "$app/navigation";
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  const BASE_URL = PUBLIC_API_BASE_URL;
  const USER_URL = `${BASE_URL}/users`;
  let isEditing = false;
  let changedComment;
  let selected = "";

  /**
   * Handles editing a comment.
   * Sets the comment text and marks the comment as selected for editing.
   * @param comment - The current text of the comment being edited.
   * @param id - The id of the comment to be edited.
   */
  function handleEdit(comment, id) {
    changedComment = comment;
    selected = id;
    isEditing = true;
  }

  /**
   * Saves the changes made to an edited comment.
   * Sends a PATCH request to update the comment text in the backend.
   * @param {string} comment_id - The id of the comment to be updated.
   */
  async function handleSave(comment_id) {
    const response = await fetch(`${USER_URL}/comments/${comment_id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment_text: changedComment })
    });
    if (response.status === 204) {
      isEditing = false;
      invalidateAll();
    } else {
      console.log(`Unexpected status code received: ${response.status}`);
    }
  }

  /**
   * Deletes a comment by its id.
   * Sends a DELETE request to remove the comment from the backend.
   * @param {string} comment_id - The id of the comment to be deleted.
   */
  async function handleDelete(comment_id) {
    const response = await fetch(`${USER_URL}/comments/${comment_id}`, {
      method: "DELETE",
      credentials: "include"
    });
    if (response.status === 204) {
      goto("/users/comments", { invalidateAll: true, replaceState: true });
    } else {
      console.log(`Unexpected status code received: ${response.status}`);
    }
  }
</script>

<div class="container">
  {#if data.userComments && data.userComments.length > 0}
    <h1>My Comments History</h1>
    {#each data.userComments as comment (comment.comment_id)}
      <div class="comment">
        <div class="icons">
          <button
            class="description"
            on:click={() => handleEdit(comment.comment_text, comment.comment_id)}
            ><img src={`${PUBLIC_IMAGES_URL}/edit-icon.png`} style="height: 20px" alt="edit icon" />
            <span class="description-text">Edit comment</span>
          </button>
          <button class="description" on:click={() => handleDelete(comment.comment_id)}
            ><img
              src={`${PUBLIC_IMAGES_URL}/delete-icon.png`}
              style="height: 20px"
              alt="delete icon"
            /><span class="description-text">Delete comment</span>
          </button>
        </div>
        <h3>
          Article title: <a class="article-title" href={`/articles/${comment.article_id}`}
            ><em>{comment.article_title}</em></a
          >
        </h3>
        <p>"{@html comment.comment_text}"</p>
        {#if isEditing && selected === comment.comment_id}
          <div class="textbox">
            <textarea rows="3" cols="100" type="text" name="edit" bind:value={changedComment}
            ></textarea>
            <button on:click={() => handleSave(comment.comment_id)}>Save</button>
          </div>
        {/if}
      </div>
    {/each}
  {:else}
    <p>There is no comment to display.</p>
  {/if}
</div>

<style>
  .container {
    max-width: 740px;
    margin: 0px auto;

    & h1 {
      text-align: center;
    }
  }

  .comment {
    border: 3px solid var(--mustard);
    border-radius: 25px;
    padding: 20px;
    margin: 10px;
    overflow-wrap: break-word;
    position: relative;
  }

  .icons {
    position: absolute;
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

  .textbox {
    display: flex;
    border: 5px solid var(--mustard);
    border-radius: var(--border-radius);

    & button {
      padding: 0px 20px;
      background-color: var(--mustard);
    }
  }

  .article-title {
    color: var(--black);
  }
</style>
