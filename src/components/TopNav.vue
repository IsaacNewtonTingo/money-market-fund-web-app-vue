<template>
  <nav class="topNav">
    <img src="../assets/logo.png" alt="" />

    <div class="rightItemsNav">
      <router-link to="/">Home</router-link>
      <router-link :to="{ name: 'signup' }">About us</router-link>
      <router-link :to="{ name: 'signup' }">Plans</router-link>
      <router-link :to="{ name: 'signup' }">Contact us</router-link>

      <button @click="goToSignIn" class="logBTN">Login</button>
      <button @click="goToSignUp" class="signBTN">Signup</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopNavigator",
  methods: {
    goToSignIn() {
      this.$router.push("login");
    },
    goToSignUp() {
      this.$router.push("signup");
    },
  },
};
</script>

<style>
.topNav {
  padding: 20px;
  background: rgb(36, 55, 48);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 80px;
  border-radius: 10px;
}
.topNav img {
  width: 50px;
}
.topNav a {
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  margin: 0 40px 0 0;
  font-size: 12px;
}
.rightItemsNav {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.signBTN {
  width: 100px;
  margin: 0;
  height: 50px;
  font-size: 10px;
}
.logBTN {
  margin: 0 40px 0 0;
  width: 100px;
  background: none;
  border: solid rgb(0, 182, 134) 2px;
  height: 50px;
  font-size: 10px;
}
</style>
