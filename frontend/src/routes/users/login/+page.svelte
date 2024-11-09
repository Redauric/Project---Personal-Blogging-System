<script>
  import { goto } from "$app/navigation";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  const BASE_URL = PUBLIC_API_BASE_URL;
  const AUTH_URL = `${BASE_URL}/auth`;

  let username = "";
  let password = "";
  let error = false;
  let isLoading = false;

  /**
   * Handles the form submission for user login.
   * Sends a POST request to the authentication endpoint with the username and password.
   * Redirects to the articles page if login is successful, or sets an error flag if not.
   */
  async function handleSubmit() {
    error = false;
    isLoading = true;
    const response = await fetch(AUTH_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    isLoading = false;
    if (!response.ok) error = true;
    else goto("/articles", { invalidateAll: true, replaceState: true });
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container">
  <form class="formContainer" on:submit|preventDefault={handleSubmit}>
    <h1>Welcome Back</h1>
    <p>Sign in to continue</p>
    <input type="text" name="username" bind:value={username} placeholder="Enter username" />
    <input type="password" name="password" bind:value={password} placeholder="Enter password" />
    <button type="submit">Sign In</button>
    {#if error}
      <span class="error">Incorrect username and/or password. Please try again!</span>
    {/if}
    <a class="link" href="/users/sign-up">New user? Please sign-up here</a>
  </form>
</div>

<style>
  .container {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    & h1 {
      margin: 0px;
    }

    & p {
      margin: 10px;
    }

    & span {
      padding: 20px;
    }
  }

  .formContainer {
    grid-column: 2/3;
    border: 20px solid var(--mustard);
    border-radius: 40px;
    padding: 40px;

    & input,
    button {
      width: 100%;
      min-width: 300px;
      padding: 20px;
      border-radius: 10px;
      margin: 10px 0px;
    }

    & button {
      background-color: var(--orange);
      color: var(--white);
      font-size: 1.2rem;
      font-weight: bold;
      border: none;
    }

    & input {
      background-color: var(--mustard);
      border: none;
    }
  }

  .error {
    color: var(--red);
    font-style: italic;
    font-weight: bold;
  }

  a {
    display: inline-block;
    box-sizing: border-box;
    margin-top: 10px;
    font-size: 20px;
  }
</style>
