<template>
  <TopNav />

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

  <div class="formsCont">
    <form class="signContainerForm" @submit.prevent="handleSignUp">
      <label for="">First Name</label>
      <input
        type="text"
        name="firstName"
        required
        v-model="firstName"
        placeholder="e.g John"
      />

      <label for="">Last name</label>
      <input
        type="text"
        name="lastName"
        required
        v-model="lastName"
        placeholder="e.g Doe"
      />

      <label for="">Email</label>
      <input
        type="email"
        name="email"
        required
        v-model="email"
        placeholder="e.g johndoe@gmail.com"
      />

      <label for="">Phone number</label>
      <input
        type="tel"
        name="phoneNumber"
        required
        v-model="phoneNumber"
        placeholder="e.g 254724753175"
      />

      <label for="">Password</label>
      <input
        type="password"
        name="password"
        required
        v-model="password"
        placeholder="********"
      />

      <label for="">Confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        required
        v-model="confirmPassword"
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
        <p>Already have an account?</p>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import TopNav from "../../components/TopNav.vue";
import axios from "axios";

export default {
  name: "Signup",
  components: { TopNav },
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
          console.log(response.data);
          this.isSubmitting = false;

          if (response.data.status === "Pending") {
            this.showModal = true;
            this.userID = response.data.data;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          this.isSubmitting = false;
        });
    },
    async confirmCode() {
      this.isSubmitting = true;
      console.log("Clicked");
      await axios
        .post(`http://localhost:3000/api/user/verify-email/${this.userID}`, {
          confirmationCode: this.code,
        })
        .then((response) => {
          console.log(response.data);
          this.isSubmitting = false;

          if (response.data.status == "Success") {
            alert(response.data.message);
            this.$router.push("Login");
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          this.isSubmitting = false;
        });
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
}
.signContainerForm {
  display: flex;
  text-align: center;
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
  margin: 0;
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
.loadingGif {
  width: 30px;
  height: 30px;
  object-fit: cover;
}
.codeForm {
  width: 30%;
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
</style>