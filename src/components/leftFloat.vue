<template>
  <div class="leftFloat">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
  </div>
</template>

<script>
export default {
  props: ["firstName", "lastName", "email", "phoneNumber"],
  name: "LeftFloat",
};
</script>

<style>
nav {
  padding: 30px;
}
.leftFloat {
  width: 20%;
  background: white;
  height: 100%;
  position: fixed;
  box-shadow: rgb(238, 238, 238) 5px 5px 5px;
  padding: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>