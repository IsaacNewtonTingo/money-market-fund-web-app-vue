<template>
  <!-- <TopNav /> -->

  <div class="main">
    <div class="leftItem"></div>

    <div class="rightItem">
      <form @submit.prevent="handleLogin">
        <label for="">Email</label>
        <input
          type="email"
          name="email"
          required
          v-model="email"
          placeholder="e.g johndoe@gmail.com"
        />

        <label for="">Password</label>
        <input
          type="password"
          name="password"
          required
          v-model="password"
          placeholder="********"
        />

        <button>Login</button>
      </form>

      <div class="dontHaveAccount">
        <p>Don't have an account?</p>
        <router-link :to="{ name: 'signup' }">Signup</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import axios from "axios";

export default {
  name: "Login",
  components: { TopNav },
  data() {
    return {
      email: "",
      password: "",
      userID: "",
    };
  },
  methods: {
    async handleLogin() {
      await axios
        .post("http://localhost:3000/api/user/signin", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.status === "Success") {
            this.userID = response.data.data[0]._id;
            this.$router.push("Dashboard");

            localStorage.setItem("userID", response.data.data[0]._id);
          } else {
            console.log(response.data.message);
          }
        });
    },
  },
};
</script>

<style>
.main {
  padding: 40px;
  display: flex;
  background: #f0fff2;
  flex: 1;
  justify-content: space-between;
}
.leftItem {
  width: 40%;
}
.rightItem {
  width: 40%;
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  border-radius: 20px;
  padding: 40px;
}
form {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
}
label {
  color: white;
  font-weight: 700;
  text-align: left;
}
input {
  height: 50px;
  border-radius: 10px;
  margin: 20px 0;
  padding: 0 30px;
}
button {
  height: 50px;
  border-radius: 10px;
  margin: 10px 0 0 0;
  background: #009f72;
  color: white;
  font-weight: 800;
  border: none;
  cursor: pointer;
}
.dontHaveAccount {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
}
.dontHaveAccount p {
  color: white;
  text-align: center;
}
.dontHaveAccount a {
  color: tomato;
  font-weight: bold;
  margin-left: 10px;
}
</style>