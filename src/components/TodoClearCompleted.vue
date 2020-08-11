<template>
  <button v-if="showClearCompletedButton" @click="clearCompleted">Clear completed</button>
</template>
<script>
export default {
  name: "todo-clear-completed",
  // props: {
  //   showClearCompletedButton: {
  //     type: Boolean,
  //     required: true,
  //   },
  // },
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    },
  },
  methods: {
    clearCompleted() {
      // window.eventBus.$emit("clearCompleted");
      // this.$store.state.todos = this.$store.state.todos.filter(
      //   (todo) => !todo.completed
      // );
      this.$store.dispatch("clearCompleted");
    },
  },
};
</script>