<!-- Component for the genre/category panel.  -->

<script>
  /**
   * Dispatches an event when a genre/category is clicked.
   */
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const categories = [
    { icon: "🌐", genre: "All" },
    { icon: "🤝", genre: "Business" },
    { icon: "🎉", genre: "Entertainment" },
    { icon: "✈️", genre: "Travel" },
    { icon: "🖥️", genre: "Technology" },
    { icon: "🧘‍♀️", genre: "Lifestyle and Art" },
    { icon: "🍴", genre: "Food and Health" }
  ];

  $: genreSelected = "";
  function handleClick(genre) {
    genreSelected = genre;
    dispatch("categoryClicked", genreSelected);
  }

  function handleDropdownChange(event) {
    handleClick(event.target.value);
  }
</script>

<div class="panel">
  <div class="title">
    <h2>Explore</h2>
  </div>
  <div class="categories">
    <nav>
      <ul>
        {#each categories as category}
          <li>
            <a
              href
              class:active={genreSelected === category.genre}
              on:click={() => handleClick(category.genre)}>{category.icon} {category.genre}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
  </div>

  <!-- Dropdown option when screen size < 768px  -->
  <div class="dropdown">
    <label for="category-select">Select Category:</label>
    <select id="category-select" on:change={handleDropdownChange}>
      {#each categories as category}
        <option value={category.genre} selected={genreSelected === category.genre}>
          {category.icon}
          {category.genre}
        </option>
      {/each}
    </select>
  </div>
</div>

<style>
  .panel {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 20px;
    margin-right: 20px;
  }

  .categories {
    margin-left: 0;
    display: block;
  }
  .categories ul {
    padding: 0 0 0 10px;
  }

  .categories li {
    list-style: none;
    margin: 20px 0;
    padding: 0;
  }

  .categories a {
    text-decoration: none;
    color: var(--black);
    padding: 8px 10px 8px 0px;
    line-height: 2;
    font-weight: bold;
  }

  h2 {
    font-size: 30px;
    margin: 0;
    padding: 10px 0;
    font-weight: 900;
  }

  .dropdown {
    display: none;
    padding-bottom: 20px;
    width: 50%;
  }

  .active {
    border-bottom: 2px solid var(--black);
  }

  @media (max-width: 768px) {
    .categories {
      display: none;
    }
    h2 {
      text-align: center;
    }
    .panel {
      text-align: center;
    }
    .dropdown {
      display: grid;
      justify-content: center;
      align-self: center;
      text-align: center;
    }
  }
</style>
