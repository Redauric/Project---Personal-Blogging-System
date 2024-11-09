<!-- To display user details for updating and deleting. -->

<script>
  import { invalidateAll } from "$app/navigation";
  import { goto } from "$app/navigation";
  import DialogBox from "../../../lib/components/DialogBox.svelte";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  const BASE_URL = PUBLIC_API_BASE_URL;
  const USER_URL = `${BASE_URL}/users`;
  export let data;
  const user = data.user;

  let firstname = user.firstname;
  let lastname = user.lastname;
  let birth_date = user.birth_date;
  let user_desc = user.user_desc;
  let user_avatar_url = user.user_avatar_url;
  let error = false;
  let success = false;
  let isEditing = false;
  let dialogComponent;

  /**
   * Opens the dialog component for account deletion confirmation.
   */
  function openDialog() {
    success = false;
    dialogComponent.openDialog();
  }

  /**
   * Closes the dialog component.
   */
  function closeDialog() {
    dialogComponent.closeDialog();
  }

  /**
   * Enters editing mode, allowing user to modify account details.
   */
  function handleEdit() {
    isEditing = true;
    success = false;
  }

  /**
   * Cancels editing mode and resets from fields to user's original values.
   */
  function handleCancel() {
    isEditing = false;
    success = false;
    firstname = user.firstname;
    lastname = user.lastname;
    birth_date = user.birth_date;
    user_desc = user.user_desc;
    user_avatar_url = user.user_avatar_url;
  }

  /**
   * Saves updated user info to the server.
   */
  async function handleSave() {
    isEditing = false;
    error = false;
    success = false;

    const response = await fetch(USER_URL, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, birth_date, user_desc, user_avatar_url })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidateAll();
  }

  /**
   * Deletes the user account after confirmin via the dialog.
   */
  async function handleDeleteAccount() {
    const response = await fetch(USER_URL, {
      method: "DELETE",
      credentials: "include"
    });
    if (response.status === 204) {
      goto("/users/account/delete", { invalidateAll: true, replaceState: true });
    } else {
      console.log(`Unexpected status code received: ${response.status}`);
    }
  }
</script>

<svelte:head>
  <title>My Account</title>
</svelte:head>

{#if data.user}
  <div class="container">
    <form on:submit|preventDefault={handleSave} class="formContainer">
      <h1>My Account Details</h1>
      <h3>(Username: {user.username})</h3>
      <label for="firstname">First name:</label>
      <input type="text" name="firstname" bind:value={firstname} disabled={!isEditing} required />
      <label for="lastname">Last name:</label>
      <input type="text" name="lastname" bind:value={lastname} disabled={!isEditing} required />
      <label for="birth_date">Birthday:</label>
      <input type="date" name="birth_date" bind:value={birth_date} disabled={!isEditing} required />
      <div class="avatarContainer">
        <p>My current avatar:</p>
        <div class="avatar">
          <div class="avadiv">
            <input
              type="radio"
              id="a1"
              name="avatarURL"
              value={`${PUBLIC_IMAGES_URL}/avatar1.png`}
              disabled={!isEditing}
              bind:group={user_avatar_url}
            />
            <label for="a1">
              <img
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
              disabled={!isEditing}
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
              disabled={!isEditing}
              bind:group={user_avatar_url}
            />
            <label for="a3">
              <img
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
              disabled={!isEditing}
              bind:group={user_avatar_url}
            />
            <label for="a4">
              <img
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
              disabled={!isEditing}
              bind:group={user_avatar_url}
            />
            <label for="a5">
              <img
                src={`${PUBLIC_IMAGES_URL}/avatar5.png`}
                alt="Avatar 5"
                style="width: 50px; height: auto; margin-left: 10px;"
              />
            </label>
          </div>
          <div class="avadiv">
            <input
              type="radio"
              id="a6"
              name="avatarURL"
              value={`${PUBLIC_IMAGES_URL}/avatar6.png`}
              disabled={!isEditing}
              bind:group={user_avatar_url}
            />
            <label for="a6">
              <img
                src={`${PUBLIC_IMAGES_URL}/avatar6.png`}
                alt="Avatar 6"
                style="width: 50px; height: auto; margin-left: 10px;"
              />
            </label>
          </div>
        </div>
      </div>
      <textarea bind:value={user_desc} rows="12" disabled={!isEditing} required />
      <div class="buttons">
        <button disabled={isEditing} on:click={handleEdit}>Edit</button>
        <button disabled={!isEditing} on:click={handleCancel}>Cancel</button>
        <button type="submit" disabled={!isEditing}>Save</button>
      </div>
      {#if error}<span class="error">Could not save!</span>{/if}
      {#if success}<span class="success">Saved!</span>{/if}
    </form>
    <div class="deleteButton">
      <button on:click={openDialog}>Delete My Account</button>
    </div>
  </div>
{:else}
  <p>Please login to access your account details.</p>
{/if}
<DialogBox bind:this={dialogComponent} on:deleteAccount={handleDeleteAccount} />

<style>
  .container {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .deleteButton {
    grid-column: 2/3;

    & button {
      width: 100%;
      padding: 20px;
      border-radius: 10px;
      margin: 10px 0px;
      background-color: var(--red);
      color: var(--white);
      font-size: 1.2rem;
      font-weight: bold;
      border: none;
    }
  }

  .formContainer {
    grid-column: 2/3;
    border: 20px solid var(--mustard);
    border-radius: 40px;
    padding: 40px;
    margin-bottom: 10px;

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
    }
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

  textarea {
    min-width: 400px;
    width: 100%;
  }

  .error,
  .success {
    font-weight: bold;
    padding: 5px;
    text-align: center;
    width: 100%;
    display: inline-block;
  }

  .error {
    color: darkred;
    background-color: lightcoral;
  }

  .success {
    color: darkgreen;
    background-color: lightgreen;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  button:disabled {
    background-color: var(--lightgrey) !important;
  }
</style>
