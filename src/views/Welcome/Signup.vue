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

  <div v-if="showModal" class="codeModal">
    <form class="codeForm" @submit.prevent="confirmCode">
      <div class="mailAndText">
        <img src="../../assets/mail.png" alt="" />
        <h1>Confirm your email address</h1>
      </div>

      <p>
        If the email address belongs to you, please check your inbox for a 4
        digit code sent to <span>{{ this.email }}</span> you and confirm it
        here.
      </p>

      <label for="">Confirmation code</label>
      <input v-model="code" type="text" placeholder="e.g 3465" />

      <button :disabled="isSubmitting" class="confirmCedeBTN">
        <img
          class="loadingGif"
          v-if="isSubmitting"
          src="../../assets/loading.gif"
          alt=""
        />
        <div v-else>Submit</div>
      </button>
    </form>
  </div>

  <div class="formsCont">
    <img class="signIMG" src="../../assets/money5.png" alt="" />
    <form class="signContainerForm" @submit.prevent="handleSignUp">
      <div class="combineInputs">
        <div class="inputsContainer">
          <label for="">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            v-model="firstName"
            placeholder="e.g John"
          />
        </div>

        <div class="inputsContainer">
          <label for="">Last name</label>
          <input
            type="text"
            name="lastName"
            required
            v-model="lastName"
            placeholder="e.g Doe"
          />
        </div>
      </div>

      <div class="combineInputs">
        <div class="inputsContainer">
          <label for="">Email</label>
          <input
            type="email"
            name="email"
            required
            v-model="email"
            placeholder="e.g johndoe@gmail.com"
          />
        </div>

        <div class="inputsContainer">
          <label for="">Phone number</label>
          <input
            type="tel"
            name="phoneNumber"
            required
            v-model="phoneNumber"
            placeholder="e.g 254724753175"
          />
        </div>
      </div>

      <div class="combineInputs">
        <div class="inputsContainer">
          <label for="">Password</label>
          <input
            type="password"
            name="password"
            required
            v-model="password"
            placeholder="********"
          />
        </div>

        <div class="inputsContainer">
          <label for="">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            v-model="confirmPassword"
            placeholder="********"
          />
        </div>
      </div>
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
        <p>Already have an account?</p>
        <router-link :to="{ name: 'login' }">Login</router-link>
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
  name: "Signup",
  components: { TopNav, ErrorAlert, SuccessAlert },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      userID: "",

      isSubmitting: false,
      showModal: false,

      code: "",

      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async handleSignUp() {
      this.isSubmitting = true;
      await axios
        .post("http://localhost:3000/api/user/signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.isSubmitting = false;

          (this.firstName = ""),
            (this.lastName = ""),
            (this.email = ""),
            (this.phoneNumber = ""),
            (this.password = ""),
            (this.confirmPassword = "");

          if (response.data.status === "Pending") {
            this.successMessage = response.data.message;
            this.showModal = true;
            this.userID = response.data.data;
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((err) => {
          this.isSubmitting = false;
          this.errorMessage = err;

          (this.firstName = ""),
            (this.lastName = ""),
            (this.email = ""),
            (this.phoneNumber = ""),
            (this.password = ""),
            (this.confirmPassword = "");
        });
    },
    async confirmCode() {
      this.isSubmitting = true;
      await axios
        .post(`http://localhost:3000/api/user/verify-email/${this.userID}`, {
          confirmationCode: this.code,
        })
        .then((response) => {
          this.isSubmitting = false;
          if (response.data.status === "Success") {
            this.successMessage = response.data.message;
            this.showModal = false;
            // this.$router.push("Login");
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((err) => {
          this.errorMessage = err;
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
.formsCont {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    rgb(248, 255, 250),
    rgb(206, 255, 234),
    rgb(248, 255, 250)
  );
  margin: 0 0 100px 0;
}
.formsCont img {
  width: 45%;
}
.signContainerForm {
  display: flex;
  text-align: center;
  flex-direction: column;
  border-radius: 10px;
  width: 35%;
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  padding: 40px;
  margin: 0;
}
.combineInputs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.inputsContainer {
  display: flex;
  flex-direction: column;
}
label {
  color: white;
  font-weight: 700;
  text-align: left;
}
.formsCont input {
  height: 50px;
  border-radius: 10px;
  margin: 20px 0;
  padding: 0 30px;
  width: 70%;
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
.codeModal {
  height: 100%;
  width: 100%;
  background: rgba(159, 184, 176, 0.95);
  display: flex;
  flex: 1;
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: center;
}

.codeForm {
  width: 30%;
  border-radius: 10px;
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  padding: 40px;
  display: flex;
  flex-direction: column;
}
.codeForm p {
  color: #b0ffe9;
  margin: 20px 0 40px 0;
  font-weight: 200;
}
.codeForm img {
  width: 100px;
}
.codeForm span {
  color: tomato;
  font-weight: 800;
  font-size: 20px;
}
.codeCont input {
  width: 100%;
}
.codeCont button {
  width: 100%;
}
.mailAndText {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 0 40px 0;
}
.mailAndText h1 {
  color: white;
  margin: 0 0 0 40px;
}
.depositBTN img,
.confirmCedeBTN img {
  width: 30px;
  height: 30px;
}
</style>