<template>
  <TopNav />

  <ErrorAlert
    v-if="errorMessage"
    :errorMessage="errorMessage"
    @update-error-message="updateErrorMessage"
  />

  <SuccessAlert
    v-if="successMessage"
    :successMessage="successMessage"
    @update-success-message="updateSuccessMessage"
  />

  <div class="signContainer">
    <img class="logIMG" src="../../assets/money3.png" alt="" />
    <form class="logForm" @submit.prevent="handleLogin">
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

      <button :disabled="isSubmitting" class="depositBTN">
        <img
          class="loadingGif"
          v-if="isSubmitting"
          src="../../assets/loading.gif"
          alt=""
        />
        <div v-else>Deposit</div>
      </button>

      <div class="dontHaveAccount">
        <p>Don't have an account?</p>
        <router-link :to="{ name: 'signup' }">Signup</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import TopNav from "../../components/TopNav.vue";
import axios from "axios";
import ErrorAlert from "@/components/custom-error-alert.vue";
import SuccessAlert from "@/components/custom-success-alert.vue";

export default {
  name: "Login",
  components: { TopNav, ErrorAlert, SuccessAlert },
  data() {
    return {
      email: "",
      password: "",
      userID: "",

      isSubmitting: false,

      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.isSubmitting = true;
      await axios
        .post("http://localhost:3000/api/user/signin", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          this.isSubmitting = false;

          if (response.data.status === "Success") {
            this.userID = response.data.data[0]._id;
            this.$router.push("Dashboard");

            (this.email = ""), (this.password = "");

            localStorage.setItem("userID", response.data.data[0]._id);
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((err) => {
          this.errorMessage(err);
          this.isSubmitting = false;
        });
    },
    updateSuccessMessage(successMessage) {
      this.successMessage = successMessage;
    },
    updateErrorMessage(errorMessage) {
      this.errorMessage = errorMessage;
    },
  },
};
</script>

<style>
.signContainer {
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  background-image: linear-gradient(
    rgb(248, 255, 250),
    rgb(206, 255, 234),
    rgb(248, 255, 250)
  );
}
.logIMG {
  width: 30%;
}
.logForm {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 30%;
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  padding: 40px;
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