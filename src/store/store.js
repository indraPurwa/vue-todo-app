import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import db from '../firebase';

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
            // axios.get('/todos')
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
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
            if (index > 0) {
                state.todos.splice(index, 1);
            }
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(
                (item) => item.id == todo.id
            );
            // console.log(todo);
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
            // axios.post('/todos', {
            //         title: todo.title,
            //         completed: false
            //     })
            //     .then(response => {
            //         // console.log(response);
            //         context.commit('addTodo', response.data);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            db.collection('todos')
            .add({
                title: todo.title,
                completed: false,
                timestamp: new Date()
            }).then(docRef=>{
                context.commit('addTodo', {
                    id: docRef.id,
                    title: todo.title,
                    completed: false,
                });
            })
        },
        clearCompleted(context) {
            // const completed = store.state.todos
            //     .filter(todo => todo.completed)
            //     .map(todo => todo.id);

            // axios.delete('/todosDeleteCompleted', {
            //         data: {
            //             todos: completed
            //         }
            //     })
            //     .then(response => {
            //         context.commit('clearCompleted', response.data);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            db.collection('todos').where('completed','==',true).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc=>{
                    doc.ref.delete().then(()=>{
                        context.commit('clearCompleted');
                    })
                })
            })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        },
        checkAll(context, checked) {
            // axios.patch('/todosCheckAll', {
            //         completed: checked
            //     })
            //     .then(response => {
            //         response;
            //         context.commit('checkAll', checked);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            db.collection('todos').get()
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    doc.ref.update({
                        completed: checked
                    })
                    .then(()=>{
                        context.commit('checkAll', checked);
                    })
                })
            })
        },
        deleteTodo(context, id) {
            // axios.delete('/todos/' + id)
            //     .then(response => {
            //         context.commit('deleteTodo', response.data);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            db.collection('todos').doc(id).delete()
            .then(()=>{
                context.commit('deleteTodo', id);
            })
        },
        updateTodo(context, todo) {
            // console.log(todo);
            // axios.patch('/todos/' + todo.id, {
            //         title: todo.title,
            //         completed: todo.completed
            //     })
            //     .then(response => {
            //         context.commit('updateTodo', response.data);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            db.collection('todos').doc(todo.id).set({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                // timestamp: new Date()
            },{merge:true})
            .then(()=>{
                context.commit('updateTodo', todo);
            })
        },
        retrieveTodos(context) {
            context.state.loading=true;
            // axios.get('/todos')
            //     .then(response => {
            //         context.commit('retrieveTodos', response.data);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            db.collection('todos').get()
            .then(querySnapshot => {
                let tempTodos=[];
                querySnapshot.forEach(doc => {
                    // console.log(doc.data());
                    const data = {
                        id: doc.id,
                        title: doc.data().title,
                        // title: doc.data().title+' '+doc.data().timestamp,
                        completed: doc.data().completed,
                        timestamp: doc.data().timestamp,
                    };
                    tempTodos.push(data);
                })
                context.state.loading=false;
                const tempTodosSorted = tempTodos.sort( (a,b) => {
                    return a.timestamp - b.timestamp
                })
                context.commit('retrieveTodos', tempTodosSorted);
            })
        },
        initRealtimeListeners(context){
            db.collection("todos").onSnapshot(snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if (change.type === "added") {
                            // console.log("Added", change.doc.data());
                            const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
                            if (source === 'Server') {
                                context.commit('addTodo', {
                                    id: change.doc.id,
                                    title: change.doc.data().title,
                                    completed: false,
                                });
                            }
                        }
                        if (change.type === "modified") {
                            let data = {
                                id: change.doc.id,
                                title: change.doc.data().title,
                                completed: change.doc.data().completed,
                                editing: false,
                            };
                            context.commit('updateTodo', data);
                        }
                        if (change.type === "removed") {
                            // console.log("Removed", change.doc.data());
                            context.commit('deleteTodo', change.doc.id);
                        }
                    });
                });
        }
    }
});