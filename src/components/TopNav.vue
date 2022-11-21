<template>
  <nav>
    <div>
      <h3>Money Vice</h3>
    </div>
    <div>
      <router-link to="/">Home</router-link>
      <router-link :to="{ name: 'signup' }">About us</router-link>
      <router-link :to="{ name: 'signup' }">Signup</router-link>
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
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
nav {
  padding: 30px;
  background-color: rgb(36, 55, 48);
  display: flex;
  justify-content: space-between;
}
nav a {
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}
</style>