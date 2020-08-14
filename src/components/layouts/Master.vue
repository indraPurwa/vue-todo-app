<template>
  <div id="app">
    <ul class="nav">
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'todo' }">Todo</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'about' }">About</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link :to="{ name: 'register' }">Register</router-link>
      </li>
      <li v-if="loggedIn">
        <a href="#" @click="logout()">logout</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Master",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    loggedIn() {
      // console.log(localStorage.getItem("access_token"));
      // console.log(this.$store.getters.loggedIn);
      return this.$store.getters.loggedIn;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  font-size: 24px;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.nav {
  display: flex;
  list-style: none;
  padding: 15px 0;
  margin: 0;
  justify-content: flex-end;
  background: #f5f8fa;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 24px;
}
.nav a {
  color: #636b6f;
  padding: 0 25px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
