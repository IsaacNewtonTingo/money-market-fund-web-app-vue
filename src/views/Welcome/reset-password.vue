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
    <form class="codeForm newCodeModal" @submit.prevent="changePassword">
      <div class="mailAndText">
        <img src="../../assets/mail.png" alt="" />
        <h1>Confirm code to change password</h1>
      </div>

      <p>
        If the email address belongs to you, please check your inbox for a 4
        digit code sent to <span>{{ this.email }}</span> you and confirm it
        here.
      </p>

      <label for="">Confirmation code</label>
      <input v-model="code" type="text" placeholder="e.g 3465" />

      <div class="combineInputs">
        <div class="inputsContainer">
          <label for="">New password</label>
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

      <button :disabled="isSubmitting" class="changePassword">
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

  <div class="signContainer">
    <img class="logIMG" src="../../assets/money4.png" alt="" />
    <form class="logForm" @submit.prevent="sendResetEmail">
      <label for="">Enter your email to recieve reset credentials</label>
      <input
        type="email"
        name="email"
        required
        v-model="email"
        placeholder="e.g johndoe@gmail.com"
      />

      <button :disabled="isSubmitting" class="depositBTN">
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
</template>

<script>
import TopNav from "../../components/TopNav.vue";
import axios from "axios";
import ErrorAlert from "@/components/custom-error-alert.vue";
import SuccessAlert from "@/components/custom-success-alert.vue";

export default {
  name: "ResetPassword",
  components: { TopNav, ErrorAlert, SuccessAlert },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      userID: "",
      code: "",

      isSubmitting: false,
      showModal: false,

      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async sendResetEmail() {
      this.isSubmitting = true;
      await axios
        .post("http://localhost:3000/api/user/request-password-reset", {
          email: this.email,
        })
        .then((response) => {
          this.isSubmitting = false;

          if (response.data.status === "Pending") {
            this.showModal = true;
            this.userID = response.data.message;
            this.successMessage =
              "A code has been sent to your email to help reset your password";
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((err) => {
          this.errorMessage(err);
          this.isSubmitting = false;
        });
    },
    async changePassword() {
      this.isSubmitting = true;
      await axios
        .post("http://localhost:3000/api/user/reset-password", {
          userId: this.userID,
          resetString: this.code,
          newPassword: this.password,
        })
        .then((response) => {
          this.isSubmitting = false;

          if (response.data.status === "Success") {
            this.successMessage = response.data.message;
            this.showModal = false;
            // this.$router.push({
            //   name: "login",
            //   params: { newSuccessMessage: response.data.message },
            // });
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((err) => {
          console.log(err);
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
.newCodeModal {
  width: 40%;
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
.logForm {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
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
.forgot {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
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

.forgot p {
  color: white;
  text-align: center;
}
.forgot a {
  color: tomato;
  font-weight: bold;
  margin-left: 10px;
}

.changePassword img {
  width: 30px;
  height: 30px;
}
</style>