<!-- Component for the dialog box when the user wants to delete their account.  -->

<script>
  let dialogRef;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export function openDialog() {
    dialogRef.showModal();
  }

  export function closeDialog() {
    dialogRef.close();
  }

  /**
   *  To allow closing of pop-up confirmation by clicking on back-drop.
   */
  function closeOnBackdropClick(event) {
    const rect = dialogRef.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      closeDialog();
    }
  }

  function handleDelete() {
    dispatch("deleteAccount");
    closeDialog();
  }
</script>

<div class="dialogBox">
  <dialog bind:this={dialogRef} on:click={closeOnBackdropClick}>
    <h2>WARNING:</h2>
    <p>
      Do you wish to delete your account? All information(user profile, comments and articles)
      related to your account will be deleted from our database. We cannot reverse this action once
      completed. Please confirm what you wish to do by clicking one of the buttons below.
    </p>
    <div class="buttons">
      <button on:click={closeDialog}>Keep Account</button>
      <button on:click={handleDelete}>Delete Account</button>
    </div>
    <button class="close" on:click={closeDialog}>X</button>
  </dialog>
</div>

<style>
  .dialogBox {
    position: relative;
  }

  dialog {
    border: none;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: 400px;
    text-align: center;
  }

  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .buttons > button {
    padding: 10px;
    border-radius: 7px;
    background-color: rgb(222, 222, 222);
  }

  .close {
    font-size: large;
    background-color: #f9f9f9;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
