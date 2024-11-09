<!-- QuillEditor - text editor with WYSIWYG support.  -->

<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Quill from "quill";
  import "quill/dist/quill.snow.css";
  const dispatch = createEventDispatcher();
  export let article_text = "";
  export let isEmpty = true;
  let quillEditor;
  let container;

  /**
   * Initializes Quill editor with toolbar option.
   */
  onMount(() => {
    quillEditor = new Quill(container, {
      placeholder: "(Required) compose your article here...",
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"]
        ]
      }
    });
    quillEditor.root.innerHTML = article_text;
    quillEditor.on("text-change", () => {
      isEmpty = quillEditor.getText().trim() === "";
      article_text = quillEditor.root.innerHTML;
      dispatch("input", { article_text });
    });
  });
</script>

<div class="editor" bind:this={container}></div>

<style>
  .editor {
    height: 300px;
    border-radius: var(--border-radius);
  }
</style>
