<template>
  <!-- <LeftFloat /> -->
  <router-view />
</template>

<script>
import Landing from "./views/Welcome/Landing.vue";

export default {
  name: "App",
  components: { Landing },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}
</style>
