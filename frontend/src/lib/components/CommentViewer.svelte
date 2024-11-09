<!-- Component for the comment.  -->

<script>
  export let comment;
</script>

<div class="comment">
  <div class="left">
    <img src={comment.user_avatar_url} style="width: 50px;" alt="user avatar" />
    <p><strong><em>{comment.username}</em></strong></p>
  </div>
  <div class="right">
    <p>"{@html comment.comment_text}"</p>
  </div>
</div>

<style>
  .comment {
    border: 3px solid var(--mustard);
    border-radius: 25px;
    margin: 10px;
    overflow-wrap: break-word;
    display: grid;
    grid-template-columns: 1fr 5fr;

    & p {
      margin: 0;
    }
  }

  .left {
    padding: 20px 20px 20px 20px;
    text-align: center;
  }

  .right {
    padding: 20px;
    align-self: center;
  }
</style>
