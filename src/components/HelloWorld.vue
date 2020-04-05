<template>
  <div class="hello">
    <h1>{{this.todo.title}}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    data: String
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 50px;
}
</style>
