<script>
  import { goto } from "$app/navigation";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  const BASE_URL = PUBLIC_API_BASE_URL;
  const USER_URL = `${BASE_URL}/users`;

  let username = "";
  let user_password = "";
  let repeatPassword = "";
  let firstname = "";
  let lastname = "";
  let birth_date = "";
  let user_desc = "";
  let user_avatar_url = `${PUBLIC_IMAGES_URL}/avatar1.png`;
  $: uniqueUsername = true;
  let validPassword = true;

  $: passwordsMatch = user_password === repeatPassword;

  /**
   * Checks if the entered password meets the minimum length requirement.
   * Updates the validPassword variable accordingly.
   */
  function checkPassword() {
    validPassword = user_password.length >= 5;
  }

  /**
   * Checks if the entered username is available.
   * Sends a fetch request to the server to validate the username.
   * Updates the uniqueUsername variable based on the response.
   */
  async function checkUsername() {
    try {
      const response = await fetch(`${USER_URL}/check-username/${username}`, {
        credentials: "include"
      });
      if (!response.ok) {
        console.log("Availability check has failed");
      }
      const result = await response.json();
      uniqueUsername = result.available;
    } catch (error) {
      console.log("There was an error while checking username");
    }
  }

  /**
   * Handles the form submission to create a new user account.
   * Sends a POST request with the user details to the server.
   * Redirects to the login page upon successful account creation.
   * Displays an error alert if the account creation fails.
   */
  async function handleSubmit() {
    const response = await fetch(USER_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        user_password,
        firstname,
        lastname,
        birth_date,
        user_desc,
        user_avatar_url
      })
    });
    if (response.status === 201) {
      goto("/users/login", { invalidateAll: true, replaceState: true });
    } else {
      const errorText = await response.text();
      console.log(errorText);
      alert("Error creating account: " + errorText);
    }
  }
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<div class="container">
  <form class="formContainer" on:submit|preventDefault={handleSubmit}>
    <h1>Welcome, new user!</h1>
    <p>Please create an account to unlock all features</p>
    <input
      type="text"
      name="username"
      bind:value={username}
      placeholder="Enter username"
      on:keyup={checkUsername}
      required
    />
    {#if !uniqueUsername}
      <span>Username has been taken. Please try a different username.</span>
    {/if}
    <input
      on:change={checkPassword}
      type="password"
      name="password"
      bind:value={user_password}
      placeholder="Enter password"
      required
    />
    {#if !validPassword}
      <span>Password must be at least 5 characters long.</span>
    {/if}
    <input
      type="password"
      name="repeatPassword"
      bind:value={repeatPassword}
      placeholder="Re-enter password"
      required
    />
    <input
      type="text"
      name="firstname"
      bind:value={firstname}
      placeholder="Enter first name"
      required
    />
    <input
      type="text"
      name="lastname"
      bind:value={lastname}
      placeholder="Enter last name"
      required
    />
    <div class="birthDate">
      <label for="dob" class="placeholder-label">Enter birthday</label>
      <input type="date" id="dob" name="birth_date" bind:value={birth_date} required />
    </div>
    <div class="avatarContainer">
      <p>Please choose an avatar:</p>
      <div class="avatar">
        <div class="avadiv">
          <input
            type="radio"
            id="a1"
            name="avatarURL"
            value={`${PUBLIC_IMAGES_URL}/avatar1.png`}
            bind:group={user_avatar_url}
          />
          <label for="a1"
            ><img
              src={`${PUBLIC_IMAGES_URL}/avatar1.png`}
              alt="Avatar 1"
              style="width: 50px; height: auto; margin-left: 10px;"
            />
          </label>
        </div>
        <div class="avadiv">
          <input
            type="radio"
            id="a2"
            name="avatarURL"
            value={`${PUBLIC_IMAGES_URL}/avatar2.png`}
            bind:group={user_avatar_url}
          />
          <label for="a2"
            ><img
              src={`${PUBLIC_IMAGES_URL}/avatar2.png`}
              alt="Avatar 2"
              style="width: 50px; height: auto; margin-left: 10px;"
            />
          </label>
        </div>
        <div class="avadiv">
          <input
            type="radio"
            id="a3"
            name="avatarURL"
            value={`${PUBLIC_IMAGES_URL}/avatar3.png`}
            bind:group={user_avatar_url}
          />
          <label for="a3"
            ><img
              src={`${PUBLIC_IMAGES_URL}/avatar3.png`}
              alt="Avatar 3"
              style="width: 50px; height: auto; margin-left: 10px;"
            />
          </label>
        </div>
        <div class="avadiv">
          <input
            type="radio"
            id="a4"
            name="avatarURL"
            value={`${PUBLIC_IMAGES_URL}/avatar4.png`}
            bind:group={user_avatar_url}
          />
          <label for="a4"
            ><img
              src={`${PUBLIC_IMAGES_URL}/avatar4.png`}
              alt="Avatar 4"
              style="width: 50px; height: auto; margin-left: 10px;"
            />
          </label>
        </div>
        <div class="avadiv">
          <input
            type="radio"
            id="a5"
            name="avatarURL"
            value={`${PUBLIC_IMAGES_URL}/avatar5.png`}
            bind:group={user_avatar_url}
          />
          <label for="a5"
            ><img
              src={`${PUBLIC_IMAGES_URL}/avatar5.png`}
              alt="Avatar 5"
              style="width: 50px; height: auto; margin-left: 10px;"
            /></label
          >
        </div>
        <div class="avadiv">
          <input
            type="radio"
            id="a6"
            name="avatarURL"
            value={`${PUBLIC_IMAGES_URL}/avatar6.png`}
            bind:group={user_avatar_url}
          />
          <label for="a6"
            ><img
              src={`${PUBLIC_IMAGES_URL}/avatar6.png`}
              alt="Avatar 6"
              style="width: 50px; height: auto; margin-left: 10px;"
            /></label
          >
        </div>
      </div>
    </div>

    <div class="textArea">
      <label for="user_desc">A little bit about me:</label>
      <textarea name="user_desc" id="user_desc" bind:value={user_desc} rows="5" cols="50" required
      ></textarea>
    </div>
    {#if passwordsMatch && uniqueUsername}
      <button type="submit">Create Account</button>
    {:else}
      <button type="submit" disabled={!passwordsMatch || !uniqueUsername}>Create Account</button>
      <span>Please ensure both passwords are identical to activate the button</span>
    {/if}
  </form>
</div>

<style>
  .container {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .formContainer {
    grid-column: 2/3;
    padding: 40px;
    border: 20px solid var(--mustard);
    border-radius: 40px;

    & input,
    button {
      width: 100%;
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

  .birthDate {
    width: 100%;
    position: relative;
    display: inline-block;
  }

  .placeholder-label {
    position: absolute;
    right: 150px;
    color: gray;
    top: 50%;
    transform: translateY(-50%);
  }

  .avatarContainer {
    margin: 10px 0px;
  }

  .avatar {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .avadiv {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    & > label {
      grid-column: 2/4;
    }
  }

  .textArea {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
  }

  span {
    display: inline-block;
    padding: 0px;
    margin: 0px;
    font-style: italic;
    color: var(--red);
  }

  button:disabled {
    background-color: var(--lightgrey) !important;
  }
</style>
