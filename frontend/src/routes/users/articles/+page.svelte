<!-- Checks if user has written any articles, if not a message is displayed to say there are no articles. -->
<script>
  export let data;
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  $: {
    if (browser && data.userArticles && data.userArticles.length > 0) {
      goto(`/users/articles/${data.userArticles[0].article_id}`, { replaceState: true });
    }
  }
</script>

<p>Sorry there is no article authored by this user.</p>
