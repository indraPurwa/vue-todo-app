<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <div
        :class="{ completed: completed }"
        class="todo-item-label"
        v-if="!editing"
        @dblclick="editTodo"
      >
        {{ title }}
      </div>
      <input
        class="todo-item-edit"
        type="text"
        v-model="title"
        v-else
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        v-focus
        @keyup.esc="cancelEdit"
      />
    </div>
    <div>
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: "",
    };
  },
  created() {
    window.eventBus.$on("pluralize", this.handlePluralize);
  },
  beforeDestroy() {
    window.eventBus.$off("pluralize", this.handlePluralize);
  },
  watch: {
    checkAll() {
      // if (this.checkAll) {
      //   this.completed = true;
      // } else if (!this.checkAll) {
      //   this.completed = this.todo.completed;
      // }
      this.completed = this.checkAll ? true : this.todo.completed;
    },
    todo(){
      this.title = this.todo.title;
      this.completed = this.todo.completed;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        alert("data cannot be null");
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
      });
      // window.eventBus.$emit("finishedEdit", {
      //   index: this.index,
      //   todo: {
      //     id: this.id,
      //     title: this.title,
      //     completed: this.completed,
      //     editing: this.editing,
      //   },
      // });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      window.eventBus.$emit("pluralize");
    },
    handlePluralize() {
      this.title = this.title + "s";
      const index = this.$store.state.todos.findIndex(
        (item) => item.id == this.id
      );
      this.$store.state.todos.splice(index, 1, {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
      });
      // window.eventBus.$emit("finishedEdit", {
      //   index: this.index,
      //   todo: {
      //     id: this.id,
      //     title: this.title,
      //     completed: this.completed,
      //     editing: this.editing,
      //   },
      // });
    },
  },
};
</script>
