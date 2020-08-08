<template>
  <button v-if="showClearCompletedButton" @click="clearCompleted">Clear completed</button>
</template>
<script>
export default {
  name: "todo-clear-completed",
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clearCompleted() {
      window.eventBus.$emit("clearCompleted");
    },
  },
};
</script>