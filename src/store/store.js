import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://localhost/GITHUB/vue-todo-app-backend/public/api';
export const store = new Vuex.Store({
    state: {
        filter: "all",
        todos: [
            // {
            //     id: 1,
            //     title: "finish vue screencase",
            //     completed: false,
            //     editing: false,
            // },
            // {
            //     id: 2,
            //     title: "finish vue screencase 2",
            //     completed: false,
            //     editing: false,
            // },
        ],
    },
    getters: {
        remaining(state) {
            return state.todos.filter((todo) => !todo.completed).length;
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0;
        },
        todosFiltered(state) {
            if (state.filter == "all") {
                return state.todos;
            } else if (state.filter == "active") {
                return state.todos.filter((todo) => !todo.completed);
            } else if (state.filter == "completed") {
                return state.todos.filter((todo) => todo.completed);
            }
            return state.todos;
        },
        showClearCompletedButton(state) {
            return (
                state.todos.filter((todo) => todo.completed).length > 0
            );
        },
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            });
        },
        clearCompleted(state) {
            axios.get('/todos')
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                })
            state.todos = state.todos.filter(
                (todo) => !todo.completed
            );
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        checkAll(state, checked) {
            state.todos.forEach((todo) => {
                todo.completed = checked;
            });
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex((item) => item.id == id);
            state.todos.splice(index, 1);
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(
                (item) => item.id == todo.id
            );
            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing,
            });
        },
        retrieveTodos(state, todos) {
            state.todos = todos;
        }
    },
    actions: {
        addTodo(context, todo) {
            axios.post('/todos', {
                    title: todo.title,
                    completed: false
                })
                .then(response => {
                    // console.log(response);
                    context.commit('addTodo', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        clearCompleted(context) {
            // context.commit('clearCompleted');
            const completed = store.state.todos
                .filter(todo => todo.completed)
                .map(todo => todo.id);

            axios.delete('/todosDeleteCompleted', {
                    data: {
                        todos: completed
                    }
                })
                .then(response => {
                    context.commit('clearCompleted', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        },
        checkAll(context, checked) {
            axios.patch('/todosCheckAll', {
                    completed: checked
                })
                .then(response => {
                    response;
                    context.commit('checkAll', checked);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        deleteTodo(context, id) {
            axios.delete('/todos/' + id)
                .then(response => {
                    context.commit('deleteTodo', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateTodo(context, todo) {
            axios.patch('/todos/' + todo.id, {
                    title: todo.title,
                    completed: todo.completed
                })
                .then(response => {
                    context.commit('updateTodo', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        retrieveTodos(context) {
            axios.get('/todos')
                .then(response => {
                    console.log(response);
                    context.commit('retrieveTodos', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
});