<template>
  <div v-if="isLoading" class="loadingScreen">
    <img src="../../assets/loading.gif" alt="" />
  </div>

  <div v-else>
    <LeftFloat
      :firstName="firstName"
      :lastName="lastName"
      :email="email"
      :phoneNumber="phoneNumber"
    />

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

    <div v-if="showModal" class="modalContainer">
      <div class="editInnerModal">
        <form class="payForm" @submit.prevent="editProfile">
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
              <label for="">Phone number</label>
              <input
                type="tel"
                name="phoneNumber"
                required
                v-model="phoneNumber"
                placeholder="********"
              />
            </div>

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
          </div>

          <button :disabled="isSubmitting" class="depositBTN">
            <img
              class="loadingGif"
              v-if="isSubmitting"
              src="../../assets/loading.gif"
              alt=""
            />
            <div v-else>Submit</div>
          </button>
          <button @click="this.showModal = false" class="withdrawBTN">
            Cancel
          </button>
        </form>
      </div>
    </div>

    <div class="rightItems">
      <div class="combText personalTitle">
        <h3 class="subHeading">Personal details</h3>
        <h3 @click="this.showModal = true" class="subHeading editPersonal">
          Edit
        </h3>
      </div>

      <div class="detailsContainer">
        <div class="profileImageContainer">
          <img
            class="profilePicture"
            src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM="
            alt="profile picture"
          />
        </div>

        <div class="userDetailsContainer">
          <div>
            <p>
              <span>First name</span> <br />
              {{ firstName }}
            </p>
            <br />

            <p>
              <span>Email</span> <br />
              {{ email }}
            </p>
          </div>
          <br />

          <div>
            <p>
              <span>Last name</span> <br />
              {{ lastName }}
            </p>

            <br />
            <p>
              <span>Phone number</span> <br />
              {{ phoneNumber }}
            </p>
          </div>
          <br />

          <!-- <h4>Edit details</h4> -->
        </div>
      </div>

      <hr class="divider" />

      <div class="editUniques">
        <form action="" class="changeEmail">
          <p>Change Email</p>

          <label for="">New email</label>
          <input type="email" placeholder="e.g janedoe@gmail.com" />

          <label for="">Password</label>
          <input type="password" placeholder="********" />

          <button class="editBTN">Submit</button>
        </form>

        <form action="" class="changePassword">
          <p>Change password</p>
          <label for="">Old password</label>
          <input type="password" placeholder="********" />

          <label for="">New Password</label>
          <input type="password" placeholder="********" />

          <button class="editBTN">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LeftFloat from "@/components/leftFloat.vue";
import axios from "axios";
import ErrorAlert from "@/components/custom-error-alert.vue";
import SuccessAlert from "@/components/custom-success-alert.vue";

export default {
  name: "profile",
  components: { LeftFloat, ErrorAlert, SuccessAlert },
  data() {
    return {
      userID: localStorage.getItem("userID"),
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",

      amount: "",
      showModal: true,
      isLoading: true,
      isSubmitting: false,

      userPlans: [],

      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async editProfile() {
      this.isSubmitting = true;
      await axios
        .put(
          `http://localhost:3000/api/user/update-profile/${localStorage.getItem(
            "userID"
          )}`,
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
          }
        )
        .then((response) => {
          this.isSubmitting = false;
          if (response.data.status === "Success") {
            this.successMessage = response.data.message;
            this.showModal = false;
          } else {
            this.errorMessage = response.data.message;
          }
        })
        .catch((err) => {
          this.errorMessage = err.message;
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
  async mounted() {
    await axios
      .get(
        `http://localhost:3000/api/user/get-user-profile/${localStorage.getItem(
          "userID"
        )}`
      )
      .then((response) => {
        this.isLoading = false;
        if (response.data) {
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.email = response.data.email;
          this.phoneNumber = response.data.phoneNumber;
        } else {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
  },
};
</script>

<style>
.rightItems {
  float: right;
  padding: 40px;
  width: 75%;
  background: rgb(248, 255, 250);
}
.modalContainer {
  height: 100%;
  width: 100%;
  background: rgba(159, 184, 176, 0.95);
  display: flex;
  flex: 1;
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: center;
  right: 20px;
}
.loadingScreen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  flex: 1;
  background: rgb(248, 255, 250);
}
.loadingScreen img {
  width: 100px;
  height: 100px;
}
.editInnerModal {
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  padding: 40px;
  border-radius: 10px;
  width: 40%;
}
.heading {
  color: #006b4d;
}

.subHeading {
  font-weight: 800;
  color: #006b4d;
}
.editPersonal {
  cursor: pointer;
  text-decoration-line: underline;
  color: tomato;
}
.planContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
}
.combText {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.personalTitle {
  width: 85%;
}
.btns {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.loadingGif {
  width: 30px;
  height: 30px;
  object-fit: cover;
}
.profileImageContainer {
  margin: 0 40px 0 0;
}
.profilePicture {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
.detailsContainer {
  display: flex;
  flex-direction: row;
  margin: 40px 0;
  justify-content: space-between;
}
.userDetailsContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.userDetailsContainer div {
  margin: 0 40px 0 0;
}
.userDetailsContainer p {
  font-weight: 800;
  color: #006b4d;
  font-size: 18px;
  padding: 20px;
  width: 250px;
  background: #effffb;
  border-radius: 10px;
  box-shadow: #dbdbdb 2px 2px 2px;
}
.userDetailsContainer span {
  font-weight: 600;
  color: #7bcab4;
  font-size: 16px;
}
.editUniques {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
}
.editUniques button {
  color: white;
  background: #006b4d;
}
.editUniques p {
  color: #006b4d;
  font-weight: bolder;
  font-size: 20px;
  margin: 0 0 40px 0;
}
.editUniques form {
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  background-color: #effffb;
  box-shadow: #dbdbdb 0px 0px 20px;
  border-radius: 10px;
}
.editUniques label {
  color: #7bcab4;
}
.editUniques input {
  padding: 0 30px;
  border: solid 1px #7bcab4;
  border-radius: 10px;
  margin: 20px 0;
}
.divider {
  height: 0.5px;
  background: #f0f0f0;
  border: none;
  width: 85%;
  margin: 100px 0;
}
.combineInputs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.inputsContainer {
  display: flex;
  justify-content: center;
}
.inputsContainer input {
  border-radius: 10px;
  margin: 20px 0;
  width: 95%;
}
</style>
