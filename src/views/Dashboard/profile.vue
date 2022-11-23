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

    <div v-if="showModal" class="modalContainer"></div>

    <div class="rightItems">
      <div class="combText">
        <h3 class="subHeading">Personal details</h3>
        <h3 class="subHeading">Edit</h3>
      </div>

      <div class="detailsContainer">
        <div class="profileImageContainer">
          <img
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
    </div>
  </div>
</template>

<script>
import LeftFloat from "@/components/leftFloat.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "profile",
  components: { LeftFloat },
  data() {
    return {
      userID: localStorage.getItem("userID"),
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",

      amount: "",
      showModal: false,
      isLoading: true,
      isSubmitting: false,

      userPlans: [],
    };
  },
  methods: {
    setShowModal({ planID }) {
      this.showModal = true;
      this.planID = planID;
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
  width: 70%;
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
.innerModal {
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  padding: 40px;
  border-radius: 20px;
  width: 30%;
}
.heading {
  color: #006b4d;
}

.subHeading {
  font-weight: 800;
  color: #006b4d;
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
.profileImageContainer img {
  width: 200px;
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
  width: 200px;
  background: #effffb;
  border-radius: 10px;
  /* border: solid 1px rgb(248, 255, 250); */
  box-shadow: #dbdbdb 2px 2px 2px;
}
.userDetailsContainer span {
  font-weight: 600;
  color: #7bcab4;
  font-size: 16px;
}
</style>
