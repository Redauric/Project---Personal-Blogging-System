<script>
  import "$lib/css/app.css";
  import { goto } from "$app/navigation";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  const BASE_URL = PUBLIC_API_BASE_URL;
  const AUTH_URL = `${BASE_URL}/auth`;
  import { page } from "$app/stores";
  export let data;
  $: path = $page.url.pathname;

  /**
   * Logs the user out by sending a DELETE request to the auth endpoint.
   * Clears user data from local storage and session storage on successful logout, then redirects to the logout confirmation page.
   */
  async function handleLogout() {
    const response = await fetch(AUTH_URL, {
      method: "DELETE",
      credentials: "include"
    });
    if (response.ok) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("auth");
      goto("/users/logout", { invalidateAll: true, replaceState: true });
    }
  }
</script>

<header>
  <h1><a href="/articles">&#128218; Amber Antelopes Diaries</a></h1>
  <nav>
    <ul>
      <li class:active={path === "/articles"}><a href="/articles">All Articles</a></li>
      {#if data.isLoggedIn}
        <li class:active={path.startsWith("/users/articles")}>
          <a href="/users/articles">My Articles</a>
        </li>
        <li class:active={path === "/users/new-article"}>
          <a href="/users/new-article">Create Article</a>
        </li>
        <li class:active={path === "/users/comments"}><a href="/users/comments">My Comments</a></li>
        <li class:active={path === "/users/account"}><a href="/users/account">My Account</a></li>
        <li><a href="/articles" on:click={handleLogout}>Logout</a></li>
      {:else}
        <li class:active={path === "/users/login"}><a href="/users/login">Login</a></li>
      {/if}
    </ul>
  </nav>
</header>

<div class="container">
  <slot />
</div>

<style>
  .container {
    width: 100%;
    margin: 0;
    padding: 20px;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }

  header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-row: auto;
    grid-template-areas: "heading nav";
    align-items: center;
    padding: 20px;
    margin-bottom: 40px;

    & a {
      text-decoration: none;
      color: black;
    }
  }

  h1 {
    grid-area: heading;
    font-weight: bold;
    text-align: left;
    font-size: 2rem;
  }

  nav {
    grid-area: nav;
    justify-self: end;
  }

  nav ul {
    display: flex;
    gap: 20px;
    list-style: none;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 10px;

    & a {
      text-decoration: none;
      color: var(--black);
      font-weight: bold;
      font-size: 0.9rem;
      padding: 0px 10px;
    }
  }

  .active {
    padding: 0px 20px 20px 20px;
    border-bottom: 2px solid black;
  }

  @media (max-width: 768px) {
    header {
      width: 80%;
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 0px auto;
    }

    h1 {
      text-align: center;
    }
    nav ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: center;
    }
    .container {
      padding: 10px;
    }
  }
</style>
