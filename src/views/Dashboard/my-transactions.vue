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
  </div>
</template>

<script>
import LeftFloat from "@/components/leftFloat.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "myTransactions",
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
      isLoading: false,
      isSubmitting: false,

      planID: "",

      userPlans: [],
    };
  },
  methods: {
    getMaturityDate(date) {
      return moment(date).format("MMM Do YYYY");
    },
    getTodayDate() {
      return moment().format("MMM Do YYYY");
    },
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
.viewAll {
  text-decoration-line: underline;
  font-weight: 800;
  color: #006b4d;
}
.innerModal {
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  padding: 40px;
  border-radius: 10px;
  width: 30%;
}
.heading {
  color: #006b4d;
}
.savingsPlans {
  margin: 40px 0;
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
.planName {
  color: white;
  font-weight: 800;
  text-align: center;
  margin: 10px 0;
  font-size: 16px;
}
.planItem {
  width: 20%;
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  border-radius: 10px;
  height: 300px;
  padding: 20px;
  margin: 0 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
.keyNames {
  color: rgb(235, 235, 235);
  font-weight: 600;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
}
.keyNames span {
  color: #9a9a9a;
}
.extraDetails {
  width: 100%;
}
.depositBTN {
  background: #195846;
  font-size: 10px;
}
.withdrawBTN {
  background: none;
  border: solid #9a9a9a 1px;
  font-size: 10px;
}
.notYetBTN {
  background: none;
  border: solid #4b4b4b 1px;
  font-size: 10px;
  color: #828282;
}
</style>