import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        filter: "all",
        todos: [{
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
    },
    getters: {
        remaining(state) {
            return state.todos.filter((todo) => !todo.completed).length;
        },
        anyRemaining(getters) {
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
    }
});