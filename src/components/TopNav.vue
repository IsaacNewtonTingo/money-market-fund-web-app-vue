<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link :to="{ name: 'signup' }">Signup</router-link>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </nav>
</template>

<script>
// import LeftFloat from "./components/leftFloat.vue";
import Landing from "../views/Welcome/Landing.vue";
import Login from "../views/Welcome/Login.vue";
import Signup from "../views/Welcome/Signup.vue";

export default {
  name: "TopNav",
  components: { Landing, Signup, Login },
};
</script>

<style>
</style>