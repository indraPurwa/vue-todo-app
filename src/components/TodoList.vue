<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="what needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp delay-1s"
      leave-active-class="animated fadeOutDown delay-1s"
    >
      <todo-item
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
      ></todo-item>
    </transition-group>
    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>
    <div class="extra-container">
      <todo-filtered></todo-filtered>
      <div>
        <transition name="fade">
          <todo-clear-completed :showClearCompletedButton="showClearCompletedButton"></todo-clear-completed>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./HelloWorld.vue";
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCompleted from "./TodoClearCompleted";

export default {
  name: "TodoList",
  components: {
    // HelloWorld
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      // beforeEditCache: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "finish vue screencase",
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: "finish vue screencase 2",
          completed: false,
          editing: false,
        },
      ],
    };
  },
  created() {
    window.eventBus.$on("removeTodo", (index) => this.removeTodo(index));
    window.eventBus.$on("finishedEdit", (data) => this.finishedEdit(data));
    window.eventBus.$on("checkAllChanged", (checked) =>
      this.checkAllTodos(checked)
    );
    window.eventBus.$on("filterChanged", (filter) => (this.filter = filter));
    window.eventBus.$on("clearCompleted", () => this.clearCompleted());
  },
  beforeDestroy() {
    window.eventBus.$off("removeTodo", (index) => this.removeTodo(index));
    window.eventBus.$off("finishedEdit", (data) => this.finishedEdit(data));
    window.eventBus.$off("checkAllChanged", (checked) =>
      this.checkAllTodos(checked)
    );
    window.eventBus.$off("filterChanged", (filter) => (this.filter = filter));
    window.eventBus.$off("clearCompleted", () => this.clearCompleted());
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
};
</script>

<style lang="scss">
// @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // animation-duration: 0.3s; not work
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  &:focus {
    outline: none;
  }
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}
.active {
  background: lightgreen;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
