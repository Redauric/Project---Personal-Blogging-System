<!-- Component to display a feedback screen for when an operation is successful, then redirects to homepage.  -->

<script>
  import { onMount, onDestroy } from "svelte";
  export let task;

  let countdown = 3;
  let interval;

  /**
   * Redirects the user to the homepage.
   * This is called either after the countdown reaches 0 or when the user clicks the "Go to Homepage" button.
   */
  function redirectToHome() {
    window.location.href = "/articles";
  }

  /**
   * Sets up the countdown timer on component mount.
   * When the countdown reaches 0, it clears the interval and triggers a redirect to the homepage.
   */
  onMount(() => {
    interval = setInterval(() => {
      countdown -= 1;
      if (countdown === 0) {
        clearInterval(interval);
        redirectToHome();
      }
    }, 1000);
  });

  /**
   * Clears the interval if the component is destroyed before the countdown completes.
   * Ensures no memory leaks or unnecessary interval execution if the user navigates away.
   */
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="logout-container">
  <h1>{task}</h1>
  <p class="countdown">Redirecting to Homepage in {countdown} seconds...</p>
  <button on:click={redirectToHome}>Go to Homepage</button>
</div>

<style>
  .logout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    text-align: center;
    background-color: #f9f9f9;
  }

  h1 {
    color: var(--black);
  }

  p {
    margin: 10px 0;
  }

  button {
    color: var(--black);
    background-color: var(--mustard);
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: var(--orange);
    color: var(--black);
  }

  .countdown {
    font-size: 14px;
    color: #888;
  }
</style>
