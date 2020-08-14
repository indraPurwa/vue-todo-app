<template>
  <div class="login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="register">
      <div class="form-control">
        <label for="email">Username</label>
        <input type="email" class="login-input" v-model="username" />
      </div>
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" class="login-input" v-model="name" />
      </div>
      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" class="login-input" v-model="password" />
      </div>
      <div class="form-control">
        <button type="submit" class="btn-submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      username: "",
      name: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          username: this.username,
          name: this.name,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          // this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
